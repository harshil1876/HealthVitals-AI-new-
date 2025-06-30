import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StartConversationCard = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const quickTopics = [
    { id: 1, label: 'Vital Signs', icon: 'Heart', color: 'text-primary' },
    { id: 2, label: 'Symptoms', icon: 'AlertCircle', color: 'text-warning' },
    { id: 3, label: 'General Wellness', icon: 'Smile', color: 'text-secondary' },
    { id: 4, label: 'Medication', icon: 'Pill', color: 'text-accent' }
  ];

  const handleStartConversation = () => {
    navigate('/active-voice-conversation');
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-medical-lg border border-primary/20 shadow-medical-lg overflow-hidden">
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary mb-1">
              Start New Conversation
            </h2>
            <p className="text-sm text-text-secondary">
              {formattedDate} • {formattedTime}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-secondary rounded-full animate-breathing"></div>
            <span className="text-xs text-secondary font-medium">AI Ready</span>
          </div>
        </div>

        {/* Main Action Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleStartConversation}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative flex items-center justify-center w-24 h-24 bg-primary rounded-full shadow-medical-lg transition-smooth focus-medical hover:scale-105 hover:shadow-medical-xl ${
              isHovered ? 'ambient-glow' : ''
            }`}
          >
            <Icon 
              name="Mic" 
              size={32} 
              color="white" 
              className="drop-shadow-sm"
            />
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-gentle-pulse"></div>
          </button>
        </div>

        <div className="text-center mb-6">
          <p className="text-text-secondary text-sm mb-2">
            Tap the microphone to begin your health conversation
          </p>
          <p className="text-xs text-text-muted">
            Your conversation will be securely processed and stored
          </p>
        </div>
      </div>

      {/* Quick Topics Section */}
      <div className="px-6 pb-6">
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Quick Health Topics
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={handleStartConversation}
              className="flex items-center space-x-2 p-3 bg-background rounded-medical border border-border transition-smooth focus-medical hover:border-primary/30 hover:bg-primary/5"
            >
              <Icon 
                name={topic.icon} 
                size={16} 
                className={topic.color}
              />
              <span className="text-sm font-medium text-text-primary truncate">
                {topic.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Alternative Actions */}
      <div className="px-6 pb-6 border-t border-border/50 pt-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="History"
            iconSize={16}
            onClick={() => navigate('/conversation-history-transcripts')}
            className="flex-1"
          >
            View History
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="BarChart3"
            iconSize={16}
            onClick={() => navigate('/health-insights-analytics')}
            className="flex-1"
          >
            Health Insights
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartConversationCard;