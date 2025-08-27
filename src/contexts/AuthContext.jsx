import React, { createContext, useContext, useState, useEffect } from 'react';
import PasskeyService from '../services/passkeyService';
import { getApiBaseUrl } from '../utils/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [passkeySupported, setPasskeySupported] = useState(false);

  // Check passkey support on mount
  useEffect(() => {
    const checkPasskeySupport = async () => {
      const supported = PasskeyService.isSupported() && 
                       await PasskeyService.isUserVerifyingPlatformAuthenticatorAvailable();
      setPasskeySupported(supported);
      console.log('Passkey support:', supported);
    };
    
    checkPasskeySupport();
  }, []);

  // Check if user is authenticated on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          // Verify token with backend
          const response = await fetch(`${getApiBaseUrl()}/auth/verify`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData.user);
            setToken(storedToken);
          } else {
            // Invalid token, remove it
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/auth/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);

              // Create device session
        try {
          const screen = `${window.screen.width}x${window.screen.height}`;
          const location = "Colombo, Sri Lanka"; // Or fetch via IP geolocation API
          
          await fetch(`${getApiBaseUrl()}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": navigator.userAgent
          },
          body: JSON.stringify({ 
            screenResolution: screen, 
            location,
            userId: data.user.id,
            userEmail: data.user.email,
            sessionToken: data.token.substring(0, 10),
            loginMethod: 'password'
          })
        });
      } catch (sessionErr) {
        console.error('Session creation failed:', sessionErr);
        // Don't block login for session creation failure
      }

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const loginWithPasskey = async (email) => {
    try {
      console.log('Attempting passkey login for:', email);
      
      if (!passkeySupported) {
        throw new Error('Passkeys are not supported on this device');
      }

      const result = await PasskeyService.authenticateWithPasskey(email);
      
      if (result.success) {
        // Store token and user data
        localStorage.setItem('token', result.token);
        setToken(result.token);
        setUser(result.user);

        // Create device session
        try {
          const screen = `${window.screen.width}x${window.screen.height}`;
          const location = "Passkey Authentication";
          
          await fetch(`${getApiBaseUrl()}/api/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "User-Agent": navigator.userAgent
            },
            body: JSON.stringify({ 
              screenResolution: screen, 
              location,
              userId: result.user.id,
              userEmail: result.user.email,
              sessionToken: result.token.substring(0, 10),
              loginMethod: 'passkey'
            })
          });
        } catch (sessionErr) {
          console.error('Session creation failed for passkey login:', sessionErr);
        }

        return { success: true, user: result.user };
      } else {
        throw new Error(result.error || 'Passkey authentication failed');
      }
    } catch (error) {
      console.error('Passkey login error:', error);
      return { success: false, error: error.message };
    }
  };

  const loginWithGoogle = () => {
    // Redirect to Google OAuth
    window.location.href = `${getApiBaseUrl()}/auth/google`;
  };

  const handleGoogleCallback = React.useCallback(async (token, userData) => {
    try {
      // Store token and user data
      localStorage.setItem('token', token);
      setToken(token);
      setUser(userData);

      // Create device session (only once)
      try {
        const screen = `${window.screen.width}x${window.screen.height}`;
        const location = "Google OAuth";
        
        // Add a small delay to prevent rapid successive calls
        await new Promise(resolve => setTimeout(resolve, 100));
        
        await fetch(`${getApiBaseUrl()}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": navigator.userAgent
            },
          body: JSON.stringify({ 
            screenResolution: screen, 
            location,
            userId: userData.id,
            userEmail: userData.email,
            sessionToken: token.substring(0, 10),
            loginMethod: 'google_oauth'
          })
        });
      } catch (sessionErr) {
        console.error('Session creation failed for Google OAuth:', sessionErr);
        // Don't block the callback for session creation failure
      }

      return { success: true, user: userData };
    } catch (error) {
      console.error('Google callback error:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const registerPasskey = async (email) => {
    try {
      if (!passkeySupported) {
        throw new Error('Passkeys are not supported on this device');
      }

      if (!token) {
        throw new Error('User not authenticated. Please login first.');
      }

      const result = await PasskeyService.registerPasskey(email, token);
      return { success: true, message: result.message };
    } catch (error) {
      console.error('Passkey registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const loginAdmin = async (email, password) => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Admin login failed');
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);

      // Create device session for admin
      try {
        const screen = `${window.screen.width}x${window.screen.height}`;
        const location = "Admin Portal"; 
        
        await fetch(`${getApiBaseUrl()}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": navigator.userAgent
          },
          body: JSON.stringify({ 
            screenResolution: screen, 
            location,
            userId: data.user.id,
            userEmail: data.user.email,
            sessionToken: data.token.substring(0, 10),
            loginMethod: 'admin_password'
          })
        });
      } catch (sessionErr) {
        console.error('Admin session creation failed:', sessionErr);
        // Don't block login for session creation failure
      }

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      // Logout all sessions for this user
      if (token) {
        await fetch(`${getApiBaseUrl()}/api/logout-all`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Session logout failed:', error);
      // Continue with logout even if session cleanup fails
    }
    
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user && !!token;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isUser = () => {
    return user?.role === 'user';
  };

  const value = {
    user,
    token,
    loading,
    passkeySupported,
    login,
    loginWithPasskey,
    loginWithGoogle,
    handleGoogleCallback,
    registerPasskey,
    loginAdmin,
    logout,
    isAuthenticated,
    isAdmin,
    isUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};