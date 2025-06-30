import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialLogin = ({ isLoading, onSocialLogin }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      name: 'Apple',
      icon: 'Smartphone',
      bgColor: 'bg-black hover:bg-gray-900',
      textColor: 'text-white',
      borderColor: 'border-black'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.name}
            onClick={() => onSocialLogin(provider.name.toLowerCase())}
            disabled={isLoading}
            className={`
              flex items-center justify-center px-4 py-2 
              border ${provider.borderColor} rounded-lg
              ${provider.bgColor} ${provider.textColor}
              transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
            `}
          >
            <Icon 
              name={provider.icon} 
              size={20} 
              className="mr-2"
            />
            <span className="font-medium">{provider.name}</span>
          </button>
        ))}
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          Protected by reCAPTCHA and subject to the{' '}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;
