import React from 'react';
import { Camera, AlertTriangle, ShieldCheck, UserX, Eye } from 'lucide-react';

export const PpeViolationsCard = ({ violations, onResolve }) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Worker PPE Compliance Audit (AI Vision Stream)
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px] border border-rose-500/40 font-bold animate-pulse">
          {violations.length} Active Violations
        </span>
      </div>

      <div className="space-y-3">
        {violations.map((v) => (
          <div
            key={v.id}
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserX className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="font-bold text-white text-xs font-mono">{v.workerId}</span>
                <span className="text-xs text-slate-300">• {v.workerName}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{v.timestamp}</span>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="space-y-0.5 font-mono">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 inline-block">
                  MISSING: {v.missingPpe}
                </span>
                <p className="text-[11px] text-slate-400 pt-1">Location: <strong className="text-slate-200">{v.location}</strong></p>
              </div>

              <button
                onClick={() => onResolve(v.id)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 font-mono text-xs font-bold transition shrink-0 border border-slate-700"
              >
                Issue Warning & Resolve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
