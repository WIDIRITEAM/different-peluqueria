import { useState, useEffect, useCallback } from 'react';
import { Empleada, CrearEmpleadaForm, UseDataFetchResult, EmpleadaFilter, MetricaEmpleada } from '../types';
import { empleadas as mockEmpleadas, metricasEmpleadas } from '../mock-data';

export const useEmpleadas = (filter?: EmpleadaFilter): UseDataFetchResult<Empleada[]> => {
  const [data, setData] = useState<Empleada[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmpleadas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Reemplazar con llamada real a API
      // const response = await fetch('/api/empleadas');
      // const result = await response.json();
      
      // Simulación de llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredData = [...mockEmpleadas];
      
      if (filter) {
        if (filter.rol && filter.rol !== 'todos') {
          filteredData = filteredData.filter(emp => emp.rol === filter.rol);
        }
        
        if (filter.busqueda) {
          const searchTerm = filter.busqueda.toLowerCase();
          filteredData = filteredData.filter(emp => 
            emp.nombre.toLowerCase().includes(searchTerm) ||
            emp.apellido.toLowerCase().includes(searchTerm) ||
            emp.email.toLowerCase().includes(searchTerm)
          );
        }
        
        if (filter.activa !== undefined) {
          filteredData = filteredData.filter(emp => emp.activa === filter.activa);
        }
      }
      
      setData(filteredData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar empleadas');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchEmpleadas();
  }, [fetchEmpleadas]);

  return { data, loading, error, refetch: fetchEmpleadas };
};

export const useEmpleada = (id: string): UseDataFetchResult<Empleada> => {
  const [data, setData] = useState<Empleada | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmpleada = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Reemplazar con llamada real a API
      // const response = await fetch(`/api/empleadas/${id}`);
      // const result = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const empleada = mockEmpleadas.find(emp => emp.id === id);
      if (!empleada) {
        throw new Error('Empleada no encontrada');
      }
      
      setData(empleada);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar empleada');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEmpleada();
  }, [fetchEmpleada]);

  return { data, loading, error, refetch: fetchEmpleada };
};

export const useCrearEmpleada = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const crearEmpleada = useCallback(async (formData: CrearEmpleadaForm): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Reemplazar con llamada real a API
      // const response = await fetch('/api/empleadas', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // if (!response.ok) throw new Error('Error al crear empleada');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const nuevaEmpleada: Empleada = {
        ...formData,
        id: Date.now().toString(),
        fechaIngreso: new Date().toISOString().split('T')[0],
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2ec?w=150&h=150&fit=crop&crop=face',
        activa: true,
        password: 'empleada123',
        tipoUsuario: 'empleada',
      };
      
      console.log('Empleada creada:', nuevaEmpleada);
      return true;
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear empleada');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { crearEmpleada, loading, error };
};

export const useMetricasEmpleada = (empleadaId: string) => {
  const [data, setData] = useState<MetricaEmpleada | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetricas = useCallback(async () => {
    if (!empleadaId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Reemplazar con llamada real a API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const metricas = metricasEmpleadas.find(m => m.empleadaId === empleadaId);
      setData(metricas || null);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar métricas');
    } finally {
      setLoading(false);
    }
  }, [empleadaId]);

  useEffect(() => {
    fetchMetricas();
  }, [fetchMetricas]);

  return { data, loading, error, refetch: fetchMetricas };
}; 