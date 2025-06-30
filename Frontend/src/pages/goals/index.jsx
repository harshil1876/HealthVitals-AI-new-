import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';

const Goals = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Exercise 5 times per week',
      description: 'Maintain consistent physical activity',
      category: 'health',
      target: '5 sessions',
      current: '3 sessions',
      deadline: '31/12/2024',
      progress: 60
    },
    {
      id: 2,
      title: 'Get 8 hours of sleep',
      description: 'Improve sleep quality and duration',
      category: 'health',
      target: '8 hours',
      current: '7.2 hours',
      deadline: '31/12/2024',
      progress: 90
    },
    {
      id: 3,
      title: 'Drink 8 glasses of water daily',
      description: 'Stay properly hydrated',
      category: 'health',
      target: '8 glasses',
      current: '6.5 glasses',
      deadline: '31/12/2024',
      progress: 81.3
    }
  ]);

  const stats = {
    activeGoals: goals.length,
    completed: 0,
    averageProgress: goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length
  };

  const handleAddGoal = (newGoal) => {
    setGoals([...goals, { ...newGoal, id: goals.length + 1 }]);
    setShowAddGoal(false);
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const handleEditGoal = (goalId) => {
    // Implement edit functionality
    console.log('Edit goal:', goalId);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <GlobalHeader />
      <PrimaryTabNavigation />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Goals</h1>
              <p className="text-text-secondary">Track and achieve your wellness objectives</p>
            </div>
            <Button
              variant="primary"
              onClick={() => setShowAddGoal(true)}
              className="flex items-center space-x-2"
            >
              <Icon name="Plus" size={20} />
              <span>Add Goal</span>
            </Button>
          </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-background rounded-medical-lg shadow-medical p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Target" size={24} className="text-primary" />
              <h3 className="text-lg font-semibold text-text-primary">Active Goals</h3>
            </div>
            <p className="text-3xl font-bold text-text-primary">{stats.activeGoals}</p>
            <p className="text-sm text-text-secondary">Currently working on</p>
          </div>

          <div className="bg-background rounded-medical-lg shadow-medical p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="CheckCircle" size={24} className="text-success" />
              <h3 className="text-lg font-semibold text-text-primary">Completed</h3>
            </div>
            <p className="text-3xl font-bold text-text-primary">{stats.completed}</p>
            <p className="text-sm text-text-secondary">Successfully achieved</p>
          </div>

          <div className="bg-background rounded-medical-lg shadow-medical p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="TrendingUp" size={24} className="text-accent" />
              <h3 className="text-lg font-semibold text-text-primary">Average Progress</h3>
            </div>
            <p className="text-3xl font-bold text-text-primary">{stats.averageProgress.toFixed(1)}%</p>
            <p className="text-sm text-text-secondary">Across all goals</p>
          </div>
        </div>

        {/* Active Goals */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-text-primary">Active Goals</h2>
          {goals.map(goal => (
            <div key={goal.id} className="bg-background rounded-medical-lg shadow-medical p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-medical">
                    <Icon name="Target" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{goal.title}</h3>
                    <p className="text-text-secondary">{goal.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditGoal(goal.id)}
                    className="p-2 text-text-secondary hover:text-primary rounded-medical transition-colors"
                  >
                    <Icon name="Edit" size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="p-2 text-text-secondary hover:text-error rounded-medical transition-colors"
                  >
                    <Icon name="Trash" size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-text-secondary">Target: </span>
                    <span className="font-medium text-text-primary">{goal.target}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Current: </span>
                    <span className="font-medium text-text-primary">{goal.current}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Deadline: </span>
                    <span className="font-medium text-text-primary">{goal.deadline}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-text-secondary">Progress</span>
                    <span className="text-sm font-medium text-primary">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-surface rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Goal Modal */}
        {showAddGoal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-background rounded-medical-lg shadow-medical p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Add New Goal</h2>
              {/* Add goal form would go here */}
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowAddGoal(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => handleAddGoal({})}>Add Goal</Button>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border">
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

export default Goals;
