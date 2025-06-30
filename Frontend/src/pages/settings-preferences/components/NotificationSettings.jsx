import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    conversationReminders: {
      enabled: true,
      frequency: 'daily',
      time: '09:00',
      weekends: false
    },
    healthInsights: {
      enabled: true,
      weeklyReports: true,
      trendAlerts: true,
      anomalyDetection: true,
      improvementSuggestions: true
    },
    emergency: {
      enabled: true,
      smsAlerts: true,
      emailAlerts: true,
      pushNotifications: true,
      contactNotifications: true
    },
    system: {
      enabled: true,
      maintenanceAlerts: true,
      featureUpdates: false,
      securityAlerts: true,
      accountActivity: true
    },
    marketing: {
      enabled: false,
      productUpdates: false,
      healthTips: true,
      newsletters: false,
      promotions: false
    }
  });

  const [testNotification, setTestNotification] = useState(false);

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const sendTestNotification = () => {
    setTestNotification(true);
    setTimeout(() => setTestNotification(false), 3000);
  };

  const frequencyOptions = [
    { value: 'never', label: 'Never' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const timeOptions = [
    { value: '08:00', label: '8:00 AM' },
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '17:00', label: '5:00 PM' },
    { value: '19:00', label: '7:00 PM' },
    { value: '20:00', label: '8:00 PM' }
  ];

  return (
    <div className="space-y-6">
      {/* Conversation Reminders */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={20} className="text-primary" />
            <h3 className="text-lg font-heading font-medium text-text-primary">
              Conversation Reminders
            </h3>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.conversationReminders.enabled}
              onChange={(e) => handleSettingChange('conversationReminders', 'enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {settings.conversationReminders.enabled && (
          <div className="space-y-4 pl-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Reminder Frequency
                </label>
                <select
                  value={settings.conversationReminders.frequency}
                  onChange={(e) => handleSettingChange('conversationReminders', 'frequency', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary text-text-primary"
                >
                  {frequencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Preferred Time
                </label>
                <select
                  value={settings.conversationReminders.time}
                  onChange={(e) => handleSettingChange('conversationReminders', 'time', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary text-text-primary"
                >
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.conversationReminders.weekends}
                onChange={(e) => handleSettingChange('conversationReminders', 'weekends', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Include Weekends</div>
                <div className="text-sm text-text-secondary">Send reminders on Saturday and Sunday</div>
              </div>
            </label>
          </div>
        )}
      </div>

      {/* Health Insights */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <h3 className="text-lg font-heading font-medium text-text-primary">
              Health Insights & Analytics
            </h3>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.healthInsights.enabled}
              onChange={(e) => handleSettingChange('healthInsights', 'enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {settings.healthInsights.enabled && (
          <div className="space-y-3 pl-8">
            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.healthInsights.weeklyReports}
                onChange={(e) => handleSettingChange('healthInsights', 'weeklyReports', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Weekly Health Reports</div>
                <div className="text-sm text-text-secondary">Comprehensive weekly health summaries</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.healthInsights.trendAlerts}
                onChange={(e) => handleSettingChange('healthInsights', 'trendAlerts', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Health Trend Alerts</div>
                <div className="text-sm text-text-secondary">Notifications about significant health trends</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.healthInsights.anomalyDetection}
                onChange={(e) => handleSettingChange('healthInsights', 'anomalyDetection', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Anomaly Detection</div>
                <div className="text-sm text-text-secondary">Alerts for unusual health patterns</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.healthInsights.improvementSuggestions}
                onChange={(e) => handleSettingChange('healthInsights', 'improvementSuggestions', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Improvement Suggestions</div>
                <div className="text-sm text-text-secondary">Personalized health improvement recommendations</div>
              </div>
            </label>
          </div>
        )}
      </div>

      {/* Emergency Notifications */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-error" />
            <h3 className="text-lg font-heading font-medium text-text-primary">
              Emergency Notifications
            </h3>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emergency.enabled}
              onChange={(e) => handleSettingChange('emergency', 'enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {settings.emergency.enabled && (
          <div className="space-y-3 pl-8">
            <div className="p-3 bg-error/10 border border-error/20 rounded-medical">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-error mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-error mb-1">Critical Notifications</p>
                  <p className="text-text-secondary">
                    Emergency notifications cannot be disabled for safety reasons. 
                    You can choose delivery methods below.
                  </p>
                </div>
              </div>
            </div>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.emergency.smsAlerts}
                onChange={(e) => handleSettingChange('emergency', 'smsAlerts', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">SMS Alerts</div>
                <div className="text-sm text-text-secondary">Receive emergency alerts via text message</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.emergency.emailAlerts}
                onChange={(e) => handleSettingChange('emergency', 'emailAlerts', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Email Alerts</div>
                <div className="text-sm text-text-secondary">Receive emergency alerts via email</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.emergency.pushNotifications}
                onChange={(e) => handleSettingChange('emergency', 'pushNotifications', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Push Notifications</div>
                <div className="text-sm text-text-secondary">Receive emergency alerts as push notifications</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.emergency.contactNotifications}
                onChange={(e) => handleSettingChange('emergency', 'contactNotifications', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Emergency Contact Notifications</div>
                <div className="text-sm text-text-secondary">Notify emergency contacts during critical situations</div>
              </div>
            </label>
          </div>
        )}
      </div>

      {/* System Notifications */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Settings" size={20} className="text-primary" />
            <h3 className="text-lg font-heading font-medium text-text-primary">
              System & Security
            </h3>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.system.enabled}
              onChange={(e) => handleSettingChange('system', 'enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {settings.system.enabled && (
          <div className="space-y-3 pl-8">
            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.system.maintenanceAlerts}
                onChange={(e) => handleSettingChange('system', 'maintenanceAlerts', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Maintenance Alerts</div>
                <div className="text-sm text-text-secondary">Notifications about scheduled maintenance</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.system.featureUpdates}
                onChange={(e) => handleSettingChange('system', 'featureUpdates', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Feature Updates</div>
                <div className="text-sm text-text-secondary">Notifications about new features and improvements</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.system.securityAlerts}
                onChange={(e) => handleSettingChange('system', 'securityAlerts', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Security Alerts</div>
                <div className="text-sm text-text-secondary">Important security and privacy notifications</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.system.accountActivity}
                onChange={(e) => handleSettingChange('system', 'accountActivity', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Account Activity</div>
                <div className="text-sm text-text-secondary">Notifications about account changes and logins</div>
              </div>
            </label>
          </div>
        )}
      </div>

      {/* Test Notification */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
              Test Notifications
            </h3>
            <p className="text-sm text-text-secondary">
              Send a test notification to verify your settings are working correctly
            </p>
          </div>
          <Button
            variant="outline"
            iconName="Send"
            onClick={sendTestNotification}
            disabled={testNotification}
          >
            {testNotification ? 'Sent!' : 'Send Test'}
          </Button>
        </div>

        {testNotification && (
          <div className="mt-4 p-3 bg-secondary/10 border border-secondary/20 rounded-medical">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-secondary" />
              <span className="text-sm text-secondary font-medium">
                Test notification sent successfully!
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button variant="primary" iconName="Save" className="flex-1 sm:flex-none">
          Save Notification Settings
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none">
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;