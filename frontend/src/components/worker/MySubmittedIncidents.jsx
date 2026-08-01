import React from 'react';
import { FileText, ShieldAlert, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MySubmittedIncidents = ({ incidents }) => {
  const navigate = useNavigate();

  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            My Submitted Shift Incidents
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          {incidents.length} Reported Logs
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider">
              <th className="pb-2 font-semibold">Incident Ref</th>
              <th className="pb-2 font-semibold">Machine</th>
              <th className="pb-2 font-semibold">Headline</th>
              <th className="pb-2 font-semibold">Severity</th>
              <th className="pb-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {incidents.map((inc) => (
              <tr
                key={inc.id}
                onClick={() => navigate(`/tickets/${inc.workOrderId || 'WO-9902'}`)}
                className="hover:bg-slate-950/60 transition cursor-pointer group"
              >
                <td className="py-2.5 font-bold text-cyan-400">{inc.id}</td>
                <td className="py-2.5 text-white font-bold">{inc.machineId}</td>
                <td className="py-2.5 text-slate-300 max-w-[180px] truncate" title={inc.title}>
                  {inc.title}
                </td>
                <td className="py-2.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    inc.severity.includes('Critical') || inc.severity.includes('P1')
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {inc.severity}
                  </span>
                </td>
                <td className="py-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {inc.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
