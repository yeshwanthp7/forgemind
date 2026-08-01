import React from 'react';
import { Bell, ShieldAlert, CheckCircle2, Info } from 'lucide-react';

export const WorkerNotifications = ({ notifications }) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Shift Telemetry Notifications
          </h3>
        </div>
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
      </div>

      <div className="space-y-2.5">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-3 text-xs"
          >
            <div className="pt-0.5 shrink-0">
              {n.type === 'alert' ? (
                <ShieldAlert className="w-4 h-4 text-rose-400" />
              ) : n.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Info className="w-4 h-4 text-cyan-400" />
              )}
            </div>
            <div className="space-y-0.5 grow font-mono">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-400">{n.time}</span>
                <span className="text-slate-500">{n.zone}</span>
              </div>
              <p className="text-slate-200 font-medium leading-tight">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
