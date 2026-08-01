import React, { useState } from 'react';
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  FileText,
  DollarSign
} from 'lucide-react';

export const MachineHistoryTables = ({ maintenanceHistory, previousIncidents }) => {
  const [activeTab, setActiveTab] = useState('maintenance'); // 'maintenance' | 'incidents'

  const getSeverityBadge = (severity) => {
    if (severity.includes('Critical')) {
      return <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40">Critical P1</span>;
    }
    if (severity.includes('High')) {
      return <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">High P2</span>;
    }
    if (severity.includes('Medium')) {
      return <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">Medium P3</span>;
    }
    return <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">Nominal P4</span>;
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
      {/* Tab Switcher Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'maintenance'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Wrench className="w-4 h-4 text-amber-400" />
            <span>Maintenance History</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300">
              {maintenanceHistory.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('incidents')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'incidents'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Previous Incidents Log</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300">
              {previousIncidents.length}
            </span>
          </button>
        </div>

        <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
          ISO-45001 Verified Audit Ledger
        </span>
      </div>

      {/* Tab 1: Maintenance History */}
      {activeTab === 'maintenance' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Work Order ID & Date</th>
                <th className="p-3">Service Type</th>
                <th className="p-3">Assigned Technician</th>
                <th className="p-3">Replaced Component / Parts</th>
                <th className="p-3">Cost</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {maintenanceHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-850/50 transition">
                  <td className="p-3 font-mono">
                    <span className="font-bold text-cyan-400">{item.id}</span>
                    <div className="text-[10px] text-slate-400">{item.date}</div>
                  </td>
                  <td className="p-3 font-semibold text-slate-200">{item.serviceType}</td>
                  <td className="p-3 text-slate-300">{item.technician}</td>
                  <td className="p-3 text-slate-400 font-mono text-[11px]">{item.partsReplaced}</td>
                  <td className="p-3 font-mono text-emerald-400 font-bold">{item.cost}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Previous Incidents Log */}
      {activeTab === 'incidents' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Incident ID & Date</th>
                <th className="p-3">Headline Title</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Root Cause Diagnosis</th>
                <th className="p-3">Resolved By</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {previousIncidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-slate-850/50 transition">
                  <td className="p-3 font-mono">
                    <span className="font-bold text-rose-400">{incident.id}</span>
                    <div className="text-[10px] text-slate-400">{incident.date}</div>
                  </td>
                  <td className="p-3 font-bold text-slate-200">{incident.title}</td>
                  <td className="p-3">{getSeverityBadge(incident.severity)}</td>
                  <td className="p-3 text-slate-300 text-[11px]">{incident.rootCause}</td>
                  <td className="p-3 text-slate-400">{incident.resolvedBy}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      incident.status === 'Investigating'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {incident.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
