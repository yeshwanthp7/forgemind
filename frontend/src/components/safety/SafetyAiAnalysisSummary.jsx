import React from 'react';
import { Brain, Sparkles, ShieldAlert, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SafetyAiAnalysisSummary = ({ analysis }) => {
  const navigate = useNavigate();

  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Sentinel AI Computer Vision Analysis
          </h3>
        </div>
        <button
          onClick={() => navigate('/ai-analysis')}
          className="text-xs text-cyan-400 font-mono font-bold hover:underline flex items-center gap-1"
        >
          Open AI Sentinel Page <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3 font-mono">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Model Confidence:</span>
          <span className="px-2.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 text-xs font-bold border border-cyan-500/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            {analysis.confidenceScore}% Confidence
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] text-cyan-400 uppercase font-bold">DETECTED HAZARD</span>
          <h4 className="text-xs font-bold text-white">{analysis.detectedHazard}</h4>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] text-amber-400 uppercase font-bold">ROOT CAUSE DIAGNOSIS</span>
          <p className="text-xs text-slate-300 leading-relaxed">{analysis.rootCause}</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] text-emerald-400 uppercase font-bold">RECOMMENDED SAFETY ACTION</span>
          <p className="text-xs text-slate-200 font-medium leading-relaxed">{analysis.recommendedAction}</p>
        </div>
      </div>
    </div>
  );
};
