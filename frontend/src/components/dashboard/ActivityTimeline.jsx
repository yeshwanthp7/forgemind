import React from 'react';
import {
  Clock,
  ShieldAlert,
  Wrench,
  Sparkles,
  Server,
  User,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ActivityTimeline = ({ activities }) => {
  const getEventIcon = (type) => {
    switch (type) {
      case 'incident':
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />;
      case 'maintenance':
        return <Wrench className="w-3.5 h-3.5 text-amber-400" />;
      case 'ai_report':
        return <Sparkles className="w-3.5 h-3.5 text-cyan-400" />;
      case 'system':
        return <Server className="w-3.5 h-3.5 text-blue-400" />;
      default:
        return <User className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  const getEventBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />;
      case 'success':
        return <span className="w-2 h-2 rounded-full bg-emerald-400" />;
      case 'warning':
        return <span className="w-2 h-2 rounded-full bg-amber-400" />;
      default:
        return <span className="w-2 h-2 rounded-full bg-cyan-400" />;
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Live Factory Audit Activity Timeline</h3>
              <p className="text-[11px] text-slate-400">Real-time log of operator & AI agent operations</p>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 font-mono text-[10px] border border-slate-800">
            ISO Log Feed
          </span>
        </div>

        <div className="relative pl-4 space-y-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
          {activities.map((item) => (
            <div key={item.id} className="relative flex items-start gap-3 group">
              {/* Dot Icon */}
              <div className="absolute -left-[23px] top-1 p-1 rounded-full bg-slate-950 border border-slate-700 shadow-md">
                {getEventIcon(item.type)}
              </div>

              <div className="grow p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 group-hover:border-slate-700 transition space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getEventBadge(item.severity)}
                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition">
                      {item.title}
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0">{item.timestamp}</span>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {item.message}
                </p>

                <div className="pt-1.5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Actor: <span className="text-slate-300">{item.user}</span></span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">{item.zone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
        <span className="text-[11px] text-slate-400 font-mono">
          End-to-End Cryptographic Audit Trail Enabled
        </span>
      </div>
    </div>
  );
};
