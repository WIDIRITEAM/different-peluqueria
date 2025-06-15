'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Save, Eye, EyeOff, CheckCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import { useAuth } from '@/lib/auth-context';

const PerfilPage: React.FC = () => {
  const { usuario } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (usuario) {
      setFormData(prev => ({
        ...prev,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email
      }));
    }
  }, [usuario]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    // Validar contraseña solo si se está intentando cambiar
    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Debe ingresar su contraseña actual';
      }

      if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'La nueva contraseña debe tener al menos 6 caracteres';
      }

      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1500));

      // En una aplicación real, aquí se haría la llamada a la API
      console.log('Datos a guardar:', {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        cambiarPassword: !!formData.newPassword
      });

      // Limpiar campos de contraseña
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

      // Mostrar mensaje de éxito
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  if (!usuario) {
    return null;
  }

  return (
    <ProtectedRoute allowedRoles={['admin', 'empleada']}>
      <DashboardLayout title="Mi Perfil" subtitle="Administra tu información personal">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Perfil actualizado exitosamente</span>
          </div>
        )}

        {/* Información actual */}
        <Card>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {usuario.nombre} {usuario.apellido}
                </h2>
                <p className="text-gray-600">{usuario.email}</p>
                <p className="text-sm text-rose-600 font-medium">
                  {usuario.tipoUsuario === 'admin' ? 'Administrador' : 'Empleada'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulario de edición */}
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Editar Información</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información personal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="nombre"
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
                        errors.nombre ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Tu nombre"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.nombre && (
                    <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
                  )}
                </div>

                {/* Apellido */}
                <div>
                  <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="apellido"
                      type="text"
                      value={formData.apellido}
                      onChange={(e) => handleInputChange('apellido', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
                        errors.apellido ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Tu apellido"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.apellido && (
                    <p className="mt-1 text-sm text-red-600">{errors.apellido}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="tu@email.com"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Separador */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Cambiar Contraseña (Opcional)</h4>
                
                {/* Contraseña actual */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Contraseña Actual
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        id="currentPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
                          errors.currentPassword ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="••••••••"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-rose-600"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                    )}
                  </div>

                  {/* Nueva contraseña */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Nueva Contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          id="newPassword"
                          type={showNewPassword ? 'text' : 'password'}
                          value={formData.newPassword}
                          onChange={(e) => handleInputChange('newPassword', e.target.value)}
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
                            errors.newPassword ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="••••••••"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-rose-600"
                          disabled={isLoading}
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmar Contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
                            errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="••••••••"
                          disabled={isLoading}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón guardar */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="flex items-center space-x-2"
                  disabled={isLoading}
                >
                  <Save className="w-5 h-5" />
                  <span>{isLoading ? 'Guardando...' : 'Guardar Cambios'}</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
};

export default PerfilPage; 