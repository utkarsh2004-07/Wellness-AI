import Link from 'next/link';
import { useState, useEffect } from 'react';
import PWAInstallIcon from './PWAInstallIcon';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 rounded-3xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-neon-pink to-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-xl font-bold">✨</span>
            </div>
            <span className="text-2xl font-black gradient-text">WellnessAI</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {user ? (
              <>
                <Link href="/dashboard" className="text-white/80 hover:text-neon-cyan transition-colors font-medium relative group">
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/scan-face" className="text-white/80 hover:text-neon-pink transition-colors font-medium relative group">
                  Face Scan 📸
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-pink group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/scan-food" className="text-white/80 hover:text-accent transition-colors font-medium relative group">
                  Food Scan 🍽️
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/routines" className="text-white/80 hover:text-primary transition-colors font-medium relative group">
                  Routines 💪
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </Link>
                {user.subscription_status === 'free' && (
                  <Link href="/premium" className="btn-neon text-sm animate-pulse">
                    Go Premium ₹5 💎
                  </Link>
                )}
                <PWAInstallIcon />
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white/10 rounded-2xl px-4 py-2 backdrop-blur-sm">
                    <div className="w-8 h-8 bg-gradient-to-r from-neon-pink to-neon-cyan rounded-full flex items-center justify-center text-sm font-bold">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <span className="text-sm text-white font-medium">Hey, {user.name}! 👋</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white/80 hover:text-neon-cyan transition-colors font-medium">
                  Login
                </Link>
                <Link href="/signup" className="btn-neon">
                  Join the Vibe ✨
                </Link>
                <PWAInstallIcon />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white/20 slide-up">
            {user ? (
              <div className="space-y-4">
                <Link href="/dashboard" className="flex items-center py-3 text-white/80 hover:text-neon-cyan transition-colors font-medium">
                  <span className="mr-3">📊</span> Dashboard
                </Link>
                <Link href="/scan-face" className="flex items-center py-3 text-white/80 hover:text-neon-pink transition-colors font-medium">
                  <span className="mr-3">📸</span> Face Scan
                </Link>
                <Link href="/scan-food" className="flex items-center py-3 text-white/80 hover:text-accent transition-colors font-medium">
                  <span className="mr-3">🍽️</span> Food Scan
                </Link>
                <Link href="/routines" className="flex items-center py-3 text-white/80 hover:text-primary transition-colors font-medium">
                  <span className="mr-3">💪</span> Routines
                </Link>
                {user.subscription_status === 'free' && (
                  <Link href="/premium" className="flex items-center py-3 text-neon-pink font-bold">
                    <span className="mr-3">💎</span> Go Premium ₹5
                  </Link>
                )}
                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-neon-pink to-neon-cyan rounded-full flex items-center justify-center font-bold">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <span className="text-white font-medium">Hey, {user.name}! 👋</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center py-3 text-red-400 hover:text-red-300 transition-colors font-medium w-full"
                  >
                    <span className="mr-3">🚪</span> Logout
                  </button>

                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Link href="/login" className="flex items-center py-3 text-white/80 hover:text-neon-cyan transition-colors font-medium">
                  <span className="mr-3">🔑</span> Login
                </Link>
                <Link href="/signup" className="flex items-center py-3 text-neon-pink font-bold">
                  <span className="mr-3">✨</span> Join the Vibe
                </Link>

              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}