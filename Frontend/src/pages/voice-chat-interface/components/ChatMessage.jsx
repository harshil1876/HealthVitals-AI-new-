import React, { useState } from 'react';
import { format } from 'date-fns';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const ChatMessage = ({ 
  message, 
  onPlayAudio, 
  onToggleImportant,
  isAudioPlaying = false 
}) => {
  const [showActions, setShowActions] = useState(false);
  
  const isUser = message.type === 'user';
  const isVital = message?.isVital;
  
  const handlePlayAudio = () => {
    if (message.audioUrl && onPlayAudio) {
      onPlayAudio(message.audioUrl);
    }
  };

  const handleToggleImportant = () => {
    if (onToggleImportant) {
      onToggleImportant(message.id);
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.95) return 'text-success';
    if (confidence >= 0.85) return 'text-warning';
    return 'text-error';
  };

  const formatConfidence = (confidence) => {
    return Math.round(confidence * 100);
  };

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`flex items-start space-x-3 max-w-2xl ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? 'bg-primary' 
            : isVital 
              ? 'bg-secondary' :'bg-accent'
        }`}>
          <Icon 
            name={isUser ? 'User' : isVital ? 'Activity' : 'Bot'} 
            size={16} 
            color="white" 
          />
        </div>

        {/* Message Content */}
        <div className={`relative ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
          {/* Message Bubble */}
          <div className={`relative p-4 rounded-medical-lg shadow-medical-sm ${
            isUser 
              ? 'bg-primary text-white' 
              : isVital
                ? 'bg-secondary-50 border border-secondary/20' :'bg-surface border border-border'
          } ${message?.isImportant ? 'ring-2 ring-warning/50' : ''}`}>
            
            {/* Important Flag */}
            {message?.isImportant && (
              <div className="absolute -top-2 -right-2">
                <div className="w-4 h-4 bg-warning rounded-full flex items-center justify-center">
                  <Icon name="Star" size={10} color="white" />
                </div>
              </div>
            )}

            {/* Message Text */}
            <div className={`text-sm leading-relaxed ${
              isUser ? 'text-white' : 'text-text-primary'
            }`}>
              {message.content}
            </div>

            {/* Confidence Score for User Messages */}
            {isUser && message.confidence && (
              <div className="mt-2 pt-2 border-t border-white/20">
                <div className="flex items-center space-x-2 text-xs">
                  <Icon name="Mic" size={12} color="white" />
                  <span className="text-white/80">
                    Transcription: {formatConfidence(message.confidence)}% accuracy
                  </span>
                </div>
              </div>
            )}

            {/* Health Data Tags */}
            {message?.healthData && (
              <div className="mt-2 flex flex-wrap gap-1">
                {message.healthData.map((data, index) => (
                  <span 
                    key={index}
                    className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                      isUser 
                        ? 'bg-white/20 text-white' :'bg-primary/10 text-primary'
                    }`}
                  >
                    <Icon name="Tag" size={10} className="mr-1" />
                    {data}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Message Meta */}
          <div className={`flex items-center space-x-2 mt-1 text-xs text-text-muted ${
            isUser ? 'justify-end' : 'justify-start'
          }`}>
            <span>{format(message.timestamp, 'HH:mm')}</span>
            
            {/* Audio Indicator */}
            {message.audioUrl && (
              <div className="flex items-center space-x-1">
                <Icon name="Volume2" size={10} />
                <span>Audio available</span>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className={`absolute top-0 transition-opacity duration-200 ${
            showActions ? 'opacity-100' : 'opacity-0'
          } ${isUser ? '-left-20' : '-right-20'}`}>
            <div className="flex items-center space-x-1 p-1 bg-white rounded-medical shadow-medical-md border border-border">
              
              {/* Play Audio */}
              {message.audioUrl && (
                <Button
                  variant="ghost"
                  size="xs"
                  iconName={isAudioPlaying ? "Pause" : "Play"}
                  onClick={handlePlayAudio}
                  className="w-6 h-6"
                />
              )}

              {/* Toggle Important */}
              <Button
                variant="ghost"
                size="xs"
                iconName={message?.isImportant ? "StarOff" : "Star"}
                onClick={handleToggleImportant}
                className={`w-6 h-6 ${message?.isImportant ? 'text-warning' : ''}`}
              />

              {/* Copy Message */}
              <Button
                variant="ghost"
                size="xs"
                iconName="Copy"
                onClick={() => navigator.clipboard.writeText(message.content)}
                className="w-6 h-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;