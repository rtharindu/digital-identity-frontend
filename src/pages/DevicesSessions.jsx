import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Smartphone, Monitor, Wifi, Clock, Globe, LogOut, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getApiBaseUrl } from '../utils/config';

const iconMap = {
  'iPhone': Smartphone,
  'MacBook': Monitor,
  'Unknown Device': Monitor,
  'iPad': Smartphone
};

const DevicesSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError('Authentication required');
      setLoading(false);
      return;
    }

    axios.get(`${getApiBaseUrl()}/api/sessions`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        console.log('[Frontend] Sessions fetched:', res.data);
        setSessions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('[Frontend] Fetch failed:', err);
        setError('Failed to fetch sessions');
        setLoading(false);
      });
  }, [token]);

  const getStatusBadge = (status) => {
    return (
      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
        status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
      }`}>
        {status}
      </span>
    );
  };

  const handleLogout = async (sessionId) => {
    if (!window.confirm('Are you sure you want to logout from this device? You will be redirected to the login page.')) {
      return;
    }

    try {
      // Logout the specific session
      await axios.put(`${getApiBaseUrl()}/api/logout/${sessionId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Update the local state to show the session as inactive
      setSessions(prev =>
        prev.map(s => s._id === sessionId ? { ...s, status: 'Inactive' } : s)
      );

      // Logout the current user and redirect to login page
      logout();
      navigate('/login');
    } catch (error) {
      console.error('[Logout] Failed:', error);
      setError('Failed to logout session');
    }
  };

  const handleLogoutAll = async () => {
    if (!window.confirm('Are you sure you want to logout from all devices? This will end all your active sessions and redirect you to the login page.')) {
      return;
    }

    try {
      // Logout all sessions
      await axios.put(`${getApiBaseUrl()}/api/logout-all`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Update local state
      setSessions(prev =>
        prev.map(s => ({ ...s, status: 'Inactive' }))
      );

      // Logout the current user and redirect to login page
      logout();
      navigate('/login');
    } catch (error) {
      console.error('[Logout All] Failed:', error);
      setError('Failed to logout all sessions');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slt-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-slt-blue-600 text-white px-4 py-2 rounded hover:bg-slt-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const activeSessions = sessions.filter(s => s.status === 'Active');

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Active Device Sessions</h1>
            <p className="text-gray-600 mt-2">
              Logged in as: <span className="font-medium">{user?.email}</span>
            </p>
          </div>
          {activeSessions.length > 1 && (
            <button
              onClick={handleLogoutAll}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout All Devices
            </button>
          )}
        </div>

        {sessions.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <Monitor className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
            <p className="text-gray-500">You haven't logged in from any devices yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Active Sessions */}
            {activeSessions.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Active Sessions ({activeSessions.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {activeSessions.map((session) => {
                    const Icon = iconMap[session.device] || Monitor;
                    return (
                      <div key={session._id} className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-green-100 rounded-full mr-4">
                            <Icon className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">{session.device}</h3>
                            <div className="text-sm text-gray-500">{session.browser}</div>
                          </div>
                          <div className="ml-auto">{getStatusBadge(session.status)}</div>
                        </div>

                        <div className="text-sm text-gray-600 space-y-2 mb-4">
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-gray-400" />
                            <span>{session.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Wifi className="h-4 w-4 text-gray-400" />
                            <span>IP: {session.ipAddress}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>Last Seen: {session.lastSeen}</span>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => handleLogout(session._id)}
                            className="flex items-center px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                          >
                            <LogOut className="h-4 w-4 mr-1" />
                            Logout
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Inactive Sessions */}
            {sessions.some(s => s.status === 'Inactive') && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Sessions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sessions.filter(s => s.status === 'Inactive').map((session) => {
                    const Icon = iconMap[session.device] || Monitor;
                    return (
                      <div key={session._id} className="bg-white shadow-md rounded-lg p-5 border border-gray-200 opacity-75">
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-gray-100 rounded-full mr-4">
                            <Icon className="h-6 w-6 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">{session.device}</h3>
                            <div className="text-sm text-gray-500">{session.browser}</div>
                          </div>
                          <div className="ml-auto">{getStatusBadge(session.status)}</div>
                        </div>

                        <div className="text-sm text-gray-600 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-gray-400" />
                            <span>{session.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Wifi className="h-4 w-4 text-gray-400" />
                            <span>IP: {session.ipAddress}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>Last Seen: {session.lastSeen}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DevicesSessions;
