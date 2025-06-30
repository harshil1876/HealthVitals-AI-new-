import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentInsights = () => {
  const insights = [
    {
      id: 1,
      title: 'Blood Pressure Improvement',
      description: 'Your blood pressure readings have shown consistent improvement over the past week.',
      priority: 'high',
      type: 'health',
      timestamp: '2 hours ago',
      icon: 'Heart'
    },
    {
      id: 2,
      title: 'Sleep Pattern Analysis',
      description: 'Your sleep quality has improved by 15% this week. Consider maintaining your current routine.',
      priority: 'medium',
      type: 'wellness',
      timestamp: '1 day ago',
      icon: 'Moon'
    },
    {
      id: 3,
      title: 'Medication Reminder',
      description: 'Time to refill your monthly medication prescription.',
      priority: 'high',
      type: 'medication',
      timestamp: '3 days ago',
      icon: 'Pill'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error/10 border-error/20';
      case 'medium': return 'bg-warning/10 border-warning/20';
      case 'low': return 'bg-success/10 border-success/20';
      default: return 'bg-surface-100 border-border';
    }
  };

  return (
    <div className="bg-background rounded-medical-lg shadow-medical p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Lightbulb" size={24} className="text-primary" />
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Recent Insights
          </h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconSize={16}
        >
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`p-4 rounded-medical border transition-smooth hover:shadow-medical-sm ${getPriorityBg(insight.priority)}`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-medical ${getPriorityBg(insight.priority)}`}>
                <Icon name={insight.icon} size={20} className={getPriorityColor(insight.priority)} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-text-primary">
                    {insight.title}
                  </h3>
                  <span className="text-xs text-text-secondary">
                    {insight.timestamp}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary mb-2">
                  {insight.description}
                </p>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-medical ${getPriorityBg(insight.priority)} ${getPriorityColor(insight.priority)}`}>
                    {insight.priority.toUpperCase()}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {insight.type}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentInsights;