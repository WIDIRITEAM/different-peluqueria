import { useState, useEffect, useCallback } from 'react';
import { Servicio, CrearServicioForm, UseDataFetchResult, DateFilter } from '../types';
import { servicios as mockServicios } from '../mock-data';

export const useServicios = (filter?: DateFilter & { empleadaId?: string }): UseDataFetchResult<Servicio[]> => {
  const [data, setData] = useState<Servicio[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServicios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Reemplazar con llamada real a API
      // const response = await fetch('/api/servicios', {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(filter)
      // });
      // const result = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 400));
      
      let filteredData = [...mockServicios];
      
      if (filter) {
        if (filter.empleadaId) {
          filteredData = filteredData.filter(servicio => servicio.empleadaId === filter.empleadaId);
        }
        
        if (filter.startDate) {
          filteredData = filteredData.filter(servicio => servicio.fecha >= filter.startDate!);
        }
        
        if (filter.endDate) {
          filteredData = filteredData.filter(servicio => servicio.fecha <= filter.endDate!);
        }
        
        if (filter.month) {
          filteredData = filteredData.filter(servicio => {
            const servicioDate = new Date(servicio.fecha);
            const servicioMonth = `${servicioDate.getFullYear()}-${String(servicioDate.getMonth() + 1).padStart(2, '0')}`;
            return servicioMonth === filter.month;
          });
        }
      }
      
      // Ordenar por fecha descendente
      filteredData.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      
      setData(filteredData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar servicios');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchServicios();
  }, [fetchServicios]);

  return { data, loading, error, refetch: fetchServicios };
};

export const useCrearServicio = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const crearServicio = useCallback(async (formData: CrearServicioForm & { empleadaId: string }): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Reemplazar con llamada real a API
      // const response = await fetch('/api/servicios', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // if (!response.ok) throw new Error('Error al crear servicio');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const nuevoServicio: Servicio = {
        id: Date.now().toString(),
        fecha: formData.fecha,
        servicio: formData.servicio,
        precio: parseFloat(formData.precio),
        nombreCliente: formData.nombreCliente,
        empleadaId: formData.empleadaId,
        fechaCreacion: new Date().toISOString(),
      };
      
      console.log('Servicio creado:', nuevoServicio);
      return true;
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear servicio');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { crearServicio, loading, error };
};

export const useEstadisticasServicios = (empleadaId?: string) => {
  const [data, setData] = useState<{
    totalServicios: number;
    ingresoTotal: number;
    promedioServicio: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEstadisticas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Reemplazar con llamada real a API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let serviciosParaCalcular = mockServicios;
      
      if (empleadaId) {
        serviciosParaCalcular = mockServicios.filter(s => s.empleadaId === empleadaId);
      }
      
      const totalServicios = serviciosParaCalcular.length;
      const ingresoTotal = serviciosParaCalcular.reduce((sum, s) => sum + s.precio, 0);
      const promedioServicio = totalServicios > 0 ? ingresoTotal / totalServicios : 0;
      
      setData({
        totalServicios,
        ingresoTotal,
        promedioServicio
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  }, [empleadaId]);

  useEffect(() => {
    fetchEstadisticas();
  }, [fetchEstadisticas]);

  return { data, loading, error, refetch: fetchEstadisticas };
}; 