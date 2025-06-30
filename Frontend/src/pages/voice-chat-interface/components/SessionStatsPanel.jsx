import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const SessionStatsPanel = ({ 
  sessionDuration = 0, 
  topicsCovered = [], 
  healthDataPoints = 0, 
  messageCount = 0 
}) => {
  
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionQuality = () => {
    const score = Math.min(100, (topicsCovered.length * 20) + (healthDataPoints * 10) + Math.min(messageCount * 2, 40));
    
    if (score >= 80) return { label: 'Excellent', color: 'text-success', bgColor: 'bg-success-50' };
    if (score >= 60) return { label: 'Good', color: 'text-secondary', bgColor: 'bg-secondary-50' };
    if (score >= 40) return { label: 'Fair', color: 'text-warning', bgColor: 'bg-warning-50' };
    return { label: 'Basic', color: 'text-text-muted', bgColor: 'bg-surface-100' };
  };

  const generateSessionSummary = () => {
    if (messageCount < 3) {
      return "Session just started. Continue the conversation to get more insights.";
    }

    const topics = topicsCovered.length;
    const vitals = healthDataPoints;
    
    let summary = `Productive session covering ${topics} health topic${topics !== 1 ? 's' : ''}`;
    
    if (vitals > 0) {
      summary += ` with ${vitals} vital measurement${vitals !== 1 ? 's' : ''} recorded`;
    }
    
    summary += `. Session duration: ${formatDuration(sessionDuration)}.`;
    
    return summary;
  };

  const getImprovementSuggestions = () => {
    const suggestions = [];
    
    if (healthDataPoints === 0) {
      suggestions.push("Consider sharing vital measurements for better health tracking");
    }
    
    if (topicsCovered.length < 3 && sessionDuration > 300) {
      suggestions.push("Explore more health topics to maximize session value");
    }
    
    if (messageCount < 10 && sessionDuration > 600) {
      suggestions.push("More detailed responses could improve AI assistance quality");
    }
    
    if (sessionDuration > 1800) { // 30 minutes
      suggestions.push("Consider taking a break for better focus and engagement");
    }
    
    if (suggestions.length === 0) {
      suggestions.push("Great session! Continue sharing health information for personalized insights");
    }
    
    return suggestions;
  };

  const sessionQuality = getSessionQuality();
  const improvements = getImprovementSuggestions();

  return (
    <div className="p-4 space-y-4">
      {/* Session Stats Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-text-primary">
          Session Stats
        </h4>
        <div className={`px-2 py-1 rounded text-xs font-medium ${sessionQuality.bgColor} ${sessionQuality.color}`}>
          {sessionQuality.label}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface-100 rounded-medical p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Clock" size={14} className="text-primary" />
            <span className="text-xs font-medium text-text-secondary">Duration</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">
            {formatDuration(sessionDuration)}
          </p>
        </div>

        <div className="bg-surface-100 rounded-medical p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="MessageSquare" size={14} className="text-secondary" />
            <span className="text-xs font-medium text-text-secondary">Messages</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">
            {messageCount}
          </p>
        </div>

        <div className="bg-surface-100 rounded-medical p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Tag" size={14} className="text-accent" />
            <span className="text-xs font-medium text-text-secondary">Topics</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">
            {topicsCovered.length}
          </p>
        </div>

        <div className="bg-surface-100 rounded-medical p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Activity" size={14} className="text-warning" />
            <span className="text-xs font-medium text-text-secondary">Vitals</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">
            {healthDataPoints}
          </p>
        </div>
      </div>

      {/* Topics Covered */}
      {topicsCovered.length > 0 && (
        <div>
          <h5 className="text-xs font-medium text-text-secondary mb-2">
            Topics Covered
          </h5>
          <div className="flex flex-wrap gap-1">
            {topicsCovered.map((topic, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded text-2xs"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Session Summary */}
      <div>
        <h5 className="text-xs font-medium text-text-secondary mb-2 flex items-center space-x-1">
          <Icon name="FileText" size={12} />
          <span>Session Summary</span>
        </h5>
        <p className="text-xs text-text-primary leading-relaxed bg-surface-100 p-3 rounded-medical">
          {generateSessionSummary()}
        </p>
      </div>

      {/* Improvements */}
      <div>
        <h5 className="text-xs font-medium text-text-secondary mb-2 flex items-center space-x-1">
          <Icon name="TrendingUp" size={12} />
          <span>Improvements</span>
        </h5>
        <div className="space-y-2">
          {improvements.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 text-xs text-text-primary bg-accent/5 p-2 rounded-medical"
            >
              <Icon name="Lightbulb" size={12} className="text-accent mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">{suggestion}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 border-t border-border space-y-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          fullWidth
          className="text-xs"
        >
          Export Session
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Share"
          fullWidth
          className="text-xs"
        >
          Share Summary
        </Button>
      </div>
    </div>
  );
};

export default SessionStatsPanel;