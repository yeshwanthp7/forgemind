import React from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Activity,
  ShieldAlert,
  Wrench,
  Clock,
  FileCheck2,
  TrendingUp,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';

export const StatCardsGrid = ({ stats }) => {
  const cards = [
    {
      title: 'Total Machines',
      value: stats.totalMachines,
      unit: 'Assets',
      subtitle: stats.totalMachinesTrend,
      icon: Server,
      accentColor: 'from-blue-500/20 to-cyan-500/5',
      borderColor: 'border-blue-500/30',
      iconBg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      trend: '+4.2%',
      trendPositive: true
    },
    {
      title: 'Active Machines',
      value: stats.activeMachines,
      unit: 'Running',
      subtitle: stats.activeMachinesRate,
      icon: Activity,
      accentColor: 'from-emerald-500/20 to-teal-500/5',
      borderColor: 'border-emerald-500/30',
      iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      trend: '91.8% OEE',
      trendPositive: true
    },
    {
      title: 'Critical Incidents',
      value: stats.criticalIncidents,
      unit: 'P1 Active',
      subtitle: stats.criticalIncidentsSubtitle,
      icon: ShieldAlert,
      accentColor: 'from-rose-500/20 to-red-500/5',
      borderColor: 'border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.15)]',
      iconBg: 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse',
      trend: 'P1 Dispatch',
      trendPositive: false,
      isAlert: true
    },
    {
      title: 'Pending Maintenance',
      value: stats.pendingMaintenance,
      unit: 'Orders',
      subtitle: stats.pendingMaintenanceSubtitle,
      icon: Wrench,
      accentColor: 'from-amber-500/20 to-yellow-500/5',
      borderColor: 'border-amber-500/30',
      iconBg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      trend: '3 Overdue',
      trendPositive: false
    },
    {
      title: "Today's Incidents",
      value: stats.todaysIncidents,
      unit: 'Logged',
      subtitle: stats.todaysIncidentsTrend,
      icon: Clock,
      accentColor: 'from-purple-500/20 to-indigo-500/5',
      borderColor: 'border-purple-500/30',
      iconBg: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
      trend: '-30% Yday',
      trendPositive: true
    },
    {
      title: 'AI Reports Generated',
      value: stats.aiReportsGenerated,
      unit: 'Audits',
      subtitle: stats.aiReportsTrend,
      icon: FileCheck2,
      accentColor: 'from-cyan-500/20 to-teal-500/5',
      borderColor: 'border-cyan-500/30',
      iconBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
      trend: 'ISO-45001',
      trendPositive: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
    >
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-b ${card.accentColor} bg-slate-900 border ${card.borderColor} p-4 backdrop-blur-xl transition-all shadow-lg hover:shadow-2xl group`}
          >
            {/* Background ambient glow */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-cyan-500/5 blur-2xl group-hover:bg-cyan-500/10 transition" />

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider truncate">
                {card.title}
              </span>
              <div className={`p-2 rounded-xl border ${card.iconBg} shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl lg:text-3xl font-extrabold text-white font-mono tracking-tight">
                {card.value}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 font-mono">
                {card.unit}
              </span>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-1 text-[11px]">
              <span className="text-slate-400 truncate max-w-[110px]" title={card.subtitle}>
                {card.subtitle}
              </span>

              <span
                className={`px-1.5 py-0.5 rounded font-mono font-bold text-[10px] flex items-center gap-1 shrink-0 ${
                  card.isAlert
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : card.trendPositive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                }`}
              >
                {card.trendPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {card.trend}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
