import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Sidebar } from '../components/common/Sidebar';
import { AlertBanner } from '../components/common/AlertBanner';
import { SentinelCopilotDrawer } from '../components/common/SentinelCopilotDrawer';
import { CommandPalette } from '../components/common/CommandPalette';
import { useCommandPalette } from '../hooks/useCommandPalette';

export const MainLayout = () => {
  const { isOpen: commandPaletteOpen, setIsOpen: setCommandPaletteOpen } = useCommandPalette();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-x-hidden font-sans">
      {/* Cyber Industrial Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AlertBanner />
        <Header onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Global Overlays */}
      <SentinelCopilotDrawer />
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
};
