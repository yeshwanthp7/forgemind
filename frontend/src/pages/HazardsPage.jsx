import React, { useState } from 'react';
import { CameraFeedCard } from '../components/hazards/CameraFeedCard';
import { HazardFilterBar } from '../components/hazards/HazardFilterBar';
import { mockCameras } from '../data/mockCameras';
import { useAlerts } from '../context/AlertContext';
import { Button } from '../components/ui/Button';
import { Video, ShieldAlert, Plus, Sparkles } from 'lucide-react';

export const HazardsPage = () => {
  const { addSimulatedHazard } = useAlerts();
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');

  const filteredCameras = mockCameras.filter(cam => {
    const matchesSearch = cam.name.toLowerCase().includes(searchQuery.toLowerCase()) || cam.zone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = zoneFilter === 'all' || cam.zone === zoneFilter;

    if (severityFilter === 'critical') {
      return matchesSearch && matchesZone && cam.detectedHazards.some(h => h.severity === 'critical');
    }
    if (severityFilter === 'warning') {
      return matchesSearch && matchesZone && cam.detectedHazards.some(h => h.severity === 'warning');
    }
    return matchesSearch && matchesZone;
  });

  const handleSimulateNewHazard = () => {
    addSimulatedHazard({
      id: `HAZ-${Math.floor(1000 + Math.random() * 9000)}`,
      title: "Visual AI: Chemical Leak Spray Detected",
      severity: "warning",
      zone: "Zone C",
      assetId: "RA-88",
      cameraId: "CAM-03",
      detectedAt: "Just now",
      status: "unresolved",
      detectionType: "Visual AI Chemical Aerosol Model",
      confidenceScore: 94.8,
      details: "Camera CAM-03 visual model flagged high pressure aerosol mist near robotic arm joint.",
      aiDiagnosis: "Hydraulic joint seal weeping under 150 PSI load.",
      recommendedActions: ["Inspect robotic arm seal gasket", "Dispatch Tier 1 Technician"]
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Video className="w-5 h-5 text-cyan-400" />
            <span>Visual AI Hazard Monitor & CCTV Stream Matrix</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time visual object classification, PPE validation, and thermal FLIR overlay feed
          </p>
        </div>

        <Button variant="glass" icon={Plus} onClick={handleSimulateNewHazard}>
          Simulate Visual AI Hazard Event
        </Button>
      </div>

      {/* Filter Bar */}
      <HazardFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        severityFilter={severityFilter}
        setSeverityFilter={setSeverityFilter}
        zoneFilter={zoneFilter}
        setZoneFilter={setZoneFilter}
      />

      {/* Camera Stream Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCameras.map((camera) => (
          <CameraFeedCard key={camera.id} camera={camera} />
        ))}
      </div>
    </div>
  );
};
