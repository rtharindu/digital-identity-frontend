import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle } from 'lucide-react';
import { getApiBaseUrl } from '../utils/config';

const POLL_INTERVAL = 5000; // Refresh every 5 seconds

const LogsLoginHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token, isAdmin } = useAuth();

  const fetchHistory = async () => {
    setError("");
    try {
      if (!token) {
        throw new Error("Authentication required");
      }

      const res = await fetch(`${getApiBaseUrl()}/logs/login-history`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      }
      
      if (res.status === 403) {
        throw new Error("Access denied. Admin privileges required to view login history.");
      }
      
      if (!res.ok) {
        throw new Error(`Failed to fetch login history (${res.status})`);
      }
      
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      setError(err.message || "Error fetching data");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      fetchHistory();
      const interval = setInterval(fetchHistory, POLL_INTERVAL);
      return () => clearInterval(interval);
    } else {
      setError("Authentication required");
      setLoading(false);
    }
  }, [token]);

  if (error && (error.includes("Authentication") || error.includes("Access denied"))) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          {!isAdmin() && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-700 text-sm">
                <strong>Note:</strong> Login history is currently restricted to administrators only.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Login History</h1>
          <p className="text-gray-600 mt-2">
            {isAdmin() ? "System-wide login activity" : "Your recent login activity"}
          </p>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Login Attempts</h2>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slt-blue-600 mx-auto mb-4"></div>
                Loading login history...
              </div>
            ) : error ? (
              <div className="p-6 text-center">
                <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-red-500">{error}</div>
                <button 
                  onClick={fetchHistory}
                  className="mt-4 px-4 py-2 bg-slt-blue-600 text-white rounded hover:bg-slt-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {history.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No login history found.</td>
                    </tr>
                  ) : (
                    history.map((item, idx) => (
                      <tr key={item._id || idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(item.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.ip || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogsLoginHistory;
