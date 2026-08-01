// Detailed Mock Dataset for Machine Details Page

export const mockMachineDetailsMap = {
  "HP-9042": {
    id: "HP-9042",
    name: "Heavy Hydraulic Stamping Press 04",
    type: "Stamping Press",
    zone: "Zone A - Stamping",
    status: "critical",
    healthScore: 18,
    rulPercentage: 18,
    riskLevel: "Critical P1",
    temperature: 184.2,
    temperatureBaseline: 75.0,
    pressure: 18.4,
    pressureBaseline: 12.0,
    humidity: 52.8,
    humidityBaseline: 45.0,
    vibration: "8.4 mm/s",
    vibrationValue: 8.4,
    powerConsumption: "142.5 kW",
    powerValue: 142.5,
    manufacturer: "Siemens Heavy Ind.",
    model: "STAMP-MAX 9000",
    serialNumber: "SN-9042-DE",
    installationDate: "2021-03-15",
    operatingHours: 14280,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    maintenanceHistory: [
      {
        id: "MH-8801",
        date: "2026-07-15",
        serviceType: "Hydraulic Pump Seal & O-Ring Replace",
        technician: "R. Vance (Senior Mechanical Eng)",
        partsReplaced: "FKM High-Temp Seal Kit SK-900",
        cost: "$4,250",
        status: "Completed"
      },
      {
        id: "MH-8412",
        date: "2026-05-10",
        serviceType: "Main Bearing Acoustic Calibration",
        technician: "D. Zhang (Vibration Tech)",
        partsReplaced: "Vibration Sensor Transducer Node",
        cost: "$1,800",
        status: "Completed"
      },
      {
        id: "MH-7904",
        date: "2026-02-18",
        serviceType: "2500-Hour Scheduled Overhaul",
        technician: "M. Rossi (Factory Master Engineer)",
        partsReplaced: "Hydraulic Fluid Purge (400L ISO 68)",
        cost: "$8,900",
        status: "Completed"
      }
    ],
    previousIncidents: [
      {
        id: "INC-9402",
        title: "Hydraulic Pressure Transducer Spike (>18 Bar)",
        date: "2026-07-31",
        severity: "Critical P1",
        rootCause: "Thermal Runaway & Outer Race Bearing Friction",
        status: "Investigating",
        resolvedBy: "J. Miller (Shift Supervisor)"
      },
      {
        id: "INC-8910",
        title: "Thermal Overheat Shutoff Threshold Exceeded",
        date: "2026-06-22",
        severity: "High P2",
        rootCause: "Secondary Cooling Fan Motor Relay Trip",
        status: "Resolved",
        resolvedBy: "A. Chen (Electrical Lead)"
      },
      {
        id: "INC-8204",
        title: "Acoustic FFT Harmonic Resonance Warning",
        date: "2026-04-14",
        severity: "Medium P3",
        rootCause: "Mounting Bed Bolt Torque Decay",
        status: "Resolved",
        resolvedBy: "D. Zhang"
      }
    ],
    timeline: [
      {
        id: "TL-001",
        time: "12 mins ago",
        title: "Thermal Excursion Alarm (>184°C)",
        description: "Upper Control Limit (UCL 85°C) exceeded. Automated lockout signal transmitted.",
        actor: "ForgeMind Sensor Core",
        type: "alarm",
        severity: "critical"
      },
      {
        id: "TL-002",
        time: "45 mins ago",
        title: "AI Spectral Diagnostic Report #2026-089",
        description: "Outer race pitting identified on hydraulic pump bearing with 98.4% confidence.",
        actor: "AI Sentinel Engine",
        type: "ai_report",
        severity: "warning"
      },
      {
        id: "TL-003",
        time: "2 hours ago",
        title: "Shift Inspection Completed",
        description: "Shift supervisor J. Miller performed visual inspection and logged thermal rise.",
        actor: "J. Miller",
        type: "inspection",
        severity: "info"
      },
      {
        id: "TL-004",
        time: "16 days ago",
        title: "Maintenance Work Order MH-8801 Executed",
        description: "Hydraulic pump seal replaced during scheduled window.",
        actor: "R. Vance",
        type: "maintenance",
        severity: "success"
      }
    ]
  },

  "CNC-4081": {
    id: "CNC-4081",
    name: "5-Axis High-Precision CNC Milling Rig",
    type: "CNC Milling",
    zone: "Zone B - Assembly",
    status: "warning",
    healthScore: 62,
    rulPercentage: 62,
    riskLevel: "Warning P2",
    temperature: 88.5,
    temperatureBaseline: 65.0,
    pressure: 12.2,
    pressureBaseline: 10.0,
    humidity: 44.1,
    humidityBaseline: 45.0,
    vibration: "3.8 mm/s",
    vibrationValue: 3.8,
    powerConsumption: "88.0 kW",
    powerValue: 88.0,
    manufacturer: "Haas Automation",
    model: "VF-5SS Precision",
    serialNumber: "SN-4081-US",
    installationDate: "2022-06-20",
    operatingHours: 8910,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    maintenanceHistory: [
      {
        id: "MH-8710",
        date: "2026-07-20",
        serviceType: "Spindle Lubrication Purge",
        technician: "S. Kova (CNC Specialist)",
        partsReplaced: "Synthetic Spindle Oil ISO VG 32",
        cost: "$1,200",
        status: "Completed"
      },
      {
        id: "MH-8104",
        date: "2026-04-05",
        serviceType: "5-Axis Laser Calibration Check",
        technician: "Haas Field Engineer",
        partsReplaced: "Renishaw Probe Tip Replacement",
        cost: "$3,400",
        status: "Completed"
      }
    ],
    previousIncidents: [
      {
        id: "INC-9399",
        title: "Spindle Bearing Thermal Rise Alert",
        date: "2026-07-31",
        severity: "High P2",
        rootCause: "Coolant Flow Restriction in Spindle Jacket",
        status: "In Progress",
        resolvedBy: "S. Kova"
      }
    ],
    timeline: [
      {
        id: "TL-101",
        time: "32 mins ago",
        title: "Spindle Temperature Spike (88.5°C)",
        description: "Warning threshold exceeded. Lubrication purge advised.",
        actor: "ForgeMind Sensor Core",
        type: "alarm",
        severity: "warning"
      },
      {
        id: "TL-102",
        time: "11 days ago",
        title: "Work Order MH-8710 Executed",
        description: "Spindle oil refreshed per maintenance schedule.",
        actor: "S. Kova",
        type: "maintenance",
        severity: "success"
      }
    ]
  },

  "SB-109": {
    id: "SB-109",
    name: "High-Pressure Steam Boiler System 01",
    type: "Utilities & Power",
    zone: "Zone D - Utilities",
    status: "optimal",
    healthScore: 95,
    rulPercentage: 91,
    riskLevel: "Nominal P4",
    temperature: 68.0,
    temperatureBaseline: 70.0,
    pressure: 14.5,
    pressureBaseline: 14.0,
    humidity: 41.2,
    humidityBaseline: 45.0,
    vibration: "1.2 mm/s",
    vibrationValue: 1.2,
    powerConsumption: "45.0 kW",
    powerValue: 45.0,
    manufacturer: "Bosch Industrial Boilers",
    model: "UNIVERSAL Z500",
    serialNumber: "SN-1090-DE",
    installationDate: "2020-01-10",
    operatingHours: 21500,
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80",
    maintenanceHistory: [
      {
        id: "MH-8902",
        date: "2026-07-28",
        serviceType: "Pressure Relief Safety Valve Test",
        technician: "Bosch Certified Inspector",
        partsReplaced: "Valves Inspection Gasket",
        cost: "$2,100",
        status: "Completed"
      }
    ],
    previousIncidents: [
      {
        id: "INC-7102",
        title: "Minor Intake Air Pressure Variance",
        date: "2026-01-14",
        severity: "Low P4",
        rootCause: "Dust filter particulate buildup",
        status: "Resolved",
        resolvedBy: "Plant Utility Team"
      }
    ],
    timeline: [
      {
        id: "TL-201",
        time: "3 days ago",
        title: "Annual ISO Boiler Inspection Passed",
        description: "Pressure vessel certified for 12 additional operating months.",
        actor: "Bosch Inspector",
        type: "inspection",
        severity: "success"
      }
    ]
  }
};

