import React from 'react';
import { AlertTriangle, Flame, ShieldAlert, UserX } from 'lucide-react';

export const BoundingBoxOverlay = ({ hazard }) => {
  if (!hazard || !hazard.box) return null;
  const { x, y, width, height } = hazard.box;

  const isCritical = hazard.severity === 'critical';

  return (
    <div
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`
      }}
      className={`absolute border-2 rounded transition-all duration-300 pointer-events-auto group ${
        isCritical
          ? 'border-rose-500 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse'
          : 'border-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
      }`}
    >
      {/* Target Corner Markers */}
      <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white" />
      <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white" />

      {/* Label Badge */}
      <div
        className={`absolute -top-7 left-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1.5 shadow-md ${
          isCritical ? 'bg-rose-600' : 'bg-amber-600'
        }`}
      >
        <AlertTriangle className="w-3 h-3" />
        <span>{hazard.label}</span>
        <span className="font-mono text-[9px] opacity-80">({Math.round(hazard.confidence * 100)}%)</span>
      </div>

      {/* Hover Info Card */}
      <div className="hidden group-hover:block absolute top-full left-0 mt-2 w-64 p-3 rounded-xl bg-slate-950/95 border border-slate-700 shadow-2xl z-30 text-xs backdrop-blur-md">
        <div className="font-bold text-slate-100 mb-1">{hazard.label}</div>
        <p className="text-slate-300 text-[11px] mb-2">{hazard.aiRecommendation}</p>
        <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800 pt-1.5 font-mono">
          <span>Confidence: {hazard.confidence}</span>
          <span>{hazard.timestamp}</span>
        </div>
      </div>
    </div>
  );
};
