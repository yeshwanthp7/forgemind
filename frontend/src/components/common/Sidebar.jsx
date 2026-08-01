import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAlerts } from '../../context/AlertContext';
import {
  LayoutDashboard,
  Eye,
  Activity,
  Wrench,
  BarChart3,
  Settings,
  Shield,
  Zap,
  Radio,
  Cpu
} from 'lucide-react';

export const Sidebar = () => {
  const { hazards } = useAlerts();
  const criticalCount = hazards.filter(h => h.severity === 'critical' && h.status !== 'resolved').length;

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/overview' },
    { label: 'Visual AI Hazards', icon: Eye, path: '/hazards', badge: criticalCount > 0 ? criticalCount : null, badgeCritical: true },
    { label: 'Predictive Telemetry', icon: Activity, path: '/telemetry' },
    { label: 'Maintenance Tickets', icon: Wrench, path: '/tickets' },
    { label: 'Safety & Compliance', icon: BarChart3, path: '/analytics' },
    { label: 'System Settings', icon: Settings, path: '/settings' }
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0 z-40 select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800 bg-slate-950">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-950/80 border border-cyan-400/30">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1">
              FORGEMIND <span className="text-cyan-400 font-mono text-xs">AI</span>
            </h1>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              Sentinel Industrial
            </p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-6">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Platform Command
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900 text-cyan-300 border-l-2 border-cyan-400 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.badgeCritical ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer System Status */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block absolute inset-0 animate-ping opacity-75" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-200">Neural Core v4.2</div>
              <div className="text-[10px] text-slate-400">ISO-45001 Sentinel Active</div>
            </div>
          </div>
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
        </div>
      </div>
    </aside>
  );
};
