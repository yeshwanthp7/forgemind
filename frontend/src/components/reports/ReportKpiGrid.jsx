import React from 'react';
import { Activity, Clock, DollarSign, Wrench, ArrowUpRight, ArrowDownRight, ShieldCheck } from 'lucide-react';

export const ReportKpiGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Factory Health Index */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-2 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold text-slate-400 uppercase">Factory Health Index</span>
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{data.factoryHealthIndex}%</span>
          <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {data.healthImprovement}
          </span>
        </div>
        <div className="text-[10px] text-slate-400 font-mono">Overall Equipment Effectiveness (OEE)</div>
      </div>

      {/* 2. Total Unplanned Downtime */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-2 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold text-slate-400 uppercase">Unplanned Downtime</span>
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{data.totalDowntimeHours} Hrs</span>
          <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-0.5">
            <ArrowDownRight className="w-3.5 h-3.5" />
            {data.downtimeReduction}
          </span>
        </div>
        <div className="text-[10px] text-slate-400 font-mono">Downtime Hours Across Plant</div>
      </div>

      {/* 3. Maintenance Cost */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-2 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold text-slate-400 uppercase">Maintenance Expenditure</span>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{data.maintenanceCost}</span>
          <span className="text-[11px] font-mono text-emerald-400 font-bold">
            {data.budgetVariance}
          </span>
        </div>
        <div className="text-[10px] text-slate-400 font-mono">Vs $65,000 Monthly Budget</div>
      </div>

      {/* 4. Mean Time To Repair (MTTR) */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-2 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold text-slate-400 uppercase">Mean Time To Repair (MTTR)</span>
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Wrench className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{data.mttrHours}</span>
          <span className="text-xs font-mono text-cyan-400 font-bold">
            MTBF: {data.mtbfHours}
          </span>
        </div>
        <div className="text-[10px] text-slate-400 font-mono">Industry Benchmark &lt; 2.0 Hrs</div>
      </div>
    </div>
  );
};
