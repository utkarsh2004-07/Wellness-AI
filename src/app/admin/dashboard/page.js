'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    premiumUsers: 0,
    totalScans: 0,
    totalVideos: 0
  });

  useEffect(() => {
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }

    // Mock stats
    setStats({
      totalUsers: 1247,
      premiumUsers: 89,
      totalScans: 3456,
      totalVideos: 23
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    window.location.href = '/admin/login';
  };

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Admin Access Required</h2>
          <Link href="/admin/login" className="btn-primary">
            Go to Admin Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {admin.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="text-3xl mr-4">👥</div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.totalUsers}</p>
                <p className="text-gray-600">Total Users</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="text-3xl mr-4">⭐</div>
              <div>
                <p className="text-2xl font-bold text-secondary">{stats.premiumUsers}</p>
                <p className="text-gray-600">Premium Users</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📊</div>
              <div>
                <p className="text-2xl font-bold text-accent">{stats.totalScans}</p>
                <p className="text-gray-600">Total Scans</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="text-3xl mr-4">🎥</div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{stats.totalVideos}</p>
                <p className="text-gray-600">Videos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/admin/users" className="card hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
              <p className="text-gray-600 text-sm">
                View, edit, and manage user accounts and subscriptions
              </p>
            </div>
          </Link>

          <Link href="/admin/videos" className="card hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-lg font-semibold mb-2">Video Management</h3>
              <p className="text-gray-600 text-sm">
                Upload and manage face yoga exercise videos
              </p>
            </div>
          </Link>

          <div className="card hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="text-4xl mb-4">🏃‍♀️</div>
              <h3 className="text-lg font-semibold mb-2">Routines</h3>
              <p className="text-gray-600 text-sm">
                Create and manage face fitness routines
              </p>
            </div>
          </div>

          <div className="card hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600 text-sm">
                View detailed app usage and user analytics
              </p>
            </div>
          </div>

          <div className="card hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-lg font-semibold mb-2">Settings</h3>
              <p className="text-gray-600 text-sm">
                Manage app settings, pricing, and content
              </p>
            </div>
          </div>

          <div className="card hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-lg font-semibold mb-2">Content</h3>
              <p className="text-gray-600 text-sm">
                Manage app content, tips, and notifications
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center">
                <div className="text-2xl mr-3">👤</div>
                <div>
                  <p className="font-medium">New user registration</p>
                  <p className="text-sm text-gray-600">user@example.com</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 minutes ago</span>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center">
                <div className="text-2xl mr-3">⭐</div>
                <div>
                  <p className="font-medium">Premium upgrade</p>
                  <p className="text-sm text-gray-600">₹5 payment confirmed</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">15 minutes ago</span>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center">
                <div className="text-2xl mr-3">📸</div>
                <div>
                  <p className="font-medium">Face scan completed</p>
                  <p className="text-sm text-gray-600">AI analysis successful</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">1 hour ago</span>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <div className="text-2xl mr-3">🎥</div>
                <div>
                  <p className="font-medium">New video uploaded</p>
                  <p className="text-sm text-gray-600">Jawline strengthening routine</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">3 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}