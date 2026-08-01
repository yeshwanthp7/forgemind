import React, { createContext, useContext, useState } from 'react';
import { mockHazards } from '../data/mockHazards';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [hazards, setHazards] = useState(mockHazards);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bannerVisible, setBannerVisible] = useState(true);

  const activeP1 = hazards.find(h => h.severity === 'critical' && h.status !== 'resolved');

  const acknowledgeHazard = (id) => {
    setHazards(prev =>
      prev.map(h => (h.id === id ? { ...h, status: 'investigating' } : h))
    );
  };

  const resolveHazard = (id) => {
    setHazards(prev =>
      prev.map(h => (h.id === id ? { ...h, status: 'resolved' } : h))
    );
  };

  const addSimulatedHazard = (newHazard) => {
    setHazards(prev => [newHazard, ...prev]);
  };

  return (
    <AlertContext.Provider
      value={{
        hazards,
        activeP1,
        soundEnabled,
        setSoundEnabled,
        bannerVisible,
        setBannerVisible,
        acknowledgeHazard,
        resolveHazard,
        addSimulatedHazard
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => useContext(AlertContext);
