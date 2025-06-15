export interface Empleada {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  rol: 'Estilista' | 'Colorista' | 'Manicurista' | 'Gerente';
  fechaIngreso: string;
  avatar: string;
  especialidades: string[];
  activa: boolean;
  password?: string;
  tipoUsuario: 'admin' | 'empleada';
}

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  tipoUsuario: 'admin' | 'empleada';
  avatar?: string;
  empleadaId?: string;
}

export interface Transaccion {
  id: string;
  tipo: 'ingreso' | 'egreso';
  concepto: string;
  monto: number;
  fecha: string;
  empleadaId?: string;
  categoria: string;
  descripcion?: string;
}

export interface ServicioMensual {
  mes: string;
  ingresos: number;
  egresos: number;
  servicios: number;
}

export interface MetricaEmpleada {
  empleadaId: string;
  nombre: string;
  ingresos: number;
  servicios: number;
  promedio: number;
}

export interface Servicio {
  id: string;
  fecha: string;
  servicio: 'Peinado' | 'Lavado' | 'Corte' | 'Color' | 'Reflejos' | 'Depilación' | 'Manos' | 'Belleza de pies' | 'Pedicuria' | 'Ampollas' | 'Otros';
  precio: number;
  nombreCliente: string;
  empleadaId: string;
  fechaCreacion: string;
}

export interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isEmpleada: boolean;
}

// Tipos para formularios
export interface CrearEmpleadaForm {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  rol: Empleada['rol'];
  especialidades: string[];
}

export interface CrearServicioForm {
  fecha: string;
  servicio: Servicio['servicio'];
  precio: string;
  nombreCliente: string;
}

export interface CrearTransaccionForm {
  tipo: 'ingreso' | 'egreso';
  concepto: string;
  monto: string;
  fecha: string;
  categoria: string;
  descripcion?: string;
}

// Tipos para API responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos para hooks
export interface UseDataFetchOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
}

export interface UseDataFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Tipos para filtros
export interface DateFilter {
  startDate?: string;
  endDate?: string;
  month?: string;
  year?: string;
}

export interface EmpleadaFilter {
  rol?: string;
  busqueda?: string;
  activa?: boolean;
}

// Tipos para métricas del dashboard
export interface DashboardMetrics {
  ingresosTotales: number;
  clientesAtendidas: number;
  serviciosCompletados: number;
  promedioServicio: number;
  tendenciaIngresos: number;
}

export interface ServiceStats {
  serviciosRecientes: Servicio[];
  serviciosPopulares: Array<{
    name: string;
    count: number;
    revenue: number;
  }>;
} 