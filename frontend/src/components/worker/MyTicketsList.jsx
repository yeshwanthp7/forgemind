import React from 'react';
import { Wrench, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MyTicketsList = ({ tickets }) => {
  const navigate = useNavigate();

  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            My Active Work Orders & Tickets
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          {tickets.length} Active Work Orders
        </span>
      </div>

      <div className="space-y-3">
        {tickets.map((t) => (
          <div
            key={t.id}
            onClick={() => navigate(`/tickets/${t.id}`)}
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer flex items-center justify-between gap-4 group"
          >
            <div className="space-y-1 grow">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs font-mono group-hover:text-cyan-300 transition">
                  {t.id}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {t.priority}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {t.status}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{t.title}</h4>

              <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono pt-1">
                <span>Machine: <strong className="text-white">{t.machineId}</strong></span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  Target: {t.targetTime}
                </span>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
