import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server,
  Plus,
  Download,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Cpu
} from 'lucide-react';
import { inventoryApi } from '../api/endpoints';
import { mockInventoryMachines } from '../data/mockInventoryData';
import { mockMachineDetailsMap } from '../data/mockMachineDetails';
import { InventoryToolbar } from '../components/inventory/InventoryToolbar';
import { MachineCard } from '../components/inventory/MachineCard';
import { MachineTable } from '../components/inventory/MachineTable';
import { InventoryPagination } from '../components/inventory/InventoryPagination';
import { MachineDetailModal } from '../components/inventory/MachineDetailModal';

export const MachineInventoryPage = () => {
  const [machinesList, setMachinesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter and view state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [selectedRisk, setSelectedRisk] = useState('All Risk Levels');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('health_asc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Modal and toast state
  const [inspectingMachine, setInspectingMachine] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const formatDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toISOString().slice(0, 10);
  };

  const getDaysSince = (value) => {
    if (!value) return 'Recently';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);

    const diffMs = Date.now() - date.getTime();
    const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    return diffDays === 0 ? 'Today' : `${diffDays} days ago`;
  };

  const mapStatus = (status) => {
    if (status === 'active') return 'optimal';
    if (status === 'inactive') return 'offline';
    if (status === 'maintenance') return 'maintenance';
    return status || 'offline';
  };

  const buildUiMachine = (machine) => {
    const machineId = machine.machineId || machine.id || machine._id;
    const mockMachine = mockInventoryMachines.find((item) => item.id === machineId) || mockMachineDetailsMap[machineId] || {};
    const status = mapStatus(machine.status || mockMachine.status);
    const hasMockDetail = Boolean(mockMachineDetailsMap[machineId]);
    const fallbackHealthScore = status === 'optimal' ? 90 : status === 'maintenance' ? 48 : status === 'warning' ? 68 : 25;

    return {
      ...mockMachine,
      mongoId: machine._id || machine.mongoId || null,
      id: machineId,
      name: machine.name || mockMachine.name || machineId,
      type: mockMachine.type || machine.department || 'General Equipment',
      zone: mockMachine.zone || machine.location || machine.department || 'Unassigned',
      status,
      healthScore: mockMachine.healthScore ?? fallbackHealthScore,
      temperature: mockMachine.temperature ?? (status === 'optimal' ? 68 : status === 'maintenance' ? 92 : 104),
      temperatureBaseline: mockMachine.temperatureBaseline ?? 70,
      pressure: mockMachine.pressure ?? (status === 'optimal' ? 10 : 12.5),
      pressureBaseline: mockMachine.pressureBaseline ?? 10,
      riskLevel: mockMachine.riskLevel ?? (status === 'optimal' ? 'Nominal P4' : status === 'maintenance' ? 'Warning P2' : 'Critical P1'),
      lastMaintenance: formatDate(machine.lastMaintained || mockMachine.lastMaintenance),
      lastMaintenanceDays: getDaysSince(machine.lastMaintained || mockMachine.lastMaintenance),
      nextMaintenance: mockMachine.nextMaintenance || '',
      operatingHours: mockMachine.operatingHours ?? 0,
      manufacturer: machine.manufacturer || mockMachine.manufacturer || 'Unknown',
      model: mockMachine.model || machine.department || 'Unknown',
      serialNumber: mockMachine.serialNumber || machine.machineId || machine._id || 'N/A',
      criticalComponent: mockMachine.criticalComponent || 'General inspection pending',
      vibration: mockMachine.vibration || 'N/A',
      installationDate: mockMachine.installationDate || formatDate(machine.createdAt || machine.lastMaintained) || '',
      image: hasMockDetail ? mockMachine.image : mockMachine.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      rulPercentage: mockMachine.rulPercentage ?? fallbackHealthScore,
      humidity: mockMachine.humidity ?? 45,
      humidityBaseline: mockMachine.humidityBaseline ?? 45,
      powerConsumption: mockMachine.powerConsumption ?? 'N/A',
      powerValue: mockMachine.powerValue ?? 0,
      maintenanceHistory: mockMachine.maintenanceHistory || [],
      previousIncidents: mockMachine.previousIncidents || [],
      timeline: mockMachine.timeline || [],
    };
  };

  const fetchMachines = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await inventoryApi.getMachines();
      const rawMachines = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
          ? res.data
          : [];

      setMachinesList(rawMachines.map(buildUiMachine));
    } catch (err) {
      console.warn('Inventory Axios call fallback:', err);
      setMachinesList(mockInventoryMachines.map(buildUiMachine));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  // Quick Status Counts
  const statusCounts = useMemo(() => {
    return {
      all: machinesList.length,
      optimal: machinesList.filter((m) => m.status === 'optimal').length,
      warning: machinesList.filter((m) => m.status === 'warning').length,
      critical: machinesList.filter((m) => m.status === 'critical').length,
      maintenance: machinesList.filter((m) => m.status === 'maintenance' || m.status === 'offline').length,
    };
  }, [machinesList]);

  // Filtered and sorted machines list
  const filteredMachines = useMemo(() => {
    let result = machinesList.filter((machine) => {
      // Search Query Filter
      const matchesSearch =
        machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.model.toLowerCase().includes(searchQuery.toLowerCase());

      // Type Filter
      const matchesType = selectedType === 'All Types' || machine.type === selectedType;

      // Zone Filter
      const matchesZone = selectedZone === 'All Zones' || machine.zone === selectedZone;

      // Risk Filter
      const matchesRisk = selectedRisk === 'All Risk Levels' || machine.riskLevel === selectedRisk;

      // Status Chip Filter
      let matchesStatus = true;
      if (statusFilter === 'optimal') matchesStatus = machine.status === 'optimal';
      else if (statusFilter === 'warning') matchesStatus = machine.status === 'warning';
      else if (statusFilter === 'critical') matchesStatus = machine.status === 'critical';
      else if (statusFilter === 'maintenance') matchesStatus = machine.status === 'maintenance' || machine.status === 'offline';

      return matchesSearch && matchesType && matchesZone && matchesRisk && matchesStatus;
    });

    // Sorting Logic
    return result.sort((a, b) => {
      if (sortBy === 'health_asc') return a.healthScore - b.healthScore;
      if (sortBy === 'health_desc') return b.healthScore - a.healthScore;
      if (sortBy === 'temp_desc') return b.temperature - a.temperature;
      if (sortBy === 'pressure_desc') return b.pressure - a.pressure;
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [machinesList, searchQuery, selectedType, selectedZone, selectedRisk, statusFilter, sortBy]);

  // Paginated Slice
  const totalPages = Math.ceil(filteredMachines.length / pageSize) || 1;
  const paginatedMachines = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredMachines.slice(start, start + pageSize);
  }, [filteredMachines, currentPage, pageSize]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('All Types');
    setSelectedZone('All Zones');
    setSelectedRisk('All Risk Levels');
    setStatusFilter('all');
    setSortBy('health_asc');
    setCurrentPage(1);
  };

  const handleDispatch = (machine) => {
    showToast(`Work Order dispatched for ${machine.name} (${machine.id}) to Zone Team`);
  };

  const promptMachinePayload = (machine = null) => {
    const machineId = window.prompt('Machine ID', machine?.id || '')?.trim();
    if (!machineId) return null;

    const name = window.prompt('Machine Name', machine?.name || '')?.trim();
    if (!name) return null;

    const location = window.prompt('Location / Zone', machine?.zone || '')?.trim();
    if (!location) return null;

    const department = window.prompt('Department / Type', machine?.type || '')?.trim();
    if (!department) return null;

    const manufacturer = window.prompt('Manufacturer', machine?.manufacturer || '')?.trim() || '';
    const statusInput = window.prompt('Status (active, inactive, maintenance)', machine?.status === 'optimal' ? 'active' : machine?.status || 'inactive')?.trim() || 'inactive';
    const lastMaintained = window.prompt('Last Maintained (YYYY-MM-DD)', machine?.lastMaintenance || formatDate(new Date()))?.trim() || formatDate(new Date());

    return {
      machineId,
      name,
      location,
      department,
      manufacturer,
      status: statusInput,
      lastMaintained,
    };
  };

  const handleCreateMachine = async () => {
    const payload = promptMachinePayload();
    if (!payload) return;

    try {
      await inventoryApi.createMachine(payload);
      showToast(`Machine ${payload.machineId} created successfully`);
      await fetchMachines();
    } catch (err) {
      console.error('Create machine failed:', err);
      showToast('Failed to create machine');
    }
  };

  const handleEditMachine = async (machine) => {
    const payload = promptMachinePayload(machine);
    if (!payload) return;

    if (!machine.mongoId) {
      showToast('Missing backend machine id for update');
      return;
    }

    try {
      await inventoryApi.updateMachineById(machine.mongoId, payload);
      showToast(`Machine ${payload.machineId} updated successfully`);
      await fetchMachines();
      setInspectingMachine(null);
    } catch (err) {
      console.error('Update machine failed:', err);
      showToast('Failed to update machine');
    }
  };

  const handleDeleteMachine = async (machine) => {
    if (!machine.mongoId) {
      showToast('Missing backend machine id for delete');
      return;
    }

    const confirmed = window.confirm(`Delete machine ${machine.name} (${machine.id})?`);
    if (!confirmed) return;

    try {
      await inventoryApi.deleteMachineById(machine.mongoId);
      showToast(`Machine ${machine.id} deleted successfully`);
      setInspectingMachine(null);
      await fetchMachines();
    } catch (err) {
      console.error('Delete machine failed:', err);
      showToast('Failed to delete machine');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-xs font-semibold shadow-2xl flex items-center gap-2.5 backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-cyan-950/40 border border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-3xl relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              Machine & Hardware Inventory Hub
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[11px] font-mono">
              {filteredMachines.length} Machinery Tracked
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Factory Equipment Surveillance & Health Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Monitor asset health scores, thermal thresholds, hydraulic pressures, and maintenance schedules across all production zones.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <button
            onClick={() => showToast('Full Inventory Register exported as CSV')}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export Inventory</span>
          </button>
          <button
            onClick={handleCreateMachine}
            className="px-3.5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Register Machine</span>
          </button>
        </div>
      </div>

      {/* Toolbar (Search, Status Chips, Filters, View Switcher) */}
      <InventoryToolbar
        searchQuery={searchQuery}
        onSearchChange={(q) => { setSearchQuery(q); setCurrentPage(1); }}
        selectedType={selectedType}
        onTypeChange={(t) => { setSelectedType(t); setCurrentPage(1); }}
        selectedZone={selectedZone}
        onZoneChange={(z) => { setSelectedZone(z); setCurrentPage(1); }}
        selectedRisk={selectedRisk}
        onRiskChange={(r) => { setSelectedRisk(r); setCurrentPage(1); }}
        statusFilter={statusFilter}
        onStatusFilterChange={(s) => { setStatusFilter(s); setCurrentPage(1); }}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onResetFilters={handleResetFilters}
        statusCounts={statusCounts}
      />

      {/* Error Alert with Retry */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchMachines}
            className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 font-bold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      )}

      {/* View Content (Cards View vs Table View) */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-56 rounded-2xl bg-slate-900/80 border border-slate-800" />
          ))}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedMachines.length === 0 ? (
            <div className="col-span-full p-12 text-center bg-slate-900/50 border border-slate-800 rounded-2xl">
              <Cpu className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-300">No Machinery Matches Criteria</h3>
              <p className="text-xs text-slate-500 mt-1">Try clearing filters or broadening search parameters.</p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            paginatedMachines.map((machine) => (
              <MachineCard
                key={machine.id}
                machine={machine}
                onInspect={setInspectingMachine}
              />
            ))
          )}
        </div>
      ) : (
        <MachineTable
          machines={paginatedMachines}
          onInspect={setInspectingMachine}
        />
      )}

      {/* Pagination Footer */}
      <InventoryPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredMachines.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={(sz) => { setPageSize(sz); setCurrentPage(1); }}
      />

      {/* Machine Detail Modal */}
      <MachineDetailModal
        machine={inspectingMachine}
        onClose={() => setInspectingMachine(null)}
        onDispatch={handleDispatch}
        onEdit={handleEditMachine}
        onDelete={handleDeleteMachine}
      />
    </div>
  );
};
