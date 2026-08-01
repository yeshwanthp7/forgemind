import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Zap,
  LogOut,
  X
} from 'lucide-react';
import { NAVIGATION_ITEMS, USER_PROFILE_NAV } from '../config/navigation.config';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/ui/Badge';

export const Sidebar = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const { user, logout } = useAuth();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0a0e17] border-r border-slate-800/80 text-slate-300">
      {/* Sidebar Header / Logo */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-mono font-bold text-sm text-slate-100 tracking-wider flex items-center gap-1.5">
                NEBULA <span className="text-cyan-400 font-normal">OS</span>
              </span>
              <span className="text-[10px] text-cyan-500/80 font-mono tracking-widest uppercase">
                ENTERPRISE V3.4
              </span>
            </div>
          )}
        </div>

        {/* Mobile close button */}
        {isMobileOpen && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="grow overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
        {NAVIGATION_ITEMS.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!isCollapsed && (
              <h4 className="px-3 text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest mb-2">
                {section.section}
              </h4>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => isMobileOpen && onCloseMobile()}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 hover:border-slate-800'
                    }`
                  }
                  title={isCollapsed ? item.label : undefined}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                      )}
                      <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`} />
                      {!isCollapsed && (
                        <span className="truncate grow">{item.label}</span>
                      )}
                      {!isCollapsed && item.badge && (
                        <Badge variant={item.badge.variant} size="sm">
                          {item.badge.text}
                        </Badge>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Sidebar Footer / User Profile */}
      <div className="p-3 border-t border-slate-800/80 shrink-0 bg-slate-950/40">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} gap-2`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative shrink-0">
              <img
                src={user?.avatar || USER_PROFILE_NAV.avatar}
                alt="User Profile"
                className="w-8 h-8 rounded-full border border-slate-700 object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-slate-200 truncate">
                  {user?.name || USER_PROFILE_NAV.name}
                </span>
                <span className="text-[10px] text-slate-400 truncate">
                  {user?.role || USER_PROFILE_NAV.role}
                </span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <div className="hidden lg:block mt-3 pt-2 border-t border-slate-800/50">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition text-xs font-mono"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                <span>COLLAPSE NAV</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block fixed top-0 left-0 z-30 h-screen transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          <div className="relative w-72 max-w-[80vw] h-full z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
