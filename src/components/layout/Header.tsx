'use client';

import React, { useState, useEffect } from 'react';
import { Menu, Clock } from 'lucide-react';
import { DateFilterSelector } from '@/components/ui/DateFilter';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
  showDateFilter?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, onMenuClick, showDateFilter = true }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-rose-200 bg-white/90 backdrop-blur-lg shadow-sm">
      <div className="flex h-20 items-center justify-between px-6">
        {/* Left side - Title and Menu */}
        <div className="flex items-center space-x-4">
          <button 
            className="lg:hidden rounded-lg p-2 text-rose-600 hover:bg-rose-50 transition-colors" 
            aria-label="Abrir menú"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-sm text-rose-600">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Center - Date Filter (solo si showDateFilter es true) */}
        {showDateFilter && (
          <div className="hidden md:flex items-center space-x-4">
            <DateFilterSelector />
          </div>
        )}

        {/* Right side - Date/Time and User profile */}
        <div className="flex items-center space-x-4">
          {/* Date and Time */}
          <div className="hidden sm:block text-right">
            <div className="flex items-center space-x-2 text-sm font-medium text-rose-800">
              <Clock className="h-4 w-4 text-rose-600" />
              <span>{formatTime(currentTime)}</span>
            </div>
            <p className="text-xs text-rose-600 mt-1">
              {formatDate(currentTime)}
            </p>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">María González</p>
              <p className="text-xs text-rose-600">Gerente</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-rose-300 to-pink-400 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b332c2ec?w=40&h=40&fit=crop&crop=face"
                alt="María González"
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Date Filter (solo si showDateFilter es true) */}
      {showDateFilter && (
        <div className="md:hidden px-6 pb-3">
          <DateFilterSelector compact />
        </div>
      )}
    </header>
  );
};

export default Header; 