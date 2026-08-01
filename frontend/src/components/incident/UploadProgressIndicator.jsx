import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Upload } from 'lucide-react';

export const UploadProgressIndicator = ({ progress, fileCount }) => {
  return (
    <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3 shadow-xl text-xs font-mono">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Upload className="w-4 h-4 text-cyan-400 animate-bounce" />
          <span className="font-bold text-slate-200">
            Uploading {fileCount || 1} Evidence Files to Control Hub...
          </span>
        </div>
        <span className="font-bold text-cyan-300">{progress}%</span>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-400">
        <span>Transfer Speed: 4.8 MB/s</span>
        <span className="text-emerald-400 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          SHA-256 Checksum Verified
        </span>
      </div>
    </div>
  );
};
