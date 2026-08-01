import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Paperclip,
  Trash2,
  Brain,
  Sparkles,
  Menu,
  X,
  Bot,
  Terminal,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { mockAiAssistantData } from '../data/mockAiAssistantData';
import { assistantApi } from '../api/endpoints';
import { ChatHistorySidebar } from '../components/assistant/ChatHistorySidebar';
import { ChatMessageItem } from '../components/assistant/ChatMessageItem';
import { SuggestedPrompts } from '../components/assistant/SuggestedPrompts';
import { TypingIndicator } from '../components/assistant/TypingIndicator';

export const AiAssistantPage = () => {
  const [threads, setThreads] = useState(mockAiAssistantData.threads);
  const [activeThreadId, setActiveThreadId] = useState('thread-1');
  const [messages, setMessages] = useState(mockAiAssistantData.initialMessages);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const messagesEndRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Auto scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleNewChat = () => {
    setMessages([]);
    setActiveThreadId(null);
    showToast('New AI conversation started.');
  };

  const handleSelectThread = (threadId) => {
    setActiveThreadId(threadId);
    if (threadId === 'thread-1') {
      setMessages(mockAiAssistantData.initialMessages);
    } else {
      setMessages([
        {
          id: 'm-start',
          sender: 'ai',
          text: `### 🧠 Loaded Archived Thread #${threadId}\n\nContinuing conversation regarding historical telemetry metrics and ISO-45001 safety compliance.`,
          timestamp: 'Archived'
        }
      ]);
    }
    setIsMobileSidebarOpen(false);
  };

  const handleClearHistory = () => {
    setThreads([]);
    setMessages([]);
    showToast('Conversation history cleared.');
  };

  const handleSendPrompt = async (promptText) => {
    const query = promptText || inputVal;
    if (!query.trim()) return;

    // Create user message
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    try {
      const res = await assistantApi.sendMessage(query.trim(), activeThreadId);
      
      let aiReplyText = res.data?.reply || mockAiAssistantData.cannedResponses.default;
      let codeBlock = null;

      if (query.toLowerCase().includes('loto') || query.toLowerCase().includes('safety') || query.toLowerCase().includes('checklist')) {
        aiReplyText = mockAiAssistantData.cannedResponses.loto;
      } else if (query.toLowerCase().includes('hp-9042') || query.toLowerCase().includes('thermal') || query.toLowerCase().includes('vibration')) {
        aiReplyText = `### 🚨 Neural Telemetry Diagnostic — HP-9042\n\nHigh-frequency 10,000 Hz acoustic sensors indicate an elevated outer race bearing fault frequency at **12.4 Hz**.\n\n- **Thermal Rating**: 184.2°C Hotspot Detected.\n- **Recommended Action**: Lockout hydraulic lines and initiate SKF-6210 bearing swap.`;
        codeBlock = {
          language: "json",
          code: `{\n  "device_id": "HP-9042",\n  "alarm": "BEARING_THERMAL_CASCADE",\n  "status": "LOCKOUT_REQUIRED"\n}`
        };
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        codeBlock,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      showToast('Error communicating with AI Sentinel. Switched to offline response.');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] rounded-2xl bg-slate-900 border border-slate-800 backdrop-blur-xl shadow-2xl overflow-hidden relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-200 text-xs font-semibold shadow-2xl flex items-center gap-2.5 backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Conversation History Sidebar */}
      <div className="hidden lg:block">
        <ChatHistorySidebar
          threads={threads}
          activeThreadId={activeThreadId}
          onSelectThread={handleSelectThread}
          onNewChat={handleNewChat}
          onClearHistory={handleClearHistory}
        />
      </div>

      {/* Mobile History Drawer */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="relative w-72 bg-slate-950 z-10 h-full"
            >
              <ChatHistorySidebar
                threads={threads}
                activeThreadId={activeThreadId}
                onSelectThread={handleSelectThread}
                onNewChat={handleNewChat}
                onClearHistory={handleClearHistory}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Center Main Chat Viewport */}
      <div className="flex-1 flex flex-col h-full bg-slate-950/50 relative overflow-hidden">
        {/* Top Control Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
              <Brain className="w-4.5 h-4.5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100">ForgeMind Sentinel AI Assistant</h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold">
                  Sentinel-4o Neural
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                10,000 Hz Telemetry Stream Linked • Multi-Agent Core
              </p>
            </div>
          </div>

          <button
            onClick={() => setMessages([])}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
            title="Clear Chat Viewport"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>

        {/* Chat Message Scroll Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin scrollbar-thumb-slate-800">
          {messages.length === 0 ? (
            <SuggestedPrompts
              prompts={mockAiAssistantData.suggestedPrompts}
              onSelectPrompt={handleSendPrompt}
            />
          ) : (
            messages.map((msg) => <ChatMessageItem key={msg.id} message={msg} />)
          )}

          {/* Typing Indicator */}
          {isTyping && <TypingIndicator />}

          {/* Dummy element for Auto Scroll */}
          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Chat Input Dock */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 backdrop-blur-md shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt();
            }}
            className="flex items-end gap-3 max-w-4xl mx-auto"
          >
            <div className="relative grow bg-slate-950 border border-slate-800 rounded-2xl focus-within:border-cyan-500/60 shadow-inner">
              <textarea
                rows={2}
                placeholder="Ask ForgeMind AI about machine thermal spikes, ISO safety checklists, or MTTR analytics..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendPrompt();
                  }
                }}
                className="w-full bg-transparent p-3 text-xs text-slate-100 focus:outline-none resize-none leading-relaxed"
              />

              <div className="flex items-center justify-between px-3 pb-2 text-[10px] font-mono text-slate-500">
                <span className="hidden sm:inline">Press Enter to send • Shift + Enter for new line</span>
                <button
                  type="button"
                  onClick={() => showToast('Telemetry CSV file attached to prompt context.')}
                  className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Attach Telemetry Log</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-slate-950 font-bold transition shadow-lg shadow-cyan-500/25 shrink-0"
              title="Send Message"
            >
              <Send className="w-5 h-5 text-slate-950" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
