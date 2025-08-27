import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, Calendar, Globe, Save, X, MapPin, Type, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getApiBaseUrl } from '../utils/config';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    dateOfBirth: '',
    location: '',
    language: 'English',
    bio: '',
    timezone: 'Asia/Colombo'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

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
      const profile = data.profile;
      
      // Populate form with existing data
      setFormData({
        fullName: profile.fullName || '',
        phone: profile.phone || '',
        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '', // Format date for input
        location: profile.location || '',
        language: profile.language || 'English',
        bio: profile.bio || '',
        timezone: profile.timezone || 'Asia/Colombo'
      });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear success message when user starts editing
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      if (!formData.fullName.trim()) {
        throw new Error('Full name is required');
      }

      const response = await fetch(`${getApiBaseUrl()}/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Update failed (${response.status})`);
      }

      const data = await response.json();
      setSuccess('Profile updated successfully!');
      
      // Redirect to profile view after a short delay
      setTimeout(() => {
        navigate('/profile/view');
      }, 1500);
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/profile/view');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-blue flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error && !formData.fullName) {
    return (
      <div className="min-h-screen bg-soft-blue flex items-center justify-center p-4">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-2">
            <button
              onClick={fetchProfile}
              className="flex items-center justify-center mx-auto px-4 py-2 bg-slt-blue-600 text-white rounded hover:bg-slt-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </button>
            <Link
              to="/profile/view"
              className="block text-center text-slt-blue hover:text-slt-blue-700 transition-colors"
            >
              Back to Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-blue p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Edit Profile</h1>
          <p className="text-white/80">
            Update your personal information
          </p>
        </div>

        <div className="card">
          {/* Success/Error Messages */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center text-green-700">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{success}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center text-red-700">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <div className="ml-3">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="input-field pl-10"
                required
                disabled={saving}
              />
            </div>

            {/* Phone Input */}
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number (e.g., +94 77XXXXXXX)"
                className="input-field pl-10"
                disabled={saving}
              />
            </div>

            {/* Date of Birth Input */}
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="input-field pl-10"
                disabled={saving}
              />
            </div>

            {/* Location Input */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Location (e.g., Colombo, Sri Lanka)"
                className="input-field pl-10"
                disabled={saving}
              />
            </div>

            {/* Bio Input */}
            <div className="relative">
              <Type className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself (optional)"
                className="input-field pl-10 min-h-[100px] resize-vertical"
                maxLength={500}
                disabled={saving}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.bio.length}/500 characters
              </div>
            </div>

            {/* Language Preference Input */}
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="input-field pl-10"
                required
                disabled={saving}
              >
                <option value="English">English</option>
                <option value="Sinhala">Sinhala</option>
                <option value="Tamil">Tamil</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="btn-secondary flex items-center flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="flex items-center px-6 py-2 border border-gray-300 text-slt-blue rounded-lg font-medium hover:bg-gray-50 transition-colors flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit; 