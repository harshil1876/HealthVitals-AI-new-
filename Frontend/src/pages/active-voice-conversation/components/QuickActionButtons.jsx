import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActionButtons = ({ 
  onPauseConversation, 
  onAddVoiceNote, 
  onQuickHealthTopic,
  isPaused = false 
}) => {
  const healthTopics = [
    { id: 'pain', label: 'Pain Level', icon: 'Zap' },
    { id: 'medication', label: 'Medication', icon: 'Pill' },
    { id: 'symptoms', label: 'Symptoms', icon: 'AlertCircle' },
    { id: 'vitals', label: 'Vital Signs', icon: 'Activity' }
  ];

  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant={isPaused ? "primary" : "outline"}
          size="sm"
          iconName={isPaused ? "Play" : "Pause"}
          iconSize={16}
          onClick={onPauseConversation}
          className="min-w-[120px]"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </Button>

        <Button
          variant="secondary"
          size="sm"
          iconName="FileText"
          iconSize={16}
          onClick={onAddVoiceNote}
          className="min-w-[120px]"
        >
          Voice Note
        </Button>
      </div>

      {/* Quick Health Topics */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-text-primary text-center">
          Quick Health Topics
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {healthTopics.map((topic) => (
            <Button
              key={topic.id}
              variant="ghost"
              size="sm"
              iconName={topic.icon}
              iconSize={14}
              onClick={() => onQuickHealthTopic(topic.id)}
              className="flex-col h-16 text-xs border border-border hover:border-primary hover:bg-primary/5"
            >
              <span className="mt-1">{topic.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Emergency Actions */}
      <div className="pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-text-secondary mb-2">
            Need immediate help?
          </p>
          <Button
            variant="danger"
            size="sm"
            iconName="Phone"
            iconSize={16}
            onClick={() => onQuickHealthTopic('emergency')}
            className="w-full"
          >
            Emergency Alert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionButtons;