import os
import speech_recognition as sr
import datetime
import time
import requests
import pygame
from gtts import gTTS
import json
import google.generativeai as genai
from config import apikey
import librosa
import numpy as np
import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
#from sklearn.svm import LinearSVC
from sklearn.ensemble import RandomForestClassifier
import scipy
import warnings

# ==================== ML Module for Fine-Tuned Emotion Detection ====================

# File names for persistence of the trained model and vectorizer
MODEL_FILENAME = 'emotion_classifier.pkl'
VECTORIZER_FILENAME = 'tfidf_vectorizer.pkl'
DATASET_FILENAME = 'Combined Data.csv'

def train_emotion_model():
    """
    Trains an emotion detection model on the provided dataset.
    The dataset is expected to have two columns: 'statement' and 'emotion'.
    Any rows with missing values in these columns are dropped.
    """
    try:
        data = pd.read_csv(DATASET_FILENAME)
    except Exception as e:
        raise FileNotFoundError(f"Could not load {DATASET_FILENAME}: {e}")

    # Drop rows where 'statement' or 'emotion' is NaN
    data.dropna(subset=['statement', 'emotion'], inplace=True)
    
    X = data['statement']
    y = data['emotion']

    vectorizer = TfidfVectorizer(stop_words='english')
    X_vec = vectorizer.fit_transform(X)

    #classifier = LinearSVC()
    #classifier.fit(X_vec, y)
    # Use a Random Forest classifier for the emotion detection model.
    classifier = RandomForestClassifier(n_estimators=100, random_state=42)
    classifier.fit(X_vec, y)

    with open(MODEL_FILENAME, 'wb') as f:
        pickle.dump(classifier, f)
    with open(VECTORIZER_FILENAME, 'wb') as f:
        pickle.dump(vectorizer, f)

def load_emotion_model():
    """
    Loads the trained emotion classifier and TF-IDF vectorizer from disk.
    """
    with open(MODEL_FILENAME, 'rb') as f:
        classifier = pickle.load(f)
    with open(VECTORIZER_FILENAME, 'rb') as f:
        vectorizer = pickle.load(f)
    return classifier, vectorizer

def detect_emotion(text, classifier, vectorizer):
    """
    Uses the trained ML model to detect the emotion in the given text.
    """
    text_vec = vectorizer.transform([text])
    emotion = classifier.predict(text_vec)[0]
    return emotion

# If no trained model exists, train one.
if not os.path.exists(MODEL_FILENAME) or not os.path.exists(VECTORIZER_FILENAME):
    print("Training emotion detection model...")
    train_emotion_model()

# Load the trained ML model components.
classifier, vectorizer = load_emotion_model()

# ==================== End of ML Module ====================

# Configure the Gemini API key (Google Generative AI)
genai.configure(api_key=apikey)

# -------------------- Original Base Code Below (Unchanged Logic) --------------------

chat_history = []
recognizer = sr.Recognizer()

# Persistent memory for chatbot to refine responses
learning_memory_file = "learning_memory.json"

def load_learning_memory():
    """Load memory from the JSON file."""
    if os.path.exists(learning_memory_file):
        with open(learning_memory_file, "r") as file:
            return json.load(file)
    return {}

def save_learning_memory(memory):
    """Save memory to the JSON file."""
    with open(learning_memory_file, "w") as file:
        json.dump(memory, file, indent=4)

# Load memory at startup
learning_memory = load_learning_memory()

def update_learning_memory(query, response):
    """Update learning memory with user queries and responses."""
    if query not in learning_memory:
        learning_memory[query] = []
    learning_memory[query].append(response)
    save_learning_memory(learning_memory)

def refine_response(query):
    """Refine response based on past interactions."""
    if query in learning_memory:
        previous_responses = learning_memory[query]
        return " ".join(set(previous_responses))  # Combine unique responses for refinement
    return ""

