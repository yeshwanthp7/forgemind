// Mock Data for Manufacturing Factory Dashboard

export const mockDashboardData = {
  overviewStats: {
    totalMachines: 148,
    totalMachinesTrend: '+3 new added this month',
    activeMachines: 136,
    activeMachinesRate: '91.8% Operational OEE',
    criticalIncidents: 2,
    criticalIncidentsSubtitle: 'Requires immediate dispatch',
    pendingMaintenance: 7,
    pendingMaintenanceSubtitle: '3 Overdue • 4 Scheduled',
    todaysIncidents: 5,
    todaysIncidentsTrend: '-30% vs yesterday',
    aiReportsGenerated: 42,
    aiReportsTrend: '100% ISO-45001 Verified'
  },

  incidentTrend: [
    { day: 'Mon', incidents: 12, critical: 3, warning: 6, minor: 3 },
    { day: 'Tue', incidents: 8, critical: 1, warning: 4, minor: 3 },
    { day: 'Wed', incidents: 15, critical: 4, warning: 8, minor: 3 },
    { day: 'Thu', incidents: 6, critical: 1, warning: 3, minor: 2 },
    { day: 'Fri', incidents: 10, critical: 2, warning: 5, minor: 3 },
    { day: 'Sat', incidents: 4, critical: 0, warning: 2, minor: 2 },
    { day: 'Sun', incidents: 5, critical: 1, warning: 2, minor: 2 }
  ],

  riskDistribution: [
    { name: 'Critical (P1)', value: 2, color: '#f43f5e', percentage: '12%' },
    { name: 'High Risk (P2)', value: 5, color: '#f97316', percentage: '29%' },
    { name: 'Medium Risk (P3)', value: 7, color: '#eab308', percentage: '41%' },
    { name: 'Low / Nominal', value: 3, color: '#10b981', percentage: '18%' }
  ],

  machineHealthByZone: [
    { zone: 'Zone A - Stamping', health: 94, rul: 88, activeCount: 32, totalCount: 34 },
    { zone: 'Zone B - Welding', health: 78, rul: 62, activeCount: 28, totalCount: 30 },
    { zone: 'Zone C - Assembly', health: 96, rul: 92, activeCount: 45, totalCount: 46 },
    { zone: 'Zone D - Paint Shop', health: 84, rul: 71, activeCount: 18, totalCount: 20 },
    { zone: 'Zone E - Packaging', health: 91, rul: 85, activeCount: 13, totalCount: 18 }
  ],

  monthlyMaintenance: [
    { month: 'Jan', scheduled: 45, unscheduled: 12, downtimeHours: 18 },
    { month: 'Feb', scheduled: 52, unscheduled: 8, downtimeHours: 12 },
    { month: 'Mar', scheduled: 48, unscheduled: 15, downtimeHours: 24 },
    { month: 'Apr', scheduled: 60, unscheduled: 6, downtimeHours: 9 },
    { month: 'May', scheduled: 55, unscheduled: 11, downtimeHours: 16 },
    { month: 'Jun', scheduled: 68, unscheduled: 4, downtimeHours: 7 },
    { month: 'Jul', scheduled: 64, unscheduled: 7, downtimeHours: 10 }
  ],

  recentIncidents: [
    {
      id: 'INC-9402',
      title: 'Hydraulic Pressure Transducer Spike',
      machineId: 'HP-9042',
      machineName: 'Hydraulic Press 900T',
      zone: 'Zone A - Stamping',
      priority: 'Critical',
      status: 'Investigating',
      timestamp: '12 mins ago',
      operator: 'J. Miller',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    },
    {
      id: 'INC-9399',
      title: 'Acoustic FFT Bearing Anomaly',
      machineId: 'CNC-4081',
      machineName: '5-Axis CNC Milling Unit',
      zone: 'Zone B - Welding',
      priority: 'High',
      status: 'In Progress',
      timestamp: '45 mins ago',
      operator: 'S. Kova',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      id: 'INC-9395',
      title: 'Thermal Core Overheat Alert (>105°C)',
      machineId: 'RB-1024',
      machineName: 'Robotic Arm Welder B',
      zone: 'Zone B - Welding',
      priority: 'Critical',
      status: 'Investigating',
      timestamp: '1 hour ago',
      operator: 'D. Zhang',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
    },
    {
      id: 'INC-9388',
      title: 'Coolant Flow Restriction Warning',
      machineId: 'PNT-3012',
      machineName: 'Electrostatic Spray Booth',
      zone: 'Zone D - Paint Shop',
      priority: 'Medium',
      status: 'Pending',
      timestamp: '3 hours ago',
      operator: 'A. Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    },
    {
      id: 'INC-9376',
      title: 'Conveyor Servo Alignment Deviation',
      machineId: 'CNV-0044',
      machineName: 'Main Assembly Pallet Loop',
      zone: 'Zone C - Assembly',
      priority: 'Low',
      status: 'Resolved',
      timestamp: '5 hours ago',
      operator: 'M. Rossi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    }
  ],

  maintenanceAlerts: [
    {
      id: 'ALT-101',
      machineId: 'HP-9042',
      machineName: 'Hydraulic Press 900T',
      type: 'Vibration & Thermal Spike',
      severity: 'Critical',
      message: 'Vibration velocity exceeded 7.8 mm/s ISO limit. Thermal bearing core at 112°C.',
      timestamp: '8 mins ago',
      actionRequired: 'Dispatch Mechanical Team'
    },
    {
      id: 'ALT-102',
      machineId: 'CNC-4081',
      machineName: '5-Axis CNC Milling Unit',
      type: 'Spindle RUL Degraded (<14%)',
      severity: 'High',
      message: 'Predicted spindle failure within 48 operating hours. Lubrication purge required.',
      timestamp: '32 mins ago',
      actionRequired: 'Schedule Preventive Lockout'
    },
    {
      id: 'ALT-103',
      machineId: 'COMP-771',
      machineName: 'Central Pneumatic Turbine',
      type: 'Filter Pressure Drop Differential',
      severity: 'Medium',
      message: 'Differential pressure > 1.4 Bar. Particulate accumulation detected.',
      timestamp: '2 hours ago',
      actionRequired: 'Replace HEPA Intake Element'
    }
  ],

  aiReports: [
    {
      id: 'REP-2026-089',
      title: 'Hydraulic Press HP-9042 Predictive Failure Audit',
      targetAsset: 'HP-9042 (Zone A)',
      riskScore: 92,
      category: 'Catastrophic Risk',
      generatedTime: 'Today, 18:45 UTC',
      summary: 'Acoustic frequency spectrum analysis identified outer race pitting on secondary hydraulic pump bearing.',
      recommendation: 'Replace bearing kit during 22:00 shift change to prevent estimated $140,000 unplanned downtime.',
      status: 'Action Required'
    },
    {
      id: 'REP-2026-088',
      title: 'Plant-Wide Energy Efficiency & Thermal Optimization',
      targetAsset: 'All Production Zones',
      riskScore: 34,
      category: 'Efficiency Opportunity',
      generatedTime: 'Today, 14:30 UTC',
      summary: 'Robotic Welders in Zone B operating at 18% thermal excess during idle cycles.',
      recommendation: 'Enable AI Eco-Idle mode on KUKA controllers to save ~420 kWh daily.',
      status: 'Verified'
    },
    {
      id: 'REP-2026-085',
      title: 'Zone B Acoustic Diagnostic & Vibration Baseline',
      targetAsset: 'Zone B CNC Fleet',
      riskScore: 68,
      category: 'Preventive Alert',
      generatedTime: 'Yesterday, 09:15 UTC',
      summary: 'Harmonic resonance detected between CNC-4081 and CNC-4082 mounting bed.',
      recommendation: 'Re-torque damper bolts to 240 Nm.',
      status: 'In Progress'
    }
  ],

  recentActivity: [
    {
      id: 'ACT-001',
      type: 'incident',
      title: 'Critical Incident INC-9402 Dispatched',
      message: 'Automated work order WO-8821 dispatched to Senior Technician R. Vance for HP-9042.',
      timestamp: '10 mins ago',
      user: 'AI Sentinel Auto-Dispatcher',
      zone: 'Zone A',
      severity: 'critical'
    },
    {
      id: 'ACT-002',
      type: 'maintenance',
      title: 'Preventive Lubrication Completed',
      message: 'Technician D. Zhang completed 250-hr service on Robotic Arm Welder B.',
      timestamp: '42 mins ago',
      user: 'D. Zhang',
      zone: 'Zone B',
      severity: 'success'
    },
    {
      id: 'ACT-003',
      type: 'ai_report',
      title: 'AI Diagnostic Scan #42 Generated',
      message: 'Neural acoustic model completed 10,000 Hz spectral scan on Stamping Press Line.',
      timestamp: '1 hour ago',
      user: 'ForgeMind AI Core',
      zone: 'Zone A',
      severity: 'info'
    },
    {
      id: 'ACT-004',
      type: 'system',
      title: 'Safety Interlock Test Passed',
      message: 'Zone C automated emergency stop relays verified per ISO-13849 protocol.',
      timestamp: '3 hours ago',
      user: 'System Controller',
      zone: 'Zone C',
      severity: 'info'
    },
    {
      id: 'ACT-005',
      type: 'user',
      title: 'Threshold Parameter Adjusted',
      message: 'Vibration warning threshold modified from 6.5 mm/s to 7.0 mm/s by Lead Supervisor.',
      timestamp: '5 hours ago',
      user: 'Cmdr. Alex Vance',
      zone: 'Plant Wide',
      severity: 'warning'
    }
  ]
};
