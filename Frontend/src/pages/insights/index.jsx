import React, { useState } from 'react';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import InsightsTabs from './components/InsightsTabs';
import ConversationChart from './components/ConversationChart';
import WeeklyActivityChart from './components/WeeklyActivityChart';
import Icon from '../../components/AppIcon';

const Insights = () => {
  const [activeTab, setActiveTab] = useState('trends');

  // Dummy data for health metrics overview
  const healthMetrics = [
    {
      id: 1,
      title: 'Heart Rate',
      subtitle: 'Average BPM',
      value: '72 bpm',
      change: '-2%',
      lastUpdated: '2 hours ago',
      notes: ['Consistent with healthy range', 'No irregular patterns detected'],
      color: 'text-red-500',
      icon: 'Heart'
    },
    {
      id: 2,
      title: 'Blood Pressure',
      subtitle: 'Systolic/Diastolic',
      value: '118/76 mmHg',
      change: '-3%',
      lastUpdated: '1 day ago',
      notes: ['Improvement noted', 'Within optimal range'],
      color: 'text-red-500',
      icon: 'Activity'
    },
    {
      id: 3,
      title: 'Sleep Quality',
      subtitle: 'Average Score',
      value: '8.2 /10',
      change: '+12%',
      lastUpdated: 'This morning',
      notes: ['Sleep duration improved', 'Consistent bedtime routine'],
      color: 'text-green-500',
      icon: 'Moon'
    },
    {
      id: 4,
      title: 'Stress Level',
      subtitle: 'Daily Average',
      value: '3.1 /10',
      change: '-18%',
      lastUpdated: '6 hours ago',
      notes: ['Stress management techniques working', 'Meditation sessions helpful'],
      color: 'text-red-500',
      icon: 'AlertCircle'
    }
  ];

  // Dummy data for conversation patterns chart
  const conversationPatterns = {
    dates: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 29', 'Feb 5', 'Feb 12'],
    conversations: [5, 7, 6, 9, 8, 10, 7],
    duration: [16, 24, 18, 28, 26, 32, 20]
  };

  // Dummy data for weekly activity and health score trend
  const weeklyActivity = {
    weeks: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 29', 'Feb 5', 'Feb 12'],
    conversations: [5, 7, 6, 9, 8, 10, 7],
    duration: [16, 24, 18, 28, 26, 32, 20]
  };

  const healthScoreTrend = {
    score: 8.4,
    change: '+0.8 this month'
  };

  // Dummy data for recommendations
  const recommendations = [
    {
      id: 1,
      title: 'Consider Sleep Schedule Adjustment',
      priority: 'medium',
      description: 'Your conversations indicate irregular sleep patterns affecting energy levels.',
      conversations: 7,
      daysAgo: 2
    },
    {
      id: 2,
      title: 'Medication Adherence Reminder',
      priority: 'high',
      description: 'Potential gaps in medication routine detected from conversation patterns.',
      conversations: 5,
      daysAgo: 1
    },
    {
      id: 3,
      title: 'Positive Stress Management Progress',
      priority: 'low',
      description: 'Your stress management techniques are showing excellent results.',
      conversations: 12,
      daysAgo: 3
    }
  ];

  // Dummy data for conversation topics
  const topics = [
    {
      id: 1,
      title: 'Sleep & Rest',
      priority: 'High',
      conversations: 15,
      avgDuration: '8 min',
      lastDiscussed: '2 hours ago',
      insights: ['Sleep quality improving consistently', 'Bedtime routine becoming more regular'],
      trend: '+23%'
    },
    {
      id: 2,
      title: 'Medication Management',
      priority: 'Medium',
      conversations: 8,
      avgDuration: '12 min',
      lastDiscussed: '1 day ago',
      insights: ['Good understanding of medication effects', 'Occasional adherence challenges'],
      trend: '-5%'
    },
    {
      id: 3,
      title: 'Physical Activity',
      priority: 'Medium',
      conversations: 10,
      avgDuration: '6 min',
      lastDiscussed: '3 days ago',
      insights: ['Exercise routine becoming consistent', 'Enjoying morning walks'],
      trend: '+15%'
    },
    {
      id: 4,
      title: 'Nutrition & Diet',
      priority: 'Low',
      conversations: 5,
      avgDuration: '4 min',
      lastDiscussed: '1 week ago',
      insights: ['Healthy eating habits established', 'Portion control improved'],
      trend: '-10%'
    },
    {
      id: 5,
      title: 'Stress & Mental Health',
      priority: 'Medium',
      conversations: 12,
      avgDuration: '10 min',
      lastDiscussed: '6 hours ago',
      insights: ['Stress management techniques effective', 'Work-life balance improving'],
      trend: '-18%'
    },
    {
      id: 6,
      title: 'Vital Signs Monitoring',
      priority: 'High',
      conversations: 18,
      avgDuration: '5 min',
      lastDiscussed: '4 hours ago',
      insights: ['Regular monitoring established', 'Values within healthy ranges'],
      trend: '+3%'
    }
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <GlobalHeader />
      <PrimaryTabNavigation />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Health Insights</h1>
            <p className="text-text-secondary mt-2">AI-powered analysis of your health conversations and personalized recommendations</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-border rounded-medical text-text-secondary hover:bg-surface-100 transition-colors flex items-center space-x-2">
              <Icon name="History" size={16} />
              <span>View History</span>
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-medical hover:bg-primary/90 transition-colors flex items-center space-x-2">
              <Icon name="Download" size={16} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        <InsightsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'trends' && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Health Metrics Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {healthMetrics.map(metric => (
                <div key={metric.id} className="p-4 border rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name={metric.icon} size={20} className="text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">{metric.title}</p>
                        <p className="text-xs text-gray-400">{metric.subtitle}</p>
                      </div>
                    </div>
                    <p className={`text-sm font-semibold ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </p>
                  </div>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-gray-400 mb-2">Last updated: {metric.lastUpdated}</p>
                  <ul className="text-xs text-gray-500 list-disc list-inside">
                    {metric.notes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold mb-4">Conversation Patterns</h2>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <ConversationChart data={conversationPatterns.dates.map((date, index) => ({
                date,
                conversations: conversationPatterns.conversations[index],
                duration: conversationPatterns.duration[index]
              }))} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Weekly Activity</h3>
                <WeeklyActivityChart data={weeklyActivity.weeks.map((date, index) => ({
                  date,
                  conversations: weeklyActivity.conversations[index],
                  duration: weeklyActivity.duration[index]
                }))} />
              </div>
              <div className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Health Score Trend</h3>
                <p className="text-4xl font-bold text-green-600">{healthScoreTrend.score}</p>
                <p className="text-green-600">{healthScoreTrend.change}</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'recommendations' && (
          <section>
            <h2 className="text-xl font-semibold mb-4">AI-Powered Recommendations</h2>
            <div className="space-y-4">
              {recommendations.map(rec => (
                <div key={rec.id} className={`p-4 border rounded-lg shadow-sm ${rec.priority === 'high' ? 'border-red-400' : rec.priority === 'medium' ? 'border-yellow-400' : 'border-green-400'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold">{rec.title}</p>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${rec.priority === 'high' ? 'bg-red-400 text-white' : rec.priority === 'medium' ? 'bg-yellow-400 text-white' : 'bg-green-400 text-white'}`}>
                      {rec.priority} priority
                    </span>
                  </div>
                  <p className="mb-2">{rec.description}</p>
                  <p className="text-xs text-gray-500">Based on {rec.conversations} conversations • {rec.daysAgo} days ago</p>
                  <button className="btn btn-primary btn-sm">Take Action</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'vitalsigns' && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Vital Signs Tracking</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {healthMetrics.map(metric => (
                <div key={metric.id} className="p-4 border rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name={metric.icon} size={20} className="text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">{metric.title}</p>
                        <p className="text-xs text-gray-400">{metric.subtitle}</p>
                      </div>
                    </div>
                    <p className={`text-sm font-semibold ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </p>
                  </div>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-gray-400 mb-2">Last updated: {metric.lastUpdated}</p>
                  <ul className="text-xs text-gray-500 list-disc list-inside">
                    {metric.notes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h3 className="font-semibold mb-2">Recent Measurements</h3>
              <table className="w-full text-left border-collapse border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2">Date</th>
                    <th className="border border-gray-200 px-4 py-2">Heart Rate</th>
                    <th className="border border-gray-200 px-4 py-2">Blood Pressure</th>
                    <th className="border border-gray-200 px-4 py-2">Source</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">Feb 12, 2024</td>
                    <td className="border border-gray-200 px-4 py-2">74 bpm</td>
                    <td className="border border-gray-200 px-4 py-2">120/78</td>
                    <td className="border border-gray-200 px-4 py-2">Voice conversation</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">Feb 10, 2024</td>
                    <td className="border border-gray-200 px-4 py-2">71 bpm</td>
                    <td className="border border-gray-200 px-4 py-2">118/76</td>
                    <td className="border border-gray-200 px-4 py-2">Voice conversation</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">Feb 8, 2024</td>
                    <td className="border border-gray-200 px-4 py-2">73 bpm</td>
                    <td className="border border-gray-200 px-4 py-2">122/80</td>
                    <td className="border border-gray-200 px-4 py-2">Manual entry</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">Feb 5, 2024</td>
                    <td className="border border-gray-200 px-4 py-2">70 bpm</td>
                    <td className="border border-gray-200 px-4 py-2">116/74</td>
                    <td className="border border-gray-200 px-4 py-2">Voice conversation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'topics' && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Conversation Topic Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topics.map(topic => (
                <div key={topic.id} className="p-4 rounded-lg shadow-sm" style={{backgroundColor: topic.priority === 'High' ? '#E0D7FF' : topic.priority === 'Medium' ? '#D6F0E4' : '#FFF3D6'}}>
                  <h3 className="font-semibold mb-2">{topic.title}</h3>
                  <p className="text-sm mb-1">Conversations: {topic.conversations}</p>
                  <p className="text-sm mb-1">Avg Duration: {topic.avgDuration}</p>
                  <p className="text-sm mb-1">Last Discussed: {topic.lastDiscussed}</p>
                  <ul className="text-xs list-disc list-inside mb-2">
                    {topic.insights.map((insight, idx) => (
                      <li key={idx}>{insight}</li>
                    ))}
                  </ul>
                  <p className="text-xs">Trend: {topic.trend}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm font-semibold">Topic Insights Summary</p>
              <div className="flex justify-between mt-2">
                <span>6 Active Topics</span>
                <span>68 Total Conversations</span>
                <span>8.5 Avg Minutes/Topic</span>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border mt-auto">
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

export default Insights;
