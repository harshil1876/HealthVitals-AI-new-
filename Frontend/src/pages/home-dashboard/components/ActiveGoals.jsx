import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveGoals = () => {
  const goals = [
    {
      id: 1,
      title: 'Daily Steps',
      target: 10000,
      current: 7500,
      unit: 'steps',
      icon: 'Footprints',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 2,
      title: 'Water Intake',
      target: 8,
      current: 6,
      unit: 'glasses',
      icon: 'Droplets',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 3,
      title: 'Sleep Hours',
      target: 8,
      current: 7.5,
      unit: 'hours',
      icon: 'Moon',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 4,
      title: 'Meditation',
      target: 15,
      current: 10,
      unit: 'minutes',
      icon: 'Brain',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="bg-background rounded-medical-lg shadow-medical p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Target" size={24} className="text-primary" />
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Active Goals
          </h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconSize={16}
        >
          Add Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => {
          const progress = getProgressPercentage(goal.current, goal.target);
          
          return (
            <div
              key={goal.id}
              className="p-4 rounded-medical border border-border hover:shadow-medical-sm transition-smooth"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-medical ${goal.bgColor}`}>
                    <Icon name={goal.icon} size={20} className={goal.color} />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {goal.current} / {goal.target} {goal.unit}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`text-lg font-bold ${goal.color}`}>
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="w-full bg-surface-200 rounded-medical h-2">
                  <div
                    className={`h-2 rounded-medical transition-all duration-500 ${goal.color.replace('text-', 'bg-')}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Quick Action */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Plus"
                  iconSize={14}
                  className="text-xs"
                >
                  Log Progress
                </Button>
                <Button
                  variant="text"
                  size="sm"
                  iconName="Eye"
                  iconSize={14}
                  className="text-xs"
                >
                  View Details
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveGoals;