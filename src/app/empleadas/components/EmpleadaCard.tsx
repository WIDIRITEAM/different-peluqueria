import React from 'react';
import { Phone, Mail, Calendar, Edit3, Eye, Trash2 } from 'lucide-react';
import { Empleada, MetricaEmpleada } from '@/lib/types';
import { formatCurrency, calcularAntiguedad } from '@/lib/utils';

interface EmpleadaCardProps {
  empleada: Empleada;
  metricas?: MetricaEmpleada;
  onVerDetalles: (empleada: Empleada) => void;
  onEditar: (empleada: Empleada) => void;
  onEliminar: (empleada: Empleada) => void;
}

const EmpleadaCard: React.FC<EmpleadaCardProps> = React.memo(({
  empleada,
  metricas,
  onVerDetalles,
  onEditar,
  onEliminar
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-rose-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
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
                key={`${empleada.id}-especialidad-${index}`}
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
});

// Añadir displayName para depuración
EmpleadaCard.displayName = 'EmpleadaCard';

export default EmpleadaCard; 