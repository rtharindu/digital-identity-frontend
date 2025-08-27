import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import { getApiBaseUrl, getRpId, getRpName } from '../utils/config';

class PasskeyService {
  // Check if passkeys are supported
  static isSupported() {
    return window.PublicKeyCredential && 
           PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable &&
           PublicKeyCredential.isConditionalMediationAvailable;
  }

  // Check if user verification is available (biometric support)
  static async isUserVerifyingPlatformAuthenticatorAvailable() {
    try {
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch (error) {
      console.error('Error checking platform authenticator availability:', error);
      return false;
    }
  }

  // Check if conditional mediation is available
  static async isConditionalMediationAvailable() {
    try {
      return await PublicKeyCredential.isConditionalMediationAvailable();
    } catch (error) {
      console.error('Error checking conditional mediation availability:', error);
      return false;
    }
  }

  // Enhanced biometric capability detection
  static async getBiometricCapabilities() {
    try {
      const capabilities = {
        fingerprint: false,
        face: false,
        iris: false,
        voice: false,
        platformAuthenticator: false,
        conditionalMediation: false
      };

      // Check platform authenticator (biometric support)
      capabilities.platformAuthenticator = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      
      // Check conditional mediation (auto-fill support)
      capabilities.conditionalMediation = await PublicKeyCredential.isConditionalMediationAvailable();

      // Detect biometric types based on device capabilities
      if (capabilities.platformAuthenticator) {
        // Check for specific biometric types
        if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
          // iOS devices typically support both Touch ID and Face ID
          capabilities.fingerprint = true;
          capabilities.face = true;
        } else if (navigator.userAgent.includes('Android')) {
          // Android devices vary, but most support fingerprint
          capabilities.fingerprint = true;
          // Face unlock availability varies by device
          capabilities.face = navigator.userAgent.includes('Samsung') || 
                            navigator.userAgent.includes('Google') ||
                            navigator.userAgent.includes('OnePlus');
        } else if (navigator.userAgent.includes('Windows')) {
          // Windows Hello supports fingerprint, face, and iris
          capabilities.fingerprint = true;
          capabilities.face = true;
          capabilities.iris = true;
        } else if (navigator.userAgent.includes('Mac')) {
          // macOS supports Touch ID and potentially Face ID on newer devices
          capabilities.fingerprint = true;
          capabilities.face = navigator.userAgent.includes('MacBook Pro') || 
                            navigator.userAgent.includes('MacBook Air');
        }
      }

      return capabilities;
    } catch (error) {
      console.error('Error detecting biometric capabilities:', error);
      return {
        fingerprint: false,
        face: false,
        iris: false,
        voice: false,
        platformAuthenticator: false,
        conditionalMediation: false
      };
    }
  }

  // Get user-friendly biometric type description
  static getBiometricTypeDescription(capabilities) {
    if (capabilities.face && capabilities.fingerprint) {
      return 'Fingerprint or Face ID';
    } else if (capabilities.face) {
      return 'Face ID';
    } else if (capabilities.fingerprint) {
      return 'Fingerprint';
    } else if (capabilities.iris) {
      return 'Iris Scan';
    } else if (capabilities.platformAuthenticator) {
      return 'Biometric Authentication';
    } else {
      return 'Security Key';
    }
  }

