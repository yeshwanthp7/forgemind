import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  statusVariant = 'info',
  className = ''
}) => {
  return (
    <div className={`p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md hover:border-cyan-500/30 transition-all duration-200 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        {Icon && (
          <div className="p-2 rounded-lg bg-slate-800/80 text-cyan-400 border border-slate-700">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-bold tracking-tight text-white">{value}</span>
        {trend && (
          <span className={`text-xs font-semibold ${trendPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trendPositive ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
    </div>
  );
};
