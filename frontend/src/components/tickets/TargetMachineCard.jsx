import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, MapPin, Activity, Thermometer, Gauge, ArrowRight } from 'lucide-react';

export const TargetMachineCard = ({ machine }) => {
  const navigate = useNavigate();

  const getHealthColor = (score) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase block">
              TARGET MACHINE HARDWARE
            </span>
            <h3 className="text-sm font-bold text-slate-100">{machine.name}</h3>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-300 font-mono text-[10px] border border-slate-800 font-bold">
          {machine.id}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          {machine.zone}
        </span>
        <span>• {machine.type}</span>
      </div>

      {/* Machine Health Bar */}
      <div className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            Machine Health Score
          </span>
          <span className="font-bold text-slate-100">{machine.healthScore}%</span>
        </div>
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className={`h-full ${getHealthColor(machine.healthScore)}`}
            style={{ width: `${machine.healthScore}%` }}
          />
        </div>
      </div>

      {/* Telemetry Metrics */}
      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-0.5">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Thermometer className="w-3 h-3 text-rose-400" />
            Thermal (°C)
          </span>
          <span className="font-bold text-slate-100 text-sm">{machine.temperature}°C</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-0.5">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <Gauge className="w-3 h-3 text-cyan-400" />
            Pressure (Bar)
          </span>
          <span className="font-bold text-cyan-300 text-sm">{machine.pressure} Bar</span>
        </div>
      </div>

      <button
        onClick={() => navigate(`/inventory/${machine.id}`)}
        className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-400 text-xs font-bold font-mono border border-slate-800 transition flex items-center justify-center gap-1.5"
      >
        <span>Open Machine Telemetry Specs</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
