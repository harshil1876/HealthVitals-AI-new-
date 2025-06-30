import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  selectedConversations, 
  onBulkExport, 
  onBulkShare, 
  onBulkDelete,
  onSelectAll,
  onDeselectAll,
  totalConversations 
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const selectedCount = selectedConversations.length;
  const isAllSelected = selectedCount === totalConversations && totalConversations > 0;

  const handleBulkDelete = () => {
    onBulkDelete(selectedConversations);
    setShowDeleteConfirm(false);
  };

  const shareOptions = [
    {
      id: 'healthcare-provider',
      label: 'Healthcare Provider',
      icon: 'UserCheck',
      description: 'Share with your doctor or healthcare team'
    },
    {
      id: 'family-member',
      label: 'Family Member',
      icon: 'Users',
      description: 'Share with family or caregivers'
    },
    {
      id: 'email',
      label: 'Email',
      icon: 'Mail',
      description: 'Send via email'
    },
    {
      id: 'secure-link',
      label: 'Secure Link',
      icon: 'Link',
      description: 'Generate a secure sharing link'
    }
  ];

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-background border border-border rounded-medical-lg shadow-medical-lg p-4 animate-slide-in">
        <div className="flex items-center space-x-4">
          {/* Selection Info */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
              {selectedCount}
            </div>
            <span className="text-sm font-medium text-text-primary">
              {selectedCount} conversation{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Select All/Deselect All */}
            <Button
              variant="outline"
              size="sm"
              iconName={isAllSelected ? "Square" : "CheckSquare"}
              iconSize={16}
              onClick={isAllSelected ? onDeselectAll : onSelectAll}
            >
              {isAllSelected ? 'Deselect All' : 'Select All'}
            </Button>

            {/* Export */}
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconSize={16}
              onClick={() => onBulkExport(selectedConversations)}
            >
              Export
            </Button>

            {/* Share */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                iconName="Share"
                iconSize={16}
                onClick={() => setShowShareOptions(!showShareOptions)}
              >
                Share
              </Button>

              {showShareOptions && (
                <div className="absolute bottom-full left-0 mb-2 w-72 bg-background border border-border rounded-medical-lg shadow-medical-lg animate-scale-in">
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-text-primary mb-3">Share Options</h3>
                    <div className="space-y-2">
                      {shareOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            onBulkShare(selectedConversations, option.id);
                            setShowShareOptions(false);
                          }}
                          className="w-full flex items-start space-x-3 p-3 rounded-medical transition-smooth hover:bg-surface-100 focus-medical"
                        >
                          <Icon name={option.icon} size={18} className="text-primary flex-shrink-0 mt-0.5" />
                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium text-text-primary">{option.label}</div>
                            <div className="text-xs text-text-secondary">{option.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Delete */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                iconName="Trash2"
                iconSize={16}
                onClick={() => setShowDeleteConfirm(true)}
                className="border-error text-error hover:bg-error hover:text-error-foreground"
              >
                Delete
              </Button>

              {showDeleteConfirm && (
                <div className="absolute bottom-full left-0 mb-2 w-80 bg-background border border-border rounded-medical-lg shadow-medical-lg animate-scale-in">
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="AlertTriangle" size={18} className="text-error" />
                      <h3 className="text-sm font-medium text-text-primary">Delete Conversations</h3>
                    </div>
                    <p className="text-sm text-text-secondary mb-4">
                      Are you sure you want to delete {selectedCount} conversation{selectedCount !== 1 ? 's' : ''}? 
                      This action cannot be undone and will permanently remove all conversation data, transcripts, and associated health information.
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={handleBulkDelete}
                        className="flex-1"
                      >
                        Delete {selectedCount} Conversation{selectedCount !== 1 ? 's' : ''}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Close */}
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconSize={16}
              onClick={onDeselectAll}
              className="text-text-secondary"
            />
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showDeleteConfirm || showShareOptions) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setShowDeleteConfirm(false);
            setShowShareOptions(false);
          }}
        />
      )}
    </div>
  );
};

export default BulkActions;