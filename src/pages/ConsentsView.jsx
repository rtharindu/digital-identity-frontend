import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Share2, Eye, Edit, X } from 'lucide-react';

const ConsentsView = () => {
  const consents = [
    {
      id: 1,
      title: 'Privacy Policy',
      description: 'Acceptance of our privacy policy and data handling practices',
      status: 'Accepted',
      dateAccepted: '2023-01-15',
      lastUpdated: '2023-01-15',
      icon: Shield,
      color: 'bg-green-500'
    },
    {
      id: 2,
      title: 'Marketing Emails',
      description: 'Receive promotional emails and newsletters',
      status: 'Revoked',
      dateAccepted: '2023-01-15',
      lastUpdated: '2024-01-10',
      icon: Mail,
      color: 'bg-red-500'
    },
    {
      id: 3,
      title: 'Data Sharing',
      description: 'Allow sharing of data with third-party partners',
      status: 'Accepted',
      dateAccepted: '2023-01-15',
      lastUpdated: '2023-06-20',
      icon: Share2,
      color: 'bg-green-500'
    },
    {
      id: 4,
      title: 'Analytics Tracking',
      description: 'Allow us to collect analytics data to improve our services',
      status: 'Accepted',
      dateAccepted: '2023-01-15',
      lastUpdated: '2023-01-15',
      icon: Eye,
      color: 'bg-green-500'
    }
  ];

  const handleRevoke = (consentId) => {
    console.log('Revoking consent:', consentId);
    // Handle consent revocation logic here
  };

  const handleUpdate = (consentId) => {
    console.log('Updating consent:', consentId);
    // Handle consent update logic here
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === 'Accepted') {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  return (
    <div className="min-h-screen bg-soft-blue p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Your Current Consents</h1>
          <p className="text-white/80">
            Review and manage your privacy preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Consents List */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slt-blue">Consent Preferences</h2>
                <Link
                  to="/consents/manage"
                  className="btn-secondary flex items-center"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Manage All
                </Link>
              </div>

              <div className="space-y-4">
                {consents.map((consent) => {
                  const IconComponent = consent.icon;
                  return (
                    <div key={consent.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`${consent.color} p-2 rounded-lg`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-slt-blue">{consent.title}</h3>
                              <span className={getStatusBadge(consent.status)}>
                                {consent.status}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{consent.description}</p>
                            <div className="text-sm text-gray-500">
                              <span>Accepted: {consent.dateAccepted}</span>
                              {consent.lastUpdated !== consent.dateAccepted && (
                                <span className="ml-4">Updated: {consent.lastUpdated}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUpdate(consent.id)}
                            className="p-2 text-mobitel-green hover:bg-gray-100 rounded-lg transition-colors"
                            title="Update Consent"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRevoke(consent.id)}
                            className="p-2 text-red-500 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Revoke Consent"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Consent Summary */}
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="card">
              <h3 className="text-lg font-semibold text-slt-blue mb-4">Consent Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Consents</span>
                  <span className="text-slt-blue font-medium">{consents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Consents</span>
                  <span className="text-slt-blue font-medium">
                    {consents.filter(c => c.status === 'Accepted').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revoked Consents</span>
                  <span className="text-slt-blue font-medium">
                    {consents.filter(c => c.status === 'Revoked').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-slt-blue mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  to="/consents/manage"
                  className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors text-slt-blue"
                >
                  Manage All Consents
                </Link>
                <Link
                  to="/terms-and-conditions"
                  className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors text-slt-blue"
                >
                  View Terms & Conditions
                </Link>
                <Link
                  to="/privacy"
                  className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors text-slt-blue"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* Information */}
            <div className="card bg-blue-50 border border-blue-200">
              <h3 className="text-lg font-semibold text-slt-blue mb-2">About Consents</h3>
              <p className="text-sm text-gray-600">
                You can update or revoke your consents at any time. Changes will take effect immediately and may affect the services available to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentsView; 