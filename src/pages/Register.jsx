import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Phone } from 'lucide-react';
import { getApiBaseUrl } from '../utils/config';

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

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) errors.email = 'Invalid email address';
    if (!formData.phone) errors.phone = 'Phone number is required';
    else if (!/^\+?\d{7,15}$/.test(formData.phone)) errors.phone = 'Invalid phone number';
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeToTerms) errors.agreeToTerms = 'You must agree to the Terms & Conditions';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    setError("");
    console.log('[Register] Submitting form data:', formData);
    try {
      const res = await fetch(`${getApiBaseUrl()}/auth/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });
      console.log('[Register] API response status:', res.status);
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Registration failed");
        setLoading(false);
        console.error('[Register] Registration failed:', data);
        return;
      }
      console.log('[Register] Registration successful');
      navigate('/login');
    } catch (err) {
      setError("Registration failed. Please try again later.");
      setLoading(false);
      console.error('[Register] Network or server error:', err);
    }
    setLoading(false);
  };

  return (
    <div className="auth-background flex items-center justify-center px-4">
      <div className="card-elevated max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slt-blue mb-2">Create Your IdentityHub Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Error Message */}
          {error && <div className="message-error text-sm text-center" role="alert">{error}</div>}
          {/* Full Name Input */}
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className={`input-field pl-10 ${formErrors.fullName ? 'border-red-500' : ''}`}
              required
              aria-invalid={!!formErrors.fullName}
              aria-describedby={formErrors.fullName ? 'fullName-error' : undefined}
            />
            {formErrors.fullName && <span id="fullName-error" className="text-red-500 text-xs absolute left-0 -bottom-5">{formErrors.fullName}</span>}
          </div>
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className={`input-field pl-10 ${formErrors.email ? 'border-red-500' : ''}`}
              required
              aria-invalid={!!formErrors.email}
              aria-describedby={formErrors.email ? 'email-error' : undefined}
              autoComplete="email"
            />
            {formErrors.email && <span id="email-error" className="text-red-500 text-xs absolute left-0 -bottom-5">{formErrors.email}</span>}
          </div>
          {/* Phone Input */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className={`input-field pl-10 ${formErrors.phone ? 'border-red-500' : ''}`}
              required
              aria-invalid={!!formErrors.phone}
              aria-describedby={formErrors.phone ? 'phone-error' : undefined}
            />
            {formErrors.phone && <span id="phone-error" className="text-red-500 text-xs absolute left-0 -bottom-5">{formErrors.phone}</span>}
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
              className={`input-field pl-10 pr-10 ${formErrors.password ? 'border-red-500' : ''}`}
              required
              aria-invalid={!!formErrors.password}
              aria-describedby={formErrors.password ? 'password-error' : undefined}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            {formErrors.password && <span id="password-error" className="text-red-600 text-xs absolute left-0 -bottom-5">{formErrors.password}</span>}
          </div>
          {/* Confirm Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className={`input-field pl-10 pr-10 ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
              required
              aria-invalid={!!formErrors.confirmPassword}
              aria-describedby={formErrors.confirmPassword ? 'confirmPassword-error' : undefined}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            {formErrors.confirmPassword && <span id="confirmPassword-error" className="text-red-600 text-xs absolute left-0 -bottom-5">{formErrors.confirmPassword}</span>}
          </div>
          {/* Terms Agreement Checkbox */}
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
            {formErrors.agreeToTerms && <span id="agreeToTerms-error" className="text-red-600 text-xs ml-2">{formErrors.agreeToTerms}</span>}
          </div>
          {/* Register Button */}
          <button
            type="submit"
            className="btn-secondary w-full flex items-center justify-center"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            ) : null}
            Register
          </button>
          {/* Login Link */}
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