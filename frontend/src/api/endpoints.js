import { apiClient } from './apiClient';

export const dashboardApi = {
  getOverview: () => apiClient.get('/dashboard/overview'),
};

export const inventoryApi = {
  getMachines: (params) => apiClient.get('/machines', { params }),
  getMachineById: (id) => apiClient.get(`/machines/${id}`),
};

export const scannerApi = {
  decodeQr: (code) => apiClient.post('/scanner/decode', { code }),
};

export const incidentApi = {
  uploadIncident: (formData) => apiClient.post('/incidents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const aiAnalysisApi = {
  getAnalysis: (id) => apiClient.get(`/ai/analysis/${id || 'HP-9042'}`),
};

export const ticketApi = {
  getTickets: () => apiClient.get('/tickets'),
  getTicketById: (id) => apiClient.get(`/tickets/${id}`),
  updateStatus: (id, status) => apiClient.patch(`/tickets/${id}`, { status }),
};

export const reportsApi = {
  getAnalytics: (params) => apiClient.get('/reports/analytics', { params }),
};

export const assistantApi = {
  sendMessage: (prompt, threadId) => apiClient.post('/assistant/chat', { prompt, threadId }),
};
