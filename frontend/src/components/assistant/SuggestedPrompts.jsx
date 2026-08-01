import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Thermometer, ShieldCheck, BarChart3, Wrench, ArrowRight } from 'lucide-react';

export const SuggestedPrompts = ({ prompts, onSelectPrompt }) => {
  const getIcon = (iconType) => {
    switch (iconType) {
      case 'Thermal':
        return <Thermometer className="w-5 h-5 text-rose-400" />;
      case 'Shield':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Chart':
        return <BarChart3 className="w-5 h-5 text-cyan-400" />;
      default:
        return <Wrench className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto my-auto text-center py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-3"
      >
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          ForgeMind Sentinel AI Assistant
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
          Query machinery telemetry, generate ISO-45001 safety protocol checklists, or analyze FFT acoustic vibration spectrums.
        </p>
      </motion.div>

      {/* Grid of 4 Suggested Prompt Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
        {prompts.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelectPrompt(p.question)}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 shadow-md group flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between w-full">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                {getIcon(p.icon)}
              </div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                {p.category}
              </span>
            </div>

            <p className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition leading-snug">
              "{p.question}"
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
