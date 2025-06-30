import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isOpen = true, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Home',
      path: '/home-dashboard',
      icon: 'Home',
      description: 'Welcome & Overview'
    },
    {
      label: 'Dashboard',
      path: '/main-dashboard',
      icon: 'BarChart3',
      description: 'Health Analytics'
    },
    {
      label: 'Voice Chat',
      path: '/active-voice-conversation',
      icon: 'Mic',
      description: 'AI Conversations'
    },
    {
      label: 'Analytics',
      path: '/analytics',
      icon: 'TrendingUp',
      description: 'Deep Insights'
    },
    {
      label: 'Goals',
      path: '/goals',
      icon: 'Target',
      description: 'Wellness Objectives'
    },
    {
      label: 'Insights',
      path: '/health-insights-analytics',
      icon: 'Brain',
      description: 'AI Health Tips'
    },
    {
      label: 'Reports',
      path: '/reports',
      icon: 'FileText',
      description: 'Weekly Reports'
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: 'User',
      description: 'Account Settings'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed left-0 top-16 bottom-0 z-40 bg-background border-r border-border shadow-medical transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}>
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {isOpen && (
              <h2 className="text-lg font-heading font-semibold text-text-primary">
                Navigation
              </h2>
            )}
            <Button
              variant="ghost"
              size="sm"
              iconName={isOpen ? "ChevronLeft" : "ChevronRight"}
              iconSize={20}
              onClick={onToggle}
              className="ml-auto"
            />
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = isActivePath(item.path);
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-medical transition-smooth focus-medical ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-medical'
                      : 'text-text-primary hover:bg-surface-100 hover:text-primary'
                  }`}
                  title={!isOpen ? item.label : ''}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    color="currentColor"
                    className="flex-shrink-0"
                  />
                  {isOpen && (
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className={`text-xs ${
                        isActive ? 'text-primary-foreground/80' : 'text-text-secondary'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Notification Bell */}
          <div className="p-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              iconName="Bell"
              iconSize={18}
              onClick={() => navigate('/notifications')}
              className={`w-full ${!isOpen ? 'justify-center' : ''}`}
            >
              {isOpen && 'Notifications'}
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;