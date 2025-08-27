import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // For demo purposes, redirect to login
    // In a real app, you would check authentication status here
    const isAuthenticated = false; // This would come from your auth context/state
    
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">IdentityHub</h1>
        <p className="text-white text-lg">Redirecting...</p>
      </div>
    </div>
  );
};

export default Home; 