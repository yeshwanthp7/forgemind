import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Sparkles,
  Ticket,
  Download,
  FileText,
  ShieldAlert,
  Clock,
  Activity,
  CheckCircle2,
  RefreshCw,
  Zap,
  Award,
  ChevronRight,
  X,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { aiAnalysisApi } from '../api/endpoints';
import { mockAiAnalysisData } from '../data/mockAiAnalysisData';
import { CircularProgressRing } from '../components/ai-analysis/CircularProgressRing';
import { HazardVisualCard } from '../components/ai-analysis/HazardVisualCard';
import { SafetyChecklist } from '../components/ai-analysis/SafetyChecklist';
import { AiInferenceTimeline } from '../components/ai-analysis/AiInferenceTimeline';
import { AiAnalysisSkeleton } from '../components/ai-analysis/AiAnalysisSkeleton';

export const AiAnalysisPage = () => {
  const [data, setData] = useState(mockAiAnalysisData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchAiAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await aiAnalysisApi.getAnalysis('HP-9042');
      setData(res.data || mockAiAnalysisData);
    } catch (err) {
      console.warn('AI Analysis Axios fallback:', err);
      setData(mockAiAnalysisData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAiAnalysis();
  }, []);

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-xs font-semibold shadow-2xl flex items-center gap-2.5 backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & Neural Intelligence Control Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-cyan-950/40 border border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="space-y-2 max-w-3xl relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2">
              <Brain className="w-4 h-4 text-cyan-400 animate-pulse" />
              ForgeMind Sentinel AI Core v4.2
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-xs border border-emerald-500/30">
              ISO-45001 Verified Diagnostic
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Multi-Agent Neural Hazard & Risk Sentinel</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Real-time computer vision thermal bounding, 10,000 Hz acoustic FFT spectrum decomposition, and predictive downtime failure inference for <span className="text-cyan-300 font-semibold">{data.assetName} ({data.assetId})</span>.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10 shrink-0">
          <button
            onClick={fetchAiAnalysis}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition"
            title="Refetch AI Diagnostics API"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>

          <button
            onClick={() => showToast(`Work Order Ticket WO-9902 generated for ${data.assetId} and dispatched!`)}
            className="px-3.5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 text-xs font-bold flex items-center gap-2 transition hover:scale-[1.02]"
          >
            <Ticket className="w-4 h-4 text-rose-400" />
            <span>Generate Ticket</span>
          </button>

          <button
            onClick={() => showToast('AI Diagnostic Executive PDF Report generated & queued for download.')}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition hover:scale-[1.02]"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Generate PDF</span>
          </button>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition hover:scale-[1.02]"
          >
            <FileText className="w-4 h-4 text-cyan-100" />
            <span>Generate Full Report</span>
          </button>
        </div>
      </motion.div>

      {/* Error Alert with Retry */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchAiAnalysis}
            className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 font-bold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AiAnalysisSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* HERO GRID: Left Image Card with Overlays / Right Animated Circular Progress Rings & Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (5 cols): Incident Image Card */}
              <div className="lg:col-span-5">
                <HazardVisualCard
                  image={data.incidentImage}
                  overlays={data.boundingOverlays}
                  assetName={data.assetName}
                  assetId={data.assetId}
                  zone={data.zone}
                />
              </div>

              {/* Right Column (7 cols): Animated Circular Progress Ring Gauges & Key Badges */}
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Circular Gauge 1: AI Confidence Score */}
                  <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl flex flex-col items-center justify-center space-y-3 relative overflow-hidden group">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>AI Model Confidence</span>
                    </div>

                    <CircularProgressRing
                      value={data.confidenceScore}
                      size={130}
                      strokeWidth={10}
                      colorVariant="cyan"
                      label="Confidence"
                      unit="%"
                    />

                    <span className="text-[11px] text-slate-400 font-mono">
                      Neural Computer Vision Verified
                    </span>
                  </div>

                  {/* Circular Gauge 2: Risk Score Meter */}
                  <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl flex flex-col items-center justify-center space-y-3 relative overflow-hidden group">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
                      <ShieldAlert className="w-4 h-4 text-rose-400" />
                      <span>Catastrophic Risk Score</span>
                    </div>

                    <CircularProgressRing
                      value={data.riskScore}
                      size={130}
                      strokeWidth={10}
                      colorVariant="rose"
                      label="Critical Risk"
                      unit="/100"
                    />

                    <span className="text-[11px] text-rose-300 font-mono font-bold animate-pulse">
                      Urgent Dispatch Required
                    </span>
                  </div>
                </div>

                {/* Second Row: Severity Badge & Estimated Downtime ROI */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Severity Badge Card */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/30 backdrop-blur-xl shadow-xl flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-mono uppercase">CLASSIFIED SEVERITY</span>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                          {data.severity}
                        </span>
                      </div>
                    </div>
                    <ShieldAlert className="w-8 h-8 text-rose-500/60 shrink-0" />
                  </div>

                  {/* Estimated Downtime ROI Card */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 backdrop-blur-xl shadow-xl flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-mono uppercase">PREVENTED DOWNTIME ROI</span>
                      <div className="text-sm font-extrabold text-white font-mono">{data.estimatedDowntime}</div>
                      <div className="text-[10px] text-emerald-400 font-mono font-bold">{data.preventedDowntimeROI}</div>
                    </div>
                    <Award className="w-8 h-8 text-emerald-400/60 shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* AI INTELLIGENCE MATRIX: 3-Column Intelligence Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Card 1: Detected Hazard */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md space-y-2">
                <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-wider block">
                  01 • DETECTED HAZARD
                </span>
                <h3 className="text-sm font-bold text-slate-100 leading-snug">
                  {data.detectedHazard}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  Identified via thermal infrared spectrum & 10,000 Hz vibration acoustic FFT decomposition.
                </p>
              </div>

              {/* Card 2: AI Root Cause Diagnosis */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md space-y-2">
                <span className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider block">
                  02 • AI ROOT CAUSE DIAGNOSIS
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {data.rootCause}
                </p>
              </div>

              {/* Card 3: Recommended Action */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-xl backdrop-blur-md space-y-2">
                <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider block">
                  03 • RECOMMENDED ACTION
                </span>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  {data.recommendedAction}
                </p>
              </div>
            </div>

            {/* SAFETY CHECKLIST & AI EXECUTIVE BRIEFING */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (6 cols): Safety Checklist */}
              <div className="lg:col-span-6">
                <SafetyChecklist initialItems={data.safetyChecklist} />
              </div>

              {/* Right Column (6 cols): AI Summary Briefing */}
              <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-sm font-bold text-slate-100">AI Executive Sentinel Summary</h3>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Axios API Linked Engine</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-normal">
                    {data.aiSummary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Target Asset: <span className="text-cyan-400">{data.assetId}</span></span>
                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="text-cyan-400 font-semibold hover:underline flex items-center gap-1"
                  >
                    Full Spectrum Report <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* AI Diagnostic Inference Timeline */}
            <AiInferenceTimeline timeline={data.timeline} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL AI REPORT DRAWER MODAL */}
      <AnimatePresence>
        {isReportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReportModalOpen(false)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">Full Multi-Agent AI Sentinel Report</h3>
                    <p className="text-xs text-slate-400 font-mono">Report ID: REP-2026-089 • Asset: {data.assetId}</p>
                  </div>
                </div>
                <button onClick={() => setIsReportModalOpen(false)} className="p-1.5 rounded-xl text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 my-4 text-xs">
                <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">CONFIDENCE</span>
                    <span className="font-bold text-cyan-400">{data.confidenceScore}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">CATASTROPHIC RISK</span>
                    <span className="font-bold text-rose-400">{data.riskScore}/100</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">DOWNTIME ROI</span>
                    <span className="font-bold text-emerald-400">{data.preventedDowntimeROI}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-200 text-xs font-mono uppercase tracking-wider">
                    Executive Diagnostic Narrative
                  </h4>
                  <p className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-line">
                    {data.aiSummary}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-slate-800">
                <button
                  onClick={() => {
                    showToast('Full Diagnostic Report PDF downloaded');
                    setIsReportModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Report PDF</span>
                </button>
                <button
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Close Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
