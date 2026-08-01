import React from 'react';
import { Clock, ShieldAlert, Wrench, CheckCircle2, Activity } from 'lucide-react';

export const TicketSlaTimeline = ({ timeline }) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">Work Order SLA & Audit Timeline</h3>
            <p className="text-[11px] text-slate-400">Milestone log from auto-dispatch to completion</p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 font-mono text-[10px] border border-slate-800">
          ISO Audit Log
        </span>
      </div>

      <div className="relative pl-4 space-y-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {timeline.map((item) => (
          <div key={item.id} className="relative flex items-start gap-3 group">
            <div className="absolute -left-[23px] top-1 p-1 rounded-full bg-slate-950 border border-slate-700 shadow-md">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
            </div>

            <div className="grow p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 group-hover:border-slate-700 transition space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition">
                  {item.title}
                </h4>
                <span className="text-[10px] text-slate-500 font-mono shrink-0">{item.time}</span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Actor: <span className="text-slate-300">{item.actor}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
