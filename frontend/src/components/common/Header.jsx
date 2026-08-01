import React, { useState, useEffect } from 'react';
import { useAlerts } from '../../context/AlertContext';
import { useCopilot } from '../../context/CopilotContext';
import {
  Search,
  Bell,
  Bot,
  Activity,
  ShieldCheck,
  Zap,
  Sliders,
  UserCheck
} from 'lucide-react';

export const Header = ({ onOpenCommandPalette }) => {
  const { hazards } = useAlerts();
  const { toggleCopilot } = useCopilot();
  const [time, setTime] = useState(new Date());
  const [role, setRole] = useState("Plant Safety Officer");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const unresolvedCount = hazards.filter(h => h.status !== 'resolved').length;

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between z-30 sticky top-0">
      {/* Search & Global Shortcuts */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-3 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 text-xs font-medium transition w-64 md:w-80 group"
        >
          <Search className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
          <span className="flex-1 text-left">Search assets, cameras, tickets...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700 font-mono">
            Ctrl K
          </kbd>
        </button>

        {/* Real-time Ticker marquee */}
        <div className="hidden lg:flex items-center gap-3 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800/80 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400 font-medium">Plant Status:</span>
          <span className="text-slate-200 font-semibold">94.8% Operational Safety</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400 font-mono">Telemetry: 1,480 Nodes Active</span>
        </div>
      </div>

      {/* Action Controls & User Profile */}
      <div className="flex items-center gap-3">
        {/* Clock */}
        <div className="hidden sm:flex flex-col text-right pr-2 border-r border-slate-800">
          <span className="text-xs font-bold text-slate-200 font-mono">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            {time.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {/* Role Selector */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-transparent focus:outline-none cursor-pointer font-medium"
          >
            <option value="Plant Safety Officer" className="bg-slate-900">Safety Officer</option>
            <option value="Maintenance Engineer" className="bg-slate-900">Maintenance Eng.</option>
            <option value="Plant Manager" className="bg-slate-900">Plant Manager</option>
            <option value="Factory Operator" className="bg-slate-900">Factory Operator</option>
          </select>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition">
            <Bell className="w-4 h-4" />
            {unresolvedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center animate-bounce">
                {unresolvedCount}
              </span>
            )}
          </button>
        </div>

        {/* Copilot Floating Trigger */}
        <button
          onClick={toggleCopilot}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950/60 border border-cyan-400/40 transition group"
        >
          <Bot className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition transform" />
          <span>Sentinel AI</span>
          <span className="px-1 py-0.5 text-[9px] rounded bg-white/20 font-mono">Ctrl J</span>
        </button>
      </div>
    </header>
  );
};
