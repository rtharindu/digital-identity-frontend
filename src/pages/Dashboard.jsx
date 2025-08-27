import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, User, Smartphone, FileText, Activity, Settings, LogOut } from 'lucide-react';

const Dashboard = () => {
  const dashboardCards = [
    {
      title: 'Login Activity',
      description: 'View your recent login history and security events',
      icon: Activity,
      link: '/logs/login-history',
      color: 'bg-blue-500'
    },
    {
      title: 'Profile',
      description: 'Manage your personal information and preferences',
      icon: User,
      link: '/profile/view',
      color: 'bg-green-500'
    },
    {
      title: 'Devices',
      description: 'Monitor and manage your trusted devices',
      icon: Smartphone,
      link: '/devices/sessions',
      color: 'bg-purple-500'
    },
    {
      title: 'Consents',
      description: 'Review and update your privacy preferences',
      icon: FileText,
      link: '/consents/view',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-slt-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slt-blue-900 mb-2">
           Hellow, Welcome👋
          </h1>
          <p className="text-slt-blue-700">
            Manage your identity and security settings from your dashboard
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Link
                key={index}
                to={card.link}
                className="card hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="flex items-center mb-4">
                  <div className={`${card.color} p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slt-blue">{card.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{card.description}</p>
                <div className="flex items-center text-slt-green font-medium group-hover:translate-x-1 transition-transform">
                  View Details
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-slt-blue mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/account/change-password"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Shield className="h-5 w-5 text-slt-green mr-3" />
                <span className="text-slt-blue">Change Password</span>
              </Link>
              <Link
                to="/consents/manage"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FileText className="h-5 w-5 text-slt-green mr-3" />
                <span className="text-slt-blue">Update Consents</span>
              </Link>
              <Link
                to="/devices/trusted"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Smartphone className="h-5 w-5 text-slt-green mr-3" />
                <span className="text-slt-blue">Manage Devices</span>
              </Link>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-slt-blue mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-slt-blue">Login from Chrome PC</p>
                  <p className="text-xs text-gray-500">Colombo, Sri Lanka</p>
                </div>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-slt-blue">Password Changed</p>
                  <p className="text-xs text-gray-500">Security update</p>
                </div>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-slt-blue">Consent Updated</p>
                  <p className="text-xs text-gray-500">Marketing preferences</p>
                </div>
                <span className="text-xs text-gray-500">3 days ago</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-slt-blue mb-4">Account Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slt-blue">Account Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slt-blue">Last Login</span>
                <span className="text-sm text-gray-600">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slt-blue">Active Sessions</span>
                <span className="text-sm text-gray-600">2 devices</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slt-blue">Trusted Devices</span>
                <span className="text-sm text-gray-600">3 devices</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 