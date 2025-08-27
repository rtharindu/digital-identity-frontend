import React from 'react';

const RolesDelegate = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Role Delegation</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Delegate Your Roles</h2>
            <p className="text-gray-600 mb-6">
              Temporarily delegate your roles to another user. This allows them to act on your behalf for a specified period.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Role delegation grants temporary access to your permissions. The delegate will be able to perform actions as if they were you.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select User to Delegate To
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Choose a user...</option>
                <option value="user1">Alice Johnson (alice.johnson@example.com)</option>
                <option value="user2">Bob Wilson (bob.wilson@example.com)</option>
                <option value="user3">Carol Davis (carol.davis@example.com)</option>
                <option value="user4">David Brown (david.brown@example.com)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Role to Delegate
              </label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="checkbox" id="admin" className="mr-3" />
                  <label htmlFor="admin" className="text-sm text-gray-700">
                    <span className="font-medium">Administrator</span>
                    <span className="text-gray-500 ml-2">- Full system access</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="manager" className="mr-3" />
                  <label htmlFor="manager" className="text-sm text-gray-700">
                    <span className="font-medium">Manager</span>
                    <span className="text-gray-500 ml-2">- Team management access</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="user" className="mr-3" />
                  <label htmlFor="user" className="text-sm text-gray-700">
                    <span className="font-medium">User</span>
                    <span className="text-gray-500 ml-2">- Standard user access</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input 
                  type="datetime-local" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input 
                  type="datetime-local" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Delegation
              </label>
              <textarea 
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please provide a reason for this role delegation..."
              ></textarea>
            </div>
            
            <div className="flex space-x-4">
              <button 
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Delegate Role
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
        
        {/* Active Delegations */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Active Delegations</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">Delegated to: Alice Johnson</h3>
                  <p className="text-sm text-gray-600">Role: Manager</p>
                  <p className="text-sm text-gray-600">Reason: Vacation coverage</p>
                  <p className="text-sm text-gray-500">Dec 15, 2023 - Dec 22, 2023</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 text-sm hover:text-blue-800">
                    Edit
                  </button>
                  <button className="text-red-600 text-sm hover:text-red-800">
                    Revoke
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">Delegated to: Bob Wilson</h3>
                  <p className="text-sm text-gray-600">Role: User</p>
                  <p className="text-sm text-gray-600">Reason: Project handover</p>
                  <p className="text-sm text-gray-500">Dec 10, 2023 - Dec 20, 2023</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 text-sm hover:text-blue-800">
                    Edit
                  </button>
                  <button className="text-red-600 text-sm hover:text-red-800">
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesDelegate; 