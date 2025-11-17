'use client';
import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'info', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-neon-green/20 to-accent/20 border-neon-green/50 text-neon-green';
      case 'error':
        return 'bg-gradient-to-r from-red-500/20 to-neon-pink/20 border-red-500/50 text-red-300';
      case 'warning':
        return 'bg-gradient-to-r from-accent/20 to-neon-cyan/20 border-accent/50 text-accent';
      default:
        return 'bg-gradient-to-r from-primary/20 to-neon-purple/20 border-primary/50 text-primary';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`fixed top-24 right-6 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
      <div className={`glass-card border-2 ${getToastStyles()} max-w-sm p-4 rounded-2xl backdrop-blur-md shadow-2xl`}>
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getIcon()}</span>
          <p className="font-medium flex-1">{message}</p>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="text-white/60 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}