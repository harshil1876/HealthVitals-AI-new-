import React from 'react';
import Icon from '../../../components/AppIcon';

const VoiceRecordingButton = ({ 
  isRecording = false, 
  isProcessing = false, 
  onToggleRecording,
  audioLevel = 0 
}) => {
  const getButtonState = () => {
    if (isProcessing) {
      return {
        bgColor: 'bg-accent',
        hoverColor: 'hover:bg-accent/90',
        iconColor: 'text-white',
        icon: 'Brain',
        pulseClass: 'animate-gentle-pulse',
        shadowClass: 'shadow-lg shadow-accent/30'
      };
    } else if (isRecording) {
      return {
        bgColor: 'bg-primary',
        hoverColor: 'hover:bg-primary/90',
        iconColor: 'text-white',
        icon: 'Square',
        pulseClass: 'animate-breathing',
        shadowClass: 'shadow-lg shadow-primary/30'
      };
    } else {
      return {
        bgColor: 'bg-surface border-2 border-primary',
        hoverColor: 'hover:bg-primary hover:border-primary',
        iconColor: 'text-primary hover:text-white',
        icon: 'Mic',
        pulseClass: '',
        shadowClass: 'shadow-medical-lg hover:shadow-lg hover:shadow-primary/20'
      };
    }
  };

  const buttonState = getButtonState();

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Audio Level Visualization */}
      {isRecording && (
        <div className="flex items-center space-x-1 h-12">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-primary rounded-full transition-all duration-100"
              style={{
                height: `${Math.max(8, Math.min(48, (audioLevel + Math.random() * 20) * 2))}px`,
                opacity: audioLevel > i * 5 ? 1 : 0.3
              }}
            />
          ))}
        </div>
      )}

      {/* Main Recording Button */}
      <button
        onClick={onToggleRecording}
        disabled={isProcessing}
        className={`
          relative flex items-center justify-center w-24 h-24 lg:w-32 lg:h-32 
          rounded-full transition-all duration-300 focus-medical
          ${buttonState.bgColor} ${buttonState.hoverColor} ${buttonState.pulseClass} ${buttonState.shadowClass}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <Icon 
          name={buttonState.icon} 
          size={isRecording ? 32 : 40} 
          className={`transition-all duration-300 ${buttonState.iconColor}`}
        />
        
        {/* Recording Ring Animation */}
        {isRecording && (
          <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping"></div>
        )}
      </button>

      {/* Button Label */}
      <div className="text-center">
        <p className="text-sm font-medium text-text-primary">
          {isProcessing ? 'Processing...' : isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
        </p>
        <p className="text-xs text-text-secondary mt-1">
          {isRecording ? 'Speak clearly into your microphone' : 'Hold down for continuous recording'}
        </p>
      </div>
    </div>
  );
};

export default VoiceRecordingButton;