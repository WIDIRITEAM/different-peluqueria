'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Lock, Scissors } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAuth } from '@/lib/auth-context';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, isAuthenticated, isAdmin, isEmpleada } = useAuth();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        router.push('/dashboard');
      } else if (isEmpleada) {
        router.push('/servicio');
      }
    }
  }, [isAuthenticated, isAdmin, isEmpleada, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const loginExitoso = await login(email, password);
      
      if (loginExitoso) {
        // La redirección se maneja en el useEffect
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error al iniciar sesión');
      console.error('Error en login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-8 py-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-white/20 p-3 rounded-full">
              <Scissors className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Different</h1>
          <p className="text-rose-100">Peluquería</p>
        </div>

        {/* Formulario */}
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenida</h2>
            <p className="text-gray-600">Inicia sesión para acceder al sistema</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors text-black placeholder-gray-400"
                  placeholder="tu@email.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors text-black placeholder-gray-400"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-rose-600 transition-colors"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Botón de login */}
            <Button
              type="submit"
              className="w-full font-medium py-3"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 