import { useState, useEffect, useCallback } from 'react';
import { DashboardMetrics, ServiceStats, DateFilter } from '../types';
import { servicios as mockServicios, transacciones as mockTransacciones, empleadas as mockEmpleadas } from '../mock-data';

export const useDashboardMetrics = (filter?: DateFilter): {
  data: DashboardMetrics | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} => {
  const [data, setData] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Reemplazar con llamada real a API
      // const response = await fetch('/api/dashboard/metrics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(filter)
      // });
      // const result = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Filtrar datos según el filtro de fecha
      let serviciosFiltrados = [...mockServicios];
      let transaccionesFiltradas = [...mockTransacciones];
      
      if (filter?.month) {
        serviciosFiltrados = mockServicios.filter(servicio => {
          const servicioDate = new Date(servicio.fecha);
          const servicioMonth = `${servicioDate.getFullYear()}-${String(servicioDate.getMonth() + 1).padStart(2, '0')}`;
          return servicioMonth === filter.month;
        });
        
        transaccionesFiltradas = mockTransacciones.filter(transaccion => {
          const transaccionDate = new Date(transaccion.fecha);
          const transaccionMonth = `${transaccionDate.getFullYear()}-${String(transaccionDate.getMonth() + 1).padStart(2, '0')}`;
          return transaccionMonth === filter.month;
        });
      }
      
      // Crear ingresos automáticos desde servicios
      const ingresosDeServicios = serviciosFiltrados.map(servicio => ({
        id: `servicio-${servicio.id}`,
        fecha: servicio.fecha,
        concepto: `${servicio.servicio} - ${servicio.nombreCliente}`,
        monto: servicio.precio,
        tipo: 'ingreso' as const,
        categoria: 'servicios',
        empleadaId: servicio.empleadaId
      }));
      
      // Calcular métricas
      const ingresosTotales = [
        ...transaccionesFiltradas.filter(t => t.tipo === 'ingreso'),
        ...ingresosDeServicios
      ].reduce((sum, t) => sum + t.monto, 0);
      
      const clientesAtendidas = serviciosFiltrados.length;
      const serviciosCompletados = serviciosFiltrados.length;
      const promedioServicio = serviciosCompletados > 0 ? ingresosTotales / serviciosCompletados : 0;
      
      // Calcular tendencia (comparar con mes anterior)
      const fechaActual = new Date();
      const mesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 1);
      const mesAnteriorStr = `${mesAnterior.getFullYear()}-${String(mesAnterior.getMonth() + 1).padStart(2, '0')}`;
      
      const serviciosMesAnterior = mockServicios.filter(s => {
        const serviceDate = new Date(s.fecha);
        const serviceMonth = `${serviceDate.getFullYear()}-${String(serviceDate.getMonth() + 1).padStart(2, '0')}`;
        return serviceMonth === mesAnteriorStr;
      });
      
      const ingresosMesAnterior = serviciosMesAnterior.reduce((sum, s) => sum + s.precio, 0);
      const tendenciaIngresos = ingresosMesAnterior > 0 
        ? ((ingresosTotales - ingresosMesAnterior) / ingresosMesAnterior) * 100 
        : 0;
      
      setData({
        ingresosTotales,
        clientesAtendidas,
        serviciosCompletados,
        promedioServicio,
        tendenciaIngresos
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar métricas del dashboard');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return { data, loading, error, refetch: fetchMetrics };
};

export const useServiceStats = (filter?: DateFilter): {
  data: ServiceStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} => {
  const [data, setData] = useState<ServiceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServiceStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Reemplazar con llamada real a API
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Filtrar servicios
      let serviciosFiltrados = [...mockServicios];
      
      if (filter?.month) {
        serviciosFiltrados = mockServicios.filter(servicio => {
          const servicioDate = new Date(servicio.fecha);
          const servicioMonth = `${servicioDate.getFullYear()}-${String(servicioDate.getMonth() + 1).padStart(2, '0')}`;
          return servicioMonth === filter.month;
        });
      }
      
      // Servicios recientes
      const serviciosRecientes = serviciosFiltrados
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
        .slice(0, 5);
      
      // Servicios más populares
      const serviciosPorTipo = serviciosFiltrados.reduce((acc, servicio) => {
        acc[servicio.servicio] = (acc[servicio.servicio] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const serviciosPopulares = Object.entries(serviciosPorTipo)
        .map(([servicio, cantidad]) => ({
          name: servicio,
          count: cantidad,
          revenue: serviciosFiltrados
            .filter(s => s.servicio === servicio)
            .reduce((sum, s) => sum + s.precio, 0)
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 4);
      
      setData({
        serviciosRecientes,
        serviciosPopulares
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar estadísticas de servicios');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchServiceStats();
  }, [fetchServiceStats]);

  return { data, loading, error, refetch: fetchServiceStats };
};

export const useEmpleadaNombre = () => {
  const obtenerNombreEmpleada = useCallback((empleadaId: string): string => {
    const empleada = mockEmpleadas.find(e => e.id === empleadaId);
    return empleada ? empleada.nombre : 'Sin asignar';
  }, []);

  return { obtenerNombreEmpleada };
}; 