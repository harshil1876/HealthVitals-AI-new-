import React from 'react';
import Icon from '../../../components/AppIcon';

const TopicAnalysisGrid = ({ topics }) => {
  const getTopicIcon = (category) => {
    switch (category) {
      case 'symptoms': return 'AlertCircle';
      case 'medications': return 'Pill';
      case 'exercise': return 'Dumbbell';
      case 'nutrition': return 'Apple';
      case 'sleep': return 'Moon';
      case 'mental-health': return 'Brain';
      case 'vitals': return 'Activity';
      default: return 'MessageSquare';
    }
  };

  const getTopicColor = (category) => {
    switch (category) {
      case 'symptoms': return 'bg-error/10 text-error border-error/20';
      case 'medications': return 'bg-primary/10 text-primary border-primary/20';
      case 'exercise': return 'bg-success/10 text-success border-success/20';
      case 'nutrition': return 'bg-warning/10 text-warning border-warning/20';
      case 'sleep': return 'bg-accent/10 text-accent border-accent/20';
      case 'mental-health': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'vitals': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-surface text-text-secondary border-border';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className={`border rounded-lg p-4 shadow-medical-sm hover:shadow-medical transition-smooth cursor-pointer ${getTopicColor(topic.category)}`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getTopicIcon(topic.category)} 
                size={20} 
                color="currentColor"
              />
              <h3 className="font-medium">{topic.name}</h3>
            </div>
            <span className="text-sm font-medium">{topic.frequency}</span>
          </div>

          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-sm">
              <span className="opacity-80">Conversations</span>
              <span className="font-medium">{topic.conversationCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-80">Avg Duration</span>
              <span className="font-medium">{topic.avgDuration}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-80">Last Discussed</span>
              <span className="font-medium">{topic.lastDiscussed}</span>
            </div>
          </div>

          {topic.keyInsights && topic.keyInsights.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-sm font-medium opacity-90">Key Insights</h4>
              <ul className="space-y-1">
                {topic.keyInsights.slice(0, 2).map((insight, index) => (
                  <li key={index} className="flex items-start space-x-1">
                    <Icon name="ChevronRight" size={12} className="mt-0.5 flex-shrink-0 opacity-60" />
                    <span className="text-xs opacity-80">{insight}</span>
                  </li>
                ))}
              </ul>
              {topic.keyInsights.length > 2 && (
                <p className="text-xs opacity-60">+{topic.keyInsights.length - 2} more insights</p>
              )}
            </div>
          )}

          {topic.trend && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-current border-opacity-20">
              <span className="text-xs opacity-80">Trend</span>
              <div className="flex items-center space-x-1">
                <Icon 
                  name={topic.trend === 'increasing' ? 'TrendingUp' : topic.trend === 'decreasing' ? 'TrendingDown' : 'Minus'} 
                  size={12} 
                />
                <span className="text-xs font-medium">{topic.trendValue}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopicAnalysisGrid;