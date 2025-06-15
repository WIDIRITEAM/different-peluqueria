'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calculator, 
  Users, 
  LogOut,
  Scissors,
  X,
  User,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: ('admin' | 'empleada')[];
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const allNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin'] },
  { href: '/balance', label: 'Balance', icon: Calculator, roles: ['admin'] },
  { href: '/empleadas', label: 'Empleadas', icon: Users, roles: ['admin'] },
  { href: '/servicio', label: 'Servicio', icon: Briefcase, roles: ['empleada'] },
  { href: '/perfil', label: 'Perfil', icon: User, roles: ['admin', 'empleada'] },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const { usuario, logout, isAdmin, isEmpleada } = useAuth();

  // Filtrar items de navegación según el rol
  const navItems = allNavItems.filter(item => {
    if (isAdmin) return item.roles.includes('admin');
    if (isEmpleada) return item.roles.includes('empleada');
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBackdropClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!usuario) return null;

  return (
    <>
      {/* Backdrop para móvil con blur suave */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-rose-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={handleBackdropClick}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-70 bg-gradient-to-b from-rose-50 via-rose-100 to-pink-100 shadow-xl transition-transform duration-300 ease-in-out",
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header con botón de cerrar en móvil */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-white/90 p-2 shadow-sm">
                <Scissors className="h-8 w-8 text-rose-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-rose-800">Different</h1>
                <p className="text-sm text-rose-600">Peluquería</p>
              </div>
            </div>
            
            {/* Botón cerrar solo en móvil */}
            {isMobile && (
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-rose-600 hover:bg-white/30 hover:text-rose-800 lg:hidden transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200',
                        isActive
                          ? 'bg-white/80 text-rose-800 shadow-sm border border-rose-200'
                          : 'text-rose-700 hover:bg-white/40 hover:text-rose-800'
                      )}
                      onClick={() => {
                        if (isMobile && onClose) {
                          onClose();
                        }
                      }}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="ml-auto h-2 w-2 rounded-full bg-rose-600" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer - Solo botón de logout */}
          <div className="border-t border-rose-200 p-4">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 rounded-lg p-3 text-rose-700 hover:bg-white/40 hover:text-rose-800 transition-colors duration-200"
              aria-label="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 