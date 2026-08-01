// Detailed Mock Dataset for Analytics & Reports Page

export const mockReportsData = {
  factoryHealthIndex: 94.2,
  healthImprovement: "+2.4%",
  totalDowntimeHours: 14.2,
  downtimeReduction: "-32%",
  maintenanceCost: "$48,200",
  budgetVariance: "-25.8% under budget",
  mttrHours: "1.8 Hrs",
  mtbfHours: "342 Hrs",

  incidentTrend: [
    { month: 'Feb', incidents: 18, resolved: 16, critical: 4 },
    { month: 'Mar', incidents: 22, resolved: 20, critical: 5 },
    { month: 'Apr', incidents: 15, resolved: 14, critical: 2 },
    { month: 'May', incidents: 19, resolved: 18, critical: 3 },
    { month: 'Jun', incidents: 12, resolved: 12, critical: 1 },
    { month: 'Jul', incidents: 14, resolved: 13, critical: 2 }
  ],

  machineDowntime: [
    { machineType: 'Stamping Press', downtimeHours: 18.5, costImpact: '$24,000' },
    { machineType: '5-Axis CNC Milling', downtimeHours: 12.2, costImpact: '$16,500' },
    { machineType: 'Steam Boiler System', downtimeHours: 6.4, costImpact: '$8,200' },
    { machineType: 'Welding Robot Arm', downtimeHours: 4.1, costImpact: '$5,100' },
    { machineType: 'Coolant Recirculation', downtimeHours: 2.8, costImpact: '$3,400' }
  ],

  riskDistribution: [
    { name: 'Critical P1', value: 15, color: '#f43f5e' },
    { name: 'High P2', value: 35, color: '#f59e0b' },
    { name: 'Medium P3', value: 30, color: '#06b6d4' },
    { name: 'Low P4', value: 20, color: '#10b981' }
  ],

  maintenanceCostTrend: [
    { month: 'Feb', budget: 65000, actualCost: 58400, savings: 6600 },
    { month: 'Mar', budget: 65000, actualCost: 61200, savings: 3800 },
    { month: 'Apr', budget: 65000, actualCost: 49800, savings: 15200 },
    { month: 'May', budget: 65000, actualCost: 52100, savings: 12900 },
    { month: 'Jun', budget: 65000, actualCost: 44300, savings: 20700 },
    { month: 'Jul', budget: 65000, actualCost: 48200, savings: 16800 }
  ],

  monthlySummary: [
    { month: 'July 2026', totalIncidents: 14, mttr: '1.8 Hrs', mtbf: '342 Hrs', partsCost: '$12,400', downtimeSaved: '$140,000', compliance: '98.5%' },
    { month: 'June 2026', totalIncidents: 12, mttr: '1.6 Hrs', mtbf: '380 Hrs', partsCost: '$9,800', downtimeSaved: '$185,000', compliance: '99.1%' },
    { month: 'May 2026', totalIncidents: 19, mttr: '2.1 Hrs', mtbf: '310 Hrs', partsCost: '$16,200', downtimeSaved: '$110,000', compliance: '97.2%' },
    { month: 'April 2026', totalIncidents: 15, mttr: '1.9 Hrs', mtbf: '335 Hrs', partsCost: '$11,100', downtimeSaved: '$125,000', compliance: '98.0%' },
    { month: 'March 2026', totalIncidents: 22, mttr: '2.4 Hrs', mtbf: '290 Hrs', partsCost: '$21,500', downtimeSaved: '$95,000', compliance: '95.8%' }
  ]
};
