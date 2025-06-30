import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSettings = () => {
  const [profile, setProfile] = useState({
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@healthvitals.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-03-15',
    gender: 'female',
    profession: 'Healthcare Professional',
    specialization: 'Internal Medicine',
    licenseNumber: 'MD123456789',
    organization: 'City General Hospital'
  });

  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: 1,
      name: 'Dr. Michael Chen',
      relationship: 'Colleague',
      phone: '+1 (555) 987-6543',
      email: 'michael.chen@hospital.com',
      isPrimary: true
    },
    {
      id: 2,
      name: 'Jennifer Johnson',
      relationship: 'Spouse',
      phone: '+1 (555) 456-7890',
      email: 'jennifer.johnson@email.com',
      isPrimary: false
    }
  ]);

  const [healthcareProviders, setHealthcareProviders] = useState([
    {
      id: 1,
      name: 'Dr. Robert Williams',
      specialty: 'Cardiology',
      organization: 'Heart Center Medical',
      phone: '+1 (555) 234-5678',
      email: 'r.williams@heartcenter.com',
      isConnected: true
    },
    {
      id: 2,
      name: 'Dr. Lisa Martinez',
      specialty: 'Endocrinology',
      organization: 'Diabetes Care Clinic',
      phone: '+1 (555) 345-6789',
      email: 'l.martinez@diabetesclinic.com',
      isConnected: false
    }
  ]);

  const [subscription, setSubscription] = useState({
    plan: 'Professional',
    status: 'Active',
    nextBilling: '2024-02-15',
    amount: '$29.99',
    features: [
      'Unlimited voice conversations',
      'Advanced health analytics',
      'Priority AI responses',
      'Healthcare provider integration',
      'Export capabilities',
      'Premium support'
    ]
  });

  const [showAddContact, setShowAddContact] = useState(false);
  const [showAddProvider, setShowAddProvider] = useState(false);

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const addEmergencyContact = () => {
    const newContact = {
      id: Date.now(),
      name: '',
      relationship: '',
      phone: '',
      email: '',
      isPrimary: false
    };
    setEmergencyContacts(prev => [...prev, newContact]);
    setShowAddContact(false);
  };

  const removeEmergencyContact = (id) => {
    setEmergencyContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const updateEmergencyContact = (id, field, value) => {
    setEmergencyContacts(prev => 
      prev.map(contact => 
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };

  const toggleProviderConnection = (id) => {
    setHealthcareProviders(prev =>
      prev.map(provider =>
        provider.id === id ? { ...provider, isConnected: !provider.isConnected } : provider
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="User" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Profile Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              First Name
            </label>
            <Input
              type="text"
              value={profile.firstName}
              onChange={(e) => handleProfileChange('firstName', e.target.value)}
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Last Name
            </label>
            <Input
              type="text"
              value={profile.lastName}
              onChange={(e) => handleProfileChange('lastName', e.target.value)}
              placeholder="Enter last name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address
            </label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleProfileChange('phone', e.target.value)}
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Date of Birth
            </label>
            <Input
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => handleProfileChange('dateOfBirth', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Gender
            </label>
            <select
              value={profile.gender}
              onChange={(e) => handleProfileChange('gender', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-primary text-text-primary"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Profession
            </label>
            <Input
              type="text"
              value={profile.profession}
              onChange={(e) => handleProfileChange('profession', e.target.value)}
              placeholder="Enter profession"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Organization
            </label>
            <Input
              type="text"
              value={profile.organization}
              onChange={(e) => handleProfileChange('organization', e.target.value)}
              placeholder="Enter organization"
            />
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Phone" size={20} className="text-primary" />
            <h3 className="text-lg font-heading font-medium text-text-primary">
              Emergency Contacts
            </h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            onClick={() => setShowAddContact(true)}
          >
            Add Contact
          </Button>
        </div>

        <div className="space-y-4">
          {emergencyContacts.map((contact) => (
            <div key={contact.id} className="p-4 bg-background rounded-medical border border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Name
                  </label>
                  <Input
                    type="text"
                    value={contact.name}
                    onChange={(e) => updateEmergencyContact(contact.id, 'name', e.target.value)}
                    placeholder="Contact name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Relationship
                  </label>
                  <Input
                    type="text"
                    value={contact.relationship}
                    onChange={(e) => updateEmergencyContact(contact.id, 'relationship', e.target.value)}
                    placeholder="Relationship"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => updateEmergencyContact(contact.id, 'phone', e.target.value)}
                    placeholder="Phone number"
                  />
                </div>

                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={contact.email}
                      onChange={(e) => updateEmergencyContact(contact.id, 'email', e.target.value)}
                      placeholder="Email address"
                    />
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => removeEmergencyContact(contact.id)}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={contact.isPrimary}
                  onChange={(e) => updateEmergencyContact(contact.id, 'isPrimary', e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
                <label className="text-sm text-text-secondary">Primary emergency contact</label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Healthcare Provider Connections */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icon name="Stethoscope" size={20} className="text-primary" />
            <h3 className="text-lg font-heading font-medium text-text-primary">
              Healthcare Provider Connections
            </h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            onClick={() => setShowAddProvider(true)}
          >
            Add Provider
          </Button>
        </div>

        <div className="space-y-4">
          {healthcareProviders.map((provider) => (
            <div key={provider.id} className="p-4 bg-background rounded-medical border border-border">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-text-primary">{provider.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      provider.isConnected 
                        ? 'bg-secondary/10 text-secondary' :'bg-warning/10 text-warning'
                    }`}>
                      {provider.isConnected ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                  <div className="text-sm text-text-secondary space-y-1">
                    <p><strong>Specialty:</strong> {provider.specialty}</p>
                    <p><strong>Organization:</strong> {provider.organization}</p>
                    <p><strong>Phone:</strong> {provider.phone}</p>
                    <p><strong>Email:</strong> {provider.email}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant={provider.isConnected ? "danger" : "primary"}
                    size="sm"
                    onClick={() => toggleProviderConnection(provider.id)}
                  >
                    {provider.isConnected ? 'Disconnect' : 'Connect'}
                  </Button>
                  <Button variant="outline" size="sm" iconName="Edit" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription & Billing */}
      <div className="bg-surface rounded-medical-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="CreditCard" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-medium text-text-primary">
            Subscription & Billing
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="p-4 bg-background rounded-medical border border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium text-text-primary">{subscription.plan} Plan</h4>
                  <p className="text-sm text-text-secondary">Status: {subscription.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-primary">{subscription.amount}</p>
                  <p className="text-sm text-text-secondary">per month</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-text-secondary">
                  <strong>Next billing:</strong> {subscription.nextBilling}
                </p>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Change Plan
                </Button>
                <Button variant="danger" size="sm" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-text-primary mb-3">Plan Features</h4>
            <div className="space-y-2">
              {subscription.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-secondary" />
                  <span className="text-sm text-text-secondary">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button variant="primary" iconName="Save" className="flex-1 sm:flex-none">
          Save Account Settings
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none">
          Reset Changes
        </Button>
      </div>
    </div>
  );
};

export default AccountSettings;