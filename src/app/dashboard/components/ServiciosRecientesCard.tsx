import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Servicio } from '@/lib/types';

interface ServiciosRecientesCardProps {
  servicios: Servicio[];
  obtenerNombreEmpleada: (empleadaId: string) => string;
  loading?: boolean;
}

const ServiciosRecientesCard: React.FC<ServiciosRecientesCardProps> = ({
  servicios,
  obtenerNombreEmpleada,
  loading = false
}) => {
  if (loading) {
    return (
      <Card className="border-rose-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Servicios Recientes</h3>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex items-center justify-between py-2 border-b border-rose-100 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Servicios Recientes</h3>
        <div className="space-y-3">
          {servicios.length > 0 ? (
            servicios.map((servicio) => (
              <div key={servicio.id} className="flex items-center justify-between py-2 border-b border-rose-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{servicio.nombreCliente}</p>
                    <p className="text-sm text-gray-500">{servicio.servicio}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {new Date(servicio.fecha).toLocaleDateString('es-ES')}
                  </p>
                  <p className="text-sm text-rose-600">
                    {obtenerNombreEmpleada(servicio.empleadaId)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p>No hay servicios en este mes</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiciosRecientesCard; 