import axios from 'axios';
import { mockDashboardData } from '../data/mockDashboardData';
import { mockInventoryMachines } from '../data/mockInventoryData';
import { mockMachineDetailsMap } from '../data/mockMachineDetails';
import { mockAiAnalysisData } from '../data/mockAiAnalysisData';
import { mockTicketDetailsMap } from '../data/mockTicketDetails';
import { mockReportsData } from '../data/mockReportsData';
import { mockAiAssistantData } from '../data/mockAiAssistantData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Fallback Mock Resolver Interceptor
// Intercepts network disconnects or 404s and gracefully resolves with local dataset after realistic delay
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Simulate 350ms network delay for fallback resolution
    await new Promise((resolve) => setTimeout(resolve, 350));

    const url = config?.url || '';

    // Route matching for mock fallback
    if (url.includes('/dashboard/overview')) {
      return { data: mockDashboardData, status: 200, statusText: 'OK (Mock Fallback)' };
    }
    if (url.includes('/machines/') || url.includes('/inventory/')) {
      const parts = url.split('/');
      const id = parts[parts.length - 1];
      const detail = mockMachineDetailsMap[id] || mockMachineDetailsMap['HP-9042'];
      return { data: detail, status: 200, statusText: 'OK (Mock Fallback)' };
    }
    if (url.includes('/machines') || url.includes('/inventory')) {
      return { data: mockInventoryMachines, status: 200, statusText: 'OK (Mock Fallback)' };
    }
    if (url.includes('/ai/analysis')) {
      return { data: mockAiAnalysisData, status: 200, statusText: 'OK (Mock Fallback)' };
    }
    if (url.includes('/tickets/') || url.includes('/work-orders/')) {
      const parts = url.split('/');
      const id = parts[parts.length - 1];
      const detail = mockTicketDetailsMap[id] || mockTicketDetailsMap['WO-9902'];
      return { data: detail, status: 200, statusText: 'OK (Mock Fallback)' };
    }
    if (url.includes('/tickets')) {
      return { data: Object.values(mockTicketDetailsMap), status: 200, statusText: 'OK (Mock Fallback)' };
    }
    if (url.includes('/reports/analytics')) {
      return { data: mockReportsData, status: 200, statusText: 'OK (Mock Fallback)' };
    }
    if (url.includes('/assistant/chat')) {
      return {
        data: {
          reply: mockAiAssistantData.cannedResponses.default,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        status: 200,
        statusText: 'OK (Mock Fallback)',
      };
    }

    return Promise.reject(error);
  }
);
