import React from 'react';

const RolesManage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Create New Role
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Role List */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Roles</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div>
                    <h3 className="font-medium text-gray-900">Administrator</h3>
                    <p className="text-sm text-gray-600">Full system access</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    5 users
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium text-gray-900">Manager</h3>
                    <p className="text-sm text-gray-600">Team management access</p>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    12 users
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium text-gray-900">User</h3>
                    <p className="text-sm text-gray-600">Standard user access</p>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    45 users
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium text-gray-900">Guest</h3>
                    <p className="text-sm text-gray-600">Limited read-only access</p>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    8 users
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Role Details */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Administrator Role Details</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span className="text-sm text-gray-700">User Management</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span className="text-sm text-gray-700">Role Management</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span className="text-sm text-gray-700">System Settings</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span className="text-sm text-gray-700">Audit Logs</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span className="text-sm text-gray-700">Data Export</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span className="text-sm text-gray-700">API Access</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span className="text-sm text-gray-700">Security Settings</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span className="text-sm text-gray-700">Backup & Restore</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Users with this Role</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        JD
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                        <p className="text-xs text-gray-500">john.doe@example.com</p>
                      </div>
                    </div>
                    <button className="text-red-600 text-sm hover:text-red-800">
                      Remove
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        JS
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Jane Smith</p>
                        <p className="text-xs text-gray-500">jane.smith@example.com</p>
                      </div>
                    </div>
                    <button className="text-red-600 text-sm hover:text-red-800">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Save Changes
                </button>
                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesManage; 