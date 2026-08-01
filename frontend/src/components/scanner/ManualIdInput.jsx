import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Keyboard, Search, ArrowRight, Sparkles } from 'lucide-react';

export const ManualIdInput = ({ onSubmitId }) => {
  const [inputVal, setInputVal] = useState('');

  const suggestionChips = [
    { id: 'HP-9042', name: 'Stamping Press 04' },
    { id: 'CNC-4081', name: '5-Axis CNC Milling' },
    { id: 'SB-109', name: 'Steam Boiler 01' },
    { id: 'RA-88', name: 'Welding Robot B' },
    { id: 'CP-204', name: 'Centrifugal Pump' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSubmitId(inputVal.trim().toUpperCase());
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 max-w-lg mx-auto text-left"
    >
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
          <Keyboard className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-100">Manual Machine ID Lookup</h3>
          <p className="text-xs text-slate-400">Direct query equipment register by asset ID</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
            ENTER MACHINE / ASSET ID
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              required
              placeholder="e.g. HP-9042 or CNC-4081"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-3 text-sm text-cyan-300 font-mono focus:outline-none focus:border-cyan-500/60"
            />
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-slate-500 uppercase">
            OR CLICK SAMPLE ASSET CHIP:
          </span>
          <div className="flex flex-wrap gap-2">
            {suggestionChips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => {
                  setInputVal(chip.id);
                  onSubmitId(chip.id);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono font-semibold transition hover:border-cyan-500/40"
              >
                <span className="text-cyan-400 font-bold">{chip.id}</span>
                <span className="text-slate-500 ml-1">({chip.name})</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition"
        >
          <span>Query Equipment Registry</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
};