// Fallback generator for unmapped machine IDs
export const getMachineDetail = (id) => {
  if (mockMachineDetailsMap[id]) {
    return mockMachineDetailsMap[id];
  }
  // Generate generic profile
  return {
    id: id || "MACH-001",
    name: `Industrial Equipment ${id || '001'}`,
    type: "Manufacturing Machine",
    zone: "Zone A - Stamping",
    status: "optimal",
    healthScore: 85,
    rulPercentage: 82,
    riskLevel: "Nominal P4",
    temperature: 65.4,
    temperatureBaseline: 65.0,
    pressure: 8.5,
    pressureBaseline: 8.0,
    humidity: 45.0,
    humidityBaseline: 45.0,
    vibration: "2.1 mm/s",
    vibrationValue: 2.1,
    powerConsumption: "65.0 kW",
    powerValue: 65.0,
    manufacturer: "Industrial Dynamics",
    model: "MODEL-X 500",
    serialNumber: `SN-${id || '001'}-GEN`,
    installationDate: "2022-04-12",
    operatingHours: 9200,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    maintenanceHistory: [
      {
        id: "MH-8100",
        date: "2026-07-01",
        serviceType: "Quarterly Diagnostic Routine",
        technician: "Field Maintenance Team",
        partsReplaced: "Filter Elements & Lubricant",
        cost: "$1,500",
        status: "Completed"
      }
    ],
    previousIncidents: [
      {
        id: "INC-8001",
        title: "Minor Sensor Calibration Offset",
        date: "2026-05-12",
        severity: "Low P4",
        rootCause: "Signal zero point drift",
        status: "Resolved",
        resolvedBy: "Technician A"
      }
    ],
    timeline: [
      {
        id: "TL-901",
        time: "1 hour ago",
        title: "Automated Telemetry Sync",
        description: "All 5 vibration & thermal channels reporting nominal parameters.",
        actor: "System Sentinel",
        type: "info",
        severity: "info"
      }
    ]
  };
};
