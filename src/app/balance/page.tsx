'use client';

import React, { useState } from 'react';
import {
  Plus,
  Search,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Edit3,
  Trash2,
  Calendar,
  User,
  X
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import { transacciones, empleadas, servicios } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';

interface TransaccionExtendida {
  id: string;
  fecha: string;
  concepto: string;
  monto: number;
  tipo: 'ingreso' | 'egreso';
  categoria: string;
  empleadaId?: string;
  esServicio?: boolean;
}

const BalancePage: React.FC = () => {
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'ingreso' | 'egreso'>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [transaccionAEliminar, setTransaccionAEliminar] = useState<TransaccionExtendida | null>(null);

  // Crear ingresos automáticos desde servicios
  const ingresosDeServicios: TransaccionExtendida[] = servicios.map(servicio => ({
    id: `servicio-${servicio.id}`,
    fecha: servicio.fecha,
    concepto: `${servicio.servicio} - ${servicio.nombreCliente}`,
    monto: servicio.precio,
    tipo: 'ingreso' as const,
    categoria: 'servicios',
    empleadaId: servicio.empleadaId,
    esServicio: true
  }));

  // Combinar transacciones manuales con servicios
  const todasLasTransacciones: TransaccionExtendida[] = [
    ...transacciones.map(t => ({ ...t, esServicio: false })),
    ...ingresosDeServicios
  ].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  // Filtrar transacciones
  const transaccionesFiltradas = todasLasTransacciones.filter(transaccion => {
    const coincideTipo = filtroTipo === 'todos' || transaccion.tipo === filtroTipo;
    const coincideBusqueda = transaccion.concepto.toLowerCase().includes(busqueda.toLowerCase()) ||
                           transaccion.categoria.toLowerCase().includes(busqueda.toLowerCase());
    return coincideTipo && coincideBusqueda;
  });

  // Calcular totales
  const totalIngresos = todasLasTransacciones
    .filter(t => t.tipo === 'ingreso')
    .reduce((sum, t) => sum + t.monto, 0);

  const totalEgresos = todasLasTransacciones
    .filter(t => t.tipo === 'egreso')
    .reduce((sum, t) => sum + t.monto, 0);

  const balance = totalIngresos - totalEgresos;

  // Ingresos por servicios vs otras fuentes
  const ingresosPorServicios = ingresosDeServicios.reduce((sum, t) => sum + t.monto, 0);

  const handleCrearTransaccion = () => {
    setMostrarFormulario(true);
  };

  const handleEliminarTransaccion = (transaccion: TransaccionExtendida) => {
    setTransaccionAEliminar(transaccion);
    setMostrarConfirmacion(true);
  };

  const confirmarEliminacion = () => {
    if (transaccionAEliminar) {
      console.log('Eliminando transacción:', transaccionAEliminar.concepto);
      setTransaccionAEliminar(null);
    }
  };

  const obtenerNombreEmpleada = (empleadaId?: string) => {
    if (!empleadaId) return 'Sin asignar';
    const empleada = empleadas.find(e => e.id === empleadaId);
    return empleada ? `${empleada.nombre} ${empleada.apellido}` : 'Empleada no encontrada';
  };

  const FormularioTransaccion = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-rose-900/20 backdrop-blur-sm p-4 fade-in">
      <Card className="w-full max-w-lg max-h-[85vh] overflow-y-auto slide-up">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Nueva Transacción</h3>
            <button
              onClick={() => setMostrarFormulario(false)}
              className="p-2 hover:bg-rose-50 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo
              </label>
              <select 
                className="w-full p-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                aria-label="Tipo de transacción"
              >
                <option value="ingreso">Ingreso</option>
                <option value="egreso">Egreso</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Concepto
              </label>
              <input
                type="text"
                className="w-full p-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                placeholder="Ej: Corte y peinado"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monto
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full p-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select 
                className="w-full p-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                aria-label="Categoría de transacción"
              >
                <option value="servicios">Servicios</option>
                <option value="productos">Productos</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="publicidad">Publicidad</option>
                <option value="salarios">Salarios</option>
                <option value="alquiler">Alquiler</option>
                <option value="otros">Otros</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Empleada (solo ingresos)
              </label>
              <select 
                className="w-full p-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                aria-label="Seleccionar empleada"
              >
                <option value="">Seleccionar empleada</option>
                {empleadas.map(empleada => (
                  <option key={empleada.id} value={empleada.id}>
                    {empleada.nombre} {empleada.apellido}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => setMostrarFormulario(false)}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                className="flex-1"
                onClick={() => setMostrarFormulario(false)}
              >
                Guardar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout title="Balance" subtitle="Gestión de ingresos y egresos">

        {/* Confirmación de eliminación */}
        <ConfirmDialog
          isOpen={mostrarConfirmacion}
          onClose={() => {
            setMostrarConfirmacion(false);
            setTransaccionAEliminar(null);
          }}
          onConfirm={confirmarEliminacion}
          title="Eliminar Transacción"
          message={`¿Estás seguro de que querés eliminar la transacción "${transaccionAEliminar?.concepto}"? Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          isDestructive={true}
        />

        <div className="space-y-6">
          {/* Resumen de balance */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Total Ingresos</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalIngresos)}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-rose-500 to-rose-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-rose-100 text-sm">Por Servicios</p>
                    <p className="text-2xl font-bold">{formatCurrency(ingresosPorServicios)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-rose-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Total Egresos</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalEgresos)}</p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-red-200" />
                </div>
              </CardContent>
            </Card>

            <Card className={`bg-gradient-to-r ${balance >= 0 ? 'from-pink-500 to-pink-600' : 'from-orange-500 to-orange-600'} text-white`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Balance Neto</p>
                    <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-white/80" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controles */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  {/* Búsqueda */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Buscar transacciones..."
                      className="pl-10 pr-4 py-2 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 w-full sm:w-64"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                  </div>

                  {/* Filtro por tipo */}
                  <select
                    value={filtroTipo}
                    onChange={(e) => setFiltroTipo(e.target.value as 'todos' | 'ingreso' | 'egreso')}
                    className="px-4 py-2 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    aria-label="Filtrar por tipo"
                  >
                    <option value="todos">Todos</option>
                    <option value="ingreso">Ingresos</option>
                    <option value="egreso">Egresos</option>
                  </select>
                </div>

                <Button onClick={handleCrearTransaccion} className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Transacción
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de transacciones */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-rose-50 border-b border-rose-200">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-gray-900">Fecha</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-900">Concepto</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-900">Categoría</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-900">Empleada</th>
                      <th className="text-right p-4 text-sm font-medium text-gray-900">Monto</th>
                      <th className="text-center p-4 text-sm font-medium text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transaccionesFiltradas.map((transaccion, index) => (
                      <tr key={transaccion.id} className={`hover:bg-rose-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="p-4 text-sm text-gray-900">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {formatDate(transaccion.fecha)}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-medium text-gray-900">
                            {transaccion.concepto}
                          </div>
                          {transaccion.esServicio && (
                            <div className="text-xs text-rose-600 mt-1">
                              📋 Servicio automático
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                            transaccion.categoria === 'servicios' ? 'bg-rose-100 text-rose-800' :
                            transaccion.categoria === 'productos' ? 'bg-blue-100 text-blue-800' :
                            transaccion.categoria === 'mantenimiento' ? 'bg-yellow-100 text-yellow-800' :
                            transaccion.categoria === 'publicidad' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {transaccion.categoria}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-gray-400" />
                            {obtenerNombreEmpleada(transaccion.empleadaId)}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <span className={`text-sm font-medium ${
                            transaccion.tipo === 'ingreso' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaccion.tipo === 'ingreso' ? '+' : '-'}{formatCurrency(transaccion.monto)}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            {!transaccion.esServicio && (
                              <>
                                <button
                                  className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                                  aria-label="Editar transacción"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleEliminarTransaccion(transaccion)}
                                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                  aria-label="Eliminar transacción"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {transaccionesFiltradas.length === 0 && (
                <div className="text-center py-12">
                  <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No se encontraron transacciones
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {busqueda || filtroTipo !== 'todos' 
                      ? 'Intenta cambiar los filtros de búsqueda'
                      : 'Comienza agregando tu primera transacción'
                    }
                  </p>
                  {(!busqueda && filtroTipo === 'todos') && (
                    <Button onClick={handleCrearTransaccion}>
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Primera Transacción
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Modal de formulario */}
        {mostrarFormulario && <FormularioTransaccion />}
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default BalancePage; 