export const mockAnalytics = {
  overallSafetyIndex: 94.8,
  preventedDowntimeSavings: "$482,500",
  totalIncidentsPrevented: 142,
  mttrMinutes: 24, // Mean Time To Resolution
  isoComplianceScore: 98.2,
  activeRisksCount: 4,
  
  riskMatrixData: [
    // 5x5 Likelihood vs Severity Heatmap
    { id: 1, severity: 5, likelihood: 1, count: 0, label: "Catastrophic / Rare" },
    { id: 2, severity: 5, likelihood: 2, count: 0, label: "Catastrophic / Unlikely" },
    { id: 3, severity: 5, likelihood: 3, count: 1, label: "HP-9042 Thermal Overheat (Critical P1)", active: true },
    { id: 4, severity: 5, likelihood: 4, count: 0, label: "Catastrophic / High" },
    { id: 5, severity: 5, likelihood: 5, count: 0, label: "Catastrophic / Frequent" },
    
    { id: 6, severity: 4, likelihood: 1, count: 0, label: "Major / Rare" },
    { id: 7, severity: 4, likelihood: 2, count: 1, label: "No PPE Violation (Zone A)", active: true },
    { id: 8, severity: 4, likelihood: 3, count: 1, label: "CNC-402 Pressure Wear", active: true },
    { id: 9, severity: 4, likelihood: 4, count: 0, label: "Major / High" },
    { id: 10, severity: 4, likelihood: 5, count: 0, label: "Major / Frequent" },

    { id: 11, severity: 3, likelihood: 1, count: 2, label: "Moderate / Rare" },
    { id: 12, severity: 3, likelihood: 2, count: 1, label: "Hydraulic Oil Spill (Zone B)", active: true },
    { id: 13, severity: 3, likelihood: 3, count: 0, label: "Moderate / Possible" },
    { id: 14, severity: 3, likelihood: 4, count: 0, label: "Moderate / High" },
    { id: 15, severity: 3, likelihood: 5, count: 0, label: "Moderate / Frequent" },

    { id: 16, severity: 2, likelihood: 1, count: 5, label: "Minor / Rare" },
    { id: 17, severity: 2, likelihood: 2, count: 3, label: "Minor / Unlikely" },
    { id: 18, severity: 2, likelihood: 3, count: 1, label: "Minor / Possible" },
    { id: 19, severity: 2, likelihood: 4, count: 0, label: "Minor / High" },
    { id: 20, severity: 2, likelihood: 5, count: 0, label: "Minor / Frequent" },

    { id: 21, severity: 1, likelihood: 1, count: 12, label: "Insignificant / Rare" },
    { id: 22, severity: 1, likelihood: 2, count: 8, label: "Insignificant / Unlikely" },
    { id: 23, severity: 1, likelihood: 3, count: 2, label: "Insignificant / Possible" },
    { id: 24, severity: 1, likelihood: 4, count: 1, label: "Insignificant / High" },
    { id: 25, severity: 1, likelihood: 5, count: 0, label: "Insignificant / Frequent" }
  ],

  hazardTrends30Days: [
    { day: "Jul 01", detected: 5, prevented: 5 },
    { day: "Jul 05", detected: 8, prevented: 8 },
    { day: "Jul 10", detected: 4, prevented: 4 },
    { day: "Jul 15", detected: 12, prevented: 11 },
    { day: "Jul 20", detected: 7, prevented: 7 },
    { day: "Jul 25", detected: 9, prevented: 9 },
    { day: "Jul 31", detected: 4, prevented: 4 }
  ],

  zoneSafetyScores: [
    { zone: "Zone A - Stamping", score: 92, status: "Good" },
    { zone: "Zone B - Hydraulics", score: 78, status: "Attention Required" },
    { zone: "Zone C - Robotics", score: 98, status: "Excellent" },
    { zone: "Zone D - Chemical", score: 95, status: "Excellent" }
  ]
};
