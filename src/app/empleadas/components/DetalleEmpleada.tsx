import React from 'react';
import { X, User, Mail, Phone, Calendar, Briefcase, MapPin, Award } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Empleada, MetricaEmpleada } from '@/lib/types';
import { calcularAntiguedad, formatCurrency } from '@/lib/utils';

interface DetalleEmpleadaProps {
  isOpen: boolean;
  onClose: () => void;
  empleada: Empleada | null;
  metricas?: MetricaEmpleada;
  onEditar: (empleada: Empleada) => void;
}

const DetalleEmpleada: React.FC<DetalleEmpleadaProps> = ({
  isOpen,
  onClose,
  empleada,
  metricas,
  onEditar
}) => {
  if (!isOpen || !empleada) return null;

  const handleEdit = () => {
    onEditar(empleada);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-rose-900/20 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl border border-rose-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-rose-200 to-pink-300"></div>
          <div className="absolute -bottom-12 left-6">
            <img
              src={empleada.avatar}
              alt={`${empleada.nombre} ${empleada.apellido}`}
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="pt-16 p-6">
          
          {/* Información básica */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {empleada.nombre} {empleada.apellido}
                </h2>
                <p className="text-rose-600 font-medium text-lg">{empleada.rol}</p>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {calcularAntiguedad(empleada.fechaIngreso)} en la empresa
                </div>
              </div>
            </div>

            {/* Estado */}
            <div className="flex items-center space-x-4 mb-6">
              <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                empleada.activa 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  empleada.activa ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                {empleada.activa ? 'Activa' : 'Inactiva'}
              </div>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-rose-600" />
                Información de Contacto
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{empleada.email}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{empleada.telefono}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                  <span>Ingreso: {new Date(empleada.fechaIngreso).toLocaleDateString('es-ES')}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Briefcase className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{empleada.rol}</span>
                </div>
              </div>
            </div>

            {/* Métricas */}
            {metricas && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-rose-600" />
                  Rendimiento
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-rose-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-rose-600">
                      {formatCurrency(metricas.ingresos)}
                    </p>
                    <p className="text-sm text-gray-600">Ingresos</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {metricas.servicios}
                    </p>
                    <p className="text-sm text-gray-600">Servicios</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg text-center col-span-2">
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(metricas.promedio)}
                    </p>
                    <p className="text-sm text-gray-600">Promedio por servicio</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Especialidades */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Award className="w-5 h-5 mr-2 text-rose-600" />
              Especialidades
            </h3>
            <div className="flex flex-wrap gap-2">
              {empleada.especialidades.map((especialidad, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-rose-100 text-rose-700 text-sm rounded-full font-medium"
                >
                  {especialidad}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Cerrar
            </Button>
            <Button
              onClick={handleEdit}
              className="flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Editar Empleada</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleEmpleada; 