import React from 'react';

export const TicketPriorityBadge = ({ priority }) => {
  const styles = {
    'P1 Critical': 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-[0_0_8px_rgba(244,63,94,0.3)] animate-pulse',
    'P2 High': 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    'P3 Medium': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    'P4 Low': 'bg-slate-800 text-slate-400 border-slate-700'
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${styles[priority] || styles['P4 Low']}`}>
      {priority}
    </span>
  );
};
