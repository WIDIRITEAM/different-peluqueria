'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  Plus,
  Search,
  User,
  Users
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent} from '@/components/ui/Card';
import { Empleada } from '@/lib/types';
import Button from '@/components/ui/Button';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import EmpleadaCard from './components/EmpleadaCard';
import FormularioEmpleada, { FormularioEmpleadaData } from './components/FormularioEmpleada';
import DetalleEmpleada from './components/DetalleEmpleada';
import { useEmpleadas, useCrearEmpleada } from '@/lib/hooks/useEmpleadas';
import { metricasEmpleadas } from '@/lib/mock-data';

const EmpleadasPage: React.FC = () => {
  const [filtroRol, setFiltroRol] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [empleadaSeleccionada, setEmpleadaSeleccionada] = useState<Empleada | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarEdicion, setMostrarEdicion] = useState(false);
  const [empleadaEdicion, setEmpleadaEdicion] = useState<Empleada | null>(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [empleadaAEliminar, setEmpleadaAEliminar] = useState<Empleada | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    rol: 'Estilista' as Empleada['rol'],
    especialidades: [] as string[]
  });

  // Memoizar filtro para evitar re-renderizado en loop
  const filter = useMemo(() => ({
    rol: filtroRol !== 'todos' ? filtroRol : undefined,
    busqueda: busqueda || undefined,
    activa: true
  }), [filtroRol, busqueda]);

  // Hooks
  const { data: empleadas, loading, error, refetch } = useEmpleadas(filter);
  const { crearEmpleada, loading: creatingLoading } = useCrearEmpleada();

  const roles = ['Estilista', 'Colorista', 'Manicurista', 'Gerente'];

  // Handlers optimizados
  const handleCrearEmpleada = useCallback(() => {
    setMostrarFormulario(true);
  }, []);

  const handleEditarEmpleada = useCallback((empleada: Empleada) => {
    setEmpleadaEdicion(empleada);
    setFormData({
      nombre: empleada.nombre,
      apellido: empleada.apellido,
      email: empleada.email,
      telefono: empleada.telefono,
      rol: empleada.rol,
      especialidades: empleada.especialidades
    });
    setMostrarEdicion(true);
  }, []);

  const handleEliminarEmpleada = useCallback((empleada: Empleada) => {
    setEmpleadaAEliminar(empleada);
    setMostrarConfirmacion(true);
  }, []);

  const confirmarEliminacion = useCallback(() => {
    if (empleadaAEliminar) {
      console.log('Eliminando empleada:', empleadaAEliminar.nombre);
      // TODO: Implementar eliminación real
      setEmpleadaAEliminar(null);
      setMostrarConfirmacion(false);
      refetch();
    }
  }, [empleadaAEliminar, refetch]);

  const handleGuardarEmpleada = useCallback(async (formData: FormularioEmpleadaData) => {
    const success = await crearEmpleada(formData);
    if (success) {
      setMostrarFormulario(false);
      refetch();
    }
    return success;
  }, [crearEmpleada, refetch]);

  const handleGuardarEdicion = useCallback(async (formData: FormularioEmpleadaData) => {
    console.log('Empleada editada:', formData);
    console.log('Empleada original:', empleadaEdicion);
    // TODO: Implementar actualización real
    setMostrarEdicion(false);
    setEmpleadaEdicion(null);
    refetch();
    return true;
  }, [empleadaEdicion, refetch]);

  // Obtener métricas de una empleada específica
  const obtenerMetricasEmpleada = useCallback((empleadaId: string) => {
    return metricasEmpleadas.find(m => m.empleadaId === empleadaId);
  }, []);

  // Optimizar handler de especialidades para evitar rerender
  const handleEspecialidadChange = useCallback((especialidad: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      especialidades: checked 
        ? [...prev.especialidades, especialidad]
        : prev.especialidades.filter(esp => esp !== especialidad)
    }));
  }, []);

  // Memoizar especialidades disponibles
  const especialidadesDisponibles = React.useMemo(() => 
    ['Corte', 'Peinado', 'Color', 'Permanente', 'Alisado', 'Maquillaje', 'Manicura', 'Pedicura'], 
    []
  );

  // Componente de estadísticas memoizado
  const EstadisticasEmpleadas = React.memo(() => {
    const totalEmpleadas = empleadas?.length || 0;
    const empleadasActivas = empleadas?.filter(e => e.activa).length || 0;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-r from-rose-500 to-rose-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-rose-100 text-sm">Total Empleadas</p>
                <p className="text-3xl font-bold">{totalEmpleadas}</p>
              </div>
              <Users className="w-8 h-8 text-rose-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Empleadas Activas</p>
                <p className="text-3xl font-bold">{empleadasActivas}</p>
              </div>
              <User className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Roles Diferentes</p>
                <p className="text-3xl font-bold">{roles.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  });
  
  EstadisticasEmpleadas.displayName = 'EstadisticasEmpleadas';

  // Componente de filtros memoizado
  const FiltrosEmpleadas = React.memo(() => (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre, apellido o email..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              />
            </div>
          </div>
          
          <div className="md:w-48">
            <select
              value={filtroRol}
              onChange={(e) => setFiltroRol(e.target.value)}
              className="w-full px-4 py-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            >
              <option value="todos">Todos los roles</option>
              {roles.map(rol => (
                <option key={rol} value={rol}>{rol}</option>
              ))}
            </select>
          </div>

          <Button onClick={handleCrearEmpleada} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Nueva Empleada</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  ));
  
  FiltrosEmpleadas.displayName = 'FiltrosEmpleadas';

  // Manejar estados de carga y error
  if (error) {
    return (
      <ProtectedRoute allowedRoles={['admin']}>
        <DashboardLayout title="Empleadas" subtitle="Gestión de personal">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-2">Error al cargar empleadas</p>
              <p className="text-gray-500 text-sm">{error}</p>
              <Button onClick={refetch} className="mt-4">
                Reintentar
              </Button>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout title="Empleadas" subtitle="Gestión de personal">
        <div className="space-y-6">
          <EstadisticasEmpleadas />
          <FiltrosEmpleadas />

          {/* Lista de empleadas */}
          {loading ? (
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
          ) : empleadas && empleadas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {empleadas.map((empleada) => (
                <EmpleadaCard
                  key={empleada.id}
                  empleada={empleada}
                  metricas={obtenerMetricasEmpleada(empleada.id)}
                  onVerDetalles={setEmpleadaSeleccionada}
                  onEditar={handleEditarEmpleada}
                  onEliminar={handleEliminarEmpleada}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay empleadas</h3>
              <p className="text-gray-500 mb-4">No se encontraron empleadas con los filtros aplicados.</p>
              <Button onClick={handleCrearEmpleada}>
                <Plus className="w-4 h-4 mr-2" />
                Crear primera empleada
              </Button>
            </div>
          )}

          {/* Modal de detalle de empleada */}
          <DetalleEmpleada
            isOpen={!!empleadaSeleccionada}
            empleada={empleadaSeleccionada}
            metricas={empleadaSeleccionada ? obtenerMetricasEmpleada(empleadaSeleccionada.id) : undefined}
            onClose={() => setEmpleadaSeleccionada(null)}
            onEditar={handleEditarEmpleada}
          />

          {/* Modal de formulario para crear empleada */}
          <FormularioEmpleada
            isOpen={mostrarFormulario}
            onClose={() => setMostrarFormulario(false)}
            onSave={handleGuardarEmpleada}
            isEditing={false}
          />

          {/* Modal de formulario para editar empleada */}
          <FormularioEmpleada
            isOpen={mostrarEdicion}
            onClose={() => {
              setMostrarEdicion(false);
              setEmpleadaEdicion(null);
            }}
            onSave={handleGuardarEdicion}
            empleada={empleadaEdicion}
            isEditing={true}
          />

          {/* Diálogo de confirmación */}
          {mostrarConfirmacion && empleadaAEliminar && (
            <ConfirmDialog
              isOpen={mostrarConfirmacion}
              title="Eliminar Empleada"
              message={`¿Estás seguro de que deseas eliminar a ${empleadaAEliminar.nombre} ${empleadaAEliminar.apellido}?`}
              confirmText="Eliminar"
              cancelText="Cancelar"
              onConfirm={confirmarEliminacion}
              onClose={() => {
                setMostrarConfirmacion(false);
                setEmpleadaAEliminar(null);
              }}
              isDestructive={true}
            />
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default EmpleadasPage; 