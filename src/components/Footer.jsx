import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark-blue text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-center md:text-left mb-4 md:mb-0">
            © 2025 IdentityHub
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
            <Link to="/privacy" className="text-mobitel-green hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms-and-conditions" className="text-mobitel-green hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/contact" className="text-mobitel-green hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 