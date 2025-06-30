import React, { useState, useCallback } from 'react';
import { format } from 'date-fns';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const VitalEntryPanel = ({ recentVitals = [], onVitalEntry }) => {
  const [activeTab, setActiveTab] = useState('quick');
  const [quickVitals, setQuickVitals] = useState({
    blood_pressure_systolic: '',
    blood_pressure_diastolic: '',
    heart_rate: '',
    temperature: '',
    weight: '',
    blood_sugar: ''
  });
  
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const vitalTypes = {
    blood_pressure: { label: 'Blood Pressure', unit: 'mmHg', icon: 'Activity' },
    heart_rate: { label: 'Heart Rate', unit: 'bpm', icon: 'Heart' },
    temperature: { label: 'Temperature', unit: '°F', icon: 'Thermometer' },
    weight: { label: 'Weight', unit: 'lbs', icon: 'Scale' },
    blood_sugar: { label: 'Blood Sugar', unit: 'mg/dL', icon: 'Droplet' }
  };

  const handleQuickVitalChange = (type, value) => {
    setQuickVitals(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSubmitVital = useCallback((type) => {
    let value;
    let confidence = 0.95;

    if (type === 'blood_pressure') {
      const systolic = quickVitals.blood_pressure_systolic;
      const diastolic = quickVitals.blood_pressure_diastolic;
      
      if (!systolic || !diastolic) return;
      
      value = `${systolic}/${diastolic}`;
      setQuickVitals(prev => ({
        ...prev,
        blood_pressure_systolic: '',
        blood_pressure_diastolic: ''
      }));
    } else {
      value = quickVitals[type];
      if (!value) return;
      
      setQuickVitals(prev => ({
        ...prev,
        [type]: ''
      }));
    }

    const vital = {
      type,
      value: value + (vitalTypes[type]?.unit ? ` ${vitalTypes[type].unit}` : ''),
      timestamp: new Date(),
      confidence,
      source: 'manual_entry'
    };

    if (onVitalEntry) {
      onVitalEntry(vital);
    }
  }, [quickVitals, onVitalEntry]);

  const handleFileUpload = useCallback(async (event) => {
    const files = Array.from(event.target.files);
    
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      const newFiles = files.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
        status: 'processed'
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setIsUploading(false);
      
      // Auto-extract vitals from uploaded file (simulation)
      if (files[0]?.type === 'application/pdf') {
        setTimeout(() => {
          const extractedVitals = [
            {
              type: 'blood_pressure',
              value: '125/82 mmHg',
              timestamp: new Date(),
              confidence: 0.88,
              source: 'document_extraction'
            },
            {
              type: 'heart_rate',
              value: '74 bpm',
              timestamp: new Date(),
              confidence: 0.91,
              source: 'document_extraction'
            }
          ];
          
          extractedVitals.forEach(vital => {
            if (onVitalEntry) {
              onVitalEntry(vital);
            }
          });
        }, 2000);
      }
    }, 1500);
  }, [onVitalEntry]);

  const handleRemoveFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getVitalIcon = (type) => {
    return vitalTypes[type]?.icon || 'Activity';
  };

  const getSourceColor = (source) => {
    switch (source) {
      case 'manual_entry': return 'text-primary';
      case 'document_extraction': return 'text-secondary';
      case 'device_sync': return 'text-accent';
      default: return 'text-text-muted';
    }
  };

  const getSourceLabel = (source) => {
    switch (source) {
      case 'manual_entry': return 'Manual Entry';
      case 'document_extraction': return 'Document';
      case 'device_sync': return 'Device';
      default: return 'Unknown';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
          Immediate Vitals
        </h3>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-surface-100 p-1 rounded-medical">
          <button
            onClick={() => setActiveTab('quick')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
              activeTab === 'quick' ?'bg-white text-primary shadow-medical-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Quick Entry
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
              activeTab === 'upload' ?'bg-white text-primary shadow-medical-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Upload PDF
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'quick' && (
          <div className="space-y-4">
            {/* Blood Pressure */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary flex items-center space-x-2">
                <Icon name="Activity" size={14} />
                <span>Blood Pressure</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Systolic"
                  value={quickVitals.blood_pressure_systolic}
                  onChange={(e) => handleQuickVitalChange('blood_pressure_systolic', e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <span className="flex items-center text-text-muted">/</span>
                <input
                  type="number"
                  placeholder="Diastolic"
                  value={quickVitals.blood_pressure_diastolic}
                  onChange={(e) => handleQuickVitalChange('blood_pressure_diastolic', e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Plus"
                  onClick={() => handleSubmitVital('blood_pressure')}
                  disabled={!quickVitals.blood_pressure_systolic || !quickVitals.blood_pressure_diastolic}
                  className="px-3"
                />
              </div>
            </div>

            {/* Other Vitals */}
            {Object.entries(vitalTypes).filter(([key]) => key !== 'blood_pressure').map(([key, config]) => (
              <div key={key} className="space-y-2">
                <label className="text-sm font-medium text-text-primary flex items-center space-x-2">
                  <Icon name={config.icon} size={14} />
                  <span>{config.label}</span>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder={`Enter ${config.label.toLowerCase()}`}
                    value={quickVitals[key]}
                    onChange={(e) => handleQuickVitalChange(key, e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="Plus"
                    onClick={() => handleSubmitVital(key)}
                    disabled={!quickVitals[key]}
                    className="px-3"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="space-y-4">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-border rounded-medical-lg p-6 text-center">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={isUploading}
              />
              <label
                htmlFor="file-upload"
                className={`cursor-pointer ${isUploading ? 'opacity-50' : ''}`}
              >
                <Icon name="Upload" size={32} className="mx-auto text-text-muted mb-2" />
                <p className="text-sm text-text-primary font-medium mb-1">
                  {isUploading ? 'Processing...' : 'Upload Medical Documents'}
                </p>
                <p className="text-xs text-text-secondary">
                  PDF, JPG, PNG files supported
                </p>
              </label>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-text-primary">
                  Uploaded Files ({uploadedFiles.length})
                </h4>
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 bg-surface-100 rounded-medical"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <Icon name="FileText" size={16} className="text-text-muted flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {formatFileSize(file.size)} • {format(file.uploadedAt, 'MMM d, HH:mm')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-2xs ${
                        file.status === 'processed' ?'bg-success-100 text-success-600' :'bg-warning-100 text-warning-600'
                      }`}>
                        {file.status === 'processed' ? 'Processed' : 'Processing'}
                      </span>
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="X"
                        onClick={() => handleRemoveFile(file.id)}
                        className="text-text-muted hover:text-error"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Recent Vitals */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-text-primary">
            Recent Entries
          </h4>
          <Button
            variant="ghost"
            size="xs"
            iconName="MoreHorizontal"
            className="text-text-muted"
          />
        </div>
        
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {recentVitals.slice(0, 5).map((vital, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-surface-100 rounded-medical"
            >
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getVitalIcon(vital.type)} 
                  size={14} 
                  className="text-text-muted" 
                />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {vital.value}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {format(vital.timestamp, 'HH:mm')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xs ${getSourceColor(vital.source)}`}>
                  {getSourceLabel(vital.source)}
                </div>
                <div className="text-xs text-text-muted">
                  {Math.round(vital.confidence * 100)}%
                </div>
              </div>
            </div>
          ))}
          
          {recentVitals.length === 0 && (
            <div className="text-center py-4">
              <Icon name="Activity" size={24} className="mx-auto text-text-muted mb-2" />
              <p className="text-xs text-text-secondary">
                No vitals entered yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VitalEntryPanel;