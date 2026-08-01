import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertOctagon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { WorkerHeader } from '../../components/worker/WorkerHeader';
import { AssignedMachinesCard } from '../../components/worker/AssignedMachinesCard';
import { MySubmittedIncidents } from '../../components/worker/MySubmittedIncidents';
import { MyTicketsList } from '../../components/worker/MyTicketsList';
import { RecentWorkerAiAnalysis } from '../../components/worker/RecentWorkerAiAnalysis';
import { WorkerNotifications } from '../../components/worker/WorkerNotifications';
import { QuickReportModal } from '../../components/worker/QuickReportModal';

export const WorkerDashboard = () => {
  const { user } = useAuth();

  const [isQuickReportOpen, setIsQuickReportOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Mock Assigned Machines Data
  const assignedMachines = [
    { id: 'HP-9042', name: 'Heavy Hydraulic Stamping Press 04', type: 'Stamping Press', zone: 'Zone A - Stamping', healthScore: 18, temperature: 184.2, pressure: 18.4 },
    { id: 'CNC-4081', name: 'Precision 5-Axis Milling Rig', type: 'CNC Milling', zone: 'Zone A - Milling', healthScore: 94, temperature: 48.5, pressure: 6.2 },
    { id: 'SB-109', name: 'High Pressure Steam Boiler', type: 'Steam Boiler', zone: 'Zone A - Utility', healthScore: 78, temperature: 102.4, pressure: 14.1 },
  ];

  // Mock My Submitted Incidents
  const [submittedIncidents, setSubmittedIncidents] = useState([
    { id: 'INC-8891', machineId: 'HP-9042', title: 'Hydraulic Seal Leakage & Hotspot 184.2°C', severity: 'Critical P1', status: 'In Review', workOrderId: 'WO-9902' },
    { id: 'INC-8842', machineId: 'CNC-4081', title: 'Coolant Flow Pressure Drop 2.1 Bar', severity: 'High P2', status: 'Dispatched', workOrderId: 'WO-8840' },
  ]);

  // Mock My Assigned Tickets
  const assignedTickets = [
    { id: 'WO-9902', machineId: 'HP-9042', title: 'Stamping Press Bearing & Hydraulic Swap', priority: 'Critical P1', status: 'In Progress', targetTime: '22:30 UTC' },
    { id: 'WO-8840', machineId: 'CNC-4081', title: 'Coolant Pump Line Recalibration', priority: 'High P2', status: 'Pending Parts', targetTime: 'Tomorrow 08:00' },
  ];

  // Mock Recent AI Analysis
  const aiAnalysisItems = [
    { id: 'ai-1', assetId: 'HP-9042', hazardTitle: 'Acoustic Bearing Fault & Thermal Infrared Hotspot', confidence: 98.4, recommendation: 'Perform LOTO Lockout and swap SKF-6210 drive bearing.' },
    { id: 'ai-2', assetId: 'CNC-4081', hazardTitle: 'Spindle Harmonic FFT Frequency Drift 14.2 Hz', confidence: 94.1, recommendation: 'Adjust hydraulic damper tension on Z-axis slide.' },
  ];

  // Mock Notifications
  const notifications = [
    { id: 1, type: 'alert', message: 'CRITICAL: Thermal Hotspot 184.2°C detected on HP-9042', time: '10m ago', zone: 'Zone A' },
    { id: 2, type: 'info', message: 'Shift Handover Notes logged for Stamping Press 04', time: '1h ago', zone: 'Zone A' },
    { id: 3, type: 'success', message: 'ISO LOTO Lockout Audit passed for CNC-4081', time: '3h ago', zone: 'Zone A' },
  ];

  const handleAddIncident = (newIncident) => {
    setSubmittedIncidents((prev) => [newIncident, ...prev]);
    showToast(`Shift Incident "${newIncident.title}" reported & logged under ID ${newIncident.id}!`);
  };

  const handleEmergencyEstop = () => {
    showToast('🚨 EMERGENCY E-STOP DISPATCHED TO PLANT SAFETY CORE!');
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

      {/* Operator Shift HUD Header with Emergency E-STOP & Quick Actions */}
      <WorkerHeader
        user={user}
        onOpenQuickReport={() => setIsQuickReportOpen(true)}
        onEmergencyEstop={handleEmergencyEstop}
      />

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Assigned Machines, My Tickets, My Submitted Incidents */}
        <div className="lg:col-span-7 space-y-6">
          {/* Today's Assigned Machines */}
          <AssignedMachinesCard machines={assignedMachines} />

          {/* My Tickets & Work Orders */}
          <MyTicketsList tickets={assignedTickets} />

          {/* My Submitted Incidents Table */}
          <MySubmittedIncidents incidents={submittedIncidents} />
        </div>

        {/* Right Column (5 cols): Recent AI Analysis & Shift Notifications */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recent AI Hazard Diagnostics */}
          <RecentWorkerAiAnalysis analysisItems={aiAnalysisItems} />

          {/* Shift Telemetry Notifications */}
          <WorkerNotifications notifications={notifications} />
        </div>
      </div>

      {/* Quick Report Incident Modal */}
      <QuickReportModal
        isOpen={isQuickReportOpen}
        onClose={() => setIsQuickReportOpen(false)}
        onSubmit={handleAddIncident}
      />
    </div>
  );
};
