import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const WeeklyActivity = () => {
  const weeklyData = [
    { day: 'Mon', steps: 8500, water: 7, sleep: 7.5, exercise: 30 },
    { day: 'Tue', steps: 9200, water: 8, sleep: 8, exercise: 45 },
    { day: 'Wed', steps: 7800, water: 6, sleep: 7, exercise: 25 },
    { day: 'Thu', steps: 10500, water: 9, sleep: 8.5, exercise: 60 },
    { day: 'Fri', steps: 9800, water: 8, sleep: 7.5, exercise: 35 },
    { day: 'Sat', steps: 12000, water: 10, sleep: 9, exercise: 90 },
    { day: 'Sun', steps: 8900, water: 7, sleep: 8, exercise: 40 }
  ];

  return (
    <div className="bg-background rounded-medical-lg shadow-medical p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="BarChart3" size={24} className="text-primary" />
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Weekly Activity
          </h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <select className="px-3 py-1 border border-border rounded-medical text-sm">
            <option>This Week</option>
            <option>Last Week</option>
            <option>Last 4 Weeks</option>
          </select>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="day" stroke="#64748B" />
            <YAxis stroke="#64748B" />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#FEFEFE',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Bar dataKey="steps" fill="#2563EB" name="Steps" radius={[2, 2, 0, 0]} />
            <Bar dataKey="exercise" fill="#059669" name="Exercise (min)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="text-center p-3 bg-surface-100 rounded-medical">
          <p className="text-sm text-text-secondary">Avg Steps</p>
          <p className="text-lg font-bold text-text-primary">9,386</p>
        </div>
        <div className="text-center p-3 bg-surface-100 rounded-medical">
          <p className="text-sm text-text-secondary">Avg Water</p>
          <p className="text-lg font-bold text-text-primary">7.9 glasses</p>
        </div>
        <div className="text-center p-3 bg-surface-100 rounded-medical">
          <p className="text-sm text-text-secondary">Avg Sleep</p>
          <p className="text-lg font-bold text-text-primary">7.9 hours</p>
        </div>
        <div className="text-center p-3 bg-surface-100 rounded-medical">
          <p className="text-sm text-text-secondary">Avg Exercise</p>
          <p className="text-lg font-bold text-text-primary">46 min</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyActivity;