import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Key, Smartphone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [passkeyLoading, setPasskeyLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, loginWithPasskey, loginWithGoogle, passkeySupported } = useAuth();

  // Handle Google OAuth callback errors
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      setError(getErrorMessage(error));
    }
  }, [searchParams]);

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'oauth_failed':
        return 'Google OAuth authentication failed. Please try again.';
      case 'no_user':
        return 'No user account found. Please register first.';
      case 'token_generation_failed':
        return 'Authentication token generation failed. Please try again.';
      default:
        return 'An error occurred during authentication.';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error and success messages when user starts typing
    if (error || success) {
      setError("");
      setSuccess("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("Login failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasskeyLogin = async () => {
    if (!formData.email) {
      setError("Please enter your email address to use passkey authentication");
      setSuccess(""); // Clear any success message
      return;
    }

    setError("");
    setSuccess(""); // Clear any previous messages
    setPasskeyLoading(true);
    
    try {
      const result = await loginWithPasskey(formData.email);
      
      if (result.success) {
        setSuccess("Passkey authentication successful! Redirecting...");
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setError(result.error || "Passkey authentication failed");
        setSuccess(""); // Clear any success message
      }
    } catch (err) {
      // Handle specific error cases
      if (err.message.includes('No passkeys found')) {
        setError("No passkeys found for this account. Please register a passkey first in your profile settings.");
      } else if (err.message.includes('User account not found') || err.message.includes('User not found')) {
        setError("Account not found. Please check your email address or create a new account.");
      } else if (err.message.includes('Failed to get authentication options')) {
        setError("Unable to start passkey authentication. Please try again or use password login.");
      } else {
        setError("Passkey authentication failed. Please try again later.");
      }
      setSuccess(""); // Clear any success message
    } finally {
      setPasskeyLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    
    try {
      loginWithGoogle();
    } catch (err) {
      setError("Google OAuth failed. Please try again later.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-background flex items-center justify-center px-4 py-8 min-h-screen">
      <div className="card-elevated max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slt-blue mb-2">Login to IdentityHub</h1>
          <p className="text-sm md:text-base text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-slt-green hover:text-slt-green-600 font-medium">
              Create one here
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 min-w-0 flex-1">
                  <p className="text-sm text-red-700 break-words">{error}</p>
                  {error.includes('No passkeys found') && (
                    <div className="mt-2 text-xs text-red-600">
                      💡 <strong>Tip:</strong> You can still login with your password, or 
                      <Link to="/passkeys" className="text-red-700 hover:text-red-800 font-medium ml-1">
                        register a passkey in Passkey Management
                      </Link>
                    </div>
                  )}
                  {error.includes('Account not found') && (
                    <div className="mt-2 text-xs text-red-600">
                      💡 <strong>Tip:</strong> If you don't have an account yet, 
                      <Link to="/register" className="text-red-700 hover:text-red-800 font-medium ml-1">
                        create one here
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Email/Username Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email or Username"
              className="input-field pl-10 w-full"
              required
              autoComplete="email"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="input-field pl-10 pr-10 w-full"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="h-4 w-4 text-slt-green focus:ring-slt-green-500 border-gray-300 rounded focus-ring"
            />
            <label className="ml-2 block text-sm text-slt-blue">
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                <span className="hidden sm:inline">Logging in...</span>
                <span className="sm:hidden">Logging in</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span className="hidden sm:inline">Login with Password</span>
                <span className="sm:hidden">Login</span>
              </div>
            )}
          </button>

          {/* Passkey Login Button */}
          {passkeySupported && (
            <>
              {/* Passkey Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Key className="h-5 w-5 text-blue-600 mt-0.5" />
                  </div>
                  <div className="ml-3 min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-blue-800">Passkey Authentication</h3>
                    <p className="text-xs text-blue-700 mt-1">
                      Use biometric authentication or security keys for secure login. 
                      <Link to="/profile" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                        Register your first passkey here
                      </Link>
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Don't have an account? <Link to="/register" className="text-blue-700 hover:text-blue-800 font-medium">
                        Create one first
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePasskeyLogin}
                disabled={passkeyLoading || !formData.email}
                className="w-full bg-slt-green text-white px-6 py-3 rounded-lg font-medium hover:bg-slt-green-600 transition-colors flex items-center justify-center focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
                title={!formData.email ? "Please enter your email first" : ""}
              >
                {passkeyLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span className="hidden sm:inline">Authenticating...</span>
                    <span className="sm:hidden">Authenticating</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Key className="w-5 h-5 mr-2" />
                    <span className="hidden sm:inline">Login with Passkey</span>
                    <span className="sm:hidden">Passkey Login</span>
                  </div>
                )}
              </button>
              
              {/* Passkey Help Message */}
              <div className="text-xs text-gray-500 text-center">
                Don't have a passkey? <Link to="/profile" className="text-slt-green hover:text-slt-green-600">Register one in your profile</Link>
              </div>
            </>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full bg-white text-slt-blue border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slt-blue mr-2"></div>
                  <span className="hidden sm:inline">Connecting...</span>
                  <span className="sm:hidden">Connecting</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="hidden sm:inline">Login with Google</span>
                  <span className="sm:hidden">Google Login</span>
                </div>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => setError("eGov authentication is not yet implemented")}
              className="w-full bg-white text-slt-blue border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center focus-ring"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Login with eGov</span>
              <span className="sm:hidden">eGov Login</span>
            </button>
          </div>

          {/* Authentication Methods Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Available Authentication Methods:</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Password-based authentication</li>
              {passkeySupported && <li>• Passkey (biometric/security key)</li>}
              <li>• Google OAuth 2.0</li>
              <li>• eGov (coming soon)</li>
            </ul>
          </div>

          {/* Links */}
          <div className="text-center space-y-2">
            <Link
              to="/forgot-password"
              className="block text-slt-green hover:text-slt-green-600 transition-colors"
            >
              Forgot password?
            </Link>
            <div className="text-slt-blue">
              No account?{' '}
              <Link
                to="/register"
                className="text-slt-green hover:text-slt-green-600 transition-colors"
              >
                Register here
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-800 mb-2">Need Help?</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p>• <strong>New User?</strong> Create an account first, then set up passkeys</p>
              <p>• <strong>Forgot Password?</strong> Use the password reset option above</p>
              <p>• <strong>Passkey Issues?</strong> Make sure your device supports biometric authentication</p>
              <p>• <strong>Account Locked?</strong> Contact support if you're having trouble</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 