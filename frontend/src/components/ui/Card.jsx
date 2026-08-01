import React from 'react';

export const Card = ({
  children,
  variant = 'default',
  glow = false,
  critical = false,
  interactive = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-xl border transition-all duration-300 backdrop-blur-md overflow-hidden';
  
  const variantStyles = {
    default: 'bg-slate-900/80 border-slate-800 text-slate-100',
    glass: 'bg-[#0d121d]/75 border-white/10 text-slate-100 shadow-xl',
    cyber: 'bg-slate-950/90 border-cyan-500/30 text-slate-100 shadow-[0_0_15px_rgba(6,182,212,0.1)]',
    critical: 'bg-rose-950/20 border-rose-500/40 text-slate-100 shadow-[0_0_20px_rgba(244,63,94,0.15)]',
    warning: 'bg-amber-950/20 border-amber-500/40 text-slate-100 shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    optimal: 'bg-emerald-950/20 border-emerald-500/40 text-slate-100 shadow-[0_0_20px_rgba(16,185,129,0.15)]',
  };

  const interactiveStyles = interactive
    ? 'hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5 cursor-pointer'
    : '';

  const glowStyles = glow ? 'shadow-[0_0_25px_rgba(6,182,212,0.2)] border-cyan-400/40' : '';
  const criticalStyles = critical ? 'border-rose-500/60 shadow-[0_0_25px_rgba(244,63,94,0.25)] animate-pulse' : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.default} ${interactiveStyles} ${glowStyles} ${criticalStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-5 pb-3 border-b border-slate-800/80 flex items-center justify-between gap-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`text-base font-semibold text-slate-100 tracking-tight flex items-center gap-2 ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-xs text-slate-400 leading-relaxed mt-0.5 ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-5 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-4 bg-slate-950/40 border-t border-slate-800/80 flex items-center justify-between gap-3 ${className}`} {...props}>
      {children}
    </div>
  );
};
