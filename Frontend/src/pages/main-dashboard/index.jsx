import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import Sidebar from '../../components/ui/Sidebar';
import TrackingActivity from './components/TrackingActivity';
import WeeklyActivity from './components/WeeklyActivity';
import MostDiscussedTopics from './components/MostDiscussedTopics';
import HealthInsights from './components/HealthInsights';
import RecentConversationsTimeline from '../voice-conversation-dashboard/components/RecentConversationsTimeline';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MainDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    document.title = 'Main Dashboard - HealthVitals AI';
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEmergency = () => {
    alert('Emergency services would be contacted immediately');
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Global Header */}
      <GlobalHeader onEmergency={handleEmergency} />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={handleToggleSidebar} />

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
                Health Analytics Dashboard
              </h1>
              <p className="text-text-secondary">
                Comprehensive view of your health data and insights
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
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
                iconName="Download"
                iconSize={16}
                onClick={() => navigate('/reports')}
              >
                Export Data
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-background rounded-medical-lg shadow-medical p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Activity" size={20} className="text-primary" />
                <span className="text-sm font-medium text-text-secondary">Health Score</span>
              </div>
              <p className="text-3xl font-bold text-text-primary">86%</p>
              <p className="text-sm text-success">+5% from last week</p>
            </div>

            <div className="bg-background rounded-medical-lg shadow-medical p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="MessageCircle" size={20} className="text-secondary" />
                <span className="text-sm font-medium text-text-secondary">Conversations</span>
              </div>
              <p className="text-3xl font-bold text-text-primary">47</p>
              <p className="text-sm text-success">+12 this month</p>
            </div>

            <div className="bg-background rounded-medical-lg shadow-medical p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="TrendingUp" size={20} className="text-accent" />
                <span className="text-sm font-medium text-text-secondary">Improvement</span>
              </div>
              <p className="text-3xl font-bold text-text-primary">92%</p>
              <p className="text-sm text-success">Goals on track</p>
            </div>

            <div className="bg-background rounded-medical-lg shadow-medical p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Calendar" size={20} className="text-warning" />
                <span className="text-sm font-medium text-text-secondary">Streak</span>
              </div>
              <p className="text-3xl font-bold text-text-primary">12</p>
              <p className="text-sm text-success">Days active</p>
            </div>
          </div>

          {/* Activity Tracking */}
          <div className="mb-8">
            <TrackingActivity />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <WeeklyActivity />
            <MostDiscussedTopics />
          </div>

          {/* Health Insights */}
          <div className="mb-8">
            <HealthInsights />
          </div>

          {/* Recent Conversations */}
          <div className="mb-8">
            <RecentConversationsTimeline />
          </div>

          {/* Additional Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Medication Tracker */}
            <div className="bg-background rounded-medical-lg shadow-medical p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Pill" size={20} className="text-primary" />
                <h3 className="font-heading font-semibold text-text-primary">
                  Medication Tracker
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-surface-100 rounded-medical">
                  <div>
                    <p className="font-medium text-text-primary">Lisinopril</p>
                    <p className="text-sm text-text-secondary">10mg, Daily</p>
                  </div>
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-surface-100 rounded-medical">
                  <div>
                    <p className="font-medium text-text-primary">Metformin</p>
                    <p className="text-sm text-text-secondary">500mg, Twice daily</p>
                  </div>
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Vital Signs */}
            <div className="bg-background rounded-medical-lg shadow-medical p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Heart" size={20} className="text-secondary" />
                <h3 className="font-heading font-semibold text-text-primary">
                  Latest Vitals
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Blood Pressure</span>
                  <span className="font-medium text-text-primary">120/80</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Heart Rate</span>
                  <span className="font-medium text-text-primary">72 bpm</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Temperature</span>
                  <span className="font-medium text-text-primary">98.6°F</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Weight</span>
                  <span className="font-medium text-text-primary">165 lbs</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-background rounded-medical-lg shadow-medical p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Zap" size={20} className="text-accent" />
                <h3 className="font-heading font-semibold text-text-primary">
                  Quick Actions
                </h3>
              </div>
              
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Mic"
                  iconSize={16}
                  onClick={() => navigate('/active-voice-conversation')}
                  className="w-full justify-start"
                >
                  Start Voice Chat
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  iconSize={16}
                  onClick={() => navigate('/log-vitals')}
                  className="w-full justify-start"
                >
                  Log Vitals
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="FileText"
                  iconSize={16}
                  onClick={() => navigate('/reports')}
                  className="w-full justify-start"
                >
                  View Reports
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Professional Footer */}
      <footer className={`bg-background border-t border-border mt-16 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Activity" size={24} className="text-primary" />
                <span className="text-lg font-heading font-semibold text-text-primary">
                  HealthVitals AI
                </span>
              </div>
              <p className="text-sm text-text-secondary">
                Your personal AI health assistant for better wellness management.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-text-primary mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-primary">Dashboard</a></li>
                <li><a href="#" className="hover:text-primary">Voice Chat</a></li>
                <li><a href="#" className="hover:text-primary">Analytics</a></li>
                <li><a href="#" className="hover:text-primary">Reports</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-text-primary mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-text-primary mb-3">Emergency</h4>
              <Button
                variant="danger"
                size="sm"
                iconName="Phone"
                iconSize={16}
                onClick={handleEmergency}
                className="w-full"
              >
                Emergency Services
              </Button>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-6 text-center text-sm text-text-secondary">
            <p>&copy; 2024 HealthVitals AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainDashboard;