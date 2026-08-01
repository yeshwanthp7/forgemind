import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAssets } from '../data/mockAssets';

const TelemetryContext = createContext();

export const TelemetryProvider = ({ children }) => {
  const [assets, setAssets] = useState(mockAssets);
  const [liveStreamActive, setLiveStreamActive] = useState(true);

  // Periodically simulate small micro-fluctuations in live machine telemetry
  useEffect(() => {
    if (!liveStreamActive) return;

    const interval = setInterval(() => {
      setAssets(prevAssets =>
        prevAssets.map(asset => {
          if (asset.id === "HP-9042") {
            // Keep HP-9042 in high vibration / temp state for demo
            const deltaTemp = (Math.random() - 0.4) * 0.8;
            const newTemp = Math.max(175, Math.min(195, parseFloat(asset.temperature) + deltaTemp)).toFixed(1);
            return {
              ...asset,
              temperature: `${newTemp} °C`
            };
          } else {
            // Slight normal noise
            const deltaTemp = (Math.random() - 0.5) * 0.4;
            const baseTemp = parseFloat(asset.temperature);
            const newTemp = (baseTemp + deltaTemp).toFixed(1);
            return {
              ...asset,
              temperature: `${newTemp} °C`
            };
          }
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [liveStreamActive]);

  const triggerMachineAnomaly = (assetId) => {
    setAssets(prev =>
      prev.map(a => {
        if (a.id === assetId) {
          return {
            ...a,
            status: 'critical',
            healthScore: 35,
            vibrationFrequency: '9.2 mm/s',
            temperature: '192.5 °C',
            rulPercentage: 12
          };
        }
        return a;
      })
    );
  };

  return (
    <TelemetryContext.Provider
      value={{
        assets,
        liveStreamActive,
        setLiveStreamActive,
        triggerMachineAnomaly
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = () => useContext(TelemetryContext);
