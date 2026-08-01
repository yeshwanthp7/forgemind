import React, { useState } from 'react';
import { BoundingBoxOverlay } from './BoundingBoxOverlay';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Eye, Flame, Maximize2, ShieldAlert, Cpu, Video, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CameraFeedCard = ({ camera }) => {
  const [thermalMode, setThermalMode] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const activeHazards = camera.detectedHazards || [];
  const hasCritical = activeHazards.some(h => h.severity === 'critical');

  return (
    <div className={`rounded-xl bg-slate-900 border ${hasCritical ? 'border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.15)]' : 'border-slate-800'} overflow-hidden flex flex-col group`}>
      {/* Feed Header */}
      <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className={`w-2.5 h-2.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400'} block`} />
            {!isPaused && <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block absolute inset-0 animate-ping opacity-75" />}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 flex items-center gap-2">
              <span>{camera.name}</span>
              <span className="text-[10px] font-mono text-slate-400">({camera.id})</span>
            </h4>
            <span className="text-[10px] text-slate-400">{camera.zone} • {camera.aiModel}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={hasCritical ? 'critical' : activeHazards.length > 0 ? 'warning' : 'optimal'}>
            {activeHazards.length > 0 ? `${activeHazards.length} AI Hazard${activeHazards.length > 1 ? 's' : ''}` : 'Nominal'}
          </Badge>
        </div>
      </div>

      {/* Video Canvas Container */}
      <div className="relative h-64 bg-black overflow-hidden group">
        <img
          src={thermalMode ? camera.thermalStreamUrl : camera.streamUrl}
          alt={camera.name}
          className={`w-full h-full object-cover transition-all duration-300 ${thermalMode ? 'hue-rotate-90 contrast-125 brightness-110' : ''} ${isPaused ? 'grayscale brightness-75' : ''}`}
        />

        {/* Scanline FX Overlay */}
        <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none" />

        {/* Live HUD Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono font-semibold text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <Video className="w-3 h-3" /> LIVE {camera.fps} FPS
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono font-semibold text-cyan-400 border border-cyan-500/30">
            {camera.resolution}
          </span>
        </div>

        {/* Thermal Vision Indicator */}
        {thermalMode && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-orange-600/90 text-white font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-lg">
            <Flame className="w-3 h-3 animate-pulse" /> THERMAL FLIR MATRIX
          </div>
        )}

        {/* Bounding Box Overlays */}
        {activeHazards.map(hazard => (
          <BoundingBoxOverlay key={hazard.id} hazard={hazard} />
        ))}
      </div>

      {/* Feed Controls Footer */}
      <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setThermalMode(!thermalMode)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              thermalMode
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{thermalMode ? 'Thermal FLIR' : 'RGB AI View'}</span>
          </button>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
          >
            {isPaused ? 'Resume Feed' : 'Pause'}
          </button>
        </div>

        {activeHazards.length > 0 && (
          <Button
            size="sm"
            variant={hasCritical ? 'danger' : 'glass'}
            onClick={() => navigate(`/hazards/${activeHazards[0].id}`)}
            icon={Maximize2}
          >
            Inspect Incident Room
          </Button>
        )}
      </div>
    </div>
  );
};
