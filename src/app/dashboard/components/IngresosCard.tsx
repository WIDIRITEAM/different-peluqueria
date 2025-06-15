import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';

interface IngresosCardProps {
  ingresos: number;
  tendencia: number;
  loading?: boolean;
}

const IngresosCard: React.FC<IngresosCardProps> = ({ 
  ingresos, 
  tendencia, 
  loading = false 
}) => {
  const isPositive = tendencia >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-rose-500 to-rose-600 text-white">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-rose-300 rounded w-24"></div>
                <div className="h-8 bg-rose-300 rounded w-32"></div>
              </div>
              <div className="w-8 h-8 bg-rose-300 rounded"></div>
            </div>
            <div className="mt-4">
              <div className="h-4 bg-rose-300 rounded w-20"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-rose-500 to-rose-600 text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-rose-100 text-sm">Ingresos del Mes</p>
            <p className="text-3xl font-bold">{formatCurrency(ingresos)}</p>
          </div>
          <DollarSign className="w-8 h-8 text-rose-200" />
        </div>
        <div className="mt-4 flex items-center">
          <TrendIcon className={`w-4 h-4 mr-1 ${isPositive ? 'text-green-200' : 'text-red-200'}`} />
          <span className={`text-sm ${isPositive ? 'text-green-200' : 'text-red-200'}`}>
            {isPositive ? '+' : ''}{Math.round(tendencia)}% vs mes anterior
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default IngresosCard; 