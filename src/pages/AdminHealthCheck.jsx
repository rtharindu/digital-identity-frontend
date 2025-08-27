import React from 'react';

const AdminHealthCheck = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">System Health Check</h1>
        
        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Overall Status</p>
                <p className="text-2xl font-semibold text-gray-900">Healthy</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Response Time</p>
                <p className="text-2xl font-semibold text-gray-900">45ms</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Uptime</p>
                <p className="text-2xl font-semibold text-gray-900">99.9%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Last Check</p>
                <p className="text-2xl font-semibold text-gray-900">2 min ago</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Service Status */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Service Status</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Authentication Service</h3>
                  <p className="text-sm text-gray-600">User login and session management</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Operational</p>
                <p className="text-xs text-gray-500">Response: 12ms</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Database</h3>
                  <p className="text-sm text-gray-600">Primary data storage</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Operational</p>
                <p className="text-xs text-gray-500">Response: 8ms</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <h3 className="font-medium text-gray-900">Email Service</h3>
                  <p className="text-sm text-gray-600">Notification delivery</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Operational</p>
                <p className="text-xs text-gray-500">Response: 45ms</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <div>
                  <h3 className="font-medium text-gray-900">File Storage</h3>
                  <p className="text-sm text-gray-600">Document and media storage</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-yellow-800">Degraded</p>
                <p className="text-xs text-gray-500">Response: 120ms</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <h3 className="font-medium text-gray-900">API Gateway</h3>
                  <p className="text-sm text-gray-600">External API access</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Operational</p>
                <p className="text-xs text-gray-500">Response: 25ms</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* System Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Resource Usage</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">CPU Usage</span>
                  <span className="text-gray-900">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Memory Usage</span>
                  <span className="text-gray-900">62%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Disk Usage</span>
                  <span className="text-gray-900">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Network I/O</span>
                  <span className="text-gray-900">23%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Alerts</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">High disk usage detected</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Backup completed successfully</p>
                  <p className="text-xs text-gray-500">6 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Security scan completed</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Failed login attempts exceeded</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Health Check Actions</h2>
          
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Run Full Health Check
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Generate Report
            </button>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
              Test All Services
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
              View Logs
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
              Export Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHealthCheck; 