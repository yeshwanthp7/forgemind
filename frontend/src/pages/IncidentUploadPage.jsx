import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Corrected import for useNavigate
import {
  // useNavigate, // Removed incorrect import from lucide-react
  UploadCloud,
  AlertTriangle,
  Send,
  RotateCcw,
  CheckCircle2,
  Cpu,
  ShieldAlert,
  User,
  Sparkles,
  FileText
} from 'lucide-react';
import { incidentApi, inventoryApi } from '../api/endpoints';
import { DragDropUploadZone } from '../components/incident/DragDropUploadZone';
import { UploadProgressIndicator } from '../components/incident/UploadProgressIndicator';
import { IncidentSuccessCard } from '../components/incident/IncidentSuccessCard';

export const IncidentUploadPage = () => {
  // Form fields
  const [selectedMachineId, setSelectedMachineId] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const [severity, setSeverity] = useState('Critical P1');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [machinesList, setMachinesList] = useState([]);
  const [isMachinesLoading, setIsMachinesLoading] = useState(true);
  const [pageError, setPageError] = useState(null);

  // Upload state machine: 'idle' | 'uploading' | 'success'
  const [uploadState, setUploadState] = useState('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successResult, setSuccessResult] = useState(null);
  const [incidentId, setIncidentId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const machineOptions = useMemo(
    () => machinesList.map((machine) => ({
      id: machine._id || machine.machineId || machine.id,
      label: `${machine.machineId || machine.id} — ${machine.name}`,
      name: machine.name,
    })),
    [machinesList]
  );

  const selectedMachine = useMemo(
    () => machinesList.find((machine) => (machine._id || machine.machineId || machine.id) === selectedMachineId),
    [machinesList, selectedMachineId]
  );

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    const fetchMachines = async () => {
      setIsMachinesLoading(true);
      setPageError(null);

      try {
        const res = await inventoryApi.getMachines();
        const machineData = Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data)
            ? res.data
            : [];

        setMachinesList(machineData);

        if (!selectedMachineId && machineData.length > 0) {
          const firstMachine = machineData[0];
          setSelectedMachineId(firstMachine._id || firstMachine.machineId || firstMachine.id || '');
        }
      } catch (err) {
        console.error('Failed to load machines:', err);
        setPageError('Unable to load machines from the backend.');
      } finally {
        setIsMachinesLoading(false);
      }
    };

    fetchMachines();
  }, []);

  const handleAddFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (fileId) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleClearForm = () => {
    setTitle('');
    setDescription('');
    setFiles([]);
    setIncidentId(null);
    setPageError(null);
    setSelectedMachineId(machinesList[0]?._id || machinesList[0]?.machineId || machinesList[0]?.id || '');
    setSeverity('Critical P1');
    setUploadState('idle');
    setUploadProgress(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const descriptionText = [title.trim(), description.trim()].filter(Boolean).join('\n\n');

    if (!selectedMachineId) {
      setPageError('Please select a machine.');
      return;
    }

    if (!descriptionText) {
      setPageError('Please enter an incident description.');
      return;
    }

    const imageSource = files.find((file) => file.type?.startsWith('image/') && file.previewUrl);
    if (!imageSource) {
      setPageError('Please upload an image for the incident.');
      return;
    }

    setPageError(null);
    setUploadState('uploading');
    setUploadProgress(10);

    const formData = new FormData();
    formData.append('machine', selectedMachineId);
    formData.append('description', `${title.trim() ? `Title: ${title.trim()}\n\n` : ''}${descriptionText}`);

    try {
      formData.append("image", imageSource.file);
    }catch (error) {
      console.error("Failed to prepare incident image:", error);
      setPageError("Unable to read the selected image. Please choose another file.");
      setUploadState("idle");
      return;
}

    let progressVal = 10;
    const interval = setInterval(() => {
      progressVal += 25;
      if (progressVal > 90) progressVal = 90;
      setUploadProgress(progressVal);
    }, 200);

    try {
      const res = await incidentApi.uploadIncident(formData);
      clearInterval(interval);
      setUploadProgress(100);

      const createdIncident = res.data?.incident || res.data?.data?.incident || res.data?.data || res.data;
      
      // Find the machine's display name from the already loaded machine options
      const machineDisplayName = machineOptions.find(opt => opt.id === selectedMachineId)?.label || selectedMachineId;
      const createdIncidentId = createdIncident?._id || createdIncident?.id || null;
      setIncidentId(createdIncidentId);

      setTimeout(() => {
  setSuccessResult({
    ticketId: createdIncidentId || 'INCIDENT-SAVED',
    machineId: selectedMachineId,
    machineName: machineDisplayName,
    severity,
    fileCount: 1,
    title: descriptionText,
  });

  setUploadState('success');
}, 300);

setTimeout(() => {
  navigate(`/ai-analysis/${createdIncidentId}`);
}, 2000);
    } catch (err) {
      clearInterval(interval);
      console.error('Incident upload failed:', err);
      setPageError(err?.response?.data?.message || 'Incident upload failed.');
      showToast('Upload failed. Please try again.');
      setUploadState('idle');
    }
  };

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

      {pageError && (
        <div className="flex items-center justify-between gap-4 p-4 text-xs border rounded-2xl bg-rose-950/60 border-rose-500/40 text-rose-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{pageError}</span>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative flex flex-col items-start justify-between gap-6 p-6 overflow-hidden border shadow-2xl rounded-2xl bg-linear-to-r from-slate-900 via-slate-900/95 to-rose-950/30 border-slate-800 backdrop-blur-xl lg:flex-row lg:items-center">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center gap-2 px-3 py-1 font-mono text-xs font-bold tracking-wider uppercase border rounded-full bg-rose-500/15 text-rose-300 border-rose-500/30">
              <UploadCloud className="w-3.5 h-3.5 text-rose-400" />
              Factory Incident & Work Order Logging
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[11px] font-mono">
              ISO-45001 Evidence Intake
            </span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Upload Equipment Incident & Dispatch Ticket
          </h1>
          <p className="text-xs leading-relaxed sm:text-sm text-slate-400">
            Attach thermal scans, acoustic FFT CSV logs, or equipment photos to dispatch emergency maintenance work orders.
          </p>
        </div>
      </div>

      {/* Main Form Content */}
      <AnimatePresence mode="wait">
        {uploadState === 'success' && successResult ? (
          <IncidentSuccessCard
            key="success-card"
            result={successResult}
            onResetForm={() => {
              handleClearForm();
              setUploadState('idle');
            }}
          />
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 lg:grid-cols-12"
          >
            {/* Left Column (6 cols): Form Metadata */}
            <div className="p-6 space-y-5 border shadow-xl lg:col-span-6 rounded-2xl bg-slate-900/90 border-slate-800 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider uppercase text-slate-100">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Incident Classification & Metadata
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">Step 1 of 2</span>
              </div>

              {/* Machine Selector */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                  TARGET MACHINERY / ASSET
                </label>
                <select
                  value={selectedMachineId}
                  onChange={(e) => setSelectedMachineId(e.target.value)}
                  disabled={isMachinesLoading || machineOptions.length === 0}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500/60"
                >
                  {isMachinesLoading ? (
                    <option value="">Loading machines from backend...</option>
                  ) : machineOptions.length === 0 ? (
                    <option value="">No machines available</option>
                  ) : (
                    machineOptions.map((machine) => (
                      <option key={machine.id} value={machine.id}>
                        {machine.label}
                      </option>
                    ))
                  )}
                </select>

                {/* Quick Selection Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] font-mono text-slate-500 self-center">Quick Select:</span>
                  {machineOptions.slice(0, 4).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMachineId(m.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition ${
                        selectedMachineId === m.id
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {m.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Severity Dropdown */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                  SEVERITY RATING
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-rose-500/60"
                >
                  <option value="Critical P1">Critical P1 — Immediate Lockout & Emergency Dispatch</option>
                  <option value="High P2">High P2 — Action Required within 4 Operating Hours</option>
                  <option value="Medium P3">Medium P3 — Schedule Maintenance during Shift Change</option>
                  <option value="Low P4">Low P4 — Minor Observation Log</option>
                </select>
              </div>

              {/* Incident Headline Title */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                  INCIDENT HEADLINE TITLE
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hydraulic fluid thermal spike on Press B drive shaft"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500/60"
                />
              </div>

              {/* Operator Profile */}
              <div className="flex items-center justify-between p-3 font-mono text-xs border rounded-xl bg-slate-950 border-slate-800/80">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-400">Reporting Inspector:</span>
                  <span className="font-bold text-slate-200">Cmdr. Alex Vance</span>
                </div>
                <span className="text-[10px] text-slate-500">ID: Shift Alpha</span>
              </div>

              {/* Detailed Description Textarea */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-mono text-xs font-bold uppercase text-slate-300">
                    OBSERVATION DETAILS / NOTES
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {description.length} / 500 chars
                  </span>
                </div>
                <textarea
                  rows={4}
                  maxLength={500}
                  placeholder="Describe acoustic noises, thermal camera readings, fluid leaks, or operator actions taken..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 text-xs leading-relaxed border bg-slate-950 border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-500/60"
                />
              </div>
            </div>

            {/* Right Column (6 cols): Drag & Drop Zone + Gallery */}
            <div className="flex flex-col justify-between p-6 space-y-5 border shadow-xl lg:col-span-6 rounded-2xl bg-slate-900/90 border-slate-800 backdrop-blur-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider uppercase text-slate-100">
                    <UploadCloud className="w-4 h-4 text-cyan-400" />
                    Attach Evidence & Media Files
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">Step 2 of 2</span>
                </div>

                {/* Drag and Drop Zone */}
                <DragDropUploadZone
                  files={files}
                  onAddFiles={handleAddFiles}
                  onRemoveFile={handleRemoveFile}
                />

                {/* Upload Progress Bar (when uploading) */}
                {uploadState === 'uploading' && (
                  <UploadProgressIndicator
                    progress={uploadProgress}
                    fileCount={files.length}
                  />
                )}
              </div>

              {/* Submit Toolbar */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-semibold flex items-center gap-2 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear Form</span>
                </button>

                <button
                  type="submit"
                  disabled={uploadState === 'uploading' || isMachinesLoading || !selectedMachineId}
                  className="px-6 py-3 rounded-xl bg-linear-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4" />
                  <span>Upload & Dispatch Incident Work Order</span>
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {incidentId && uploadState === 'success' && (
        <div className="sr-only">Created incident id: {incidentId}</div>
      )}
    </div>
  );
};
