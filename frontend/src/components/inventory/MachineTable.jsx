import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Thermometer,
  Gauge,
  MapPin,
  Eye,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Wrench
} from 'lucide-react';

export const MachineTable = ({ machines, onInspect }) => {
  const navigate = useNavigate();
  const handleInspect = (machine) => {
    if (onInspect) {
      onInspect(machine);
      return;
    }

    navigate(`/inventory/${machine.id}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40">Critical</span>;
      case 'warning':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">Warning</span>;
      case 'maintenance':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">Maintenance</span>;
      case 'offline':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-800 text-slate-400 border border-slate-700">Offline</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">Optimal</span>;
    }
  };

  const getHealthColor = (score) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/80 text-slate-400 font-mono text-[10px] uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3">Machine ID & Name</th>
              <th className="p-3">Machine Type</th>
              <th className="p-3">Location / Zone</th>
              <th className="p-3">Health Score</th>
              <th className="p-3">Temperature</th>
              <th className="p-3">Pressure</th>
              <th className="p-3">Risk Level</th>
              <th className="p-3">Status</th>
              <th className="p-3">Last Maintenance</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {machines.length === 0 ? (
              <tr>
                <td colSpan={10} className="p-6 text-center text-slate-500 font-mono">
                  No machinery matching specified filters found.
                </td>
              </tr>
            ) : (
              machines.map((machine) => (
                <tr
                  key={machine.id}
                  onClick={() => handleInspect(machine)}
                  className="hover:bg-slate-850/50 transition cursor-pointer group"
                >
                  <td className="p-3">
                    <div className="font-bold text-slate-100 group-hover:text-cyan-300 transition">
                      {machine.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {machine.id} • {machine.manufacturer}
                    </div>
                  </td>
                  <td className="p-3 text-slate-300">{machine.type}</td>
                  <td className="p-3 text-slate-300 font-mono">{machine.zone}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getHealthColor(machine.healthScore)}`}
                          style={{ width: `${machine.healthScore}%` }}
                        />
                      </div>
                      <span className="font-mono text-slate-200 font-bold">{machine.healthScore}%</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono">
                    <span className={machine.temperature > machine.temperatureBaseline * 1.2 ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                      {machine.temperature}°C
                    </span>
                  </td>
                  <td className="p-3 font-mono text-cyan-300 font-semibold">{machine.pressure} Bar</td>
                  <td className="p-3 font-mono text-[11px] text-slate-300">{machine.riskLevel}</td>
                  <td className="p-3">{getStatusBadge(machine.status)}</td>
                  <td className="p-3 font-mono text-slate-400 text-[11px]">{machine.lastMaintenanceDays}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInspect(machine);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 text-[11px] font-semibold border border-slate-700 transition flex items-center gap-1 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