def speak(text):
    tts = gTTS(text=text, lang='en')
    tts.save("temp.mp3")
    pygame.mixer.init()
    pygame.mixer.music.load("temp.mp3")
    pygame.mixer.music.play()

    while pygame.mixer.music.get_busy():
        pygame.time.Clock().tick(10)
    pygame.mixer.music.unload()
    os.remove("temp.mp3")

def wishMe():
    hour = int(datetime.datetime.now().hour)
    t = time.strftime("%I:%M:%p")
    day = datetime.datetime.today().strftime('%A')

    if hour >= 0 and hour < 12:
        speak(f"Good morning! It's {day} and the time is {t}.")
    elif hour >= 12 and hour < 18:
        speak(f"Good afternoon! It's {day} and the time is {t}.")
    else:
        speak(f"Good evening! It's {day} and the time is {t}.")

def extract_voice_features(file_path):
    y, sr_val = librosa.load(file_path, sr=None)  # Load audio file
    pitch = librosa.yin(y, 
                        fmin=librosa.note_to_hz('C2'), 
                        fmax=librosa.note_to_hz('C7'), 
                        sr=sr_val)
    mfcc = librosa.feature.mfcc(y=y, sr=sr_val, n_mfcc=13)
    tempo, _ = librosa.beat.beat_track(y=y, sr=sr_val)  # Calculate tempo

    return {
        "pitch_mean": pitch.mean(),      # Mean pitch
        "mfcc": mfcc.mean(axis=1),         # Mean MFCCs across frames
        "tempo": tempo                   # Tempo in BPM
    }

def text_emotion_analysis(text):
    """Analyze emotion based on text input using keyword matching."""
    keywords = {
        "happy": ["happy", "excited", "great", "good", "awesome", "love"],
        "sad": ["sad", "depressed", "unhappy", "down", "low", "cry"],
        "angry": ["angry", "mad", "furious", "upset", "annoyed"],
        "fear": ["scared", "afraid", "nervous", "worried", "anxious"],
        "hurt": ["jealous", "betrayed", "isolated", "shocked", "deprived", "victimized", "abandoned"],
        "embarrassed": ["isolated", "disgraced", "ashamed", "repulsed", "disgusted", "lonely", "inferior", "guilty", "pathetic", "confused"],
        "normal": ["okay", "fine", "alright", "neutral", "ok"]
    }

    for emotion, words in keywords.items():
        if any(word in text.lower() for word in words):
            return emotion
    return "normal"

def voice_emotion_recognition(audio_features):
    """Classify emotion from voice features."""
    pitch = audio_features['pitch_mean']
    tempo = audio_features['tempo']

    ranges = {
        "happy": {
            "children": (300, 450, 160, 200),
            "teenagers": (220, 350, 160, 200),
            "male_adults": (180, 300, 140, 180),
            "female_adults": (200, 350, 140, 180),
            "older_adults": (150, 250, 120, 150)
        },
        "sad": {
            "children": (250, 350, 100, 140),
            "teenagers": (200, 300, 100, 140),
            "male_adults": (100, 200, 90, 120),
            "female_adults": (150, 250, 90, 120),
            "older_adults": (100, 180, 70, 100)
        },
        "angry": {
            "children": (350, 500, 180, 220),
            "teenagers": (250, 400, 180, 220),
            "male_adults": (200, 350, 160, 200),
            "female_adults": (250, 400, 160, 200),
            "older_adults": (150, 250, 120, 160)
        },
        "neutral": {
            "children": (250, 400, 140, 180),
            "teenagers": (200, 300, 140, 180),
            "male_adults": (100, 200, 120, 150),
            "female_adults": (150, 250, 120, 150),
            "older_adults": (100, 180, 100, 120)
        }
    }

    def check_emotion_ranges(pitch, tempo, ranges):
        for emotion, age_groups in ranges.items():
            for group, (min_pitch, max_pitch, min_tempo, max_tempo) in age_groups.items():
                if min_pitch <= pitch <= max_pitch and min_tempo <= tempo <= max_tempo:
                    return emotion
        return "normal"

    return check_emotion_ranges(pitch, tempo, ranges)

