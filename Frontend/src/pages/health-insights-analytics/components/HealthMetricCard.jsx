import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthMetricCard = ({ title, value, unit, trend, change, icon }) => {
  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="bg-background rounded-medical-lg shadow-medical p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-medical">
          <Icon name={icon} size={24} className="text-primary" />
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
          <Icon name={getTrendIcon(trend)} size={16} />
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      
      <div>
        <div className="flex items-baseline space-x-1 mb-1">
          <span className="text-2xl font-bold text-text-primary">{value}</span>
          <span className="text-sm text-text-secondary">{unit}</span>
        </div>
        <p className="text-sm text-text-secondary">{title}</p>
      </div>
    </div>
  );
};

export default HealthMetricCard;
