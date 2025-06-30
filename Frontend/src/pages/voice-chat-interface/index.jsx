import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, isToday, isYesterday, startOfWeek, endOfWeek } from 'date-fns';
import GlobalHeader from 'components/ui/GlobalHeader';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';
import ChatMessage from './components/ChatMessage';
import ConversationSidebar from './components/ConversationSidebar';
import VitalEntryPanel from './components/VitalEntryPanel';
import SessionStatsPanel from './components/SessionStatsPanel';
import VoiceControls from './components/VoiceControls';

const VoiceChatInterface = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const textInputRef = useRef(null);
  
  // Chat state
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I\'m your AI health assistant. I\'m here to help you track your wellness journey, discuss any health concerns, and provide personalized guidance. How can I assist you today?",
      timestamp: new Date(Date.now() - 300000),
      audioUrl: '/mock-audio/ai-greeting.mp3',
      isImportant: false
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Voice state
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceLevel, setVoiceLevel] = useState(0);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [accuracy, setAccuracy] = useState(98);
  
  // Session state
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const [sessionStartTime] = useState(new Date());
  const [sessionDuration, setSessionDuration] = useState(0);
  const [topicsCovered, setTopicsCovered] = useState(['Introduction', 'Health Check']);
  const [healthDataPoints, setHealthDataPoints] = useState(0);
  
  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [vitalsOpen, setVitalsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  
  // Mock conversation history
  const [conversationHistory] = useState([
    {
      id: 'conv_1',
      title: 'Morning Health Check',
      summary: 'Discussed sleep quality and morning vitals',
      timestamp: new Date(Date.now() - 86400000),
      messageCount: 12,
      duration: 8,
      topics: ['Sleep', 'Vitals', 'Morning routine']
    },
    {
      id: 'conv_2',
      title: 'Medication Review',
      summary: 'Reviewed current medications and side effects',
      timestamp: new Date(Date.now() - 172800000),
      messageCount: 18,
      duration: 15,
      topics: ['Medications', 'Side effects', 'Dosage']
    },
    {
      id: 'conv_3',
      title: 'Exercise Discussion',
      summary: 'Planned weekly exercise routine',
      timestamp: new Date(Date.now() - 259200000),
      messageCount: 25,
      duration: 22,
      topics: ['Exercise', 'Fitness goals', 'Recovery']
    },
    {
      id: 'conv_4',
      title: 'Nutrition Planning',
      summary: 'Discussed meal planning and dietary goals',
      timestamp: new Date(Date.now() - 345600000),
      messageCount: 14,
      duration: 12,
      topics: ['Nutrition', 'Meal planning', 'Dietary restrictions']
    }
  ]);

  // Mock vital data
  const [recentVitals, setRecentVitals] = useState([
    { type: 'blood_pressure', value: '120/80', timestamp: new Date(), confidence: 0.95 },
    { type: 'heart_rate', value: '72', timestamp: new Date(Date.now() - 300000), confidence: 0.88 },
    { type: 'temperature', value: '98.6°F', timestamp: new Date(Date.now() - 600000), confidence: 0.92 }
  ]);

  // Session timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionDuration(Math.floor((Date.now() - sessionStartTime.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionStartTime]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Voice level simulation during recording
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setVoiceLevel(Math.random() * 100);
      }, 100);
    } else {
      setVoiceLevel(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Handle sending message
  const handleSendMessage = useCallback(async (messageText = currentMessage) => {
    if (!messageText.trim() || isProcessing) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: messageText.trim(),
      timestamp: new Date(),
      confidence: accuracy / 100
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsProcessing(true);
    setIsTyping(true);

    // Simulate processing time
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: generateAIResponse(messageText),
        timestamp: new Date(),
        audioUrl: '/mock-audio/ai-response.mp3',
        isImportant: messageText.toLowerCase().includes('pain') || messageText.toLowerCase().includes('emergency')
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      setIsProcessing(false);
      
      // Update session stats
      setHealthDataPoints(prev => prev + 1);
      updateTopicsCovered(messageText);
    }, 2000);
  }, [currentMessage, isProcessing, messages.length, accuracy]);

  // Generate AI response based on user input
  const generateAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('pain')) {
      return "I understand you're experiencing pain. Can you describe the location, intensity (1-10 scale), and duration? This information will help me provide better guidance and track your symptoms effectively.";
    } else if (lowerInput.includes('medication')) {
      return "Let's review your medications. Please share the names, dosages, and any side effects you've noticed. I can help track your medication schedule and monitor for interactions.";
    } else if (lowerInput.includes('sleep')) {
      return "Sleep quality is crucial for your health. How many hours did you sleep last night, and how would you rate the quality? I can help identify patterns and suggest improvements.";
    } else if (lowerInput.includes('exercise') || lowerInput.includes('workout')) {
      return "Exercise is wonderful for your wellbeing! Tell me about your current activity level and any fitness goals you have. I can help create a sustainable routine that fits your lifestyle.";
    } else {
      return "Thank you for sharing that information. I'm here to support your health journey. Is there anything specific you'd like to discuss or track today? I can help with symptoms, medications, vitals, or general wellness questions.";
    }
  };

  // Update topics covered based on conversation
  const updateTopicsCovered = (message) => {
    const lowerMessage = message.toLowerCase();
    const newTopics = [];
    
    if (lowerMessage.includes('pain') || lowerMessage.includes('hurt')) newTopics.push('Pain Management');
    if (lowerMessage.includes('medication') || lowerMessage.includes('drug')) newTopics.push('Medications');
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired')) newTopics.push('Sleep');
    if (lowerMessage.includes('exercise') || lowerMessage.includes('workout')) newTopics.push('Exercise');
    if (lowerMessage.includes('food') || lowerMessage.includes('eat')) newTopics.push('Nutrition');
    
    setTopicsCovered(prev => [...new Set([...prev, ...newTopics])]);
  };

  // Handle voice recording
  const handleToggleRecording = useCallback(() => {
    if (isProcessing) return;

    if (isRecording) {
      setIsRecording(false);
      setIsListening(false);
      // Simulate transcription
      setTimeout(() => {
        const transcriptions = [
          "I've been having headaches for the past few days",
          "My blood pressure reading this morning was 130 over 85",
          "I forgot to take my medication yesterday",
          "I had trouble sleeping last night"
        ];
        const randomTranscription = transcriptions[Math.floor(Math.random() * transcriptions.length)];
        setTranscriptionText(randomTranscription);
        setCurrentMessage(randomTranscription);
        handleSendMessage(randomTranscription);
      }, 1000);
    } else {
      setIsRecording(true);
      setIsListening(true);
      setTranscriptionText('');
      setAccuracy(Math.floor(Math.random() * 10) + 90); // 90-99%
    }
  }, [isRecording, isProcessing, handleSendMessage]);

  // Handle conversation history selection
  const handleSelectConversation = useCallback((conversation) => {
    setSelectedConversation(conversation);
    // In a real app, this would load the conversation messages
    console.log('Loading conversation:', conversation.id);
  }, []);

  // Handle vitals entry
  const handleVitalEntry = useCallback((vital) => {
    setRecentVitals(prev => [vital, ...prev.slice(0, 9)]); // Keep last 10
    setHealthDataPoints(prev => prev + 1);
    
    // Add to conversation
    const vitalMessage = {
      id: messages.length + 1,
      type: 'user',
      content: `[Vital Entry] ${vital.type.replace('_', ' ')}: ${vital.value}`,
      timestamp: vital.timestamp,
      confidence: vital.confidence,
      isVital: true
    };
    
    setMessages(prev => [...prev, vitalMessage]);
  }, [messages.length]);

  // Format session duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Group conversations by date
  const groupConversationsByDate = (conversations) => {
    const filtered = conversations.filter(conv =>
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groups = {
      today: [],
      yesterday: [],
      thisWeek: [],
      older: []
    };

    filtered.forEach(conv => {
      if (isToday(conv.timestamp)) {
        groups.today.push(conv);
      } else if (isYesterday(conv.timestamp)) {
        groups.yesterday.push(conv);
      } else if (conv.timestamp >= startOfWeek(new Date()) && conv.timestamp <= endOfWeek(new Date())) {
        groups.thisWeek.push(conv);
      } else {
        groups.older.push(conv);
      }
    });

    return groups;
  };

  // Export conversation
  const handleExportConversation = useCallback(() => {
    const conversationData = {
      sessionId,
      startTime: sessionStartTime,
      duration: sessionDuration,
      messages: messages,
      vitals: recentVitals,
      topics: topicsCovered,
      healthDataPoints
    };
    
    const blob = new Blob([JSON.stringify(conversationData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `conversation_${format(sessionStartTime, 'yyyy-MM-dd_HH-mm')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [sessionId, sessionStartTime, sessionDuration, messages, recentVitals, topicsCovered, healthDataPoints]);

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      
      <div className="pt-16 h-screen flex">
        {/* Left Sidebar - Conversation History */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} lg:w-80 flex-shrink-0 transition-all duration-300 border-r border-border bg-surface overflow-hidden`}>
          <ConversationSidebar
            conversations={groupConversationsByDate(conversationHistory)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectConversation={handleSelectConversation}
            selectedConversation={selectedConversation}
          />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                iconName="Menu"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              />
              <div>
                <h1 className="text-lg font-heading font-semibold text-text-primary">
                  Voice Chat Interface
                </h1>
                <p className="text-sm text-text-secondary">
                  Session Duration: {formatDuration(sessionDuration)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                onClick={handleExportConversation}
              >
                Export
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="BarChart3"
                className="lg:hidden"
                onClick={() => setVitalsOpen(!vitalsOpen)}
              />
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onPlayAudio={(audioUrl) => console.log('Playing audio:', audioUrl)}
                onToggleImportant={(id) => {
                  setMessages(prev => prev.map(msg =>
                    msg.id === id ? { ...msg, isImportant: !msg.isImportant } : msg
                  ));
                }}
              />
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={16} color="white" />
                </div>
                <div className="bg-surface border border-border rounded-medical-lg p-4 max-w-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Voice Controls & Input */}
          <div className="border-t border-border bg-surface p-4">
            <VoiceControls
              isRecording={isRecording}
              isListening={isListening}
              voiceLevel={voiceLevel}
              transcriptionText={transcriptionText}
              accuracy={accuracy}
              onToggleRecording={handleToggleRecording}
            />
            
            {/* Text Input */}
            <div className="flex items-end space-x-3 mt-4">
              <div className="flex-1">
                <textarea
                  ref={textInputRef}
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Type your message or use voice input..."
                  className="w-full p-3 border border-border rounded-medical resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
              </div>
              <Button
                variant="primary"
                size="md"
                iconName="Send"
                onClick={() => handleSendMessage()}
                disabled={!currentMessage.trim() || isProcessing}
                className="px-6"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Vitals & Session Stats */}
        <div className={`${vitalsOpen ? 'w-80' : 'w-0'} lg:w-80 flex-shrink-0 transition-all duration-300 border-l border-border bg-surface overflow-hidden`}>
          <div className="h-full flex flex-col">
            {/* Vitals Panel */}
            <div className="flex-1">
              <VitalEntryPanel
                recentVitals={recentVitals}
                onVitalEntry={handleVitalEntry}
              />
            </div>
            
            {/* Session Stats */}
            <div className="border-t border-border">
              <SessionStatsPanel
                sessionDuration={sessionDuration}
                topicsCovered={topicsCovered}
                healthDataPoints={healthDataPoints}
                messageCount={messages.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatInterface;