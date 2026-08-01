import React, { useState } from 'react';
import { Plus, Search, MessageSquare, Brain, User, Trash2, ChevronLeft } from 'lucide-react';

export const ChatHistorySidebar = ({
  threads,
  activeThreadId,
  onSelectThread,
  onNewChat,
  onClearHistory
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredThreads = threads.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const todayThreads = filteredThreads.filter((t) => t.category === 'Today');
  const pastThreads = filteredThreads.filter((t) => t.category !== 'Today');

  return (
    <div className="w-full lg:w-72 bg-slate-950 border-r border-slate-800 flex flex-col h-full shrink-0">
      {/* Top Header & New Chat Button */}
      <div className="p-4 border-b border-slate-800 space-y-3">
        <button
          onClick={onNewChat}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>New Conversation</span>
        </button>

        {/* Search Threads Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search chat history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/60 font-mono"
          />
        </div>
      </div>

      {/* Threads List Scroll Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-mono scrollbar-thin scrollbar-thumb-slate-800">
        {/* Today's Threads */}
        {todayThreads.length > 0 && (
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold px-2 block">
              Today
            </span>
            {todayThreads.map((t) => (
              <button
                key={t.id}
                onClick={() => onSelectThread(t.id)}
                className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between gap-2 transition ${
                  activeThreadId === t.id
                    ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-bold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${activeThreadId === t.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className="truncate">{t.title}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Previous Threads */}
        {pastThreads.length > 0 && (
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold px-2 block">
              Previous 7 Days
            </span>
            {pastThreads.map((t) => (
              <button
                key={t.id}
                onClick={() => onSelectThread(t.id)}
                className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between gap-2 transition ${
                  activeThreadId === t.id
                    ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-bold'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${activeThreadId === t.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className="truncate">{t.title}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer User Profile Card */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5 truncate">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt="Cmdr. Alex Vance"
            className="w-8 h-8 rounded-full border border-slate-700 object-cover shrink-0"
          />
          <div className="truncate text-xs font-mono">
            <div className="font-bold text-slate-200 truncate">Cmdr. Alex Vance</div>
            <div className="text-[10px] text-slate-500 truncate">Senior Director</div>
          </div>
        </div>

        <button
          onClick={onClearHistory}
          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition shrink-0"
          title="Clear Conversation History"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
