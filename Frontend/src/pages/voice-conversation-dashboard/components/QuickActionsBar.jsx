import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActionsBar = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'emergency',
      label: 'Emergency',
      icon: 'Phone',
      color: 'danger',
      description: 'Contact emergency services',
      action: () => {
        // In real app, this would trigger emergency protocols
        alert('Emergency services would be contacted');
      }
    },
    {
      id: 'vitals',
      label: 'Quick Vitals',
      icon: 'Heart',
      color: 'primary',
      description: 'Record vital signs quickly',
      action: () => navigate('/active-voice-conversation?topic=vitals')
    },
    {
      id: 'symptoms',
      label: 'Report Symptoms',
      icon: 'AlertCircle',
      color: 'warning',
      description: 'Describe current symptoms',
      action: () => navigate('/active-voice-conversation?topic=symptoms')
    },
    {
      id: 'medication',
      label: 'Medication',
      icon: 'Pill',
      color: 'accent',
      description: 'Medication questions or review',
      action: () => navigate('/active-voice-conversation?topic=medication')
    },
    {
      id: 'wellness',
      label: 'Wellness Check',
      icon: 'Smile',
      color: 'secondary',
      description: 'General wellness conversation',
      action: () => navigate('/active-voice-conversation?topic=wellness')
    }
  ];

  return (
    <div className="bg-background border border-border rounded-medical-lg shadow-medical p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-text-primary">
          Quick Actions
        </h2>
        <Icon name="Zap" size={18} className="text-primary" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="group flex flex-col items-center p-4 bg-surface border border-border rounded-medical transition-smooth focus-medical hover:border-primary/30 hover:bg-primary/5 hover:shadow-medical-sm"
          >
            <div className={`flex items-center justify-center w-12 h-12 rounded-medical mb-3 transition-smooth ${
              action.color === 'danger' ? 'bg-error/10 text-error group-hover:bg-error group-hover:text-error-foreground' :
              action.color === 'warning' ? 'bg-warning/10 text-warning group-hover:bg-warning group-hover:text-warning-foreground' :
              action.color === 'secondary' ? 'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground' :
              action.color === 'accent' ? 'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground' :
              'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
            }`}>
              <Icon 
                name={action.icon} 
                size={20} 
                color="currentColor"
              />
            </div>
            
            <span className="text-sm font-medium text-text-primary mb-1 text-center">
              {action.label}
            </span>
            
            <span className="text-xs text-text-secondary text-center line-clamp-2">
              {action.description}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-center space-x-2 text-xs text-text-muted">
          <Icon name="Info" size={14} />
          <span>Tap any action to start a focused conversation</span>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsBar;