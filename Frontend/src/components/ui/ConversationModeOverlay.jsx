import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ConversationModeOverlay = ({ 
  conversationStatus = 'idle', 
  onEmergency, 
  onEndConversation,
  conversationDuration = 0 
}) => {
  const navigate = useNavigate();
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [showEmergencyTooltip, setShowEmergencyTooltip] = useState(false);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusConfig = () => {
    switch (conversationStatus) {
      case 'recording':
        return {
          icon: 'Mic',
          text: 'Listening...',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/30',
          textColor: 'text-primary',
          iconColor: 'text-primary',
          pulseClass: 'animate-breathing'
        };
      case 'processing':
        return {
          icon: 'Brain',
          text: 'Processing...',
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent/30',
          textColor: 'text-accent',
          iconColor: 'text-accent',
          pulseClass: 'animate-gentle-pulse'
        };
      case 'speaking':
        return {
          icon: 'Volume2',
          text: 'Speaking...',
          bgColor: 'bg-secondary/10',
          borderColor: 'border-secondary/30',
          textColor: 'text-secondary',
          iconColor: 'text-secondary',
          pulseClass: 'animate-breathing'
        };
      default:
        return {
          icon: 'MessageCircle',
          text: 'Ready',
          bgColor: 'bg-surface',
          borderColor: 'border-border',
          textColor: 'text-text-secondary',
          iconColor: 'text-text-secondary',
          pulseClass: ''
        };
    }
  };

  const statusConfig = getStatusConfig();

  const handleEmergencyClick = () => {
    if (onEmergency) {
      onEmergency();
    }
    setShowEmergencyTooltip(true);
    setTimeout(() => setShowEmergencyTooltip(false), 2000);
  };

  const handleEndConversation = () => {
    if (onEndConversation) {
      onEndConversation();
    }
    navigate('/main-dashboard');
  };

  const handleBackToDashboard = () => {
    navigate('/main-dashboard');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-medical animate-slide-in">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Minimal Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2 transition-smooth focus-medical hover:opacity-80"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-medical">
                <Icon name="Activity" size={16} color="white" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-primary">
                HealthVitals AI
              </span>
            </button>

            {/* Conversation Status */}
            <div className={`flex items-center space-x-3 px-4 py-2 rounded-medical border ${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.pulseClass}`}>
              <Icon 
                name={statusConfig.icon} 
                size={16} 
                className={statusConfig.iconColor}
              />
              <div className="flex flex-col">
                <span className={`text-sm font-medium ${statusConfig.textColor}`}>
                  {statusConfig.text}
                </span>
                {conversationDuration > 0 && (
                  <span className="text-xs text-text-secondary font-mono">
                    {formatDuration(conversationDuration)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Controls */}
          <div className="flex items-center space-x-3">
            {/* Emergency Button */}
            <div className="relative">
              <Button
                variant="danger"
                size="sm"
                iconName="Phone"
                iconSize={16}
                onClick={handleEmergencyClick}
                className="shadow-medical-sm"
              >
                <span className="hidden sm:inline">Emergency</span>
              </Button>
              
              {showEmergencyTooltip && (
                <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-text-primary text-white text-sm rounded-medical shadow-medical-lg animate-fade-in z-60">
                  Emergency services contacted
                  <div className="absolute -top-1 right-4 w-2 h-2 bg-text-primary transform rotate-45"></div>
                </div>
              )}
            </div>

            {/* End Conversation Button */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                iconName="PhoneOff"
                iconSize={16}
                onClick={() => setShowEndConfirm(true)}
                className="border-error text-error hover:bg-error hover:text-error-foreground"
              >
                <span className="hidden sm:inline">End Session</span>
              </Button>

              {/* End Confirmation Dropdown */}
              {showEndConfirm && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-background border border-border rounded-medical-lg shadow-medical-lg animate-scale-in z-60">
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="AlertTriangle" size={16} className="text-warning" />
                      <h3 className="font-medium text-text-primary">End Conversation?</h3>
                    </div>
                    <p className="text-sm text-text-secondary mb-4">
                      This will end your current health conversation session. Your conversation will be saved to history.
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={handleEndConversation}
                        className="flex-1"
                      >
                        End Session
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowEndConfirm(false)}
                        className="flex-1"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close confirmation */}
      {showEndConfirm && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowEndConfirm(false)}
        />
      )}
    </div>
  );
};

export default ConversationModeOverlay;