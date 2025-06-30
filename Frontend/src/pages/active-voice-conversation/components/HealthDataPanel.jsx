import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HealthDataPanel = ({ extractedData = [], onExportData, onViewDetails }) => {
  const getDataTypeIcon = (type) => {
    switch (type) {
      case 'vitals': return 'Activity';
      case 'symptoms': return 'AlertCircle';
      case 'medication': return 'Pill';
      case 'pain': return 'Zap';
      case 'mood': return 'Heart';
      default: return 'FileText';
    }
  };

  const getDataTypeColor = (type) => {
    switch (type) {
      case 'vitals': return 'text-primary bg-primary/10 border-primary/20';
      case 'symptoms': return 'text-warning bg-warning/10 border-warning/20';
      case 'medication': return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'pain': return 'text-error bg-error/10 border-error/20';
      case 'mood': return 'text-accent bg-accent/10 border-accent/20';
      default: return 'text-text-secondary bg-surface border-border';
    }
  };

  return (
    <div className="h-full flex flex-col bg-surface border-l border-border">
      {/* Header */}
      <div className="p-4 border-b border-border bg-background">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-text-primary">Health Data Extracted</h3>
          <Button
            variant="outline"
            size="xs"
            iconName="Download"
            iconSize={14}
            onClick={onExportData}
            disabled={extractedData.length === 0}
          >
            Export
          </Button>
        </div>
        <p className="text-xs text-text-secondary mt-1">
          AI-identified health information from your conversation
        </p>
      </div>

      {/* Data List */}
      <div className="flex-1 overflow-y-auto p-4">
        {extractedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <Icon name="Search" size={40} className="text-text-muted mb-3" />
            <h4 className="font-medium text-text-primary mb-2">No Data Yet</h4>
            <p className="text-sm text-text-secondary max-w-xs">
              Start your conversation and the AI will automatically extract relevant health information.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {extractedData.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-medical border ${getDataTypeColor(item.type)}`}
              >
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={getDataTypeIcon(item.type)} 
                    size={16} 
                    className="mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm capitalize">
                        {item.type.replace('_', ' ')}
                      </h4>
                      <span className="text-xs opacity-70">
                        {new Date(item.timestamp).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-sm mt-1 break-words">
                      {item.value}
                    </p>
                    {item.confidence && (
                      <div className="flex items-center space-x-1 mt-2">
                        <div className="w-full bg-background/50 rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full bg-current opacity-60"
                            style={{ width: `${item.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-xs opacity-70 whitespace-nowrap">
                          {Math.round(item.confidence * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="mt-3 pt-2 border-t border-current/10">
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="ExternalLink"
                    iconSize={12}
                    onClick={() => onViewDetails(item.id)}
                    className="text-current hover:bg-current/10 w-full justify-center"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {extractedData.length > 0 && (
        <div className="p-4 border-t border-border bg-background">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-text-primary">
                {extractedData.length}
              </div>
              <div className="text-xs text-text-secondary">
                Data Points
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold text-text-primary">
                {new Set(extractedData.map(item => item.type)).size}
              </div>
              <div className="text-xs text-text-secondary">
                Categories
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthDataPanel;