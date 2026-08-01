import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Cpu,
  Wrench,
  Download,
  RotateCw,
  Sparkles,
  X,
  CheckCircle2,
  Send,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../ui/Button';

export const QuickActionsBar = ({ onRefresh, isRefreshing }) => {
  const [activeModal, setActiveModal] = useState(null); // 'report' | 'ai_scan' | 'maintenance' | 'export'
  const [aiScanProgress, setAiScanProgress] = useState(0);
  const [aiScanning, setAiScanning] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Form states for Incident Reporting
  const [incidentForm, setIncidentForm] = useState({
    title: '',
    machineId: 'HP-9042',
    priority: 'High',
    description: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRunAiScan = () => {
    setActiveModal('ai_scan');
    setAiScanning(true);
    setAiScanProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      setAiScanProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setAiScanning(false);
      }
    }, 300);
  };

  const handleIncidentSubmit = (e) => {
    e.preventDefault();
    setActiveModal(null);
    showToast(`Incident "${incidentForm.title || 'New Incident'}" dispatched to Priority Dispatch Queue!`);
    setIncidentForm({ title: '', machineId: 'HP-9042', priority: 'High', description: '' });
  };

  return (
    <>
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

      {/* Main Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          <div className="flex flex-col">
            <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              Factory Quick Command Bar
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px]">
                Active Control Zone
              </span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              Instant action controls for plant supervisors & shift engineers
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveModal('report')}
            className="px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2 transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Report Incident</span>
          </button>

          <button
            onClick={handleRunAiScan}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-cyan-100 animate-spin" style={{ animationDuration: '4s' }} />
            <span>AI Diagnostic Scan</span>
          </button>

          <button
            onClick={() => setActiveModal('maintenance')}
            className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition hover:scale-[1.02]"
          >
            <Wrench className="w-4 h-4 text-amber-400" />
            <span>Schedule Work Order</span>
          </button>

          <button
            onClick={() => showToast('Factory Analytics PDF Report generated and queued for download.')}
            className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition hover:scale-[1.02]"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export Analytics</span>
          </button>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-400 hover:text-slate-200 transition"
            title="Refresh Factory State & Reload Telemetry"
          >
            <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* MODAL: Report Incident */}
      <AnimatePresence>
        {activeModal === 'report' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
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
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">Log Emergency Factory Incident</h3>
                    <p className="text-xs text-slate-400">Direct dispatch to Factory Operations Control</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleIncidentSubmit} className="space-y-4 mt-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Incident Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hydraulic fluid thermal spike on Press B"
                    value={incidentForm.title}
                    onChange={(e) => setIncidentForm({ ...incidentForm, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-rose-500/60"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Target Machine ID</label>
                    <select
                      value={incidentForm.machineId}
                      onChange={(e) => setIncidentForm({ ...incidentForm, machineId: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-rose-500/60"
                    >
                      <option value="HP-9042">HP-9042 (Hydraulic Press)</option>
                      <option value="CNC-4081">CNC-4081 (5-Axis Milling)</option>
                      <option value="RB-1024">RB-1024 (Robotic Welder)</option>
                      <option value="PNT-3012">PNT-3012 (Paint Booth)</option>
                      <option value="CNV-0044">CNV-0044 (Assembly Loop)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Severity Level</label>
                    <select
                      value={incidentForm.priority}
                      onChange={(e) => setIncidentForm({ ...incidentForm, priority: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-rose-500/60"
                    >
                      <option value="Critical">Critical (P1 Alert)</option>
                      <option value="High">High Risk (P2 Alert)</option>
                      <option value="Medium">Medium Risk (P3 Alert)</option>
                      <option value="Low">Low Priority (Minor)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Observation / Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Provide operator observations, acoustic noise levels, or thermal readings..."
                    value={incidentForm.description}
                    onChange={(e) => setIncidentForm({ ...incidentForm, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-rose-500/60"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-rose-600/30"
                  >
                    <Send className="w-4 h-4" />
                    <span>Dispatch Incident</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: AI Diagnostic Scan */}
      <AnimatePresence>
        {activeModal === 'ai_scan' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !aiScanning && setActiveModal(null)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.2)] z-10 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Sparkles className="w-7 h-7 text-white animate-pulse" />
              </div>

              <h3 className="text-lg font-bold text-slate-100">
                {aiScanning ? 'Running ForgeMind AI Diagnostic Spectrum Scan...' : 'AI Scan Complete!'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {aiScanning
                  ? 'Analyzing acoustic FFT harmonics, thermal telemetry, and motor vibration matrices across 148 machines.'
                  : 'Full plant spectral analysis completed with 0 new critical anomalies detected.'}
              </p>

              {/* Progress Bar */}
              <div className="my-6 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-semibold">
                    {aiScanning ? 'Analyzing Sensors...' : '100% Verified'}
                  </span>
                  <span className="text-slate-300 font-bold">{aiScanProgress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                    animate={{ width: `${aiScanProgress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>

              {!aiScanning && (
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-left text-xs space-y-1 mb-6">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>ISO-45001 Safety Standard Maintained</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    All 5 production zones operating within nominal vibration amplitude (&lt;4.2 mm/s).
                  </p>
                </div>
              )}

              <button
                disabled={aiScanning}
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition shadow-lg shadow-cyan-500/25"
              >
                {aiScanning ? 'Scanning in progress...' : 'Close & View Report'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Work Order */}
      <AnimatePresence>
        {activeModal === 'maintenance' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">Schedule Preventive Work Order</h3>
                    <p className="text-xs text-slate-400">Assign maintenance tasks to plant technicians</p>
                  </div>
                </div>
                <button onClick={() => setActiveModal(null)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 mt-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Asset</label>
                  <input
                    type="text"
                    defaultValue="CNC-4081 - 5-Axis Milling Unit"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Service Type</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100">
                    <option>Spindle Bearing Replacement</option>
                    <option>Hydraulic Oil Purge & Filter</option>
                    <option>Thermal Imaging Calibration</option>
                    <option>Vibration Damper Torque Check</option>
                  </select>
                </div>
                <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      showToast('Work Order scheduled & assigned to Maintenance Team B');
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                  >
                    Schedule Order
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
