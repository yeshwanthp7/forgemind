import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SafetyHeader } from '../../components/safety/SafetyHeader';
import { PpeViolationsCard } from '../../components/safety/PpeViolationsCard';
import { EnvironmentalHazardsGrid } from '../../components/safety/EnvironmentalHazardsGrid';
import { LiveHazardsFeed } from '../../components/safety/LiveHazardsFeed';
import { SafetyAiAnalysisSummary } from '../../components/safety/SafetyAiAnalysisSummary';
import { EmergencyAlertsBar } from '../../components/safety/EmergencyAlertsBar';

export const SafetyDashboard = () => {
  const { user } = useAuth();
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Mock PPE Violations Data
  const [ppeViolations, setPpeViolations] = useState([
    { id: 'PPE-101', workerId: 'EMP-401', workerName: 'David K.', location: 'Zone B - Assembly Rig 02', missingPpe: 'HARD HAT & SAFETY GOGGLES', timestamp: '5m ago' },
    { id: 'PPE-102', workerId: 'EMP-312', workerName: 'Sarah L.', location: 'Zone C - Chemical Prep', missingPpe: 'THERMAL RESISTANT GLOVES', timestamp: '18m ago' },
  ]);

  // Mock Fire & Chemical Environmental Hazards Data
  const fireAlerts = {
    temperature: 184.2,
    baseline: 75.0,
    location: 'Zone A — Stamping Press HP-9042 Pump Housing',
    recommendation: 'Thermal IR camera detected 184.2°C hotspot. Lockout hydraulic lines immediately.'
  };

  const chemicalAlerts = {
    ppm: 42,
    gasType: 'H2S Ammonia / Volatile Gas',
    location: 'Zone C — Chemical Wash Basin 02',
    recommendation: 'Elevated gas concentration detected. Activate exhaust ventilation system.'
  };

  // Mock Live Hazards Feed Data
  const [hazards, setHazards] = useState([
    { id: 'HAZ-901', location: 'Zone A (HP-9042)', title: 'Hydraulic Oil Leak & Bearing Thermal Hotspot 184.2°C', priority: 'Critical P1', status: 'Pending Review' },
    { id: 'HAZ-902', location: 'Zone C (Wash Basin)', title: 'Chemical Ammonia Vapor Spike 42 PPM', priority: 'High P2', status: 'Pending Review' },
    { id: 'HAZ-903', location: 'Zone B (Assembly)', title: 'Acoustic Vibration FFT Frequency Drift 14.2 Hz', priority: 'Nominal P4', status: 'Pending Review' },
  ]);

  // Mock AI Analysis Summary
  const aiAnalysisData = {
    confidenceScore: 98.4,
    detectedHazard: 'Catastrophic Hydraulic Oil Hotspot 184.2°C & Bearing Fault 12.4 Hz',
    rootCause: 'Frictional degradation of drive bearing outer race coupled with 18.4 Bar hydraulic pressure surge.',
    recommendedAction: 'Execute ISO-45001 LOTO Lockout on HP-9042, isolate 3-phase power line, and replace SKF-6210 drive bearing.'
  };

  const handleResolvePpe = (id) => {
    setPpeViolations((prev) => prev.filter((v) => v.id !== id));
    showToast('PPE Safety Warning dispatched to worker handset & logged in ISO vault.');
  };

  const handleApproveIncident = (id) => {
    setHazards((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status: 'Approved' } : h))
    );
    showToast(`Hazard ${id} approved & dispatched to maintenance team as Emergency Work Order Ticket!`);
  };

  const handlePriorityChange = (id, newPriority) => {
    setHazards((prev) =>
      prev.map((h) => (h.id === id ? { ...h, priority: newPriority } : h))
    );
    showToast(`Hazard ${id} priority rating assigned to "${newPriority}"`);
  };

  const handleExportPdf = () => {
    showToast('Executive ISO-45001 Safety & EHS Compliance Report PDF exported to downloads folder.');
  };

  const handleEmergencyEvacuation = () => {
    showToast('🚨 EMERGENCY PLANT EVACUATION ALARM SOUNDED!');
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
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-200 text-xs font-mono font-semibold shadow-2xl flex items-center gap-2.5 backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Safety Officer EHS Console Header */}
      <SafetyHeader
        user={user}
        onExportPdf={handleExportPdf}
        onEmergencyEvacuation={handleEmergencyEvacuation}
      />

      {/* Plant-Wide Emergency Alerts Banner */}
      <EmergencyAlertsBar
        activeAlerts={hazards}
        onTriggerEvacuation={handleEmergencyEvacuation}
      />

      {/* Fire Detection & Chemical Gas Leak Telemetry Grid */}
      <EnvironmentalHazardsGrid
        fireAlerts={fireAlerts}
        chemicalAlerts={chemicalAlerts}
      />

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Live Hazards Feed & Incident Approval Matrix */}
        <div className="lg:col-span-7 space-y-6">
          <LiveHazardsFeed
            hazards={hazards}
            onApproveIncident={handleApproveIncident}
            onPriorityChange={handlePriorityChange}
          />
        </div>

        {/* Right Column (5 cols): PPE Violations & AI Hazard Analysis */}
        <div className="lg:col-span-5 space-y-6">
          {/* Worker PPE Compliance Violations (AI Vision) */}
          <PpeViolationsCard
            violations={ppeViolations}
            onResolve={handleResolvePpe}
          />

          {/* Sentinel AI Computer Vision Summary */}
          <SafetyAiAnalysisSummary analysis={aiAnalysisData} />
        </div>
      </div>
    </div>
  );
};
