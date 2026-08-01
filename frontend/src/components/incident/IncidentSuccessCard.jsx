import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Ticket, Plus, ArrowRight, ShieldCheck } from 'lucide-react';

export const IncidentSuccessCard = ({ result, onResetForm }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      className="rounded-3xl bg-slate-900 border border-emerald-500/40 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(16,185,129,0.2)] space-y-6 max-w-xl mx-auto text-left"
    >
      <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
            DISPATCH SUCCESSFUL • WORK ORDER QUEUED
          </span>
          <h3 className="text-xl font-extrabold text-white">Work Order #{result.ticketId} Created</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono">
        <div>
          <span className="text-slate-500 block text-[10px]">TARGET MACHINE</span>
          <span className="font-bold text-cyan-400">{result.machineId}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">SEVERITY RATING</span>
          <span className="font-bold text-rose-400">{result.severity}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">EVIDENCE ATTACHED</span>
          <span className="font-bold text-slate-200">{result.fileCount} Files</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px]">DISPATCH SLA</span>
          <span className="font-bold text-emerald-400">&lt; 15 Mins</span>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 text-xs flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Incident ticket <span className="font-bold font-mono text-white">{result.ticketId}</span> dispatched to shift supervisor & emergency response team for <span className="font-bold font-mono text-cyan-300">{result.machineName}</span>.
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row justify-between gap-3 border-t border-slate-800">
        <button
          type="button"
          onClick={onResetForm}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 text-cyan-400" />
          <span>Log Another Incident</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/tickets')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          <Ticket className="w-4 h-4" />
          <span>View Incident Tickets Hub</span>
        </button>
      </div>
    </motion.div>
  );
};
