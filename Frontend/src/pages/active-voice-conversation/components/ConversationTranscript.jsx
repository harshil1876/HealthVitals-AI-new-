import React, { useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationTranscript = ({ 
  messages = [], 
  onPlayAudio, 
  onMarkImportant,
  isAudioPlaying = false,
  playingMessageId = null 
}) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-success';
    if (confidence >= 0.7) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
        <h3 className="font-medium text-text-primary">Conversation Transcript</h3>
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <Icon name="MessageSquare" size={14} />
          <span>{messages.length} messages</span>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-background"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <Icon name="MessageCircle" size={48} className="text-text-muted mb-4" />
            <h4 className="font-medium text-text-primary mb-2">Start Your Conversation</h4>
            <p className="text-sm text-text-secondary max-w-sm">
              Tap the microphone button to begin speaking with your AI health assistant.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg p-4 rounded-medical shadow-medical-sm ${
                  message.sender === 'user' ?'bg-primary text-primary-foreground' :'bg-surface border border-border'
                }`}
              >
                {/* Message Content */}
                <div className="space-y-2">
                  <p className={`text-sm ${
                    message.sender === 'user' ? 'text-primary-foreground' : 'text-text-primary'
                  }`}>
                    {message.content}
                  </p>

                  {/* Message Metadata */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs ${
                        message.sender === 'user' ? 'text-primary-foreground/70' : 'text-text-secondary'
                      }`}>
                        {formatTime(message.timestamp)}
                      </span>
                      
                      {/* Confidence Score for User Messages */}
                      {message.sender === 'user' && message.confidence && (
                        <span className={`text-xs ${getConfidenceColor(message.confidence)}`}>
                          {Math.round(message.confidence * 100)}% confidence
                        </span>
                      )}
                    </div>

                    {/* Message Actions */}
                    <div className="flex items-center space-x-1">
                      {/* Audio Playback */}
                      {message.audioUrl && (
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName={isAudioPlaying && playingMessageId === message.id ? "Pause" : "Play"}
                          iconSize={12}
                          onClick={() => onPlayAudio(message.id, message.audioUrl)}
                          className={`${
                            message.sender === 'user' ?'text-primary-foreground hover:bg-primary-foreground/20' :'text-text-secondary hover:bg-surface-100'
                          }`}
                        />
                      )}

                      {/* Mark Important */}
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName={message.isImportant ? "Star" : "Star"}
                        iconSize={12}
                        onClick={() => onMarkImportant(message.id)}
                        className={`${
                          message.isImportant 
                            ? 'text-warning' 
                            : message.sender === 'user' ?'text-primary-foreground hover:bg-primary-foreground/20' :'text-text-secondary hover:bg-surface-100'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Health Data Tags */}
                  {message.healthData && message.healthData.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.healthData.map((data, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-medical text-xs bg-secondary/10 text-secondary border border-secondary/20"
                        >
                          <Icon name="Activity" size={10} className="mr-1" />
                          {data}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationTranscript;