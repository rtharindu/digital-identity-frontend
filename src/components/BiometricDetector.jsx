import React, { useState, useEffect } from 'react';
import { Fingerprint, Eye, Smartphone, Monitor, Laptop, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import PasskeyService from '../services/passkeyService';

const BiometricDetector = ({ onCapabilitiesDetected }) => {
  const [capabilities, setCapabilities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    detectCapabilities();
  }, []);

  const detectCapabilities = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get biometric capabilities
      const bioCapabilities = await PasskeyService.getBiometricCapabilities();
      setCapabilities(bioCapabilities);

      // Get device information
      const device = PasskeyService.getDeviceInfo();
      setDeviceInfo(device);

      // Notify parent component
      if (onCapabilitiesDetected) {
        onCapabilitiesDetected(bioCapabilities, device);
      }
    } catch (err) {
      setError('Failed to detect biometric capabilities');
      console.error('Biometric detection error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDeviceIcon = (deviceType) => {
    switch (deviceType) {
      case 'ios':
        return <Smartphone className="h-6 w-6" />;
      case 'android':
        return <Smartphone className="h-6 w-6" />;
      case 'windows':
        return <Monitor className="h-6 w-6" />;
      case 'macos':
        return <Laptop className="h-6 w-6" />;
      default:
        return <Monitor className="h-6 w-6" />;
    }
  };

  const getBiometricIcon = (type) => {
    switch (type) {
      case 'fingerprint':
        return <Fingerprint className="h-5 w-5" />;
      case 'face':
        return <Eye className="h-5 w-5" />;
      case 'iris':
        return <Eye className="h-5 w-5" />;
      default:
        return <Fingerprint className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-blue-800">Detecting biometric capabilities...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <XCircle className="h-5 w-5 text-red-600 mr-2" />
          <span className="text-red-800">{error}</span>
        </div>
      </div>
    );
  }

  if (!capabilities) {
    return null;
  }

  const hasBiometricSupport = capabilities.platformAuthenticator;
  const biometricTypes = [];
  
  if (capabilities.fingerprint) biometricTypes.push('Fingerprint');
  if (capabilities.face) biometricTypes.push('Face ID');
  if (capabilities.iris) biometricTypes.push('Iris Scan');

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-center mb-4">
        {getDeviceIcon(deviceInfo?.type)}
        <div className="ml-3">
          <h3 className="text-lg font-semibold text-blue-900">
            {deviceInfo?.name} Biometric Support
          </h3>
          <p className="text-sm text-blue-700">
            {hasBiometricSupport ? 'Your device supports secure biometric authentication' : 'Limited biometric support detected'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Platform Authenticator Support */}
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Platform Authenticator</span>
            {capabilities.platformAuthenticator ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {capabilities.platformAuthenticator 
              ? 'Your device can use built-in biometric sensors'
              : 'No built-in biometric support detected'
            }
          </p>
        </div>

        {/* Conditional Mediation Support */}
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Auto-fill Support</span>
            {capabilities.conditionalMediation ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {capabilities.conditionalMediation 
              ? 'Passkeys can auto-fill login forms'
              : 'Manual passkey selection required'
            }
          </p>
        </div>
      </div>

      {/* Biometric Types */}
      {hasBiometricSupport && biometricTypes.length > 0 && (
        <div className="mt-4 bg-white rounded-lg p-4 border border-blue-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Available Biometric Methods:</h4>
          <div className="flex flex-wrap gap-2">
            {biometricTypes.map((type, index) => (
              <div key={index} className="flex items-center bg-green-50 text-green-700 px-3 py-2 rounded-full text-sm">
                {getBiometricIcon(type.toLowerCase().replace(' ', ''))}
                <span className="ml-2">{type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Recommendations</h4>
            <ul className="text-xs text-yellow-700 mt-1 space-y-1">
              {hasBiometricSupport ? (
                <>
                  <li>• Enable biometric authentication in your device settings</li>
                  <li>• Register a passkey for the best security experience</li>
                  <li>• Keep your device's biometric data up to date</li>
                </>
              ) : (
                <>
                  <li>• Consider using a security key for enhanced security</li>
                  <li>• Ensure your device supports modern authentication standards</li>
                  <li>• Update your browser to the latest version</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiometricDetector;
