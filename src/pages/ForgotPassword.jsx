import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email or phone number');
      return;
    }
    // Handle password reset logic here
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md w-full text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-mobitel-green rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slt-blue mb-2">Check Your Email</h1>
            <p className="text-slt-blue">
              We've sent a verification code to <strong>{email}</strong>
            </p>
          </div>
          <Link
            to="/reset-password"
            className="btn-secondary w-full"
          >
            Enter Verification Code
          </Link>
          <div className="mt-4">
            <Link
              to="/login"
              className="text-mobitel-green hover:text-mobitel-green/80 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slt-blue mb-2">Reset Your Password</h1>
          <p className="text-slt-blue">
            Enter your email or phone number to receive a verification code
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email/Phone Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Phone Number"
              className="input-field pl-10"
              required
            />
          </div>

          {/* Send Verification Code Button */}
          <button
            type="submit"
            className="btn-secondary w-full"
          >
            Send Verification Code
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

export default ForgotPassword; 