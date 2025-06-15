'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Usuario, AuthContextType } from './types';
import { usuarios } from './mock-data';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      try {
        const usuarioData = JSON.parse(usuarioGuardado);
        setUsuario(usuarioData);
      } catch (error) {
        console.error('Error al cargar usuario:', error);
        localStorage.removeItem('usuario');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simular delay de autenticación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Buscar usuario en datos mockeados
      const usuarioEncontrado = usuarios.find(
        user => user.email === email && user.password === password
      );

      if (usuarioEncontrado) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...usuarioSinPassword } = usuarioEncontrado;
        setUsuario(usuarioSinPassword as Usuario);
        localStorage.setItem('usuario', JSON.stringify(usuarioSinPassword));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  const value: AuthContextType = {
    usuario,
    login,
    logout,
    isAuthenticated: !!usuario,
    isAdmin: usuario?.tipoUsuario === 'admin',
    isEmpleada: usuario?.tipoUsuario === 'empleada',
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}; 