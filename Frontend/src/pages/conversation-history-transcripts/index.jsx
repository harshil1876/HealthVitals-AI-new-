import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import ConversationCard from './components/ConversationCard';
import SearchAndFilters from './components/SearchAndFilters';
import TranscriptModal from './components/TranscriptModal';
import BulkActions from './components/BulkActions';
import EmptyState from './components/EmptyState';

const ConversationHistoryTranscripts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversations, setSelectedConversations] = useState([]);
  const [selectedTranscript, setSelectedTranscript] = useState(null);
  const [isTranscriptModalOpen, setIsTranscriptModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    dateRange: { start: '', end: '' },
    durations: [],
    hasHealthData: false
  });

  // Mock conversation data
  const mockConversations = [
    {
      id: 'conv-001',
      title: 'Morning Health Check',
      date: '2024-01-15T08:30:00Z',
      duration: 420,
      messageCount: 12,
      summary: `Discussed morning vital signs including blood pressure (120/80), heart rate (72 bpm), and overall energy levels. AI provided recommendations for maintaining healthy morning routines.`,
      healthCategories: [
        { type: 'vital-signs', label: 'Vital Signs' },
        { type: 'general', label: 'General Health' }
      ],
      keyHealthData: [
        { icon: 'Heart', label: 'Blood Pressure', value: '120/80 mmHg' },
        { icon: 'Activity', label: 'Heart Rate', value: '72 bpm' },
        { icon: 'Thermometer', label: 'Temperature', value: '98.6°F' }
      ],
      transcriptPreview: `User: Good morning, I'd like to check in about my health today. My blood pressure reading this morning was 120 over 80, and my heart rate was around 72 beats per minute.\n\nAI: Good morning! Those are excellent readings. Your blood pressure of 120/80 mmHg is considered optimal, and a resting heart rate of 72 bpm is well within the normal range...`,
      transcript: [
        {
          timestamp: 0,
          speaker: 'user',text: `Good morning, I'd like to check in about my health today. My blood pressure reading this morning was 120 over 80, and my heart rate was around 72 beats per minute.`,
          healthData: [
            { icon: 'Heart', label: 'Blood Pressure', value: '120/80 mmHg' },
            { icon: 'Activity', label: 'Heart Rate', value: '72 bpm' }
          ]
        },
        {
          timestamp: 15,
          speaker: 'ai',
          text: `Good morning! Those are excellent readings. Your blood pressure of 120/80 mmHg is considered optimal, and a resting heart rate of 72 bpm is well within the normal range for adults. How are you feeling overall today?`
        },
        {
          timestamp: 35,
          speaker: 'user',
          text: `I'm feeling pretty good, though I had a bit of trouble sleeping last night. I probably got about 5 hours of sleep instead of my usual 7-8 hours.`
        },
        {
          timestamp: 50,
          speaker: 'ai',
          text: `I understand that sleep disruption can affect how you feel. Despite the shorter sleep, your vital signs this morning are still very good, which suggests your body is managing well. What might have contributed to the sleep difficulty?`
        }
      ],
      hasImportantData: true
    },
    {
      id: 'conv-002',title: 'Medication Review Discussion',date: '2024-01-12T14:15:00Z',
      duration: 680,
      messageCount: 18,
      summary: `Comprehensive review of current medications including dosage timing, side effects, and interactions. Discussed adherence strategies and upcoming pharmacy refills.`,
      healthCategories: [
        { type: 'medication', label: 'Medication' },
        { type: 'general', label: 'General Health' }
      ],
      keyHealthData: [
        { icon: 'Pill', label: 'Medications', value: '3 active prescriptions' },
        { icon: 'Clock', label: 'Adherence', value: '95% compliance' }
      ],
      transcriptPreview: `User: I wanted to review my current medications with you. I'm taking Lisinopril 10mg once daily for blood pressure, Metformin 500mg twice daily for diabetes, and a daily multivitamin.\n\nAI: Thank you for providing that information. Let's review each medication. Lisinopril is an ACE inhibitor that's very effective for blood pressure management...`,
      transcript: [
        {
          timestamp: 0,
          speaker: 'user',
          text: `I wanted to review my current medications with you. I'm taking Lisinopril 10mg once daily for blood pressure, Metformin 500mg twice daily for diabetes, and a daily multivitamin.`,
          healthData: [
            { icon: 'Pill', label: 'Lisinopril', value: '10mg daily' },
            { icon: 'Pill', label: 'Metformin', value: '500mg twice daily' }
          ]
        },
        {
          timestamp: 20,
          speaker: 'ai',
          text: `Thank you for providing that information. Let's review each medication. Lisinopril is an ACE inhibitor that's very effective for blood pressure management. How long have you been taking this dose?`
        }
      ],
      hasImportantData: true
    },
    {
      id: 'conv-003',title: 'Stress and Mental Health Check',date: '2024-01-10T19:45:00Z',
      duration: 520,
      messageCount: 15,
      summary: `Discussed recent stress levels, work-life balance, and coping strategies. Explored mindfulness techniques and sleep hygiene practices for better mental wellness.`,
      healthCategories: [
        { type: 'mental-health', label: 'Mental Health' },
        { type: 'general', label: 'General Health' }
      ],
      keyHealthData: [
        { icon: 'Brain', label: 'Stress Level', value: 'Moderate (6/10)' },
        { icon: 'Moon', label: 'Sleep Quality', value: 'Fair' }
      ],
      transcriptPreview: `User: I've been feeling more stressed than usual lately, especially with work deadlines. I'd rate my stress level around a 6 out of 10. It's affecting my sleep quality too.\n\nAI: I appreciate you sharing that with me. A stress level of 6/10 is definitely something we should address, especially since it's impacting your sleep...`,
      transcript: [
        {
          timestamp: 0,
          speaker: 'user',text: `I've been feeling more stressed than usual lately, especially with work deadlines. I'd rate my stress level around a 6 out of 10. It's affecting my sleep quality too.`,
          healthData: [
            { icon: 'Brain', label: 'Stress Level', value: '6/10' }
          ]
        },
        {
          timestamp: 18,
          speaker: 'ai',
          text: `I appreciate you sharing that with me. A stress level of 6/10 is definitely something we should address, especially since it's impacting your sleep. Can you tell me more about what specific aspects of work are contributing to this stress?`
        }
      ],
      hasImportantData: true
    },
    {
      id: 'conv-004',title: 'Symptom Discussion - Headaches',date: '2024-01-08T11:20:00Z',
      duration: 380,
      messageCount: 10,
      summary: `Reported recurring headaches over the past week. Discussed potential triggers, frequency, intensity, and when to seek medical attention.`,
      healthCategories: [
        { type: 'symptoms', label: 'Symptoms' },
        { type: 'general', label: 'General Health' }
      ],
      keyHealthData: [
        { icon: 'AlertTriangle', label: 'Symptom', value: 'Recurring headaches' },
        { icon: 'TrendingUp', label: 'Frequency', value: '3-4 times/week' }
      ],
      transcriptPreview: `User: I've been having headaches more frequently this week, about 3-4 times. They're usually in the afternoon and feel like tension headaches. The pain is moderate, around a 5 out of 10.\n\nAI: Thank you for describing your headaches in detail. Tension headaches in the afternoon are quite common and can have various triggers...`,
      transcript: [
        {
          timestamp: 0,
          speaker: 'user',text: `I've been having headaches more frequently this week, about 3-4 times. They're usually in the afternoon and feel like tension headaches. The pain is moderate, around a 5 out of 10.`,
          healthData: [
            { icon: 'AlertTriangle', label: 'Headache Intensity', value: '5/10' },
            { icon: 'Clock', label: 'Timing', value: 'Afternoon' }
          ]
        },
        {
          timestamp: 15,
          speaker: 'ai',
          text: `Thank you for describing your headaches in detail. Tension headaches in the afternoon are quite common and can have various triggers. Have you noticed any patterns with your daily activities, stress levels, or screen time?`
        }
      ],
      hasImportantData: true
    },
    {
      id: 'conv-005',title: 'Weekly Health Summary',date: '2024-01-05T16:00:00Z',
      duration: 290,
      messageCount: 8,
      summary: `Weekly review of health metrics, exercise routine, and dietary habits. Discussed progress towards health goals and adjustments for the upcoming week.`,
      healthCategories: [
        { type: 'general', label: 'General Health' },
        { type: 'vital-signs', label: 'Vital Signs' }
      ],
      keyHealthData: [
        { icon: 'Target', label: 'Exercise Goal', value: '4/5 days completed' },
        { icon: 'Apple', label: 'Diet Score', value: '8.5/10' }
      ],
      transcriptPreview: `User: Let's do my weekly health check-in. This week I exercised 4 out of 5 planned days, mostly cardio and some strength training. My diet has been pretty good, lots of vegetables and lean proteins.\n\nAI: Excellent work this week! Achieving 4 out of 5 exercise days shows great consistency, and your focus on vegetables and lean proteins is fantastic for overall health...`,
      transcript: [
        {
          timestamp: 0,
          speaker: 'user',
          text: `Let's do my weekly health check-in. This week I exercised 4 out of 5 planned days, mostly cardio and some strength training. My diet has been pretty good, lots of vegetables and lean proteins.`,
          healthData: [
            { icon: 'Target', label: 'Exercise Days', value: '4/5' }
          ]
        },
        {
          timestamp: 12,
          speaker: 'ai',
          text: `Excellent work this week! Achieving 4 out of 5 exercise days shows great consistency, and your focus on vegetables and lean proteins is fantastic for overall health. What was your favorite workout this week?`
        }
      ],
      hasImportantData: false
    }
  ];

  // Filter conversations based on search and filters
  const filteredConversations = mockConversations.filter(conversation => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        conversation.title.toLowerCase().includes(searchLower) ||
        conversation.summary.toLowerCase().includes(searchLower) ||
        conversation.transcript.some(segment => 
          segment.text.toLowerCase().includes(searchLower)
        );
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.categories.length > 0) {
      const hasMatchingCategory = conversation.healthCategories.some(category =>
        filters.categories.includes(category.type)
      );
      if (!hasMatchingCategory) return false;
    }

    // Date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      const conversationDate = new Date(conversation.date);
      if (filters.dateRange.start && conversationDate < new Date(filters.dateRange.start)) {
        return false;
      }
      if (filters.dateRange.end && conversationDate > new Date(filters.dateRange.end)) {
        return false;
      }
    }

    // Duration filter
    if (filters.durations.length > 0) {
      const matchesDuration = filters.durations.some(duration => {
        switch (duration) {
          case 'short':
            return conversation.duration < 300;
          case 'medium':
            return conversation.duration >= 300 && conversation.duration <= 900;
          case 'long':
            return conversation.duration > 900;
          default:
            return false;
        }
      });
      if (!matchesDuration) return false;
    }

    // Health data filter
    if (filters.hasHealthData && !conversation.hasImportantData) {
      return false;
    }

    return true;
  });

  const hasActiveFilters = 
    searchQuery || 
    filters.categories.length > 0 || 
    filters.dateRange.start || 
    filters.dateRange.end || 
    filters.durations.length > 0 || 
    filters.hasHealthData;

  const handleConversationSelect = (conversationId, isSelected) => {
    setSelectedConversations(prev => 
      isSelected 
        ? [...prev, conversationId]
        : prev.filter(id => id !== conversationId)
    );
  };

  const handleSelectAll = () => {
    setSelectedConversations(filteredConversations.map(conv => conv.id));
  };

  const handleDeselectAll = () => {
    setSelectedConversations([]);
  };

  const handlePlayAudio = (conversationId, timestamp = 0) => {
    console.log(`Playing audio for conversation ${conversationId} at ${timestamp}s`);
    // In real app, this would trigger audio playback
  };

  const handleViewTranscript = (conversationId) => {
    const conversation = mockConversations.find(conv => conv.id === conversationId);
    setSelectedTranscript(conversation);
    setIsTranscriptModalOpen(true);
  };

  const handleExport = (conversationId) => {
    console.log(`Exporting conversation ${conversationId}`);
    // In real app, this would trigger export functionality
  };

  const handleShare = (conversationId) => {
    console.log(`Sharing conversation ${conversationId}`);
    // In real app, this would open share dialog
  };

  const handleDelete = (conversationId) => {
    console.log(`Deleting conversation ${conversationId}`);
    // In real app, this would delete the conversation
  };

  const handleBulkExport = (conversationIds) => {
    console.log(`Bulk exporting conversations:`, conversationIds);
    // In real app, this would trigger bulk export
  };

  const handleBulkShare = (conversationIds, shareType) => {
    console.log(`Bulk sharing conversations:`, conversationIds, 'via', shareType);
    // In real app, this would handle bulk sharing
  };

  const handleBulkDelete = (conversationIds) => {
    console.log(`Bulk deleting conversations:`, conversationIds);
    // In real app, this would delete multiple conversations
    setSelectedConversations([]);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilters({
      categories: [],
      dateRange: { start: '', end: '' },
      durations: [],
      hasHealthData: false
    });
  };

  const handleEmergency = () => {
    console.log('Emergency button clicked');
    // In real app, this would handle emergency contact
  };

  return (
    <>
      <Helmet>
        <title>Conversation History & Transcripts - HealthVitals AI</title>
        <meta name="description" content="Review, search, and manage your complete archive of health conversations with comprehensive filtering and organization tools." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <GlobalHeader onEmergency={handleEmergency} />
        
        <main className="pt-16">
          {/* Search and Filters */}
          <SearchAndFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
            totalResults={filteredConversations.length}
          />

          {/* Content Area */}
          <div className="px-4 lg:px-6 py-6">
            {filteredConversations.length === 0 ? (
              <EmptyState 
                hasFilters={hasActiveFilters}
                onClearFilters={handleClearFilters}
              />
            ) : (
              <div className="space-y-4">
                {filteredConversations.map((conversation) => (
                  <ConversationCard
                    key={conversation.id}
                    conversation={conversation}
                    onPlayAudio={handlePlayAudio}
                    onViewTranscript={handleViewTranscript}
                    onExport={handleExport}
                    onShare={handleShare}
                    onDelete={handleDelete}
                    isSelected={selectedConversations.includes(conversation.id)}
                    onSelect={handleConversationSelect}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          <BulkActions
            selectedConversations={selectedConversations}
            onBulkExport={handleBulkExport}
            onBulkShare={handleBulkShare}
            onBulkDelete={handleBulkDelete}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            totalConversations={filteredConversations.length}
          />

          {/* Transcript Modal */}
          <TranscriptModal
            conversation={selectedTranscript}
            isOpen={isTranscriptModalOpen}
            onClose={() => {
              setIsTranscriptModalOpen(false);
              setSelectedTranscript(null);
            }}
            onPlayAudio={handlePlayAudio}
            onExport={handleExport}
          />
        </main>
      </div>
    </>
  );
};

export default ConversationHistoryTranscripts;