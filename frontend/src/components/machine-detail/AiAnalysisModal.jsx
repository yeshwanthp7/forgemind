import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Activity,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  X,
  CheckCircle2,
  Brain,
  Zap
} from 'lucide-react';

export const AiAnalysisModal = ({ isOpen, onClose, machine }) => {
  const [step, setStep] = useState(0); // 0 to 4
  const [isScanning, setIsScanning] = useState(false);

  const scanSteps = [
    'Initializing Neural Spectral Transformer Core...',
    'Sampling 10,000 Hz Acoustic FFT Vibration Acceleration...',
    'Computing Thermal Gradient UCL & Fluid Cavitation Metrics...',
    'Synthesizing Multi-Agent Failure Probability Profile...'
  ];

  useEffect(() => {
    if (isOpen) {
      setIsScanning(true);
      setStep(0);
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setStep(current);
        if (current >= 4) {
          clearInterval(interval);
          setIsScanning(false);
        }
      }, 700);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isScanning && onClose()}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)] z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30">
                <Brain className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span>ForgeMind AI Neural Sentinel Scan</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] border border-cyan-500/30">
                    ISO-45001 AI Core
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">Asset: {machine.name} ({machine.id})</p>
              </div>
            </div>
            <button
              disabled={isScanning}
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white disabled:opacity-30"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="my-6 space-y-4">
            {isScanning ? (
              <div className="space-y-4 text-center py-4">
                <div className="w-16 h-16 mx-auto rounded-full border-4 border-cyan-500/30 border-t-cyan-400 animate-spin flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-200 font-mono">
                    {scanSteps[Math.min(step, scanSteps.length - 1)]}
                  </h4>
                  <p className="text-xs text-slate-500">Cross-analyzing 148 plant sensor channels in real-time</p>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    animate={{ width: `${((step + 1) / 4) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                {/* AI Result Card */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400 font-mono text-[10px] uppercase">ANALYSIS STATUS</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px] border border-emerald-500/30">
                      100% Scan Complete
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-mono">FAILURE PROBABILITY</span>
                      <span className={`font-mono font-extrabold text-lg ${machine.healthScore < 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {100 - machine.healthScore}% Risk
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-mono">PREDICTED RUL WINDOW</span>
                      <span className="font-mono font-bold text-cyan-300 text-sm">
                        {machine.rulPercentage < 25 ? '72 Hours (Critical)' : '45 Days (Optimal)'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase block">
                      Neural Model Key Insight
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {machine.healthScore < 50
                        ? `Acoustic FFT harmonics show 12.4 Hz vibration peak matching outer race bearing wear on ${machine.name}. Thermal core operating at ${machine.temperature}°C.`
                        : `All telemetry metrics for ${machine.name} are within ISO-45001 safety thresholds. Vibration velocity nominal at ${machine.vibration}.`}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-200 flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold text-cyan-300 block">Recommended AI Action</span>
                    <p className="text-[11px] leading-relaxed">
                      {machine.healthScore < 50
                        ? 'Dispatch mechanical team for bearing kit replacement during shift change to avoid estimated $140,000 unplanned downtime.'
                        : 'Maintain standard 250-hour lubrication schedule. Re-check thermal levels during next automated scan cycle.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {!isScanning && (
            <div className="pt-4 flex justify-between items-center border-t border-slate-800">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  alert(`Work Order automatically queued for ${machine.id}`);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
              >
                Auto-Dispatch Work Order
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
