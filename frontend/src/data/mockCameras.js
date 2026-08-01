export const mockCameras = [
  {
    id: "CAM-01",
    name: "Zone A - Stamping & Assembly Bay",
    zone: "Zone A",
    status: "active",
    fps: 30,
    resolution: "4K UHD (3840x2160)",
    activeDetectionsCount: 1,
    aiModel: "ForgeMind-Vision-v4.2",
    streamUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    thermalStreamUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    detectedHazards: [
      {
        id: "HAZ-8041",
        label: "NO PPE: Missing Hard Hat",
        confidence: 0.964,
        severity: "critical",
        box: { x: 38, y: 22, width: 24, height: 35 },
        timestamp: "2 mins ago",
        personnelId: "EMP-4029 (J. Miller)",
        aiRecommendation: "Alert shift manager & trigger automated floor loudspeaker broadcast in Zone A."
      }
    ]
  },
  {
    id: "CAM-02",
    name: "Zone B - Hydraulic Press Bay 04",
    zone: "Zone B",
    status: "active",
    fps: 60,
    resolution: "1080p Ultra",
    activeDetectionsCount: 2,
    aiModel: "ForgeMind-Vision-Thermal-v2.1",
    streamUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    thermalStreamUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    detectedHazards: [
      {
        id: "HAZ-9042",
        label: "THERMAL OVERHEAT: Hydraulic Motor 184°C",
        confidence: 0.988,
        severity: "critical",
        box: { x: 18, y: 15, width: 32, height: 42 },
        timestamp: "Just now",
        affectedAssetId: "HP-9042",
        aiRecommendation: "Immediate bearing thermal runaway hazard. Dispatch Tier 2 Mechanical Engineer & initiate P1 Work Order."
      },
      {
        id: "HAZ-9043",
        label: "OIL LEAK SPILL DETECTED",
        confidence: 0.912,
        severity: "warning",
        box: { x: 55, y: 65, width: 35, height: 25 },
        timestamp: "12 mins ago",
        affectedAssetId: "HP-9042",
        aiRecommendation: "Deploy absorbent hazard mats & cordon off walkway 4B."
      }
    ]
  },
  {
    id: "CAM-03",
    name: "Zone C - Robotic Welding Cell 02",
    zone: "Zone C",
    status: "active",
    fps: 60,
    resolution: "4K UHD (3840x2160)",
    activeDetectionsCount: 0,
    aiModel: "ForgeMind-Vision-v4.2",
    streamUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    thermalStreamUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    detectedHazards: []
  },
  {
    id: "CAM-04",
    name: "Zone D - Chemical Storage & Boiler Room",
    zone: "Zone D",
    status: "active",
    fps: 30,
    resolution: "1080p HD",
    activeDetectionsCount: 1,
    aiModel: "ForgeMind-HazardSense-v1.8",
    streamUrl: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=1200&q=80",
    thermalStreamUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    detectedHazards: [
      {
        id: "HAZ-7019",
        label: "RESTRICTED ACCESS VIOLATION",
        confidence: 0.941,
        severity: "warning",
        box: { x: 42, y: 30, width: 20, height: 50 },
        timestamp: "18 mins ago",
        personnelId: "UNAUTHORIZED_VISITOR",
        aiRecommendation: "Notify Security Control Desk & verify badge authorization for Hazmat Storage D2."
      }
    ]
  }
];
