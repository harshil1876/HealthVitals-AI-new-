import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';


const PrimaryTabNavigation = ({ isMobile = false }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/main-dashboard',
      icon: 'Home',
      tooltip: 'Start new conversations and view recent activity',
      description: 'Main hub for voice interactions'
    },
    {
      label: 'History',
      path: '/conversation-history-transcripts',
      icon: 'History',
      tooltip: 'Review past conversations and transcripts',
      description: 'Access conversation archive'
    },
    {
      label: 'Analytics',
      path: '/analytics',
      icon: 'BarChart3',
      tooltip: 'View wellness analytics and trends',
      description: 'Deep insights into your wellness journey'
    },
    {
      label: 'Insights',
      path: '/insights',
      icon: 'Brain',
      tooltip: 'AI-powered analysis of health conversations',
      description: 'Health conversation insights'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  if (isMobile) {
    return (
      <nav className="space-y-2" role="navigation" aria-label="Primary navigation">
        {navigationItems.map((item) => {
          const isActive = isActivePath(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-medical transition-smooth focus-medical ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-medical'
                  : 'text-text-primary hover:bg-surface-100 hover:text-primary'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon 
                name={item.icon} 
                size={20} 
                color={isActive ? 'currentColor' : 'currentColor'}
              />
              <div className="flex-1 text-left">
                <div className="font-medium">{item.label}</div>
                <div className={`text-sm ${
                  isActive ? 'text-primary-foreground/80' : 'text-text-secondary'
                }`}>
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav 
      className="flex items-center space-x-1 bg-surface rounded-medical-lg p-1 shadow-medical-sm"
      role="navigation" 
      aria-label="Primary navigation"
    >
      {navigationItems.map((item) => {
        const isActive = isActivePath(item.path);
        
        return (
          <div key={item.path} className="relative group">
            <button
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-medical transition-smooth focus-medical ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-medical'
                  : 'text-text-primary hover:bg-background hover:text-primary hover:shadow-medical-sm'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon 
                name={item.icon} 
                size={18} 
                color="currentColor"
              />
              <span className="font-medium text-sm">{item.label}</span>
            </button>

            {/* Tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-text-primary text-white text-sm rounded-medical shadow-medical-lg opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none z-60 whitespace-nowrap">
              {item.tooltip}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-text-primary rotate-45"></div>
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default PrimaryTabNavigation;