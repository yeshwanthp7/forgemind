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
  createMachine: (data) => apiClient.post('/machines', data),
  updateMachine: (id, data) => apiClient.put(`/machines/${id}`, data),
  deleteMachine: (id) => apiClient.delete(`/machines/${id}`),
  updateTelemetry: (id, data) => apiClient.put(`/machines/${id}/telemetry`, data),
  getHistory: (id) => apiClient.get(`/machines/${id}/history`),
};

export const incidentService = {
  uploadIncident: (formData) =>
    apiClient.post('/incidents', formData),
  getIncidents: (params) => apiClient.get('/incidents', { params }),
  approveIncident: (id) => apiClient.post(`/incidents/${id}/approve`),
  analyzeIncident: (id) => apiClient.post(`/incidents/${id}/analyze`),
};

export const aiService = {
  analyzeIncident: (incidentId) => apiClient.post(`/incidents/${incidentId}/analyze`),
  runInference: (payload) => apiClient.post('/ai/inference', payload),
  sendMessage: (prompt, threadId) => apiClient.post('/ai/assistant', { prompt, threadId }),
};

export const ticketService = {
  getTickets: (params) => apiClient.get('/tickets', { params }),
  getTicketById: (id) => apiClient.get(`/tickets/${id}`),
  updateStatus: (id, status) => apiClient.patch(`/tickets/${id}`, { status }),
  createWorkOrder: (ticketData) => apiClient.post('/tickets', ticketData),
  createTicket: (ticketData) => apiClient.post('/tickets', ticketData),
};

export const getTickets = (params) => ticketService.getTickets(params);
export const getTicketById = (id) => ticketService.getTicketById(id);
export const updateStatus = (id, status) => ticketService.updateStatus(id, status);
export const createTicket = (ticketData) => ticketService.createTicket(ticketData);
export const createWorkOrder = (ticketData) => ticketService.createWorkOrder(ticketData);

export const reportService = {
  getAnalytics: (params) => apiClient.get('/reports/analytics', { params }),
  exportPdf: () => apiClient.get('/reports/export-pdf', { responseType: 'blob' }),
  exportCsv: () => apiClient.get('/reports/export-csv', { responseType: 'blob' }),
};