import React from 'react';

export const LoadingSpinner = ({ size = 'md', label = 'Loading Telemetry...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  }[size] || 'w-8 h-8 border-2';

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-3">
      <div
        className={`${sizeClasses} border-cyan-500 border-t-transparent rounded-full animate-spin`}
      />
      {label && (
        <span className="text-xs font-mono text-cyan-400 font-medium animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
};
