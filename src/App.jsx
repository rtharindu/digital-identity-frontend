import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import ProfileView from './pages/ProfileView';
import ProfileEdit from './pages/ProfileEdit';
import ConsentsView from './pages/ConsentsView';
import ConsentsManage from './pages/ConsentsManage';
import DevicesSessions from './pages/DevicesSessions';
import DevicesTrusted from './pages/DevicesTrusted';
import AccountChangePassword from './pages/AccountChangePassword';
import AccountDelete from './pages/AccountDelete';
import LogsActivity from './pages/LogsActivity';
import LogsLoginHistory from './pages/LogsLoginHistory';
import RolesManage from './pages/RolesManage';
import RolesDelegate from './pages/RolesDelegate';
import Impersonation from './pages/Impersonation';
import AdminSearchUsers from './pages/AdminSearchUsers';
import AdminBulkImport from './pages/AdminBulkImport';
import AdminHealthCheck from './pages/AdminHealthCheck';
import TermsAndConditions from './pages/TermsAndConditions';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import GoogleCallback from './pages/GoogleCallback';
import PasskeyManagement from './pages/PasskeyManagement';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              
              {/* Google OAuth callback route */}
              <Route path="/auth/google/callback" element={<GoogleCallback />} />
              
              {/* Admin login route */}
              <Route 
                path="/admin/login" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <AdminLogin />
                  </ProtectedRoute>
                } 
              />
              
              {/* Auth routes - redirect to dashboard if already logged in */}
              <Route 
                path="/login" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Login />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Register />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/forgot-password" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <ForgotPassword />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reset-password" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <ResetPassword />
                  </ProtectedRoute>
                } 
              />

              {/* Protected user routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile/view" 
                element={
                  <ProtectedRoute>
                    <ProfileView />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile/edit" 
                element={
                  <ProtectedRoute>
                    <ProfileEdit />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/consents/view" 
                element={
                  <ProtectedRoute>
                    <ConsentsView />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/consents/manage" 
                element={
                  <ProtectedRoute>
                    <ConsentsManage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/devices/sessions" 
                element={
                  <ProtectedRoute>
                    <DevicesSessions />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/devices/trusted" 
                element={
                  <ProtectedRoute>
                    <DevicesTrusted />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/account/change-password" 
                element={
                  <ProtectedRoute>
                    <AccountChangePassword />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/account/delete" 
                element={
                  <ProtectedRoute>
                    <AccountDelete />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/passkeys" 
                element={
                  <ProtectedRoute>
                    <PasskeyManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/logs/activity" 
                element={
                  <ProtectedRoute>
                    <LogsActivity />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/logs/login-history" 
                element={
                  <ProtectedRoute>
                    <LogsLoginHistory />
                  </ProtectedRoute>
                } 
              />

              {/* Admin-only routes */}
              <Route 
                path="/roles/manage" 
                element={
                  <AdminRoute>
                    <RolesManage />
                  </AdminRoute>
                } 
              />
              <Route 
                path="/roles/delegate" 
                element={
                  <AdminRoute>
                    <RolesDelegate />
                  </AdminRoute>
                } 
              />
              <Route 
                path="/impersonation" 
                element={
                  <AdminRoute>
                    <Impersonation />
                  </AdminRoute>
                } 
              />
              <Route 
                path="/admin/search-users" 
                element={
                  <AdminRoute>
                    <AdminSearchUsers />
                  </AdminRoute>
                } 
              />
              <Route 
                path="/admin/bulk-import" 
                element={
                  <AdminRoute>
                    <AdminBulkImport />
                  </AdminRoute>
                } 
              />
              <Route 
                path="/admin/health-check" 
                element={
                  <AdminRoute>
                    <AdminHealthCheck />
                  </AdminRoute>
                } 
              />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 