import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FloatingActionButton = () => {
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleStartConversation = () => {
    navigate('/active-voice-conversation');
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    setIsPressed(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-text-primary text-white text-sm rounded-medical shadow-medical-lg whitespace-nowrap animate-fade-in">
          Start New Conversation
          <div className="absolute top-full right-4 w-2 h-2 bg-text-primary transform rotate-45 -mt-1"></div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={handleStartConversation}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-medical-lg transition-smooth focus-medical hover:scale-110 hover:shadow-medical-xl ${
          isPressed ? 'scale-95' : ''
        } ambient-glow`}
      >
        <Icon 
          name="Mic" 
          size={24} 
          color="white" 
          className="drop-shadow-sm"
        />
        
        {/* Pulse Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-gentle-pulse"></div>
        
        {/* Breathing Ring */}
        <div className="absolute inset-0 rounded-full border border-primary/20 animate-breathing scale-125"></div>
      </button>
    </div>
  );
};

export default FloatingActionButton;