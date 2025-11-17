'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function RoutinesPage() {
  const [user, setUser] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token || !userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));

    fetchRoutines(token);
  }, [router]);

  const fetchRoutines = async (token) => {
    try {
      const response = await fetch('/api/routines', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRoutines(data.routines || []);
      }
    } catch (error) {
      console.error('Failed to fetch routines:', error);
    }
  };

  const filteredRoutines = routines.filter(routine => {
    if (selectedCategory === 'all') return true;
    return routine.category === selectedCategory;
  });

  const canAccessRoutine = (routine) => {
    if (!routine.premium_required) return true;
    return user?.subscription_status === 'premium';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-900 hero-bg flex items-center justify-center pt-24">
        <div className="glass-card text-center p-12">
          <div className="text-6xl mb-6">🔐</div>
          <h2 className="text-3xl font-bold mb-6 gradient-text">Login Required</h2>
          <p className="text-white/70 mb-8">Please login to access face fitness routines</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 hero-bg pt-24">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-32 right-10 w-28 h-28 bg-primary/20 rounded-full blur-xl floating-element"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 bg-neon-green/20 rounded-full blur-xl floating-element" style={{animationDelay: '3s'}}></div>
      </div>
      
      <Navbar />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12 slide-up">
          <h1 className="text-6xl font-black mb-6">
            <span className="gradient-text">Face Fitness</span>
            <span className="text-white"> Routines 💪</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Level up your skincare game with AI-powered face yoga & massage routines. Get that sculpted look! 🧘♀️✨
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="glass-card flex space-x-2 p-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-primary to-neon-purple text-white shadow-lg'
                  : 'text-white/70 hover:text-neon-cyan hover:bg-white/10'
              }`}
            >
              All Vibes ✨
            </button>
            <button
              onClick={() => setSelectedCategory('face-yoga')}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                selectedCategory === 'face-yoga'
                  ? 'bg-gradient-to-r from-neon-pink to-primary text-white shadow-lg'
                  : 'text-white/70 hover:text-neon-pink hover:bg-white/10'
              }`}
            >
              Face Yoga 🧘♀️
            </button>
            <button
              onClick={() => setSelectedCategory('massage')}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                selectedCategory === 'massage'
                  ? 'bg-gradient-to-r from-neon-cyan to-secondary text-white shadow-lg'
                  : 'text-white/70 hover:text-neon-cyan hover:bg-white/10'
              }`}
            >
              Massage 💆♀️
            </button>
          </div>
        </div>

        {/* Routines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoutines.map((routine) => (
            <div key={routine.id} className="glass-card hover:scale-105 transition-all duration-300 group">
              {/* Thumbnail */}
              <div className="relative mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <div className="text-6xl">
                    {routine.category === 'face-yoga' ? '🧘‍♀️' : '💆‍♀️'}
                  </div>
                </div>
                
                {/* Premium Badge */}
                {routine.premium_required && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-neon-pink to-primary text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                    Premium 💎
                  </div>
                )}
                
                {/* Difficulty Badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                  routine.difficulty === 'beginner' ? 'bg-neon-green/20 border border-neon-green/50 text-neon-green' :
                  routine.difficulty === 'intermediate' ? 'bg-accent/20 border border-accent/50 text-accent' :
                  'bg-neon-pink/20 border border-neon-pink/50 text-neon-pink'
                }`}>
                  {routine.difficulty} 🎯
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-neon-cyan transition-colors">{routine.title}</h3>
                <p className="text-white/70 text-sm mb-6 leading-relaxed">{routine.description}</p>
                
                <div className="flex items-center justify-between text-sm text-white/60 mb-6">
                  <span className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                    <span className="mr-2">⏱️</span>
                    {routine.duration_minutes} min
                  </span>
                  <span className="capitalize bg-white/10 px-3 py-1 rounded-full">
                    {routine.category.replace('-', ' ')} ✨
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                {canAccessRoutine(routine) ? (
                  <button className="btn-primary w-full group-hover:scale-105 transition-transform">
                    Start Routine 🚀
                  </button>
                ) : (
                  <div>
                    <button className="w-full px-4 py-3 bg-white/10 text-white/50 rounded-2xl cursor-not-allowed mb-3 font-medium">
                      Premium Required 🔒
                    </button>
                    <a href="/buy" className="block text-center text-sm text-neon-pink hover:text-neon-cyan transition-colors font-medium">
                      Upgrade for ₹5 💎
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Premium CTA */}
        {user?.subscription_status === 'free' && filteredRoutines.length > 0 && (
          <div className="glass-card mt-12 border-2 border-neon-pink/50 glow-effect">
            <div className="text-center">
              <div className="text-6xl mb-6">💎</div>
              <h2 className="text-4xl font-bold mb-6 gradient-text">Unlock Your Full Potential!</h2>
              <p className="text-white/70 mb-8 text-lg leading-relaxed">
                Get access to advanced face yoga routines, exclusive video tutorials, 
                and personalized wellness programs for just ₹5. No cap! 🔥
              </p>
              <a href="/buy" className="btn-primary text-xl px-12 py-4">
                Upgrade to Premium ✨
              </a>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredRoutines.length === 0 && (
          <div className="glass-card text-center py-16">
            <div className="text-8xl mb-6 floating-element">🔍</div>
            <h3 className="text-3xl font-bold text-white mb-4">
              {routines.length === 0 ? 'No routines available yet!' : 'No routines found bestie!'}
            </h3>
            <p className="text-white/70 text-lg">
              {routines.length === 0 ? 'Check back soon for amazing face fitness routines! ✨' : 'Try a different vibe or check back later for fresh content! 💫'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}