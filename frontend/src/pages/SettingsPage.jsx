import React, { useState } from 'react';
import { Settings, Sliders, Bell, Cpu, Shield, Save } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAlerts } from '../context/AlertContext';

export const SettingsPage = () => {
  const { soundEnabled, setSoundEnabled } = useAlerts();
  const [sensitivity, setSensitivity] = useState(95);
  const [vibrationThreshold, setVibrationThreshold] = useState(5.0);
  const [tempThreshold, setTempThreshold] = useState(160);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          <span>System Settings & Visual AI Configuration</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Adjust visual AI detection thresholds, acoustic vibration alerts, and auditory alarm sounds
        </p>
      </div>

      {/* Visual AI Settings Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" /> Visual AI Camera Model Tuning
        </h3>

        <div className="space-y-4 text-xs">
          <div>
            <div className="flex justify-between font-semibold text-slate-200 mb-1">
              <span>Object Classification Sensitivity Threshold</span>
              <span className="font-mono text-cyan-400">{sensitivity}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="99"
              value={sensitivity}
              onChange={(e) => setSensitivity(e.target.value)}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">Higher values reduce false positives for PPE and thermal runaway detection.</span>
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-200 mb-1">
              <span>Vibration Spike Alarm Threshold (mm/s)</span>
              <span className="font-mono text-amber-400">{vibrationThreshold} mm/s</span>
            </div>
            <input
              type="range"
              min="2.0"
              max="10.0"
              step="0.5"
              value={vibrationThreshold}
              onChange={(e) => setVibrationThreshold(e.target.value)}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-200 mb-1">
              <span>Thermal Runaway Alarm Threshold (°C)</span>
              <span className="font-mono text-rose-400">{tempThreshold} °C</span>
            </div>
            <input
              type="range"
              min="100"
              max="220"
              step="5"
              value={tempThreshold}
              onChange={(e) => setTempThreshold(e.target.value)}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
            />
          </div>
        </div>
      </div>

      {/* Alarm Sounds & Notifications */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Bell className="w-4 h-4 text-amber-400" /> Emergency Auditory & Push Alerts
        </h3>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <div>
            <span className="font-bold text-slate-200 block">P1 Auditory Floor Speaker Chime</span>
            <span className="text-slate-400 text-[11px]">Play high-frequency audio chime when P1 Critical hazard is detected</span>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-12 h-6 rounded-full transition p-1 flex items-center ${
              soundEnabled ? 'bg-cyan-600 justify-end' : 'bg-slate-800 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white block shadow-md" />
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" icon={Save}>
          Save Configuration
        </Button>
      </div>
    </div>
  );
};
