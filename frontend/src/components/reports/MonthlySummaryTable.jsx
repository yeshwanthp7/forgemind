import React from 'react';
import { FileText, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';

export const MonthlySummaryTable = ({ monthlyData }) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">Monthly Operational Summary</h3>
            <p className="text-[11px] text-slate-400">Historical performance, MTTR benchmarks, and savings</p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-400 font-mono text-[10px] border border-slate-800">
          Executive Audit Register
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3">Month</th>
              <th className="p-3">Total Incidents</th>
              <th className="p-3">MTTR Benchmark</th>
              <th className="p-3">MTBF Baseline</th>
              <th className="p-3">Parts Expenditure</th>
              <th className="p-3">Prevented Downtime ROI</th>
              <th className="p-3">ISO Compliance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {monthlyData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-850/50 transition">
                <td className="p-3 font-bold text-slate-100">{row.month}</td>
                <td className="p-3 text-cyan-300 font-bold">{row.totalIncidents} Alarms</td>
                <td className="p-3 text-slate-300">{row.mttr}</td>
                <td className="p-3 text-slate-400">{row.mtbf}</td>
                <td className="p-3 text-slate-300">{row.partsCost}</td>
                <td className="p-3 text-emerald-400 font-bold">{row.downtimeSaved}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1 w-fit">
                    <ShieldCheck className="w-3 h-3" />
                    {row.compliance}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
