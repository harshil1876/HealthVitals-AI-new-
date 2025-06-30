from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import speech_recognition as sr
import datetime
import time
import requests
from gtts import gTTS
import json
import google.generativeai as genai
from config import apikey
import librosa
import numpy as np
import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
import scipy
import warnings
import base64
import uuid

app = Flask(__name__)
CORS(app)

# Create a directory for static files and the conversation log file
if not os.path.exists('static'):
    os.makedirs('static')
CONVERSATIONS_FILE = 'conversations.json'
if not os.path.exists(CONVERSATIONS_FILE):
    with open(CONVERSATIONS_FILE, 'w') as f:
        json.dump([], f)

# Conversation state (simple in-memory store)
conversation_state = {}

# ==================== ML Module from fmental2.py ====================
MODEL_FILENAME = 'emotion_classifier.pkl'
VECTORIZER_FILENAME = 'tfidf_vectorizer.pkl'

# Ensure the model and vectorizer are loaded only once
try:
    with open(MODEL_FILENAME, 'rb') as f:
        classifier = pickle.load(f)
    with open(VECTORIZER_FILENAME, 'rb') as f:
        vectorizer = pickle.load(f)
except FileNotFoundError:
    # This is a placeholder. In a real app, you'd handle training
    # or ensure the files are present before starting the server.
    print("ERROR: Pre-trained model or vectorizer not found!")
    classifier, vectorizer = None, None

def detect_emotion(text, classifier, vectorizer):
    if not classifier or not vectorizer:
        return "unknown"
    text_vec = vectorizer.transform([text])
    emotion = classifier.predict(text_vec)[0]
    return emotion

# ==================== Core Logic from fmental2.py ====================

# Configure the Gemini API key
genai.configure(api_key=apikey)

chat_history = []
recognizer = sr.Recognizer()

# In-memory session data (replace with a more robust session management for production)
user_data = {}

def speak(text, session_id):
    """Saves AI speech to an MP3 file and returns the file path."""
    tts = gTTS(text=text, lang='en')
    # Use a unique filename for each request to avoid conflicts
    filename = f"response_{session_id}_{int(time.time())}.mp3"
    filepath = os.path.join('static', filename)
    tts.save(filepath)
    return f'/static/{filename}' # URL path for the frontend to use

def get_ai_response(query):
    """Gets response from Google Gemini."""
    model = genai.GenerativeModel('gemini-2.5-pro')
    response = model.generate_content(query)
    return response.text

def load_conversations():
    """Loads all past conversations from the JSON file."""
    with open(CONVERSATIONS_FILE, 'r') as f:
        return json.load(f)

def save_conversation(summary):
    """Saves a new conversation summary to the JSON file."""
    conversations = load_conversations()
    conversations.append(summary)
    with open(CONVERSATIONS_FILE, 'w') as f:
        json.dump(conversations, f, indent=4)

def text_to_base64_audio(text):
    temp_dir = os.path.join(os.getcwd(), "temp_files")
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)
    unique_id = uuid.uuid4().hex
    temp_file_path = os.path.join(temp_dir, f"tts_{unique_id}.mp3")
    tts = gTTS(text=text, lang='en')
    tts.save(temp_file_path)
    with open(temp_file_path, 'rb') as audio_file:
        audio_data = base64.b64encode(audio_file.read()).decode('utf-8')
    os.remove(temp_file_path)
    return audio_data

# ==================== API Endpoints ====================

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.route('/api/history', methods=['GET'])
def get_history():
    """Endpoint to get all conversation history."""
    conversations = load_conversations()
    return jsonify(conversations)

@app.route('/api/start', methods=['POST'])
def start_conversation():
    session_id = request.json.get('session_id', str(int(time.time())))
    # Reset state for the new session
    user_data[session_id] = {
        'name': None,
        'age': None,
        'gender': None,
        'history': [],
        'stage': 'get_name'
    }
    initial_message = "Hello! I'm your AI health assistant. Before we begin, could you please tell me your name?"
    audio_base64 = text_to_base64_audio(initial_message)
    return jsonify({
        'session_id': session_id,
        'reply': initial_message,
        'audio_base64': audio_base64,
        'stage': 'get_name'
    })

