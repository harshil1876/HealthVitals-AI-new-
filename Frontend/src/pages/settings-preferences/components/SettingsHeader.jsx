import React from 'react';
import Icon from '../../../components/AppIcon';

const SettingsHeader = ({ activeTab, onTabChange, isMobile }) => {
  const tabs = [
    { id: 'audio', label: 'Audio', icon: 'Volume2', description: 'Voice & sound settings' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield', description: 'Data & security controls' },
    { id: 'account', label: 'Account', icon: 'User', description: 'Profile & billing' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell', description: 'Alerts & reminders' },
    { id: 'accessibility', label: 'Accessibility', icon: 'Accessibility', description: 'Assistive features' },
    { id: 'data', label: 'Data Export', icon: 'Download', description: 'Export & backup' }
  ];

  if (isMobile) {
    return (
      <div className="bg-background border-b border-border">
        <div className="px-4 py-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-medical">
              <Icon name="Settings" size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-semibold text-text-primary">
                Settings & Preferences
              </h1>
              <p className="text-sm text-text-secondary">
                Customize your HealthVitals AI experience
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center p-3 rounded-medical transition-smooth focus-medical ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-medical'
                    : 'bg-surface hover:bg-surface-100 text-text-primary hover:text-primary'
                }`}
              >
                <Icon 
                  name={tab.icon} 
                  size={20} 
                  className="mb-1"
                />
                <span className="text-xs font-medium text-center">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background border-b border-border">
      <div className="px-6 py-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-medical">
            <Icon name="Settings" size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-semibold text-text-primary">
              Settings & Preferences
            </h1>
            <p className="text-text-secondary">
              Customize your HealthVitals AI experience and manage your account
            </p>
          </div>
        </div>

        <nav className="flex space-x-1 bg-surface rounded-medical-lg p-1 shadow-medical-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-medical transition-smooth focus-medical ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-medical'
                  : 'text-text-primary hover:bg-background hover:text-primary hover:shadow-medical-sm'
              }`}
            >
              <Icon name={tab.icon} size={18} />
              <div className="text-left">
                <div className="font-medium text-sm">{tab.label}</div>
                <div className={`text-xs ${
                  activeTab === tab.id ? 'text-primary-foreground/80' : 'text-text-secondary'
                }`}>
                  {tab.description}
                </div>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SettingsHeader;