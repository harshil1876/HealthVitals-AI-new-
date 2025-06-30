import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ mode }) => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4 shadow-medical">
        <Icon name="Activity" size={32} color="white" />
      </div>
      
      <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-text-primary mb-2">
        {mode === 'login' ? 'Welcome Back' : 'Join HealthVitals AI'}
      </h1>
      
      <p className="text-text-secondary max-w-md mx-auto">
        {mode === 'login' ?'Sign in to continue your personalized health conversations and access your conversation history.' :'Create your account to start having intelligent health conversations with our AI assistant.'
        }
      </p>
    </div>
  );
};

export default AuthHeader;