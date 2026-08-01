import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  RotateCcw,
  Keyboard,
  ShieldAlert,
  XCircle
} from 'lucide-react';

export const ScannerErrorCard = ({ onRetry, onSwitchToManual }) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      className="rounded-3xl bg-slate-900 border border-rose-500/40 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(244,63,94,0.15)] space-y-6 max-w-md mx-auto text-center"
    >
      <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
        <XCircle className="w-8 h-8 animate-pulse" />
      </div>

      <div className="space-y-1">
        <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-widest block">
          SCAN ERROR — ERR_QR_UNRECOGNIZED
        </span>
        <h3 className="text-lg font-bold text-slate-100">Asset Tag Not Found</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          The scanned barcode pattern does not match any registered machine hardware tag in the factory inventory catalog.
        </p>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs font-mono space-y-1 text-slate-400">
        <div>Error Code: <span className="text-rose-400 font-bold">TAG_CATALOG_MISMATCH_404</span></div>
        <div>Checklist: Ensure lens is clean & asset tag is undamaged.</div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
        <button
          onClick={onRetry}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retry Camera Scan</span>
        </button>

        <button
          onClick={onSwitchToManual}
          className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 text-xs font-bold flex items-center justify-center gap-2"
        >
          <Keyboard className="w-4 h-4 text-rose-400" />
          <span>Manual ID Input</span>
        </button>
      </div>
    </motion.div>
  );
};
