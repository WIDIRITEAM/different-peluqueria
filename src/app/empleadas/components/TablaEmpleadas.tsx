import React from 'react';
import { Phone, Mail, Calendar, Edit3, Eye, Trash2 } from 'lucide-react';
import { Empleada, MetricaEmpleada } from '@/lib/types';
import { formatCurrency, calcularAntiguedad } from '@/lib/utils';

interface TablaEmpleadasProps {
  empleadas: Empleada[];
  metricas: MetricaEmpleada[];
  loading?: boolean;
  onVerDetalles: (empleada: Empleada) => void;
  onEditar: (empleada: Empleada) => void;
  onEliminar: (empleada: Empleada) => void;
}

const TablaEmpleadas: React.FC<TablaEmpleadasProps> = ({
  empleadas,
  metricas,
  loading = false,
  onVerDetalles,
  onEditar,
  onEliminar
}) => {
  const obtenerMetricasEmpleada = (empleadaId: string): MetricaEmpleada | undefined => {
    return metricas.find(m => m.empleadaId === empleadaId);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-white rounded-xl shadow-sm border border-rose-200 overflow-hidden">
              <div className="relative">
                <div className="h-32 bg-gray-200"></div>
                <div className="absolute -bottom-8 left-6">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                </div>
              </div>
              <div className="pt-10 p-6 space-y-4">
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (empleadas.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay empleadas</h3>
        <p className="text-gray-500">No se encontraron empleadas con los filtros aplicados.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {empleadas.map((empleada) => {
        const metricas = obtenerMetricasEmpleada(empleada.id);
        
        return (
          <div key={empleada.id} className="bg-white rounded-xl shadow-sm border border-rose-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="relative">
              <div className="h-32 bg-gradient-to-r from-rose-200 to-pink-300"></div>
              <div className="absolute -bottom-8 left-6">
                <img
                  src={empleada.avatar}
                  alt={`${empleada.nombre} ${empleada.apellido}`}
                  className="w-16 h-16 rounded-full border-4 border-white object-cover"
                />
              </div>
            </div>
            
            <div className="pt-10 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {empleada.nombre} {empleada.apellido}
                  </h3>
                  <p className="text-rose-600 font-medium">{empleada.rol}</p>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onVerDetalles(empleada)}
                    className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                    aria-label="Ver detalles"
                    tabIndex={0}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEditar(empleada)}
                    className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                    aria-label="Editar empleada"
                    tabIndex={0}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEliminar(empleada)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    aria-label="Eliminar empleada"
                    tabIndex={0}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {empleada.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {empleada.telefono}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {calcularAntiguedad(empleada.fechaIngreso)} en la empresa
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {empleada.especialidades.map((especialidad, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-rose-100 text-rose-700 text-xs rounded-full"
                    >
                      {especialidad}
                    </span>
                  ))}
                </div>
              </div>

              {metricas && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(metricas.ingresos)}
                    </p>
                    <p className="text-xs text-gray-500">Ingresos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">
                      {metricas.servicios}
                    </p>
                    <p className="text-xs text-gray-500">Servicios</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TablaEmpleadas; 