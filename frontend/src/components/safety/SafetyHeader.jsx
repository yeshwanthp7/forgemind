import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  Award,
  Download,
  Brain,
  AlertOctagon,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

export const SafetyHeader = ({ user, onExportPdf, onEmergencyEvacuation }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-rose-950/40 border border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="space-y-2 max-w-3xl relative z-10">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            EHS Safety Inspection Surveillance Core
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 font-mono text-[11px] border border-emerald-500/30 flex items-center gap-1 font-bold">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            ISO-45001 INDEX: 98.5%
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <span>Safety Inspection Console — {user?.name || 'Elena Rostova'}</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Plant Surveillance Scope: <strong className="text-cyan-300 font-mono">All 5 Production Zones</strong> • Real-time computer vision PPE audits & thermal IR fire detection.
        </p>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="flex flex-wrap items-center gap-2.5 relative z-10 shrink-0">
        <button
          onClick={() => navigate('/ai-analysis')}
          className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition hover:scale-[1.02]"
        >
          <Brain className="w-4 h-4 text-cyan-400" />
          <span>Launch AI Sentinel</span>
        </button>

        {/* Generate Safety Report PDF */}
        <button
          onClick={onExportPdf}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
        >
          <Download className="w-4 h-4 text-cyan-100" />
          <span>Generate Safety Report PDF</span>
        </button>

        {/* Emergency Evacuation Button */}
        <button
          onClick={onEmergencyEvacuation}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-[0_0_25px_rgba(244,63,94,0.4)] animate-pulse transition hover:scale-[1.03] border border-rose-400/40"
          title="Trigger immediate plant emergency evacuation audio alarm"
        >
          <AlertOctagon className="w-4 h-4" />
          <span>EVACUATION ALARM</span>
        </button>
      </div>
    </motion.div>
  );
};
