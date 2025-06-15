'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isCurrency?: boolean;
  color?: 'rose' | 'green' | 'blue' | 'pink';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  isCurrency = false,
  color = 'rose'
}) => {
  const colorClasses = {
    rose: 'text-rose-500',
    green: 'text-green-500',
    blue: 'text-blue-500',
    pink: 'text-pink-500'
  };

  const formatValue = (val: number) => {
    if (isCurrency) {
      return formatCurrency(val);
    }
    return val.toLocaleString('es-ES');
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          {/* Content section */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              {/* Icon sin fondo */}
              <Icon className={`w-8 h-8 ${colorClasses[color]}`} />
              <p className="text-sm font-medium text-gray-600">{title}</p>
            </div>
            
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {formatValue(value)}
            </p>
            
            {subtitle && (
              <p className="text-xs text-gray-500">{subtitle}</p>
            )}
          </div>
          
          {/* Trend indicator */}
          {trend && (
            <div className={`flex items-center text-sm ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="font-medium">
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <svg
                className={`w-4 h-4 ml-1 ${
                  trend.isPositive ? 'rotate-0' : 'rotate-180'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard; 