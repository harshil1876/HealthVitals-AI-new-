import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import Icon from '../../components/AppIcon';

const UserRegistrationLogin = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('login');
  const [isLoading, setIsLoading] = useState(false);

  const handleModeChange = (mode) => {
    setAuthMode(mode);
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/main-dashboard');
    }, 2000);
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/main-dashboard');
    }, 2500);
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false);
      navigate('/main-dashboard');
    }, 1500);
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2">
          <div className="p-2 bg-primary rounded-lg">
            <Icon name="Activity" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">HealthVitals</h1>
            <p className="text-sm text-gray-500">AI Assistant</p>
          </div>
        </div>

        {/* Auth Forms */}
        {authMode === 'login' ? (
          <LoginForm isLoading={isLoading} onSubmit={handleLogin} />
        ) : (
          <RegisterForm isLoading={isLoading} onSubmit={handleRegister} />
        )}

        {/* Social Login */}
        <SocialLogin isLoading={isLoading} onSocialLogin={handleSocialLogin} />

        {/* Mode Toggle */}
        <div className="text-center">
          <button
            onClick={() => handleModeChange(authMode === 'login' ? 'register' : 'login')}
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            {authMode === 'login' 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 flex items-center space-x-4">
            <Icon name="Loader2" size={24} className="text-primary animate-spin" />
            <span className="text-gray-900 font-medium">
              {authMode === 'login' ? 'Signing in...' : 'Creating your account...'}
            </span>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default UserRegistrationLogin;
