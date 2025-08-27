import React from 'react';

const AdminBulkImport = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Bulk User Import</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Import Users</h2>
            <p className="text-gray-600 mb-6">
              Import multiple users at once using a CSV file. The file should contain user information in the specified format.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">CSV Format Requirements</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Required columns: First Name, Last Name, Email, Role, Department</p>
                    <p>Optional columns: Phone, Manager, Location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload CSV File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Choose File
                  </label>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".csv" />
                  <p className="text-sm text-gray-600 mt-2">or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">CSV files only, max 10MB</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Role
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Administrator</option>
                  <option value="guest">Guest</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Department
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">No default</option>
                  <option value="it">IT</option>
                  <option value="hr">Human Resources</option>
                  <option value="finance">Finance</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="send-welcome" className="mr-3" defaultChecked />
                <label htmlFor="send-welcome" className="text-sm text-gray-700">
                  Send welcome email to new users
                </label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="require-password" className="mr-3" />
                <label htmlFor="require-password" className="text-sm text-gray-700">
                  Require password change on first login
                </label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="skip-duplicates" className="mr-3" defaultChecked />
                <label htmlFor="skip-duplicates" className="text-sm text-gray-700">
                  Skip duplicate email addresses
                </label>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Import Users
              </button>
              <button 
                type="button"
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Download Template
              </button>
            </div>
          </form>
        </div>
        
        {/* Import History */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Import History</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users Processed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Success
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Errors
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Dec 15, 2023 14:30
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    new_users_2023.csv
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">25</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">23</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">View Details</button>
                  </td>
                </tr>
                
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Dec 14, 2023 09:15
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    department_update.csv
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">View Details</button>
                  </td>
                </tr>
                
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Dec 13, 2023 16:45
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    bulk_import.csv
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      Failed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">50</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">50</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">View Details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Sample CSV Format */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sample CSV Format</h2>
          <div className="bg-gray-50 rounded-md p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800">
{`First Name,Last Name,Email,Role,Department,Phone,Manager,Location
John,Doe,john.doe@example.com,User,IT,+1-555-0123,jane.smith@example.com,New York
Jane,Smith,jane.smith@example.com,Manager,HR,+1-555-0124,,San Francisco
Bob,Wilson,bob.wilson@example.com,User,Finance,+1-555-0125,jane.smith@example.com,Chicago
Alice,Johnson,alice.johnson@example.com,User,Marketing,+1-555-0126,jane.smith@example.com,Los Angeles`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBulkImport; 