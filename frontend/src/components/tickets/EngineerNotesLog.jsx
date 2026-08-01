import React, { useState } from 'react';
import { MessageSquare, Send, User, Clock } from 'lucide-react';

export const EngineerNotesLog = ({ initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      const createdNote = {
        id: `note-${Date.now()}`,
        author: 'Cmdr. Alex Vance (Senior Director)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        time: 'Just now',
        content: newNote.trim()
      };
      setNotes((prev) => [createdNote, ...prev]);
      setNewNote('');
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Engineer Work Notes Log</h3>
              <p className="text-[11px] text-slate-400">Technician audit log & shift handover notes</p>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded bg-slate-950 text-purple-300 font-mono text-[10px] border border-slate-800">
            {notes.length} Work Notes
          </span>
        </div>

        {/* Notes Feed */}
        <div className="space-y-3 max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
          {notes.map((note) => (
            <div key={note.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src={note.avatar}
                    alt={note.author}
                    className="w-5 h-5 rounded-full border border-slate-700 object-cover"
                  />
                  <span className="font-bold text-slate-200 text-[11px]">{note.author}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{note.time}</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed pl-7">
                {note.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Note Input */}
      <form onSubmit={handleAddNote} className="pt-3 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          placeholder="Add technician work note or observation..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="grow bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/60"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition shrink-0"
          title="Post Note"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
