import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentConversations = () => {
  const conversations = [
    {
      id: 1,
      date: '2024-01-15',
      time: '10:30 AM',
      duration: '12 min',
      topics: ['Blood Pressure', 'Medication', 'Exercise'],
      summary: 'Discussed recent blood pressure readings and medication adjustments.',
      mood: 'positive',
      healthScore: 85
    },
    {
      id: 2,
      date: '2024-01-14',
      time: '3:45 PM',
      duration: '8 min',
      topics: ['Sleep', 'Stress', 'Nutrition'],
      summary: 'Talked about sleep quality issues and stress management techniques.',
      mood: 'neutral',
      healthScore: 78
    },
    {
      id: 3,
      date: '2024-01-13',
      time: '9:15 AM',
      duration: '15 min',
      topics: ['Symptoms', 'Follow-up', 'Medication'],
      summary: 'Follow-up on previous symptoms and medication effectiveness.',
      mood: 'concerned',
      healthScore: 72
    },
    {
      id: 4,
      date: '2024-01-12',
      time: '6:20 PM',
      duration: '10 min',
      topics: ['Exercise', 'Goals', 'Progress'],
      summary: 'Reviewed weekly exercise goals and discussed progress.',
      mood: 'positive',
      healthScore: 88
    }
  ];

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'positive': return 'text-success';
      case 'neutral': return 'text-warning';
      case 'concerned': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getMoodIcon = (mood) => {
    switch (mood) {
      case 'positive': return 'Smile';
      case 'neutral': return 'Meh';
      case 'concerned': return 'Frown';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-background rounded-medical-lg shadow-medical p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="MessageCircle" size={24} className="text-primary" />
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Recent Conversations
          </h2>
        </div>
        <Button variant="outline" size="sm" iconName="MoreHorizontal" iconSize={16}>
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="p-4 rounded-medical border border-border hover:shadow-medical-sm transition-smooth"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-medical">
                  <Icon name="MessageCircle" size={18} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-text-primary">
                      {conversation.date}
                    </span>
                    <span className="text-text-secondary">•</span>
                    <span className="text-sm text-text-secondary">
                      {conversation.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-text-secondary">
                      Duration: {conversation.duration}
                    </span>
                    <span className="text-text-secondary">•</span>
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name={getMoodIcon(conversation.mood)} 
                        size={14} 
                        className={getMoodColor(conversation.mood)} 
                      />
                      <span className={`text-sm ${getMoodColor(conversation.mood)}`}>
                        {conversation.mood}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {conversation.healthScore}%
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-3">
              {conversation.summary}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {conversation.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-surface-100 text-text-secondary rounded-medical"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              
              <Button variant="ghost" size="sm" iconName="Eye" iconSize={14}>
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentConversations;