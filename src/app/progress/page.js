'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';

export default function ProgressPage() {
  const [user, setUser] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [progressData, setProgressData] = useState({
    faceScans: [],
    foodScans: [],
    avgBloatingTrend: [],
    totalScans: 0,
    improvementScore: 0
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock progress data
    const mockData = {
      faceScans: [
        { date: '2024-01-15', bloating_score: 6.2, jawline_score: 4.5 },
        { date: '2024-01-16', bloating_score: 5.8, jawline_score: 5.1 },
        { date: '2024-01-17', bloating_score: 5.2, jawline_score: 5.8 },
        { date: '2024-01-18', bloating_score: 4.9, jawline_score: 6.2 },
        { date: '2024-01-19', bloating_score: 4.3, jawline_score: 6.8 }
      ],
      foodScans: [
        { date: '2024-01-15', bloating_score: 7.1, sodium: 1200 },
        { date: '2024-01-16', bloating_score: 6.5, sodium: 980 },
        { date: '2024-01-17', bloating_score: 5.9, sodium: 850 },
        { date: '2024-01-18', bloating_score: 5.2, sodium: 720 },
        { date: '2024-01-19', bloating_score: 4.8, sodium: 650 }
      ],
      totalScans: 23,
      improvementScore: 78
    };

    setProgressData(mockData);
  }, [timeRange]);

  const isPremium = user?.subscription_status === 'premium';

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getScoreColor = (score) => {
    if (score <= 3) return 'text-green-600';
    if (score <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getImprovementColor = (score) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Progress Tracking
            </h1>
            <p className="text-gray-600">
              Monitor your wellness journey and track improvements over time
            </p>
          </div>

          {/* Time Range Selector */}
          <div className="mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="input-field w-auto"
              disabled={!isPremium}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 3 months</option>
            </select>
          </div>
        </div>

        {!isPremium && (
          <div className="card mb-8 bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Unlock Detailed Analytics</h2>
              <p className="text-gray-600 mb-4">
                Get comprehensive progress tracking, trends analysis, and personalized insights with Premium.
              </p>
              <a href="/buy" className="btn-secondary">
                Upgrade for ₹5
              </a>
            </div>
          </div>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📊</div>
              <div>
                <p className="text-2xl font-bold text-primary">{progressData.totalScans}</p>
                <p className="text-gray-600">Total Scans</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📈</div>
              <div>
                <p className={`text-2xl font-bold ${getImprovementColor(progressData.improvementScore)}`}>
                  {progressData.improvementScore}%
                </p>
                <p className="text-gray-600">Improvement</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📸</div>
              <div>
                <p className="text-2xl font-bold text-secondary">{progressData.faceScans.length}</p>
                <p className="text-gray-600">Face Scans</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="text-3xl mr-4">🍽️</div>
              <div>
                <p className="text-2xl font-bold text-accent">{progressData.foodScans.length}</p>
                <p className="text-gray-600">Food Scans</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Face Analysis Progress */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Face Analysis Progress</h2>
            
            {isPremium ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span>Date</span>
                  <span>Bloating</span>
                  <span>Jawline</span>
                </div>
                
                {progressData.faceScans.map((scan, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm">{formatDate(scan.date)}</span>
                    <span className={`font-medium ${getScoreColor(scan.bloating_score)}`}>
                      {scan.bloating_score}/10
                    </span>
                    <span className={`font-medium ${getScoreColor(10 - scan.jawline_score)}`}>
                      {scan.jawline_score}/10
                    </span>
                  </div>
                ))}
                
                {progressData.faceScans.length > 0 && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Trend:</strong> Your bloating score improved by{' '}
                      {(progressData.faceScans[0].bloating_score - 
                        progressData.faceScans[progressData.faceScans.length - 1].bloating_score).toFixed(1)} points!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">🔒</div>
                <p>Detailed face analysis tracking available with Premium</p>
                <a href="/buy" className="text-primary hover:underline text-sm">
                  Upgrade now
                </a>
              </div>
            )}
          </div>

          {/* Food Analysis Progress */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Food Analysis Progress</h2>
            
            {isPremium ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span>Date</span>
                  <span>Bloating</span>
                  <span>Sodium (mg)</span>
                </div>
                
                {progressData.foodScans.map((scan, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm">{formatDate(scan.date)}</span>
                    <span className={`font-medium ${getScoreColor(scan.bloating_score)}`}>
                      {scan.bloating_score}/10
                    </span>
                    <span className={`font-medium ${scan.sodium > 1000 ? 'text-red-600' : 'text-green-600'}`}>
                      {scan.sodium}
                    </span>
                  </div>
                ))}
                
                {progressData.foodScans.length > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Insight:</strong> You've reduced sodium intake by{' '}
                      {progressData.foodScans[0].sodium - progressData.foodScans[progressData.foodScans.length - 1].sodium}mg 
                      over this period!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">🔒</div>
                <p>Detailed nutrition tracking available with Premium</p>
                <a href="/buy" className="text-primary hover:underline text-sm">
                  Upgrade now
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="card mt-8">
          <h2 className="text-xl font-bold mb-4">Personalized Recommendations</h2>
          
          {isPremium ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-600 mb-2">What's Working Well</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Consistent reduction in facial bloating</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Improved jawline definition over time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Lower sodium intake in recent meals</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-orange-600 mb-2">Areas for Improvement</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Try more face yoga routines for faster results</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Consider reducing carb intake in evening meals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Increase water intake to reduce puffiness</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p>Personalized recommendations available with Premium subscription</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}