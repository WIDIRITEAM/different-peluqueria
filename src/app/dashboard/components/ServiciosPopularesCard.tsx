import React from 'react';
import { Scissors } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';

interface ServicioPopular {
  name: string;
  count: number;
  revenue: number;
}

interface ServiciosPopularesCardProps {
  servicios: ServicioPopular[];
  loading?: boolean;
}

const ServiciosPopularesCard: React.FC<ServiciosPopularesCardProps> = ({
  servicios,
  loading = false
}) => {
  if (loading) {
    return (
      <Card className="border-rose-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Servicios Populares</h3>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-rose-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Servicios Populares</h3>
        <div className="space-y-3">
          {servicios.length > 0 ? (
            servicios.map((service, index) => (
              <div key={service.name} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-rose-100' : 
                    index === 1 ? 'bg-pink-100' : 
                    index === 2 ? 'bg-rose-100' : 'bg-pink-100'
                  }`}>
                    <span className="text-rose-600 font-bold">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-500">{service.count} servicios</p>
                  </div>
                </div>
                <p className="font-medium text-gray-900">{formatCurrency(service.revenue)}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Scissors className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p>No hay datos de servicios</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiciosPopularesCard; 