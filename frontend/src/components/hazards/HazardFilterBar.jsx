import React from 'react';
import { Search, Filter, AlertTriangle, ShieldCheck, Video } from 'lucide-react';

export const HazardFilterBar = ({
  searchQuery,
  setSearchQuery,
  severityFilter,
  setSeverityFilter,
  zoneFilter,
  setZoneFilter
}) => {
  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        <input
          type="text"
          placeholder="Search by hazard name, camera, or zone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        {/* Severity Filter Pills */}
        <div className="flex p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs">
          {['all', 'critical', 'warning', 'resolved'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 rounded font-semibold capitalize transition ${
                severityFilter === sev
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Zone Selector */}
        <select
          value={zoneFilter}
          onChange={(e) => setZoneFilter(e.target.value)}
          className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
        >
          <option value="all">All Factory Zones</option>
          <option value="Zone A">Zone A - Stamping</option>
          <option value="Zone B">Zone B - Hydraulics</option>
          <option value="Zone C">Zone C - Robotics</option>
          <option value="Zone D">Zone D - Chemical Boiler</option>
        </select>
      </div>
    </div>
  );
};
