import React, { createContext, useContext, useState } from 'react';

const CopilotContext = createContext();

const initialMessages = [
  {
    id: "msg-1",
    sender: "system",
    text: "ForgeMind Sentinel AI Copilot online. Monitoring 4 active factory zones, 52 visual AI video streams, and 1,480 telemetry sensors.",
    timestamp: "11:40 AM"
  },
  {
    id: "msg-2",
    sender: "ai",
    text: "CRITICAL DIAGNOSIS: Hydraulic Press HP-9042 drive shaft bearing SKF-6210 exhibits thermal runaway (184.2°C) combined with FFT vibration harmonic spike at 240Hz. RUL estimated at 35 minutes before mechanical seizure.",
    timestamp: "11:42 AM",
    suggestedActions: [
      { id: "act-1", title: "Generate P1 Maintenance Ticket", type: "ticket" },
      { id: "act-2", title: "Notify Mechanical Specialist (Tier 2)", type: "notify" },
      { id: "act-3", title: "Inspect Visual CCTV Feed (CAM-02)", type: "navigate", url: "/hazards/HAZ-9042" }
    ]
  }
];

export const CopilotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [activeContextItem, setActiveContextItem] = useState(null);

  const toggleCopilot = () => setIsOpen(prev => !prev);

  const sendMessage = (text) => {
    const userMsg = {
      id: `msg-user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // AI Intelligent Response Simulation
    setTimeout(() => {
      let aiResponseText = "Analyzing plant telemetry datasets and visual AI models...";
      let actions = [];

      const lower = text.toLowerCase();
      if (lower.includes("vibration") || lower.includes("hp-9042") || lower.includes("press")) {
        aiResponseText = "HP-9042 vibration frequency is currently 8.4 mm/s (336% above baseline). Main bearing lubrication breakdown confirmed. RUL calculation shows 18% remaining useful life.";
        actions = [
          { id: "act-t1", title: "Dispatch Emergency Lubrication Team", type: "ticket" },
          { id: "act-t2", title: "View Asset Telemetry", type: "navigate", url: "/telemetry/HP-9042" }
        ];
      } else if (lower.includes("ppe") || lower.includes("safety") || lower.includes("hard hat")) {
        aiResponseText = "Camera CAM-01 flagged personnel EMP-4029 without Class E helmet in Zone A Stamping Bay. Speaker broadcast alert dispatched at 11:30 AM.";
        actions = [
          { id: "act-p1", title: "Open Camera CAM-01 Feed", type: "navigate", url: "/hazards" }
        ];
      } else if (lower.includes("ticket") || lower.includes("work order")) {
        aiResponseText = "There are currently 4 active work orders in the queue. 1 P1 Critical (HP-9042), 1 P2 High (CNC-402), 1 P3 Medium, and 1 P4 Low.";
        actions = [
          { id: "act-k1", title: "Open Ticket Kanban Board", type: "navigate", url: "/tickets" }
        ];
      } else {
        aiResponseText = `ForgeMind AI processed request regarding "${text}". All secondary sub-systems in Zone C & D operating within normal ISO-45001 thresholds.`;
      }

      const aiMsg = {
        id: `msg-ai-${Date.now()}`,
        sender: "ai",
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: actions
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <CopilotContext.Provider
      value={{
        isOpen,
        setIsOpen,
        toggleCopilot,
        messages,
        sendMessage,
        isTyping,
        activeContextItem,
        setActiveContextItem
      }}
    >
      {children}
    </CopilotContext.Provider>
  );
};

export const useCopilot = () => useContext(CopilotContext);
