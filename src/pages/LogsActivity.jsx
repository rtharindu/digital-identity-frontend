import React from 'react';

const LogsActivity = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Activity Logs</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">Profile Updated</p>
                    <p className="text-sm text-gray-600">Your profile information was modified</p>
                  </div>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">Password Changed</p>
                    <p className="text-sm text-gray-600">Your password was successfully updated</p>
                  </div>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">New Device Login</p>
                    <p className="text-sm text-gray-600">Login detected from a new device</p>
                  </div>
                  <span className="text-xs text-gray-500">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Custom range</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>All activities</option>
                  <option>Profile changes</option>
                  <option>Security events</option>
                  <option>Login events</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>All statuses</option>
                  <option>Success</option>
                  <option>Warning</option>
                  <option>Error</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogsActivity; 