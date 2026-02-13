/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Primary Palette - Refined & Crisp */
        'deep-ink': '#0a0d1a',
        'midnight': '#0f1427',
        'slate': '#1a1f35',
        
        /* Accent Colors - Enhanced */
        'cyan-bright': '#00e5ff',
        'ocean': '#0099dd',
        'emerald': '#00d47f',
        'slate-gray': '#4a5568',
        
        /* Neutral Colors */
        'white': '#ffffff',
        'light-gray': '#f0f2f5',
        'medium-gray': '#b0b5bc',
        'dark-gray': '#6b7280',
        
        /* Semantic */
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
      },
      fontFamily: {
        serif: ['Syne', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '48px',
        '5xl': '56px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '80px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0, 0, 0, 0.12)',
        md: '0 4px 12px rgba(0, 0, 0, 0.15)',
        lg: '0 12px 32px rgba(0, 0, 0, 0.18)',
        xl: '0 20px 48px rgba(0, 0, 0, 0.20)',
      },
    },
  },
  plugins: [],
}
