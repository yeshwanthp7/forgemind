import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTelemetry } from '../context/TelemetryContext';
import { TelemetryChart } from '../components/telemetry/TelemetryChart';
import { SpectralVibrationGraph } from '../components/telemetry/SpectralVibrationGraph';
import { AssetHealthGauge } from '../components/telemetry/AssetHealthGauge';
import { RULPredictorCard } from '../components/telemetry/RULPredictorCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Wrench, Activity, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export const AssetDetailPage = () => {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const { assets } = useTelemetry();

  const asset = assets.find(a => a.id === deviceId) || assets[0];

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/telemetry')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Telemetry Hub
      </button>

      {/* Asset Shell Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={asset.status}>{asset.status}</Badge>
            <span className="text-xs font-mono text-slate-400">Node #{asset.id}</span>
            <span className="text-xs text-slate-500 font-mono">• {asset.zone}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">{asset.name}</h1>
          <p className="text-xs text-slate-400 mt-1">{asset.category} • Manufactured by {asset.manufacturer}</p>
        </div>

        <Button variant="primary" icon={Wrench} onClick={() => navigate('/tickets/new')}>
          Issue Maintenance Work Order
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TelemetryChart data={asset.sparklineData} title={`Live Telemetry: ${asset.name}`} />
        </div>
        <RULPredictorCard asset={asset} />
      </div>

      {/* FFT Graph & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SpectralVibrationGraph fftData={asset.spectralFFT} />
        </div>
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-100">Live Operating Metrics</h3>
          <div className="space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Motor Current Draw</span>
              <span className="text-cyan-400 font-bold">{asset.motorCurrent}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Acoustic Noise Level</span>
              <span className="text-amber-400 font-bold">{asset.acousticDecibels}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400">Total Operating Hours</span>
              <span className="text-slate-200 font-bold">{asset.operatingHours} Hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