def combine_text_voice_emotion(text_emotion, voice_emotion):
    """Combine text and voice emotion analysis for a refined result."""
    if text_emotion == voice_emotion:
        return text_emotion
    else:
        return f"Mixed ({text_emotion} and {voice_emotion})"

def analyze_emotion(text, audio_features=None):
    """Analyze emotion using both text and voice features."""
    if audio_features:
        voice_emotion = voice_emotion_recognition(audio_features)
        text_emotion = text_emotion_analysis(text)
        combined_emotion = combine_text_voice_emotion(text_emotion, voice_emotion)
        return combined_emotion
    else:
        return text_emotion_analysis(text)

def chat(query, prompt, audio_features=None):
    global chat_history
    chat_history.append({"User": query})
    
    try:
        # Step 1: Perform emotion analysis (rule-based for text & voice)
        text_emotion = text_emotion_analysis(query)
        voice_emotion = None
        if audio_features:
            voice_emotion = voice_emotion_recognition(audio_features)
        combined_emotion = voice_emotion if voice_emotion else text_emotion

        # ------------------- NEW: ML-based Emotion Detection Integration -------------------
        ml_emotion = detect_emotion(query, classifier, vectorizer)
        # ----------------------------------------------------------------------------------

        # Step 2: Build a refined prompt including text, voice, and ML-based emotion analyses
        refined_prompt = (
            f"{prompt}\n"
            f"User emotional state (text analysis): '{text_emotion}'. "
        )
        if voice_emotion:
            refined_prompt += (f"Based on voice, detected emotion: '{voice_emotion}'. "
                               f"Combined analysis suggests: '{combined_emotion}'. ")
        # Append the ML-based emotion result without altering the original prompt logic.
        refined_prompt += f"ML-detected emotion: '{ml_emotion}'. "

        # Step 3: Include chat history in the full prompt
        history = "\n".join(
            [f"User: {entry['User']}\nAssistant: {entry.get('Assistant', '')}" for entry in chat_history]
        )
        full_prompt = f"{refined_prompt}\n{history}\nUser: {query}\nAssistant:"

        # Step 4: Generate response using the Gemini model via Google Generative AI
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(full_prompt)
        response_text = response.text.replace('*', '').strip()

        # Save the response in chat history
        chat_history[-1]["Assistant"] = response_text
        
        # Step 5: Speak the response
        speak(response_text)

        # Step 6: Update learning memory for refinement
        update_learning_memory(query, response_text)

        return response_text

    except Exception as e:
        speak("I encountered an error while processing your request.")
        print(f"Error: {e}")
        return "Error processing the request."

def takeCommand():
    while True:  # Loop until a valid input is recognized
        try:
            with sr.Microphone() as source:
                recognizer.adjust_for_ambient_noise(source, duration=0.5)
                print("Listening...")
                audio = recognizer.listen(source)
                print("Recognizing...")
                query = recognizer.recognize_google(audio, language='en-in')
                print(f"User said: {query}\n")

                # Save the audio to a temp file
                with open("temp_audio.wav", "wb") as f:
                    f.write(audio.get_wav_data())

                # Extract features from the saved audio
                audio_features = extract_voice_features("temp_audio.wav")
                emotion = analyze_emotion(query, audio_features)
                print(f"Detected emotion: {emotion}")

                return query  # Return valid input
        except sr.UnknownValueError:
            speak("Sorry, I couldn't understand that. Please try again.")
            continue  # Retry listening
        except sr.RequestError as e:
            speak("Speech recognition service is unavailable.")
            print(f"Error: {e}")
            return ""  # Exit loop on serious errors

def get_valid_age():
    while True:
        speak("Can you please write down your age?")
        age_input = input("Please enter your age: ").strip()
        try:
            age = int(age_input)
            if 1 <= age <= 120:
                return age
            else:
                print("The age should be between 1 and 120. Please try again.")
        except ValueError:
            print("Invalid age. Please provide it as a number.")

