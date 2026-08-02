import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

export const HazardVisualCard = ({
  image = '',
  overlays = [],
  assetName = 'Unknown Machine',
  assetId = 'N/A',
  zone = 'Unknown Zone',
}) => {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 sm:p-5 backdrop-blur-xl shadow-2xl space-y-3 relative overflow-hidden group">
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-bold text-slate-100 uppercase tracking-wider">
            AI Surveillance Thermal & Visual Overlay
          </span>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold">
          4K Neural Ingestion
        </span>
      </div>

      {/* Main Image Frame */}
      <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
        {image ? (
          <img
            src={image}
            alt={assetName}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-sm">
            No image available
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 opacity-70" />

        {/* Bounding Box Overlays */}
        {(overlays ?? []).map((box) => (
          <motion.div
            key={box.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={box.position}
            className={`absolute border-2 rounded-xl backdrop-blur-[2px] transition-all shadow-[0_0_20px_rgba(244,63,94,0.4)] ${box.color}`}
          >
            {/* Corner Brackets */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white" />

            {/* Label */}
            <div className="absolute -top-7 left-0 px-2 py-0.5 rounded-md bg-slate-950/90 border border-slate-700 text-[10px] font-mono font-bold text-white shadow-lg flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              <span>{box.label}</span>
              <span className="text-cyan-400 font-bold">
                [{box.confidence}]
              </span>
            </div>
          </motion.div>
        ))}

        {/* Optional Empty State */}
        {overlays.length === 0 && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-xs font-mono text-slate-300">
            No hazards detected
          </div>
        )}

        {/* Footer */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-xs font-mono">
          <div className="p-2 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-200">
            <div className="text-[10px] text-cyan-400 font-bold">
              {assetId}
            </div>
            <div className="font-bold text-slate-100 text-xs">
              {assetName}
            </div>
          </div>

          <div className="px-3 py-1 rounded-lg bg-slate-950/90 text-slate-400 border border-slate-800 text-[10px] font-mono">
            {zone}
          </div>
        </div>
      </div>
    </div>
  );
};