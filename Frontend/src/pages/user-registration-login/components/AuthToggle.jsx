import React from 'react';

const AuthToggle = ({ activeMode, onModeChange }) => {
  return (
    <div className="flex bg-surface rounded-lg p-1 mb-8">
      <button
        onClick={() => onModeChange('login')}
        className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-smooth focus-medical ${
          activeMode === 'login' ?'bg-primary text-primary-foreground shadow-medical' :'text-text-secondary hover:text-text-primary'
        }`}
      >
        Sign In
      </button>
      <button
        onClick={() => onModeChange('register')}
        className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-smooth focus-medical ${
          activeMode === 'register' ?'bg-primary text-primary-foreground shadow-medical' :'text-text-secondary hover:text-text-primary'
        }`}
      >
        Create Account
      </button>
    </div>
  );
};

export default AuthToggle;