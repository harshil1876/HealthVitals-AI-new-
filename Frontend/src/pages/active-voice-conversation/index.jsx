import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ConversationHeader from './components/ConversationHeader';
import ConversationStatus from './components/ConversationStatus';
import VoiceRecordingButton from './components/VoiceRecordingButton';
import ConversationTranscript from './components/ConversationTranscript';
import QuickActionButtons from './components/QuickActionButtons';
import HealthDataPanel from './components/HealthDataPanel';
import ConversationHistorySidebar from './components/ConversationHistorySidebar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [audioLevel, setAudioLevel] = useState(0);
  const [aiThinking, setAiThinking] = useState(false);
  const [conversationStage, setConversationStage] = useState('initial'); // 'initial', 'get_name', 'get_age', 'get_gender', 'chatting'
  const [userInput, setUserInput] = useState('');

  // Audio state
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState(null);
  const audioRef = useRef(null); // Ref for the audio element
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  
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
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setConversationDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  // Simulate audio level during recording - can be replaced with real audio analysis
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 50 + 10);
      }, 100);
    } else {
      setAudioLevel(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const addNewMessage = (sender, content, audioUrl = null) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      sender,
      content,
      timestamp: new Date(),
      audioUrl: audioUrl ? `${API_BASE_URL}${audioUrl}` : null,
    }]);
  };

  const playAudio = (audioUrl) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play()
        .then(() => setIsAudioPlaying(true))
        .catch(e => console.error("Audio playback failed:", e));
    }
  };

  // Helper to play base64 audio
  const playBase64Audio = (base64String) => {
    if (!base64String) return;
    const audio = new Audio(`data:audio/mp3;base64,${base64String}`);
    audio.play();
  };

  // Handle voice recording toggle - now manages conversation start/end
  const handleToggleRecording = useCallback(async () => {
    if (isProcessing) return;

    // If session is active, end it
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
          // Update local and backend history
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

    // Start a new session: start timer, backend, and voice recording
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
      setIsRecording(true);
      setConversationStatus('listening');
      setIsPaused(false);
      // Immediately start voice recording for the first user input (name)
      // But for name/age/gender, only allow text input, so do not start MediaRecorder yet
    } catch (error) {
      console.error('Failed to start conversation:', error);
      addNewMessage('system', 'Error: Could not connect to the AI assistant.');
    } finally {
      setIsProcessing(false);
      setAiThinking(false);
    }
  }, [isProcessing, sessionId, recentConversations, conversationDuration, messages]);

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
      // After name/age/gender, allow voice input
      if (data.stage === 'chatting' && !isRecording) {
        setIsRecording(true);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      addNewMessage('system', 'Error: Could not get a response from the AI assistant.');
    } finally {
      setAiThinking(false);
    }
  }, [userInput, sessionId, isRecording]);

  // Handle emergency button
  const handleEmergency = useCallback(() => {
    setShowEmergencyTooltip(true);
    setTimeout(() => setShowEmergencyTooltip(false), 2000);
    // In real app, this would trigger emergency protocols
  }, []);

  // Handle end conversation
  const handleEndConversation = useCallback(() => {
    setIsRecording(false);
    setIsPaused(false);
    setConversationDuration(0);
    navigate('/main-dashboard');
  }, [navigate]);

  // Handle pause/resume conversation
  const handlePauseConversation = useCallback(() => {
    if (isRecording) {
      setIsPaused(prev => !prev);
      setConversationStatus(prev => prev === 'paused' ? 'listening' : 'paused');
    }
  }, [isRecording]);

  // Handle add voice note
  const handleAddVoiceNote = useCallback(() => {
    const noteMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: '[Voice Note] Personal reminder to follow up on headache triggers and try the recommended exercises.',
      timestamp: new Date(),
      confidence: 1.0,
      audioUrl: '/mock-audio/voice-note.mp3',
      isImportant: true,
      healthData: ['note: follow-up reminder']
    };
    setMessages(prev => [...prev, noteMessage]);
  }, [messages.length]);

  // Handle quick health topics
  const handleQuickHealthTopic = useCallback((topicId) => {
    if (topicId === 'emergency') {
      handleEmergency();
      return;
    }

    const topicMessages = {
      pain: "I\'d like to report my current pain level and discuss pain management options.",
      medication: "I have questions about my current medications and their effects.",
      symptoms: "I\'m experiencing some new symptoms I\'d like to discuss.",
      vitals: "I\'d like to share my recent vital signs measurements."
    };

    if (topicMessages[topicId]) {
      const topicMessage = {
        id: messages.length + 1,
        sender: 'user',
        content: topicMessages[topicId],
        timestamp: new Date(),
        confidence: 1.0,
        audioUrl: `/mock-audio/topic-${topicId}.mp3`,
        isImportant: false,
        healthData: [`topic: ${topicId}`]
      };
      setMessages(prev => [...prev, topicMessage]);
    }
  }, [messages.length, handleEmergency]);

  // Handle audio playback
  const handlePlayAudio = useCallback((messageId, audioUrl) => {
    if (isAudioPlaying && playingMessageId === messageId) {
      setIsAudioPlaying(false);
      setPlayingMessageId(null);
    } else {
      setIsAudioPlaying(true);
      setPlayingMessageId(messageId);
      // Simulate audio playback duration
      setTimeout(() => {
        setIsAudioPlaying(false);
        setPlayingMessageId(null);
      }, 3000);
    }
  }, [isAudioPlaying, playingMessageId]);

  // Handle mark important
  const handleMarkImportant = useCallback((messageId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isImportant: !msg.isImportant }
        : msg
    ));
  }, []);

  // Handle export health data
  const handleExportData = useCallback(() => {
    // In real app, this would export data to file
    console.log('Exporting health data:', extractedHealthData);
  }, [extractedHealthData]);

  // Handle view health data details
  const handleViewDataDetails = useCallback((dataId) => {
    // In real app, this would show detailed view
    console.log('Viewing details for data:', dataId);
  }, []);

  // Handle load conversation from sidebar
  const handleLoadConversation = useCallback((conversationId) => {
    // In real app, this would load the selected conversation
    console.log('Loading conversation:', conversationId);
  }, []);

  // Voice recording logic: only enabled in 'chatting' stage
  const handleVoiceRecording = useCallback(async () => {
    if (!sessionId || conversationStage !== 'chatting' || isProcessing || aiThinking) return;
    if (isRecording) {
      try {
        mediaRecorderRef.current.stop();
      } finally {
        setIsRecording(false);
      }
      setConversationStatus('processing');
      setAiThinking(true);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        mediaRecorderRef.current.onstop = async () => {
          try {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            audioChunksRef.current = [];
            const formData = new FormData();
            formData.append('audio_data', audioBlob, 'recording.webm');
            formData.append('session_id', sessionId);
            const response = await fetch(`${API_BASE_URL}/api/process-audio`, {
              method: 'POST',
              body: formData,
            });
            const data = await response.json();
            if (data.error) {
              addNewMessage('system', `Error: ${data.error}`);
            } else {
              setUserInput(data.user_transcript || '');
            }
          } catch (error) {
            console.error('Failed to process audio:', error);
            addNewMessage('system', 'Error: Could not process your voice input.');
          } finally {
            setIsRecording(false);
            setAiThinking(false);
            setConversationStatus('idle');
          }
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
        setConversationStatus('listening');
      } catch (error) {
        console.error('Could not get audio stream:', error);
        addNewMessage('system', 'Error: Could not access the microphone.');
      }
    }
  }, [sessionId, conversationStage, isProcessing, aiThinking, isRecording]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <ConversationHeader
        conversationDuration={conversationDuration}
        onEmergency={handleEmergency}
        onEndConversation={handleEndConversation}
        showEmergencyTooltip={showEmergencyTooltip}
      />

      {/* Main Content */}
      <div className="pt-16 h-screen flex">
        {/* Desktop Sidebar - Recent Conversations */}
        {showLeftSidebar ? (
          <div className="hidden xl:block w-80 flex-shrink-0 relative">
            <ConversationHistorySidebar
              recentConversations={recentConversations}
              onLoadConversation={handleLoadConversation}
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
          {/* Mobile/Tablet Layout */}
          <div className="xl:hidden flex flex-col h-full">
            {/* Status and Recording */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 space-y-8">
              <ConversationStatus 
                status={conversationStatus}
                aiThinking={aiThinking}
              />
              
              <VoiceRecordingButton
                isRecording={isRecording}
                isProcessing={isProcessing}
                onToggleRecording={handleToggleRecording}
                audioLevel={audioLevel}
              />
              
              <QuickActionButtons
                onPauseConversation={handlePauseConversation}
                onAddVoiceNote={handleAddVoiceNote}
                onQuickHealthTopic={handleQuickHealthTopic}
                isPaused={isPaused}
              />
            </div>

            {/* Transcript - Bottom Half */}
            <div className="h-1/2 border-t border-border">
              <ConversationTranscript
                messages={messages}
                onPlayAudio={handlePlayAudio}
                onMarkImportant={handleMarkImportant}
                isAudioPlaying={isAudioPlaying}
                playingMessageId={playingMessageId}
              />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden xl:flex h-full">
            {/* Left - Transcript and Input */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1">
                <ConversationTranscript
                  messages={messages}
                  onPlayAudio={handlePlayAudio}
                  onMarkImportant={handleMarkImportant}
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
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendTextMessage()}
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
                        className={`ml-2 px-4 py-2 rounded-md ${isRecording ? 'bg-red-600 text-white' : 'bg-secondary text-secondary-foreground'} font-semibold hover:bg-secondary/90`}
                      >
                        {isRecording ? 'Stop Voice' : 'Voice'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Center - Recording Interface */}
            <div className="w-96 flex flex-col justify-center items-center p-8 border-x border-border bg-surface">
              {/* Timer and Status */}
              <div className="mb-4 text-center">
                <div className="text-lg font-bold">{conversationStatus === 'ended' ? 'Session Ended' : isRecording ? 'Active Session' : 'Idle'}</div>
                <div className="text-2xl font-mono">{new Date(conversationDuration * 1000).toISOString().substr(11, 8)}</div>
              </div>
              <button
                onClick={handleToggleRecording}
                disabled={isProcessing || aiThinking}
                className={`w-full py-4 rounded-lg text-xl font-bold ${isRecording ? 'bg-red-600 text-white' : 'bg-primary text-primary-foreground'} shadow hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground`}
              >
                {sessionId ? 'End Session' : 'Tap to Start Recording'}
              </button>
              <div className="my-8">
                <VoiceRecordingButton
                  isRecording={isRecording}
                  isProcessing={isProcessing}
                  onToggleRecording={handleToggleRecording}
                  audioLevel={audioLevel}
                />
              </div>
              <QuickActionButtons
                onPauseConversation={handlePauseConversation}
                onAddVoiceNote={handleAddVoiceNote}
                onQuickHealthTopic={handleQuickHealthTopic}
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
              onExportData={handleExportData}
              onViewDetails={handleViewDataDetails}
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
      <audio ref={audioRef} onEnded={() => setIsAudioPlaying(false)} />
    </div>
  );
};

export default ActiveVoiceConversation;