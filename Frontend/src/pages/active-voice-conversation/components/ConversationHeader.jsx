import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationHeader = ({ 
  conversationDuration = 0, 
  onEmergency, 
  onEndConversation,
  showEmergencyTooltip = false 
}) => {
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-medical">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-medical">
                <Icon name="Activity" size={16} color="white" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-primary">
                HealthVitals AI
              </span>
            </div>

            {/* Active Session Indicator */}
            <div className="flex items-center space-x-3 px-4 py-2 rounded-medical border bg-primary/10 border-primary/30">
              <div className="w-2 h-2 bg-primary rounded-full animate-breathing"></div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-primary">
                  Active Session
                </span>
                {conversationDuration > 0 && (
                  <span className="text-xs text-text-secondary font-mono">
                    {formatDuration(conversationDuration)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Emergency Button */}
            <div className="relative">
              <Button
                variant="danger"
                size="sm"
                iconName="Phone"
                iconSize={16}
                onClick={onEmergency}
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

            {/* End Session Button */}
            <Button
              variant="outline"
              size="sm"
              iconName="PhoneOff"
              iconSize={16}
              onClick={onEndConversation}
              className="border-error text-error hover:bg-error hover:text-error-foreground"
            >
              <span className="hidden sm:inline">End Session</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;