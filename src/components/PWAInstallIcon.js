'use client';
import { useState, useEffect } from 'react';

export default function PWAInstallIcon() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log('beforeinstallprompt fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Check if PWA criteria are met
    setTimeout(() => {
      if (!deferredPrompt) {
        console.log('beforeinstallprompt not fired - checking PWA criteria');
        // Force show install option after 2 seconds if event doesn't fire
        setCanInstall(true);
      }
    }, 2000);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [deferredPrompt]);

  const handleInstall = async () => {
    console.log('Install clicked, deferredPrompt:', !!deferredPrompt);
    
    if (deferredPrompt) {
      try {
        const result = await deferredPrompt.prompt();
        console.log('Prompt result:', result);
        const { outcome } = await deferredPrompt.userChoice;
        console.log('User choice:', outcome);
        
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
          setCanInstall(false);
        }
      } catch (error) {
        console.error('Install error:', error);
        alert('Installation failed. Please try using browser menu.');
      }
    } else {
      // Try to trigger install manually
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        alert('Please use your browser\'s menu to install this app (⋮ → Install app)');
      } else {
        alert('Your browser doesn\'t support app installation.');
      }
    }
  };

  return (
    <button
      onClick={handleInstall}
      className="p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 text-neon-cyan hover:text-white"
      title="Install App"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
      </svg>
    </button>
  );
}