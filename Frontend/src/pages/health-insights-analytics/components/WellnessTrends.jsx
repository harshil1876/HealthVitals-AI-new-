import React from 'react';

const WellnessTrends = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-background rounded-medical-lg shadow-medical p-6">
        <h2 className="text-xl font-semibold mb-4">Wellness Trends</h2>
        {/* Placeholder for chart */}
        <div className="h-48 bg-surface rounded-medical flex items-center justify-center text-text-secondary">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-sm">Wellness trends chart will be displayed here</p>
          </div>
        </div>
      </div>
      <div className="bg-background rounded-medical-lg shadow-medical p-6">
        <h2 className="text-xl font-semibold mb-4">Goals Progress</h2>
        {/* Placeholder for progress visualization */}
        <div className="h-48 bg-surface rounded-medical flex items-center justify-center text-text-secondary">
          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm">Goals progress visualization will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessTrends;
