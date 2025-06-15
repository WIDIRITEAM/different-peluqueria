import { type ClassValue, clsx } from 'clsx';

export const cn = (...inputs: ClassValue[]) => {
  return clsx(inputs);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
};

export const formatShortDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('es-ES', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
};

export const calcularAntiguedad = (fechaIngreso: string): string => {
  const fecha = new Date(fechaIngreso);
  const ahora = new Date();
  const años = ahora.getFullYear() - fecha.getFullYear();
  const meses = ahora.getMonth() - fecha.getMonth();
  
  if (años > 0) {
    return `${años} ${años === 1 ? 'año' : 'años'}`;
  } else if (meses > 0) {
    return `${meses} ${meses === 1 ? 'mes' : 'meses'}`;
  } else {
    return 'Nuevo';
  }
}; 