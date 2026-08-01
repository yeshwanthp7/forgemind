import {
  LayoutDashboard,
  AlertTriangle,
  Activity,
  Ticket,
  BarChart3,
  Settings,
  ShieldAlert,
  Server,
  Users,
  FileText,
  QrCode,
  UploadCloud,
  Brain,
  Bot
} from 'lucide-react';

export const NAVIGATION_ITEMS = [
  {
    section: 'OPERATIONS',
    items: [
      {
        path: '/dashboard',
        label: 'Factory Dashboard',
        icon: LayoutDashboard,
        badge: { text: 'Live', variant: 'cyber' },
      },
      {
        path: '/ai-assistant',
        label: 'AI Assistant',
        icon: Bot,
        badge: { text: 'ChatGPT', variant: 'cyber' },
      },
      {
        path: '/scanner',
        label: 'QR Asset Scanner',
        icon: QrCode,
        badge: { text: 'HUD', variant: 'cyber' },
      },
      {
        path: '/inventory',
        label: 'Machine Inventory',
        icon: Server,
        badge: { text: '16', variant: 'info' },
      },
      {
        path: '/hazards',
        label: 'Hazard Monitor',
        icon: AlertTriangle,
        badge: { text: '3 High', variant: 'critical' },
      },
      {
        path: '/telemetry',
        label: 'Live Telemetry',
        icon: Activity,
        badge: { text: 'Live', variant: 'info' },
      },
    ],
  },
  {
    section: 'MANAGEMENT',
    items: [
      {
        path: '/tickets/new',
        label: 'Upload Incident',
        icon: UploadCloud,
        badge: { text: 'New', variant: 'critical' },
      },
      {
        path: '/tickets',
        label: 'Incident Tickets',
        icon: Ticket,
        badge: { text: '12', variant: 'warning' },
      },
      {
        path: '/ai-analysis',
        label: 'AI Sentinel Analysis',
        icon: Brain,
        badge: { text: 'AI Core', variant: 'cyber' },
      },
      {
        path: '/reports',
        label: 'Executive Reports',
        icon: BarChart3,
        badge: null,
      },
    ],
  },
  {
    section: 'SYSTEM',
    items: [
      {
        path: '/settings',
        label: 'Settings & Config',
        icon: Settings,
        badge: null,
      },
    ],
  },
];

export const USER_PROFILE_NAV = {
  name: 'Cmdr. Alex Vance',
  role: 'Senior Incident Director',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  status: 'online',
};
