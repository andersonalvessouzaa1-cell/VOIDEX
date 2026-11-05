/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#030712',
          900: '#070b14',
          850: '#0b1120',
          800: '#0f172a',
          700: '#1e293b',
          border: '#1e293b',
        },
        orokin: {
          gold: '#f0c05a',
          light: '#fde68a',
          dark: '#b4831f',
        },
        energy: {
          cyan: '#00f0ff',
          glow: '#38bdf8',
          purple: '#a855f7',
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.3)',
        'glow-gold': '0 0 25px -5px rgba(240, 192, 90, 0.3)',
        'glow-subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'void-gradient': 'radial-gradient(ellipse at top, #0f172a 0%, #070b14 60%, #030712 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
        'orokin-gradient': 'linear-gradient(135deg, #fde68a 0%, #f0c05a 50%, #b4831f 100%)',
        'cyan-gradient': 'linear-gradient(135deg, #38bdf8 0%, #00f0ff 100%)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
