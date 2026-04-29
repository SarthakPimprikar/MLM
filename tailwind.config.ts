import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        display: ['var(--font-syne)', 'sans-serif'],
      },
      colors: {
        bg: '#FFFFFF', // Clean white background
        surface: '#131241', // Dark blue cards
        surface2: '#1c2030',
        admin: '#6029F1',
        sh: '#34d399',
        hba: '#fbbf24',
        hcm: '#f87171',
        hcc: '#60a5fa',
        muted: '#6b7280',
        borderLight: 'rgba(255,255,255,0.05)',
        textDark: '#ffffff', // In dark theme, dark text becomes white
        textLight: '#ffffff',
        slate: '#94a3b8',
        sidebarBg: '#131241',
        topbarBg: '#131241',
      },
      borderColor: {
        DEFAULT: 'rgba(0,0,0,0.05)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
