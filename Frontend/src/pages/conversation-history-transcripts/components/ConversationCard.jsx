import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationCard = ({ 
  conversation, 
  onPlayAudio, 
  onViewTranscript, 
  onExport, 
  onShare, 
  onDelete,
  isSelected,
  onSelect 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const getHealthCategoryColor = (category) => {
    const colors = {
      'vital-signs': 'bg-primary/10 text-primary border-primary/20',
      'symptoms': 'bg-warning/10 text-warning border-warning/20',
      'medication': 'bg-secondary/10 text-secondary border-secondary/20',
      'mental-health': 'bg-accent/10 text-accent border-accent/20',
      'general': 'bg-surface-200 text-text-secondary border-border'
    };
    return colors[category] || colors['general'];
  };

  return (
    <div className={`bg-background border rounded-medical-lg shadow-medical transition-smooth hover:shadow-medical-md ${
      isSelected ? 'border-primary bg-primary/5' : 'border-border'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {/* Selection Checkbox */}
            <div className="flex items-center pt-1">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => onSelect(conversation.id, e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
            </div>

            {/* Conversation Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-medium text-text-primary truncate">
                  {conversation.title}
                </h3>
                {conversation.hasImportantData && (
                  <Icon name="AlertCircle" size={16} className="text-warning flex-shrink-0" />
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
                <span className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>{formatDate(conversation.date)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{formatDuration(conversation.duration)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="MessageCircle" size={14} />
                  <span>{conversation.messageCount} messages</span>
                </span>
              </div>

              {/* Health Categories */}
              <div className="flex flex-wrap gap-2 mb-3">
                {conversation.healthCategories.map((category, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs font-medium rounded-medical border ${getHealthCategoryColor(category.type)}`}
                  >
                    {category.label}
                  </span>
                ))}
              </div>

              {/* Summary Preview */}
              <p className="text-sm text-text-secondary line-clamp-2">
                {conversation.summary}
              </p>
            </div>
          </div>

          {/* Expand Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0 ml-2"
          />
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 bg-surface-50">
          {/* Key Health Data */}
          {conversation.keyHealthData.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-text-primary mb-2">Key Health Data</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {conversation.keyHealthData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-background rounded-medical border border-border">
                    <Icon name={data.icon} size={16} className="text-primary" />
                    <div>
                      <span className="text-sm font-medium text-text-primary">{data.label}</span>
                      <span className="text-sm text-text-secondary ml-2">{data.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transcript Preview */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-text-primary mb-2">Conversation Preview</h4>
            <div className="bg-background rounded-medical border border-border p-3">
              <p className="text-sm text-text-secondary line-clamp-3">
                {conversation.transcriptPreview}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="primary"
              size="sm"
              iconName="Play"
              iconSize={14}
              onClick={() => onPlayAudio(conversation.id)}
            >
              Play Audio
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="FileText"
              iconSize={14}
              onClick={() => onViewTranscript(conversation.id)}
            >
              View Transcript
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconSize={14}
              onClick={() => onExport(conversation.id)}
            >
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              iconSize={14}
              onClick={() => onShare(conversation.id)}
            >
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Trash2"
              iconSize={14}
              onClick={() => onDelete(conversation.id)}
              className="border-error text-error hover:bg-error hover:text-error-foreground ml-auto"
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationCard;