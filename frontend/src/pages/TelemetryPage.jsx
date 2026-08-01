import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { TelemetryChart } from '../components/telemetry/TelemetryChart';
import { SpectralVibrationGraph } from '../components/telemetry/SpectralVibrationGraph';
import { RULPredictorCard } from '../components/telemetry/RULPredictorCard';
import { AssetHealthGauge } from '../components/telemetry/AssetHealthGauge';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Activity, Cpu, RefreshCw, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TelemetryPage = () => {
  const { assets, triggerMachineAnomaly } = useTelemetry();
  const navigate = useNavigate();
  const hpAsset = assets.find(a => a.id === "HP-9042") || assets[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span>Predictive Telemetry & Machine Health Diagnostics</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time FFT vibration harmonics, thermal sensors, and remaining useful life (RUL) modeling
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="glass"
            icon={Zap}
            onClick={() => triggerMachineAnomaly("HP-9042")}
          >
            Simulate Telemetry Vibration Anomaly
          </Button>
        </div>
      </div>

      {/* Main Grid: Dual Axis Telemetry + RUL Wear Model */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TelemetryChart data={hpAsset.sparklineData} title={`Telemetry Spectrum: ${hpAsset.name} (${hpAsset.id})`} />
        </div>
        <div>
          <RULPredictorCard asset={hpAsset} />
        </div>
      </div>

      {/* FFT Harmonics + Gauge Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SpectralVibrationGraph fftData={hpAsset.spectralFFT} />
        </div>
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 backdrop-blur-md flex flex-col items-center justify-center">
          <AssetHealthGauge score={hpAsset.healthScore} label="Overall Machinery Health Index" />
        </div>
      </div>

      {/* Assets Grid */}
      <div>
        <h2 className="text-sm font-bold text-slate-200 mb-4">All Monitored Telemetry Equipment Nodes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => navigate(`/telemetry/${asset.id}`)}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-400">{asset.id} • {asset.zone}</span>
                  <Badge variant={asset.status}>{asset.status}</Badge>
                </div>
                <h4 className="text-sm font-bold text-slate-100 mb-1 group-hover:text-cyan-300 transition">{asset.name}</h4>
                <p className="text-xs text-slate-400 mb-3">{asset.category}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">Vibration</span>
                  <span className="text-cyan-400 font-bold">{asset.vibrationFrequency}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Temp</span>
                  <span className="text-rose-400 font-bold">{asset.temperature}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">RUL Score</span>
                  <span className="text-emerald-400 font-bold">{asset.rulPercentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
