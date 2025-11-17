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

    // For HTTPS sites, check if PWA criteria are met
    if (window.location.protocol === 'https:' && 'serviceWorker' in navigator) {
      // Wait a bit for the beforeinstallprompt event
      setTimeout(() => {
        if (!deferredPrompt && !isInstalled) {
          setShowInstall(true); // Show button even without prompt on HTTPS
        }
      }, 2000);
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
    } else {
      // For HTTPS without prompt, try to trigger install
      if (window.location.protocol === 'https:') {
        // Check if browser supports install
        if ('BeforeInstallPromptEvent' in window) {
          // Wait for potential delayed prompt
          setTimeout(() => {
            if (deferredPrompt) {
              deferredPrompt.prompt();
            }
          }, 100);
        }
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