import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ userName = 'User' }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-medical-lg shadow-medical text-white">
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-white/20 rounded-medical">
          <Icon name="Sun" size={32} color="white" />
        </div>
        <div>
          <h1 className="text-3xl font-heading font-bold">
            Welcome back, {userName}!
          </h1>
          <p className="text-white/90 text-lg">
            {currentDate}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white/10 p-4 rounded-medical">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size={20} color="white" />
            <span className="font-medium">Health Score</span>
          </div>
          <p className="text-2xl font-bold">86%</p>
        </div>
        
        <div className="bg-white/10 p-4 rounded-medical">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={20} color="white" />
            <span className="font-medium">Last Check-in</span>
          </div>
          <p className="text-2xl font-bold">Today</p>
        </div>
        
        <div className="bg-white/10 p-4 rounded-medical">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={20} color="white" />
            <span className="font-medium">Streak</span>
          </div>
          <p className="text-2xl font-bold">12 days</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;