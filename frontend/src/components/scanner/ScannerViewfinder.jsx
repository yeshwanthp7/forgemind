import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Camera,
  Zap,
  RotateCw,
  Flashlight,
  QrCode,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const ScannerViewfinder = ({ onSimulateScan, isFlashlightOn, onToggleFlashlight }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl p-6 sm:p-8 flex flex-col items-center justify-center space-y-6 min-h-[420px]">
      {/* Background Simulated Camera Feed Backdrop */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
          isFlashlightOn ? 'bg-cyan-950/30' : 'bg-slate-950'
        }`}
      />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"
      />

      {/* Camera Viewfinder Reticle Frame */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        {/* Corner Reticle Brackets */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-lg shadow-[0_0_10px_rgba(6,182,212,0.8)]" />

        {/* Sweeping Laser Scan Line Animation */}
        <motion.div
          animate={{ y: [-110, 110, -110] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(6,182,212,1)]"
        />

        {/* Center Target Icon */}
        <div className="flex flex-col items-center justify-center space-y-2 opacity-60">
          <QrCode className="w-12 h-12 text-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono text-cyan-300 tracking-widest uppercase">
            ALIGN QR / BARCODE
          </span>
        </div>
      </div>

      {/* Viewfinder Controls (Flashlight, Camera Switch) */}
      <div className="relative z-10 flex items-center gap-4">
        <button
          onClick={onToggleFlashlight}
          className={`p-3 rounded-2xl border text-xs font-semibold flex items-center gap-2 transition ${
            isFlashlightOn
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800'
          }`}
          title="Toggle Camera Flashlight"
        >
          <Flashlight className="w-4 h-4" />
          <span className="hidden sm:inline">{isFlashlightOn ? 'Flash ON' : 'Flash OFF'}</span>
        </button>

        <button
          onClick={() => alert('Front/Rear Camera Swapped (Simulated)')}
          className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-semibold flex items-center gap-2 transition"
          title="Switch Camera Feed"
        >
          <RotateCw className="w-4 h-4" />
          <span className="hidden sm:inline">Flip Camera</span>
        </button>
      </div>

      {/* Interactive Quick Demo Scan Buttons */}
      <div className="relative z-10 w-full max-w-md pt-3 border-t border-slate-800/80 flex flex-col items-center space-y-2">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          Presentation Demo Triggers
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2 w-full">
          <button
            onClick={() => onSimulateScan('HP-9042')}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Scan Valid Asset (HP-9042)</span>
          </button>

          <button
            onClick={() => onSimulateScan('CNC-4081')}
            className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Scan Warning Asset (CNC-4081)</span>
          </button>

          <button
            onClick={() => onSimulateScan('INVALID-999')}
            className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Unrecognized Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};
