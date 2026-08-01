// Mock Dataset for ChatGPT-Style AI Assistant Page

export const mockAiAssistantData = {
  threads: [
    {
      id: "thread-1",
      title: "HP-9042 Thermal Runaway Analysis",
      date: "Today, 18:42",
      category: "Today",
      active: true
    },
    {
      id: "thread-2",
      title: "Zone A ISO-45001 LOTO Protocol Checklist",
      date: "Today, 14:15",
      category: "Today",
      active: false
    },
    {
      id: "thread-3",
      title: "CNC-4081 Vibration FFT Spectrum Analysis",
      date: "Yesterday",
      category: "Previous 7 Days",
      active: false
    },
    {
      id: "thread-4",
      title: "Monthly MTTR & MTBF Downtime Savings Report",
      date: "3 days ago",
      category: "Previous 7 Days",
      active: false
    }
  ],

  suggestedPrompts: [
    {
      id: "p1",
      category: "Diagnostic",
      question: "Analyze Stamping Press HP-9042 thermal anomaly & vibration spectrum",
      icon: "Thermal"
    },
    {
      id: "p2",
      category: "Compliance",
      question: "Generate ISO-45001 safety lockout checklist for Zone A maintenance",
      icon: "Shield"
    },
    {
      id: "p3",
      category: "Analytics",
      question: "What is current MTTR benchmark for CNC-4081 milling rig?",
      icon: "Chart"
    },
    {
      id: "p4",
      category: "Maintenance",
      question: "Provide SKF bearing replacement procedure script for pump drive",
      icon: "Wrench"
    }
  ],

  initialMessages: [
    {
      id: "msg-1",
      sender: "user",
      text: "Analyze the current thermal and vibration telemetry for Hydraulic Stamping Press HP-9042.",
      timestamp: "18:42 UTC"
    },
    {
      id: "msg-2",
      sender: "ai",
      timestamp: "18:42 UTC",
      text: `### 🚨 ForgeMind Neural Diagnostic Report — HP-9042

Based on real-time 10,000 Hz vibration acoustic sensors and infrared thermal camera ingestion across **Zone A**, I have identified a **Critical P1 Anomaly**:

1. **Thermal Excursion**: Pump drive bearing core elevated to **184.2°C** (Upper Limit: 85°C).
2. **Acoustic FFT Peak**: 12.4 Hz harmonic vibration spike with velocity **8.4 mm/s** (ISO-10816 Limit: 2.5 mm/s).
3. **Failure Probability**: **98.4% probability** of catastrophic bearing seizure within 72 operating hours.

#### 🛠️ Recommended Operator Action:
- Execute immediate hydraulic line pressure lockout.
- Schedule SKF-6210 bearing replacement during 22:00 shift change.

Here is the JSON telemetry payload received from sensor node \`SN-ZONE-A-9042\`:`,
      codeBlock: {
        language: "json",
        code: `{
  "asset_id": "HP-9042",
  "sensor_node": "SN-ZONE-A-9042",
  "telemetry": {
    "temperature_celsius": 184.2,
    "vibration_rms_mms": 8.4,
    "fft_peak_freq_hz": 12.4,
    "hydraulic_pressure_bar": 18.4,
    "anomaly_confidence": 0.984
  },
  "status": "CRITICAL_P1_LOCKOUT_REQUIRED"
}`
      }
    }
  ],

  cannedResponses: {
    "loto": `### 📋 ISO-45001 Lockout / Tagout (LOTO) Protocol for Zone A

Here is the automated safety checklist generated for **Zone A Heavy Machinery**:

- [x] **Step 1**: Disengage main 480V circuit breaker at Substation A-04.
- [x] **Step 2**: Apply physical padlock & tag to main power lockout clasp.
- [x] **Step 3**: Bleed residual hydraulic line pressure to < 2.0 Bar.
- [ ] **Step 4**: Equip Class-3 Thermal Insulation Gloves & Face Shield.
- [ ] **Step 5**: Verify zero-voltage state with calibrated multimeter.

\`\`\`python
# Automated LOTO Verification Script
def verify_loto_state(sensor_id):
    pressure = read_hydraulic_pressure(sensor_id)
    voltage = read_bus_voltage(sensor_id)
    if pressure < 2.0 and voltage == 0.0:
        return "LOTO_ENGAGED_SAFE_TO_ENTER"
    return "HAZARD_LOTO_INCOMPLETE"
\`\`\``,

    "default": `### 🧠 ForgeMind AI Sentinel Neural Response

I have processed your query across our multi-agent factory knowledge graph.

- **Current Plant Status**: 136 / 148 Machinery Operational (94.2% Plant Health Index).
- **Active Work Orders**: 12 Open Dispatches (2 Critical P1, 4 High P2).
- **Next Preventive Maintenance Window**: 22:00 UTC Shift Change.

You can ask me to run telemetry diagnostics, generate ISO compliance checklists, or fetch MTTR analytics metrics.`
  }
};
