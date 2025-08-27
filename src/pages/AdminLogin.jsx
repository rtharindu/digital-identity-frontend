import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const result = await loginAdmin(formData.email, formData.password);
      
      if (result.success) {
        navigate('/admin/search-users');
      } else {
        setError(result.error || "Admin login failed");
      }
    } catch (err) {
      setError("Admin login failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-background flex items-center justify-center px-4">
      <div className="card-elevated max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slt-blue mb-2">Admin Access</h1>
          <p className="text-gray-600">Secure administrator login portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && <div className="message-error text-sm text-center">{error}</div>}
          
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Administrator Email"
              required
              className="input-field pl-10"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Administrator Password"
              required
              className="input-field pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Warning Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Shield className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  This is a secure administrative area. All access attempts are logged and monitored.
                </p>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed bg-red-600 hover:bg-red-700"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Authenticating...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Shield className="h-4 w-4 mr-2" />
                Admin Login
              </div>
            )}
          </button>

          {/* Links */}
          <div className="text-center space-y-2">
            <Link
              to="/login"
              className="block text-slt-green hover:text-slt-green-600 transition-colors"
            >
              Regular User Login
            </Link>
            <div className="text-slt-blue text-sm">
              Need help?{' '}
              <Link
                to="/contact"
                className="text-slt-green hover:text-slt-green-600 transition-colors"
              >
                Contact IT Support
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;