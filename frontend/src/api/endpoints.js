import { apiClient } from './apiClient';
import { machineService, incidentService, getTickets, getTicketById, updateStatus, createTicket, createWorkOrder } from './services';

export const dashboardApi = {
  getOverview: () => apiClient.get('/dashboard/overview'),
};

export const inventoryApi = {
  getMachines: (params) => machineService.getMachines(params),
  getMachineById: (id) => machineService.getMachineById(id),
  createMachine: (data) => machineService.createMachine(data),
  updateMachineById: (id, data) => machineService.updateMachine(id, data),
  deleteMachineById: (id) => machineService.deleteMachine(id),
};

export const scannerApi = {
  decodeQr: (code) => apiClient.post('/scanner/decode', { code }),
};

export const incidentApi = {
  uploadIncident: (formData) => incidentService.uploadIncident(formData),
  getIncidents: (params) => incidentService.getIncidents(params),
};

export const aiAnalysisApi = {
    analyzeIncident: (incidentId) =>
        incidentService.analyzeIncident(incidentId),
};

export const ticketApi = {
  getTickets,
  getTicketById,
  updateStatus,
  createTicket,
  createWorkOrder,
};

export const reportsApi = {
  getAnalytics: (params) => apiClient.get('/reports/analytics', { params }),
};

export const assistantApi = {
  sendMessage: (prompt, threadId) => apiClient.post('/assistant/chat', { prompt, threadId }),
};
