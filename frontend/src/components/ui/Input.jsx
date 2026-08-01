import React, { forwardRef } from 'react';
import { X } from 'lucide-react';

export const Input = forwardRef(
  (
    {
      label,
      helperText,
      error,
      icon: Icon,
      endIcon: EndIcon,
      clearable = false,
      onClear,
      value,
      className = '',
      wrapperClassName = '',
      fullWidth = true,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${wrapperClassName}`}>
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 select-none">
            {label}
          </label>
        )}
        <div className="relative rounded-lg shadow-sm">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            ref={ref}
            value={value}
            disabled={disabled}
            className={`w-full bg-slate-900/90 border ${
              error
                ? 'border-rose-500/80 text-rose-200 focus:ring-rose-500/50 focus:border-rose-500'
                : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/50'
            } rounded-lg ${Icon ? 'pl-9' : 'pl-3.5'} ${
              clearable || EndIcon ? 'pr-9' : 'pr-3.5'
            } py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
          />
          {clearable && value && (
            <button
              type="button"
              onClick={onClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {!clearable && EndIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <EndIcon className="w-4 h-4" />
            </div>
          )}
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-medium">
            <span>⚠️</span> {error}
          </p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
