import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

export const RiskMatrixHeatmap = ({ riskData = [] }) => {
  const getCellColor = (sev, lik, active) => {
    const score = sev * lik;
    if (active) return 'bg-rose-600 text-white shadow-lg shadow-rose-900 border-2 border-white animate-pulse';
    if (score >= 15) return 'bg-rose-950/80 text-rose-300 border-rose-800 hover:bg-rose-900';
    if (score >= 9) return 'bg-amber-950/80 text-amber-300 border-amber-800 hover:bg-amber-900';
    if (score >= 4) return 'bg-cyan-950/80 text-cyan-300 border-cyan-800 hover:bg-cyan-900';
    return 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800';
  };

  const severities = [5, 4, 3, 2, 1]; // Y axis: Severity (Catastrophic -> Insignificant)
  const likelihoods = [1, 2, 3, 4, 5]; // X axis: Likelihood (Rare -> Frequent)

  return (
    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-100">5x5 Risk Likelihood vs Severity Matrix</h3>
          <p className="text-xs text-slate-400">ISO 31000 Risk Assessment Framework for factory zones</p>
        </div>
        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono font-bold">
          1 Critical Cell Active (Zone B)
        </span>
      </div>

      <div className="grid grid-cols-6 gap-2 text-xs">
        {/* Y Axis Header Label */}
        <div className="col-span-1 row-span-6 flex flex-col justify-around text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest pr-2">
          <span>Catastrophic (5)</span>
          <span>Major (4)</span>
          <span>Moderate (3)</span>
          <span>Minor (2)</span>
          <span>Insignificant (1)</span>
        </div>

        {/* Matrix Cells */}
        <div className="col-span-5 grid grid-cols-5 gap-2">
          {severities.map((sev) =>
            likelihoods.map((lik) => {
              const cellData = riskData.find(r => r.severity === sev && r.likelihood === lik) || { count: 0 };
              return (
                <div
                  key={`${sev}-${lik}`}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center min-h-[60px] cursor-pointer transition relative group ${getCellColor(
                    sev,
                    lik,
                    cellData.active
                  )}`}
                >
                  <span className="text-sm font-extrabold">{cellData.count > 0 ? cellData.count : ''}</span>
                  <span className="text-[9px] opacity-70 font-mono">S{sev}-L{lik}</span>

                  {/* Cell Hover Tooltip */}
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-lg bg-slate-950 border border-slate-700 shadow-xl z-30 text-[10px] text-slate-200">
                    <div className="font-bold mb-0.5">{cellData.label || `Severity ${sev} - Likelihood ${lik}`}</div>
                    <div>Active Hazards: {cellData.count}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* X Axis Bottom Labels */}
      <div className="grid grid-cols-6 gap-2 mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">
        <div className="col-span-1" />
        <div className="col-span-5 grid grid-cols-5 gap-2">
          <span>Rare (1)</span>
          <span>Unlikely (2)</span>
          <span>Possible (3)</span>
          <span>High (4)</span>
          <span>Frequent (5)</span>
        </div>
      </div>
    </div>
  );
};
