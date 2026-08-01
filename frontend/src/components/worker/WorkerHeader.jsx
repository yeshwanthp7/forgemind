import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Wrench,
  QrCode,
  Upload,
  PlusCircle,
  AlertOctagon,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const WorkerHeader = ({ user, onOpenQuickReport, onEmergencyEstop }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-amber-950/30 border border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="space-y-2 max-w-3xl relative z-10">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2">
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            Field Operator Shift Core
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[11px] border border-slate-700">
            ID: {user?.badgeId || 'EMP-9042'}
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-[11px] border border-emerald-500/20 flex items-center gap-1 font-bold">
            <ShieldCheck className="w-3 h-3" />
            ISO LOTO VERIFIED
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <span>Shift Console — {user?.name || 'Marcus Vance'}</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Assigned Station: <strong className="text-cyan-400 font-mono">{user?.zone || 'Zone A - Stamping'}</strong> • Continuous Sensor Telemetry Active.
        </p>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="flex flex-wrap items-center gap-2.5 relative z-10 shrink-0">
        {/* Scan QR Button */}
        <button
          onClick={() => navigate('/scanner')}
          className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition hover:scale-[1.02] shadow-md"
        >
          <QrCode className="w-4 h-4 text-cyan-400" />
          <span>Scan QR</span>
        </button>

        {/* Upload Incident Button */}
        <button
          onClick={() => navigate('/tickets/new')}
          className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition hover:scale-[1.02] shadow-md"
        >
          <Upload className="w-4 h-4 text-amber-400" />
          <span>Upload Incident</span>
        </button>

        {/* Quick Report Button */}
        <button
          onClick={onOpenQuickReport}
          className="px-3.5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Quick Report</span>
        </button>

        {/* 🚨 Emergency Red E-STOP Dispatch Button */}
        <button
          onClick={onEmergencyEstop}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-[0_0_25px_rgba(244,63,94,0.4)] animate-pulse transition hover:scale-[1.03] border border-rose-400/40"
          title="Trigger immediate plant emergency E-STOP dispatch"
        >
          <AlertOctagon className="w-4 h-4 text-white shrink-0" />
          <span>EMERGENCY E-STOP</span>
        </button>
      </div>
    </motion.div>
  );
};
