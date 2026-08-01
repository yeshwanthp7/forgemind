import React, { useState } from 'react';
import { useCopilot } from '../../context/CopilotContext';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Bot, Send, Sparkles, AlertTriangle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SentinelCopilotDrawer = () => {
  const { isOpen, setIsOpen, messages, sendMessage, isTyping } = useCopilot();
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  const handleActionClick = (action) => {
    if (action.type === 'navigate') {
      navigate(action.url);
      setIsOpen(false);
    } else if (action.type === 'ticket') {
      navigate('/tickets/new');
      setIsOpen(false);
    } else {
      sendMessage(`Executing ${action.title}...`);
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      width="w-[450px]"
      title={
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <Bot className="w-5 h-5" />
          <span>Sentinel AI Copilot</span>
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] uppercase font-mono">
            Neural v4
          </span>
        </div>
      }
    >
      <div className="flex flex-col h-full justify-between gap-4">
        {/* Active Context Banner */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Active Sentinel Context</span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[10px]">
              <ShieldCheck className="w-3 h-3" /> Live Telemetry Linked
            </span>
          </div>
          <p className="text-slate-200 font-medium">Zone B Stamping Bay & CCTV CAM-02 Stream</p>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-cyan-600 text-white rounded-br-none shadow-md shadow-cyan-950'
                    : msg.sender === 'system'
                    ? 'bg-slate-950 text-slate-400 border border-slate-800 rounded-bl-none font-mono'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="flex items-center gap-1.5 mb-1.5 text-cyan-400 font-bold text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sentinel Diagnostic AI</span>
                  </div>
                )}
                <p>{msg.text}</p>

                {/* Suggested Action Pills */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Automated 1-Click Actions:
                    </span>
                    {msg.suggestedActions.map((act) => (
                      <button
                        key={act.id}
                        onClick={() => handleActionClick(act)}
                        className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-850 border border-cyan-500/30 text-cyan-300 hover:text-white text-[11px] font-semibold transition group"
                      >
                        <div className="flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-cyan-400 group-hover:animate-bounce" />
                          <span>{act.title}</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-1 transition transform" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Sentinel AI is analyzing real-time FFT spectrums & visual logs...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="pt-2 border-t border-slate-800">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask Copilot about hazards, RUL predictions, or ticket status..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-4 pr-11 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 transition"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>Powered by ForgeMind Neural Core</span>
            <span>Press Enter to send</span>
          </div>
        </form>
      </div>
    </Drawer>
  );
};
