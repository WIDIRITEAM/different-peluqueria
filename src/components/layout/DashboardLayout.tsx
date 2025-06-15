'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { DateFilterProvider } from '@/components/ui/DateFilter';
import { useAuth } from '@/lib/auth-context';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isEmpleada } = useAuth();

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  // Ocultar DateFilter para empleadas
  const showDateFilter = !isEmpleada;

  return (
    <DateFilterProvider>
      <div className="min-h-screen bg-gray-50">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={handleSidebarClose} 
        />
        
        <div className="lg:pl-70">
          <Header 
            title={title} 
            subtitle={subtitle} 
            onMenuClick={handleMenuClick}
            showDateFilter={showDateFilter}
          />
          
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </DateFilterProvider>
  );
};

export default DashboardLayout; 