import React, { createContext, useContext, useState } from 'react';
import { Calendar, ChevronDown, X } from 'lucide-react';

interface DateFilterContextType {
  selectedRange: DateRange;
  setSelectedRange: (range: DateRange) => void;
  getFilteredData: <T extends { fecha: string }>(data: T[]) => T[];
}

interface DateRange {
  type: 'custom' | 'current-month' | 'last-6-months' | 'all-time' | 'last-month' | 'last-3-months';
  startDate?: Date;
  endDate?: Date;
  label: string;
}

const DateFilterContext = createContext<DateFilterContextType | undefined>(undefined);

export const useDateFilter = () => {
  const context = useContext(DateFilterContext);
  if (!context) {
    throw new Error('useDateFilter debe ser usado dentro de DateFilterProvider');
  }
  return context;
};

interface DateFilterProviderProps {
  children: React.ReactNode;
}

export const DateFilterProvider: React.FC<DateFilterProviderProps> = ({ children }) => {
  const [selectedRange, setSelectedRange] = useState<DateRange>(() => {
    return {
      type: 'current-month',
      label: 'Mes actual'
    };
  });

  const getFilteredData = <T extends { fecha: string }>(data: T[]): T[] => {
    if (selectedRange.type === 'all-time') {
      return data;
    }

    let startDate: Date;
    let endDate: Date;

    const now = new Date();
    
    switch (selectedRange.type) {
      case 'current-month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        break;
      case 'last-month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
        break;
      case 'last-3-months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        break;
      case 'last-6-months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        break;
      case 'custom':
        if (!selectedRange.startDate || !selectedRange.endDate) return data;
        startDate = selectedRange.startDate;
        endDate = new Date(selectedRange.endDate);
        endDate.setHours(23, 59, 59);
        break;
      default:
        return data;
    }

    return data.filter(item => {
      const itemDate = new Date(item.fecha);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  return (
    <DateFilterContext.Provider value={{ selectedRange, setSelectedRange, getFilteredData }}>
      {children}
    </DateFilterContext.Provider>
  );
};

interface DateFilterSelectorProps {
  className?: string;
  compact?: boolean;
  showOnEmployeePages?: boolean;
}

export const DateFilterSelector: React.FC<DateFilterSelectorProps> = ({ 
  className = '', 
  compact = false,
  showOnEmployeePages = true
}) => {
  const { selectedRange, setSelectedRange } = useDateFilter();
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  if (!showOnEmployeePages) {
    return null;
  }

  const predefinedRanges: DateRange[] = [
    { type: 'current-month', label: 'Mes actual' },
    { type: 'last-month', label: 'Mes anterior' },
    { type: 'last-3-months', label: 'Últimos 3 meses' },
    { type: 'last-6-months', label: 'Últimos 6 meses' },
    { type: 'all-time', label: 'Histórico (todo el tiempo)' },
    { type: 'custom', label: 'Rango personalizado' }
  ];

  const handleRangeSelect = (range: DateRange) => {
    if (range.type === 'custom') {
      setShowCustomRange(true);
    } else {
      setSelectedRange(range);
      setIsOpen(false);
      setShowCustomRange(false);
    }
  };

  const handleCustomRangeApply = () => {
    if (customStartDate && customEndDate) {
      const startDate = new Date(customStartDate);
      const endDate = new Date(customEndDate);
      
      if (startDate <= endDate) {
        setSelectedRange({
          type: 'custom',
          startDate,
          endDate,
          label: `${startDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })} - ${endDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}`
        });
        setIsOpen(false);
        setShowCustomRange(false);
      }
    }
  };

  const handleCustomRangeCancel = () => {
    setShowCustomRange(false);
    setCustomStartDate('');
    setCustomEndDate('');
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 bg-rose-50 hover:bg-rose-100 transition-colors px-${compact ? '3' : '4'} py-2 rounded-lg border border-rose-200 ${compact ? 'text-xs' : 'text-sm'} font-medium text-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50`}
        aria-label="Seleccionar rango de fechas"
      >
        <Calendar className="h-4 w-4 text-rose-600" />
        <span className={compact ? 'hidden sm:inline' : ''}>
          {compact ? 'Filtro:' : 'Período:'} {selectedRange.label}
        </span>
        <ChevronDown className={`h-4 w-4 text-rose-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Overlay para mobile */}
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-25 md:hidden"
            onClick={() => {
              setIsOpen(false);
              setShowCustomRange(false);
            }}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 md:left-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-rose-200 z-50 overflow-hidden">
            {!showCustomRange ? (
              <div className="p-2">
                <div className="text-xs font-medium text-gray-500 px-3 py-2 border-b border-gray-100">
                  Seleccionar período
                </div>
                <div className="space-y-1 mt-2">
                  {predefinedRanges.map((range) => (
                    <button
                      key={range.type}
                      onClick={() => handleRangeSelect(range)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedRange.type === range.type && selectedRange.type !== 'custom'
                          ? 'bg-rose-100 text-rose-800 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-900">Rango personalizado</h3>
                  <button 
                    onClick={handleCustomRangeCancel}
                    className="p-1 hover:bg-gray-100 rounded-full"
                    aria-label="Cancelar"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Fecha desde
                    </label>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Fecha hasta
                    </label>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    />
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <button
                      onClick={handleCustomRangeCancel}
                      className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleCustomRangeApply}
                      disabled={!customStartDate || !customEndDate}
                      className="flex-1 px-3 py-2 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}; 