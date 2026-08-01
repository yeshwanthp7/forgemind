import React from 'react';
import { RiskMatrixHeatmap } from '../components/analytics/RiskMatrixHeatmap';
import { ComplianceScoreGauge } from '../components/analytics/ComplianceScoreGauge';
import { IncidentTrendChart } from '../components/analytics/IncidentTrendChart';
import { mockAnalytics } from '../data/mockAnalytics';
import { BarChart3, Award, DollarSign, ShieldCheck, Download, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>Plant Safety Risk Matrix & ISO-45001 Compliance Analytics</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Quantitative risk assessment, loss prevention financial ROI, and safety compliance reporting
          </p>
        </div>

        <Button variant="glass" icon={Download}>
          Export ISO Safety Audit PDF
        </Button>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RiskMatrixHeatmap riskData={mockAnalytics.riskMatrixData} />
        <ComplianceScoreGauge score={mockAnalytics.isoComplianceScore} />
      </div>

      {/* 30-Day Trend Chart */}
      <IncidentTrendChart data={mockAnalytics.hazardTrends30Days} />

      {/* Factory Zone Compliance Breakdowns */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-md">
        <h3 className="text-sm font-bold text-slate-100 mb-4">Factory Zone Safety Ratings</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockAnalytics.zoneSafetyScores.map((z, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-200 block">{z.zone}</span>
                <span className="text-[10px] text-slate-400 font-mono">{z.status}</span>
              </div>
              <span className={`text-lg font-extrabold font-mono ${z.score >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {z.score}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
