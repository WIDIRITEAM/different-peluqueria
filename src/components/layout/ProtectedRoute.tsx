'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'empleada')[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ['admin', 'empleada'],
  redirectTo 
}) => {
  const { usuario, isAuthenticated, isAdmin, isEmpleada } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Verificar si el usuario tiene el rol permitido
    const hasPermission = allowedRoles.some(role => {
      if (role === 'admin' && isAdmin) return true;
      if (role === 'empleada' && isEmpleada) return true;
      return false;
    });

    if (!hasPermission) {
      // Redirigir según el rol del usuario
      const defaultRedirect = isAdmin ? '/dashboard' : '/servicio';
      router.push(redirectTo || defaultRedirect);
      return;
    }
  }, [isAuthenticated, isAdmin, isEmpleada, allowedRoles, router, redirectTo]);

  // Mostrar loading mientras se verifica la autenticación
  if (!isAuthenticated || !usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Verificar permisos
  const hasPermission = allowedRoles.some(role => {
    if (role === 'admin' && isAdmin) return true;
    if (role === 'empleada' && isEmpleada) return true;
    return false;
  });

  if (!hasPermission) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-red-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Acceso Denegado</h2>
            <p className="text-red-600 mb-4">No tienes permisos para acceder a esta página</p>
            <button
              onClick={() => router.push(isAdmin ? '/dashboard' : '/servicio')}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Ir a mi página principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute; 