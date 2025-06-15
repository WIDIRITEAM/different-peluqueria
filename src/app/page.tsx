'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function Home() {
  const { isAuthenticated, isAdmin, isEmpleada } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirigir según el rol
      if (isAdmin) {
        router.push('/dashboard');
      } else if (isEmpleada) {
        router.push('/servicio');
      }
    } else {
      // Si no está autenticado, ir a login
      router.push('/login');
    }
  }, [isAuthenticated, isAdmin, isEmpleada, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Redirigiendo...</p>
      </div>
    </div>
  );
}
