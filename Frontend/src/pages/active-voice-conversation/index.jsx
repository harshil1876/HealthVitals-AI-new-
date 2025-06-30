import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ConversationHeader from './components/ConversationHeader';
import ConversationStatus from './components/ConversationStatus';
import ConversationTranscript from './components/ConversationTranscript';
import QuickActionButtons from './components/QuickActionButtons';
import HealthDataPanel from './components/HealthDataPanel';
import ConversationHistorySidebar from './components/ConversationHistorySidebar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const ActiveVoiceConversation = () => {
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:5001';
  
  // Conversation state
  const [sessionId, setSessionId] = useState(null);
  const [conversationStatus, setConversationStatus] = useState('idle'); // 'idle', 'listening', 'processing', 'speaking', 'ended'
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [conversationDuration, setConversationDuration] = useState(0);
  const [aiThinking, setAiThinking] = useState(false);
  const [conversationStage, setConversationStage] = useState('initial'); // 'initial', 'get_name', 'get_age', 'get_gender', 'chatting'
  const [userInput, setUserInput] = useState('');

  // Audio state
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState(null);

  // UI state
  const [showEmergencyTooltip, setShowEmergencyTooltip] = useState(false);
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  
  // Conversation messages
  const [messages, setMessages] = useState([]);

  // Extracted health data - will be populated by the backend later
  const [extractedHealthData, setExtractedHealthData] = useState([]);

  // Recent conversations from local storage
  const [recentConversations, setRecentConversations] = useState([]);

  // Speech-to-text state
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Load recent conversations from backend on mount
  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/history`);
        const data = await response.json();
        setRecentConversations(data);
        localStorage.setItem('healthvitals_conversations', JSON.stringify(data));
      } catch (error) {
        console.error("Failed to load conversations from backend:", error);
      }
    }
    fetchHistory();
  }, []);

  // Timer for conversation duration
  useEffect(() => {
    let interval;
    if (sessionId && !isPaused) {
      interval = setInterval(() => {
        setConversationDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionId, isPaused]);

  // Helper to play base64 audio
  const playBase64Audio = (base64String) => {
    if (!base64String) return;
    const audio = new Audio(`data:audio/mp3;base64,${base64String}`);
    audio.play();
  };

  // Add a new message to the transcript
  const addNewMessage = (sender, content) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      sender,
      content,
      timestamp: new Date(),
    }]);
  };

  // Handle voice recording (browser speech-to-text)
  const handleVoiceRecording = useCallback(() => {
    if (!sessionId || conversationStage !== 'chatting' || isProcessing || aiThinking) return;
    if (!browserSupportsSpeechRecognition) {
      addNewMessage('system', 'Browser does not support speech recognition.');
      return;
    }
    if (!listening) {
      resetTranscript();
      setUserInput('');
      SpeechRecognition.startListening({ continuous: false, language: 'en-IN' });
      setIsRecording(true);
      setConversationStatus('listening');
    } else {
      SpeechRecognition.stopListening();
      setIsRecording(false);
      setConversationStatus('idle');
      setUserInput(transcript);
      resetTranscript();
    }
  }, [sessionId, conversationStage, isProcessing, aiThinking, listening, browserSupportsSpeechRecognition, resetTranscript, transcript, addNewMessage]);

  // Handle sending text input from the user
  const handleSendTextMessage = useCallback(async () => {
    if (!userInput.trim() || !sessionId) return;
    addNewMessage('user', userInput);
    const messageToSend = userInput;
    setUserInput('');
    setAiThinking(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message: messageToSend }),
      });
      const data = await response.json();
      setConversationStage(data.stage);
      addNewMessage('ai', data.reply);
      if (data.audio_base64) playBase64Audio(data.audio_base64);
    } catch (error) {
      console.error('Failed to send message:', error);
      addNewMessage('system', 'Error: Could not get a response from the AI assistant.');
    } finally {
      setAiThinking(false);
    }
  }, [userInput, sessionId]);

  // Handle session start/end
  const handleToggleRecording = useCallback(async () => {
    if (isProcessing) return;
    if (sessionId) {
      setConversationStatus('ended');
      setIsRecording(false);
      setIsPaused(false);
      setAiThinking(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/end`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: sessionId,
            duration: conversationDuration,
            messages: messages.map(({ sender, content, timestamp }) => ({ sender, content, timestamp })),
          }),
        });
        const data = await response.json();
        if (data.summary) {
          const updatedConversations = [...recentConversations, data.summary];
          setRecentConversations(updatedConversations);
          localStorage.setItem('healthvitals_conversations', JSON.stringify(updatedConversations));
        }
        if (data.reply) {
          addNewMessage('ai', data.reply);
          if (data.audio_base64) playBase64Audio(data.audio_base64);
        }
      } catch (error) {
        console.error('Failed to end conversation:', error);
        addNewMessage('system', 'Error: Could not save the session summary.');
      } finally {
        setConversationDuration(0);
        setSessionId(null);
        setConversationStage('initial');
        setAiThinking(false);
      }
      return;
    }
    // Start a new session
    setIsProcessing(true);
    setAiThinking(true);
    setMessages([]);
    setConversationDuration(0);
    try {
      const response = await fetch(`${API_BASE_URL}/api/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      setSessionId(data.session_id);
      setConversationStage(data.stage);
      addNewMessage('ai', data.reply);
      if (data.audio_base64) playBase64Audio(data.audio_base64);
      setConversationStatus('listening');
      setIsPaused(false);
    } catch (error) {
      console.error('Failed to start conversation:', error);
      addNewMessage('system', 'Error: Could not connect to the AI assistant.');
    } finally {
      setIsProcessing(false);
      setAiThinking(false);
    }
  }, [isProcessing, sessionId, recentConversations, conversationDuration, messages]);

  // UI rendering
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <ConversationHeader
        conversationDuration={conversationDuration}
        onEmergency={() => setShowEmergencyTooltip(true)}
        onEndConversation={handleToggleRecording}
        showEmergencyTooltip={showEmergencyTooltip}
      />
      {/* Main Content */}
      <div className="pt-16 h-screen flex">
        {/* Desktop Sidebar - Recent Conversations */}
        {showLeftSidebar ? (
          <div className="hidden xl:block w-80 flex-shrink-0 relative">
            <ConversationHistorySidebar
              recentConversations={recentConversations}
              onLoadConversation={() => {}}
            />
            {/* Hide button */}
            <button
              className="absolute top-4 -right-4 z-10 bg-surface border border-border rounded-full p-1 shadow hover:bg-muted transition"
              onClick={() => setShowLeftSidebar(false)}
              aria-label="Hide Recent Conversations"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        ) : (
          <button
            className="hidden xl:flex items-center justify-center w-6 h-12 mt-20 ml-1 bg-surface border border-border rounded-r-full shadow z-10 hover:bg-muted transition"
            onClick={() => setShowLeftSidebar(true)}
            aria-label="Show Recent Conversations"
          >
            <ChevronRight size={20} />
          </button>
        )}
        {/* Center Content */}
        <div className="flex-1 flex flex-col">
          {/* Desktop Layout */}
          <div className="hidden xl:flex h-full">
            {/* Left - Transcript and Input */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1">
                <ConversationTranscript
                  messages={messages}
                  onPlayAudio={() => {}}
                  onMarkImportant={() => {}}
                  isAudioPlaying={isAudioPlaying}
                  playingMessageId={playingMessageId}
                />
              </div>
              {/* Text Input Area */}
              {sessionId && conversationStage !== 'initial' && (
                <div className="p-4 border-t border-border bg-surface">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={e => setUserInput(e.target.value)}
                      placeholder={
                        conversationStage === 'chatting' 
                          ? "Type your message or use the voice button..." 
                          : "Please provide the requested information..."
                      }
                      className="flex-1 p-2 rounded-md bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={aiThinking}
                    />
                    <button
                      onClick={handleSendTextMessage}
                      disabled={!userInput.trim() || aiThinking}
                      className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
                    >
                      Send
                    </button>
                    {/* Voice input button only in 'chatting' stage */}
                    {conversationStage === 'chatting' && (
                      <button
                        onClick={handleVoiceRecording}
                        disabled={aiThinking || isProcessing}
                        className={`ml-2 px-4 py-2 rounded-md ${listening ? 'bg-red-600 text-white' : 'bg-secondary text-secondary-foreground'} font-semibold hover:bg-secondary/90`}
                      >
                        {listening ? 'Stop Voice' : 'Voice'}
                      </button>
                    )}
                    {listening && (
                      <span className="ml-2 text-green-600 font-bold animate-pulse">Listening...</span>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Center - Recording Interface */}
            <div className="w-96 flex flex-col justify-center items-center p-8 border-x border-border bg-surface">
              {/* Timer and Status */}
              <div className="mb-4 text-center">
                <div className="text-lg font-bold">{conversationStatus === 'ended' ? 'Session Ended' : sessionId ? 'Active Session' : 'Idle'}</div>
                <div className="text-2xl font-mono">{new Date(conversationDuration * 1000).toISOString().substr(11, 8)}</div>
              </div>
              <button
                onClick={handleToggleRecording}
                disabled={isProcessing || aiThinking}
                className={`w-full py-4 rounded-lg text-xl font-bold ${sessionId ? 'bg-red-600 text-white' : 'bg-primary text-primary-foreground'} shadow hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground`}
              >
                {sessionId ? 'End Session' : 'Tap to Start Recording'}
              </button>
              <div className="my-8">
                <ConversationStatus
                  status={conversationStatus}
                  aiThinking={aiThinking}
                />
              </div>
              <QuickActionButtons
                onPauseConversation={() => setIsPaused(p => !p)}
                onAddVoiceNote={() => {}}
                onQuickHealthTopic={() => {}}
                isPaused={isPaused}
              />
            </div>
          </div>
        </div>
        {/* Desktop Right Sidebar - Health Data */}
        {showRightSidebar ? (
          <div className="hidden xl:block w-80 flex-shrink-0 relative">
            <HealthDataPanel
              extractedData={extractedHealthData}
              onExportData={() => {}}
              onViewDetails={() => {}}
            />
            {/* Hide button */}
            <button
              className="absolute top-4 -left-4 z-10 bg-surface border border-border rounded-full p-1 shadow hover:bg-muted transition"
              onClick={() => setShowRightSidebar(false)}
              aria-label="Hide Health Data"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        ) : (
          <button
            className="hidden xl:flex items-center justify-center w-6 h-12 mt-20 mr-1 bg-surface border border-border rounded-l-full shadow z-10 hover:bg-muted transition"
            onClick={() => setShowRightSidebar(true)}
            aria-label="Show Health Data"
          >
            <ChevronLeft size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveVoiceConversation;