import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  AlertTriangle,
  X,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Send,
  Paperclip
} from 'lucide-react';

export const UploadIncidentModal = ({ isOpen, onClose, machine, onSubmitIncident }) => {
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState('High P2');
  const [description, setDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleSimulatedFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedFiles((prev) => [
        ...prev,
        ...files.map((f) => ({ name: f.name, size: (f.size / 1024).toFixed(1) + ' KB' }))
      ]);
    }
  };

  const handleSimulatedDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setUploadedFiles((prev) => [
      ...prev,
      { name: 'thermal_scan_log_04.png', size: '2.4 MB' },
      { name: 'acoustic_vibration_log.csv', size: '480 KB' }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitIncident({
      title: title || 'Unscheduled Telemetry Anomaly',
      severity,
      description,
      filesCount: uploadedFiles.length
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl z-10"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">Upload Factory Incident Log</h3>
                <p className="text-xs text-slate-400">Target Asset: {machine.name} ({machine.id})</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Incident Title / Summary</label>
              <input
                type="text"
                required
                placeholder="e.g. Thermal overheating spike observed on drive shaft"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-rose-500/60"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Incident Severity Level</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-rose-500/60"
              >
                <option value="Critical P1">Critical P1 (Immediate Lockout & Emergency Dispatch)</option>
                <option value="High P2">High P2 (Attention Needed within 4 Hours)</option>
                <option value="Medium P3">Medium P3 (Schedule Inspection during Shift Change)</option>
                <option value="Low P4">Low P4 (Minor Observation Log)</option>
              </select>
            </div>

            {/* File Dropzone Simulation */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">Attach Photos, Telemetry Logs, or CSVs</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleSimulatedDrop}
                className={`border-2 border-dashed rounded-xl p-4 text-center transition cursor-pointer ${
                  isDragging
                    ? 'border-cyan-400 bg-cyan-500/10'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleSimulatedFileUpload}
                  className="hidden"
                  id="incident-file-input"
                />
                <label htmlFor="incident-file-input" className="cursor-pointer flex flex-col items-center gap-1.5">
                  <Upload className="w-6 h-6 text-slate-500" />
                  <span className="text-slate-300 font-semibold">Click to upload files or drag & drop</span>
                  <span className="text-[10px] text-slate-500 font-mono">PNG, JPG, CSV, TXT (Max 25MB)</span>
                </label>
              </div>

              {/* Uploaded File List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-2 space-y-1">
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px]">
                      <div className="flex items-center gap-2 text-cyan-300 font-mono truncate">
                        <Paperclip className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{file.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{file.size}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Operator Notes / Observations</label>
              <textarea
                rows={3}
                placeholder="Detail acoustic noise levels, fluid leaks, or operator actions taken..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-rose-500/60"
              />
            </div>

            <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-rose-600/30"
              >
                <Send className="w-4 h-4" />
                <span>Upload & Dispatch Incident</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
