'use client';
import { useState, useEffect } from 'react';

export default function PWAInstallBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    // Check if banner was dismissed
    if (localStorage.getItem('pwa-banner-dismissed')) {
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show banner after 7 seconds
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 7000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowBanner(false);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  if (!showBanner || !isInstallable) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up">
      <div className="glass-card rounded-2xl p-4 mx-auto max-w-md border border-neon-pink/30">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-neon-pink to-primary rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">📱</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white mb-1">Install WellnessAI</h3>
            <p className="text-sm text-white/70 mb-3">Get the full app experience! Install for faster access and offline features.</p>
            <div className="flex space-x-2">
              <button
                onClick={handleInstall}
                className="btn-neon text-xs px-4 py-2"
              >
                Install App ✨
              </button>
              <button
                onClick={handleDismiss}
                className="text-xs text-white/60 hover:text-white/80 px-3 py-2"
              >
                Not now
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white/60 hover:text-white/80 p-1"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}