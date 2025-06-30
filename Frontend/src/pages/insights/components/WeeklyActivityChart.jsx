import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeeklyActivityChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="conversations" fill="#3B82F6" name="Conversations" />
        <Bar dataKey="duration" fill="#10B981" name="Duration (min)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklyActivityChart;
