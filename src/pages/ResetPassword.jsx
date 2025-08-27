import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Key } from 'lucide-react';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!formData.verificationCode) {
      alert('Please enter the verification code');
      return;
    }
    // Handle password reset logic here
    console.log('Password reset:', formData);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slt-blue mb-2">Enter the Code & Reset Password</h1>
          <p className="text-slt-blue">
            Enter the verification code sent to your email/phone
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Verification Code Input */}
          <div className="relative">
            <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleInputChange}
              placeholder="Verification Code"
              className="input-field pl-10"
              required
            />
          </div>

          {/* New Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="New Password"
              className="input-field pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
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
              className="input-field pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            className="btn-secondary w-full"
          >
            Reset Password
          </button>

          {/* Back to Login Link */}
          <div className="text-center">
            <Link
              to="/login"
              className="text-mobitel-green hover:text-mobitel-green/80 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 