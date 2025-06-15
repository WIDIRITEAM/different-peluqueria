'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, DollarSign, User, Briefcase, Save, CheckCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';

import Button from '@/components/ui/Button';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import { useAuth } from '@/lib/auth-context';
import { servicios } from '@/lib/mock-data';
import { Servicio } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

const tiposServicio = [
  'Peinado',
  'Lavado', 
  'Corte',
  'Color',
  'Reflejos',
  'Depilación',
  'Manos',
  'Belleza de pies',
  'Pedicuria',
  'Ampollas',
  'Otros'
] as const;

const ServicioContent: React.FC = () => {
  const { usuario, isEmpleada } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Datos del formulario
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [servicio, setServicio] = useState<typeof tiposServicio[number]>('Corte');
  const [precio, setPrecio] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');

  // Servicios de la empleada
  const [misServicios, setMisServicios] = useState<Servicio[]>([]);

  useEffect(() => {
    // Redirigir si no es empleada
    if (usuario && !isEmpleada) {
      router.push('/dashboard');
      return;
    }

    // Cargar servicios de la empleada
    if (usuario) {
      const serviciosEmpleada = servicios.filter(s => s.empleadaId === usuario.id);
      setMisServicios(serviciosEmpleada);
    }
  }, [usuario, isEmpleada, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario) return;

    setIsLoading(true);

    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000));

      const nuevoServicio: Servicio = {
        id: Date.now().toString(),
        fecha,
        servicio,
        precio: parseFloat(precio),
        nombreCliente,
        empleadaId: usuario.id,
        fechaCreacion: new Date().toISOString(),
      };

      // Agregar a la lista local (en producción se haría una llamada a API)
      setMisServicios(prev => [nuevoServicio, ...prev]);

      // Limpiar formulario
      setFecha(new Date().toISOString().split('T')[0]);
      setServicio('Corte');
      setPrecio('');
      setNombreCliente('');

      // Mostrar éxito
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

    } catch (error) {
      console.error('Error al guardar servicio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calcular estadísticas de todos los servicios (sin filtros de fecha)
  const totalServicios = misServicios.length;
  const ingresoTotal = misServicios.reduce((sum: number, s: Servicio) => sum + s.precio, 0);
  const promedioServicio = totalServicios > 0 ? ingresoTotal / totalServicios : 0;

  if (!usuario || !isEmpleada) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 fade-in">
          <CheckCircle className="w-5 h-5" />
          <span>Servicio registrado exitosamente</span>
        </div>
      )}

      {/* Estadísticas del mes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-rose-500 to-rose-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-rose-100 text-sm">Total de Servicios</p>
                <p className="text-2xl font-bold">{totalServicios}</p>
              </div>
              <Briefcase className="w-8 h-8 text-rose-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Ingresos Totales</p>
                <p className="text-2xl font-bold">{formatCurrency(ingresoTotal)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Promedio por Servicio</p>
                <p className="text-2xl font-bold">{formatCurrency(promedioServicio)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario de nuevo servicio */}
        <Card className="border-rose-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Registrar Nuevo Servicio</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Fecha */}
              <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha del Servicio
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="fecha"
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Tipo de servicio */}
              <div>
                <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Servicio
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="servicio"
                    value={servicio}
                    onChange={(e) => setServicio(e.target.value as typeof tiposServicio[number])}
                    className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    required
                    disabled={isLoading}
                    aria-label="Tipo de servicio"
                  >
                    {tiposServicio.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Precio */}
              <div>
                <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio del Servicio
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="precio"
                    type="number"
                    step="0.01"
                    min="0"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="0.00"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Nombre del cliente */}
              <div>
                <label htmlFor="cliente" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Cliente
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="cliente"
                    type="text"
                    value={nombreCliente}
                    onChange={(e) => setNombreCliente(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="Nombre completo"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{isLoading ? 'Guardando...' : 'Guardar Servicio'}</span>
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Lista de servicios del mes */}
        <Card className="border-rose-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Mis Servicios Recientes</h3>
            
            {misServicios.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {misServicios.slice(0, 10).map((servicio: Servicio) => (
                  <div key={servicio.id} className="flex items-center justify-between p-4 bg-rose-50 rounded-lg border border-rose-100">
                    <div>
                      <p className="font-medium text-gray-900">{servicio.nombreCliente}</p>
                      <p className="text-sm text-gray-600">{servicio.servicio}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(servicio.fecha).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-rose-600">{formatCurrency(servicio.precio)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium text-gray-900 mb-2">No hay servicios</p>
                <p>No tienes servicios registrados en este mes</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ServicioPage: React.FC = () => {
  return (
    <ProtectedRoute allowedRoles={['empleada']}>
      <DashboardLayout title="Gestión de Servicios" subtitle="Registra los servicios realizados">
        <ServicioContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default ServicioPage; 