import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, Activity, Wrench, AlertTriangle, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockAssets } from '../../data/mockAssets';
import { mockCameras } from '../../data/mockCameras';
import { mockTickets } from '../../data/mockTickets';

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const filteredAssets = mockAssets.filter(a => a.name.toLowerCase().includes(query.toLowerCase()) || a.id.toLowerCase().includes(query.toLowerCase()));
  const filteredCameras = mockCameras.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.id.toLowerCase().includes(query.toLowerCase()));
  const filteredTickets = mockTickets.filter(t => t.title.toLowerCase().includes(query.toLowerCase()) || t.id.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-2xl overflow-hidden z-10"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3 border-b border-slate-800 bg-slate-950/50">
            <Search className="w-5 h-5 text-cyan-400 mr-3" />
            <input
              autoFocus
              type="text"
              placeholder="Search assets, cameras, tickets, or type a command..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
            />
            <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-96 overflow-y-auto p-3 space-y-4">
            {/* Quick Actions */}
            {!query && (
              <div>
                <div className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Quick Actions
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => handleSelect('/hazards/HAZ-9042')}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/20 text-rose-300 hover:bg-rose-900/40 text-xs font-semibold transition"
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>Inspect Active P1 Hazard (HP-9042 Thermal Overheat)</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Assets */}
            {filteredAssets.length > 0 && (
              <div>
                <div className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Factory Assets
                </div>
                <div className="space-y-1">
                  {filteredAssets.map(asset => (
                    <button
                      key={asset.id}
                      onClick={() => handleSelect(`/telemetry/${asset.id}`)}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-xs text-slate-200 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <Activity className="w-4 h-4 text-cyan-400" />
                        <span className="font-semibold">{asset.name}</span>
                        <span className="text-slate-500">({asset.id})</span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${asset.status === 'critical' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {asset.status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cameras */}
            {filteredCameras.length > 0 && (
              <div>
                <div className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Visual AI Cameras
                </div>
                <div className="space-y-1">
                  {filteredCameras.map(cam => (
                    <button
                      key={cam.id}
                      onClick={() => handleSelect('/hazards')}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-xs text-slate-200 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <Eye className="w-4 h-4 text-blue-400" />
                        <span>{cam.name}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-[10px]">{cam.resolution}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tickets */}
            {filteredTickets.length > 0 && (
              <div>
                <div className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Work Orders
                </div>
                <div className="space-y-1">
                  {filteredTickets.map(ticket => (
                    <button
                      key={ticket.id}
                      onClick={() => handleSelect('/tickets')}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-xs text-slate-200 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <Wrench className="w-4 h-4 text-violet-400" />
                        <span className="truncate max-w-xs">{ticket.title}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-[10px]">{ticket.priority}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
