import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Thermometer,
  Gauge,
  MapPin,
  Wrench,
  Clock,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Eye,
  Activity,
  Zap
} from 'lucide-react';

export const MachineCard = ({ machine, onInspect }) => {
  const handleInspect = () => {
    if (onInspect) {
      onInspect(machine);
      return;
    }

    navigate(`/inventory/${machine.id}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'critical':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            CRITICAL
          </span>
        );
      case 'warning':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            WARNING
          </span>
        );
      case 'maintenance':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            MAINTENANCE
          </span>
        );
      case 'offline':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            OFFLINE
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            OPTIMAL
          </span>
        );
    }
  };

  const getHealthColor = (score) => {
    if (score >= 80) return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
    if (score >= 50) return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
    return 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]';
  };

  const getRiskBadge = (risk) => {
    if (risk.includes('Critical')) return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    if (risk.includes('Warning')) return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    if (risk.includes('Medium')) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-2xl bg-slate-900 border border-slate-800 p-5 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-slate-700 transition flex flex-col justify-between space-y-4 group relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition" />

      {/* Card Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className="text-[10px] text-cyan-400 font-mono font-bold block">{machine.id}</span>
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition line-clamp-1">
              {machine.name}
            </h3>
          </div>
          {getStatusBadge(machine.status)}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mb-3">
          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 font-medium">
            {machine.type}
          </span>
          <span className="flex items-center gap-1 text-slate-400 font-mono">
            <MapPin className="w-3 h-3 text-cyan-400" />
            {machine.zone.split(' - ')[0]}
          </span>
        </div>

        {/* Machine Health Progress Bar */}
        <div className="space-y-1.5 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Machine Health Index
            </span>
            <span className="font-bold text-slate-100">{machine.healthScore}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${getHealthColor(machine.healthScore)}`}
              style={{ width: `${machine.healthScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Metrics Row: Temperature & Pressure */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        {/* Temperature */}
        <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800/80 space-y-1">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Thermometer className="w-3 h-3 text-rose-400" />
            Thermal (°C)
          </span>
          <div className="flex items-baseline gap-1">
            <span className={`font-bold text-sm ${machine.temperature > machine.temperatureBaseline * 1.2 ? 'text-rose-400' : 'text-slate-200'}`}>
              {machine.temperature}°C
            </span>
          </div>
        </div>

        {/* Pressure */}
        <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800/80 space-y-1">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Gauge className="w-3 h-3 text-cyan-400" />
            Pressure (Bar)
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-bold text-sm text-slate-200">
              {machine.pressure} Bar
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer: Risk & Maintenance */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[11px]">
        <div className="space-y-0.5">
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getRiskBadge(machine.riskLevel)}`}>
            {machine.riskLevel}
          </span>
          <div className="text-[10px] text-slate-500 font-mono mt-1">
            Last: {machine.lastMaintenanceDays}
          </div>
        </div>

        <button
          onClick={handleInspect}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5 shadow-md"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Inspect</span>
        </button>
      </div>
    </motion.div>
  );
};
