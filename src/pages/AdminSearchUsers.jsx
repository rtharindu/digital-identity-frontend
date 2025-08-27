import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Search, Filter, Download, Eye, Edit, Trash2, User, Shield, Clock, Activity } from 'lucide-react';
import { getApiBaseUrl } from '../utils/config';

const AdminSearchUsers = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({});
  const [filters, setFilters] = useState({
    searchTerm: '',
    role: '',
    status: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    usersPerPage: 10
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // Fetch user statistics
  const fetchStats = async () => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/admin/users/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  // Search users
  const searchUsers = async () => {
    setLoading(true);
    setError('');
    
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`${getApiBaseUrl()}/admin/users/search?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to search users (${response.status})`);
      }

      const data = await response.json();
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  // Get user details
  const getUserDetails = async (userId) => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/admin/users/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get user details (${response.status})`);
      }

      const data = await response.json();
      setSelectedUser(data.user);
      setShowUserModal(true);
    } catch (err) {
      console.error('Get user details error:', err);
      setError(err.message || 'Failed to get user details');
    }
  };

  // Update user role
  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/admin/users/user/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });

      if (!response.ok) {
        throw new Error(`Failed to update user role (${response.status})`);
      }

      // Refresh the user list
      searchUsers();
      fetchStats();
    } catch (err) {
      console.error('Update role error:', err);
      setError(err.message || 'Failed to update user role');
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${getApiBaseUrl()}/admin/users/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user (${response.status})`);
      }

      // Refresh the user list
      searchUsers();
      fetchStats();
    } catch (err) {
      console.error('Delete user error:', err);
      setError(err.message || 'Failed to delete user');
    }
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      role: '',
      status: '',
      page: 1,
      limit: 10
    });
  };

  // Export results
  const exportResults = () => {
    const csvContent = [
      ['Email', 'Role', 'Status', 'Last Login', 'Active Sessions', 'Created At'],
      ...users.map(user => [
        user.email,
        user.role,
        user.status,
        user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never',
        user.activeSessions,
        new Date(user.createdAt).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `${diffMinutes} minutes ago`;
      }
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Get initials for avatar
  const getInitials = (email) => {
    return email.substring(0, 2).toUpperCase();
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get role color
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'user': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    searchUsers();
    fetchStats();
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Search, view, and manage system users</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-gray-900">{stats.adminUsers || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Regular Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.regularUsers || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeSessions || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Logins</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayLogins || 0}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Search Users
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Term
              </label>
              <input 
                type="text" 
                placeholder="Email address"
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select 
                value={filters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All roles</option>
                <option value="admin">Administrator</option>
                <option value="user">User</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select 
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Results per page
              </label>
              <select 
                value={filters.limit}
                onChange={(e) => handleFilterChange('limit', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={searchUsers}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              <Search className="h-4 w-4 mr-2" />
              {loading ? 'Searching...' : 'Search'}
            </button>
            <button 
              onClick={clearFilters}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </button>
            <button 
              onClick={exportResults}
              disabled={users.length === 0}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {/* Search Results */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Search Results</h2>
              <span className="text-sm text-gray-600">
                Showing {((pagination.currentPage - 1) * pagination.usersPerPage) + 1}-
                {Math.min(pagination.currentPage * pagination.usersPerPage, pagination.totalUsers)} 
                of {pagination.totalUsers} users
              </span>
            </div>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No users found matching your criteria</p>
            </div>
          ) : (
            <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Active Sessions
                      </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {getInitials(user.email)}
                      </div>
                      <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.profile?.fullName || 'No name set'}
                              </div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                            {user.role === 'admin' ? 'Administrator' : 'User'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                    </span>
                  </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(user.lastLogin)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.activeSessions}
                        </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                            <button 
                              onClick={() => getUserDetails(user._id)}
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </button>
                            <select
                              value={user.role}
                              onChange={(e) => updateUserRole(user._id, e.target.value)}
                              className="text-green-600 hover:text-green-900 border-none bg-transparent cursor-pointer"
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </select>
                            <button 
                              onClick={() => deleteUser(user._id)}
                              className="text-red-600 hover:text-red-900 flex items-center"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </button>
                    </div>
                  </td>
                </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing {((pagination.currentPage - 1) * pagination.usersPerPage) + 1} to{' '}
                      {Math.min(pagination.currentPage * pagination.usersPerPage, pagination.totalUsers)} of{' '}
                      {pagination.totalUsers} results
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 text-sm border rounded-md ${
                              page === pagination.currentPage
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                      
                      <button 
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                      </div>
              )}
            </>
          )}
                      </div>
                    </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">User Details</h3>
              <button 
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
                    </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Basic Information</h4>
                <div className="mt-2 space-y-2">
                  <p><span className="font-medium">Email:</span> {selectedUser.email}</p>
                  <p><span className="font-medium">Role:</span> {selectedUser.role}</p>
                  <p><span className="font-medium">Created:</span> {new Date(selectedUser.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
              
              {selectedUser.profile && (
                <div>
                  <h4 className="font-medium text-gray-900">Profile Information</h4>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Full Name:</span> {selectedUser.profile.fullName || 'Not set'}</p>
                    <p><span className="font-medium">Phone:</span> {selectedUser.profile.phone || 'Not set'}</p>
                    <p><span className="font-medium">Location:</span> {selectedUser.profile.location || 'Not set'}</p>
                    <p><span className="font-medium">Bio:</span> {selectedUser.profile.bio || 'Not set'}</p>
                    </div>
          </div>
              )}
              
              <div>
                <h4 className="font-medium text-gray-900">Recent Login History</h4>
                <div className="mt-2 space-y-1">
                  {selectedUser.loginHistory && selectedUser.loginHistory.length > 0 ? (
                    selectedUser.loginHistory.slice(0, 5).map((login, index) => (
                      <p key={index} className="text-sm">
                        {new Date(login.timestamp).toLocaleString()} - {login.status}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No login history available</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">Active Sessions</h4>
                <div className="mt-2 space-y-1">
                  {selectedUser.activeSessions && selectedUser.activeSessions.length > 0 ? (
                    selectedUser.activeSessions.map((session, index) => (
                      <p key={index} className="text-sm">
                        {session.device} - {session.browser} ({session.location})
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No active sessions</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSearchUsers; 