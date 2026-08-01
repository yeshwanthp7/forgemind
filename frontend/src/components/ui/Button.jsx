import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  loading = false,
  fullWidth = false,
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98] select-none';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[32px]',
    md: 'px-4 py-2 text-sm gap-2 min-h-[40px]',
    lg: 'px-5 py-2.5 text-base gap-2.5 min-h-[48px]',
  };

  const variants = {
    primary:
      'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-950/50 border border-cyan-400/30 hover:shadow-cyan-500/25 focus:ring-cyan-500',
    cyber:
      'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] focus:ring-cyan-500',
    secondary:
      'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 focus:ring-slate-500',
    glass:
      'bg-slate-900/70 hover:bg-slate-800/90 text-cyan-300 border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-md focus:ring-cyan-500 shadow-md',
    outline:
      'bg-transparent text-slate-300 border border-slate-700 hover:border-cyan-500 hover:text-cyan-400 focus:ring-cyan-500',
    ghost:
      'bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-slate-100 focus:ring-slate-500',
    danger:
      'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/50 border border-rose-400/30 hover:shadow-rose-500/25 focus:ring-rose-500',
  };

  const EffectiveLeftIcon = LeftIcon || Icon;

  return (
    <button
      type={type}
      className={`${baseStyle} ${sizeStyles[size] || sizeStyles.md} ${variants[variant] || variants.primary} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : EffectiveLeftIcon ? (
        <EffectiveLeftIcon className="w-4 h-4 shrink-0" />
      ) : null}
      {children && <span>{children}</span>}
      {!loading && RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
    </button>
  );
};
