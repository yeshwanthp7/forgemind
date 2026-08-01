import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md max-w-md"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
        <Brain className="w-4 h-4 animate-pulse" />
      </div>

      <div className="space-y-1">
        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
          FORGEMIND AI SENTINEL IS THINKING...
        </span>

        {/* 3 Animated Pulsing Dots */}
        <div className="flex items-center gap-1.5 pt-1">
          <motion.span
            className="w-2 h-2 rounded-full bg-cyan-400"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="w-2 h-2 rounded-full bg-cyan-400"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className="w-2 h-2 rounded-full bg-cyan-400"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
};
