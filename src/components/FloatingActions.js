'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      href: '/scan-face',
      icon: '📸',
      label: 'Face Scan',
      color: 'from-neon-pink to-primary',
      hoverColor: 'hover:shadow-neon-pink/50'
    },
    {
      href: '/scan-food',
      icon: '🍽️',
      label: 'Food Scan',
      color: 'from-neon-cyan to-secondary',
      hoverColor: 'hover:shadow-neon-cyan/50'
    },
    {
      href: '/routines',
      icon: '💪',
      label: 'Routines',
      color: 'from-accent to-neon-green',
      hoverColor: 'hover:shadow-accent/50'
    },
    {
      href: '/dashboard',
      icon: '📊',
      label: 'Dashboard',
      color: 'from-primary to-neon-purple',
      hoverColor: 'hover:shadow-primary/50'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      <div className={`flex flex-col space-y-3 mb-4 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {actions.map((action, index) => (
          <Link
            key={action.href}
            href={action.href}
            className={`group flex items-center space-x-3 bg-gradient-to-r ${action.color} p-4 rounded-2xl shadow-lg ${action.hoverColor} hover:scale-105 transition-all duration-300 backdrop-blur-sm`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-white font-bold text-sm whitespace-nowrap pr-2">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 bg-gradient-to-r from-neon-pink via-primary to-neon-cyan rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group glow-effect ${isOpen ? 'rotate-45' : ''}`}
      >
        <span className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">
          {isOpen ? '✕' : '✨'}
        </span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}