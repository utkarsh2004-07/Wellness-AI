'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function PremiumSuccessPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const confirmPayment = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/payment/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ payment_confirmed: true }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local storage with new user data
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.removeItem('payment_pending');
        localStorage.removeItem('payment_amount');
        setSuccess(true);
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      } else {
        setError(data.error || 'Payment confirmation failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="card text-center">
          {!success ? (
            <>
              <div className="text-6xl mb-6">🎉</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Thank you for your payment!
              </h1>
              <p className="text-gray-600 mb-8">
                Click the button below to confirm your payment and activate premium features.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              <button
                onClick={confirmPayment}
                disabled={loading}
                className="btn-primary text-lg px-8 py-4"
              >
                {loading ? 'Activating Premium...' : 'Activate Premium Features'}
              </button>

              <div className="mt-8 text-sm text-gray-500">
                <p>Didn't complete payment yet?</p>
                <a href="/buy" className="text-primary hover:underline">
                  Go back to payment page
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="text-6xl mb-6">✅</div>
              <h1 className="text-3xl font-bold text-green-600 mb-4">
                Premium Activated!
              </h1>
              <p className="text-gray-600 mb-8">
                Congratulations! You now have access to all premium features including 
                advanced AI analysis, detailed nutrition data, and exclusive wellness content.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-green-800 mb-3">What's unlocked:</h3>
                <ul className="text-left space-y-2 text-green-700">
                  <li>✓ Advanced face analysis with detailed metrics</li>
                  <li>✓ Complete nutrition breakdown</li>
                  <li>✓ Premium face yoga routines</li>
                  <li>✓ Detailed progress analytics</li>
                  <li>✓ Personalized recommendations</li>
                </ul>
              </div>

              <p className="text-gray-600 mb-4">
                Redirecting to dashboard in a few seconds...
              </p>

              <button
                onClick={() => router.push('/dashboard')}
                className="btn-primary"
              >
                Go to Dashboard Now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}