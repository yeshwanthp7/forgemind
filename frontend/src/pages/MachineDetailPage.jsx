import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Thermometer,
  Gauge,
  Droplets,
  Activity,
  Zap,
  ShieldAlert,
  Upload,
  Sparkles,
  MapPin,
  Clock,
  Wrench,
  CheckCircle2,
  Cpu,
  Layers,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { inventoryApi } from '../api/endpoints';
import { getMachineDetail } from '../data/mockMachineDetails';
import { UploadIncidentModal } from '../components/machine-detail/UploadIncidentModal';
import { AiAnalysisModal } from '../components/machine-detail/AiAnalysisModal';
import { MachineHistoryTables } from '../components/machine-detail/MachineHistoryTables';
import { MachineTimeline } from '../components/machine-detail/MachineTimeline';

export const MachineDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [machine, setMachine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
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

  const buildMachineDetail = (machine) => {
    const machineId = machine.machineId || machine.id || machine._id || id;
    const mockDetail = getMachineDetail(machineId) || getMachineDetail(id) || {};
    const status = mapStatus(machine.status || mockDetail.status);
    const fallbackHealthScore = status === 'optimal' ? 95 : status === 'maintenance' ? 45 : status === 'warning' ? 62 : 24;

    return {
      ...mockDetail,
      mongoId: machine._id || machine.mongoId || null,
      id: machineId,
      name: machine.name || mockDetail.name || machineId,
      type: mockDetail.type || machine.department || 'General Equipment',
      zone: mockDetail.zone || machine.location || machine.department || 'Unassigned',
      status,
      healthScore: mockDetail.healthScore ?? fallbackHealthScore,
      rulPercentage: mockDetail.rulPercentage ?? fallbackHealthScore,
      riskLevel: mockDetail.riskLevel ?? (status === 'optimal' ? 'Nominal P4' : status === 'maintenance' ? 'Warning P2' : 'Critical P1'),
      temperature: mockDetail.temperature ?? (status === 'optimal' ? 68 : status === 'maintenance' ? 92 : 104),
      temperatureBaseline: mockDetail.temperatureBaseline ?? 70,
      pressure: mockDetail.pressure ?? (status === 'optimal' ? 10 : 12.5),
      pressureBaseline: mockDetail.pressureBaseline ?? 10,
      humidity: mockDetail.humidity ?? 45,
      humidityBaseline: mockDetail.humidityBaseline ?? 45,
      vibration: mockDetail.vibration || 'N/A',
      vibrationValue: mockDetail.vibrationValue ?? 0,
      powerConsumption: mockDetail.powerConsumption || 'N/A',
      powerValue: mockDetail.powerValue ?? 0,
      manufacturer: machine.manufacturer || mockDetail.manufacturer || 'Unknown',
      model: mockDetail.model || machine.department || 'Unknown',
      serialNumber: mockDetail.serialNumber || machine.machineId || machine._id || 'N/A',
      installationDate: mockDetail.installationDate || formatDate(machine.createdAt || machine.lastMaintained),
      operatingHours: mockDetail.operatingHours ?? 0,
      image: mockDetail.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      lastMaintenance: formatDate(machine.lastMaintained || mockDetail.lastMaintenance),
      lastMaintenanceDays: getDaysSince(machine.lastMaintained || mockDetail.lastMaintenance),
      nextMaintenance: mockDetail.nextMaintenance || '',
      criticalComponent: mockDetail.criticalComponent || 'General inspection pending',
      maintenanceHistory: mockDetail.maintenanceHistory || [],
      previousIncidents: mockDetail.previousIncidents || [],
      timeline: mockDetail.timeline || [],
    };
  };

  const fetchMachineDetail = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await inventoryApi.getMachines();
      const machines = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
          ? res.data
          : [];
      const matchedMachine = machines.find((item) => item._id === id || item.machineId === id);

      if (matchedMachine) {
        setMachine(buildMachineDetail(matchedMachine));
        return;
      }

      setMachine(buildMachineDetail({ machineId: id }));
    } catch (err) {
      console.warn('Machine Detail Axios fallback:', err);
      setMachine(buildMachineDetail({ machineId: id }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMachineDetail();
  }, [id]);

  const handleIncidentSubmit = (incidentData) => {
    showToast(`Incident "${incidentData.title}" logged and uploaded with ${incidentData.filesCount} file attachments!`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'critical':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            CRITICAL P1 ALARM
          </span>
        );
      case 'warning':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            WARNING STATE
          </span>
        );
      case 'maintenance':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1.5">
            <span className="w-2 h-2 bg-purple-400 rounded-full" />
            IN MAINTENANCE
          </span>
        );
      case 'offline':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            OFFLINE
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            OPTIMAL HEALTH
          </span>
        );
    }
  };

  const getHealthColor = (score) => {
    if (score >= 80) return 'from-emerald-500 to-teal-500 text-emerald-400';
    if (score >= 50) return 'from-amber-500 to-yellow-500 text-amber-400';
    return 'from-rose-500 to-red-600 text-rose-400';
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-6 animate-pulse">
        <div className="w-48 h-8 bg-slate-900 rounded-xl" />
        <div className="h-32 border bg-slate-900 border-slate-800 rounded-2xl" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 h-80 bg-slate-900 rounded-2xl" />
          <div className="lg:col-span-7 h-80 bg-slate-900 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!machine) return null;

  return (
    <div className="pb-12 space-y-6">
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

      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/inventory')}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Back to Machine Inventory</span>
        </button>

        <span className="font-mono text-xs text-slate-500">
          ISO-45001 Node Diagnostic Stream
        </span>
      </div>

      {/* Error Alert with Retry */}
      {error && (
        <div className="flex items-center justify-between gap-4 p-4 text-xs border rounded-2xl bg-rose-950/60 border-rose-500/40 text-rose-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchMachineDetail}
            className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 font-bold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      )}

      {/* Main Hero Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative flex flex-col items-start justify-between gap-6 p-6 overflow-hidden border shadow-2xl rounded-2xl bg-linear-to-r from-slate-900 via-slate-900/95 to-slate-950 border-slate-800 backdrop-blur-xl lg:flex-row lg:items-center"
      >
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            {getStatusBadge(machine.status)}
            <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono text-xs font-bold border border-slate-700">
              ID: {machine.id}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-xs">
              Serial: {machine.serialNumber}
            </span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            {machine.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {machine.zone}
            </span>
            <span>• {machine.type}</span>
            <span>• Manufacturer: {machine.manufacturer}</span>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition hover:scale-[1.02] shadow-lg"
          >
            <Upload className="w-4 h-4 text-rose-400" />
            <span>Upload Incident</span>
          </button>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '5s' }} />
            <span>Analyze with AI</span>
          </button>
        </div>
      </motion.div>

      {/* Main Grid: Left Column Visual + Specs / Right Column 7 Metric Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (4 cols on desktop): Image & Asset Details */}
        <div className="space-y-6 lg:col-span-5">
          {/* Machine Image Card */}
          <div className="p-3 overflow-hidden border shadow-xl rounded-2xl bg-slate-900 border-slate-800 backdrop-blur-xl group">
            <div className="relative w-full h-64 overflow-hidden border sm:h-72 rounded-xl bg-slate-950 border-slate-800">
              <img
                src={machine.image}
                alt={machine.name}
                className="object-cover w-full h-full transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute flex items-end justify-between font-mono text-xs bottom-3 left-3 right-3">
                <div>
                  <span className="text-[10px] text-cyan-400 block font-bold">MODEL & SERIES</span>
                  <span className="text-sm font-bold text-white">{machine.model}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-700 text-[10px]">
                  {machine.operatingHours.toLocaleString()} Operating Hrs
                </span>
              </div>
            </div>
          </div>

          {/* Asset Specs Card */}
          <div className="p-5 space-y-3 border shadow-xl rounded-2xl bg-slate-900 border-slate-800 backdrop-blur-xl">
            <h3 className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider uppercase text-slate-100">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Hardware Asset Specifications</span>
            </h3>
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">CATEGORY</span>
                <span className="font-bold text-slate-200">{machine.type}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">LOCATION ZONE</span>
                <span className="font-bold text-slate-200">{machine.zone}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">MANUFACTURER</span>
                <span className="font-bold text-slate-200">{machine.manufacturer}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">INSTALLATION DATE</span>
                <span className="font-bold text-slate-200">{machine.installationDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols on desktop): Telemetry Metrics Grid */}
        <div className="space-y-6 lg:col-span-7">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-mono text-xs font-bold tracking-widest uppercase text-slate-400">
              Live Sensor Telemetry Matrix
            </h2>
            <span className="text-[11px] text-cyan-400 font-mono">Channel Frequency 10 kHz</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* 1. Health Score Card */}
            <div className="p-4 space-y-2 border shadow-xl rounded-2xl bg-slate-900 border-slate-800 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-slate-400">Health Score</span>
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl font-extrabold text-white">{machine.healthScore}%</span>
                <span className="text-[11px] font-mono text-slate-400">Index</span>
              </div>
              <div className="w-full h-2 overflow-hidden border rounded-full bg-slate-950 border-slate-800">
                <div
                  className={`h-full bg-linear-to-r ${getHealthColor(machine.healthScore)}`}
                  style={{ width: `${machine.healthScore}%` }}
                />
              </div>
            </div>

            {/* 2. Risk Level Card */}
            <div className="p-4 space-y-2 border shadow-xl rounded-2xl bg-slate-900 border-slate-800 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-slate-400">Risk Level</span>
                <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <ShieldAlert className="w-4 h-4" />
                </div>
              </div>
              <div className="pt-1">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold border ${
                  machine.riskLevel.includes('Critical')
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {machine.riskLevel}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono pt-1">RUL: {machine.rulPercentage}% Remaining</p>
            </div>

            {/* 3. Temperature */}
            <div className="p-4 space-y-2 border shadow-xl rounded-2xl bg-slate-900 border-slate-800 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-slate-400">Temperature</span>
                <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <Thermometer className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-extrabold font-mono ${
                  machine.temperature > machine.temperatureBaseline * 1.2 ? 'text-rose-400' : 'text-slate-100'
                }`}>
                  {machine.temperature}°C
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Baseline: {machine.temperatureBaseline}°C</p>
            </div>

            {/* 4. Hydraulic Pressure */}
            <div className="p-4 space-y-2 border shadow-xl rounded-2xl bg-slate-900 border-slate-800 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-slate-400">Pressure</span>
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Gauge className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-2xl font-extrabold text-cyan-300">{machine.pressure} Bar</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Baseline: {machine.pressureBaseline} Bar</p>
            </div>

            {/* 5. Humidity */}
            <div className="p-4 space-y-2 border shadow-xl rounded-2xl bg-slate-900 border-slate-800 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-slate-400">Relative Humidity</span>
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Droplets className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-2xl font-extrabold text-blue-300">{machine.humidity}% RH</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Baseline: {machine.humidityBaseline}%</p>
            </div>

            {/* 6. Vibration Acceleration */}
            <div className="p-4 space-y-2 border shadow-xl rounded-2xl bg-slate-900 border-slate-800 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-slate-400">Vibration FFT</span>
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-2xl font-extrabold text-purple-300">{machine.vibration}</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">ISO Limit: &lt;4.5 mm/s</p>
            </div>

            {/* 7. Power Consumption */}
            <div className="p-4 space-y-2 border shadow-xl sm:col-span-2 lg:col-span-3 rounded-2xl bg-slate-900 border-slate-800 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-slate-400">Electrical Power Consumption Draw</span>
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-2xl font-extrabold text-amber-300">{machine.powerConsumption}</span>
                <span className="font-mono text-xs text-slate-400">Continuous 3-Phase Load</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Tabbed Tables for Maintenance History & Previous Incidents */}
      <MachineHistoryTables
        maintenanceHistory={machine.maintenanceHistory}
        previousIncidents={machine.previousIncidents}
      />

      {/* Section 4: Machine Audit Activity Timeline */}
      <MachineTimeline timeline={machine.timeline} />

      {/* Modals */}
      <UploadIncidentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        machine={machine}
        onSubmitIncident={handleIncidentSubmit}
      />

      <AiAnalysisModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        machine={machine}
      />
    </div>
  );
};
