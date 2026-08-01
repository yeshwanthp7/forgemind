import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Shield,
  X,
  UserCheck
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const RecentIncidentsTable = ({ incidents }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedIncident, setSelectedIncident] = useState(null);

  const filteredIncidents = incidents.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.machineId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.zone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || item.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">Critical P1</span>;
      case 'High':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">High P2</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">Medium P3</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">Nominal</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Investigating':
        return <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-semibold">Investigating</span>;
      case 'In Progress':
        return <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-semibold">In Progress</span>;
      case 'Resolved':
        return <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-semibold">Resolved</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono font-semibold">Pending</span>;
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md hover:border-slate-700 transition duration-300">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>Recent Factory Incidents</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 font-mono text-[10px]">
              {filteredIncidents.length} Records
            </span>
          </h3>
          <p className="text-xs text-slate-400">Live surveillance log of machine alarms & operator dispatches</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search bar */}
          <div className="relative grow sm:grow-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search incidents or machine ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-56 bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/40 font-mono transition"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-mono">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-transparent text-slate-300 focus:outline-none text-xs font-mono"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical (P1)</option>
              <option value="High">High (P2)</option>
              <option value="Medium">Medium (P3)</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/80 text-slate-400 font-mono text-[10px] uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3">Incident Title & ID</th>
              <th className="p-3">Machine & Zone</th>
              <th className="p-3">Severity</th>
              <th className="p-3">Status</th>
              <th className="p-3">Operator</th>
              <th className="p-3">Timestamp</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {filteredIncidents.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-slate-500 font-mono">
                  No incidents matching criteria found.
                </td>
              </tr>
            ) : (
              filteredIncidents.map((incident) => (
                <tr
                  key={incident.id}
                  className="hover:bg-slate-950/60 transition cursor-pointer group"
                  onClick={() => setSelectedIncident(incident)}
                >
                  <td className="p-3">
                    <div className="font-bold text-slate-100 group-hover:text-cyan-300 transition">
                      {incident.title}
                    </div>
                    <div className="text-[10px] text-cyan-400 font-mono font-bold">{incident.id}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-200">{incident.machineName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{incident.machineId} • {incident.zone}</div>
                  </td>
                  <td className="p-3">{getPriorityBadge(incident.priority)}</td>
                  <td className="p-3">{getStatusBadge(incident.status)}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={incident.avatar}
                        alt={incident.operator}
                        className="w-5 h-5 rounded-full border border-slate-700 object-cover"
                      />
                      <span className="text-slate-300 text-[11px] font-mono">{incident.operator}</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-slate-400 text-[11px]">{incident.timestamp}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIncident(incident);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 text-[11px] font-semibold font-mono border border-slate-700 transition flex items-center gap-1 ml-auto shadow-md"
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

      {/* Incident Detail Modal */}
      <AnimatePresence>
        {selectedIncident && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIncident(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{selectedIncident.title}</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedIncident.id} • {selectedIncident.timestamp}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  aria-label="Close Incident Details Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 my-4 text-xs font-mono">
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div>
                    <span className="text-slate-400 block text-[10px]">TARGET ASSET</span>
                    <span className="font-bold text-slate-200 text-xs">{selectedIncident.machineName} ({selectedIncident.machineId})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">PRODUCTION ZONE</span>
                    <span className="font-bold text-slate-200 text-xs">{selectedIncident.zone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">SEVERITY RATING</span>
                    <div className="mt-0.5">{getPriorityBadge(selectedIncident.priority)}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">ASSIGNED OPERATOR</span>
                    <span className="font-bold text-slate-200 text-xs">{selectedIncident.operator}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                    Telemetry Acoustic Waveform Diagnostic
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Sensors detected 12.4 Hz harmonic distortion exceeding upper control limit (UCL = 9.8 Hz). Automated lockout protocol triggered.
                  </p>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedIncident(null);
                    alert(`Dispatched maintenance team to ${selectedIncident.machineId}`);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
                >
                  Dispatch Field Engineer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
