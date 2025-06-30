import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import StartConversationCard from './components/StartConversationCard';
import RecentConversationsTimeline from './components/RecentConversationsTimeline';
import ConversationStatsPanel from './components/ConversationStatsPanel';
import SearchAndFilters from './components/SearchAndFilters';
import FloatingActionButton from './components/FloatingActionButton';
import QuickActionsBar from './components/QuickActionsBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const VoiceConversationDashboard = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    dateRange: 'all',
    topics: [],
    healthScore: 'all'
  });

  // Mock user data
  const userData = {
    name: 'Dr. Sarah Johnson',
    lastConversation: new Date(Date.now() - 86400000), // 1 day ago
    totalConversations: 47,
    healthScore: 86
  };

  useEffect(() => {
    // Simulate initial data loading
    document.title = 'Voice Conversation Dashboard - HealthVitals AI';
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // In real app, this would filter conversations
    console.log('Searching for:', query);
  };

  const handleFilter = (filters) => {
    setActiveFilters(filters);
    // In real app, this would apply filters to conversations
    console.log('Applying filters:', filters);
  };

  const handleEmergency = () => {
    // In real app, this would trigger emergency protocols
    alert('Emergency services would be contacted immediately');
  };

  const formatLastConversation = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Global Header */}
      <GlobalHeader onEmergency={handleEmergency} />

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
                  Welcome back, {userData.name.split(' ')[1]}
                </h1>
                <p className="text-text-secondary">
                  Last conversation: {formatLastConversation(userData.lastConversation)} • 
                  {userData.totalConversations} total conversations • 
                  Health score: {userData.healthScore}%
                </p>
              </div>
              
              <div className="hidden lg:flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName={isRefreshing ? "Loader2" : "RefreshCw"}
                  iconSize={16}
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className={isRefreshing ? "animate-spin" : ""}
                >
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Mic"
                  iconSize={16}
                  onClick={() => navigate('/active-voice-conversation')}
                >
                  Start Conversation
                </Button>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center space-x-3 mb-4">
              <Button
                variant="outline"
                size="sm"
                iconName={isRefreshing ? "Loader2" : "RefreshCw"}
                iconSize={16}
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`flex-1 ${isRefreshing ? "animate-spin" : ""}`}
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button
                variant="primary"
                size="sm"
                iconName="Mic"
                iconSize={16}
                onClick={() => navigate('/active-voice-conversation')}
                className="flex-1"
              >
                Start Conversation
              </Button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left Sidebar - Stats Panel */}
            <div className="lg:col-span-3">
              <div className="sticky top-24 space-y-6">
                <ConversationStatsPanel />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-6 space-y-6">
              <StartConversationCard />
              <QuickActionsBar />
              <SearchAndFilters onSearch={handleSearch} onFilter={handleFilter} />
              <RecentConversationsTimeline />
            </div>

            {/* Right Sidebar - Additional Info */}
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <div className="bg-background border border-border rounded-medical-lg shadow-medical p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Icon name="Brain" size={20} className="text-primary" />
                    <h3 className="font-heading font-semibold text-text-primary">
                      AI Health Tips
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/5 rounded-medical border border-primary/20">
                      <h4 className="text-sm font-medium text-primary mb-2">
                        Daily Reminder
                      </h4>
                      <p className="text-xs text-text-secondary">
                        Remember to check your blood pressure this evening. Your readings have been improving!
                      </p>
                    </div>
                    
                    <div className="p-4 bg-secondary/5 rounded-medical border border-secondary/20">
                      <h4 className="text-sm font-medium text-secondary mb-2">
                        Wellness Tip
                      </h4>
                      <p className="text-xs text-text-secondary">
                        Consider discussing your sleep patterns in your next conversation for better insights.
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/health-insights-analytics')}
                    iconName="ArrowRight"
                    iconSize={14}
                    className="w-full mt-4"
                  >
                    View All Insights
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            <StartConversationCard />
            <QuickActionsBar />
            <ConversationStatsPanel />
            <SearchAndFilters onSearch={handleSearch} onFilter={handleFilter} />
            <RecentConversationsTimeline />
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default VoiceConversationDashboard;