import React from 'react';
import Icon from '../../../components/AppIcon';

const InsightsTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'trends',
      label: 'Trends',
      icon: 'TrendingUp',
      description: 'Health patterns over time'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      icon: 'Lightbulb',
      description: 'AI-powered suggestions'
    },
    {
      id: 'vitalsigns',
      label: 'Vital Signs',
      icon: 'Activity',
      description: 'Health metrics tracking'
    },
    {
      id: 'topics',
      label: 'Topics',
      icon: 'MessageSquare',
      description: 'Conversation analysis'
    }
  ];

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center p-4 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:bg-surface-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Icon name={tab.icon} size={20} />
              <span>{tab.label}</span>
            </div>
            <span className="text-xs mt-1 opacity-80">{tab.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InsightsTabs;
