import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HealthInsights = () => {
  const insights = [
    {
      id: 1,
      title: 'Blood Pressure Trend',
      type: 'improvement',
      description: 'Your blood pressure has been consistently improving over the past 2 weeks. Keep up the good work!',
      recommendation: 'Continue with your current medication schedule and daily walks.',
      confidence: 92,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 2,
      title: 'Sleep Pattern Analysis',
      type: 'attention',
      description: 'Your sleep quality has decreased by 15% this week. Consider adjusting your bedtime routine.',
      recommendation: 'Try reducing screen time 1 hour before bed and maintain consistent sleep schedule.',
      confidence: 87,
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 3,
      title: 'Hydration Insight',
      type: 'suggestion',
      description: 'You are meeting 75% of your daily water intake goal. Slight improvement needed.',
      recommendation: 'Set hourly reminders to drink water throughout the day.',
      confidence: 78,
      icon: 'Droplets',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  const aiTips = [
    {
      id: 1,
      category: 'Nutrition',
      tip: 'Based on your recent conversations, consider adding more leafy greens to your diet for better iron absorption.',
      icon: 'Apple'
    },
    {
      id: 2,
      category: 'Exercise',
      tip: 'Your step count is excellent! Try adding 10 minutes of strength training twice a week.',
      icon: 'Dumbbell'
    },
    {
      id: 3,
      category: 'Mental Health',
      tip: 'Your stress levels seem elevated. Consider trying 5-minute breathing exercises daily.',
      icon: 'Brain'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Health Insights */}
      <div className="bg-background rounded-medical-lg shadow-medical p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Brain" size={24} className="text-primary" />
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Health Insights
            </h2>
          </div>
          <Button variant="outline" size="sm" iconName="RefreshCw" iconSize={16}>
            Refresh
          </Button>
        </div>

        <div className="space-y-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-medical border transition-smooth hover:shadow-medical-sm ${insight.bgColor} border-border`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-medical ${insight.bgColor}`}>
                  <Icon name={insight.icon} size={20} className={insight.color} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-text-primary">
                      {insight.title}
                    </h3>
                    <span className="text-xs text-text-secondary">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-3">
                    {insight.description}
                  </p>
                  
                  <div className="bg-surface-100 p-3 rounded-medical">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name="Lightbulb" size={14} className="text-primary" />
                      <span className="text-xs font-medium text-primary">
                        AI Recommendation
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary">
                      {insight.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Health Tips */}
      <div className="bg-background rounded-medical-lg shadow-medical p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Sparkles" size={24} className="text-primary" />
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            AI Health Tips
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiTips.map((tip) => (
            <div
              key={tip.id}
              className="p-4 rounded-medical border border-border hover:shadow-medical-sm transition-smooth bg-gradient-to-br from-primary/5 to-secondary/5"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-medical">
                  <Icon name={tip.icon} size={18} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">
                  {tip.category}
                </span>
              </div>
              
              <p className="text-sm text-text-secondary">
                {tip.tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthInsights;