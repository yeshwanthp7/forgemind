import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Image as ImageIcon, X, Paperclip, FileSpreadsheet } from 'lucide-react';

export const ImagePreviewGallery = ({ files, onRemoveFile }) => {
  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400 font-semibold uppercase tracking-wider">
          Attached Evidence Files ({files.length})
        </span>
        <span className="text-cyan-400 font-bold">Ready for Upload</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
        <AnimatePresence>
          {files.map((fileItem) => {
            const isImage = fileItem.type && fileItem.type.startsWith('image/');
            return (
              <motion.div
                key={fileItem.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition flex items-center justify-between gap-3 shadow-md"
              >
                {/* File Thumbnail Preview */}
                <div className="flex items-center gap-3 overflow-hidden">
                  {isImage && fileItem.previewUrl ? (
                    <img
                      src={fileItem.previewUrl}
                      alt={fileItem.name}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-800 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-cyan-400">
                      {fileItem.name.endsWith('.csv') ? (
                        <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <FileText className="w-5 h-5 text-cyan-400" />
                      )}
                    </div>
                  )}

                  <div className="truncate">
                    <span className="text-xs font-mono font-bold text-slate-200 block truncate" title={fileItem.name}>
                      {fileItem.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{fileItem.sizeFormatted}</span>
                  </div>
                </div>

                {/* Remove File Button */}
                <button
                  type="button"
                  onClick={() => onRemoveFile(fileItem.id)}
                  className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition shrink-0"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
