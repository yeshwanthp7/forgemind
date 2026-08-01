import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export const ApiErrorBanner = ({ message, onRetry }) => {
  return (
    <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
      <div className="flex items-center gap-2.5">
        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />
        <span>{message || 'Backend API Connection Disrupted. Using Fallback Data Cache.'}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 font-bold border border-rose-500/40 flex items-center gap-1.5 transition shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retry Connection</span>
        </button>
      )}
    </div>
  );
};
