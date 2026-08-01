import React, { useState } from 'react';
import { AlertOctagon, RefreshCw, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({
  title = 'System Exception Encountered',
  message = 'An unexpected error occurred while loading data or executing the requested action.',
  errorCode,
  errorDetails,
  onRetry,
  onBack,
  className = '',
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-rose-950/10 border border-rose-500/30 backdrop-blur-sm shadow-[0_0_30px_rgba(244,63,94,0.1)] ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-5 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
        <AlertOctagon className="w-8 h-8 animate-pulse" />
      </div>

      {errorCode && (
        <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-rose-400/80 mb-1">
          ERROR CODE: {errorCode}
        </span>
      )}

      <h3 className="text-lg font-semibold text-slate-100 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">{message}</p>

      {errorDetails && (
        <div className="w-full max-w-lg mb-6">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition mb-2"
          >
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {showDetails ? 'Hide Diagnostics' : 'Show Diagnostics Stack'}
          </button>
          {showDetails && (
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-left text-xs font-mono text-rose-300/90 overflow-x-auto max-h-40">
              <pre>{typeof errorDetails === 'object' ? JSON.stringify(errorDetails, null, 2) : errorDetails}</pre>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onBack && (
          <Button variant="outline" icon={ArrowLeft} onClick={onBack}>
            Return Back
          </Button>
        )}
        {onRetry && (
          <Button variant="danger" icon={RefreshCw} onClick={onRetry}>
            Retry Request
          </Button>
        )}
      </div>
    </div>
  );
};
