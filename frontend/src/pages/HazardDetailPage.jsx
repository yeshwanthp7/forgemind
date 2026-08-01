import React from 'react';
import { useParams, useNavigate } from 'react';
import { mockHazards } from '../data/mockHazards';
import { mockCameras } from '../data/mockCameras';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CameraFeedCard } from '../components/hazards/CameraFeedCard';
import { AlertTriangle, ArrowLeft, Bot, Wrench, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCopilot } from '../context/CopilotContext';
import { useAlerts } from '../context/AlertContext';

export const HazardDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleCopilot } = useCopilot();
  const { acknowledgeHazard, resolveHazard } = useAlerts();

  const hazard = mockHazards.find(h => h.id === id) || mockHazards[0];
  const camera = mockCameras.find(c => c.id === hazard.cameraId) || mockCameras[1];

  return (
    <div className="space-y-6">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Hazards Monitor
        </button>

        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => acknowledgeHazard(hazard.id)}>
            Acknowledge Hazard
          </Button>
          <Button variant="danger" icon={Wrench} onClick={() => navigate('/tickets/new')}>
            Dispatch P1 Work Order
          </Button>
        </div>
      </div>

      {/* Incident Room Card Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-rose-500/40 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={hazard.severity} glow={true}>{hazard.severity}</Badge>
              <span className="text-xs font-mono text-slate-400">Incident #{hazard.id}</span>
              <span className="text-xs text-slate-500 font-mono">• {hazard.detectedAt}</span>
            </div>
            <h1 className="text-xl font-extrabold text-white">{hazard.title}</h1>
            <p className="text-xs text-slate-400 mt-1">{hazard.details}</p>
          </div>

          <button
            onClick={toggleCopilot}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 hover:text-white font-semibold text-xs transition"
          >
            <Bot className="w-4 h-4 text-cyan-400" /> Ask Copilot Root Cause
          </button>
        </div>

        {/* Incident Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Detection Model</span>
            <span className="font-semibold text-slate-200">{hazard.detectionType}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">AI Match Confidence</span>
            <span className="font-mono font-bold text-emerald-400">{hazard.confidenceScore}% Match</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Target Asset ID</span>
            <span className="font-mono font-bold text-cyan-400">{hazard.assetId || 'N/A'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Factory Location</span>
            <span className="font-semibold text-slate-200">{hazard.zone}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: High-Res Camera Inspection + AI Remediation Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-sm font-bold text-slate-200 mb-3">Live CCTV Inspection & FLIR Thermal Matrix</h2>
          <CameraFeedCard camera={camera} />
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-200">AI Sentinel Remediation Playbook</h2>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/20 text-xs leading-relaxed text-slate-300">
              <strong className="text-cyan-300 block mb-1">Diagnostic Summary:</strong>
              {hazard.aiDiagnosis}
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Recommended Action Steps:
              </span>
              <ul className="space-y-2">
                {hazard.recommendedActions.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
