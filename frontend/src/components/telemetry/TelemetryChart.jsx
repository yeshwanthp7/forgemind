import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';

export const TelemetryChart = ({ data, title = "Vibration & Thermal Gradient Spectrum" }) => {
  return (
    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-100">{title}</h3>
          <p className="text-xs text-slate-400">Real-time dual sensor spectrum telemetry (vibration mm/s vs temperature °C)</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="text-slate-300">Vibration (mm/s)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="text-slate-300">Temp (°C)</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="left" stroke="#38bdf8" tick={{ fontSize: 11 }} domain={[0, 10]} />
            <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" tick={{ fontSize: 11 }} domain={[50, 200]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#090d16',
                borderColor: '#334155',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#f8fafc'
              }}
            />
            {/* Danger Threshold Reference Line */}
            <ReferenceLine yAxisId="right" y={160} label={{ value: 'CRITICAL TEMP THRESHOLD (160°C)', fill: '#f43f5e', fontSize: 10 }} stroke="#f43f5e" strokeDasharray="4 4" />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="vib"
              name="Vibration (mm/s)"
              stroke="#06b6d4"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#06b6d4' }}
              activeDot={{ r: 6, fill: '#38bdf8' }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="temp"
              name="Temperature (°C)"
              stroke="#ef4444"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#ef4444' }}
              activeDot={{ r: 6, fill: '#f43f5e' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
