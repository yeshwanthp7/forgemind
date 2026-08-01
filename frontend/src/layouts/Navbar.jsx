import React, { useState, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ShieldCheck,
  User,
  LogOut,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/ui/Badge';

export const Navbar = ({ onOpenMobileSidebar, isCollapsed }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [uptime, setUptime] = useState(99.98);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('#user-menu-btn') && !e.target.closest('#user-menu-dropdown')) {
        setUserMenuOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 h-16 bg-[#0a0e17]/85 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300 ${
        isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
      }`}
    >
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Search */}
        <div className="flex items-center gap-3 grow max-w-md">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Quick Search */}
          <div className="relative w-full max-w-xs sm:max-w-sm hidden sm:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search assets, hazards, tickets..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition"
            />
          </div>
        </div>

        {/* Right Side: Telemetry Status, Theme, Notifications, User Menu */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Live System Uptime Telemetry */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>UPTIME {uptime}%</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-400" />
            )}
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            </button>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              id="user-menu-btn"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800/60 transition border border-transparent hover:border-slate-800"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt="Profile"
                className="w-7 h-7 rounded-full border border-slate-700 object-cover"
              />
              <span className="hidden sm:block text-xs font-semibold text-slate-200">
                {user?.name || 'Cmdr. Vance'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {userMenuOpen && (
              <div
                id="user-menu-dropdown"
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="px-3 py-2.5 border-b border-slate-800/80 mb-1">
                  <p className="text-xs font-bold text-slate-100">{user?.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                  <div className="mt-1.5">
                    <Badge variant="cyber" size="sm">{user?.role || 'Operator'}</Badge>
                  </div>
                </div>

                <div className="space-y-0.5 text-xs font-medium">
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span>User Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition">
                    <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                    <span>Preferences</span>
                  </button>
                  <div className="my-1 border-t border-slate-800/80" />
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-950/30 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
