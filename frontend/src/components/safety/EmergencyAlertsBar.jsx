import React from 'react';
import { AlertOctagon, Radio, Bell } from 'lucide-react';

export const EmergencyAlertsBar = ({ activeAlerts, onTriggerEvacuation }) => {
  return (
    <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse shrink-0">
          <AlertOctagon className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <h4 className="text-xs font-mono font-bold text-rose-200 uppercase tracking-wider flex items-center gap-2">
            <span>Plant-Wide Safety Alert Broadcast Active</span>
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          </h4>
          <p className="text-xs text-slate-300 font-mono">
            {activeAlerts.length} Critical P1 Alarm Broadcasts Monitored in Zone A & Zone C.
          </p>
        </div>
      </div>

      <button
        onClick={onTriggerEvacuation}
        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs font-mono border border-rose-400/40 shadow-lg shadow-rose-500/20 transition shrink-0"
      >
        Sound Evacuation Horn
      </button>
    </div>
  );
};
