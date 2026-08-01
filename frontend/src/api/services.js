import { apiClient } from './apiClient';

export const authService = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  logout: () => apiClient.post('/auth/logout'),
  getProfile: () => apiClient.get('/auth/profile'),
  refreshToken: () => apiClient.post('/auth/refresh-token'),
};

export const dashboardService = {
  getOverview: () => apiClient.get('/dashboard/overview'),
  getKpiMetrics: () => apiClient.get('/dashboard/kpis'),
  getRecentActivity: () => apiClient.get('/dashboard/activity'),
};

export const machineService = {
  getMachines: (params) => apiClient.get('/machines', { params }),
  getMachineById: (id) => apiClient.get(`/machines/${id}`),
  updateTelemetry: (id, data) => apiClient.put(`/machines/${id}/telemetry`, data),
  getHistory: (id) => apiClient.get(`/machines/${id}/history`),
};

export const incidentService = {
  uploadIncident: (formData) =>
    apiClient.post('/incidents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getIncidents: (params) => apiClient.get('/incidents', { params }),
  approveIncident: (id) => apiClient.post(`/incidents/${id}/approve`),
};

export const aiService = {
  getAnalysis: (assetId) => apiClient.get(`/ai/analysis/${assetId}`),
  runInference: (payload) => apiClient.post('/ai/inference', payload),
  sendMessage: (prompt, threadId) => apiClient.post('/ai/assistant', { prompt, threadId }),
};

export const ticketService = {
  getTickets: (params) => apiClient.get('/tickets', { params }),
  getTicketById: (id) => apiClient.get(`/tickets/${id}`),
  updateStatus: (id, status) => apiClient.patch(`/tickets/${id}`, { status }),
  createWorkOrder: (ticketData) => apiClient.post('/tickets', ticketData),
};

export const reportService = {
  getAnalytics: (params) => apiClient.get('/reports/analytics', { params }),
  exportPdf: () => apiClient.get('/reports/export-pdf', { responseType: 'blob' }),
  exportCsv: () => apiClient.get('/reports/export-csv', { responseType: 'blob' }),
};