@app.route('/api/chat', methods=['POST'])
def chat_endpoint():
    data = request.json
    session_id = data.get('session_id')
    user_message = data.get('message')

    if not session_id or session_id not in user_data:
        return jsonify({'error': 'Invalid session or session expired'}), 400

    session = user_data[session_id]
    stage = session.get('stage')
    
    response_text = ""

    if stage == 'get_name':
        session['name'] = user_message
        session['stage'] = 'get_age'
        response_text = f"Thank you, {user_message}. Now, could you please tell me your age?"
    elif stage == 'get_age':
        session['age'] = user_message
        session['stage'] = 'get_gender'
        response_text = f"Got it. And your gender?"
    elif stage == 'get_gender':
        session['gender'] = user_message
        session['stage'] = 'chatting'
        response_text = f"Thank you, {session['name']}. All set up. How can I help you today?"
    elif stage == 'chatting':
        # Main conversation logic using Gemini
        full_prompt = f"User: {user_message}\nAI:"
        response_text = get_ai_response(full_prompt)
        session['history'].append({'user': user_message, 'ai': response_text})

    audio_base64 = text_to_base64_audio(response_text)
    
    return jsonify({
        'reply': response_text,
        'audio_base64': audio_base64,
        'stage': session['stage']
    })

@app.route('/api/process-audio', methods=['POST'])
def process_audio_endpoint():
    if 'audio_data' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio_data']
    session_id = request.form.get('session_id')

    if not session_id or session_id not in user_data:
        return jsonify({'error': 'Invalid session or session expired'}), 400

    # Save the audio file temporarily
    temp_audio_path = f"temp_audio_{session_id}.wav"
    audio_file.save(temp_audio_path)

    # Transcribe audio to text
    user_text = ""
    try:
        with sr.AudioFile(temp_audio_path) as source:
            audio_data = recognizer.record(source)
            user_text = recognizer.recognize_google(audio_data)
    except sr.UnknownValueError:
        return jsonify({'error': 'Could not understand the audio'}), 400
    except sr.RequestError as e:
        return jsonify({'error': f'Speech recognition request failed: {e}'}), 500
    finally:
        os.remove(temp_audio_path) # Clean up the temp file

    # Instead of sending to chat logic, just return the transcript
    return jsonify({
        'user_transcript': user_text
    })

@app.route('/api/end', methods=['POST'])
def end_conversation():
    data = request.json
    session_id = data.get('session_id')
    duration = data.get('duration')
    messages = data.get('messages')
    
    if not session_id or session_id not in user_data:
        return jsonify({'error': 'Invalid session'}), 400

    session = user_data[session_id]
    
    # Generate a unique ID for the conversation
    conversation_id = f"conv_{int(time.time())}"

    # Create the summary to be saved
    summary = {
        "id": conversation_id,
        "title": f"Conversation with {session.get('name', 'User')}",
        "user_info": {
            "name": session.get('name'),
            "age": session.get('age'),
            "gender": session.get('gender'),
        },
        "summary": f"A conversation was held covering {len(session['history'])} topics.",
        "timestamp": datetime.datetime.now().isoformat(),
        "messageCount": len(messages),
        "duration": duration,
        "transcript": messages
    }
    
    save_conversation(summary)
    
    # Generate a final message from the AI
    end_note = f"Thank you for sharing, {session.get('name', 'User')}. Your conversation has been saved. Have a great day!"
    audio_base64 = text_to_base64_audio(end_note)

    # Clean up session from memory
    del user_data[session_id]

    return jsonify({
        'reply': end_note,
        'audio_base64': audio_base64,
        'summary': summary
    })


if __name__ == '__main__':
    app.run(debug=True, port=5001) 