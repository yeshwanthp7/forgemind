import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Image as ImageIcon, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { ImagePreviewGallery } from './ImagePreviewGallery';

export const DragDropUploadZone = ({ files, onAddFiles, onRemoveFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelection = (e) => {
    const rawFiles = Array.from(e.target.files || []);
    if (rawFiles.length > 0) {
      processFiles(rawFiles);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const rawFiles = Array.from(e.dataTransfer.files || []);
    if (rawFiles.length > 0) {
      processFiles(rawFiles);
    } else {
      // Demo fallback files if empty drop
      processFiles([
        new File(["thermal_data"], "thermal_excursion_press_04.png", { type: "image/png" }),
        new File(["vibration_log"], "acoustic_fft_harmonic_spectrum.csv", { type: "text/csv" })
      ]);
    }
  };

  const processFiles = (rawFiles) => {
    const processed = rawFiles.map((file, idx) => ({
      id: `${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
      name: file.name,
      type: file.type,
      sizeFormatted: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));
    onAddFiles(processed);
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Area Container */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative overflow-hidden rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center transition duration-200 cursor-pointer ${
          isDragging
            ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.2)]'
            : 'border-slate-800 bg-slate-950/80 hover:border-slate-700 hover:bg-slate-950'
        }`}
      >
        <input
          type="file"
          multiple
          accept="image/*,.csv,.pdf,.txt"
          onChange={handleFileSelection}
          className="hidden"
          id="incident-dropzone-input"
        />

        <label htmlFor="incident-dropzone-input" className="cursor-pointer flex flex-col items-center justify-center space-y-3">
          {/* Animated Upload Icon */}
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
            <UploadCloud className="w-7 h-7 text-cyan-400 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>

          {/* Professional Empty State Messaging */}
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-100 flex items-center justify-center gap-1.5">
              <span>Drag & drop thermal photos, acoustic WAVs, or telemetry CSVs</span>
            </h4>
            <p className="text-xs text-slate-400">
              or <span className="text-cyan-400 font-semibold underline">browse files</span> from your computer
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[10px] font-mono text-slate-500">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">PNG, JPG, WEBP</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">CSV, PDF, LOG</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Max 25 MB / file</span>
          </div>
        </label>
      </div>

      {/* Image & File Preview Gallery */}
      <ImagePreviewGallery files={files} onRemoveFile={onRemoveFile} />
    </div>
  );
};
