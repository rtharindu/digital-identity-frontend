import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Calendar, MapPin, Edit, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getApiBaseUrl } from '../utils/config';

const ProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${getApiBaseUrl()}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch profile (${response.status})`);
      }

      const data = await response.json();
      setProfile(data.profile);
    } catch (err) {
      console.error('Profile fetch error:', err);
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setError('Authentication required');
      setLoading(false);
    }
  }, [token]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-blue flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-soft-blue flex items-center justify-center p-4">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchProfile}
            className="flex items-center justify-center mx-auto px-4 py-2 bg-slt-blue-600 text-white rounded hover:bg-slt-blue-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-soft-blue flex items-center justify-center p-4">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Profile Found</h2>
          <p className="text-gray-600 mb-4">Your profile could not be loaded.</p>
          <Link
            to="/profile/edit"
            className="inline-flex items-center px-4 py-2 bg-slt-blue-600 text-white rounded hover:bg-slt-blue-700 transition-colors"
          >
            <Edit className="h-4 w-4 mr-2" />
            Create Profile
          </Link>
        </div>
      </div>
    );
  }

  const profileFields = [
    { icon: User, label: 'Full Name', value: profile.fullName || 'Not specified' },
    { icon: Mail, label: 'Email', value: profile.email },
    { icon: Phone, label: 'Phone', value: profile.phone || 'Not specified' },
    { icon: Calendar, label: 'Date of Birth', value: formatDate(profile.dateOfBirth) },
    { icon: MapPin, label: 'Location', value: profile.location || 'Not specified' },
    { icon: User, label: 'Language Preference', value: profile.language || 'English' }
  ];

  return (
    <div className="min-h-screen bg-soft-blue p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Your Profile</h1>
          <p className="text-white/80">
            View and manage your personal information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slt-blue">Personal Information</h2>
                <Link
                  to="/profile/edit"
                  className="btn-secondary flex items-center"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </div>

              <div className="space-y-4">
                {profileFields.map((field, index) => {
                  const IconComponent = field.icon;
                  return (
                    <div key={index} className="flex items-center p-4 border-b border-gray-100 last:border-b-0">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                        <IconComponent className="h-5 w-5 text-slt-blue" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">{field.label}</p>
                        <p className="text-slt-blue font-medium">{field.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="card text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-gradient-blue-start to-gradient-blue-end rounded-full mx-auto mb-4 flex items-center justify-center">
                {profile.profilePicture ? (
                  <img 
                    src={profile.profilePicture} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-white" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-slt-blue mb-2">{profile.fullName}</h3>
              <p className="text-gray-600 text-sm">{profile.email}</p>
              {profile.bio && (
                <p className="text-gray-600 text-sm mt-2 italic">"{profile.bio}"</p>
              )}
            </div>

            {/* Account Information */}
            <div className="card">
              <h3 className="text-lg font-semibold text-slt-blue mb-4">Account Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Created</span>
                  <span className="text-slt-blue font-medium">
                    {formatDate(profile.accountInfo?.accountCreated)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="text-slt-blue font-medium">
                    {formatDate(profile.accountInfo?.lastUpdated)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Role</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    profile.accountInfo?.role === 'admin' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {profile.accountInfo?.role?.charAt(0).toUpperCase() + profile.accountInfo?.role?.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-slt-blue mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  to="/account/change-password"
                  className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors text-slt-blue"
                >
                  Change Password
                </Link>
                <Link
                  to="/consents/manage"
                  className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors text-slt-blue"
                >
                  Update Consents
                </Link>
                <Link
                  to="/devices/trusted"
                  className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors text-slt-blue"
                >
                  Manage Devices
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView; 