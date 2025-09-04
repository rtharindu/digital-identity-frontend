import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Phone } from 'lucide-react';
import { getApiBaseUrl } from '../utils/config';

// Validation rules
const validationRules = {
  fullName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[A-Za-z\s]+$/,
    messages: {
      required: 'Full name is required',
      minLength: 'Full name must be at least 2 characters',
      pattern: 'Full name can contain only letters and spaces'
    }
  },
  email: {
    required: true,
    pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
    messages: {
      required: 'Email is required',
      pattern: 'Invalid email address'
    }
  },
  phone: {
    required: true,
    pattern: /^\d{10}$/,
    messages: {
      required: 'Phone number is required',
      pattern: 'Phone number must be exactly 10 digits'
    }
  },
  password: {
    required: true,
    minLength: 8,
    messages: {
      required: 'Password is required',
      minLength: 'Password must be at least 8 characters'
    }
  },
  confirmPassword: {
    required: true,
    messages: {
      required: 'Please confirm your password',
      mismatch: 'Passwords do not match'
    }
  },
  agreeToTerms: {
    required: true,
    messages: {
      required: 'You must agree to the Terms & Conditions'
    }
  }
};

// Validation helper functions
const validateField = (fieldName, value, formData = {}) => {
  const rule = validationRules[fieldName];
  if (!rule) return '';

  if (rule.required && !value) {
    return rule.messages.required;
  }

  if (rule.minLength && value.length < rule.minLength) {
    return rule.messages.minLength;
  }

  if (rule.pattern && !rule.pattern.test(value)) {
    return rule.messages.pattern;
  }

  if (fieldName === 'confirmPassword' && value !== formData.password) {
    return rule.messages.mismatch;
  }

  return '';
};

const validateForm = (formData) => {
  const errors = {};
  Object.keys(validationRules).forEach(fieldName => {
    const error = validateField(fieldName, formData[fieldName], formData);
    if (error) {
      errors[fieldName] = error;
    }
  });
  return errors;
};

// Form field component
const FormField = ({ 
  icon: Icon, 
  type, 
  name, 
  value, 
  onChange, 
  placeholder, 
  error, 
  required = false,
  pattern,
  maxLength,
  inputMode,
  autoComplete,
  children 
}) => (
  <div className="relative">
    <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input-field pl-10 ${error ? 'border-red-500' : ''}`}
      required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      pattern={pattern}
      maxLength={maxLength}
      inputMode={inputMode}
      autoComplete={autoComplete}
    />
    {children}
    {error && (
      <span id={`${name}-error`} className="text-red-500 text-xs absolute left-0 -bottom-5">
        {error}
      </span>
    )}
  </div>
);

// Password field component
const PasswordField = ({ 
  name, 
  value, 
  onChange, 
  placeholder, 
  error, 
  showPassword, 
  onTogglePassword,
  autoComplete 
}) => (
  <FormField
    icon={Lock}
    type={showPassword ? 'text' : 'password'}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    error={error}
    required
    autoComplete={autoComplete}
  >
    <button
      type="button"
      onClick={onTogglePassword}
      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
      tabIndex={-1}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
    </button>
  </FormField>
);

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await submitRegistration(formData);
      if (response.success) {
        navigate('/login');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Registration failed. Please try again later.");
      console.error('[Register] Network or server error:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitRegistration = async (data) => {
    const res = await fetch(`${getApiBaseUrl()}/auth/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, message: errorData.message || "Registration failed" };
    }

    return { success: true };
  };

  return (
    <div className="auth-background flex items-center justify-center px-4">
      <div className="card-elevated max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slt-blue mb-2">Create Your IdentityHub Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {error && (
            <div className="message-error text-sm text-center" role="alert">
              {error}
            </div>
          )}

          <FormField
            icon={User}
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            error={formErrors.fullName}
            required
            pattern="^[A-Za-z\s]{2,}$"
            maxLength={50}
          />

          <FormField
            icon={Mail}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            error={formErrors.email}
            required
            autoComplete="email"
          />

          <FormField
            icon={Phone}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            error={formErrors.phone}
            required
            inputMode="numeric"
            pattern="^\d{10}$"
            maxLength={10}
          />

          <PasswordField
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            error={formErrors.password}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            autoComplete="new-password"
          />

          <PasswordField
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            error={formErrors.confirmPassword}
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            autoComplete="new-password"
          />

          <div className="flex items-start">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className={`h-4 w-4 text-slt-green focus:ring-slt-green-500 border-gray-300 rounded mt-1 focus-ring ${formErrors.agreeToTerms ? 'border-red-500' : ''}`}
              aria-invalid={!!formErrors.agreeToTerms}
              aria-describedby={formErrors.agreeToTerms ? 'agreeToTerms-error' : undefined}
            />
            <label className="ml-2 block text-sm text-slt-blue">
              I agree to{' '}
              <Link
                to="/terms-and-conditions"
                className="text-slt-green hover:text-slt-green-600 transition-colors"
              >
                Terms & Conditions
              </Link>
            </label>
            {formErrors.agreeToTerms && (
              <span id="agreeToTerms-error" className="text-red-600 text-xs ml-2">
                {formErrors.agreeToTerms}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn-secondary w-full flex items-center justify-center"
            disabled={loading}
            aria-busy={loading}
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            )}
            Register
          </button>

          <div className="text-center">
            <div className="text-slt-blue">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-slt-green hover:text-slt-green-600 transition-colors"
              >
                Login here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register; 
