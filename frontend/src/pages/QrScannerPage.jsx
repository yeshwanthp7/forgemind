import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  QrCode,
  Camera,
  Keyboard,
  Sparkles,
  ShieldCheck,
  RotateCw,
  AlertTriangle
} from 'lucide-react';
import { getMachineDetail } from '../data/mockMachineDetails';
import { scannerApi } from '../api/endpoints';
import { ScannerViewfinder } from '../components/scanner/ScannerViewfinder';
import { DecodedAssetCard } from '../components/scanner/DecodedAssetCard';
import { ScannerErrorCard } from '../components/scanner/ScannerErrorCard';
import { ManualIdInput } from '../components/scanner/ManualIdInput';

export const QrScannerPage = () => {
  const [scanState, setScanState] = useState('scanning'); // 'scanning' | 'decoding' | 'success' | 'error' | 'manual'
  const [decodedMachine, setDecodedMachine] = useState(null);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);

  const handleSimulateScan = async (scannedCode) => {
    setScanState('decoding');
    try {
      await scannerApi.decodeQr(scannedCode);
      if (scannedCode === 'INVALID-999') {
        setScanState('error');
      } else {
        const machine = getMachineDetail(scannedCode);
        setDecodedMachine(machine);
        setScanState('success');
      }
    } catch (err) {
      setScanState('error');
    }
  };

  const handleManualSubmit = (machineId) => {
    handleSimulateScan(machineId);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-cyan-950/40 border border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-3xl relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2">
              <QrCode className="w-3.5 h-3.5 text-cyan-400" />
              Industrial Equipment Tag Scanner
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[11px] font-mono">
              Optical QR & Barcode HUD
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Factory Machinery QR & Barcode Scanner
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Align camera viewfinder over equipment QR tags for instant telemetry lookup, maintenance dispatch, and ISO safety verification.
          </p>
        </div>

        {/* Scanner Mode Selector */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-2xl p-1 shrink-0 relative z-10">
          <button
            onClick={() => setScanState('scanning')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              scanState !== 'manual'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Optical Camera</span>
          </button>

          <button
            onClick={() => setScanState('manual')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              scanState === 'manual'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Keyboard className="w-4 h-4" />
            <span>Manual ID Input</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <AnimatePresence mode="wait">
          {/* STATE 1: Live Scanning Camera Viewfinder */}
          {scanState === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ScannerViewfinder
                onSimulateScan={handleSimulateScan}
                isFlashlightOn={isFlashlightOn}
                onToggleFlashlight={() => setIsFlashlightOn(!isFlashlightOn)}
              />
            </motion.div>
          )}

          {/* STATE 2: Loading & Decoding Animation */}
          {scanState === 'decoding' && (
            <motion.div
              key="decoding"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 max-w-md mx-auto"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Sparkles className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '3s' }} />
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-100">Decoding Neural QR Pattern...</h3>
                <p className="text-xs text-slate-400 font-mono">Cross-matching equipment checksum with factory registry</p>
              </div>

              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          )}

          {/* STATE 3: Successful Scan Result Screen */}
          {scanState === 'success' && decodedMachine && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DecodedAssetCard
                machine={decodedMachine}
                onResetScan={() => setScanState('scanning')}
              />
            </motion.div>
          )}

          {/* STATE 4: Error Screen */}
          {scanState === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ScannerErrorCard
                onRetry={() => setScanState('scanning')}
                onSwitchToManual={() => setScanState('manual')}
              />
            </motion.div>
          )}

          {/* STATE 5: Manual ID Input Form */}
          {scanState === 'manual' && (
            <motion.div
              key="manual"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ManualIdInput onSubmitId={handleManualSubmit} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
