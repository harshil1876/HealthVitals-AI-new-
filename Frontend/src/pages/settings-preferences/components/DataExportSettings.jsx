import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataExportSettings = () => {
  const [exportSettings, setExportSettings] = useState({
    conversations: {
      includeAudio: true,
      includeTranscripts: true,
      includeMetadata: true,
      dateRange: 'all',
      format: 'json'
    },
    healthData: {
      includeInsights: true,
      includeAnalytics: true,
      includeTrends: true,
      includeRecommendations: true,
      format: 'csv'
    },
    account: {
      includeProfile: true,
      includeSettings: true,
      includeContacts: false,
      includeProviders: false,
      format: 'json'
    }
  });

  const [exportProgress, setExportProgress] = useState({
    isExporting: false,
    currentStep: '',
    progress: 0,
    completed: false
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    frequency: 'weekly',
    destination: 'cloud',
    encryption: true,
    compression: true
  });

  const handleExportSettingChange = (category, key, value) => {
    setExportSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleBackupSettingChange = (key, value) => {
    setBackupSettings(prev => ({ ...prev, [key]: value }));
  };

  const startExport = async (type) => {
    setExportProgress({
      isExporting: true,
      currentStep: 'Preparing export...',
      progress: 0,
      completed: false
    });

    // Simulate export process
    const steps = [
      'Gathering conversation data...',
      'Processing audio files...',
      'Generating transcripts...',
      'Compiling health insights...',
      'Creating export package...',
      'Finalizing download...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setExportProgress(prev => ({
        ...prev,
        currentStep: steps[i],
        progress: ((i + 1) / steps.length) * 100
      }));
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setExportProgress({
      isExporting: false,
      currentStep: 'Export completed!',
      progress: 100,
      completed: true
    });

    // Reset after 3 seconds
    setTimeout(() => {
      setExportProgress({
        isExporting: false,
        currentStep: '',
        progress: 0,
        completed: false
      });
    }, 3000);
  };

  const dateRangeOptions = [
    { value: 'all', label: 'All Time', description: 'Export all available data' },
    { value: 'last30', label: 'Last 30 Days', description: 'Recent conversations only' },
    { value: 'last90', label: 'Last 3 Months', description: 'Quarterly data export' },
    { value: 'last365', label: 'Last Year', description: 'Annual data export' },
    { value: 'custom', label: 'Custom Range', description: 'Select specific date range' }
  ];

  const formatOptions = {
    conversations: [
      { value: 'json', label: 'JSON', description: 'Structured data format' },
      { value: 'csv', label: 'CSV', description: 'Spreadsheet compatible' },
      { value: 'pdf', label: 'PDF', description: 'Readable document format' },
      { value: 'zip', label: 'ZIP Archive', description: 'Compressed package with audio' }
    ],
    healthData: [
      { value: 'csv', label: 'CSV', description: 'Spreadsheet compatible' },
      { value: 'json', label: 'JSON', description: 'Structured data format' },
      { value: 'pdf', label: 'PDF Report', description: 'Formatted health report' },
      { value: 'xml', label: 'XML', description: 'Healthcare standard format' }
    ],
    account: [
      { value: 'json', label: 'JSON', description: 'Structured data format' },
      { value: 'pdf', label: 'PDF', description: 'Readable document format' }
    ]
  };

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'never', label: 'Manual Only' }
  ];

  const destinationOptions = [
    { value: 'cloud', label: 'Cloud Storage', description: 'Secure cloud backup' },
    { value: 'local', label: 'Local Download', description: 'Download to device' },
    { value: 'email', label: 'Email Delivery', description: 'Send to email address' }
  ];

  return (
    <div className="space-y-6">
      {/* Export Progress Modal */}
      {exportProgress.isExporting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-medical-lg p-6 max-w-md w-full border border-border shadow-medical-lg">
            <div className="text-center">
              <Icon name="Download" size={32} className="text-primary mx-auto mb-4" />
              <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
                Exporting Your Data
              </h3>
              <p className="text-text-secondary mb-4">{exportProgress.currentStep}</p>
              
              <div className="w-full bg-surface-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${exportProgress.progress}%` }}
                />
              </div>
              
              <p className="text-sm text-text-secondary">
                {Math.round(exportProgress.progress)}% Complete
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Conversation Data Export */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Conversation Data Export
          </h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={exportSettings.conversations.includeAudio}
                onChange={(e) => handleExportSettingChange('conversations', 'includeAudio', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Audio Files</div>
                <div className="text-sm text-text-secondary">Original conversation recordings</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={exportSettings.conversations.includeTranscripts}
                onChange={(e) => handleExportSettingChange('conversations', 'includeTranscripts', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Transcripts</div>
                <div className="text-sm text-text-secondary">Text versions of conversations</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={exportSettings.conversations.includeMetadata}
                onChange={(e) => handleExportSettingChange('conversations', 'includeMetadata', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Metadata</div>
                <div className="text-sm text-text-secondary">Timestamps, duration, quality metrics</div>
              </div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Date Range
              </label>
              <select
                value={exportSettings.conversations.dateRange}
                onChange={(e) => handleExportSettingChange('conversations', 'dateRange', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary text-text-primary"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Export Format
              </label>
              <select
                value={exportSettings.conversations.format}
                onChange={(e) => handleExportSettingChange('conversations', 'format', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary text-text-primary"
              >
                {formatOptions.conversations.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            variant="primary"
            iconName="Download"
            onClick={() => startExport('conversations')}
            disabled={exportProgress.isExporting}
            className="w-full sm:w-auto"
          >
            Export Conversation Data
          </Button>
        </div>
      </div>

      {/* Health Data Export */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Activity" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Health Data Export
          </h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={exportSettings.healthData.includeInsights}
                onChange={(e) => handleExportSettingChange('healthData', 'includeInsights', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Health Insights</div>
                <div className="text-sm text-text-secondary">AI-generated health analysis</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={exportSettings.healthData.includeAnalytics}
                onChange={(e) => handleExportSettingChange('healthData', 'includeAnalytics', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Analytics Data</div>
                <div className="text-sm text-text-secondary">Statistical health metrics</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={exportSettings.healthData.includeTrends}
                onChange={(e) => handleExportSettingChange('healthData', 'includeTrends', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Trend Analysis</div>
                <div className="text-sm text-text-secondary">Health pattern trends over time</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={exportSettings.healthData.includeRecommendations}
                onChange={(e) => handleExportSettingChange('healthData', 'includeRecommendations', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Recommendations</div>
                <div className="text-sm text-text-secondary">Personalized health suggestions</div>
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Export Format
            </label>
            <select
              value={exportSettings.healthData.format}
              onChange={(e) => handleExportSettingChange('healthData', 'format', e.target.value)}
              className="w-full md:w-1/2 px-3 py-2 bg-background border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary text-text-primary"
            >
              {formatOptions.healthData.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="primary"
            iconName="Download"
            onClick={() => startExport('health')}
            disabled={exportProgress.isExporting}
            className="w-full sm:w-auto"
          >
            Export Health Data
          </Button>
        </div>
      </div>

      {/* Account Data Export */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="User" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Account Data Export
          </h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={exportSettings.account.includeProfile}
                onChange={(e) => handleExportSettingChange('account', 'includeProfile', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Profile Information</div>
                <div className="text-sm text-text-secondary">Personal details and preferences</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={exportSettings.account.includeSettings}
                onChange={(e) => handleExportSettingChange('account', 'includeSettings', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">App Settings</div>
                <div className="text-sm text-text-secondary">Configuration and preferences</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={exportSettings.account.includeContacts}
                onChange={(e) => handleExportSettingChange('account', 'includeContacts', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Emergency Contacts</div>
                <div className="text-sm text-text-secondary">Contact information for emergencies</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={exportSettings.account.includeProviders}
                onChange={(e) => handleExportSettingChange('account', 'includeProviders', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Healthcare Providers</div>
                <div className="text-sm text-text-secondary">Connected provider information</div>
              </div>
            </label>
          </div>

          <Button
            variant="primary"
            iconName="Download"
            onClick={() => startExport('account')}
            disabled={exportProgress.isExporting}
            className="w-full sm:w-auto"
          >
            Export Account Data
          </Button>
        </div>
      </div>

      {/* Automatic Backup Settings */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Cloud" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Automatic Backup Settings
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background rounded-medical border border-border">
            <div>
              <div className="font-medium text-text-primary">Enable Automatic Backup</div>
              <div className="text-sm text-text-secondary">Automatically backup your data at regular intervals</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={backupSettings.autoBackup}
                onChange={(e) => handleBackupSettingChange('autoBackup', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {backupSettings.autoBackup && (
            <div className="space-y-4 pl-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Backup Frequency
                  </label>
                  <select
                    value={backupSettings.frequency}
                    onChange={(e) => handleBackupSettingChange('frequency', e.target.value)}
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
                    Backup Destination
                  </label>
                  <select
                    value={backupSettings.destination}
                    onChange={(e) => handleBackupSettingChange('destination', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary text-text-primary"
                  >
                    {destinationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
                  <input
                    type="checkbox"
                    checked={backupSettings.encryption}
                    onChange={(e) => handleBackupSettingChange('encryption', e.target.checked)}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <div>
                    <div className="font-medium text-text-primary">Encrypt Backups</div>
                    <div className="text-sm text-text-secondary">Secure backup files with encryption</div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
                  <input
                    type="checkbox"
                    checked={backupSettings.compression}
                    onChange={(e) => handleBackupSettingChange('compression', e.target.checked)}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <div>
                    <div className="font-medium text-text-primary">Compress Backups</div>
                    <div className="text-sm text-text-secondary">Reduce backup file size</div>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Complete Data Export */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Package" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Complete Data Package
          </h3>
        </div>

        <p className="text-text-secondary mb-4">
          Export all your data in one comprehensive package including conversations, health insights, 
          and account information.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            iconName="Download"
            onClick={() => startExport('complete')}
            disabled={exportProgress.isExporting}
            className="flex-1 sm:flex-none"
          >
            Export Complete Data Package
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none">
            Schedule Export
          </Button>
        </div>
      </div>

      {/* Export Completion Message */}
      {exportProgress.completed && (
        <div className="bg-secondary/10 border border-secondary/20 rounded-medical p-4">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={20} className="text-secondary" />
            <div>
              <p className="font-medium text-secondary">Export Completed Successfully!</p>
              <p className="text-sm text-text-secondary">Your data has been prepared and is ready for download.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataExportSettings;