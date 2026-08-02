import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts';
import { ProtectedRoute } from './ProtectedRoute';

// Auth & Role-Specific Pages
import { Login } from '../pages/auth/Login';
import { WorkerDashboard } from '../pages/worker/WorkerDashboard';
import { SafetyDashboard } from '../pages/safety/SafetyDashboard';

// Enterprise Dashboard Pages
import { DashboardPage } from '../pages/DashboardPage';
import { MachineInventoryPage } from '../pages/MachineInventoryPage';
import { MachineDetailPage } from '../pages/MachineDetailPage';
import { QrScannerPage } from '../pages/QrScannerPage';
import { IncidentUploadPage } from '../pages/IncidentUploadPage';
import { AiAnalysisPage } from '../pages/AiAnalysisPage';
import { AiAssistantPage } from '../pages/AiAssistantPage';
import { OverviewPage } from '../pages/OverviewPage';
import { HazardsPage } from '../pages/HazardsPage';
import { HazardDetailPage } from '../pages/HazardDetailPage';
import { TelemetryPage } from '../pages/TelemetryPage';
import { AssetDetailPage } from '../pages/AssetDetailPage';
import { TicketsPage } from '../pages/TicketsPage';
import { TicketDetailPage } from '../pages/TicketDetailPage';
import { ReportsPage } from '../pages/ReportsPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { ErrorState } from '../components/ui/ErrorState';

// 404 Fallback Page
const NotFoundPage = () => (
  <ErrorState
    title="404 - Page Not Found"
    message="The requested route or resource does not exist in the ForgeMind Sentinel AI enterprise catalog."
    errorCode="ERR_ROUTE_NOT_FOUND"
    onBack={() => window.history.back()}
  />
);

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes Container inside AppLayout */}
      <Route element={<AppLayout />}>
        {/* Default Index Route */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Worker Role Route */}
        <Route
          path="worker"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Plant Manager']}>
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Safety Officer Role Route */}
        <Route
          path="safety"
          element={
            <ProtectedRoute allowedRoles={['Safety Officer', 'Plant Manager']}>
              <SafetyDashboard />
            </ProtectedRoute>
          }
        />

        {/* Plant Manager / Executive Routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRoles={['Plant Manager']}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="overview"
          element={
            <ProtectedRoute allowedRoles={['Plant Manager']}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Shared Machinery & Operating Routes */}
        <Route
          path="inventory"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Safety Officer', 'Plant Manager']}>
              <MachineInventoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="inventory/:id"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Safety Officer', 'Plant Manager']}>
              <MachineDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="machines"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Safety Officer', 'Plant Manager']}>
              <MachineInventoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="machines/:id"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Safety Officer', 'Plant Manager']}>
              <MachineDetailPage />
            </ProtectedRoute>
          }
        />

        {/* QR Scanner & Ticket Upload */}
        <Route
          path="scanner"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Safety Officer', 'Plant Manager']}>
              <QrScannerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="qr-scanner"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Safety Officer', 'Plant Manager']}>
              <QrScannerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="tickets/new"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Safety Officer', 'Plant Manager']}>
              <IncidentUploadPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="incidents/upload"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Safety Officer', 'Plant Manager']}>
              <IncidentUploadPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="upload-incident"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Safety Officer', 'Plant Manager']}>
              <IncidentUploadPage />
            </ProtectedRoute>
          }
        />

        {/* EHS Hazard & AI Surveillance Routes */}
        <Route
          path="hazards"
          element={
            <ProtectedRoute allowedRoles={['Safety Officer', 'Plant Manager']}>
              <HazardsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="hazards/:id"
          element={
            <ProtectedRoute allowedRoles={['Safety Officer', 'Plant Manager']}>
              <HazardDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="telemetry"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Safety Officer', 'Plant Manager']}>
              <TelemetryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="telemetry/:deviceId"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Safety Officer', 'Plant Manager']}>
              <AssetDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="tickets"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Safety Officer', 'Plant Manager']}>
              <TicketsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="tickets/:id"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Safety Officer', 'Plant Manager']}>
              <TicketDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="work-orders/:id"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Safety Officer', 'Plant Manager']}>
              <TicketDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
        path="analytics/:incidentId"
          element={
          <ProtectedRoute allowedRoles={['Safety Officer', 'Plant Manager']}>
            <AiAnalysisPage />
          </ProtectedRoute>
      }
    />
        <Route
        path="ai-analysis/:incidentId"
        element={
          <ProtectedRoute allowedRoles={['Safety Officer', 'Plant Manager']}>
            <AiAnalysisPage />
          </ProtectedRoute>
        }
/>
        <Route
          path="ai-assistant"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Safety Officer', 'Plant Manager']}>
              <AiAssistantPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="assistant"
          element={
            <ProtectedRoute allowedRoles={['Worker', 'Safety Officer', 'Plant Manager']}>
              <AiAssistantPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="reports"
          element={
            <ProtectedRoute allowedRoles={['Safety Officer', 'Plant Manager']}>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute allowedRoles={['Plant Manager']}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
