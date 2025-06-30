import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import SettingsHeader from './components/SettingsHeader';
import AudioSettings from './components/AudioSettings';
import PrivacySettings from './components/PrivacySettings';
import AccountSettings from './components/AccountSettings';
import NotificationSettings from './components/NotificationSettings';
import AccessibilitySettings from './components/AccessibilitySettings';
import DataExportSettings from './components/DataExportSettings';

const SettingsPreferences = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('audio');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['audio', 'privacy', 'account', 'notifications', 'accessibility', 'data'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'audio':
        return <AudioSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'account':
        return <AccountSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'accessibility':
        return <AccessibilitySettings />;
      case 'data':
        return <DataExportSettings />;
      default:
        return <AudioSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <GlobalHeader />
      <PrimaryTabNavigation />
      
      <div className="max-w-7xl mx-auto">
        <SettingsHeader 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          isMobile={isMobile}
        />
        
        <div className="px-4 lg:px-6 py-6">
          <div className="max-w-6xl mx-auto">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPreferences;
