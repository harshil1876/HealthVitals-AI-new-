import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Notifications = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Health Alert',
      message: 'Your blood pressure readings are higher than usual. Consider scheduling a check-up.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Goal Achieved! 🎉',
      message: 'Congratulations! You\'ve completed your weekly exercise goal.',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Medication Reminder',
      message: 'Time to take your evening medication.',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'insight',
      title: 'New Health Insight',
      message: 'We\'ve detected a positive trend in your sleep pattern. Keep it up!',
      time: '2 days ago',
      read: true
    },
    {
      id: 5,
      type: 'alert',
      title: 'Stress Level Alert',
      message: 'Your stress levels seem elevated. Try some relaxation exercises.',
      time: '3 days ago',
      read: true
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert':
        return { name: 'AlertCircle', className: 'text-error' };
      case 'achievement':
        return { name: 'Award', className: 'text-success' };
      case 'reminder':
        return { name: 'Bell', className: 'text-warning' };
      case 'insight':
        return { name: 'Brain', className: 'text-primary' };
      default:
        return { name: 'Info', className: 'text-secondary' };
    }
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Notifications</h1>
              <p className="text-text-secondary">Stay updated with your health insights</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Mark all as read')}
            >
              Mark all as read
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-background text-text-secondary hover:bg-surface-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('alert')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'alert'
                ? 'bg-error text-white'
                : 'bg-background text-text-secondary hover:bg-surface-100'
            }`}
          >
            Alerts
          </button>
          <button
            onClick={() => setFilter('achievement')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'achievement'
                ? 'bg-success text-white'
                : 'bg-background text-text-secondary hover:bg-surface-100'
            }`}
          >
            Achievements
          </button>
          <button
            onClick={() => setFilter('reminder')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'reminder'
                ? 'bg-warning text-white'
                : 'bg-background text-text-secondary hover:bg-surface-100'
            }`}
          >
            Reminders
          </button>
          <button
            onClick={() => setFilter('insight')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'insight'
                ? 'bg-primary text-white'
                : 'bg-background text-text-secondary hover:bg-surface-100'
            }`}
          >
            Insights
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => {
            const icon = getNotificationIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`bg-background rounded-medical-lg shadow-medical p-4 transition-all ${
                  notification.read ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-medical bg-${icon.className}/10`}>
                    <Icon name={icon.name} size={20} className={icon.className} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-text-primary">
                          {notification.title}
                        </h3>
                        <p className="mt-1 text-sm text-text-secondary">
                          {notification.message}
                        </p>
                      </div>
                      <span className="text-xs text-text-secondary whitespace-nowrap ml-4">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Bell" size={48} className="mx-auto text-text-secondary opacity-50" />
            <p className="mt-4 text-text-secondary">No notifications found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
