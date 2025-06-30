import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    dataCollection: {
      healthDataExtraction: true,
      conversationAnalytics: true,
      voicePatternAnalysis: false,
      locationTracking: false,
      deviceInformation: true
    },
    storage: {
      conversationRetention: '1year',
      autoDelete: true,
      cloudBackup: true,
      localStorage: true,
      encryptionLevel: 'aes256'
    },
    sharing: {
      healthcareProviders: false,
      researchParticipation: false,
      anonymizedData: true,
      thirdPartyIntegrations: false,
      emergencyContacts: true
    },
    aiProcessing: {
      personalizedInsights: true,
      predictiveAnalysis: false,
      conversationImprovement: true,
      voiceModelTraining: false,
      crossSessionLearning: true
    }
  });

  const [showDataDeletion, setShowDataDeletion] = useState(false);

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const retentionOptions = [
    { value: '30days', label: '30 Days', description: 'Conversations deleted after 30 days' },
    { value: '3months', label: '3 Months', description: 'Conversations deleted after 3 months' },
    { value: '6months', label: '6 Months', description: 'Conversations deleted after 6 months' },
    { value: '1year', label: '1 Year', description: 'Conversations deleted after 1 year' },
    { value: 'never', label: 'Never', description: 'Keep conversations indefinitely' }
  ];

  const encryptionOptions = [
    { value: 'aes128', label: 'AES-128', description: 'Standard encryption' },
    { value: 'aes256', label: 'AES-256', description: 'Advanced encryption (Recommended)' },
    { value: 'rsa2048', label: 'RSA-2048', description: 'Maximum security' }
  ];

  const exportData = () => {
    // Simulate data export
    console.log('Exporting user data...');
  };

  const deleteAllData = () => {
    // Simulate data deletion
    console.log('Deleting all user data...');
    setShowDataDeletion(false);
  };

  return (
    <div className="space-y-6">
      {/* Data Collection */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Database" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Data Collection
          </h3>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-text-secondary mb-4">
            Control what data HealthVitals AI collects during your conversations
          </p>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <div>
                <div className="font-medium text-text-primary">Health Data Extraction</div>
                <div className="text-sm text-text-secondary">Extract health metrics from conversations</div>
              </div>
              <input
                type="checkbox"
                checked={settings.dataCollection.healthDataExtraction}
                onChange={(e) => handleSettingChange('dataCollection', 'healthDataExtraction', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <div>
                <div className="font-medium text-text-primary">Conversation Analytics</div>
                <div className="text-sm text-text-secondary">Analyze conversation patterns for insights</div>
              </div>
              <input
                type="checkbox"
                checked={settings.dataCollection.conversationAnalytics}
                onChange={(e) => handleSettingChange('dataCollection', 'conversationAnalytics', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <div>
                <div className="font-medium text-text-primary">Voice Pattern Analysis</div>
                <div className="text-sm text-text-secondary">Analyze voice patterns for health indicators</div>
              </div>
              <input
                type="checkbox"
                checked={settings.dataCollection.voicePatternAnalysis}
                onChange={(e) => handleSettingChange('dataCollection', 'voicePatternAnalysis', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <div>
                <div className="font-medium text-text-primary">Location Tracking</div>
                <div className="text-sm text-text-secondary">Use location for emergency services</div>
              </div>
              <input
                type="checkbox"
                checked={settings.dataCollection.locationTracking}
                onChange={(e) => handleSettingChange('dataCollection', 'locationTracking', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <div>
                <div className="font-medium text-text-primary">Device Information</div>
                <div className="text-sm text-text-secondary">Collect device specs for optimization</div>
              </div>
              <input
                type="checkbox"
                checked={settings.dataCollection.deviceInformation}
                onChange={(e) => handleSettingChange('dataCollection', 'deviceInformation', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Storage & Retention */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="HardDrive" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Storage & Retention
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Conversation Retention Period
            </label>
            <div className="space-y-2">
              {retentionOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-start space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth"
                >
                  <input
                    type="radio"
                    name="conversationRetention"
                    value={option.value}
                    checked={settings.storage.conversationRetention === option.value}
                    onChange={(e) => handleSettingChange('storage', 'conversationRetention', e.target.value)}
                    className="mt-1 w-4 h-4 text-primary bg-background border-border focus:ring-primary focus:ring-2"
                  />
                  <div>
                    <div className="font-medium text-text-primary">{option.label}</div>
                    <div className="text-sm text-text-secondary">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Encryption Level
            </label>
            <div className="space-y-2">
              {encryptionOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-start space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth"
                >
                  <input
                    type="radio"
                    name="encryptionLevel"
                    value={option.value}
                    checked={settings.storage.encryptionLevel === option.value}
                    onChange={(e) => handleSettingChange('storage', 'encryptionLevel', e.target.value)}
                    className="mt-1 w-4 h-4 text-primary bg-background border-border focus:ring-primary focus:ring-2"
                  />
                  <div>
                    <div className="font-medium text-text-primary">{option.label}</div>
                    <div className="text-sm text-text-secondary">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.storage.autoDelete}
                onChange={(e) => handleSettingChange('storage', 'autoDelete', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Auto-Delete</div>
                <div className="text-sm text-text-secondary">Automatically delete old conversations</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.storage.cloudBackup}
                onChange={(e) => handleSettingChange('storage', 'cloudBackup', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Cloud Backup</div>
                <div className="text-sm text-text-secondary">Backup conversations to cloud</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Sharing */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Share2" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Data Sharing & Third Parties
          </h3>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
            <div>
              <div className="font-medium text-text-primary">Healthcare Provider Sharing</div>
              <div className="text-sm text-text-secondary">Share insights with your healthcare providers</div>
            </div>
            <input
              type="checkbox"
              checked={settings.sharing.healthcareProviders}
              onChange={(e) => handleSettingChange('sharing', 'healthcareProviders', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
            <div>
              <div className="font-medium text-text-primary">Research Participation</div>
              <div className="text-sm text-text-secondary">Contribute anonymized data to health research</div>
            </div>
            <input
              type="checkbox"
              checked={settings.sharing.researchParticipation}
              onChange={(e) => handleSettingChange('sharing', 'researchParticipation', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
            <div>
              <div className="font-medium text-text-primary">Emergency Contact Access</div>
              <div className="text-sm text-text-secondary">Allow emergency contacts to access health data</div>
            </div>
            <input
              type="checkbox"
              checked={settings.sharing.emergencyContacts}
              onChange={(e) => handleSettingChange('sharing', 'emergencyContacts', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
          </label>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="FileText" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Data Management
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" iconName="Download" onClick={exportData} className="flex-1">
              Export My Data
            </Button>
            <Button 
              variant="danger" 
              iconName="Trash2" 
              onClick={() => setShowDataDeletion(true)}
              className="flex-1"
            >
              Delete All Data
            </Button>
          </div>

          <div className="p-4 bg-warning/10 border border-warning/20 rounded-medical">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-warning mb-1">Data Deletion Warning</p>
                <p className="text-text-secondary">
                  Deleting your data is permanent and cannot be undone. This includes all conversations, 
                  health insights, and account preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Deletion Confirmation Modal */}
      {showDataDeletion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-medical-lg p-6 max-w-md w-full border border-border shadow-medical-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-error" />
              <h3 className="text-lg font-heading font-medium text-text-primary">
                Delete All Data?
              </h3>
            </div>
            
            <p className="text-text-secondary mb-6">
              This action will permanently delete all your conversations, health insights, 
              and account data. This cannot be undone.
            </p>
            
            <div className="flex space-x-3">
              <Button 
                variant="danger" 
                onClick={deleteAllData}
                className="flex-1"
              >
                Delete Everything
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowDataDeletion(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button variant="primary" iconName="Save" className="flex-1 sm:flex-none">
          Save Privacy Settings
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none">
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default PrivacySettings;