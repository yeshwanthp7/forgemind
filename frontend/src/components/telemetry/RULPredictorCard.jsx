import React from 'react';
import { Clock, AlertTriangle, ShieldCheck, Wrench, Calendar, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const RULPredictorCard = ({ asset }) => {
  const navigate = useNavigate();
  const isCritical = asset.status === 'critical';

  return (
    <div className={`p-5 rounded-xl bg-slate-900 border ${isCritical ? 'border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.1)]' : 'border-slate-800'} backdrop-blur-md flex flex-col justify-between`}>
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">RUL Breakdown Wear Model</span>
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Sentinel ML v2
          </span>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 mb-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-300 font-semibold">Critical Component:</span>
            <span className="text-cyan-400 font-mono font-bold">{asset.criticalComponent}</span>
          </div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-300 font-semibold">Predicted Failure:</span>
            <span className={`font-mono font-bold ${isCritical ? 'text-rose-400' : 'text-amber-400'}`}>
              {asset.predictedFailureDate}
            </span>
          </div>

          {/* RUL Progress Bar */}
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                asset.rulPercentage < 25 ? 'bg-rose-500' : asset.rulPercentage < 60 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${asset.rulPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-mono">
            <span>Remaining Useful Life</span>
            <span className="font-bold text-slate-200">{asset.rulPercentage}%</span>
          </div>
        </div>

        <div className="text-xs text-slate-300 space-y-1 mb-4">
          <p className="font-semibold text-slate-200">Failure Mode Analysis:</p>
          <p className="text-slate-400 text-[11px] leading-relaxed">{asset.failureMode}</p>
        </div>
      </div>

      <Button
        variant={isCritical ? 'danger' : 'primary'}
        className="w-full"
        icon={Wrench}
        onClick={() => navigate('/tickets/new')}
      >
        Generate Work Order Ticket
      </Button>
    </div>
  );
};
