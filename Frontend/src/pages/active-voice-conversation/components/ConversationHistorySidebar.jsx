import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationHistorySidebar = ({ recentConversations = [], onLoadConversation }) => {
  const navigate = useNavigate();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getConversationIcon = (topic) => {
    switch (topic) {
      case 'vitals': return 'Activity';
      case 'symptoms': return 'AlertCircle';
      case 'medication': return 'Pill';
      case 'checkup': return 'Stethoscope';
      default: return 'MessageCircle';
    }
  };

  return (
    <div className="h-full flex flex-col bg-surface border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border bg-background">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-text-primary">Recent Conversations</h3>
          <Button
            variant="ghost"
            size="xs"
            iconName="History"
            iconSize={14}
            onClick={() => navigate('/conversation-history-transcripts')}
          >
            View All
          </Button>
        </div>
        <p className="text-xs text-text-secondary mt-1">
          Quick access to your recent health conversations
        </p>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {recentConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <Icon name="MessageSquare" size={40} className="text-text-muted mb-3" />
            <h4 className="font-medium text-text-primary mb-2">No Recent Conversations</h4>
            <p className="text-sm text-text-secondary">
              Your conversation history will appear here once you start chatting with the AI.
            </p>
          </div>
        ) : (
          <div className="p-2">
            {recentConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onLoadConversation(conversation.id)}
                className="w-full p-3 mb-2 text-left rounded-medical border border-transparent hover:border-primary hover:bg-primary/5 transition-smooth focus-medical"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-medical flex-shrink-0">
                    <Icon 
                      name={getConversationIcon(conversation.primaryTopic)} 
                      size={14} 
                      className="text-primary"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm text-text-primary truncate">
                        {conversation.title}
                      </h4>
                      <span className="text-xs text-text-secondary flex-shrink-0 ml-2">
                        {formatDate(conversation.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                      {conversation.summary}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <Icon name="MessageSquare" size={10} className="text-text-muted" />
                        <span className="text-xs text-text-muted">
                          {conversation.messageCount} messages
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={10} className="text-text-muted" />
                        <span className="text-xs text-text-muted">
                          {conversation.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border bg-background">
        <div className="space-y-2">
          <Button
            variant="primary"
            size="sm"
            iconName="Plus"
            iconSize={14}
            onClick={() => navigate('/voice-conversation-dashboard')}
            className="w-full"
          >
            New Conversation
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="BarChart3"
            iconSize={14}
            onClick={() => navigate('/health-insights-analytics')}
            className="w-full"
          >
            View Insights
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationHistorySidebar;