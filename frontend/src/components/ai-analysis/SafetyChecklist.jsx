import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Circle, AlertTriangle, UserCheck } from 'lucide-react';

export const SafetyChecklist = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems);

  const toggleCheck = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item))
    );
  };

  const completedCount = items.filter((i) => i.isCompleted).length;
  const progressPct = Math.round((completedCount / items.length) * 100);

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">ISO-45001 Prescriptive Safety Protocol</h3>
            <p className="text-[11px] text-slate-400">Mandatory operator safety & lockout verification checklist</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
          {completedCount} / {items.length} Completed ({progressPct}%)
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Checklist Items */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleCheck(item.id)}
            className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
              item.isCompleted
                ? 'bg-slate-950/90 border-emerald-500/30 text-slate-200'
                : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <button type="button" className="shrink-0">
                {item.isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                )}
              </button>
              <span className={`text-xs ${item.isCompleted ? 'line-through text-slate-400 font-normal' : 'font-medium text-slate-200'}`}>
                {item.task}
              </span>
            </div>

            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400 shrink-0">
              {item.requiredRole}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
