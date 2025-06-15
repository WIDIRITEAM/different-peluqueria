'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'rounded-lg border bg-white shadow-sm',
        className
      )}
    >
      {children}
    </div>
  );
};

const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  );
};

export { Card, CardContent }; 