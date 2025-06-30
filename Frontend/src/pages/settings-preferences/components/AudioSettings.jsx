import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AudioSettings = () => {
  const [settings, setSettings] = useState({
    microphoneSensitivity: 75,
    noiseCancellation: true,
    voiceLanguage: 'en-US',
    audioQuality: 'high',
    autoGainControl: true,
    echoCancellation: true,
    voiceActivation: true,
    silenceDetection: 2000,
    recordingFormat: 'webm'
  });

  const [isTestingMic, setIsTestingMic] = useState(false);
  const [micLevel, setMicLevel] = useState(0);

  const languages = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
    { code: 'es-ES', name: 'Spanish (Spain)', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'French (France)', flag: '🇫🇷' },
    { code: 'de-DE', name: 'German (Germany)', flag: '🇩🇪' },
    { code: 'it-IT', name: 'Italian (Italy)', flag: '🇮🇹' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)', flag: '🇧🇷' },
    { code: 'zh-CN', name: 'Chinese (Mandarin)', flag: '🇨🇳' },
    { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' }
  ];

  const qualityOptions = [
    { value: 'low', label: 'Low Quality', description: 'Optimized for slow connections (16kHz)' },
    { value: 'medium', label: 'Medium Quality', description: 'Balanced quality and bandwidth (22kHz)' },
    { value: 'high', label: 'High Quality', description: 'Best quality for fast connections (44kHz)' },
    { value: 'lossless', label: 'Lossless', description: 'Uncompressed audio (48kHz)' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const testMicrophone = async () => {
    setIsTestingMic(true);
    // Simulate microphone testing
    const interval = setInterval(() => {
      setMicLevel(Math.random() * 100);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setIsTestingMic(false);
      setMicLevel(0);
    }, 3000);
  };

  const resetToDefaults = () => {
    setSettings({
      microphoneSensitivity: 75,
      noiseCancellation: true,
      voiceLanguage: 'en-US',
      audioQuality: 'high',
      autoGainControl: true,
      echoCancellation: true,
      voiceActivation: true,
      silenceDetection: 2000,
      recordingFormat: 'webm'
    });
  };

  return (
    <div className="space-y-6">
      {/* Microphone Settings */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Mic" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Microphone Settings
          </h3>
        </div>

        <div className="space-y-4">
          {/* Microphone Test */}
          <div className="p-4 bg-background rounded-medical border border-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-text-primary">Microphone Test</h4>
                <p className="text-sm text-text-secondary">Test your microphone input levels</p>
              </div>
              <Button
                variant={isTestingMic ? "danger" : "primary"}
                size="sm"
                onClick={testMicrophone}
                iconName={isTestingMic ? "Square" : "Play"}
                disabled={isTestingMic}
              >
                {isTestingMic ? 'Testing...' : 'Test Mic'}
              </Button>
            </div>
            
            {/* Microphone Level Indicator */}
            <div className="w-full h-3 bg-surface-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-secondary to-primary transition-all duration-100"
                style={{ width: `${micLevel}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>Silent</span>
              <span>Optimal</span>
              <span>Too Loud</span>
            </div>
          </div>

          {/* Sensitivity Slider */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Microphone Sensitivity: {settings.microphoneSensitivity}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.microphoneSensitivity}
              onChange={(e) => handleSettingChange('microphoneSensitivity', parseInt(e.target.value))}
              className="w-full h-2 bg-surface-200 rounded-full appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>

          {/* Audio Processing Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.noiseCancellation}
                onChange={(e) => handleSettingChange('noiseCancellation', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Noise Cancellation</div>
                <div className="text-sm text-text-secondary">Reduce background noise</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.autoGainControl}
                onChange={(e) => handleSettingChange('autoGainControl', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Auto Gain Control</div>
                <div className="text-sm text-text-secondary">Automatically adjust volume</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.echoCancellation}
                onChange={(e) => handleSettingChange('echoCancellation', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Echo Cancellation</div>
                <div className="text-sm text-text-secondary">Prevent audio feedback</div>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth">
              <input
                type="checkbox"
                checked={settings.voiceActivation}
                onChange={(e) => handleSettingChange('voiceActivation', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <div>
                <div className="font-medium text-text-primary">Voice Activation</div>
                <div className="text-sm text-text-secondary">Start recording automatically</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Languages" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Language & Recognition
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Voice Recognition Language
            </label>
            <select
              value={settings.voiceLanguage}
              onChange={(e) => handleSettingChange('voiceLanguage', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary text-text-primary"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-text-secondary mt-1">
              Choose the language for voice recognition and commands
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Silence Detection (ms)
            </label>
            <Input
              type="number"
              min="500"
              max="5000"
              step="100"
              value={settings.silenceDetection}
              onChange={(e) => handleSettingChange('silenceDetection', parseInt(e.target.value))}
              placeholder="2000"
            />
            <p className="text-sm text-text-secondary mt-1">
              How long to wait before stopping recording (500-5000ms)
            </p>
          </div>
        </div>
      </div>

      {/* Audio Quality Settings */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Volume2" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Audio Quality & Format
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Audio Quality
            </label>
            <div className="space-y-2">
              {qualityOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-start space-x-3 p-3 bg-background rounded-medical border border-border cursor-pointer hover:bg-surface-100 transition-smooth"
                >
                  <input
                    type="radio"
                    name="audioQuality"
                    value={option.value}
                    checked={settings.audioQuality === option.value}
                    onChange={(e) => handleSettingChange('audioQuality', e.target.value)}
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
            <label className="block text-sm font-medium text-text-primary mb-2">
              Recording Format
            </label>
            <select
              value={settings.recordingFormat}
              onChange={(e) => handleSettingChange('recordingFormat', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary text-text-primary"
            >
              <option value="webm">WebM (Recommended)</option>
              <option value="mp4">MP4 (Universal)</option>
              <option value="wav">WAV (Uncompressed)</option>
              <option value="ogg">OGG (Open Source)</option>
            </select>
            <p className="text-sm text-text-secondary mt-1">
              Choose the audio format for conversation recordings
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button variant="primary" iconName="Save" className="flex-1 sm:flex-none">
          Save Audio Settings
        </Button>
        <Button variant="outline" onClick={resetToDefaults} className="flex-1 sm:flex-none">
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default AudioSettings;