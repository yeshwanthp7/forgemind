import React from 'react';
import { motion } from 'framer-motion';

export const CircularProgressRing = ({
  value = 85,
  size = 140,
  strokeWidth = 10,
  colorVariant = 'cyan', // 'cyan' | 'rose' | 'amber' | 'emerald'
  label = 'Score',
  unit = '%'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const getColor = () => {
    switch (colorVariant) {
      case 'rose':
        return {
          stroke: '#f43f5e',
          gradientFrom: '#f43f5e',
          gradientTo: '#e11d48',
          text: 'text-rose-400',
          glow: 'drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]'
        };
      case 'amber':
        return {
          stroke: '#f59e0b',
          gradientFrom: '#f59e0b',
          gradientTo: '#d97706',
          text: 'text-amber-400',
          glow: 'drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]'
        };
      case 'emerald':
        return {
          stroke: '#10b981',
          gradientFrom: '#10b981',
          gradientTo: '#059669',
          text: 'text-emerald-400',
          glow: 'drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]'
        };
      default:
        return {
          stroke: '#06b6d4',
          gradientFrom: '#06b6d4',
          gradientTo: '#3b82f6',
          text: 'text-cyan-400',
          glow: 'drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]'
        };
    }
  };

  const theme = getColor();
  const gradientId = `ring-grad-${colorVariant}-${Math.random().toString(36).substring(2, 6)}`;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.gradientFrom} />
            <stop offset="100%" stopColor={theme.gradientTo} />
          </linearGradient>
        </defs>
        {/* Background Ring Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1e293b"
          strokeWidth={strokeWidth}
          fill="transparent"
          opacity={0.6}
        />
        {/* Animated Progress Arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          strokeLinecap="round"
          className={theme.glow}
        />
      </svg>

      {/* Center Counter & Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className={`font-mono font-extrabold text-2xl ${theme.text}`}>
          {value}{unit}
        </span>
        <span className="text-[10px] text-slate-400 font-mono font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>
    </div>
  );
};
