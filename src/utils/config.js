// Configuration utility for environment variables
export const validateConfig = () => {
  const errors = [];
  const warnings = [];

  // Check required environment variables
  if (!process.env.REACT_APP_API_BASE_URL) {
    errors.push('REACT_APP_API_BASE_URL is required');
  }

  if (!process.env.REACT_APP_RP_ID) {
    warnings.push('REACT_APP_RP_ID is not set - passkey functionality may not work');
  }

  if (!process.env.REACT_APP_RP_NAME) {
    warnings.push('REACT_APP_RP_NAME is not set - using default');
  }

  // Log warnings
  if (warnings.length > 0) {
    console.warn('⚠️ Configuration warnings:', warnings);
  }

  // Log errors and throw if critical
  if (errors.length > 0) {
    console.error('❌ Configuration errors:', errors);
    throw new Error(`Missing required environment variables: ${errors.join(', ')}`);
  }

  return true;
};

// Get API base URL with validation
export const getApiBaseUrl = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  if (!apiUrl) {
    throw new Error('REACT_APP_API_BASE_URL environment variable is required');
  }
  return apiUrl;
};

// Get RP ID with validation
export const getRpId = () => {
  return process.env.REACT_APP_RP_ID || '';
};

// Get RP Name with validation
export const getRpName = () => {
  return process.env.REACT_APP_RP_NAME || 'Digital Identity Hub';
};

// Validate configuration on app startup
export const initializeConfig = () => {
  try {
    validateConfig();
    console.log('✅ Configuration validated successfully');
    console.log('🌐 API Base URL:', getApiBaseUrl());
    console.log('🔑 RP ID:', getRpId());
    console.log('🏷️  RP Name:', getRpName());
    return true;
  } catch (error) {
    console.error('❌ Configuration validation failed:', error.message);
    return false;
  }
};
