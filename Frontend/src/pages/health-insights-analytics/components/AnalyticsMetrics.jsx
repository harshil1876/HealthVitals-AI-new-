import React from 'react';
import Icon from '../../../components/AppIcon';

const AnalyticsMetrics = () => {
  const metrics = [
    {
      icon: 'Brain',
      value: '7.0/10',
      label: 'Average Mood',
      change: '+0.8',
      color: 'purple'
    },
    {
      icon: 'Activity',
      value: '6.0h',
      label: 'Sleep Quality',
      change: '+0.5h',
      color: 'blue'
    },
    {
      icon: 'Target',
      value: '73min',
      label: 'Total Exercise',
      change: '+45min',
      color: 'green'
    },
    {
      icon: 'Award',
      value: '6.0/10',
      label: 'Productivity',
      change: '+1.2',
      color: 'orange'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {metrics.map((metric, index) => (
        <div 
          key={index} 
          className="bg-background rounded-medical-lg shadow-medical p-6 flex items-center space-x-4"
        >
          <div className={`p-3 bg-${metric.color}-100 rounded-medical`}>
            <Icon 
              name={metric.icon} 
              size={24} 
              className={`text-${metric.color}-600`} 
            />
          </div>
          <div>
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-text-secondary">{metric.label}</p>
            <p className="text-success">{metric.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsMetrics;
