import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import Button from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isDestructive = false
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-rose-900/20 backdrop-blur-sm p-4 fade-in">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl border border-rose-200 slide-up">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {isDestructive && (
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-rose-50 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {message}
          </p>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={onClose}
            >
              {cancelText}
            </Button>
            <Button
              variant={isDestructive ? 'ghost' : 'primary'}
              className={`flex-1 ${
                isDestructive 
                  ? 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500' 
                  : ''
              }`}
              onClick={handleConfirm}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog; 