import React from 'react';

export const Badge = ({
  variant = 'optimal',
  size = 'md',
  children,
  className = '',
  glow = false,
  pulse = true,
  dot = true,
  ...props
}) => {
  const styles = {
    optimal: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    critical: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    danger: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    info: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    cyber: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    purple: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
    neutral: 'bg-slate-800 text-slate-400 border-slate-700',
  };

  const dotColors = {
    optimal: 'bg-emerald-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    critical: 'bg-rose-400',
    danger: 'bg-rose-400',
    info: 'bg-cyan-400',
    cyber: 'bg-cyan-300',
    purple: 'bg-violet-400',
    neutral: 'bg-slate-400',
  };

  const glowStyles = {
    optimal: 'shadow-[0_0_10px_rgba(16,185,129,0.3)]',
    success: 'shadow-[0_0_10px_rgba(16,185,129,0.3)]',
    warning: 'shadow-[0_0_10px_rgba(245,158,11,0.3)]',
    critical: 'shadow-[0_0_12px_rgba(244,63,94,0.4)]',
    danger: 'shadow-[0_0_12px_rgba(244,63,94,0.4)]',
    info: 'shadow-[0_0_10px_rgba(6,182,212,0.3)]',
    cyber: 'shadow-[0_0_12px_rgba(6,182,212,0.4)]',
    purple: 'shadow-[0_0_10px_rgba(139,92,246,0.3)]',
    neutral: '',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-0.5 text-xs',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wider border select-none transition-all duration-200 ${
        sizeStyles[size] || sizeStyles.md
      } ${styles[variant] || styles.neutral} ${glow ? glowStyles[variant] || '' : ''} ${className}`}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2 items-center justify-center">
          {pulse && (variant === 'critical' || variant === 'danger' || variant === 'warning') && (
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                dotColors[variant] || 'bg-current'
              }`}
            />
          )}
          <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dotColors[variant] || 'bg-current'}`} />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};
