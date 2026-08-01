import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  TrendingUp,
  PieChart as PieIcon,
  Activity,
  Wrench,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

// Custom Dark Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-slate-800 p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs font-mono">
        <p className="font-bold text-slate-200 mb-1.5 border-b border-slate-800 pb-1">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-bold text-slate-100">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const DashboardCharts = ({
  incidentTrend,
  riskDistribution,
  machineHealthByZone,
  monthlyMaintenance
}) => {
  const [trendTimeframe, setTrendTimeframe] = useState('7d');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* CHART 1: Incident Trend (Area Chart) */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Incident Frequency & Severity Trend</h3>
              <p className="text-[11px] text-slate-400">Daily plant hazard tracking across severity levels</p>
            </div>
          </div>

          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-[11px] font-mono">
            <button
              onClick={() => setTrendTimeframe('7d')}
              className={`px-2.5 py-1 rounded-md transition ${
                trendTimeframe === '7d'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTrendTimeframe('30d')}
              className={`px-2.5 py-1 rounded-md transition ${
                trendTimeframe === '30d'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              30 Days
            </button>
          </div>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={incidentTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorWarning" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMinor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="critical"
                name="Critical (P1)"
                stroke="#f43f5e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCritical)"
              />
              <Area
                type="monotone"
                dataKey="warning"
                name="High Risk (P2)"
                stroke="#f97316"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorWarning)"
              />
              <Area
                type="monotone"
                dataKey="minor"
                name="Minor / Notice"
                stroke="#06b6d4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorMinor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-around text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-slate-400">Critical P1</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-slate-400">High Risk P2</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="text-slate-400">Minor Notice</span>
          </div>
        </div>
      </div>

      {/* CHART 2: Risk Distribution (Donut Pie Chart) */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <PieIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Factory Risk Rating Breakdown</h3>
              <p className="text-[11px] text-slate-400">Proportional classification of current alerts</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-purple-300">
            Real-time Matrix
          </span>
        </div>

        <div className="h-64 w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#090d16" strokeWidth={3} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Donut Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-extrabold text-white font-mono">17</span>
            <span className="text-[10px] text-slate-400 font-mono uppercase">Total Hazards</span>
          </div>
        </div>

        <div className="mt-2 pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
          {riskDistribution.map((item, idx) => (
            <div key={idx} className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/60 flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-400 truncate text-[10px]">{item.name}</span>
              </div>
              <span className="font-bold text-slate-100 font-mono text-sm">{item.value} ({item.percentage})</span>
            </div>
          ))}
        </div>
      </div>

      {/* CHART 3: Machine Health & RUL Index by Zone (Bar Chart) */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Machine Health & RUL Index by Zone</h3>
              <p className="text-[11px] text-slate-400">Remaining Useful Life (RUL %) and Health Index per Zone</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            5 Zones Active
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={machineHealthByZone} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
              <XAxis dataKey="zone" stroke="#64748b" fontSize={10} tickLine={false} tickFormatter={(v) => v.split(' - ')[0]} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="health" name="Health Index (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="rul" name="RUL Score (%)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
            <span className="text-slate-400">Health Index (%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-cyan-500" />
            <span className="text-slate-400">Remaining Useful Life (RUL %)</span>
          </div>
        </div>
      </div>

      {/* CHART 4: Monthly Maintenance & Downtime (Composed Chart) */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Monthly Maintenance & Unscheduled Downtime</h3>
              <p className="text-[11px] text-slate-400">Scheduled Work Orders vs Emergency Repair Hours</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            YTD Comparison
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthlyMaintenance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#eab308" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="scheduled" name="Scheduled Work Orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="unscheduled" name="Emergency Repairs" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="downtimeHours" name="Downtime Hours" stroke="#eab308" strokeWidth={3} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-around text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-blue-500" />
            <span className="text-slate-400">Scheduled Orders</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-rose-500" />
            <span className="text-slate-400">Emergency Repairs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-500" />
            <span className="text-slate-400">Downtime Hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};
