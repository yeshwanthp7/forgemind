import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTickets } from '../data/mockTickets';
import { TicketKanbanBoard } from '../components/tickets/TicketKanbanBoard';
import { CreateTicketModal } from '../components/tickets/CreateTicketModal';
import { Button } from '../components/ui/Button';
import { Wrench, Plus, Kanban, Table, Filter } from 'lucide-react';
import { TicketPriorityBadge } from '../components/tickets/TicketPriorityBadge';

export const TicketsPage = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(mockTickets);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState('all');

  const handleCreateTicket = (newTicket) => {
    setTickets(prev => [newTicket, ...prev]);
  };

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

      {/* Main View */}
      {viewMode === 'kanban' ? (
        <TicketKanbanBoard
          tickets={filteredTickets}
          onTicketClick={(ticket) => navigate(`/tickets/${ticket.id}`)}
        />
      ) : (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-md overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Work Order ID</th>
                <th className="p-3">Title</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
                <th className="p-3">Assigned Tech</th>
                <th className="p-3">Est. Time</th>
                <th className="p-3">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredTickets.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => navigate(`/tickets/${t.id}`)}
                  className="hover:bg-slate-800/60 cursor-pointer transition"
                >
                  <td className="p-3 font-mono font-bold text-cyan-400">{t.id}</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-100">{t.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{t.assetName} ({t.zone})</div>
                  </td>
                  <td className="p-3">
                    <TicketPriorityBadge priority={t.priority} />
                  </td>
                  <td className="p-3 text-slate-300">{t.status}</td>
                  <td className="p-3 text-slate-300">{t.assignedTechnician}</td>
                  <td className="p-3 font-mono text-slate-400">{t.estimatedTime}</td>
                  <td className="p-3 font-mono text-slate-500">{t.createdAt}</td>
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
