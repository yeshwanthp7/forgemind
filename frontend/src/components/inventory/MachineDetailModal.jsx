import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Thermometer,
  Gauge,
  Activity,
  Wrench,
  Clock,
  ShieldCheck,
  Zap,
  MapPin,
  Cpu,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export const MachineDetailModal = ({ machine, onClose, onDispatch }) => {
  if (!machine) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">{machine.id}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">
                    {machine.serialNumber}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-100">{machine.name}</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="space-y-4 my-4 text-xs">
            {/* Key Metadata Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px] font-mono">TYPE</span>
                <span className="font-bold text-slate-200">{machine.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-mono">ZONE</span>
                <span className="font-bold text-slate-200">{machine.zone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-mono">MANUFACTURER</span>
                <span className="font-bold text-slate-200">{machine.manufacturer}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-mono">OPERATING HOURS</span>
                <span className="font-bold text-cyan-400 font-mono">{machine.operatingHours.toLocaleString()} hrs</span>
              </div>
            </div>

            {/* Health & Telemetry Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Health Score */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Health Index</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-white font-mono">{machine.healthScore}%</span>
                  <span className="text-[10px] text-slate-400">Score</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${machine.healthScore < 50 ? 'bg-rose-500' : machine.healthScore < 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${machine.healthScore}%` }}
                  />
                </div>
              </div>

              {/* Temperature */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-rose-400" />
                  Temperature
                </span>
                <div className="text-2xl font-extrabold text-white font-mono">{machine.temperature}°C</div>
                <span className="text-[10px] text-slate-400 font-mono">Baseline: {machine.temperatureBaseline}°C</span>
              </div>

              {/* Pressure */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase flex items-center gap-1">
                  <Gauge className="w-3 h-3 text-cyan-400" />
                  Hydraulic Pressure
                </span>
                <div className="text-2xl font-extrabold text-cyan-300 font-mono">{machine.pressure} Bar</div>
                <span className="text-[10px] text-slate-400 font-mono">Baseline: {machine.pressureBaseline} Bar</span>
              </div>
            </div>

            {/* Diagnostic Details */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
              <h4 className="font-bold text-cyan-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Vibration & Component Diagnostics
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div>Critical Component: <span className="font-bold text-white">{machine.criticalComponent}</span></div>
                <div>Vibration Frequency: <span className="font-bold text-cyan-300 font-mono">{machine.vibration}</span></div>
                <div>Last Service: <span className="font-bold text-slate-200">{machine.lastMaintenance} ({machine.lastMaintenanceDays})</span></div>
                <div>Next Scheduled: <span className="font-bold text-slate-200">{machine.nextMaintenance}</span></div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 flex justify-between items-center border-t border-slate-800">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
            >
              Close
            </button>
            <button
              onClick={() => {
                onDispatch(machine);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Wrench className="w-4 h-4" />
              <span>Dispatch Maintenance Order</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
