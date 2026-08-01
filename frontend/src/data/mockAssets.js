export const mockAssets = [
  {
    id: "HP-9042",
    name: "Heavy Hydraulic Stamping Press 04",
    category: "Stamping & Pressing",
    zone: "Zone B",
    status: "critical",
    rulPercentage: 18, // Remaining Useful Life
    predictedFailureDate: "2026-08-04",
    healthScore: 42,
    vibrationFrequency: "8.4 mm/s", // Normal baseline: 2.5 mm/s
    temperature: "184.2 °C", // Normal baseline: 75 °C
    acousticDecibels: "94.2 dB",
    motorCurrent: "142 A",
    operatingHours: 14280,
    manufacturer: "Siemens Heavy Ind.",
    criticalComponent: "Drive Shaft Main Bearing SKF-6210",
    failureMode: "Thermal Runaway & Bearing Friction Wear",
    riskLevel: "CRITICAL P1",
    sparklineData: [
      { time: "08:00", temp: 76, vib: 2.4 },
      { time: "09:00", temp: 78, vib: 2.6 },
      { time: "10:00", temp: 85, vib: 3.1 },
      { time: "11:00", temp: 112, vib: 4.8 },
      { time: "12:00", temp: 148, vib: 6.9 },
      { time: "13:00", temp: 184, vib: 8.4 }
    ],
    spectralFFT: [
      { hz: 10, amp: 0.12 },
      { hz: 50, amp: 0.45 },
      { hz: 120, amp: 2.89 }, // Harmonic Spike
      { hz: 240, amp: 4.62 }, // Harmonic Spike
      { hz: 480, amp: 1.15 }
    ]
  },
  {
    id: "CNC-402",
    name: "5-Axis High-Precision CNC Milling Rig",
    category: "Precision Machining",
    zone: "Zone A",
    status: "warning",
    rulPercentage: 62,
    predictedFailureDate: "2026-09-14",
    healthScore: 74,
    vibrationFrequency: "3.8 mm/s",
    temperature: "88.5 °C",
    acousticDecibels: "78.0 dB",
    motorCurrent: "88 A",
    operatingHours: 8910,
    manufacturer: "Haas Automation",
    criticalComponent: "Spindle Cooling Pump Seal",
    failureMode: "Coolant Pressure Degradation",
    riskLevel: "WARNING P2",
    sparklineData: [
      { time: "08:00", temp: 65, vib: 1.8 },
      { time: "09:00", temp: 68, vib: 2.0 },
      { time: "10:00", temp: 72, vib: 2.2 },
      { time: "11:00", temp: 80, vib: 3.0 },
      { time: "12:00", temp: 84, vib: 3.5 },
      { time: "13:00", temp: 88, vib: 3.8 }
    ],
    spectralFFT: [
      { hz: 10, amp: 0.08 },
      { hz: 50, amp: 0.32 },
      { hz: 120, amp: 0.85 },
      { hz: 240, amp: 1.42 },
      { hz: 480, amp: 0.65 }
    ]
  },
  {
    id: "SB-109",
    name: "High-Pressure Steam Boiler System 01",
    category: "Thermal Power & Utilities",
    zone: "Zone D",
    status: "optimal",
    rulPercentage: 91,
    predictedFailureDate: "2027-04-20",
    healthScore: 95,
    vibrationFrequency: "1.2 mm/s",
    temperature: "68.0 °C",
    acousticDecibels: "65.5 dB",
    motorCurrent: "45 A",
    operatingHours: 21500,
    manufacturer: "Bosch Industrial Boilers",
    criticalComponent: "Pressure Relief Valve Gasket",
    failureMode: "Nominal Wear",
    riskLevel: "OPTIMAL P4",
    sparklineData: [
      { time: "08:00", temp: 67, vib: 1.1 },
      { time: "09:00", temp: 68, vib: 1.2 },
      { time: "10:00", temp: 67, vib: 1.2 },
      { time: "11:00", temp: 68, vib: 1.1 },
      { time: "12:00", temp: 69, vib: 1.3 },
      { time: "13:00", temp: 68, vib: 1.2 }
    ],
    spectralFFT: [
      { hz: 10, amp: 0.05 },
      { hz: 50, amp: 0.12 },
      { hz: 120, amp: 0.22 },
      { hz: 240, amp: 0.18 },
      { hz: 480, amp: 0.09 }
    ]
  },
  {
    id: "RA-88",
    name: "Articulated 6-Axis Welding Robot Arm 02",
    category: "Robotics & Automation",
    zone: "Zone C",
    status: "optimal",
    rulPercentage: 88,
    predictedFailureDate: "2027-02-11",
    healthScore: 92,
    vibrationFrequency: "1.8 mm/s",
    temperature: "62.4 °C",
    acousticDecibels: "71.2 dB",
    motorCurrent: "62 A",
    operatingHours: 6420,
    manufacturer: "ABB Robotics",
    criticalComponent: "Joint 3 Harmonic Drive Gearbox",
    failureMode: "Nominal Wear",
    riskLevel: "OPTIMAL P4",
    sparklineData: [
      { time: "08:00", temp: 60, vib: 1.5 },
      { time: "09:00", temp: 61, vib: 1.6 },
      { time: "10:00", temp: 62, vib: 1.7 },
      { time: "11:00", temp: 62, vib: 1.8 },
      { time: "12:00", temp: 63, vib: 1.7 },
      { time: "13:00", temp: 62, vib: 1.8 }
    ],
    spectralFFT: [
      { hz: 10, amp: 0.04 },
      { hz: 50, amp: 0.15 },
      { hz: 120, amp: 0.35 },
      { hz: 240, amp: 0.28 },
      { hz: 480, amp: 0.11 }
    ]
  },
  {
    id: "CP-204",
    name: "Coolant Centrifugal Recirculation Pump",
    category: "Fluid Handling",
    zone: "Zone A",
    status: "warning",
    rulPercentage: 54,
    predictedFailureDate: "2026-08-28",
    healthScore: 68,
    vibrationFrequency: "4.2 mm/s",
    temperature: "94.1 °C",
    acousticDecibels: "82.5 dB",
    motorCurrent: "105 A",
    operatingHours: 11200,
    manufacturer: "Grundfos Heavy Fluid",
    criticalComponent: "Impeller Mechanical Seal",
    failureMode: "Cavitation & Seal Cavity Leak",
    riskLevel: "WARNING P3",
    sparklineData: [
      { time: "08:00", temp: 75, vib: 2.2 },
      { time: "09:00", temp: 79, vib: 2.8 },
      { time: "10:00", temp: 84, vib: 3.2 },
      { time: "11:00", temp: 88, vib: 3.7 },
      { time: "12:00", temp: 91, vib: 4.0 },
      { time: "13:00", temp: 94, vib: 4.2 }
    ],
    spectralFFT: [
      { hz: 10, amp: 0.09 },
      { hz: 50, amp: 0.41 },
      { hz: 120, amp: 1.15 },
      { hz: 240, amp: 2.05 },
      { hz: 480, amp: 0.88 }
    ]
  }
];
