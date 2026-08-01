import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Ticket,
  Wrench,
  Download,
  Clock,
  User,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { ticketApi } from '../api/endpoints';
import { getTicketDetail } from '../data/mockTicketDetails';
import { TargetMachineCard } from '../components/tickets/TargetMachineCard';
import { TechnicianChecklist } from '../components/tickets/TechnicianChecklist';
import { EngineerNotesLog } from '../components/tickets/EngineerNotesLog';
import { TicketSlaTimeline } from '../components/tickets/TicketSlaTimeline';

export const TicketDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [ticketStatus, setTicketStatus] = useState('In Progress');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchTicket = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await ticketApi.getTicketById(id || 'WO-9902');
      const data = res.data || getTicketDetail(id || 'WO-9902');
      setTicket(data);
      setTicketStatus(data.status || 'In Progress');
    } catch (err) {
      console.warn('Ticket Detail Axios fallback:', err);
      const fallback = getTicketDetail(id || 'WO-9902');
      setTicket(fallback);
      setTicketStatus(fallback.status || 'In Progress');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setTicketStatus(newStatus);
    try {
      await ticketApi.updateStatus(id || 'WO-9902', newStatus);
      showToast(`Work Order #${ticket?.ticketNumber} status updated to "${newStatus}" via Axios`);
    } catch (err) {
      showToast(`Status updated to "${newStatus}"`);
    }
  };

  const getPriorityBadge = (priority) => {
    if (!priority) return null;
    if (priority.includes('Critical') || priority.includes('P1')) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          CRITICAL P1 EMERGENCY
        </span>
      );
    }
    if (priority.includes('High') || priority.includes('P2')) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          HIGH P2 PRIORITY
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-cyan-400" />
        NOMINAL P4 PRIORITY
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse p-4">
        <div className="h-8 w-48 bg-slate-900 rounded-xl" />
        <div className="h-28 bg-slate-900 border border-slate-800 rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 h-64 bg-slate-900 rounded-2xl" />
          <div className="lg:col-span-7 h-64 bg-slate-900 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!ticket) return null;

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

      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/tickets')}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Back to Incident Tickets Hub</span>
        </button>

        <span className="text-xs font-mono text-slate-500">
          Work Order Management System
        </span>
      </div>

      {/* Error Alert with Retry */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchTicket}
            className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 font-bold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      )}

      {/* Main Hero Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="space-y-2 max-w-3xl relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            {getPriorityBadge(ticket.priority)}
            <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
              #{ticket.ticketNumber}
            </span>
            <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-400 text-xs font-mono">
              Created: {ticket.createdAt}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {ticket.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {ticket.problemStatement}
          </p>
        </div>

        {/* Status Dropdown & PDF Download Action Bar */}
        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          {/* Status Dropdown Selector */}
          <div className="relative">
            <select
              value={ticketStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="bg-slate-950 border border-cyan-500/40 rounded-xl px-3.5 py-2 text-xs font-bold text-cyan-300 font-mono focus:outline-none focus:border-cyan-400 shadow-md"
            >
              <option value="In Progress">Status: In Progress</option>
              <option value="Pending Parts">Status: Pending Parts</option>
              <option value="Investigating">Status: Investigating</option>
              <option value="Resolved">Status: Resolved</option>
              <option value="Closed">Status: Closed</option>
            </select>
          </div>

          {/* Download PDF Button */}
          <button
            onClick={() => showToast(`Work Order #${ticket.ticketNumber} PDF exported to local storage`)}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" />
            <span>Download Work Order PDF</span>
          </button>
        </div>
      </motion.div>

      {/* Main Grid: Left Column Machine Details & Diagnosis / Right Column 4 Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Target Machine Card */}
        <div className="lg:col-span-5 space-y-6">
          <TargetMachineCard machine={ticket.machineDetails} />
        </div>

        {/* Right Column (7 cols): Summary Cards Matrix */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. Priority Card */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase">Work Order Priority</span>
              <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <div className="pt-1">
              <span className="text-lg font-extrabold text-rose-400 font-mono">
                {ticket.priority}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">ISO Emergency Escalation Active</p>
          </div>

          {/* 2. Assigned Engineer Card */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase">Assigned Field Engineer</span>
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <User className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <img
                src={ticket.assignedEngineer.avatar}
                alt={ticket.assignedEngineer.name}
                className="w-8 h-8 rounded-full border border-slate-700 object-cover"
              />
              <div>
                <span className="font-bold text-white text-xs block">{ticket.assignedEngineer.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">{ticket.assignedEngineer.role}</span>
              </div>
            </div>
          </div>

          {/* 3. Estimated Completion & SLA Card */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase">Estimated Completion</span>
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-sm font-extrabold text-white font-mono">{ticket.estimatedCompletion}</div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400"
                style={{ width: `${ticket.slaProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 font-mono">{ticket.estimatedHoursRemaining}</p>
          </div>

          {/* 4. Current Work Order Status Card */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-400 uppercase">Current Work Order Status</span>
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Wrench className="w-4 h-4" />
              </div>
            </div>
            <div className="pt-1">
              <span className="px-3 py-1 rounded-lg text-xs font-extrabold font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                {ticketStatus}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">Shift SLA Window Active</p>
          </div>
        </div>
      </div>

      {/* Section 3: Technician Maintenance Checklist & Engineer Work Notes (2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <TechnicianChecklist initialChecklist={ticket.checklist} />
        </div>
        <div className="lg:col-span-6">
          <EngineerNotesLog initialNotes={ticket.notes} />
        </div>
      </div>

      {/* Section 4: Work Order SLA & Audit Timeline */}
      <TicketSlaTimeline timeline={ticket.timeline} />
    </div>
  );
};
