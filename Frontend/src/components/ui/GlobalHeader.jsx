import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import PrimaryTabNavigation from './PrimaryTabNavigation';
import ProfileSettingsMenu from './ProfileSettingsMenu';

const GlobalHeader = ({ conversationActive = false, onEmergency }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showEmergencyTooltip, setShowEmergencyTooltip] = useState(false);

  const isAuthPage = location.pathname === '/user-registration-login';

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleEmergencyClick = () => {
    if (onEmergency) {
      onEmergency();
    }
    setShowEmergencyTooltip(true);
    setTimeout(() => setShowEmergencyTooltip(false), 2000);
  };

  const handleLogoClick = () => {
    if (!conversationActive) {
      navigate('/main-dashboard');
    }
  };

  if (isAuthPage) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-medical">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className={`flex items-center space-x-3 transition-smooth focus-medical ${
                conversationActive ? 'opacity-60 cursor-default' : 'hover:opacity-80'
              }`}
              disabled={conversationActive}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-medical">
                <Icon 
                  name="Activity" 
                  size={24} 
                  color="white" 
                  className="drop-shadow-sm"
                />
              </div>
              <div className={`${conversationActive ? 'hidden sm:block' : 'block'}`}>
                <h1 className="text-xl font-heading font-semibold text-primary">
                  HealthVitals
                </h1>
                <p className="text-xs text-text-secondary font-caption -mt-1">
                  AI Assistant
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          {!conversationActive && (
            <div className="hidden lg:flex items-center flex-1 justify-center max-w-2xl mx-8">
              <PrimaryTabNavigation />
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Emergency Button */}
            <div className="relative">
              <Button
                variant="danger"
                size="sm"
                iconName="Phone"
                iconSize={16}
                onClick={handleEmergencyClick}
                className="shadow-medical-sm"
              >
                <span className="hidden sm:inline">Emergency</span>
                <span className="sm:hidden">911</span>
              </Button>
              
              {showEmergencyTooltip && (
                <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-text-primary text-white text-sm rounded-medical shadow-medical-lg animate-fade-in z-60">
                  Emergency services contacted
                  <div className="absolute -top-1 right-4 w-2 h-2 bg-text-primary transform rotate-45"></div>
                </div>
              )}
            </div>

            {/* Profile Menu - Hidden during conversation */}
            {!conversationActive && (
              <>
                <div className="hidden lg:block">
                  <ProfileSettingsMenu />
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={isMobileMenuOpen ? "X" : "Menu"}
                    iconSize={20}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="focus-medical"
                  />
                </div>
              </>
            )}

            {/* Conversation Status Indicator */}
            {conversationActive && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 rounded-medical border border-primary/20">
                <div className="w-2 h-2 bg-primary rounded-full animate-breathing"></div>
                <span className="text-sm font-medium text-primary">
                  Active Session
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && !conversationActive && (
          <div className="lg:hidden border-t border-border bg-surface animate-slide-in">
            <div className="px-4 py-4 space-y-4">
              <PrimaryTabNavigation isMobile />
              <div className="pt-4 border-t border-border">
                <ProfileSettingsMenu isMobile />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default GlobalHeader;