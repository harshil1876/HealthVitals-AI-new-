import React from 'react';
import Icon from '../../../components/AppIcon';

const InsightTabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'BarChart3'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      icon: 'Lightbulb'
    },
    {
      id: 'trends',
      label: 'Trends',
      icon: 'TrendingUp'
    }
  ];

  return (
    <div className="border-b border-border mb-8">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default InsightTabNavigation;
