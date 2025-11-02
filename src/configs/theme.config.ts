interface ColorConfig {
  background: string;
  foreground: string;
}

interface ThemeConfig {
  light: {
    background: string;
    foreground: string;
    card: ColorConfig;
    popover: ColorConfig;
    primary: ColorConfig;
    secondary: ColorConfig;
    muted: ColorConfig;
    accent: ColorConfig;
    destructive: ColorConfig;
    warning: ColorConfig;
    success: ColorConfig;
    info: ColorConfig;
    border: string;
    input: string;
    ring: string;
  };
  dark: {
    background: string;
    foreground: string;
    card: ColorConfig;
    popover: ColorConfig;
    primary: ColorConfig;
    secondary: ColorConfig;
    muted: ColorConfig;
    accent: ColorConfig;
    destructive: ColorConfig;
    warning: ColorConfig;
    success: ColorConfig;
    info: ColorConfig;
    border: string;
    input: string;
    ring: string;
  };
}

export const themeConfig: ThemeConfig = {
  light: {
    background: '#F9FAFB',
    foreground: '#1F2937',
    card: {
      background: '#FFFFFF',
      foreground: '#1F2937',
    },
    popover: {
      background: '#FFFFFF',
      foreground: '#1F2937',
    },
    primary: {
      background: '#7C3AED',
      foreground: '#FFFFFF',
    },
    secondary: {
      background: '#E5E7EB',
      foreground: '#374151',
    },
    muted: {
      background: '#F3F4F6',
      foreground: '#6B7280',
    },
    accent: {
      background: '#8B5CF6',
      foreground: '#FFFFFF',
    },
    destructive: {
      background: '#EF4444',
      foreground: '#FFFFFF',
    },
    warning: {
      background: '#F59E0B',
      foreground: '#1F2937',
    },
    success: {
      background: '#10B981',
      foreground: '#FFFFFF',
    },
    info: {
      background: '#3B82F6',
      foreground: '#FFFFFF',
    },
    border: '#E5E7EB',
    input: '#E5E7EB',
    ring: 'rgba(124, 58, 237, 0.3)',
  },
  dark: {
    background: '#0F172A',
    foreground: '#E5E7EB',
    card: {
      background: '#1E293B',
      foreground: '#E5E7EB',
    },
    popover: {
      background: '#1E293B',
      foreground: '#E5E7EB',
    },
    primary: {
      background: '#8B5CF6',
      foreground: '#FFFFFF',
    },
    secondary: {
      background: '#334155',
      foreground: '#E5E7EB',
    },
    muted: {
      background: '#1E293B',
      foreground: '#9CA3AF',
    },
    accent: {
      background: '#7C3AED',
      foreground: '#FFFFFF',
    },
    destructive: {
      background: '#EF4444',
      foreground: '#F3F4F6',
    },
    warning: {
      background: '#F59E0B',
      foreground: '#1E293B',
    },
    success: {
      background: '#10B981',
      foreground: '#1E293B',
    },
    info: {
      background: '#3B82F6',
      foreground: '#1E293B',
    },
    border: '#334155',
    input: '#334155',
    ring: 'rgba(139, 92, 246, 0.3)',
  },
};
