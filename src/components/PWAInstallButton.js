'use client';
import { useState, useEffect } from 'react';

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      setShowInstall(false);
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    const installHandler = () => {
      setIsInstalled(true);
      setShowInstall(false);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', installHandler);

    // Show button on localhost for testing
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      setShowInstall(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installHandler);
    };
  }, [deferredPrompt, isInstalled]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
          setShowInstall(false);
        }
      } catch (error) {
        console.log('Install prompt failed');
      }
    } else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      // For localhost, show browser-specific instructions
      const isChrome = /Chrome/.test(navigator.userAgent);
      const isEdge = /Edg/.test(navigator.userAgent);
      
      if (isChrome || isEdge) {
        // Try to trigger install via browser menu
        console.log('PWA install available in browser menu');
        // Hide the button since user needs to use browser menu
        setShowInstall(false);
      }
    }
  };

  if (isInstalled) {
    return (
      <div className="bg-gradient-to-r from-neon-green to-accent text-white px-4 py-2 rounded-2xl text-sm font-bold opacity-50">
        ✅ Installed
      </div>
    );
  }

  if (!showInstall) return null;

  return (
    <button
      onClick={handleInstall}
      className="bg-gradient-to-r from-neon-green to-accent text-white px-4 py-2 rounded-2xl text-sm font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-neon-green/50"
    >
      📱 Install App
    </button>
  );
}