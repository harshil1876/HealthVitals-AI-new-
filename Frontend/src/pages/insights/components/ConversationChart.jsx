import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ConversationChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="conversations"
          stroke="#3B82F6"
          name="Conversations"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="duration"
          stroke="#10B981"
          name="Duration (min)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ConversationChart;
