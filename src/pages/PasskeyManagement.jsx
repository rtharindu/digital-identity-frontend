import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PasskeyService from '../services/passkeyService';
import BiometricDetector from '../components/BiometricDetector';
import { Key, Plus, Trash2, AlertCircle, CheckCircle, XCircle, Smartphone, Monitor, Laptop } from 'lucide-react';

const PasskeyManagement = () => {
  const { user, token, passkeySupported, registerPasskey } = useAuth();
  const [passkeys, setPasskeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [biometricCapabilities, setBiometricCapabilities] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    if (token) {
      fetchPasskeys();
    }
  }, [token]);

  const handleCapabilitiesDetected = (capabilities, device) => {
    setBiometricCapabilities(capabilities);
    setDeviceInfo(device);
  };

  const fetchPasskeys = async () => {
    try {
      const userPasskeys = await PasskeyService.getUserPasskeys(token);
      setPasskeys(userPasskeys);
    } catch (error) {
      setError('Failed to fetch passkeys: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterPasskey = async () => {
    if (!user?.email) {
      setError('User email not found');
      return;
    }

    if (!token) {
      setError('User not authenticated. Please login first.');
      return;
    }

    setError("");
    setSuccess("");
    setRegistering(true);

    try {
      const result = await registerPasskey(user.email);
      
      if (result.success) {
        setSuccess('Passkey registered successfully!');
        fetchPasskeys(); // Refresh the list
      } else {
        setError(result.error || 'Failed to register passkey');
      }
    } catch (error) {
      setError('Passkey registration failed: ' + error.message);
    } finally {
      setRegistering(false);
    }
  };

  const handleDeletePasskey = async (passkeyId) => {
    setError("");
    setSuccess("");
    setDeleting(passkeyId);

    try {
      const result = await PasskeyService.deletePasskey(passkeyId, token);
      
      if (result.success) {
        setSuccess('Passkey deleted successfully!');
        setPasskeys(passkeys.filter(pk => pk._id !== passkeyId));
      } else {
        setError(result.error || 'Failed to delete passkey');
      }
    } catch (error) {
      setError('Failed to delete passkey: ' + error.message);
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDeviceTypeIcon = (deviceType) => {
    switch (deviceType) {
      case 'platform':
        return '🖥️';
      case 'cross-platform':
        return '🔑';
      default:
        return '📱';
    }
  };

  const getDeviceIcon = (deviceType) => {
    switch (deviceType) {
      case 'ios':
        return <Smartphone className="h-5 w-5" />;
      case 'android':
        return <Smartphone className="h-5 w-5" />;
      case 'windows':
        return <Monitor className="h-5 w-5" />;
      case 'macos':
        return <Laptop className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slt-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading passkeys...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Passkey Management</h1>
          <p className="text-gray-600 text-lg">
            Manage your passkeys for secure biometric authentication
          </p>
        </div>

        {/* Biometric Detector */}
        <div className="mb-8">
          <BiometricDetector onCapabilitiesDetected={handleCapabilitiesDetected} />
        </div>

        {/* Passkey Support Status */}
        {!passkeySupported && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  Passkeys Not Supported
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Your device or browser doesn't support passkeys. You can still use password authentication.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Authentication Status */}
        {!token && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Authentication Required
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  You need to be logged in to manage passkeys. Please login first.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
              <p className="text-green-700">{success}</p>
            </div>
          </div>
        )}

        {/* Register New Passkey */}
        {passkeySupported && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Register New Passkey</h2>
                <p className="text-gray-600">
                  Add a new passkey to your account for secure biometric authentication
                </p>
                {biometricCapabilities && (
                  <p className="text-sm text-blue-600 mt-2">
                    🎯 Your device supports: {PasskeyService.getBiometricTypeDescription(biometricCapabilities)}
                  </p>
                )}
                {!token && (
                  <p className="text-sm text-red-600 mt-2">
                    ⚠️ You need to be logged in to register passkeys
                  </p>
                )}
              </div>
              <button
                onClick={handleRegisterPasskey}
                disabled={registering || !token}
                className="btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                title={!token ? "Please login first to register passkeys" : ""}
              >
                {registering ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span className="hidden sm:inline">Registering...</span>
                    <span className="sm:hidden">Registering</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Register Passkey</span>
                    <span className="sm:hidden">Register</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Passkeys List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Your Passkeys</h2>
          </div>
          
          {passkeys.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Key className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No passkeys found</p>
              <p className="text-sm">
                {passkeySupported 
                  ? "Register your first passkey to get started with secure biometric authentication."
                  : "Passkeys are not supported on your device."
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {passkeys.map((passkey) => (
                <div key={passkey._id} className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start sm:items-center">
                      <div className="text-2xl mr-3 flex-shrink-0">
                        {getDeviceTypeIcon(passkey.deviceType)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {passkey.deviceType === 'platform' ? 'Platform Passkey' : 'Security Key'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Created: {formatDate(passkey.createdAt)}
                        </p>
                        {passkey.lastUsed && (
                          <p className="text-sm text-gray-500">
                            Last used: {formatDate(passkey.lastUsed)}
                          </p>
                        )}
                        {passkey.transports && passkey.transports.length > 0 && (
                          <p className="text-xs text-gray-400 mt-1">
                            Transports: {passkey.transports.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeletePasskey(passkey._id)}
                      disabled={deleting === passkey._id}
                      className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-50 flex-shrink-0 self-start sm:self-center"
                      title="Delete passkey"
                    >
                      {deleting === passkey._id ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                      ) : (
                        <Trash2 className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Information Section */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* About Passkeys */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">About Passkeys</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Passkeys provide secure, passwordless authentication</li>
              <li>• They work with biometric authentication (fingerprint, face ID) or security keys</li>
              <li>• Each passkey is unique to your device and account</li>
              <li>• You can register multiple passkeys for different devices</li>
              <li>• Passkeys are more secure than traditional passwords</li>
            </ul>
          </div>

          {/* Security Benefits */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-800 mb-2">Security Benefits</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Phishing-resistant authentication</li>
              <li>• No passwords to remember or type</li>
              <li>• Works across all your devices</li>
              <li>• Industry-standard security protocols</li>
              <li>• Automatic backup and sync</li>
            </ul>
          </div>
        </div>

        {/* Mobile-Specific Tips */}
        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-purple-800 mb-2">💡 Mobile Tips</h3>
          <div className="text-sm text-purple-700 space-y-1">
            <p>• <strong>iOS:</strong> Use Touch ID or Face ID for quick authentication</p>
            <p>• <strong>Android:</strong> Use fingerprint sensor or face unlock</p>
            <p>• <strong>Desktop:</strong> Use Windows Hello or Touch ID on Mac</p>
            <p>• <strong>Cross-device:</strong> Passkeys sync securely across your devices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasskeyManagement;
