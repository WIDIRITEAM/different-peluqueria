'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MetricCard from '@/components/dashboard/MetricCard';
import IngresosCard from './components/IngresosCard';
import ServiciosRecientesCard from './components/ServiciosRecientesCard';
import ServiciosPopularesCard from './components/ServiciosPopularesCard';
import { Card, CardContent } from '@/components/ui/Card';
import { useDateFilter } from '@/components/ui/DateFilter';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import { 
  Users, 
  Calendar, 
  TrendingUp,
  Scissors
} from 'lucide-react';
import { useDashboardMetrics, useServiceStats, useEmpleadaNombre } from '@/lib/hooks/useDashboard';
import { formatCurrency } from '@/lib/utils';
import { empleadas } from '@/lib/mock-data';
import { useState, useEffect } from 'react';

const DashboardContent = () => {
  const { getFilteredData } = useDateFilter();
  const [currentFilter, setCurrentFilter] = useState<{ month?: string }>({});
  const { obtenerNombreEmpleada } = useEmpleadaNombre();
  
  // Obtener filtro actual
  React.useEffect(() => {
    const fechaActual = new Date();
    const mesActual = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, '0')}`;
    setCurrentFilter({ month: mesActual });
  }, []);

  const { 
    data: metrics, 
    loading: metricsLoading, 
    error: metricsError 
  } = useDashboardMetrics(currentFilter);

  const { 
    data: serviceStats, 
    loading: statsLoading, 
    error: statsError 
  } = useServiceStats(currentFilter);

  if (metricsError || statsError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error al cargar datos del dashboard</p>
          <p className="text-gray-500 text-sm">{metricsError || statsError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Ingresos */}
        <IngresosCard
          ingresos={metrics?.ingresosTotales || 0}
          tendencia={metrics?.tendenciaIngresos || 0}
          loading={metricsLoading}
        />

        {/* Clientes */}
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            {metricsLoading ? (
              <div className="animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-green-300 rounded w-24"></div>
                    <div className="h-8 bg-green-300 rounded w-16"></div>
                  </div>
                  <div className="w-8 h-8 bg-green-300 rounded"></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Clientes Atendidas</p>
                  <p className="text-3xl font-bold">{metrics?.clientesAtendidas || 0}</p>
                </div>
                <Users className="w-8 h-8 text-green-200" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Citas */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            {metricsLoading ? (
              <div className="animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-blue-300 rounded w-24"></div>
                    <div className="h-8 bg-blue-300 rounded w-16"></div>
                  </div>
                  <div className="w-8 h-8 bg-blue-300 rounded"></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Citas Completadas</p>
                  <p className="text-3xl font-bold">{metrics?.serviciosCompletados || 0}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-200" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Promedio */}
        <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
          <CardContent className="p-6">
            {metricsLoading ? (
              <div className="animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-pink-300 rounded w-24"></div>
                    <div className="h-8 bg-pink-300 rounded w-20"></div>
                  </div>
                  <div className="w-8 h-8 bg-pink-300 rounded"></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm">Promedio por Servicio</p>
                  <p className="text-3xl font-bold">{formatCurrency(metrics?.promedioServicio || 0)}</p>
                </div>
                <Scissors className="w-8 h-8 text-pink-200" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sección de resumen */}
      <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Resumen del Mes</h3>
            <div className="flex items-center text-sm text-rose-600">
              <TrendingUp className="w-5 h-5 mr-2" />
              {metricsLoading ? 'Cargando...' : `${metrics?.tendenciaIngresos >= 0 ? '+' : ''}${Math.round(metrics?.tendenciaIngresos || 0)}% vs mes anterior`}
            </div>
          </div>
          
          {metricsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse text-center p-4 bg-white rounded-lg border border-rose-100">
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border border-rose-100">
                <p className="text-2xl font-bold text-rose-600">{metrics?.serviciosCompletados || 0}</p>
                <p className="text-sm text-gray-500">Servicios</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-rose-100">
                <p className="text-2xl font-bold text-rose-600">{formatCurrency(metrics?.ingresosTotales || 0)}</p>
                <p className="text-sm text-gray-500">Ingresos</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-rose-100">
                <p className="text-2xl font-bold text-rose-600">{empleadas.filter(e => e.activa).length}</p>
                <p className="text-sm text-gray-500">Empleadas</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-rose-100">
                <p className="text-2xl font-bold text-rose-600">
                  {formatCurrency(metrics?.promedioServicio || 0)}
                </p>
                <p className="text-sm text-gray-500">Promedio</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Servicios recientes */}
        <ServiciosRecientesCard
          servicios={serviceStats?.serviciosRecientes || []}
          obtenerNombreEmpleada={obtenerNombreEmpleada}
          loading={statsLoading}
        />

        {/* Servicios populares */}
        <ServiciosPopularesCard
          servicios={serviceStats?.serviciosPopulares || []}
          loading={statsLoading}
        />
      </div>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout title="Dashboard" subtitle="Resumen general del negocio">
        <DashboardContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DashboardPage; 