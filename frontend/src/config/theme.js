/**
 * Enterprise Design System Theme Configuration
 */
export const themeConfig = {
  colors: {
    bg: {
      main: '#07090e',
      card: '#0d121d',
      cardHover: '#131b2c',
      sidebar: '#0a0e17',
      navbar: 'rgba(10, 14, 23, 0.85)',
      input: '#0d121d',
      dropdown: '#111827',
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.08)',
      default: '#1e293b',
      cyber: 'rgba(56, 189, 248, 0.2)',
      cyberGlow: 'rgba(6, 182, 212, 0.5)',
      critical: 'rgba(239, 68, 68, 0.4)',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
      muted: '#64748b',
      inverse: '#0f172a',
    },
    brand: {
      primary: '#06b6d4', // Cyan 500
      primaryHover: '#0891b2', // Cyan 600
      secondary: '#3b82f6', // Blue 500
      accent: '#8b5cf6', // Violet 500
    },
    status: {
      optimal: {
        bg: 'rgba(16, 185, 129, 0.12)',
        border: 'rgba(16, 185, 129, 0.3)',
        text: '#34d399',
        glow: 'rgba(16, 185, 129, 0.25)',
      },
      warning: {
        bg: 'rgba(245, 158, 11, 0.12)',
        border: 'rgba(245, 158, 11, 0.3)',
        text: '#fbbf24',
        glow: 'rgba(245, 158, 11, 0.25)',
      },
      critical: {
        bg: 'rgba(239, 68, 68, 0.12)',
        border: 'rgba(239, 68, 68, 0.3)',
        text: '#f87171',
        glow: 'rgba(239, 68, 68, 0.35)',
      },
      info: {
        bg: 'rgba(6, 182, 212, 0.12)',
        border: 'rgba(6, 182, 212, 0.3)',
        text: '#38bdf8',
        glow: 'rgba(6, 182, 212, 0.25)',
      },
    },
  },
  typography: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
  },
  glassmorphism: {
    panel: 'bg-[#0d121d]/80 backdrop-blur-xl border border-white/10 shadow-2xl',
    panelInteractive: 'bg-[#0d121d]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 hover:shadow-cyan-500/10 transition-all duration-300',
    navbar: 'bg-[#0a0e17]/85 backdrop-blur-md border-b border-white/10',
  },
  animations: {
    pulsePing: 'animate-ping',
    spin: 'animate-spin',
    bounce: 'animate-bounce',
  },
};

export default themeConfig;
