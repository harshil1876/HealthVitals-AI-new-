import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const MostDiscussedTopics = () => {
  const topicsData = [
    { name: 'Blood Pressure', value: 25, color: '#2563EB', icon: 'Heart' },
    { name: 'Medication', value: 20, color: '#059669', icon: 'Pill' },
    { name: 'Sleep', value: 18, color: '#7C3AED', icon: 'Moon' },
    { name: 'Exercise', value: 15, color: '#F59E0B', icon: 'Dumbbell' },
    { name: 'Nutrition', value: 12, color: '#EF4444', icon: 'Apple' },
    { name: 'Stress', value: 10, color: '#8B5CF6', icon: 'Brain' }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-background rounded-medical-lg shadow-medical p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="PieChart" size={24} className="text-primary" />
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Most Discussed Topics
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topicsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {topicsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FEFEFE',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Topics List */}
        <div className="space-y-3">
          {topicsData.map((topic, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-medical border border-border hover:shadow-medical-sm transition-smooth"
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="p-2 rounded-medical"
                  style={{ backgroundColor: `${topic.color}20` }}
                >
                  <Icon 
                    name={topic.icon} 
                    size={18} 
                    style={{ color: topic.color }}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">
                    {topic.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {topic.value}% of conversations
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-surface-200 rounded-medical h-2">
                  <div
                    className="h-2 rounded-medical transition-all duration-500"
                    style={{ 
                      width: `${topic.value * 4}%`, 
                      backgroundColor: topic.color 
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-text-primary">
                  {topic.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-text-primary">47</p>
          <p className="text-sm text-text-secondary">Total Conversations</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-text-primary">8.5</p>
          <p className="text-sm text-text-secondary">Avg Duration (min)</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-text-primary">96%</p>
          <p className="text-sm text-text-secondary">Resolution Rate</p>
        </div>
      </div>
    </div>
  );
};

export default MostDiscussedTopics;