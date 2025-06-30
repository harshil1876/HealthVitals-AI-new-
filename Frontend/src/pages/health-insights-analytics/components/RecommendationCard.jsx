import React from 'react';
import Icon from '../../../components/AppIcon';

const RecommendationCard = ({ title, description, priority, category, actionItems }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-error text-error bg-error/5';
      case 'medium': return 'border-warning text-warning bg-warning/5';
      case 'low': return 'border-success text-success bg-success/5';
      default: return 'border-border text-text-secondary bg-surface';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'sleep': return 'Moon';
      case 'nutrition': return 'Apple';
      case 'exercise': return 'Dumbbell';
      case 'mental-health': return 'Brain';
      case 'medications': return 'Pill';
      default: return 'Lightbulb';
    }
  };

  return (
    <div className={`border rounded-medical-lg p-6 ${getPriorityColor(priority)}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-medical">
            <Icon name={getCategoryIcon(category)} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(priority)}`}>
              {priority.toUpperCase()} PRIORITY
            </span>
          </div>
        </div>
      </div>

      <p className="text-text-secondary mb-4">{description}</p>

      {actionItems && actionItems.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-2">Recommended Actions:</h4>
          <ul className="space-y-1">
            {actionItems.map((item, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="ChevronRight" size={12} className="mt-1 text-primary flex-shrink-0" />
                <span className="text-sm text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
