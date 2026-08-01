import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import { TelemetryProvider } from './context/TelemetryContext';
import { CopilotProvider } from './context/CopilotContext';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AlertProvider>
            <TelemetryProvider>
              <CopilotProvider>
                <AppRoutes />
              </CopilotProvider>
            </TelemetryProvider>
          </AlertProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
