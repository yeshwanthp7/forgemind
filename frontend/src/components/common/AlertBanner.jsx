import React from 'react';
import { useAlerts } from '../../context/AlertContext';
import { useCopilot } from '../../context/CopilotContext';
import { AlertTriangle, ChevronRight, Volume2, VolumeX, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AlertBanner = () => {
  const { activeP1, soundEnabled, setSoundEnabled, bannerVisible, setBannerVisible } = useAlerts();
  const { setIsOpen: setCopilotOpen } = useCopilot();

  if (!activeP1 || !bannerVisible) return null;

  return (
    <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-slate-950 border-b border-rose-500/50 px-4 py-2 flex items-center justify-between z-40 text-xs font-medium text-rose-100 animate-pulse">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-600 text-white font-bold uppercase tracking-wider text-[10px] shadow-sm shadow-rose-900">
          <AlertTriangle className="w-3.5 h-3.5" /> P1 CRITICAL
        </span>
        <span className="font-semibold text-rose-200">{activeP1.title}</span>
        <span className="text-rose-400 hidden md:inline">| {activeP1.zone} ({activeP1.assetId})</span>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to={`/hazards/${activeP1.id}`}
          className="flex items-center gap-1 text-cyan-300 hover:text-white underline font-semibold transition"
        >
          Inspect Incident Room <ChevronRight className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={() => setCopilotOpen(true)}
          className="px-2 py-1 bg-rose-800/60 hover:bg-rose-700 text-rose-100 rounded border border-rose-500/30 transition text-[11px] font-bold"
        >
          Sentinel AI Copilot
        </button>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-1 rounded text-rose-300 hover:text-white transition"
          title={soundEnabled ? "Mute alert chime" : "Unmute alert chime"}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={() => setBannerVisible(false)}
          className="p-1 rounded text-rose-400 hover:text-white transition"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
