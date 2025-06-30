import React from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const VoiceControls = ({
  isRecording = false,
  isListening = false,
  voiceLevel = 0,
  transcriptionText = '',
  accuracy = 95,
  onToggleRecording
}) => {
  
  const getRecordingStatus = () => {
    if (isRecording && isListening) return 'Listening...';
    if (isRecording && !isListening) return 'Processing...';
    return 'Ready to listen';
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 95) return 'text-success';
    if (accuracy >= 85) return 'text-warning';
    return 'text-error';
  };

  const getVoiceLevelColor = (level) => {
    if (level > 70) return 'bg-success';
    if (level > 40) return 'bg-warning';
    return 'bg-accent';
  };

  return (
    <div className="space-y-4">
      {/* Voice Recording Button & Status */}
      <div className="flex items-center justify-center space-x-4">
        {/* Recording Button */}
        <div className="relative">
          <Button
            variant={isRecording ? "danger" : "primary"}
            size="lg"
            onClick={onToggleRecording}
            className={`w-16 h-16 rounded-full transition-all duration-300 ${
              isRecording 
                ? 'animate-gentle-pulse shadow-glow' 
                : 'hover:scale-105 shadow-medical-lg'
            }`}
          >
            <Icon 
              name={isRecording ? "Square" : "Mic"} 
              size={24} 
              color="white" 
            />
          </Button>
          
          {/* Voice Level Indicator */}
          {isRecording && (
            <div className="absolute -inset-2 rounded-full border-2 border-primary/30">
              <div 
                className={`absolute inset-0 rounded-full transition-all duration-100 ${getVoiceLevelColor(voiceLevel)}`}
                style={{
                  opacity: Math.max(0.1, voiceLevel / 100),
                  transform: `scale(${1 + (voiceLevel / 200)})`
                }}
              />
            </div>
          )}
        </div>

        {/* Status & Controls */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-2 h-2 rounded-full ${
              isRecording ? 'bg-error animate-breathing' : 'bg-text-muted'
            }`} />
            <span className="text-sm font-medium text-text-primary">
              {getRecordingStatus()}
            </span>
            {isRecording && (
              <div className="flex items-center space-x-1 text-xs text-text-secondary">
                <Icon name="Volume2" size={12} />
                <span>Accuracy: </span>
                <span className={`font-medium ${getAccuracyColor(accuracy)}`}>
                  {accuracy}%
                </span>
              </div>
            )}
          </div>

          {/* Voice Level Bar */}
          {isRecording && (
            <div className="w-full bg-surface-200 rounded-full h-2 mb-2">
              <div 
                className={`h-2 rounded-full transition-all duration-100 ${getVoiceLevelColor(voiceLevel)}`}
                style={{ width: `${Math.max(5, voiceLevel)}%` }}
              />
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="xs"
              iconName="Pause"
              disabled={!isRecording}
              className="text-xs"
            >
              Pause
            </Button>
            <Button
              variant="ghost"
              size="xs"
              iconName="SkipForward"
              disabled={!isRecording}
              className="text-xs"
            >
              Skip
            </Button>
            <div className="flex-1" />
            <Button
              variant="ghost"
              size="xs"
              iconName="Settings"
              className="text-xs"
            >
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Real-time Transcription */}
      {transcriptionText && (
        <div className="bg-surface-100 border border-border rounded-medical p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-text-secondary flex items-center space-x-1">
              <Icon name="Type" size={12} />
              <span>Live Transcription</span>
            </span>
            <span className={`text-xs font-medium ${getAccuracyColor(accuracy)}`}>
              {accuracy}% confidence
            </span>
          </div>
          <p className="text-sm text-text-primary leading-relaxed">
            {transcriptionText}
            {isRecording && (
              <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
            )}
          </p>
        </div>
      )}

      {/* Voice Commands Help */}
      <div className="flex items-center justify-center space-x-4 text-xs text-text-muted">
        <div className="flex items-center space-x-1">
          <Icon name="Mic" size={12} />
          <span>Say "Hey Health" to activate</span>
        </div>
        <div className="w-1 h-1 bg-text-muted rounded-full" />
        <div className="flex items-center space-x-1">
          <Icon name="Square" size={12} />
          <span>Click to stop recording</span>
        </div>
      </div>
    </div>
  );
};

export default VoiceControls;