import React from 'react';
import { Brain, Sparkles, ChevronRight, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RecentWorkerAiAnalysis = ({ analysisItems }) => {
  const navigate = useNavigate();

  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Recent AI Hazard Diagnostics
          </h3>
        </div>
        <button
          onClick={() => navigate('/ai-analysis')}
          className="text-xs text-cyan-400 font-mono font-bold hover:underline flex items-center gap-1"
        >
          View Full AI Core <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {analysisItems.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate('/ai-analysis')}
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400">{item.assetId}</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                {item.confidence}% Confidence
              </span>
            </div>

            <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition">
              {item.hazardTitle}
            </h4>

            <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
              {item.recommendation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
