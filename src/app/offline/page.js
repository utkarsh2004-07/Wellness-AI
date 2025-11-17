'use client';

export default function OfflinePage() {
  const handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 hero-bg flex items-center justify-center pt-24">
      <div className="glass-card text-center p-12 max-w-md">
        <div className="text-8xl mb-6 floating-element">📱</div>
        <h1 className="text-4xl font-black mb-6 gradient-text">You're Offline!</h1>
        <p className="text-white/70 mb-8 text-lg leading-relaxed">
          No internet? No problem! Your wellness journey continues offline. 
          Check back when you're connected! ✨
        </p>
        <button 
          onClick={handleReload} 
          className="btn-primary"
        >
          Try Again 🔄
        </button>
      </div>
    </div>
  );
}