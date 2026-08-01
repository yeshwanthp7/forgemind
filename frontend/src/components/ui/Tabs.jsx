import React from 'react';

export const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex p-1 space-x-1 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 ${
              isActive
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
