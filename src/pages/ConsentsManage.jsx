import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Share2, Eye, Save, ArrowLeft } from 'lucide-react';

const ConsentsManage = () => {
  const [consents, setConsents] = useState({
    privacyPolicy: true,
    marketingEmails: false,
    dataSharing: true,
    analyticsTracking: true
  });
  const navigate = useNavigate();

  const consentOptions = [
    {
      key: 'privacyPolicy',
      title: 'Privacy Policy',
      description: 'I accept the privacy policy and data handling practices',
      icon: Shield,
      required: true
    },
    {
      key: 'marketingEmails',
      title: 'Marketing Communications',
      description: 'I agree to receive promotional emails and newsletters',
      icon: Mail,
      required: false
    },
    {
      key: 'dataSharing',
      title: 'Third-party Data Sharing',
      description: 'I allow sharing of my data with trusted third-party partners',
      icon: Share2,
      required: false
    },
    {
      key: 'analyticsTracking',
      title: 'Analytics and Tracking',
      description: 'I allow collection of analytics data to improve services',
      icon: Eye,
      required: false
    }
  ];

  const handleConsentChange = (key) => {
    setConsents(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle consent update logic here
    console.log('Consent preferences updated:', consents);
    navigate('/consents/view');
  };

  return (
    <div className="min-h-screen bg-soft-blue p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link
              to="/consents/view"
              className="text-white hover:text-soft-blue transition-colors mr-4"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-bold text-white">Manage Consents</h1>
          </div>
          <p className="text-white/80">
            Update your privacy preferences and consent settings
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slt-blue mb-2">Consent Preferences</h2>
              <p className="text-gray-600 text-sm">
                Select the consents you wish to grant. You can change these settings at any time.
              </p>
            </div>

            {/* Consent Options */}
            <div className="space-y-4">
              {consentOptions.map((option) => {
                const IconComponent = option.icon;
                const isChecked = consents[option.key];
                const isRequired = option.required;

                return (
                  <div key={option.key} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <input
                          type="checkbox"
                          id={option.key}
                          checked={isChecked}
                          onChange={() => handleConsentChange(option.key)}
                          disabled={isRequired}
                          className="h-4 w-4 text-mobitel-green focus:ring-mobitel-green border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <IconComponent className="h-5 w-5 text-slt-blue" />
                          <label
                            htmlFor={option.key}
                            className="text-lg font-semibold text-slt-blue cursor-pointer"
                          >
                            {option.title}
                          </label>
                          {isRequired && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{option.description}</p>
                        {isRequired && (
                          <p className="text-red-600 text-xs mt-1">
                            This consent is required to use our services
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Information Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slt-blue mb-2">Important Information</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• You can update your consents at any time</li>
                <li>• Some consents are required for service functionality</li>
                <li>• Revoking certain consents may limit service features</li>
                <li>• Changes take effect immediately</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="btn-secondary flex items-center flex-1 justify-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </button>
              <Link
                to="/consents/view"
                className="flex items-center px-6 py-2 border border-gray-300 text-slt-blue rounded-lg font-medium hover:bg-gray-50 transition-colors flex-1 justify-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <Link
            to="/terms-and-conditions"
            className="text-mobitel-green hover:text-mobitel-green/80 transition-colors"
          >
            View Terms & Conditions
          </Link>
          <span className="mx-2 text-white">•</span>
          <Link
            to="/privacy"
            className="text-mobitel-green hover:text-mobitel-green/80 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConsentsManage; 