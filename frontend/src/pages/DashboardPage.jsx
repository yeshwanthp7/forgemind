import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Factory,
  ShieldAlert,
  Activity,
  Award,
  Zap,
  Bot,
  AlertTriangle,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { dashboardApi } from '../api/endpoints';
import { mockDashboardData } from '../data/mockDashboardData';
import { QuickActionsBar } from '../components/dashboard/QuickActionsBar';
import { StatCardsGrid } from '../components/dashboard/StatCardsGrid';
import { DashboardCharts } from '../components/dashboard/DashboardCharts';
import { RecentIncidentsTable } from '../components/dashboard/RecentIncidentsTable';
import { MaintenanceAlerts } from '../components/dashboard/MaintenanceAlerts';
import { LatestAiReports } from '../components/dashboard/LatestAiReports';
import { ActivityTimeline } from '../components/dashboard/ActivityTimeline';
import { DashboardSkeleton } from '../components/dashboard/DashboardSkeleton';
import { Button } from '../components/ui/Button';
import { useCopilot } from '../context/CopilotContext';

export const DashboardPage = () => {
  const [data, setData] = useState(mockDashboardData);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const { toggleCopilot } = useCopilot();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await dashboardApi.getOverview();
      setData(res.data || mockDashboardData);
    } catch (err) {
      console.warn('Dashboard Axios call fallback:', err);
      // Fallback data if error
      setData(mockDashboardData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await dashboardApi.getOverview();
      setData(res.data || mockDashboardData);
      showToast('Dashboard telemetry refreshed via Axios API.');
    } catch (err) {
      showToast('Refreshed using local telemetry cache.');
    } finally {
      setIsRefreshing(false);
    }
  };

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

      {/* Top Banner Executive Factory Overview */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-cyan-950/40 border border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden"
      >
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="space-y-2 max-w-3xl relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              ForgeMind Sentinel Command Core v4.2
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[11px] border border-slate-700">
              ISO-45001 COMPLIANT
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Factory className="w-8 h-8 text-cyan-400" />
            <span>Industrial Factory Operations Command Center</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Real-time acoustic vibration telemetry, visual AI surveillance, predictive maintenance dispatch, and hazard prevention across 5 production zones.
          </p>
        </div>

        {/* Action Controls & Simulator */}
        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          <button
            onClick={fetchDashboardData}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition flex items-center gap-2"
            title="Re-query API"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refetch API Data</span>
          </button>

          <Button variant="glass" icon={Bot} onClick={toggleCopilot}>
            AI Copilot Assistant
          </Button>
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
            onClick={fetchDashboardData}
            className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 font-bold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      )}

      {/* Main Dashboard Content */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DashboardSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Quick Actions Bar */}
            <QuickActionsBar onRefresh={handleRefresh} isRefreshing={isRefreshing} />

            {/* 6 Statistics Cards Grid */}
            <section className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                  Factory Key Performance Metrics
                </h2>
                <span className="text-[11px] text-slate-500 font-mono">Axios API Live Telemetry</span>
              </div>
              <StatCardsGrid stats={data.overviewStats} />
            </section>

            {/* Analytics & Performance Charts Matrix */}
            <section className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                  Factory Visual Analytics & Risk Distribution
                </h2>
                <span className="text-[11px] text-slate-500 font-mono">30-Day Predictive Analysis</span>
              </div>
              <DashboardCharts
                incidentTrend={data.incidentTrend}
                riskDistribution={data.riskDistribution}
                machineHealthByZone={data.machineHealthByZone}
                monthlyMaintenance={data.monthlyMaintenance}
              />
            </section>

            {/* Middle Section: Recent Incidents Table + Live Maintenance Telemetry Alerts */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentIncidentsTable incidents={data.recentIncidents} />
              </div>
              <div className="lg:col-span-1">
                <MaintenanceAlerts alerts={data.maintenanceAlerts} />
              </div>
            </section>

            {/* Bottom Section: AI Reports + Recent Activity Timeline */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LatestAiReports reports={data.aiReports} />
              <ActivityTimeline activities={data.recentActivity} />
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
