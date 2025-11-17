'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    faceScans: 0,
    foodScans: 0,
    avgBloatingScore: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      fetchDashboardData(token);
    }
  }, []);

  const fetchDashboardData = async (token) => {
    try {
      const response = await fetch('/api/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats || { faceScans: 0, foodScans: 0, avgBloatingScore: 0 });
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-900 hero-bg flex items-center justify-center pt-24">
        <div className="glass-card text-center p-12">
          <div className="text-6xl mb-6">🔐</div>
          <h2 className="text-3xl font-bold mb-6 gradient-text">Access Required</h2>
          <p className="text-white/70 mb-8">You need to be logged in to access your dashboard</p>
          <Link href="/login" className="btn-primary text-lg">
            Login to Continue ✨
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 hero-bg pt-24">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-32 left-10 w-24 h-24 bg-neon-pink/20 rounded-full blur-xl floating-element"></div>
        <div className="absolute bottom-32 right-10 w-32 h-32 bg-neon-cyan/20 rounded-full blur-xl floating-element" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-primary/20 rounded-full blur-xl floating-element" style={{animationDelay: '4s'}}></div>
      </div>
      
      <Navbar />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12 slide-up">
          <h1 className="text-6xl font-black mb-4">
            <span className="text-white">Hey </span>
            <span className="gradient-text">{user.name}</span>
            <span className="text-white">! 👋</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Ready to check your vibe? Let's see how you're glowing today! ✨
          </p>
          {user.subscription_status === 'free' && (
            <div className="glass-card border-2 border-neon-pink/50 p-6 max-w-2xl">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">🚀</div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-neon-pink mb-2">
                    Unlock Your Full Glow Potential!
                  </p>
                  <p className="text-white/70 mb-4">
                    Get premium AI insights, detailed analytics & exclusive content for just ₹5! No cap! 💎
                  </p>
                  <Link href="/premium" className="btn-neon">
                    Upgrade Now 🔥
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="neon-card text-center group hover:scale-105 transition-all duration-300">
            <div className="text-5xl mb-4 floating-element">📸</div>
            <p className="text-4xl font-black text-neon-pink mb-2">{stats.faceScans}</p>
            <p className="text-white/70 font-medium">Face Scans</p>
            <p className="text-xs text-neon-pink mt-2">Selfie game strong! 💪</p>
          </div>
          
          <div className="neon-card text-center group hover:scale-105 transition-all duration-300">
            <div className="text-5xl mb-4 floating-element" style={{animationDelay: '1s'}}>🍽️</div>
            <p className="text-4xl font-black text-neon-cyan mb-2">{stats.foodScans}</p>
            <p className="text-white/70 font-medium">Food Scans</p>
            <p className="text-xs text-neon-cyan mt-2">Nutrition detective! 🕵️</p>
          </div>
          
          <div className="neon-card text-center group hover:scale-105 transition-all duration-300">
            <div className="text-5xl mb-4 floating-element" style={{animationDelay: '2s'}}>📊</div>
            <p className="text-4xl font-black text-accent mb-2">{stats.avgBloatingScore}</p>
            <p className="text-white/70 font-medium">Avg Bloating Score</p>
            <p className="text-xs text-accent mt-2">Lower is better! 🎯</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-8 gradient-text text-center">Quick Actions 🚀</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/scan-face" className="glass-card hover:scale-105 transition-all duration-300 group cursor-pointer">
              <div className="text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📸</div>
                <h3 className="text-xl font-bold mb-3 text-neon-pink">Face Glow Check</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  AI analyzes your face & spills the tea on your glow factor! ✨
                </p>
              </div>
            </Link>

            <Link href="/scan-food" className="glass-card hover:scale-105 transition-all duration-300 group cursor-pointer">
              <div className="text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🍽️</div>
                <h3 className="text-xl font-bold mb-3 text-neon-cyan">Food Scanner Pro</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Scan your meals & get the nutrition lowdown. Know what's helping your glow! 🔍
                </p>
              </div>
            </Link>

            <Link href="/routines" className="glass-card hover:scale-105 transition-all duration-300 group cursor-pointer">
              <div className="text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">💪</div>
                <h3 className="text-xl font-bold mb-3 text-accent">Face Fitness</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Custom face yoga routines to level up your skincare game! 🧘‍♀️
                </p>
              </div>
            </Link>

            <Link href="/progress" className="glass-card hover:scale-105 transition-all duration-300 group cursor-pointer">
              <div className="text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📈</div>
                <h3 className="text-xl font-bold mb-3 text-primary">Progress Tracker</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Track your glow-up journey & see how far you've come! 🌟
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card">
          <h2 className="text-3xl font-bold mb-8 gradient-text">Recent Vibes 📱</h2>
          {stats.faceScans === 0 && stats.foodScans === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 floating-element">🎆</div>
              <h3 className="text-xl font-bold text-white mb-4">Start Your Wellness Journey!</h3>
              <p className="text-white/70 mb-6">No scans yet - time to check your glow! ✨</p>
              <div className="flex justify-center space-x-4">
                <Link href="/scan-face" className="btn-primary">
                  Scan Face 📸
                </Link>
                <Link href="/scan-food" className="btn-secondary">
                  Scan Food 🍽️
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {stats.faceScans > 0 && (
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">📸</div>
                    <div>
                      <p className="font-bold text-white">Face scans completed</p>
                      <p className="text-sm text-neon-pink">Total: {stats.faceScans} scans - Keep glowing! 💅</p>
                    </div>
                  </div>
                  <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">Recent</span>
                </div>
              )}
              
              {stats.foodScans > 0 && (
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">🍽️</div>
                    <div>
                      <p className="font-bold text-white">Food scans completed</p>
                      <p className="text-sm text-neon-cyan">Total: {stats.foodScans} meals analyzed - Nutrition detective! 🕵️</p>
                    </div>
                  </div>
                  <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">Recent</span>
                </div>
              )}
              
              {stats.avgBloatingScore > 0 && (
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">📊</div>
                    <div>
                      <p className="font-bold text-white">Average bloating score</p>
                      <p className="text-sm text-accent">{stats.avgBloatingScore}/10 - {stats.avgBloatingScore < 5 ? 'Amazing progress!' : 'Keep working on it!'} 🎯</p>
                    </div>
                  </div>
                  <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">Overall</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}