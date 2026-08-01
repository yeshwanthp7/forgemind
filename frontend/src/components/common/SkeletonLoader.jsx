import React from 'react';

export const SkeletonLoader = ({ height = 'h-32', className = '' }) => {
  return (
    <div
      className={`w-full rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 animate-pulse ${height} ${className}`}
    />
  );
};
