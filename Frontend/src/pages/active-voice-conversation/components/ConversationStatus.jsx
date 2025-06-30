import React from 'react';
import Icon from '../../../components/AppIcon';

const ConversationStatus = ({ status = 'idle', aiThinking = false }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'listening':
        return {
          icon: 'Mic',
          text: 'Listening to your voice...',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/30',
          textColor: 'text-primary',
          iconColor: 'text-primary',
          pulseClass: 'animate-breathing'
        };
      case 'processing':
        return {
          icon: 'Brain',
          text: 'Processing your message...',
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent/30',
          textColor: 'text-accent',
          iconColor: 'text-accent',
          pulseClass: 'animate-gentle-pulse'
        };
      case 'speaking':
        return {
          icon: 'Volume2',
          text: 'AI is responding...',
          bgColor: 'bg-secondary/10',
          borderColor: 'border-secondary/30',
          textColor: 'text-secondary',
          iconColor: 'text-secondary',
          pulseClass: 'animate-breathing'
        };
      default:
        return {
          icon: 'MessageCircle',
          text: 'Ready to listen',
          bgColor: 'bg-surface',
          borderColor: 'border-border',
          textColor: 'text-text-secondary',
          iconColor: 'text-text-secondary',
          pulseClass: ''
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="flex flex-col items-center space-y-4 mb-8">
      {/* Status Indicator */}
      <div className={`flex items-center space-x-3 px-6 py-3 rounded-medical border ${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.pulseClass}`}>
        <Icon 
          name={statusConfig.icon} 
          size={20} 
          className={statusConfig.iconColor}
        />
        <span className={`text-sm font-medium ${statusConfig.textColor}`}>
          {statusConfig.text}
        </span>
      </div>

      {/* AI Thinking Indicator */}
      {aiThinking && (
        <div className="flex items-center space-x-2 px-4 py-2 bg-accent/5 rounded-medical border border-accent/20">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="text-xs text-accent font-medium">AI is thinking...</span>
        </div>
      )}
    </div>
  );
};

export default ConversationStatus;