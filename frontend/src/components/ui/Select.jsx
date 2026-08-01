import React from 'react';

export const Select = React.forwardRef(({ label, options = [], error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">{label}</label>}
      <select
        ref={ref}
        className={`w-full bg-slate-900 border ${
          error ? 'border-rose-500' : 'border-slate-700 focus:border-cyan-500'
        } rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 ${
          error ? 'focus:ring-rose-500' : 'focus:ring-cyan-500'
        } transition-all ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-100">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
