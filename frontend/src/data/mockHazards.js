export const mockHazards = [
  {
    id: "HAZ-9042",
    title: "Thermal Overheat & Vibration Friction Anomaly",
    severity: "critical",
    zone: "Zone B",
    assetId: "HP-9042",
    cameraId: "CAM-02",
    detectedAt: "2026-07-31 11:42:10",
    status: "unresolved",
    detectionType: "Visual AI + Vibration Telemetry Fusion",
    confidenceScore: 98.8,
    details: "CCTV Camera CAM-02 visual model detected surface smoke at 184.2°C thermal reading on Hydraulic Press HP-9042 main drive shaft bearing.",
    aiDiagnosis: "Critical friction wear on SKF-6210 bearing causing rapid thermal runaway. High probability of mechanical seizure within 35 minutes.",
    recommendedActions: [
      "Issue P1 Critical Maintenance Ticket for immediate bearing replacement.",
      "Engage cooling fan sub-system B-2 to stabilize ambient temperatures.",
      "Reroute press workload to Auxiliary Press Line 02."
    ]
  },
  {
    id: "HAZ-8041",
    title: "PPE Violation: Personnel Missing Safety Hard Hat",
    severity: "critical",
    zone: "Zone A",
    assetId: "CNC-402",
    cameraId: "CAM-01",
    detectedAt: "2026-07-31 11:30:15",
    status: "investigating",
    detectionType: "Visual AI Object Classification",
    confidenceScore: 96.4,
    details: "Visual AI algorithm flagged operator EMP-4029 walking under active overhead crane gantry without mandatory Class E hard hat.",
    aiDiagnosis: "High severity OSHA compliance risk under active load area.",
    recommendedActions: [
      "Broadcast automated voice alert via Zone A floor speakers.",
      "Send push notification to Zone A Shift Supervisor."
    ]
  },
  {
    id: "HAZ-9043",
    title: "Hydraulic Fluid Pool Spill Hazard",
    severity: "warning",
    zone: "Zone B",
    assetId: "HP-9042",
    cameraId: "CAM-02",
    detectedAt: "2026-07-31 11:20:00",
    status: "in_progress",
    detectionType: "Visual AI Texture Segmentation",
    confidenceScore: 91.2,
    details: "Visual AI detected ~1.2 sq. meter reflective liquid spill around hydraulic fluid line 4B.",
    aiDiagnosis: "Slip & fall safety hazard combined with potential fluid pressure drop.",
    recommendedActions: [
      "Dispatch hazmat cleanup crew with absorbent granules.",
      "Inspect seal fitting on hydraulic manifold."
    ]
  },
  {
    id: "HAZ-7019",
    title: "Unauthorized Entry into Chemical Boiler Zone D",
    severity: "warning",
    zone: "Zone D",
    assetId: "SB-109",
    cameraId: "CAM-04",
    detectedAt: "2026-07-31 10:55:00",
    status: "resolved",
    detectionType: "Visual AI Perimeter Boundary Breach",
    confidenceScore: 94.1,
    details: "Unbadged personnel detected inside restricted high-pressure boiler enclosure D2.",
    aiDiagnosis: "Unauthorized access to hazardous energy zone.",
    recommendedActions: [
      "Verify access log at security portal.",
      "Security guard escorted personnel out of restricted perimeter."
    ]
  }
];