def get_valid_gender():
    while True:
        speak("Can you please write down your gender?")
        gender = input("Please enter your gender (male/female/other): ").strip().lower()
        if gender in ["male", "female", "other"]:
            return gender
        else:
            print("Invalid gender. Please enter male, female, or other.")

def save_interaction_logs():
    """Save chat history to a JSON file."""
    with open("interaction_logs.json", "w") as file:
        json.dump(chat_history, file, indent=4)

if __name__ == '__main__':
    print("Welcome to the Mental Health Assistant")
    speak("Welcome to the Mental Health Assistant")
    wishMe()

    speak("Before we begin, may I know your name?")
    name = input("Please enter your name: ").strip()
    if not name:
        name = "User"

    age = get_valid_age()
    gender = get_valid_gender()

    prompt =(f"You are an expert in mental health assistance and you should act accordingly to psychiatrists. "
            f"Your patient name is {name}, age is {age}, gender is {gender}. "
            f"Your job is to diagnose, treat, and prevent mental illness, provide calming techniques, mental health tips, and address emotional behavoiur and different behavioral disorders with sentiment-based response and engage empathetically. "
            f"Give answers in short and according to the question asked only. "
            f"Always ask a follow-up question to encourage conversation. "
            f"Remember previous responses and act professionally."
            f"Consider asking different questions to explore different aspects of mental health and emotional well-being."
            f"Incorporate questions about daily routines, sleeping patterns, and diet when required to provide holistic mental health advice."
            f"Also incorporate with questions about stress, anxiety, depression, and other mental health issues."
            f"ALso incorporate with questions about smoking status, alcohol consumption, drug use, physical activity status, history of mental illness, history of substance abuse, family history of mental illness or depression, chronic medical conditions and social weekness one by one according to responses givenby the user so that you can provide deep appropriate advice and encourage conversation with the user through sentiment-based responses."
            f"Also consider {text_emotion_analysis} and {voice_emotion_recognition} at each stage of the conversation for personalized best responses required for mental health and emotional well-being. If you sense any negative emotions, provide appropriate advice and encourage conversation. And also consider {combine_text_voice_emotion} for a refined result that is based on both text and voice analysis for mental health and emotional well-being."
            f"Also consider asking varoius habbits that are associated with mental health and emotional well-being.")
    
    speak(f"Great! Let's start our session, {name}. Feel free to ask me anything. I'm here to help you with mental health-related questions.")

    while True:
        try:
            query = takeCommand().lower()

            if "exit" in query or "quit" in query or "bye" in query:
                speak(f"Goodbye {name}! Take care and stay healthy.")
                save_interaction_logs()
                break

            elif "source" in query:
                speak("The suggestions I provide are based on insights from Google data and official guidelines.")

            elif "reset chat" in query:
                chat_history = []
                speak("Chat history reset.")

            elif "time" in query:
                strTime = datetime.datetime.now().strftime("%H:%M:%S")
                speak(f"The time is {strTime}")

            elif "date" in query:
                strDate = datetime.datetime.now().strftime("%B %d, %Y")
                speak(f"The date is {strDate}")

            else:
                # Pass audio_features from takeCommand if available; else None.
                response = chat(query, prompt)
                # Run additional analysis (if needed) and provide empathic follow-up.
                emotion = analyze_emotion(query)
                print(f"Emotion detected: {emotion}", flush=True)
                if emotion in ["happy", "sad", "angry", "fear"]:
                    speak(f"I sense you're feeling {emotion}. I'm here to help you. Let's continue the conversation. Do you want to share more?")
                
        except sr.UnknownValueError:
            speak("Sorry, I couldn't understand that. Please try again.")
        except sr.RequestError as e:
            speak("Speech recognition service is unavailable.")
            print(f"Error: {e}")
        except KeyboardInterrupt:
            speak("Exiting...")
            save_interaction_logs()
            print("Exiting gracefully...")
            exit(0)
            