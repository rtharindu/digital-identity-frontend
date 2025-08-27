import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);
  const toggleAdminDropdown = () => setIsAdminDropdownOpen(!isAdminDropdownOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserDropdownOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-slt-blue-900 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold hover:text-slt-blue-200 transition-colors">
              IdentityHub
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={clsx(
                  'nav-link px-3 py-2 rounded-md text-sm font-medium',
                  isActive('/') && 'nav-link-active'
                )}
              >
                Home
              </Link>
              
              {/* Authenticated user links */}
              {isAuthenticated() && (
                <>
                  <Link
                    to="/dashboard"
                    className={clsx(
                      'nav-link px-3 py-2 rounded-md text-sm font-medium',
                      isActive('/dashboard') && 'nav-link-active'
                    )}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile/view"
                    className={clsx(
                      'nav-link px-3 py-2 rounded-md text-sm font-medium',
                      isActive('/profile/view') && 'nav-link-active'
                    )}
                  >
                    Profile
                  </Link>
                </>
              )}
              
              {/* Admin-only dropdown */}
              {isAdmin() && (
                <div className="relative">
                  <button
                    onClick={toggleAdminDropdown}
                    className="nav-link px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    Admin
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {isAdminDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <Link
                        to="/admin/search-users"
                        className="block px-4 py-2 text-sm text-slt-blue hover:bg-slt-blue-50 transition-colors"
                      >
                        User Management
                      </Link>
                      <Link
                        to="/roles/manage"
                        className="block px-4 py-2 text-sm text-slt-blue hover:bg-slt-blue-50 transition-colors"
                      >
                        Role Management
                      </Link>
                      <Link
                        to="/admin/bulk-import"
                        className="block px-4 py-2 text-sm text-slt-blue hover:bg-slt-blue-50 transition-colors"
                      >
                        Bulk Import
                      </Link>
                      <Link
                        to="/admin/health-check"
                        className="block px-4 py-2 text-sm text-slt-blue hover:bg-slt-blue-50 transition-colors"
                      >
                        Health Check
                      </Link>
                      <Link
                        to="/impersonation"
                        className="block px-4 py-2 text-sm text-slt-blue hover:bg-slt-blue-50 transition-colors"
                      >
                        Impersonation
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Public links for non-authenticated users */}
              {!isAuthenticated() && (
                <>
                  <Link
                    to="/login"
                    className={clsx(
                      'nav-link px-3 py-2 rounded-md text-sm font-medium',
                      isActive('/login') && 'nav-link-active'
                    )}
                  >
                    Login
                  </Link>
                  <Link
                    to="/admin/login"
                    className={clsx(
                      'nav-link px-3 py-2 rounded-md text-sm font-medium border border-red-400 text-red-400 hover:bg-red-50',
                      isActive('/admin/login') && 'bg-red-50 text-red-600'
                    )}
                  >
                    Admin
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* User Dropdown - Only show if authenticated */}
          {isAuthenticated() && (
            <div className="hidden md:block">
              <div className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="nav-link px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  {user?.email || 'User'}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b">
                      Role: {user?.role}
                    </div>
                    <Link
                      to="/profile/view"
                      className="block px-4 py-2 text-sm text-slt-blue hover:bg-slt-blue-50 transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/passkeys"
                      className="block px-4 py-2 text-sm text-slt-blue hover:bg-slt-blue-50 transition-colors"
                    >
                      Passkey Management
                    </Link>
                    <Link
                      to="/account/change-password"
                      className="block px-4 py-2 text-sm text-slt-blue hover:bg-slt-blue-50 transition-colors"
                    >
                      Change Password
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-slt-blue-200 focus:outline-none focus:text-slt-blue-200 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slt-blue-900">
            <Link
              to="/"
              className={clsx(
                'nav-link block px-3 py-2 rounded-md text-base font-medium',
                isActive('/') && 'nav-link-active'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Authenticated user links */}
            {isAuthenticated() && (
              <>
                <Link
                  to="/dashboard"
                  className={clsx(
                    'nav-link block px-3 py-2 rounded-md text-base font-medium',
                    isActive('/dashboard') && 'nav-link-active'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile/view"
                  className={clsx(
                    'nav-link block px-3 py-2 rounded-md text-base font-medium',
                    isActive('/profile/view') && 'nav-link-active'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/passkeys"
                  className={clsx(
                    'nav-link block px-3 py-2 rounded-md text-base font-medium',
                    isActive('/passkeys') && 'nav-link-active'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Passkey Management
                </Link>
              </>
            )}
            
            {/* Admin-only links */}
            {isAdmin() && (
              <Link
                to="/admin/search-users"
                className={clsx(
                  'nav-link block px-3 py-2 rounded-md text-base font-medium',
                  isActive('/admin/search-users') && 'nav-link-active'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Panel
              </Link>
            )}
            
            {/* Authentication-based actions */}
            {isAuthenticated() ? (
              <button
                onClick={handleLogout}
                className="nav-link block px-3 py-2 rounded-md text-base font-medium text-red-400 w-full text-left"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className={clsx(
                    'nav-link block px-3 py-2 rounded-md text-base font-medium',
                    isActive('/login') && 'nav-link-active'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/admin/login"
                  className={clsx(
                    'nav-link block px-3 py-2 rounded-md text-base font-medium border border-red-400 text-red-400',
                    isActive('/admin/login') && 'bg-red-50 text-red-600'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 