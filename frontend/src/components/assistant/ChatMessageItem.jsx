import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, User, Copy, Check, Terminal, Code2 } from 'lucide-react';

export const ChatMessageItem = ({ message }) => {
  const [isCopied, setIsCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Helper to format basic markdown-style text
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');

    return lines.map((line, idx) => {
      // H3 headers
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-sm font-bold text-white mt-3 mb-1 font-mono">
            {line.replace('### ', '')}
          </h3>
        );
      }
      // H4 headers
      if (line.startsWith('#### ')) {
        return (
          <h4 key={idx} className="text-xs font-bold text-cyan-300 mt-2.5 mb-1 font-mono">
            {line.replace('#### ', '')}
          </h4>
        );
      }
      // Bullet items
      if (line.startsWith('- ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-300 text-xs my-0.5 leading-relaxed">
            {line.replace('- ', '')}
          </li>
        );
      }
      return (
        <p key={idx} className="text-xs text-slate-300 leading-relaxed my-1">
          {line}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-md ${
          isUser
            ? 'bg-slate-800 text-cyan-300 border border-slate-700'
            : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
        }`}
      >
        {isUser ? (
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt="User"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <Brain className="w-4 h-4" />
        )}
      </div>

      {/* Message Content Container */}
      <div
        className={`p-4 rounded-2xl border backdrop-blur-md space-y-3 ${
          isUser
            ? 'bg-cyan-950/40 border-cyan-500/30 text-slate-100 rounded-tr-none'
            : 'bg-slate-900/90 border-slate-800 text-slate-200 rounded-tl-none shadow-xl'
        }`}
      >
        <div className="flex items-center justify-between gap-4 text-[10px] font-mono text-slate-500 border-b border-slate-800/60 pb-1.5">
          <span className="font-bold text-slate-400">
            {isUser ? 'Cmdr. Alex Vance' : 'ForgeMind AI Sentinel'}
          </span>
          <span>{message.timestamp}</span>
        </div>

        {/* Text Content */}
        <div className="space-y-1">
          {renderFormattedText(message.text)}
        </div>

        {/* Styled Code Block */}
        {message.codeBlock && (
          <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold uppercase">
                <Code2 className="w-3.5 h-3.5" />
                {message.codeBlock.language} Payload
              </span>
              <button
                onClick={() => handleCopyCode(message.codeBlock.code)}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition px-2 py-0.5 rounded bg-slate-950 border border-slate-800"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 overflow-x-auto text-cyan-300 text-[11px] leading-relaxed">
              <code>{message.codeBlock.code}</code>
            </pre>
          </div>
        )}
      </div>
    </motion.div>
  );
};
