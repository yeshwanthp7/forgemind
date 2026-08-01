import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

export const SpectralVibrationGraph = ({ fftData }) => {
  return (
    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-100">FFT Harmonic Vibration Spectrum</h3>
          <p className="text-xs text-slate-400">Fast Fourier Transform frequency spectrum analysis (Hz vs Amplitude mm/s)</p>
        </div>
        <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 text-[10px] font-mono font-bold">
          Harmonic Spike at 240Hz
        </span>
      </div>

      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={fftData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="hz" stroke="#64748b" tick={{ fontSize: 11 }} unit="Hz" />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#090d16',
                borderColor: '#334155',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#f8fafc'
              }}
            />
            <Bar dataKey="amp" name="Amplitude (mm/s)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
