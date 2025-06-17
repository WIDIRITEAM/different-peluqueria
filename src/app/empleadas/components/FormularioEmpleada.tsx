import React, { useState, useEffect } from 'react';
import { X, Save, User, Mail, Phone, Calendar, Briefcase } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Empleada } from '@/lib/types';

interface FormularioEmpleadaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: FormularioEmpleadaData) => Promise<boolean>;
  empleada?: Empleada | null;
  isEditing?: boolean;
}

export interface FormularioEmpleadaData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  rol: Empleada['rol'];
  especialidades: string[];
}

const FormularioEmpleada: React.FC<FormularioEmpleadaProps> = ({
  isOpen,
  onClose,
  onSave,
  empleada,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<FormularioEmpleadaData>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    rol: 'Estilista',
    especialidades: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles: Empleada['rol'][] = ['Estilista', 'Colorista', 'Manicurista', 'Gerente'];
  const especialidadesDisponibles = [
    'Corte', 'Peinado', 'Color', 'Permanente', 'Alisado', 
    'Maquillaje', 'Manicura', 'Pedicura', 'Uñas de gel'
  ];

  // Cargar datos de la empleada al abrir el modal
  useEffect(() => {
    if (empleada && isEditing) {
      setFormData({
        nombre: empleada.nombre,
        apellido: empleada.apellido,
        email: empleada.email,
        telefono: empleada.telefono,
        rol: empleada.rol,
        especialidades: empleada.especialidades
      });
    } else {
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        rol: 'Estilista',
        especialidades: []
      });
    }
    setError('');
  }, [empleada, isEditing, isOpen]);

  const handleInputChange = (field: keyof FormularioEmpleadaData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEspecialidadChange = (especialidad: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      especialidades: checked 
        ? [...prev.especialidades, especialidad]
        : prev.especialidades.filter(esp => esp !== especialidad)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validación básica
    if (!formData.nombre.trim() || !formData.apellido.trim() || !formData.email.trim()) {
      setError('Por favor completa todos los campos obligatorios');
      setLoading(false);
      return;
    }

    if (formData.especialidades.length === 0) {
      setError('Selecciona al menos una especialidad');
      setLoading(false);
      return;
    }

    try {
      const success = await onSave(formData);
      if (success) {
        onClose();
      } else {
        setError('Error al guardar la empleada');
      }
    } catch (err) {
      setError('Error al guardar la empleada');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-rose-900/20 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl border border-rose-200 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-rose-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {isEditing ? 'Editar Empleada' : 'Nueva Empleada'}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-rose-50 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Información Personal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="Nombre"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={formData.apellido}
                    onChange={(e) => handleInputChange('apellido', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="Apellido"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="email@ejemplo.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="+34 123 456 789"
                  />
                </div>
              </div>
            </div>

            {/* Rol */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rol *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  title="Rol"
                  value={formData.rol}
                  onChange={(e) => handleInputChange('rol', e.target.value as Empleada['rol'])}
                  className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  required
                >
                  {roles.map(rol => (
                    <option key={rol} value={rol}>{rol}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Especialidades */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Especialidades *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {especialidadesDisponibles.map(especialidad => (
                  <label
                    key={especialidad}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.especialidades.includes(especialidad)}
                      onChange={(e) => handleEspecialidadChange(especialidad, e.target.checked)}
                      className="w-4 h-4 text-rose-600 border-rose-300 rounded focus:ring-rose-500"
                    />
                    <span className="text-sm text-gray-700">{especialidad}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t border-rose-100">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioEmpleada;
