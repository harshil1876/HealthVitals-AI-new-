import React from 'react';

const AIInsightsPatterns = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-background rounded-medical-lg shadow-medical p-6">
        <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
        <ul className="list-disc list-inside space-y-2 text-text-primary">
          <li>You're getting less sleep than recommended. Try establishing a consistent bedtime routine.</li>
          <li>You exercised less than the recommended amount this week.</li>
          <li>Your hydration levels have improved by 15% this week.</li>
          <li>Stress levels appear elevated during weekdays compared to weekends.</li>
        </ul>
      </div>
      <div className="bg-background rounded-medical-lg shadow-medical p-6">
        <h2 className="text-xl font-semibold mb-4">Patterns & Streaks</h2>
        <div className="space-y-4">
          <div className="bg-green-100 p-4 rounded-medical">
            <p className="font-semibold text-green-700">Exercise Streak</p>
            <p className="text-green-700">Consistent daily activity</p>
            <p className="text-green-900 font-bold text-lg">5 days</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-medical">
            <p className="font-semibold text-purple-700">Mood Stability</p>
            <p className="text-purple-700">Positive emotional trend</p>
            <p className="text-purple-900 font-bold text-lg">87%</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-medical">
            <p className="font-semibold text-blue-700">Sleep Consistency</p>
            <p className="text-blue-700">Regular sleep schedule</p>
            <p className="text-blue-900 font-bold text-lg">8.2h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPatterns;
