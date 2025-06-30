import React from 'react';
import Icon from '../../../components/AppIcon';

const TrackingActivity = () => {
  const activities = [
    {
      id: 1,
      name: 'Steps',
      value: '7,542',
      target: '10,000',
      unit: 'steps',
      progress: 75,
      icon: 'Footprints',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 2,
      name: 'Heart Rate',
      value: '72',
      target: '60-100',
      unit: 'bpm',
      progress: 85,
      icon: 'Heart',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 3,
      name: 'Sleep',
      value: '7.5',
      target: '8',
      unit: 'hours',
      progress: 94,
      icon: 'Moon',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 4,
      name: 'Water',
      value: '6',
      target: '8',
      unit: 'glasses',
      progress: 75,
      icon: 'Droplets',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="bg-background rounded-medical-lg shadow-medical p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Activity" size={24} className="text-primary" />
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Activity Tracking
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`p-4 rounded-medical border border-border hover:shadow-medical-sm transition-smooth ${activity.bgColor}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-medical ${activity.bgColor}`}>
                <Icon name={activity.icon} size={20} className={activity.color} />
              </div>
              <span className={`text-sm font-medium ${activity.color}`}>
                {activity.progress}%
              </span>
            </div>

            <div className="mb-3">
              <h3 className="font-medium text-text-primary mb-1">
                {activity.name}
              </h3>
              <p className="text-2xl font-bold text-text-primary">
                {activity.value}
                <span className="text-sm font-normal text-text-secondary ml-1">
                  {activity.unit}
                </span>
              </p>
              <p className="text-sm text-text-secondary">
                Target: {activity.target} {activity.unit}
              </p>
            </div>

            <div className="w-full bg-surface-200 rounded-medical h-2">
              <div
                className={`h-2 rounded-medical transition-all duration-500 ${activity.color.replace('text-', 'bg-')}`}
                style={{ width: `${activity.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingActivity;