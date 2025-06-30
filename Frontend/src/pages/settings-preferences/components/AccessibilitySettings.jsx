import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccessibilitySettings = () => {
  const [settings, setSettings] = useState({
    voiceCommands: {
      enabled: true,
      sensitivity: 'medium',
      customCommands: [
        { phrase: 'Start conversation', action: 'start_recording' },
        { phrase: 'Stop conversation', action: 'stop_recording' },
        { phrase: 'Emergency help', action: 'emergency_call' },
        { phrase: 'Read last message', action: 'read_last' }
      ],
      wakeWord: 'Hey HealthVitals'
    },
    visualFeedback: {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      colorBlindSupport: false,
      screenReader: true,
      visualIndicators: true
    },
    audioFeedback: {
      speechRate: 'normal',
      voicePitch: 'medium',
      audioDescriptions: true,
      soundEffects: true,
      hapticFeedback: true,
      audioConfirmations: true
    },
    assistiveTech: {
      screenReaderSupport: true,
      keyboardNavigation: true,
      voiceControl: true,
      switchControl: false,
      eyeTracking: false,
      headPointer: false
    }
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const addCustomCommand = () => {
    const newCommand = { phrase: '', action: '' };
    setSettings(prev => ({
      ...prev,
      voiceCommands: {
        ...prev.voiceCommands,
        customCommands: [...prev.voiceCommands.customCommands, newCommand]
      }
    }));
  };

  const updateCustomCommand = (index, field, value) => {
    setSettings(prev => ({
      ...prev,
      voiceCommands: {
        ...prev.voiceCommands,
        customCommands: prev.voiceCommands.customCommands.map((cmd, i) =>
          i === index ? { ...cmd, [field]: value } : cmd
        )
      }
    }));
  };

  const removeCustomCommand = (index) => {
    setSettings(prev => ({
      ...prev,
      voiceCommands: {
        ...prev.voiceCommands,
        customCommands: prev.voiceCommands.customCommands.filter((_, i) => i !== index)
      }
    }));
  };

  const sensitivityOptions = [
    { value: 'low', label: 'Low', description: 'Less sensitive, fewer false triggers' },
    { value: 'medium', label: 'Medium', description: 'Balanced sensitivity (recommended)' },
    { value: 'high', label: 'High', description: 'More sensitive, responds to quieter commands' }
  ];

  const speechRateOptions = [
    { value: 'slow', label: 'Slow', description: '0.75x speed' },
    { value: 'normal', label: 'Normal', description: '1.0x speed' },
    { value: 'fast', label: 'Fast', description: '1.25x speed' },
    { value: 'very-fast', label: 'Very Fast', description: '1.5x speed' }
  ];

  const voicePitchOptions = [
    { value: 'low', label: 'Low Pitch' },
    { value: 'medium', label: 'Medium Pitch' },
    { value: 'high', label: 'High Pitch' }
  ];

  const actionOptions = [
    { value: 'start_recording', label: 'Start Recording' },
    { value: 'stop_recording', label: 'Stop Recording' },
    { value: 'pause_recording', label: 'Pause Recording' },
    { value: 'resume_recording', label: 'Resume Recording' },
    { value: 'emergency_call', label: 'Emergency Call' },
    { value: 'read_last', label: 'Read Last Message' },
    { value: 'repeat', label: 'Repeat Last Response' },
    { value: 'help', label: 'Show Help' },
    { value: 'settings', label: 'Open Settings' },
    { value: 'history', label: 'Open History' }
  ];

  return (
    <div className="space-y-6">
      {/* Voice Commands */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Mic" size={20} className="text-primary" />
            <h3 className="text-lg font-heading font-medium text-text-primary">
              Voice Commands & Control
            </h3>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.voiceCommands.enabled}
              onChange={(e) => handleSettingChange('voiceCommands', 'enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {settings.voiceCommands.enabled && (
          <div className="space-y-6">
            {/* Wake Word */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Wake Word
              </label>
              <input
                type="text"
                value={settings.voiceCommands.wakeWord}
                onChange={(e) => handleSettingChange('voiceCommands', 'wakeWord', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary text-text-primary"
                placeholder="Enter wake word"
              />
              <p className="text-sm text-text-secondary mt-1">
                Say this phrase to activate voice commands
              </p>
            </div>

            {/* Sensitivity */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Voice Command Sensitivity
              </label>
              <div className="space-y-2">
                {sensitivityOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth"
                  >
                    <input
                      type="radio"
                      name="sensitivity"
                      value={option.value}
                      checked={settings.voiceCommands.sensitivity === option.value}
                      onChange={(e) => handleSettingChange('voiceCommands', 'sensitivity', e.target.value)}
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

            {/* Custom Commands */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-text-primary">Custom Voice Commands</h4>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  onClick={addCustomCommand}
                >
                  Add Command
                </Button>
              </div>

              <div className="space-y-3">
                {settings.voiceCommands.customCommands.map((command, index) => (
                  <div key={index} className="p-4 bg-background rounded-medical border border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">
                          Voice Phrase
                        </label>
                        <input
                          type="text"
                          value={command.phrase}
                          onChange={(e) => updateCustomCommand(index, 'phrase', e.target.value)}
                          className="w-full px-3 py-2 bg-surface border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary text-text-primary"
                          placeholder="e.g., Start conversation"
                        />
                      </div>

                      <div className="flex space-x-2">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-text-primary mb-1">
                            Action
                          </label>
                          <select
                            value={command.action}
                            onChange={(e) => updateCustomCommand(index, 'action', e.target.value)}
                            className="w-full px-3 py-2 bg-surface border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary text-text-primary"
                          >
                            <option value="">Select action</option>
                            {actionOptions.map((action) => (
                              <option key={action.value} value={action.value}>
                                {action.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-end">
                          <Button
                            variant="danger"
                            size="sm"
                            iconName="Trash2"
                            onClick={() => removeCustomCommand(index)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Visual Feedback */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Eye" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Visual Feedback & Display
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
            <input
              type="checkbox"
              checked={settings.visualFeedback.highContrast}
              onChange={(e) => handleSettingChange('visualFeedback', 'highContrast', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <div>
              <div className="font-medium text-text-primary">High Contrast Mode</div>
              <div className="text-sm text-text-secondary">Increase contrast for better visibility</div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
            <input
              type="checkbox"
              checked={settings.visualFeedback.largeText}
              onChange={(e) => handleSettingChange('visualFeedback', 'largeText', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <div>
              <div className="font-medium text-text-primary">Large Text</div>
              <div className="text-sm text-text-secondary">Increase text size throughout the app</div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
            <input
              type="checkbox"
              checked={settings.visualFeedback.reducedMotion}
              onChange={(e) => handleSettingChange('visualFeedback', 'reducedMotion', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <div>
              <div className="font-medium text-text-primary">Reduced Motion</div>
              <div className="text-sm text-text-secondary">Minimize animations and transitions</div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
            <input
              type="checkbox"
              checked={settings.visualFeedback.colorBlindSupport}
              onChange={(e) => handleSettingChange('visualFeedback', 'colorBlindSupport', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <div>
              <div className="font-medium text-text-primary">Color Blind Support</div>
              <div className="text-sm text-text-secondary">Use patterns and shapes in addition to colors</div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
            <input
              type="checkbox"
              checked={settings.visualFeedback.screenReader}
              onChange={(e) => handleSettingChange('visualFeedback', 'screenReader', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <div>
              <div className="font-medium text-text-primary">Screen Reader Optimization</div>
              <div className="text-sm text-text-secondary">Optimize interface for screen readers</div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
            <input
              type="checkbox"
              checked={settings.visualFeedback.visualIndicators}
              onChange={(e) => handleSettingChange('visualFeedback', 'visualIndicators', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <div>
              <div className="font-medium text-text-primary">Enhanced Visual Indicators</div>
              <div className="text-sm text-text-secondary">Show additional visual cues for status changes</div>
            </div>
          </label>
        </div>
      </div>

      {/* Audio Feedback */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Volume2" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Audio Feedback & Speech
          </h3>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Speech Rate
              </label>
              <div className="space-y-2">
                {speechRateOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth"
                  >
                    <input
                      type="radio"
                      name="speechRate"
                      value={option.value}
                      checked={settings.audioFeedback.speechRate === option.value}
                      onChange={(e) => handleSettingChange('audioFeedback', 'speechRate', e.target.value)}
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
                Voice Pitch
              </label>
              <div className="space-y-2">
                {voicePitchOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth"
                  >
                    <input
                      type="radio"
                      name="voicePitch"
                      value={option.value}
                      checked={settings.audioFeedback.voicePitch === option.value}
                      onChange={(e) => handleSettingChange('audioFeedback', 'voicePitch', e.target.value)}
                      className="w-4 h-4 text-primary bg-background border-border focus:ring-primary focus:ring-2"
                    />
                    <div className="font-medium text-text-primary">{option.label}</div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.audioFeedback.audioDescriptions}
                onChange={(e) => handleSettingChange('audioFeedback', 'audioDescriptions', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Audio Descriptions</div>
                <div className="text-sm text-text-secondary">Describe visual elements audibly</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.audioFeedback.soundEffects}
                onChange={(e) => handleSettingChange('audioFeedback', 'soundEffects', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Sound Effects</div>
                <div className="text-sm text-text-secondary">Play sounds for actions and alerts</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.audioFeedback.hapticFeedback}
                onChange={(e) => handleSettingChange('audioFeedback', 'hapticFeedback', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Haptic Feedback</div>
                <div className="text-sm text-text-secondary">Vibration feedback on mobile devices</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.audioFeedback.audioConfirmations}
                onChange={(e) => handleSettingChange('audioFeedback', 'audioConfirmations', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Audio Confirmations</div>
                <div className="text-sm text-text-secondary">Confirm actions with audio feedback</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Assistive Technology Integration */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Accessibility" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Assistive Technology Integration
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
            <input
              type="checkbox"
              checked={settings.assistiveTech.screenReaderSupport}
              onChange={(e) => handleSettingChange('assistiveTech', 'screenReaderSupport', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <div>
              <div className="font-medium text-text-primary">Screen Reader Support</div>
              <div className="text-sm text-text-secondary">NVDA, JAWS, VoiceOver compatibility</div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
            <input
              type="checkbox"
              checked={settings.assistiveTech.keyboardNavigation}
              onChange={(e) => handleSettingChange('assistiveTech', 'keyboardNavigation', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <div>
              <div className="font-medium text-text-primary">Keyboard Navigation</div>
              <div className="text-sm text-text-secondary">Full keyboard accessibility support</div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
            <input
              type="checkbox"
              checked={settings.assistiveTech.voiceControl}
              onChange={(e) => handleSettingChange('assistiveTech', 'voiceControl', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <div>
              <div className="font-medium text-text-primary">Voice Control</div>
              <div className="text-sm text-text-secondary">Dragon NaturallySpeaking integration</div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
            <input
              type="checkbox"
              checked={settings.assistiveTech.switchControl}
              onChange={(e) => handleSettingChange('assistiveTech', 'switchControl', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <div>
              <div className="font-medium text-text-primary">Switch Control</div>
              <div className="text-sm text-text-secondary">External switch device support</div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
            <input
              type="checkbox"
              checked={settings.assistiveTech.eyeTracking}
              onChange={(e) => handleSettingChange('assistiveTech', 'eyeTracking', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <div>
              <div className="font-medium text-text-primary">Eye Tracking</div>
              <div className="text-sm text-text-secondary">Tobii and similar eye tracking devices</div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
            <input
              type="checkbox"
              checked={settings.assistiveTech.headPointer}
              onChange={(e) => handleSettingChange('assistiveTech', 'headPointer', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <div>
              <div className="font-medium text-text-primary">Head Pointer</div>
              <div className="text-sm text-text-secondary">Head movement tracking devices</div>
            </div>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button variant="primary" iconName="Save" className="flex-1 sm:flex-none">
          Save Accessibility Settings
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none">
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default AccessibilitySettings;