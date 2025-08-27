import React from 'react';

const Impersonation = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">User Impersonation</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Impersonate User</h2>
            <p className="text-gray-600 mb-6">
              Temporarily access the system as another user to provide support or troubleshoot issues.
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Security Warning</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>User impersonation is logged and monitored. Only use this feature for legitimate support purposes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search for User
              </label>
              <div className="flex space-x-4">
                <input 
                  type="text" 
                  placeholder="Enter username, email, or user ID"
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select User to Impersonate
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Choose a user...</option>
                <option value="user1">john.doe@example.com (John Doe)</option>
                <option value="user2">jane.smith@example.com (Jane Smith)</option>
                <option value="user3">bob.wilson@example.com (Bob Wilson)</option>
                <option value="user4">alice.johnson@example.com (Alice Johnson)</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Impersonation Duration
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="custom">Custom duration</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Impersonation
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select a reason...</option>
                  <option value="support">User Support</option>
                  <option value="troubleshooting">Troubleshooting</option>
                  <option value="training">User Training</option>
                  <option value="audit">Security Audit</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea 
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Provide additional details about why impersonation is needed..."
              ></textarea>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="confirm" 
                className="mr-3"
                required
              />
              <label htmlFor="confirm" className="text-sm text-gray-700">
                I confirm that I have legitimate authorization to impersonate this user and understand that all actions will be logged.
              </label>
            </div>
            
            <div className="flex space-x-4">
              <button 
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Start Impersonation
              </button>
              <button 
                type="button"
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        
        {/* Active Impersonations */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Active Impersonations</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">Currently impersonating: John Doe</h3>
                  <p className="text-sm text-gray-600">Reason: User Support</p>
                  <p className="text-sm text-gray-500">Started: Dec 15, 2023 14:30:22</p>
                  <p className="text-sm text-gray-500">Expires: Dec 15, 2023 15:30:22</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 text-sm hover:text-blue-800">
                    Extend
                  </button>
                  <button className="text-red-600 text-sm hover:text-red-800">
                    Stop
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Impersonation History */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Impersonations</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Started
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Jane Smith
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Troubleshooting
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Dec 14, 2023 10:15
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    45 minutes
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
                
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Bob Wilson
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    User Training
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Dec 13, 2023 16:30
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    1 hour
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impersonation; 