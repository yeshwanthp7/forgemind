import React from 'react';
import { TicketPriorityBadge } from './TicketPriorityBadge';
import { Clock, User, Package, ChevronRight, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export const TicketKanbanBoard = ({ tickets = [], onTicketClick }) => {
  const columns = [
    { id: 'Open', title: 'Open Backlog', color: 'border-cyan-500/30' },
    { id: 'In Progress', title: 'Active Dispatch', color: 'border-amber-500/30' },
    { id: 'Review', title: 'QA & Compliance Review', color: 'border-violet-500/30' },
    { id: 'Resolved', title: 'Resolved & Closed', color: 'border-emerald-500/30' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {columns.map((col) => {
        const colTickets = tickets.filter(t => t.status === col.id);
        return (
          <div key={col.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col h-full min-h-[500px]">
            {/* Column Header */}
            <div className={`flex items-center justify-between pb-3 mb-3 border-b ${col.color}`}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">{col.title}</h4>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] font-bold">
                {colTickets.length}
              </span>
            </div>

            {/* Column Cards */}
            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {colTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => onTicketClick && onTicketClick(ticket)}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all duration-200 shadow-md group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{ticket.id}</span>
                    <TicketPriorityBadge priority={ticket.priority} />
                  </div>

                  <h5 className="text-xs font-bold text-slate-100 mb-2 leading-snug group-hover:text-cyan-300 transition">
                    {ticket.title}
                  </h5>

                  <p className="text-[11px] text-slate-400 mb-3 line-clamp-2">{ticket.aiGeneratedNotes}</p>

                  {/* Required Parts List Tags */}
                  {ticket.requiredParts && ticket.requiredParts.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {ticket.requiredParts.map((part, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 text-[9px] font-mono border border-slate-800 flex items-center gap-1">
                          <Package className="w-2.5 h-2.5 text-cyan-400" /> {part}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={ticket.technicianAvatar}
                        alt={ticket.assignedTechnician}
                        className="w-4 h-4 rounded-full object-cover border border-slate-700"
                      />
                      <span className="truncate max-w-[100px]">{ticket.assignedTechnician}</span>
                    </div>
                    <span className="font-mono text-slate-400">{ticket.estimatedTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
