import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Thermometer,
  Gauge,
  Activity,
  ShieldCheck,
  Cpu,
  MapPin
} from 'lucide-react';

export const DecodedAssetCard = ({ machine, onResetScan }) => {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'critical':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">Critical Alarm</span>;
      case 'warning':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">Warning State</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">Optimal Health</span>;
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      className="rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.2)] space-y-6 max-w-xl mx-auto text-left"
    >
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
              QR ASSET MATCH VERIFIED
            </span>
            <h3 className="text-base font-extrabold text-slate-100">{machine.name}</h3>
          </div>
        </div>
        {getStatusBadge(machine.status)}
      </div>

      {/* Asset Specifications Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono">
        <div>
          <span className="text-slate-500 block text-[10px]">ASSET ID</span>
          <span className="font-bold text-cyan-400">{machine.id}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">LOCATION</span>
          <span className="font-bold text-slate-200">{machine.zone.split(' - ')[0]}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">TYPE</span>
          <span className="font-bold text-slate-200">{machine.type}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">RISK RATING</span>
          <span className="font-bold text-slate-200">{machine.riskLevel}</span>
        </div>
      </div>

      {/* Live Telemetry Snapshot */}
      <div className="grid grid-cols-3 gap-3">
        {/* Health Score */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            Health Index
          </span>
          <div className="text-xl font-extrabold text-white font-mono">{machine.healthScore}%</div>
        </div>

        {/* Temperature */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5 text-rose-400" />
            Thermal (°C)
          </span>
          <div className="text-xl font-extrabold text-slate-100 font-mono">{machine.temperature}°C</div>
        </div>

        {/* Pressure */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            Pressure
          </span>
          <div className="text-xl font-extrabold text-cyan-300 font-mono">{machine.pressure} Bar</div>
        </div>
      </div>

      {/* Actions Toolbar */}
      <div className="pt-4 flex flex-col sm:flex-row justify-between gap-3 border-t border-slate-800">
        <button
          onClick={onResetScan}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Scan Another Tag</span>
        </button>

        <button
          onClick={() => navigate(`/inventory/${machine.id}`)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
        >
          <span>Open Full Machine Telemetry Page</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
