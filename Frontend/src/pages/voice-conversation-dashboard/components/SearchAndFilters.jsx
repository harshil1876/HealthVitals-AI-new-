import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchAndFilters = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    dateRange: 'all',
    topics: [],
    healthScore: 'all'
  });

  const topicOptions = [
    'Vital Signs',
    'Symptoms',
    'General Wellness',
    'Medication',
    'Sleep Patterns',
    'Exercise',
    'Nutrition',
    'Mental Health'
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' }
  ];

  const healthScoreOptions = [
    { value: 'all', label: 'All Scores' },
    { value: 'excellent', label: 'Excellent (90-100%)' },
    { value: 'good', label: 'Good (80-89%)' },
    { value: 'fair', label: 'Fair (70-79%)' },
    { value: 'poor', label: 'Poor (<70%)' }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleTopicToggle = (topic) => {
    const updatedTopics = activeFilters.topics.includes(topic)
      ? activeFilters.topics.filter(t => t !== topic)
      : [...activeFilters.topics, topic];
    
    const updatedFilters = { ...activeFilters, topics: updatedTopics };
    setActiveFilters(updatedFilters);
    
    if (onFilter) {
      onFilter(updatedFilters);
    }
  };

  const handleDateRangeChange = (dateRange) => {
    const updatedFilters = { ...activeFilters, dateRange };
    setActiveFilters(updatedFilters);
    
    if (onFilter) {
      onFilter(updatedFilters);
    }
  };

  const handleHealthScoreChange = (healthScore) => {
    const updatedFilters = { ...activeFilters, healthScore };
    setActiveFilters(updatedFilters);
    
    if (onFilter) {
      onFilter(updatedFilters);
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dateRange: 'all',
      topics: [],
      healthScore: 'all'
    };
    setActiveFilters(clearedFilters);
    setSearchQuery('');
    
    if (onFilter) {
      onFilter(clearedFilters);
    }
    if (onSearch) {
      onSearch('');
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.dateRange !== 'all') count++;
    if (activeFilters.topics.length > 0) count++;
    if (activeFilters.healthScore !== 'all') count++;
    return count;
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="Search" size={16} className="text-text-muted" />
        </div>
        <Input
          type="search"
          placeholder="Search conversations, topics, or transcript content..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10 pr-4"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant={isFilterOpen ? "primary" : "outline"}
            size="sm"
            iconName="Filter"
            iconSize={16}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            Filters
            {getActiveFilterCount() > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </Button>
          
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconSize={14}
              onClick={clearAllFilters}
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="text-xs text-text-muted">
          {searchQuery && `Searching for "${searchQuery}"`}
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-surface border border-border rounded-medical-lg p-4 shadow-medical animate-slide-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Range Filter */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">
                Date Range
              </h3>
              <div className="space-y-2">
                {dateRangeOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="dateRange"
                      value={option.value}
                      checked={activeFilters.dateRange === option.value}
                      onChange={() => handleDateRangeChange(option.value)}
                      className="w-4 h-4 text-primary focus:ring-primary border-border"
                    />
                    <span className="text-sm text-text-primary">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Health Topics Filter */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">
                Health Topics
              </h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {topicOptions.map((topic) => (
                  <label
                    key={topic}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={activeFilters.topics.includes(topic)}
                      onChange={() => handleTopicToggle(topic)}
                      className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                    />
                    <span className="text-sm text-text-primary">
                      {topic}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Health Score Filter */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">
                Health Score
              </h3>
              <div className="space-y-2">
                {healthScoreOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="healthScore"
                      value={option.value}
                      checked={activeFilters.healthScore === option.value}
                      onChange={() => handleHealthScoreChange(option.value)}
                      className="w-4 h-4 text-primary focus:ring-primary border-border"
                    />
                    <span className="text-sm text-text-primary">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;