  // Register a new passkey with enhanced biometric options
  static async registerPasskey(email, token, options = {}) {
    try {
      console.log('Starting passkey registration for:', email);

      // Get registration options from server
      const optionsResponse = await fetch(`${getApiBaseUrl()}/passkey/register/options`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ 
          email,
          userVerification: 'required', // Require biometric verification
          authenticatorSelection: {
            authenticatorAttachment: 'platform', // Prefer platform authenticator (biometric)
            userVerification: 'required',
            requireResidentKey: true
          },
          ...options
        })
      });

      if (!optionsResponse.ok) {
        const error = await optionsResponse.json();
        throw new Error(error.error || 'Failed to get registration options');
      }

      const registrationOptions = await optionsResponse.json();
      console.log('Registration options received:', registrationOptions);

      // Start registration with enhanced options
      const credential = await startRegistration({
        ...registrationOptions,
        userVerification: 'required',
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required',
          requireResidentKey: true
        }
      });
      console.log('Registration credential created:', credential);

      // Verify registration with server
      const verificationResponse = await fetch(`${getApiBaseUrl()}/passkey/register/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ credential })
      });

      if (!verificationResponse.ok) {
        const error = await verificationResponse.json();
        console.error('Verification response error:', error);
        
        // Handle specific error cases
        if (error.code === 'SESSION_EXPIRED') {
          throw new Error('Registration session expired. Please try registering again.');
        }
        
        throw new Error(error.error || 'Failed to verify registration');
      }

      const result = await verificationResponse.json();
      console.log('Passkey registration successful');
      return result;
    } catch (error) {
      console.error('Passkey registration error:', error);
      throw error;
    }
  }

  // Authenticate with passkey with enhanced biometric support
  static async authenticateWithPasskey(email, options = {}) {
    try {
      console.log('Starting passkey authentication for:', email);

      // Get authentication options from server
      const optionsResponse = await fetch(`${getApiBaseUrl()}/passkey/authenticate/options`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          email,
          userVerification: 'required', // Require biometric verification
          ...options
        })
      });

      if (!optionsResponse.ok) {
        const error = await optionsResponse.json();
        // Handle specific error cases
        if (error.code === 'NO_PASSKEYS') {
          throw new Error('No passkeys found for this account. Please register a passkey first in your profile settings.');
        }
        if (error.code === 'USER_NOT_FOUND') {
          throw new Error('User account not found. Please check your email address.');
        }
        throw new Error(error.error || 'Failed to get authentication options');
      }

      const authOptions = await optionsResponse.json();
      console.log('Authentication options received:', authOptions);

      // Start authentication with enhanced options
      const credential = await startAuthentication({
        ...authOptions,
        userVerification: 'required'
      });
      console.log('Authentication credential created:', credential);

      // Verify authentication with server
      const verificationResponse = await fetch(`${getApiBaseUrl()}/passkey/authenticate/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ credential })
      });

      if (!verificationResponse.ok) {
        const error = await verificationResponse.json();
        throw new Error(error.error || 'Failed to verify authentication');
      }

      const result = await verificationResponse.json();
      console.log('Passkey authentication successful');
      return result;
    } catch (error) {
      console.error('Passkey authentication error:', error);
      throw error;
    }
  }

  // Get user's passkeys
  static async getUserPasskeys(token) {
    try {
      const response = await fetch(`${getApiBaseUrl()}/passkey/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch passkeys');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user passkeys:', error);
      throw error;
    }
  }

  // Delete a passkey
  static async deletePasskey(passkeyId, token) {
    try {
      const response = await fetch(`${getApiBaseUrl()}/passkey/user/${passkeyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete passkey');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting passkey:', error);
      throw error;
    }
  }

  // Check if device supports conditional mediation (auto-fill)
  static async supportsConditionalMediation() {
    try {
      return await PublicKeyCredential.isConditionalMediationAvailable();
    } catch (error) {
      console.error('Error checking conditional mediation:', error);
      return false;
    }
  }

  // Get device information for better user experience
  static getDeviceInfo() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    
    let deviceType = 'unknown';
    let deviceName = 'Unknown Device';
    
    if (userAgent.includes('iPhone')) {
      deviceType = 'ios';
      deviceName = 'iPhone';
    } else if (userAgent.includes('iPad')) {
      deviceType = 'ios';
      deviceName = 'iPad';
    } else if (userAgent.includes('Android')) {
      deviceType = 'android';
      if (userAgent.includes('Samsung')) {
        deviceName = 'Samsung Device';
      } else if (userAgent.includes('Google')) {
        deviceName = 'Google Pixel';
      } else {
        deviceName = 'Android Device';
      }
    } else if (userAgent.includes('Windows')) {
      deviceType = 'windows';
      deviceName = 'Windows PC';
    } else if (userAgent.includes('Mac')) {
      deviceType = 'macos';
      deviceName = 'Mac';
    } else if (userAgent.includes('Linux')) {
      deviceType = 'linux';
      deviceName = 'Linux PC';
    }
    
    return {
      type: deviceType,
      name: deviceName,
      platform,
      userAgent
    };
  }
}

export default PasskeyService;
