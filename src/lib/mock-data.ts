import { faker } from '@faker-js/faker';
import { Empleada, Transaccion, ServicioMensual, MetricaEmpleada, Usuario, Servicio } from './types';

// Mock de empleadas - Solo un ejemplo
export const empleadas: Empleada[] = [
  {
    id: '1',
    nombre: 'María',
    apellido: 'González',
    email: 'maria@different.com',
    telefono: '+34 123 456 789',
    rol: 'Gerente',
    fechaIngreso: '2020-01-15',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2ec?w=150&h=150&fit=crop&crop=face',
    especialidades: ['Gestión', 'Corte', 'Peinado'],
    activa: true,
    password: 'admin123',
    tipoUsuario: 'admin',
  },
];

// Mock de usuarios (basado en empleadas)
export const usuarios: Usuario[] = empleadas.map(empleada => ({
  id: empleada.id,
  nombre: empleada.nombre,
  apellido: empleada.apellido,
  email: empleada.email,
  password: empleada.password || 'default123',
  tipoUsuario: empleada.tipoUsuario,
  avatar: empleada.avatar,
  empleadaId: empleada.tipoUsuario === 'empleada' ? empleada.id : undefined,
}));

// Mock de servicios realizados - Solo un ejemplo
export const servicios: Servicio[] = [
  {
    id: '1',
    fecha: '2024-01-15',
    servicio: 'Corte',
    precio: 45,
    nombreCliente: 'Ana García',
    empleadaId: '1',
    fechaCreacion: '2024-01-15T10:30:00Z',
  },
];

// Mock de transacciones - Solo un ejemplo de cada tipo
export const transacciones: Transaccion[] = [
  // Ingreso
  {
    id: '1',
    tipo: 'ingreso',
    concepto: 'Corte y Peinado',
    monto: 45,
    fecha: '2024-01-15',
    empleadaId: '1',
    categoria: 'Servicios',
    descripcion: 'Corte moderno y peinado'
  },
  // Egreso
  {
    id: '2',
    tipo: 'egreso',
    concepto: 'Productos de coloración',
    monto: 150,
    fecha: '2024-01-14',
    categoria: 'Insumos',
    descripcion: 'Compra de tintes y oxidantes'
  },
];

// Mock de servicios mensuales - Datos mínimos para mostrar gráficos
export const serviciosMensuales: ServicioMensual[] = [
  { mes: 'Ene', ingresos: 4500, egresos: 1200, servicios: 85 },
  { mes: 'Feb', ingresos: 5200, egresos: 1350, servicios: 92 },
  { mes: 'Mar', ingresos: 4800, egresos: 1180, servicios: 88 },
];

// Mock de métricas por empleada - Solo un ejemplo
export const metricasEmpleadas: MetricaEmpleada[] = [
  {
    empleadaId: '1',
    nombre: 'María González',
    ingresos: 2450,
    servicios: 45,
    promedio: 54.4,
  },
];

// Funciones para generar datos adicionales
export const generarTransaccionAleatoria = (): Transaccion => {
  const tipo = faker.datatype.boolean() ? 'ingreso' : 'egreso';
  const empleadaAleatoria = empleadas[Math.floor(Math.random() * empleadas.length)];
  
  return {
    id: faker.string.uuid(),
    tipo,
    concepto: tipo === 'ingreso' 
      ? faker.helpers.arrayElement(['Corte', 'Coloración', 'Peinado', 'Manicura', 'Tratamiento'])
      : faker.helpers.arrayElement(['Productos', 'Servicios', 'Mantenimiento', 'Publicidad']),
    monto: faker.number.int({ min: 20, max: 150 }),
    fecha: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
    empleadaId: tipo === 'ingreso' ? empleadaAleatoria.id : undefined,
    categoria: tipo === 'ingreso' ? 'Servicios' : faker.helpers.arrayElement(['Insumos', 'Servicios', 'Mantenimiento']),
    descripcion: faker.lorem.sentence(),
  };
}; 