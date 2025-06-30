import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center p-4">
      <div className="hidden md:flex flex-col justify-center text-white max-w-md mr-12 space-y-6">
        <h1 className="text-4xl font-extrabold">Transform Your Wellness Journey</h1>
        <p className="text-lg">
          Build healthier, goal-aligned routines through daily reflection, behavior tracking, and AI-powered insights with your personalized digital twin.
        </p>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>Voice-first daily reflections</li>
          <li>AI-powered behavior analysis</li>
          <li>Personalized weekly insights</li>
        </ul>
        <footer className="mt-auto text-sm opacity-70">
          &copy; {new Date().getFullYear()} HealthVitals AI. All rights reserved.
        </footer>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
