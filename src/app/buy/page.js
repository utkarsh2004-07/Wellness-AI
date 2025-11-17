'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function BuyPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handlePayment = (amount) => {
    // Store user info for return
    localStorage.setItem('payment_pending', 'true');
    localStorage.setItem('payment_amount', amount.toString());
    
    // Redirect to Buy Me a Coffee
    const buyMeACoffeeUrl = `https://www.buymeacoffee.com/yourname?amount=${amount}`;
    window.open(buyMeACoffeeUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Unlock Premium Features
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get advanced AI analysis, detailed nutrition data, and exclusive wellness content
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Premium */}
          <div className="card border-2 border-primary relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Premium Access</h2>
              <div className="text-4xl font-bold text-primary mb-2">₹5</div>
              <p className="text-gray-600">One-time payment</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Advanced face analysis with detailed metrics
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Complete nutrition breakdown for all foods
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Premium face yoga routines & videos
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Detailed progress analytics & trends
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Personalized wellness recommendations
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Export reports & data
              </li>
            </ul>

            <button
              onClick={() => handlePayment(5)}
              className="btn-primary w-full text-lg py-4"
            >
              Unlock for ₹5
            </button>
          </div>

          {/* Support Option */}
          <div className="card">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Support & Premium</h2>
              <div className="text-4xl font-bold text-secondary mb-2">₹20</div>
              <p className="text-gray-600">Support development + Premium</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Everything in Premium Access
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Priority customer support
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Early access to new features
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Support app development
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Exclusive wellness tips & content
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Lifetime premium access
              </li>
            </ul>

            <button
              onClick={() => handlePayment(20)}
              className="btn-secondary w-full text-lg py-4"
            >
              Support with ₹20
            </button>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="card mt-12 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-center">How it works</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                1
              </div>
              <div>
                <h4 className="font-semibold">Click payment button</h4>
                <p className="text-gray-600">You'll be redirected to Buy Me a Coffee for secure payment</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                2
              </div>
              <div>
                <h4 className="font-semibold">Complete payment</h4>
                <p className="text-gray-600">Pay securely using your preferred method</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                3
              </div>
              <div>
                <h4 className="font-semibold">Return to app</h4>
                <p className="text-gray-600">Come back and confirm your payment to unlock premium features</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link href="/premium-success" className="text-primary hover:underline">
              Already paid? Click here to activate premium
            </Link>
          </div>
        </div>

        {/* Free Features Reminder */}
        <div className="card mt-8 bg-gray-100">
          <h3 className="text-lg font-bold mb-3">Free features you already have:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">•</span>
                Basic face bloating analysis
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">•</span>
                Food identification & basic nutrition
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">•</span>
                Simple bloating score calculation
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">•</span>
                Basic face yoga routines
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">•</span>
                Progress tracking
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">•</span>
                General wellness tips
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}