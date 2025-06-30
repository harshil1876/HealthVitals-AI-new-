import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: 'Start Voice Chat',
      description: 'Begin a new health conversation',
      icon: 'Mic',
      color: 'text-primary',
      bgColor: 'bg-primary/10 hover:bg-primary/20',
      borderColor: 'border-primary/20',
      onClick: () => navigate('/active-voice-conversation')
    },
    {
      id: 2,
      title: 'Log Vitals',
      description: 'Record your health metrics',
      icon: 'Activity',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10 hover:bg-secondary/20',
      borderColor: 'border-secondary/20',
      onClick: () => navigate('/log-vitals')
    },
    {
      id: 3,
      title: 'View Reports',
      description: 'Access your health reports',
      icon: 'FileText',
      color: 'text-accent',
      bgColor: 'bg-accent/10 hover:bg-accent/20',
      borderColor: 'border-accent/20',
      onClick: () => navigate('/reports')
    },
    {
      id: 4,
      title: 'Check Goals',
      description: 'Review your wellness goals',
      icon: 'Target',
      color: 'text-warning',
      bgColor: 'bg-warning/10 hover:bg-warning/20',
      borderColor: 'border-warning/20',
      onClick: () => navigate('/goals')
    },
    {
      id: 5,
      title: 'Emergency',
      description: 'Quick access to emergency services',
      icon: 'Phone',
      color: 'text-error',
      bgColor: 'bg-error/10 hover:bg-error/20',
      borderColor: 'border-error/20',
      onClick: () => alert('Emergency services would be contacted')
    },
    {
      id: 6,
      title: 'Settings',
      description: 'Manage your preferences',
      icon: 'Settings',
      color: 'text-text-secondary',
      bgColor: 'bg-surface-100 hover:bg-surface-200',
      borderColor: 'border-border',
      onClick: () => navigate('/settings-preferences')
    }
  ];

  return (
    <div className="bg-background rounded-medical-lg shadow-medical p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Zap" size={24} className="text-primary" />
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Quick Actions
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`p-4 rounded-medical border transition-smooth focus-medical ${action.bgColor} ${action.borderColor}`}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className={`p-3 rounded-medical ${action.bgColor.replace('hover:', '').replace('/20', '/20')}`}>
                <Icon name={action.icon} size={24} className={action.color} />
              </div>
              
              <div>
                <h3 className="font-medium text-text-primary text-sm">
                  {action.title}
                </h3>
                <p className="text-xs text-text-secondary mt-1">
                  {action.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;