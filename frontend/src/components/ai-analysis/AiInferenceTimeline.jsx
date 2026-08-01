import React from 'react';
import { Sparkles, CheckCircle2, Activity, Cpu, Clock, Layers } from 'lucide-react';

export const AiInferenceTimeline = ({ timeline }) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">Multi-Agent Neural Inference Timeline</h3>
            <p className="text-[11px] text-slate-400">Step-by-step diagnostic latency & spectral signal processing</p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-400 font-mono text-[10px] border border-slate-800">
          Total Latency: 103ms
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {timeline.map((step, idx) => (
          <div
            key={step.id}
            className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 relative group hover:border-cyan-500/40 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-cyan-400">
                0{idx + 1} • {step.duration}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[9px] font-mono">
                {step.status}
              </span>
            </div>

            <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition">
              {step.stage}
            </h4>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              {step.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
