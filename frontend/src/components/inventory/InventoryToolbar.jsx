import React from 'react';
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  RotateCcw,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Wrench,
  PowerOff
} from 'lucide-react';
import { MACHINE_TYPES, MACHINE_ZONES, RISK_LEVELS } from '../../data/mockInventoryData';

export const InventoryToolbar = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedZone,
  onZoneChange,
  selectedRisk,
  onRiskChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  onResetFilters,
  statusCounts
}) => {
  const chips = [
    { id: 'all', label: 'All Machinery', count: statusCounts.all, icon: SlidersHorizontal, color: 'text-slate-300 bg-slate-800/80 border-slate-700' },
    { id: 'optimal', label: 'Operational', count: statusCounts.optimal, icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { id: 'warning', label: 'Warning', count: statusCounts.warning, icon: AlertTriangle, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { id: 'critical', label: 'Critical P1', count: statusCounts.critical, icon: ShieldAlert, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
    { id: 'maintenance', label: 'Maintenance', count: statusCounts.maintenance, icon: Wrench, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  ];

  return (
    <div className="space-y-4">
      {/* Quick Status Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
        {chips.map((chip) => {
          const Icon = chip.icon;
          const isActive = statusFilter === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => onStatusFilterChange(chip.id)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition shrink-0 ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)] font-bold'
                  : 'bg-slate-900/80 hover:bg-slate-850 text-slate-400 border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{chip.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${chip.color}`}>
                {chip.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Filter & Control Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        {/* Search & Filter Inputs */}
        <div className="flex flex-wrap items-center gap-3 grow">
          {/* Search Input */}
          <div className="relative min-w-[220px] grow sm:grow-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by Machine Name, ID, or Model..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/60 transition"
            />
          </div>

          {/* Machine Type Filter */}
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/60"
            >
              {MACHINE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Location / Zone Filter */}
          <div className="relative">
            <select
              value={selectedZone}
              onChange={(e) => onZoneChange(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/60"
            >
              {MACHINE_ZONES.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>

          {/* Risk Level Filter */}
          <div className="relative">
            <select
              value={selectedRisk}
              onChange={(e) => onRiskChange(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/60"
            >
              {RISK_LEVELS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-cyan-400 font-mono focus:outline-none focus:border-cyan-500/60"
            >
              <option value="health_asc">Sort: Lowest Health</option>
              <option value="health_desc">Sort: Highest Health</option>
              <option value="temp_desc">Sort: Highest Temp</option>
              <option value="pressure_desc">Sort: Highest Pressure</option>
              <option value="name_asc">Sort: Name (A-Z)</option>
            </select>
          </div>

          {/* Reset Filters */}
          <button
            onClick={onResetFilters}
            className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition"
            title="Reset All Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 shrink-0">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 rounded-lg text-xs transition flex items-center gap-1.5 ${
              viewMode === 'grid'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Grid Cards View"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Cards</span>
          </button>

          <button
            onClick={() => onViewModeChange('table')}
            className={`p-1.5 rounded-lg text-xs transition flex items-center gap-1.5 ${
              viewMode === 'table'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="List Table View"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Table</span>
          </button>
        </div>
      </div>
    </div>
  );
};
