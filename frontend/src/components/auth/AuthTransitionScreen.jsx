import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Lock,
  Brain,
  Radio,
  UserCheck,
  Rocket,
  CheckCircle2,
  Cpu,
  Sparkles
} from 'lucide-react';

const STAGES = [
  { id: 1, label: 'Authenticating...', subText: 'Verifying AES-256 encrypted security token', icon: Lock },
  { id: 2, label: 'Checking permissions...', subText: 'Validating ISO-45001 security policy', icon: Shield },
  { id: 3, label: 'Loading AI modules...', subText: 'Initializing ForgeMind Sentinel neural core', icon: Brain },
  { id: 4, label: 'Loading telemetry...', subText: 'Connecting 10,000 Hz acoustic FFT transducers', icon: Radio },
  { id: 5, label: 'Detecting role...', subText: 'Configuring role-based dashboard HUD', icon: UserCheck },
  { id: 6, label: 'Redirecting to dashboard...', subText: 'Launching Command Core Environment', icon: Rocket },
];

export const AuthTransitionScreen = ({ user, onComplete }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Stage transition timer sequence over ~2.5 seconds
    const stageDuration = 420; // ms per stage

    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 300);
          return prev;
        }
      });
    }, stageDuration);

    // Smooth progress bar update
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 2;
        clearInterval(progressInterval);
        return 100;
      });
    }, 45);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const currentStage = STAGES[currentStageIndex];
  const CurrentIcon = currentStage.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#030712]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 text-slate-100 font-sans"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Main Azure-Style Glass Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col items-center text-center space-y-6 relative z-10"
      >
        {/* Animated Central Beacon Ring */}
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 rounded-full border-2 border-dashed border-cyan-500/40 border-t-cyan-400 p-2"
          />
          <div className="absolute inset-0 m-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_25px_rgba(6,182,212,0.5)]">
            <CurrentIcon className="w-8 h-8 animate-pulse" />
          </div>
        </div>

        {/* User Card Preview */}
        {user && (
          <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3 shadow-inner">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'}
              alt={user.name}
              className="w-8 h-8 rounded-full border border-slate-700 object-cover"
            />
            <div className="text-left font-mono">
              <span className="text-xs font-bold text-white block">{user.name}</span>
              <span className="text-[10px] text-cyan-400 font-semibold">{user.role} ({user.zone || 'Zone A'})</span>
            </div>
          </div>
        )}

        {/* Stage Dynamic Title & Subtext */}
        <div className="h-16 flex flex-col items-center justify-center space-y-1">
          <AnimatePresence mode="wait">
            <motion.h3
              key={currentStage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg font-bold text-white font-mono tracking-tight flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{currentStage.label}</span>
            </motion.h3>
          </AnimatePresence>

          <p className="text-xs text-slate-400 font-mono">
            {currentStage.subText}
          </p>
        </div>

        {/* Microsoft Azure Telemetry Progress Bar */}
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Sentinel Core Initialization</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-400 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Stage Checklist Feed */}
        <div className="w-full pt-3 border-t border-slate-800/80 space-y-1.5 text-left text-xs font-mono">
          {STAGES.map((stg, index) => {
            const isDone = index < currentStageIndex;
            const isCurrent = index === currentStageIndex;
            return (
              <div
                key={stg.id}
                className={`flex items-center justify-between transition-colors ${
                  isDone
                    ? 'text-emerald-400'
                    : isCurrent
                    ? 'text-cyan-300 font-bold'
                    : 'text-slate-600'
                }`}
              >
                <span className="flex items-center gap-2">
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-700 shrink-0" />
                  )}
                  {stg.label}
                </span>
                <span className="text-[10px] text-slate-500">
                  {isDone ? 'COMPLETED' : isCurrent ? 'IN PROGRESS' : 'PENDING'}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};
