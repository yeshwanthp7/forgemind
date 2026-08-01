import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { PageContainer } from './PageContainer';

export const AppLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500 selection:text-white font-sans antialiased relative">
      {/* Sidebar Component */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Top Navbar */}
      <Navbar
        onOpenMobileSidebar={() => setIsMobileOpen(true)}
        isCollapsed={isCollapsed}
      />

      {/* Main Content Area */}
      <main
        className={`transition-all duration-300 ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <PageContainer>
          {children || <Outlet />}
        </PageContainer>
      </main>
    </div>
  );
};
