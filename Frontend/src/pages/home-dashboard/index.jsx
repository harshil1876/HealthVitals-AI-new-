import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalHeader from "../../components/ui/GlobalHeader";
import Sidebar from "../../components/ui/Sidebar";
import WelcomeSection from "./components/WelcomeSection";
import RecentInsights from "./components/RecentInsights";
import ActiveGoals from "./components/ActiveGoals";
import QuickActions from "./components/QuickActions";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const HomeDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Mock user data
  const userData = {
    name: "Pratham Wadhwani",
    email: "sarah.j@example.com",
    healthScore: 86,
    streak: 12,
  };

  useEffect(() => {
    document.title = "Home Dashboard - HealthVitals AI";

    // Mock notifications
    setNotifications([
      { id: 1, type: "reminder", message: "Time for your evening medication" },
      {
        id: 2,
        type: "achievement",
        message: "You reached your daily step goal!",
      },
      { id: 3, type: "insight", message: "New health insight available" },
    ]);
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEmergency = () => {
    alert("Emergency services would be contacted immediately");
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Global Header */}
      <GlobalHeader onEmergency={handleEmergency} />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={handleToggleSidebar} />

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <WelcomeSection userName={userData.name.split(" ")[0]} />
          </div>

          {/* Today's Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-background rounded-medical-lg shadow-medical p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Calendar" size={20} className="text-primary" />
                <span className="text-sm font-medium text-text-secondary">
                  Today's Summary
                </span>
              </div>
              <p className="text-2xl font-bold text-text-primary">
                8 activities
              </p>
              <p className="text-sm text-success">+2 from yesterday</p>
            </div>

            <div className="bg-background rounded-medical-lg shadow-medical p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Clock" size={20} className="text-secondary" />
                <span className="text-sm font-medium text-text-secondary">
                  Next Reminder
                </span>
              </div>
              <p className="text-2xl font-bold text-text-primary">2:30 PM</p>
              <p className="text-sm text-text-secondary">Medication time</p>
            </div>

            <div className="bg-background rounded-medical-lg shadow-medical p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="TrendingUp" size={20} className="text-accent" />
                <span className="text-sm font-medium text-text-secondary">
                  Health Score
                </span>
              </div>
              <p className="text-2xl font-bold text-text-primary">
                {userData.healthScore}%
              </p>
              <p className="text-sm text-success">Excellent</p>
            </div>

            <div className="bg-background rounded-medical-lg shadow-medical p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Award" size={20} className="text-warning" />
                <span className="text-sm font-medium text-text-secondary">
                  Current Streak
                </span>
              </div>
              <p className="text-2xl font-bold text-text-primary">
                {userData.streak} days
              </p>
              <p className="text-sm text-success">Keep it up!</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <RecentInsights />
              <ActiveGoals />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <QuickActions />

              {/* Upcoming Reminders */}
              <div className="bg-background rounded-medical-lg shadow-medical p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="Bell" size={20} className="text-primary" />
                  <h3 className="font-heading font-semibold text-text-primary">
                    Upcoming Reminders
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-surface-100 rounded-medical">
                    <Icon name="Pill" size={16} className="text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">
                        Evening Medication
                      </p>
                      <p className="text-xs text-text-secondary">2:30 PM</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-surface-100 rounded-medical">
                    <Icon
                      name="Droplets"
                      size={16}
                      className="text-secondary"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">
                        Water Reminder
                      </p>
                      <p className="text-xs text-text-secondary">3:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-surface-100 rounded-medical">
                    <Icon name="Moon" size={16} className="text-accent" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">
                        Bedtime Routine
                      </p>
                      <p className="text-xs text-text-secondary">9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Motivational Quote */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-medical-lg p-6 border border-primary/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="Quote" size={20} className="text-primary" />
                  <h3 className="font-heading font-semibold text-text-primary">
                    Daily Motivation
                  </h3>
                </div>

                <blockquote className="text-text-primary italic mb-4">
                  "The groundwork for all happiness is good health."
                </blockquote>

                <p className="text-sm text-text-secondary">- Leigh Hunt</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Professional Footer */}
      <footer
        className={`bg-background border-t border-border mt-16 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
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
                Your personal AI health assistant for better wellness
                management.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-text-primary mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>
                  <a href="#" className="hover:text-primary">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Voice Chat
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Reports
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-text-primary mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>
                  <a href="#" className="hover:text-primary">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Terms of Service
                  </a>
                </li>
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

export default HomeDashboard;
