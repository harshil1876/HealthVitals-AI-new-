import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationStatsPanel = () => {
  const navigate = useNavigate();

  const weeklyStats = {
    totalConversations: 12,
    totalDuration: "2h 45m",
    averageScore: 86,
    streak: 5
  };

  const topTopics = [
    { topic: "Vital Signs", count: 8, percentage: 67, color: "bg-primary" },
    { topic: "Symptoms", count: 5, percentage: 42, color: "bg-warning" },
    { topic: "Wellness", count: 4, percentage: 33, color: "bg-secondary" },
    { topic: "Medication", count: 3, percentage: 25, color: "bg-accent" }
  ];

  const healthInsights = [
    {
      id: 1,
      type: "trend",
      title: "Blood Pressure Improving",
      description: "Your readings show a positive trend over the past week",
      icon: "TrendingUp",
      color: "text-secondary"
    },
    {
      id: 2,
      type: "recommendation",
      title: "Sleep Pattern Analysis",
      description: "Consider discussing sleep quality in your next conversation",
      icon: "Moon",
      color: "text-primary"
    },
    {
      id: 3,
      type: "alert",
      title: "Medication Reminder",
      description: "It\'s been 3 days since your last medication review",
      icon: "Pill",
      color: "text-warning"
    }
  ];

  const StatCard = ({ title, value, subtitle, icon, color = "text-primary" }) => (
    <div className="bg-background border border-border rounded-medical p-4 shadow-medical-sm">
      <div className="flex items-center justify-between mb-2">
        <Icon name={icon} size={20} className={color} />
        <span className="text-xs text-text-muted">{subtitle}</span>
      </div>
      <div className="text-2xl font-heading font-semibold text-text-primary mb-1">
        {value}
      </div>
      <div className="text-sm text-text-secondary">{title}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Weekly Activity Stats */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Weekly Activity
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="Calendar"
            iconSize={16}
            onClick={() => navigate('/health-insights-analytics')}
          >
            View Details
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatCard
            title="Conversations"
            value={weeklyStats.totalConversations}
            subtitle="This week"
            icon="MessageCircle"
            color="text-primary"
          />
          <StatCard
            title="Total Time"
            value={weeklyStats.totalDuration}
            subtitle="Speaking"
            icon="Clock"
            color="text-secondary"
          />
          <StatCard
            title="Health Score"
            value={`${weeklyStats.averageScore}%`}
            subtitle="Average"
            icon="Heart"
            color="text-accent"
          />
          <StatCard
            title="Daily Streak"
            value={`${weeklyStats.streak} days`}
            subtitle="Current"
            icon="Flame"
            color="text-warning"
          />
        </div>
      </div>

      {/* Most Discussed Topics */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Most Discussed Topics
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="BarChart3"
            iconSize={16}
            onClick={() => navigate('/health-insights-analytics')}
          >
            Analytics
          </Button>
        </div>

        <div className="space-y-3">
          {topTopics.map((item, index) => (
            <div key={index} className="bg-background border border-border rounded-medical p-3 shadow-medical-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-primary">
                  {item.topic}
                </span>
                <span className="text-xs text-text-secondary">
                  {item.count} times
                </span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${item.color} transition-smooth`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Insights */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Health Insights
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="Brain"
            iconSize={16}
            onClick={() => navigate('/health-insights-analytics')}
          >
            AI Insights
          </Button>
        </div>

        <div className="space-y-3">
          {healthInsights.map((insight) => (
            <div
              key={insight.id}
              className="bg-background border border-border rounded-medical p-4 shadow-medical-sm transition-smooth hover:shadow-medical"
            >
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-surface rounded-medical">
                  <Icon name={insight.icon} size={16} className={insight.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-text-primary mb-1">
                    {insight.title}
                  </h3>
                  <p className="text-xs text-text-secondary line-clamp-2">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/health-insights-analytics')}
            iconName="ArrowRight"
            iconSize={14}
            className="w-full"
          >
            View All Insights
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationStatsPanel;