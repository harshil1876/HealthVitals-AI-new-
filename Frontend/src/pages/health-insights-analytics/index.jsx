import React, { useState } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import AnalyticsMetrics from './components/AnalyticsMetrics';
import WellnessTrends from './components/WellnessTrends';
import AIInsightsPatterns from './components/AIInsightsPatterns';
import WeeklySummary from './components/WeeklySummary';

const Analytics = () => {
  const [timeInterval, setTimeInterval] = useState('week');

  const timeOptions = [
    { value: 'week', label: 'This Week' },
    { value: '15days', label: 'Last 15 Days' },
    { value: 'month', label: 'This Month' },
    { value: '3months', label: 'Last 3 Months' }
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <GlobalHeader />
      <PrimaryTabNavigation />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Analytics</h1>
              <p className="text-text-secondary">Deep insights into your wellness journey</p>
            </div>
            <select
              value={timeInterval}
              onChange={(e) => setTimeInterval(e.target.value)}
              className="border border-border rounded-medical p-2"
            >
              {timeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </header>

          {/* Analytics Components */}
          <AnalyticsMetrics />
          <WellnessTrends />
          <AIInsightsPatterns />
          <WeeklySummary />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">
              © {new Date().getFullYear()} HealthVitals AI. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-sm text-text-secondary hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-sm text-text-secondary hover:text-primary">Terms of Service</a>
              <a href="#" className="text-sm text-text-secondary hover:text-primary">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Analytics;
