import { faker } from '@faker-js/faker';
import { Empleada, Transaccion, ServicioMensual, MetricaEmpleada, Usuario, Servicio } from './types';

// Mock de empleadas - Datos de ejemplo para testing
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
  {
    id: '2',
    nombre: 'Ana',
    apellido: 'Martínez',
    email: 'ana@different.com',
    telefono: '+34 123 456 790',
    rol: 'Estilista',
    fechaIngreso: '2021-03-10',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    especialidades: ['Corte', 'Peinado', 'Color'],
    activa: true,
    password: 'ana123',
    tipoUsuario: 'empleada',
  },
  {
    id: '3',
    nombre: 'Carmen',
    apellido: 'López',
    email: 'carmen@different.com',
    telefono: '+34 123 456 791',
    rol: 'Colorista',
    fechaIngreso: '2021-06-15',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    especialidades: ['Color', 'Permanente', 'Alisado'],
    activa: true,
    password: 'carmen123',
    tipoUsuario: 'empleada',
  },
  {
    id: '4',
    nombre: 'Laura',
    apellido: 'Fernández',
    email: 'laura@different.com',
    telefono: '+34 123 456 792',
    rol: 'Manicurista',
    fechaIngreso: '2022-01-20',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    especialidades: ['Manicura', 'Pedicura', 'Uñas de gel'],
    activa: true,
    password: 'laura123',
    tipoUsuario: 'empleada',
  },
  {
    id: '5',
    nombre: 'Sofia',
    apellido: 'Ruiz',
    email: 'sofia@different.com',
    telefono: '+34 123 456 793',
    rol: 'Estilista',
    fechaIngreso: '2022-09-05',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    especialidades: ['Corte', 'Peinado', 'Maquillaje'],
    activa: true,
    password: 'sofia123',
    tipoUsuario: 'empleada',
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

// Mock de servicios realizados - Datos de ejemplo
export const servicios: Servicio[] = [
  {
    id: '1',
    fecha: '2024-01-15',
    servicio: 'Corte',
    precio: 45,
    nombreCliente: 'Ana García',
    empleadaId: '2',
    fechaCreacion: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    fecha: '2024-01-16',
    servicio: 'Coloración',
    precio: 85,
    nombreCliente: 'María Torres',
    empleadaId: '3',
    fechaCreacion: '2024-01-16T11:15:00Z',
  },
  {
    id: '3',
    fecha: '2024-01-17',
    servicio: 'Manicura',
    precio: 25,
    nombreCliente: 'Laura Sánchez',
    empleadaId: '4',
    fechaCreacion: '2024-01-17T14:20:00Z',
  },
];

// Mock de transacciones - Datos de ejemplo
export const transacciones: Transaccion[] = [
  // Ingresos
  {
    id: '1',
    tipo: 'ingreso',
    concepto: 'Corte y Peinado',
    monto: 45,
    fecha: '2024-01-15',
    empleadaId: '2',
    categoria: 'Servicios',
    descripcion: 'Corte moderno y peinado'
  },
  {
    id: '2',
    tipo: 'ingreso',
    concepto: 'Coloración completa',
    monto: 85,
    fecha: '2024-01-16',
    empleadaId: '3',
    categoria: 'Servicios',
    descripcion: 'Coloración con mechas'
  },
  {
    id: '3',
    tipo: 'ingreso',
    concepto: 'Manicura francesa',
    monto: 25,
    fecha: '2024-01-17',
    empleadaId: '4',
    categoria: 'Servicios',
    descripcion: 'Manicura francesa con gel'
  },
  // Egresos
  {
    id: '4',
    tipo: 'egreso',
    concepto: 'Productos de coloración',
    monto: 150,
    fecha: '2024-01-14',
    categoria: 'Insumos',
    descripcion: 'Compra de tintes y oxidantes'
  },
  {
    id: '5',
    tipo: 'egreso',
    concepto: 'Material de manicura',
    monto: 80,
    fecha: '2024-01-13',
    categoria: 'Insumos',
    descripcion: 'Esmaltes y limas profesionales'
  },
];

// Mock de servicios mensuales - Datos para gráficos
export const serviciosMensuales: ServicioMensual[] = [
  { mes: 'Ene', ingresos: 4500, egresos: 1200, servicios: 85 },
  { mes: 'Feb', ingresos: 5200, egresos: 1350, servicios: 92 },
  { mes: 'Mar', ingresos: 4800, egresos: 1180, servicios: 88 },
  { mes: 'Abr', ingresos: 5500, egresos: 1400, servicios: 95 },
  { mes: 'May', ingresos: 6100, egresos: 1450, servicios: 102 },
  { mes: 'Jun', ingresos: 5800, egresos: 1300, servicios: 98 },
];

// Mock de métricas por empleada - Datos de ejemplo
export const metricasEmpleadas: MetricaEmpleada[] = [
  {
    empleadaId: '1',
    nombre: 'María González',
    ingresos: 2450,
    servicios: 45,
    promedio: 54.4,
  },
  {
    empleadaId: '2',
    nombre: 'Ana Martínez',
    ingresos: 1890,
    servicios: 42,
    promedio: 45.0,
  },
  {
    empleadaId: '3',
    nombre: 'Carmen López',
    ingresos: 2180,
    servicios: 28,
    promedio: 77.9,
  },
  {
    empleadaId: '4',
    nombre: 'Laura Fernández',
    ingresos: 980,
    servicios: 39,
    promedio: 25.1,
  },
  {
    empleadaId: '5',
    nombre: 'Sofia Ruiz',
    ingresos: 1650,
    servicios: 35,
    promedio: 47.1,
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