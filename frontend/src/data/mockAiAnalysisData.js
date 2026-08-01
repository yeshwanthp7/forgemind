// Detailed Mock Dataset for Visually Stunning AI Analysis Page

export const mockAiAnalysisData = {
  assetId: "HP-9042",
  assetName: "Heavy Hydraulic Stamping Press 04",
  zone: "Zone A - Stamping & Pressing",
  manufacturer: "Siemens Heavy Ind.",
  detectedHazard: "Hydraulic Fluid Thermal Runaway & Acoustic Bearing Pitting",
  confidenceScore: 98.4,
  severity: "Critical P1",
  riskScore: 92,
  estimatedDowntime: "4.5 Hours Averted",
  preventedDowntimeROI: "$140,000 Savings",
  temperature: 184.2,
  vibration: "8.4 mm/s",
  pressure: 18.4,

  rootCause: "Friction-induced outer race pitting on secondary hydraulic pump bearing causing thermal cascade and acoustic harmonic resonance at 12.4 Hz.",
  
  recommendedAction: "Execute immediate hydraulic lockout protocol. Replace bearing kit during 22:00 shift change to prevent catastrophic pump failure.",

  incidentImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80",
  
  boundingOverlays: [
    {
      id: "box-1",
      label: "Thermal Hotspot 184.2°C",
      confidence: "98.4%",
      color: "border-rose-500 bg-rose-500/10 text-rose-300",
      position: { top: "25%", left: "35%", width: "30%", height: "28%" }
    },
    {
      id: "box-2",
      label: "Acoustic FFT Anomaly 12.4 Hz",
      confidence: "96.1%",
      color: "border-cyan-400 bg-cyan-500/10 text-cyan-300",
      position: { top: "58%", left: "42%", width: "24%", height: "22%" }
    }
  ],

  aiSummary: `The ForgeMind Sentinel multi-agent neural network completed a 10,000 Hz acoustic FFT spectrum analysis and visual thermal infrared scan on Hydraulic Stamping Press HP-9042.

Computer vision models identified a critical thermal hotspot of 184.2°C on the secondary hydraulic pump assembly (Upper Control Limit: 85°C). Acoustic vibration sensors detected severe 12.4 Hz harmonic distortion exceeding ISO-10816 velocity limits (8.4 mm/s vs 2.5 mm/s baseline).

Failure probability model predicts catastrophic bearing seizure within 72 operating hours without immediate intervention. Automated dispatch ticket WO-9902 has been generated for mechanical team review.`,

  safetyChecklist: [
    { id: 1, task: "Verify ISO-13849 Mechanical Lockout / Tagout (LOTO) engaged", requiredRole: "Lead Shift Engineer", isCompleted: true },
    { id: 2, task: "Purge main hydraulic line pressure (UCL < 2.0 Bar)", requiredRole: "Hydraulic Technician", isCompleted: fontCompleted(true) },
    { id: 3, task: "Equip Class-3 Thermal Insulation Gloves & Face Shield", requiredRole: "Maintenance Crew", isCompleted: true },
    { id: 4, task: "Inspect secondary pump housing for fluid contamination", requiredRole: "Vibration Analyst", isCompleted: false },
    { id: 5, task: "Install replacement SKF-6210 bearing assembly and torque to 240 Nm", requiredRole: "Senior Engineer", isCompleted: false }
  ],

  timeline: [
    {
      id: "stg-1",
      stage: "Stage 1: Multi-Camera Frame Ingestion",
      duration: "12ms",
      status: "Verified",
      detail: "Captured 60 FPS 4K visual infrared stream across Zone A cameras."
    },
    {
      id: "stg-2",
      stage: "Stage 2: Acoustic FFT Spectral Decomposition",
      duration: "45ms",
      status: "Anomaly Detected",
      detail: "Identified 12.4 Hz harmonic vibration spike (amplitude 8.4 mm/s)."
    },
    {
      id: "stg-3",
      stage: "Stage 3: Thermal Infrared Gradient Analysis",
      duration: "28ms",
      status: "UCL Exceeded",
      detail: "Detected 184.2°C thermal core hotspot on pump drive shaft bearing."
    },
    {
      id: "stg-4",
      stage: "Stage 4: Neural Failure Probability Matrix",
      duration: "18ms",
      status: "Critical Output",
      detail: "Calculated 98.4% confidence failure probability. Generated WO-9902."
    }
  ]
};

function fontCompleted(val) {
  return val;
}
