import React from 'react';

const WeeklySummary = () => {
  return (
    <div className="bg-primary rounded-medical-lg shadow-medical p-6 text-white">
      <h2 className="text-xl font-semibold mb-4">Weekly Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="font-semibold">Strongest Area</p>
          <p>Sleep Quality - averaging 8.2 hours</p>
        </div>
        <div>
          <p className="font-semibold">Improvement Focus</p>
          <p>Physical Activity - target 150min/week</p>
        </div>
        <div>
          <p className="font-semibold">Overall Progress</p>
          <p>85% goal achievement rate</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklySummary;
