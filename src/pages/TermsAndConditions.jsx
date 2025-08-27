import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';

const TermsAndConditions = () => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert('Please agree to the Terms & Conditions to continue');
      return;
    }
    // Handle terms agreement logic here
    console.log('Terms agreed to');
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-soft-blue p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link
              to="/register"
              className="text-white hover:text-soft-blue transition-colors mr-4"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-bold text-white">Terms & Conditions</h1>
          </div>
          <p className="text-white/80">
            Please read and accept our terms and conditions
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slt-blue mb-2">Terms of Service</h2>
              <p className="text-gray-600 text-sm">
                Last updated: January 15, 2025
              </p>
            </div>

            {/* Scrollable Terms Text */}
            <div className="border border-light-gray rounded-lg p-4 max-h-96 overflow-y-auto">
              <div className="text-sm text-slt-blue space-y-4">
                <h3 className="font-semibold text-base">1. Acceptance of Terms</h3>
                <p>
                  By accessing and using IdentityHub, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>

                <h3 className="font-semibold text-base">2. Description of Service</h3>
                <p>
                  IdentityHub provides identity management and authentication services. We provide users with access to rich content 
                  and resources, including various communications tools, forums, shopping services, and personalized content.
                </p>

                <h3 className="font-semibold text-base">3. User Account Responsibilities</h3>
                <p>
                  You are responsible for maintaining the confidentiality of your account and password. You agree to accept 
                  responsibility for all activities that occur under your account or password.
                </p>

                <h3 className="font-semibold text-base">4. Privacy Policy</h3>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
                  to understand our practices.
                </p>

                <h3 className="font-semibold text-base">5. Data Protection</h3>
                <p>
                  We are committed to protecting your personal data in accordance with applicable data protection laws. 
                  We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk.
                </p>

                <h3 className="font-semibold text-base">6. User Conduct</h3>
                <p>
                  You agree not to use the Service to: (a) violate any applicable laws or regulations; (b) infringe upon the 
                  rights of others; (c) transmit harmful, offensive, or inappropriate content; (d) attempt to gain unauthorized 
                  access to the Service or other users' accounts.
                </p>

                <h3 className="font-semibold text-base">7. Intellectual Property</h3>
                <p>
                  The Service and its original content, features, and functionality are and will remain the exclusive property 
                  of IdentityHub and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>

                <h3 className="font-semibold text-base">8. Termination</h3>
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or 
                  liability, under our sole discretion, for any reason whatsoever and without limitation.
                </p>

                <h3 className="font-semibold text-base">9. Limitation of Liability</h3>
                <p>
                  In no event shall IdentityHub, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                  be liable for any indirect, incidental, special, consequential, or punitive damages.
                </p>

                <h3 className="font-semibold text-base">10. Changes to Terms</h3>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
                  is material, we will provide at least 30 days notice prior to any new terms taking effect.
                </p>

                <h3 className="font-semibold text-base">11. Contact Information</h3>
                <p>
                  If you have any questions about these Terms & Conditions, please contact us at support@identityhub.com
                </p>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="h-4 w-4 text-mobitel-green focus:ring-mobitel-green border-gray-300 rounded mt-1"
                required
              />
              <label htmlFor="agreeToTerms" className="text-slt-blue text-sm">
                I have read and agree to the Terms & Conditions above. I understand that by accepting these terms, 
                I am entering into a legally binding agreement with IdentityHub.
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={!agreeToTerms}
                className={`flex items-center flex-1 justify-center px-6 py-2 rounded-lg font-medium transition-colors ${
                  agreeToTerms
                    ? 'bg-mobitel-green text-white hover:opacity-90'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Check className="h-4 w-4 mr-2" />
                I Agree & Continue
              </button>
              <Link
                to="/register"
                className="flex items-center px-6 py-2 border border-gray-300 text-slt-blue rounded-lg font-medium hover:bg-gray-50 transition-colors flex-1 justify-center"
              >
                Decline
              </Link>
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm">
            By continuing, you acknowledge that you have read and understood our{' '}
            <Link
              to="/privacy"
              className="text-mobitel-green hover:text-mobitel-green/80 transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions; 