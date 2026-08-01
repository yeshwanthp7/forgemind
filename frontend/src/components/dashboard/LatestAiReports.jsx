import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  FileText,
  ArrowRight,
  ShieldCheck,
  Download,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const LatestAiReports = ({ reports }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-rose-400 bg-rose-500/20 border-rose-500/30';
    if (score >= 50) return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
    return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Latest AI Sentinel Reports</h3>
              <p className="text-[11px] text-slate-400">Automated multi-agent diagnostic briefs</p>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono text-[10px] border border-cyan-500/20">
            ForgeMind Neural 4.2
          </span>
        </div>

        <div className="space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition cursor-pointer group space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] text-cyan-400 font-mono font-bold block">{report.id}</span>
                  <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition">
                    {report.title}
                  </h4>
                </div>

                <div className={`px-2.5 py-1 rounded-lg border font-mono font-bold text-xs shrink-0 ${getRiskColor(report.riskScore)}`}>
                  Score: {report.riskScore}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {report.summary}
              </p>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">{report.targetAsset}</span>
                <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition">
                  Read Full Brief <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
        <span className="text-slate-400 font-mono">3 New Reports Today</span>
        <button
          onClick={() => setSelectedReport(reports[0])}
          className="text-cyan-400 font-semibold hover:underline"
        >
          View All AI Logs →
        </button>
      </div>

      {/* Full AI Report Modal */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReport(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{selectedReport.title}</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedReport.id} • {selectedReport.generatedTime}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 my-4 text-xs">
                <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-mono">TARGET ASSET</span>
                    <span className="font-bold text-slate-200">{selectedReport.targetAsset}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-mono">CLASSIFICATION</span>
                    <span className="font-bold text-slate-200">{selectedReport.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-mono">AI CONFIDENCE</span>
                    <span className="font-bold text-cyan-400 font-mono">98.4% Verified</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-200 text-xs font-mono uppercase tracking-wider">
                    Neural Spectrum Diagnostic Executive Summary
                  </h4>
                  <p className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 leading-relaxed">
                    {selectedReport.summary}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-200 text-xs font-mono uppercase tracking-wider">
                    Recommended Operator Corrective Action
                  </h4>
                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-200 flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{selectedReport.recommendation}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-between items-center border-t border-slate-800">
                <button
                  onClick={() => alert('Report PDF downloaded to local storage.')}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Report PDF</span>
                </button>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Acknowledge Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
