import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Activity, Thermometer, Gauge, ChevronRight } from 'lucide-react';

export const AssignedMachinesCard = ({ machines }) => {
  const navigate = useNavigate();

  const getHealthBadge = (score) => {
    if (score >= 80) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    if (score >= 50) return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    return 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse';
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Today's Assigned Shift Machinery
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          {machines.length} Equipment Registered
        </span>
      </div>

      <div className="space-y-3">
        {machines.map((m) => (
          <div
            key={m.id}
            onClick={() => navigate(`/inventory/${m.id}`)}
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer flex items-center justify-between gap-4 group"
          >
            <div className="space-y-1 grow">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs font-mono group-hover:text-cyan-300 transition">
                  {m.id}
                </span>
                <span className="text-xs font-semibold text-slate-300">• {m.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getHealthBadge(m.healthScore)}`}>
                  {m.healthScore}% Health
                </span>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-rose-400" />
                  {m.temperature}°C
                </span>
                <span className="flex items-center gap-1">
                  <Gauge className="w-3 h-3 text-cyan-400" />
                  {m.pressure} Bar
                </span>
                <span>Zone: {m.zone.split(' - ')[0]}</span>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
