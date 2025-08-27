import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleGoogleCallback } = useAuth();
  const [status, setStatus] = useState('processing'); // 'processing', 'success', 'error'
  const [message, setMessage] = useState('Processing Google authentication...');
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const processCallback = async () => {
      // Prevent multiple executions
      if (hasProcessed || !isMounted) return;
      
      try {
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');
        const error = searchParams.get('error');

        if (error) {
          if (isMounted) {
            setStatus('error');
            setMessage(getErrorMessage(error));
            setHasProcessed(true);
          }
          return;
        }

        if (!token || !userParam) {
          if (isMounted) {
            setStatus('error');
            setMessage('Invalid authentication response from Google.');
            setHasProcessed(true);
          }
          return;
        }

        // Parse user data
        const userData = JSON.parse(decodeURIComponent(userParam));
        
        // Process the callback
        const result = await handleGoogleCallback(token, userData);
        
        if (!isMounted) return;
        
        if (result.success) {
          setStatus('success');
          setMessage('Google authentication successful! Redirecting to dashboard...');
          setHasProcessed(true);
          
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            if (isMounted) {
              navigate('/dashboard');
            }
          }, 2000);
        } else {
          setStatus('error');
          setMessage(result.error || 'Authentication failed.');
          setHasProcessed(true);
        }
      } catch (error) {
        console.error('Google callback processing error:', error);
        if (isMounted) {
          setStatus('error');
          setMessage('Failed to process authentication response.');
          setHasProcessed(true);
        }
      }
    };

    if (!hasProcessed) {
      processCallback();
    }

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [searchParams, handleGoogleCallback, navigate, hasProcessed]);

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

  const handleRetry = () => {
    navigate('/login');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="auth-background flex items-center justify-center px-4">
      <div className="card-elevated max-w-md w-full text-center">
        <div className="mb-6">
          {status === 'processing' && (
            <Loader2 className="h-12 w-12 text-slt-blue mx-auto mb-4 animate-spin" />
          )}
          {status === 'success' && (
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          )}
          {status === 'error' && (
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          )}
        </div>

        <h1 className="text-2xl font-bold text-slt-blue mb-4">
          {status === 'processing' && 'Processing Authentication'}
          {status === 'success' && 'Authentication Successful'}
          {status === 'error' && 'Authentication Failed'}
        </h1>

        <p className="text-gray-600 mb-6">{message}</p>

        {status === 'error' && (
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="btn-primary w-full"
            >
              Try Again
            </button>
            <button
              onClick={handleGoHome}
              className="w-full bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Go to Home
            </button>
          </div>
        )}

        {status === 'processing' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-700">
              Please wait while we complete your authentication...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-700">
              You will be redirected to your dashboard shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleCallback;
