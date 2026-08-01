import React from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LiveHazardsFeed = ({ hazards, onApproveIncident, onPriorityChange }) => {
  const navigate = useNavigate();

  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Live Hazards Feed & EHS Incident Approval Matrix
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          {hazards.length} Hazards Pending Approval
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider">
              <th className="pb-2 font-semibold">Hazard Ref</th>
              <th className="pb-2 font-semibold">Location</th>
              <th className="pb-2 font-semibold">Detected Hazard</th>
              <th className="pb-2 font-semibold">Priority Rating</th>
              <th className="pb-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {hazards.map((h) => (
              <tr key={h.id} className="hover:bg-slate-950/60 transition">
                <td className="py-3 font-bold text-cyan-400">{h.id}</td>
                <td className="py-3 text-white font-bold">{h.location}</td>
                <td className="py-3 text-slate-300 max-w-[200px] truncate" title={h.title}>
                  {h.title}
                </td>
                <td className="py-3">
                  <select
                    value={h.priority}
                    onChange={(e) => onPriorityChange(h.id, e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-cyan-300 font-bold focus:outline-none"
                  >
                    <option value="Critical P1">Critical P1</option>
                    <option value="High P2">High P2</option>
                    <option value="Nominal P4">Nominal P4</option>
                  </select>
                </td>
                <td className="py-3">
                  {h.status === 'Approved' ? (
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3" /> Approved & Dispatched
                    </span>
                  ) : (
                    <button
                      onClick={() => onApproveIncident(h.id)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[11px] font-bold flex items-center gap-1 shadow-md transition"
                    >
                      <Send className="w-3 h-3" />
                      Approve Incident
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
