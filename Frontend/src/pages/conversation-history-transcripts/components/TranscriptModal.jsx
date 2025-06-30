import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TranscriptModal = ({ 
  conversation, 
  isOpen, 
  onClose, 
  onPlayAudio, 
  onExport 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedSegment, setHighlightedSegment] = useState(null);
  const modalRef = useRef(null);
  const transcriptRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !conversation) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSegmentClick = (timestamp) => {
    setCurrentAudioTime(timestamp);
    setHighlightedSegment(timestamp);
    onPlayAudio(conversation.id, timestamp);
  };

  const highlightSearchText = (text, query) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-warning/30 text-text-primary">$1</mark>');
  };

  const filteredTranscript = conversation.transcript.filter(segment =>
    !searchQuery || segment.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        ref={modalRef}
        className="w-full max-w-4xl max-h-[90vh] bg-background rounded-medical-lg shadow-medical-lg animate-scale-in overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-surface">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              {conversation.title}
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              {new Intl.DateTimeFormat('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }).format(new Date(conversation.date))}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconSize={20}
            onClick={onClose}
            className="flex-shrink-0"
          />
        </div>

        {/* Controls */}
        <div className="p-4 border-b border-border bg-surface-50">
          <div className="flex items-center justify-between mb-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Search" size={16} className="text-text-secondary" />
                </div>
                <Input
                  type="search"
                  placeholder="Search in transcript..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                iconName={isPlaying ? "Pause" : "Play"}
                iconSize={16}
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  onPlayAudio(conversation.id, currentAudioTime);
                }}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconSize={16}
                onClick={() => onExport(conversation.id)}
              >
                Export
              </Button>
            </div>
          </div>

          {/* Audio Progress */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-text-secondary font-mono">
              {formatTime(currentAudioTime)}
            </span>
            <div className="flex-1 h-2 bg-surface-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(currentAudioTime / conversation.duration) * 100}%` }}
              />
            </div>
            <span className="text-sm text-text-secondary font-mono">
              {formatTime(conversation.duration)}
            </span>
          </div>
        </div>

        {/* Transcript Content */}
        <div 
          ref={transcriptRef}
          className="flex-1 overflow-y-auto p-6 max-h-[60vh]"
        >
          {filteredTranscript.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary">
                {searchQuery ? 'No matches found for your search.' : 'No transcript available.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTranscript.map((segment, index) => (
                <div
                  key={index}
                  className={`group cursor-pointer p-4 rounded-medical border transition-smooth hover:bg-surface-50 ${
                    highlightedSegment === segment.timestamp
                      ? 'bg-primary/10 border-primary/30' :'border-border'
                  }`}
                  onClick={() => handleSegmentClick(segment.timestamp)}
                >
                  <div className="flex items-start space-x-3">
                    {/* Speaker Avatar */}
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium flex-shrink-0 ${
                      segment.speaker === 'user' ?'bg-primary text-primary-foreground' :'bg-secondary text-secondary-foreground'
                    }`}>
                      {segment.speaker === 'user' ? 'U' : 'AI'}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-text-primary">
                          {segment.speaker === 'user' ? 'You' : 'HealthVitals AI'}
                        </span>
                        <span className="text-xs text-text-secondary font-mono">
                          {formatTime(segment.timestamp)}
                        </span>
                        {segment.healthData && (
                          <Icon name="Activity" size={14} className="text-primary" />
                        )}
                      </div>
                      
                      <p 
                        className="text-text-primary leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchText(segment.text, searchQuery)
                        }}
                      />

                      {/* Health Data Indicators */}
                      {segment.healthData && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {segment.healthData.map((data, dataIndex) => (
                            <span
                              key={dataIndex}
                              className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-medical border border-primary/20"
                            >
                              <Icon name={data.icon} size={12} />
                              <span>{data.label}: {data.value}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Play Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Play"
                      iconSize={14}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSegmentClick(segment.timestamp);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-smooth"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <span>
              {filteredTranscript.length} of {conversation.transcript.length} segments
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            <span>
              Duration: {Math.floor(conversation.duration / 60)}m {conversation.duration % 60}s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscriptModal;