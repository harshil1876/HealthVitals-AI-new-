import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserRegistrationLogin from "pages/user-registration-login";
import ActiveVoiceConversation from "pages/active-voice-conversation";
import HealthInsightsAnalytics from "pages/health-insights-analytics";
import ConversationHistoryTranscripts from "pages/conversation-history-transcripts";
import SettingsPreferences from "pages/settings-preferences";
import HomeDashboard from "pages/home-dashboard";
import MainDashboard from "pages/main-dashboard";
import VoiceChatInterface from "pages/voice-chat-interface";
import NotFound from "pages/NotFound";
import Goals from "pages/goals";
import Reports from "pages/reports";
import Notifications from "pages/notifications";
import Profile from "pages/profile";
import Insights from "pages/insights";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
        <Route path="/active-voice-conversation" element={<ActiveVoiceConversation />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/health-insights-analytics" element={<HealthInsightsAnalytics />} />
        <Route path="/conversation-history-transcripts" element={<ConversationHistoryTranscripts />} />
        <Route path="/settings-preferences" element={<SettingsPreferences />} />
        <Route path="/voice-chat-interface" element={<VoiceChatInterface />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/analytics" element={<HealthInsightsAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
