import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@healthvitals.ai',
    avatar: '/avatars/sarah.jpg',
    joinDate: 'June 2024',
    healthScore: 86,
    timezone: 'Pacific Time (PT)',
    language: 'English (US)'
  };

  const settings = {
    notifications: {
      healthAlerts: true,
      goalReminders: true,
      weeklyReports: true,
      achievements: true
    },
    privacy: {
      shareHealthData: false,
      anonymousAnalytics: true,
      thirdPartyIntegrations: false
    },
    preferences: {
      theme: 'system',
      measurementUnit: 'metric',
      timeFormat: '24h'
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-text-primary">Profile & Settings</h1>
            <Button variant="primary" onClick={() => console.log('Save changes')}>
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="bg-background rounded-medical-lg shadow-medical p-6 sticky top-24">
              {/* Profile Summary */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="User" size={48} className="text-primary" />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-success rounded-full p-1">
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                </div>
                <h2 className="text-lg font-semibold text-text-primary">{user.name}</h2>
                <p className="text-sm text-text-secondary">{user.email}</p>
                <p className="text-xs text-text-secondary mt-1">Member since {user.joinDate}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-medical transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-surface-100'
                  }`}
                >
                  <Icon name="User" size={20} />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-medical transition-colors ${
                    activeTab === 'notifications'
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-surface-100'
                  }`}
                >
                  <Icon name="Bell" size={20} />
                  <span>Notifications</span>
                </button>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-medical transition-colors ${
                    activeTab === 'privacy'
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-surface-100'
                  }`}
                >
                  <Icon name="Lock" size={20} />
                  <span>Privacy & Security</span>
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-medical transition-colors ${
                    activeTab === 'preferences'
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-surface-100'
                  }`}
                >
                  <Icon name="Settings" size={20} />
                  <span>Preferences</span>
                </button>
              </nav>

              {/* Logout Button */}
              <button
                className="w-full flex items-center justify-center space-x-2 mt-6 px-4 py-3 border border-error text-error rounded-medical hover:bg-error hover:text-white transition-colors"
                onClick={() => console.log('Logout')}
              >
                <Icon name="LogOut" size={20} />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-6">
            {/* Profile Section */}
            {activeTab === 'profile' && (
              <div className="bg-background rounded-medical-lg shadow-medical p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-6">Profile Information</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        className="w-full px-4 py-2 border border-border rounded-medical"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-4 py-2 border border-border rounded-medical"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Timezone
                      </label>
                      <select className="w-full px-4 py-2 border border-border rounded-medical">
                        <option value="PT">{user.timezone}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Language
                      </label>
                      <select className="w-full px-4 py-2 border border-border rounded-medical">
                        <option value="en">{user.language}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeTab === 'notifications' && (
              <div className="bg-background rounded-medical-lg shadow-medical p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-6">Notification Settings</h2>
                <div className="space-y-6">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-text-primary">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          Receive notifications about {key.toLowerCase()}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={value} />
                        <div className="w-11 h-6 bg-surface peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy Section */}
            {activeTab === 'privacy' && (
              <div className="bg-background rounded-medical-lg shadow-medical p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-6">Privacy & Security</h2>
                <div className="space-y-6">
                  {Object.entries(settings.privacy).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-text-primary">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          Control how your data is used and shared
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={value} />
                        <div className="w-11 h-6 bg-surface peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preferences Section */}
            {activeTab === 'preferences' && (
              <div className="bg-background rounded-medical-lg shadow-medical p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-primary">App Preferences</h2>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/settings-preferences')}
                    iconName="Settings"
                    iconSize={16}
                  >
                    Advanced Settings
                  </Button>
                </div>
                <div className="space-y-6">
                  {Object.entries(settings.preferences).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                      <select className="w-full px-4 py-2 border border-border rounded-medical">
                        <option value={value}>{value}</option>
                      </select>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-surface rounded-medical border border-border">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-text-primary mb-1">Need more options?</h3>
                      <p className="text-sm text-text-secondary mb-3">
                        Access advanced settings including audio preferences, accessibility options, and data export features.
                      </p>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => navigate('/settings-preferences')}
                        iconName="ArrowRight"
                        iconSize={14}
                      >
                        Go to Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
