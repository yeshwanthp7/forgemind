import React from 'react';
import { ShieldCheck, Award, FileCheck, CheckCircle2 } from 'lucide-react';

export const ComplianceScoreGauge = ({ score = 98.2 }) => {
  return (
    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 backdrop-blur-md flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-100">ISO-45001 Safety Compliance</h3>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
            Audit Compliant
          </span>
        </div>

        <div className="flex items-center gap-4 my-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-2xl font-extrabold text-white shadow-lg shadow-emerald-950">
            {score}%
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200">Occupational Health & Safety Audit Index</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Automated compliance verification across 4 plant zones based on OSHA standards.</p>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> PPE Mandate Adherence
            </span>
            <span className="font-mono font-bold text-emerald-400">96.4%</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Hazardous Perimeter Containment
            </span>
            <span className="font-mono font-bold text-emerald-400">99.1%</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Automated Ticket SLA Resolution
            </span>
            <span className="font-mono font-bold text-emerald-400">98.8%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
