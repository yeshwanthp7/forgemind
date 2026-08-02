import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TicketKanbanBoard } from '../components/tickets/TicketKanbanBoard';
import { CreateTicketModal } from '../components/tickets/CreateTicketModal';
import { Button } from '../components/ui/Button';
import { Wrench, Plus, Kanban, Table, Filter, AlertTriangle, Loader2 } from 'lucide-react';
import { ticketApi } from '../api/endpoints';

const toDateLabel = (value) => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString();
};

const normalizeTicket = (ticket) => {
  const ai = ticket?.aiAnalysis || ticket?.incident?.aiAnalysis || {};
  const priority = ticket?.priority || ai?.severity || 'P4 Low';
  const machineName = typeof ticket?.machine === 'object' ? ticket.machine?.name : (ticket?.machine || 'General Equipment');
  const createdAt = ticket?.createdAt || ticket?.created_at;

  return {
    ...ticket,
    id: ticket?._id || ticket?.id || ticket?.ticketId,
    ticketId: ticket?.ticketId || ticket?._id || ticket?.id,
    machineName: machineName || '—',
    incidentDescription: ticket?.description || ai?.recommendation || '—',
    title: ticket?.title || ticket?.description || 'Maintenance Work Order',
    priority,
    status: ticket?.status || 'Open',
    assignedTechnician: ticket?.assignedTo || 'Maintenance Team',
    estimatedTime: ticket?.estimatedDowntime || (ai?.riskScore >= 80 ? '4.5 Hours' : '1.5 Hours'),
    createdAt,
    createdAtLabel: toDateLabel(createdAt),
    aiGeneratedNotes: ai?.recommendation || ticket?.description || 'Automated predictive maintenance ticket',
    technicianAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    requiredParts: ticket?.requiredParts || ["SKF-6210 Bearing", "Mobil SHC Lubricant"],
  };
};

export const TicketsPage = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await ticketApi.getTickets();
      const fetchedTickets = Array.isArray(res?.data?.data)
        ? res.data.data
        : Array.isArray(res?.data)
          ? res.data
          : [];
      setTickets(fetchedTickets.map(normalizeTicket));
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
      setError('Failed to load tickets. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTicket = async (newTicketData) => {
    try {
      const payload = {
        title: newTicketData.title,
        description: newTicketData.notes || newTicketData.title,
        priority: newTicketData.priority,
        assignedTo: newTicketData.assignedTechnician,
        estimatedDowntime: newTicketData.estimatedTime,
        status: 'Open',
      };
      const res = await ticketApi.createTicket(payload);
      const created = res?.data?.data || res?.data;
      if (created) {
        setTickets(prev => [normalizeTicket(created), ...prev]);
      } else {
        fetchTickets();
      }
    } catch (err) {
      console.error('Error creating ticket:', err);
      setTickets(prev => [normalizeTicket(newTicketData), ...prev]);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);


  const filteredTickets = tickets.filter(t => priorityFilter === 'all' || t.priority === priorityFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Wrench className="w-5 h-5 text-cyan-400" />
            <span>Automated Maintenance Ticket & Work-Order Manager</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dispatch, track, and assign AI-generated predictive maintenance tickets to field technicians
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded flex items-center gap-1.5 font-semibold transition ${
                viewMode === 'kanban' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30' : 'text-slate-400'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" /> Kanban
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded flex items-center gap-1.5 font-semibold transition ${
                viewMode === 'table' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30' : 'text-slate-400'
              }`}
            >
              <Table className="w-3.5 h-3.5" /> Table Grid
            </button>
          </div>

          <Button variant="primary" icon={Plus} onClick={() => setIsModalOpen(true)}>
            Dispatch New Work Order
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-semibold text-slate-400">Filter Priority:</span>
          <div className="flex p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs">
            {['all', 'P1 Critical', 'P2 High', 'P3 Medium', 'P4 Low'].map((prio) => (
              <button
                key={prio}
                onClick={() => setPriorityFilter(prio)}
                className={`px-2.5 py-1 rounded font-semibold transition ${
                  priorityFilter === prio
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {prio}
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Showing {filteredTickets.length} Work Orders
        </span>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center p-8 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Loading tickets...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-between gap-4 p-4 text-xs border rounded-2xl bg-rose-950/60 border-rose-500/40 text-rose-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          {/* Optionally add a retry button */}
          <button onClick={() => window.location.reload()} className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 font-bold flex items-center gap-1.5">Retry</button>
        </div>
      )}

      {/* Main View */}
      {viewMode === 'kanban' ? (
        <TicketKanbanBoard
          tickets={filteredTickets}
          onTicketClick={(ticket) => navigate(`/tickets/${ticket.id || ticket.ticketId}`)}
        />
      ) : (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-md overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Ticket ID</th>
                <th className="p-3">Machine Name</th>
                <th className="p-3">Incident Description</th>
                <th className="p-3">Status</th>
                <th className="p-3">Assigned To</th>
                <th className="p-3">Estimated Downtime</th>
                <th className="p-3">Created Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredTickets.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => navigate(`/tickets/${t.id}`)}
                  className="hover:bg-slate-800/60 cursor-pointer transition"
                >
                  <td className="p-3 font-mono font-bold text-cyan-400">{t.ticketId}</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-100">{t.machineName}</div>
                  </td>
                  <td className="p-3">
                    <div className="text-slate-300 line-clamp-2">{t.incidentDescription}</div>
                  </td>
                  <td className="p-3 text-slate-300">{t.status}</td>
                  <td className="p-3 text-slate-300">{t.assignedTechnician}</td>
                  <td className="p-3 font-mono text-slate-400">{t.estimatedTime}</td>
                  <td className="p-3 font-mono text-slate-500">{t.createdAtLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitTicket={handleCreateTicket}
      />
    </div>
  );
};
