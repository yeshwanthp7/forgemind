// Detailed Mock Dataset for Maintenance Ticket Detail Page

export const mockTicketDetailsMap = {
  "WO-9902": {
    ticketNumber: "WO-9902",
    title: "Hydraulic Press Bearing Outer Race Replacement",
    priority: "Critical P1",
    status: "In Progress",
    assignedEngineer: {
      name: "R. Vance",
      role: "Senior Mechanical Engineer",
      shift: "Shift Alpha (Zone A)",
      email: "r.vance@forgemind.io",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    estimatedCompletion: "Today, 22:30 UTC",
    estimatedHoursRemaining: "2.5 Hours Remaining",
    slaProgress: 65,
    createdAt: "Today, 18:45 UTC",
    problemStatement: "Acoustic FFT spectrum detected 12.4 Hz vibration harmonic peak. Thermal core elevated to 184.2°C. Outer race bearing pitting identified on secondary hydraulic pump.",
    machineDetails: {
      id: "HP-9042",
      name: "Heavy Hydraulic Stamping Press 04",
      type: "Stamping Press",
      zone: "Zone A - Stamping",
      healthScore: 18,
      temperature: 184.2,
      pressure: 18.4,
      riskLevel: "Critical P1"
    },
    checklist: [
      { id: 1, task: "Verify ISO-13849 Mechanical Lockout / Tagout (LOTO) engaged", isCompleted: true, role: "Lead Engineer" },
      { id: 2, task: "Purge main hydraulic line pressure (UCL < 2.0 Bar)", isCompleted: true, role: "Hydraulic Tech" },
      { id: 3, task: "Disassemble secondary pump bearing retaining collar", isCompleted: true, role: "Maintenance Crew" },
      { id: 4, task: "Install replacement SKF-6210 bearing assembly & torque to 240 Nm", isCompleted: false, role: "Senior Tech" },
      { id: 5, task: "Perform 10-minute trial run & verify thermal baseline (<75°C)", isCompleted: false, role: "Vibration Analyst" }
    ],
    notes: [
      {
        id: "note-1",
        author: "R. Vance (Senior Mechanical Eng)",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        time: "1 hour ago",
        content: "LOTO protocol completed. Hydraulic lines purged. Bearing collar removed — pitting observed on outer race as predicted by AI model."
      },
      {
        id: "note-2",
        author: "D. Zhang (Vibration Specialist)",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        time: "2 hours ago",
        content: "FFT transducer recalibrated. Signal baseline set for post-repair baseline comparison."
      }
    ],
    timeline: [
      {
        id: "tl-1",
        time: "Today, 18:45 UTC",
        title: "Work Order WO-9902 Dispatched",
        description: "AI Sentinel Core auto-generated ticket following thermal alarm on HP-9042.",
        actor: "ForgeMind AI Core",
        status: "success"
      },
      {
        id: "tl-2",
        time: "Today, 19:10 UTC",
        title: "Technician R. Vance Accepted Dispatch",
        description: "Assigned to Senior Mechanical Engineer R. Vance.",
        actor: "R. Vance",
        status: "info"
      },
      {
        id: "tl-3",
        time: "Today, 20:00 UTC",
        title: "Replacement SKF-6210 Parts Issued",
        description: "Central Parts Repository issued bearing kit #SK-900.",
        actor: "Warehouse System",
        status: "info"
      },
      {
        id: "tl-4",
        time: "In Progress",
        title: "Bearing Assembly Installation",
        description: "Technician currently installing new bearing assembly.",
        actor: "R. Vance",
        status: "warning"
      }
    ]
  },

  "TICK-8842": {
    ticketNumber: "TICK-8842",
    title: "5-Axis CNC Milling Spindle Lubrication Purge",
    priority: "High P2",
    status: "Pending Parts",
    assignedEngineer: {
      name: "S. Kova",
      role: "CNC Lead Technician",
      shift: "Shift Beta (Zone B)",
      email: "s.kova@forgemind.io",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    estimatedCompletion: "Tomorrow, 08:00 UTC",
    estimatedHoursRemaining: "11.5 Hours Remaining",
    slaProgress: 40,
    createdAt: "Yesterday, 14:30 UTC",
    problemStatement: "Spindle bearing operating at 88.5°C with coolant pressure degradation.",
    machineDetails: {
      id: "CNC-4081",
      name: "5-Axis High-Precision CNC Milling Rig",
      type: "CNC Milling",
      zone: "Zone B - Assembly",
      healthScore: 62,
      temperature: 88.5,
      pressure: 12.2,
      riskLevel: "Warning P2"
    },
    checklist: [
      { id: 1, task: "Lockout CNC power drive relay", isCompleted: true, role: "CNC Tech" },
      { id: 2, task: "Drain degraded spindle synthetic oil", isCompleted: true, role: "Maintenance Crew" },
      { id: 3, task: "Procure replacement synthetic oil ISO VG 32", isCompleted: false, role: "Logistics" }
    ],
    notes: [
      {
        id: "note-101",
        author: "S. Kova (CNC Lead)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        time: "3 hours ago",
        content: "Drained old spindle lubricant. Waiting on central store delivery of synthetic ISO VG 32 oil."
      }
    ],
    timeline: [
      {
        id: "tl-101",
        time: "Yesterday, 14:30 UTC",
        title: "Ticket Created",
        description: "Logged following thermal warning.",
        actor: "System Control",
        status: "info"
      }
    ]
  }
};

export const getTicketDetail = (id) => {
  if (mockTicketDetailsMap[id]) {
    return mockTicketDetailsMap[id];
  }
  // Return generic profile
  return {
    ticketNumber: id || "WO-9902",
    title: `Maintenance Work Order ${id || 'WO-9902'}`,
    priority: "High P2",
    status: "In Progress",
    assignedEngineer: {
      name: "Cmdr. Alex Vance",
      role: "Senior Incident Director",
      shift: "Shift Alpha",
      email: "a.vance@forgemind.io",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    estimatedCompletion: "Today, 23:00 UTC",
    estimatedHoursRemaining: "3.0 Hours Remaining",
    slaProgress: 50,
    createdAt: "Today, 17:00 UTC",
    problemStatement: "Automated work order for machinery inspection and sensor recalibration.",
    machineDetails: {
      id: "HP-9042",
      name: "Heavy Hydraulic Stamping Press 04",
      type: "Stamping Press",
      zone: "Zone A - Stamping",
      healthScore: 42,
      temperature: 112.4,
      pressure: 14.2,
      riskLevel: "Warning P2"
    },
    checklist: [
      { id: 1, task: "Perform visual hardware inspection", isCompleted: true, role: "Inspector" },
      { id: 2, task: "Recalibrate thermal sensor zero-point", isCompleted: false, role: "Technician" }
    ],
    notes: [
      {
        id: "n-1",
        author: "Cmdr. Alex Vance",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        time: "30 mins ago",
        content: "Work order assigned to field crew. Sensor calibration in progress."
      }
    ],
    timeline: [
      {
        id: "tl-201",
        time: "Today, 17:00 UTC",
        title: "Work Order Created",
        description: "Dispatched to Zone A control hub.",
        actor: "System Controller",
        status: "info"
      }
    ]
  };
};
