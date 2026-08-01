import React, { useState } from 'react';
import {
  AlertTriangle,
  Wrench,
  ChevronRight,
  ShieldAlert,
  Check,
  Zap
} from 'lucide-react';

export const MaintenanceAlerts = ({ alerts }) => {
  const [dispatchedMap, setDispatchedMap] = useState({});

  const handleDispatch = (id) => {
    setDispatchedMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md hover:border-slate-700 transition duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Live Maintenance Telemetry Alerts</h3>
              <p className="text-[11px] text-slate-400">High-priority machinery warnings requiring action</p>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px] border border-rose-500/30 font-bold animate-pulse">
            {alerts.length} Immediate
          </span>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => {
            const isDispatched = dispatchedMap[alert.id];
            return (
              <div
                key={alert.id}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span className="font-bold text-xs text-slate-200">{alert.machineName}</span>
                    <span className="text-[10px] text-cyan-400 font-mono font-bold">({alert.machineId})</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      alert.severity === 'Critical'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-mono">{alert.message}</p>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2 text-[11px]">
                  <span className="text-slate-400 font-mono text-[10px]">{alert.timestamp}</span>

                  <button
                    disabled={isDispatched}
                    onClick={() => handleDispatch(alert.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono flex items-center gap-1.5 transition ${
                      isDispatched
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 shadow-sm'
                    }`}
                  >
                    {isDispatched ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Dispatched</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 text-rose-400" />
                        <span>{alert.actionRequired}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
        <span className="text-[11px] text-slate-400 font-mono">
          ISO-45001 Automated Escalation Active
        </span>
      </div>
    </div>
  );
};
