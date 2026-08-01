import React from 'react';

export const Loader = ({
  variant = 'spinner',
  size = 'md',
  text = '',
  fullPage = false,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4',
  };

  const renderLoaderContent = () => {
    if (variant === 'cyber') {
      return (
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <div className="absolute w-8 h-8 rounded-full border-2 border-indigo-500/20 border-b-indigo-400 animate-spin flex items-center justify-center" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          <div className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        </div>
      );
    }

    if (variant === 'dots') {
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      );
    }

    // Standard Spinner
    return (
      <div
        className={`${sizeMap[size] || sizeMap.md} rounded-full border-cyan-500/20 border-t-cyan-400 animate-spin`}
      />
    );
  };

  const content = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      {renderLoaderContent()}
      {text && (
        <p className="text-xs font-mono tracking-wider uppercase text-cyan-400/90 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return content;
};
