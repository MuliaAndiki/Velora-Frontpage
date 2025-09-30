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
    background: '#F5EAFF',
    foreground: '#911DEC',
    card: {
      background: '#FFFFFF',
      foreground: '#911DEC',
    },
    popover: {
      background: '#FFFFFF',
      foreground: '#911DEC',
    },
    primary: {
      background: '#911DEC',
      foreground: '#F5EAFF',
    },
    secondary: {
      background: '#F5EAFF',
      foreground: '#911DEC',
    },
    muted: {
      background: '#F5EAFF',
      foreground: 'rgba(145, 29, 236, 0.6)',
    },
    accent: {
      background: '#F5EAFF',
      foreground: '#911DEC',
    },
    destructive: {
      background: '#FA0C00',
      foreground: '#FFFFFF',
    },
    warning: {
      background: '#FECA13',
      foreground: '#FECA1322',
    },
    success: {
      background: '#28DE25',
      foreground: '#28DE2522',
    },
    info: {
      background: '#04B4FC',
      foreground: '#04B4FC22',
    },
    border: 'rgba(145, 29, 236, 0.2)',
    input: 'rgba(145, 29, 236, 0.2)',
    ring: 'rgba(145, 29, 236, 0.3)',
  },
  dark: {
    background: '#0f172a', // slate-900
    foreground: '#F5EAFF',
    card: {
      background: '#1e293b', // slate-800
      foreground: '#F5EAFF',
    },
    popover: {
      background: '#1e293b',
      foreground: '#F5EAFF',
    },
    primary: {
      background: 'linear-gradient(90deg, #f97316 0%, #a21caf 100%)', // orange-500 to purple-800
      foreground: '#fff',
    },
    secondary: {
      background: '#334155', // slate-700
      foreground: '#F5EAFF',
    },
    muted: {
      background: '#1e293b',
      foreground: 'rgba(245, 234, 255, 0.6)',
    },
    accent: {
      background: 'linear-gradient(90deg, #f97316 0%, #a21caf 100%)',
      foreground: '#fff',
    },
    destructive: {
      background: '#FA0C00',
      foreground: '#F5EAFF',
    },
    warning: {
      background: '#FECA13',
      foreground: '#FECA1322',
    },
    success: {
      background: '#28DE25',
      foreground: '#28DE2522',
    },
    info: {
      background: '#04B4FC',
      foreground: '#04B4FC22',
    },
    border: 'rgba(30, 41, 59, 0.7)', // slate-800
    input: 'rgba(30, 41, 59, 0.7)',
    ring: 'rgba(249, 115, 22, 0.3)', // orange-500
  },
};
