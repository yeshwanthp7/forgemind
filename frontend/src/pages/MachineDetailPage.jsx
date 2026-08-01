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

  const fetchMachineDetail = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await inventoryApi.getMachineById(id || 'HP-9042');
      setMachine(res.data || getMachineDetail(id || 'HP-9042'));
    } catch (err) {
      console.warn('Machine Detail Axios fallback:', err);
      setMachine(getMachineDetail(id || 'HP-9042'));
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
            <span className="w-2 h-2 rounded-full bg-purple-400" />
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
      <div className="space-y-6 animate-pulse p-4">
        <div className="h-8 w-48 bg-slate-900 rounded-xl" />
        <div className="h-32 bg-slate-900 border border-slate-800 rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 h-80 bg-slate-900 rounded-2xl" />
          <div className="lg:col-span-7 h-80 bg-slate-900 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!machine) return null;

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

      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/inventory')}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Back to Machine Inventory</span>
        </button>

        <span className="text-xs font-mono text-slate-500">
          ISO-45001 Node Diagnostic Stream
        </span>
      </div>

      {/* Error Alert with Retry */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center justify-between gap-4">
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
        className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="space-y-2 max-w-3xl relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            {getStatusBadge(machine.status)}
            <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono text-xs font-bold border border-slate-700">
              ID: {machine.id}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-xs">
              Serial: {machine.serialNumber}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {machine.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {machine.zone}
            </span>
            <span>• {machine.type}</span>
            <span>• Manufacturer: {machine.manufacturer}</span>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition hover:scale-[1.02] shadow-lg"
          >
            <Upload className="w-4 h-4 text-rose-400" />
            <span>Upload Incident</span>
          </button>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '5s' }} />
            <span>Analyze with AI</span>
          </button>
        </div>
      </motion.div>

      {/* Main Grid: Left Column Visual + Specs / Right Column 7 Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (4 cols on desktop): Image & Asset Details */}
        <div className="lg:col-span-5 space-y-6">
          {/* Machine Image Card */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 backdrop-blur-xl shadow-xl overflow-hidden group">
            <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={machine.image}
                alt={machine.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-xs font-mono">
                <div>
                  <span className="text-[10px] text-cyan-400 block font-bold">MODEL & SERIES</span>
                  <span className="font-bold text-white text-sm">{machine.model}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-700 text-[10px]">
                  {machine.operatingHours.toLocaleString()} Operating Hrs
                </span>
              </div>
            </div>
          </div>

          {/* Asset Specs Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-slate-100 font-mono uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Hardware Asset Specifications</span>
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
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
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              Live Sensor Telemetry Matrix
            </h2>
            <span className="text-[11px] text-cyan-400 font-mono">Channel Frequency 10 kHz</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Health Score Card */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-slate-400">Health Score</span>
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono">{machine.healthScore}%</span>
                <span className="text-[11px] font-mono text-slate-400">Index</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full bg-gradient-to-r ${getHealthColor(machine.healthScore)}`}
                  style={{ width: `${machine.healthScore}%` }}
                />
              </div>
            </div>

            {/* 2. Risk Level Card */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-slate-400">Risk Level</span>
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
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-slate-400">Temperature</span>
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
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-slate-400">Pressure</span>
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Gauge className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-cyan-300 font-mono">{machine.pressure} Bar</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Baseline: {machine.pressureBaseline} Bar</p>
            </div>

            {/* 5. Humidity */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-slate-400">Relative Humidity</span>
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Droplets className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-blue-300 font-mono">{machine.humidity}% RH</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Baseline: {machine.humidityBaseline}%</p>
            </div>

            {/* 6. Vibration Acceleration */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-slate-400">Vibration FFT</span>
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-purple-300 font-mono">{machine.vibration}</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">ISO Limit: &lt;4.5 mm/s</p>
            </div>

            {/* 7. Power Consumption */}
            <div className="sm:col-span-2 lg:col-span-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-slate-400">Electrical Power Consumption Draw</span>
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-amber-300 font-mono">{machine.powerConsumption}</span>
                <span className="text-xs font-mono text-slate-400">Continuous 3-Phase Load</span>
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
