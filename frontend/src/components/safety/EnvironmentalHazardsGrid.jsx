import React from 'react';
import { Flame, Droplets, ShieldAlert, Activity } from 'lucide-react';

export const EnvironmentalHazardsGrid = ({ fireAlerts, chemicalAlerts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* 1. Fire & Thermal Detection Monitor */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/40 backdrop-blur-xl shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
              <Flame className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono font-bold text-slate-200 uppercase">
              Fire & Thermal Anomaly Detection
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
            HIGH TEMP ALARM
          </span>
        </div>

        <div className="space-y-2 pt-1 font-mono">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-rose-400">{fireAlerts.temperature}°C</span>
            <span className="text-xs text-slate-400">Baseline: {fireAlerts.baseline}°C</span>
          </div>
          <p className="text-xs text-slate-300 font-bold">{fireAlerts.location}</p>
          <p className="text-[11px] text-slate-400">{fireAlerts.recommendation}</p>
        </div>
      </div>

      {/* 2. Chemical Leak Telemetry Sensor */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 backdrop-blur-xl shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Droplets className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono font-bold text-slate-200 uppercase">
              Chemical & Volatile Gas Telemetry
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            ELEVATED GAS PPM
          </span>
        </div>

        <div className="space-y-2 pt-1 font-mono">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-amber-300">{chemicalAlerts.ppm} PPM</span>
            <span className="text-xs text-slate-400">Gas: {chemicalAlerts.gasType}</span>
          </div>
          <p className="text-xs text-slate-300 font-bold">{chemicalAlerts.location}</p>
          <p className="text-[11px] text-slate-400">{chemicalAlerts.recommendation}</p>
        </div>
      </div>
    </div>
  );
};
