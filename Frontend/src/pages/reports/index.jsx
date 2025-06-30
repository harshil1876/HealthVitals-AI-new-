import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';

const Reports = () => {
  const [timeInterval, setTimeInterval] = useState('week');

  const handleDownload = () => {
    // Implement report download functionality
    console.log('Downloading report...');
  };

  const handleShare = () => {
    // Implement report sharing functionality
    console.log('Sharing report...');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <GlobalHeader />
      <PrimaryTabNavigation />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Weekly Reports</h1>
              <p className="text-text-secondary">Your comprehensive wellness insights</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={timeInterval}
                onChange={(e) => setTimeInterval(e.target.value)}
                className="border border-border rounded-medical px-4 py-2"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="3months">Last 3 Months</option>
              </select>
              <Button
                variant="outline"
                onClick={handleDownload}
                className="flex items-center space-x-2"
              >
                <Icon name="Download" size={20} />
                <span>Download</span>
              </Button>
              <Button
                variant="primary"
                onClick={handleShare}
                className="flex items-center space-x-2"
              >
                <Icon name="Share2" size={20} />
                <span>Share</span>
              </Button>
            </div>
          </div>

          {/* WTF Did You Do This Week? */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-medical-lg shadow-medical p-8 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-6">WTF Did You Do This Week?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-3xl font-bold">7</p>
                <p className="text-sm opacity-90">Avg Mood</p>
              </div>
              <div>
                <p className="text-3xl font-bold">6h</p>
                <p className="text-sm opacity-90">Sleep</p>
              </div>
              <div>
                <p className="text-3xl font-bold">73min</p>
                <p className="text-sm opacity-90">Exercise</p>
              </div>
              <div>
                <p className="text-3xl font-bold">77.1%</p>
                <p className="text-sm opacity-90">Goal Progress</p>
              </div>
            </div>
          </div>

          {/* AI Insights & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-background rounded-medical-lg shadow-medical p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-medical">
                  <Icon name="Brain" size={24} className="text-primary" />
                </div>
                <h2 className="text-xl font-semibold">AI Insights</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Icon name="AlertCircle" size={20} className="text-warning mt-1" />
                  <p className="text-text-secondary">You're getting less sleep than recommended.</p>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="Activity" size={20} className="text-error mt-1" />
                  <p className="text-text-secondary">You exercised less than the recommended amount this week.</p>
                </li>
              </ul>
            </div>

            <div className="bg-background rounded-medical-lg shadow-medical p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-success/10 rounded-medical">
                  <Icon name="Target" size={24} className="text-success" />
                </div>
                <h2 className="text-xl font-semibold">Recommendations</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Icon name="Check" size={20} className="text-success mt-1" />
                  <p className="text-text-secondary">Aim for 7-9 hours of sleep. Try establishing a consistent bedtime routine.</p>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="Check" size={20} className="text-success mt-1" />
                  <p className="text-text-secondary">Try to incorporate more physical activity. Even 10-minute walks help!</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Emotional Pattern & Goal Alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-background rounded-medical-lg shadow-medical p-6">
              <h2 className="text-xl font-semibold mb-4">Emotional Pattern</h2>
              <div className="text-center p-8">
                <div className="inline-block p-8 bg-error/10 rounded-full mb-4">
                  <Icon name="Frown" size={48} className="text-error" />
                </div>
                <h3 className="text-lg font-medium text-text-primary">Challenging emotional period</h3>
                <p className="text-text-secondary mt-2">Based on your voice tone analysis and daily reflections</p>
              </div>
            </div>

            <div className="bg-background rounded-medical-lg shadow-medical p-6">
              <h2 className="text-xl font-semibold mb-4">Goal Alignment</h2>
              <div className="text-center p-8">
                <div className="relative inline-block">
                  <svg className="w-32 h-32">
                    <circle
                      className="text-surface stroke-current"
                      strokeWidth="8"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="text-primary stroke-current"
                      strokeWidth="8"
                      strokeLinecap="round"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                      strokeDasharray="364.425"
                      strokeDashoffset="91.106"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">77.1%</span>
                  </div>
                </div>
                <p className="text-text-secondary mt-4">Average progress across all your active goals</p>
              </div>
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="bg-background rounded-medical-lg shadow-medical p-6">
            <h2 className="text-xl font-semibold mb-4">Weekly Summary</h2>
            <div className="prose max-w-none text-text-secondary">
              <p>This week, you logged 1 days of data. Your overall wellness score was <strong>6.3/10</strong>, showing strong emotional well-being.</p>
              <p className="mt-4">Your sleep pattern averaged <strong>6 hours</strong> per night, and you completed <strong>73 minutes</strong> of physical activity. Your emotional state was characterized as <strong>challenging emotional period</strong>.</p>
              <p className="mt-4">Looking ahead, focus on the recommendations above to continue your wellness journey. Remember, small consistent improvements lead to significant long-term changes.</p>
            </div>
          </div>
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

export default Reports;
