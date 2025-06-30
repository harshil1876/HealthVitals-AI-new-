import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentConversationsTimeline = () => {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState(null);

  const recentConversations = [
    {
      id: 1,
      date: new Date(Date.now() - 86400000), // 1 day ago
      duration: "8:45",
      summary: "Discussed morning vital signs including blood pressure readings and heart rate patterns. AI provided recommendations for stress management.",
      topics: ["Vital Signs", "Blood Pressure", "Stress Management"],
      healthScore: 85,
      transcriptPreview: "Good morning, I\'d like to check my blood pressure readings from this week...",
      audioUrl: "/audio/conversation-1.mp3"
    },
    {
      id: 2,
      date: new Date(Date.now() - 172800000), // 2 days ago
      duration: "12:30",
      summary: "Reported mild headache symptoms and discussed potential triggers. AI suggested hydration tracking and sleep pattern analysis.",
      topics: ["Symptoms", "Headache", "Sleep Patterns"],
      healthScore: 78,
      transcriptPreview: "I\'ve been experiencing some headaches lately, especially in the afternoon...",
      audioUrl: "/audio/conversation-2.mp3"
    },
    {
      id: 3,
      date: new Date(Date.now() - 259200000), // 3 days ago
      duration: "6:15",
      summary: "Weekly wellness check-in covering exercise routine, nutrition habits, and overall energy levels.",
      topics: ["General Wellness", "Exercise", "Nutrition"],
      healthScore: 92,
      transcriptPreview: "Let's do my weekly wellness check. I've been feeling pretty good overall...",
      audioUrl: "/audio/conversation-3.mp3"
    },
    {
      id: 4,
      date: new Date(Date.now() - 432000000), // 5 days ago
      duration: "15:20",
      summary: "Medication review session discussing current prescriptions, side effects, and adherence patterns.",
      topics: ["Medication", "Side Effects", "Adherence"],
      healthScore: 88,
      transcriptPreview: "I want to review my current medications and discuss some concerns...",
      audioUrl: "/audio/conversation-4.mp3"
    }
  ];

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getHealthScoreColor = (score) => {
    if (score >= 90) return 'text-secondary';
    if (score >= 80) return 'text-primary';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const handlePlayConversation = (conversationId) => {
    // In real app, this would play the audio
    console.log(`Playing conversation ${conversationId}`);
  };

  const handleViewTranscript = (conversationId) => {
    navigate(`/conversation-history-transcripts?id=${conversationId}`);
  };

  const handleShareConversation = (conversationId) => {
    // In real app, this would handle sharing
    console.log(`Sharing conversation ${conversationId}`);
  };

  const toggleExpanded = (conversationId) => {
    setExpandedCard(expandedCard === conversationId ? null : conversationId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-heading font-semibold text-text-primary">
          Recent Conversations
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="ArrowRight"
          iconSize={16}
          onClick={() => navigate('/conversation-history-transcripts')}
        >
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {recentConversations.map((conversation, index) => (
          <div
            key={conversation.id}
            className="bg-background border border-border rounded-medical-lg shadow-medical transition-smooth hover:shadow-medical-md"
          >
            {/* Main Card Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-medical">
                    <Icon name="MessageCircle" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {formatDate(conversation.date)}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Duration: {conversation.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`text-sm font-medium ${getHealthScoreColor(conversation.healthScore)}`}>
                    {conversation.healthScore}%
                  </div>
                  <button
                    onClick={() => toggleExpanded(conversation.id)}
                    className="p-1 rounded-medical transition-smooth focus-medical hover:bg-surface-100"
                  >
                    <Icon 
                      name={expandedCard === conversation.id ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                      className="text-text-secondary"
                    />
                  </button>
                </div>
              </div>

              <p className="text-sm text-text-primary mb-3 line-clamp-2">
                {conversation.summary}
              </p>

              {/* Topics */}
              <div className="flex flex-wrap gap-2 mb-3">
                {conversation.topics.map((topic, topicIndex) => (
                  <span
                    key={topicIndex}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-medical"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="xs"
                  iconName="Play"
                  iconSize={14}
                  onClick={() => handlePlayConversation(conversation.id)}
                >
                  Play
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="FileText"
                  iconSize={14}
                  onClick={() => handleViewTranscript(conversation.id)}
                >
                  Transcript
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Share"
                  iconSize={14}
                  onClick={() => handleShareConversation(conversation.id)}
                >
                  Share
                </Button>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedCard === conversation.id && (
              <div className="px-4 pb-4 border-t border-border/50 pt-4 animate-slide-in">
                <h4 className="text-sm font-medium text-text-primary mb-2">
                  Transcript Preview
                </h4>
                <div className="bg-surface p-3 rounded-medical border border-border">
                  <p className="text-sm text-text-secondary italic">
                    "{conversation.transcriptPreview}"
                  </p>
                </div>
                <div className="flex justify-end mt-3">
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="ExternalLink"
                    iconSize={14}
                    onClick={() => handleViewTranscript(conversation.id)}
                  >
                    View Full Transcript
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-4">
        <Button
          variant="outline"
          onClick={() => navigate('/conversation-history-transcripts')}
          iconName="MoreHorizontal"
          iconSize={16}
        >
          Load More Conversations
        </Button>
      </div>
    </div>
  );
};

export default RecentConversationsTimeline;