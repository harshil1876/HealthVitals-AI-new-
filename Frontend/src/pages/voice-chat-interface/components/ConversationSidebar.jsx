import React from 'react';
import { format } from 'date-fns';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const ConversationSidebar = ({ 
  conversations, 
  searchQuery, 
  onSearchChange, 
  onSelectConversation,
  selectedConversation 
}) => {
  
  const ConversationItem = ({ conversation }) => {
    const isSelected = selectedConversation?.id === conversation.id;
    
    return (
      <button
        onClick={() => onSelectConversation(conversation)}
        className={`w-full text-left p-3 rounded-medical transition-colors ${
          isSelected 
            ? 'bg-primary/10 border-primary/20 border' :'hover:bg-surface-100 border border-transparent'
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-text-primary text-sm truncate flex-1">
            {conversation.title}
          </h4>
          <span className="text-xs text-text-muted ml-2 flex-shrink-0">
            {format(conversation.timestamp, 'MMM d')}
          </span>
        </div>
        
        <p className="text-xs text-text-secondary line-clamp-2 mb-2">
          {conversation.summary}
        </p>
        
        <div className="flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <Icon name="MessageSquare" size={12} />
              <span>{conversation.messageCount}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{conversation.duration}m</span>
            </span>
          </div>
        </div>
        
        {conversation.topics && (
          <div className="flex flex-wrap gap-1 mt-2">
            {conversation.topics.slice(0, 2).map((topic, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded text-2xs bg-surface-200 text-text-secondary"
              >
                {topic}
              </span>
            ))}
            {conversation.topics.length > 2 && (
              <span className="text-2xs text-text-muted">
                +{conversation.topics.length - 2}
              </span>
            )}
          </div>
        )}
      </button>
    );
  };

  const ConversationGroup = ({ title, conversations, isCollapsed = false }) => {
    if (conversations.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-sm font-medium text-text-primary mb-3 px-3">
          {title} ({conversations.length})
        </h3>
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <ConversationItem 
              key={conversation.id} 
              conversation={conversation} 
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Conversations
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="Plus"
            className="w-8 h-8"
          />
        </div>
        
        {/* Search */}
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <ConversationGroup 
          title="Today" 
          conversations={conversations.today} 
        />
        <ConversationGroup 
          title="Yesterday" 
          conversations={conversations.yesterday} 
        />
        <ConversationGroup 
          title="This Week" 
          conversations={conversations.thisWeek} 
        />
        <ConversationGroup 
          title="Older" 
          conversations={conversations.older} 
        />
        
        {/* Empty State */}
        {Object.values(conversations).every(group => group.length === 0) && (
          <div className="text-center py-8">
            <Icon name="MessageSquare" size={48} className="mx-auto text-text-muted mb-4" />
            <h3 className="text-sm font-medium text-text-primary mb-2">
              No conversations found
            </h3>
            <p className="text-xs text-text-secondary">
              {searchQuery ? 'Try adjusting your search' : 'Start a new conversation to see it here'}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>
            {Object.values(conversations).reduce((acc, group) => acc + group.length, 0)} conversations
          </span>
          <Button
            variant="ghost"
            size="xs"
            iconName="Archive"
            className="text-text-muted hover:text-text-primary"
          >
            Archive
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationSidebar;