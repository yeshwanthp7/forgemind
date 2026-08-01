import React from 'react';
import { useAlerts } from '../context/AlertContext';
import { useTelemetry } from '../context/TelemetryContext';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CameraFeedCard } from '../components/hazards/CameraFeedCard';
import { TelemetryChart } from '../components/telemetry/TelemetryChart';
import { mockCameras } from '../data/mockCameras';
import { mockAnalytics } from '../data/mockAnalytics';
import {
  ShieldAlert,
  Activity,
  DollarSign,
  Award,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  Bot,
  Zap
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCopilot } from '../context/CopilotContext';

export const OverviewPage = () => {
  const { hazards, activeP1 } = useAlerts();
  const { assets } = useTelemetry();
  const { toggleCopilot } = useCopilot();
  const navigate = useNavigate();

  const activeHazardCount = hazards.filter(h => h.status !== 'resolved').length;
  const hpAsset = assets.find(a => a.id === "HP-9042");

  return (
    <div className="space-y-6">
      {/* Top Banner Executive Briefing */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 backdrop-blur-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
              ForgeMind Sentinel Core v4.2
            </span>
            <span className="text-xs text-slate-400 font-mono">Live Factory Multi-Agent Network</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Industrial Plant Command & Hazard Sentinel
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Real-time visual AI hazard surveillance, vibration acoustic telemetry, and predictive maintenance dispatch across 4 production zones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="glass" icon={Bot} onClick={toggleCopilot}>
            Open AI Sentinel Copilot
          </Button>
          <Button variant="primary" icon={AlertTriangle} onClick={() => navigate('/hazards')}>
            View Live Cameras ({mockCameras.length})
          </Button>
        </div>
      </div>

      {/* Metric Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Plant Safety Index"
          value={`${mockAnalytics.overallSafetyIndex}%`}
          subtitle="ISO-45001 Verified Threshold"
          icon={Award}
          trend="+2.4% this month"
          trendPositive={true}
        />
        <StatCard
          title="Active Hazards"
          value={activeHazardCount}
          subtitle={activeP1 ? "1 P1 Critical Incident Active" : "Nominal Safety Status"}
          icon={ShieldAlert}
          statusVariant={activeP1 ? "critical" : "optimal"}
          trend={activeP1 ? "Action Needed" : "All Clear"}
          trendPositive={!activeP1}
        />
        <StatCard
          title="Prevented Downtime ROI"
          value={mockAnalytics.preventedDowntimeSavings}
          subtitle="142 Catastrophic Stops Averted"
          icon={DollarSign}
          trend="YTD Savings"
          trendPositive={true}
        />
        <StatCard
          title="Avg Resolution Time (MTTR)"
          value={`${mockAnalytics.mttrMinutes} Mins`}
          subtitle="Automated Ticket Dispatch SLA"
          icon={Activity}
          trend="-12 mins vs Q2"
          trendPositive={true}
        />
      </div>

      {/* Main Grid: Active Hazard CCTV Camera + Predictive Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CCTV Camera Stream */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>P1 Active Hazard CCTV Feed</span>
            </h2>
            <Link to="/hazards" className="text-xs text-cyan-400 font-semibold hover:underline flex items-center gap-1">
              All Feeds <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <CameraFeedCard camera={mockCameras[1]} />
        </div>

        {/* Predictive Telemetry Line Chart */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Real-Time Hydraulic Press Telemetry (HP-9042)</span>
            </h2>
            <Link to="/telemetry" className="text-xs text-cyan-400 font-semibold hover:underline flex items-center gap-1">
              Telemetry Hub <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {hpAsset && <TelemetryChart data={hpAsset.sparklineData} />}
        </div>
      </div>

      {/* Asset Health Overview Table */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100">Factory Asset Health & Predictive RUL Inventory</h3>
            <p className="text-xs text-slate-400">Telemetry nodes streaming vibration FFT and thermal metrics</p>
          </div>
          <Link to="/telemetry" className="text-xs font-semibold text-cyan-400 hover:underline">
            View All Assets →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Asset Name / ID</th>
                <th className="p-3">Zone</th>
                <th className="p-3">Status</th>
                <th className="p-3">RUL Score</th>
                <th className="p-3">Vibration</th>
                <th className="p-3">Temperature</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-850/50 transition">
                  <td className="p-3">
                    <div className="font-bold text-slate-100">{asset.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{asset.id} • {asset.category}</div>
                  </td>
                  <td className="p-3 text-slate-300">{asset.zone}</td>
                  <td className="p-3">
                    <Badge variant={asset.status}>{asset.status}</Badge>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${asset.rulPercentage < 25 ? 'bg-rose-500' : asset.rulPercentage < 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${asset.rulPercentage}%` }}
                        />
                      </div>
                      <span className="font-mono text-slate-200 font-bold">{asset.rulPercentage}%</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-cyan-300 font-semibold">{asset.vibrationFrequency}</td>
                  <td className="p-3 font-mono text-rose-300 font-semibold">{asset.temperature}</td>
                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/telemetry/${asset.id}`)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold border border-slate-700 transition"
                    >
                      Diagnostics
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
