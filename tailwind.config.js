/** @type {import('tailwindcss').Config} */
// Tema Matrix Green (21st.dev, serafimcloud): raio 0, verde #00FF41 sobre preto, borda #003B00, sombra verde 10px/1px/20%.
// Nomes antigos preservados: "energy-cyan" agora é o VERDE principal; "orokin-gold" é o âmbar de preços.
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    borderRadius: { none: '0', sm: '0', DEFAULT: '0', md: '0', lg: '0', xl: '0', '2xl': '0', '3xl': '0', full: '9999px' },
    extend: {
      fontFamily: { sans: ['var(--font-body)', 'system-ui', 'sans-serif'], display: ['var(--font-display)', 'Courier New', 'monospace'] },
      colors: {
        void: { 950: '#000000', 900: '#040B05', 850: '#071209', 800: '#0B1D0E', 700: '#0B3D12', border: '#003B00' },
        orokin: { gold: '#FFB000', light: '#FFD36B', dark: '#B37A00' },
        energy: { cyan: '#00FF41', glow: '#00FF41', purple: '#008F11' },
        // Familias padrao do Tailwind remapeadas para a paleta Matrix (verde = ok/ativo, ambar = aviso/preco, vermelho = erro).
        emerald: { 50: '#E8FFEE', 100: '#C9FFD8', 200: '#9BFFB6', 300: '#66FF8A', 400: '#33FF63', 500: '#00FF41', 600: '#00CC34', 700: '#008F11', 800: '#005F0C', 900: '#003B00', 950: '#001F00' }, green: { 50: '#E8FFEE', 100: '#C9FFD8', 200: '#9BFFB6', 300: '#66FF8A', 400: '#33FF63', 500: '#00FF41', 600: '#00CC34', 700: '#008F11', 800: '#005F0C', 900: '#003B00', 950: '#001F00' }, cyan: { 50: '#E8FFEE', 100: '#C9FFD8', 200: '#9BFFB6', 300: '#66FF8A', 400: '#33FF63', 500: '#00FF41', 600: '#00CC34', 700: '#008F11', 800: '#005F0C', 900: '#003B00', 950: '#001F00' }, teal: { 50: '#E8FFEE', 100: '#C9FFD8', 200: '#9BFFB6', 300: '#66FF8A', 400: '#33FF63', 500: '#00FF41', 600: '#00CC34', 700: '#008F11', 800: '#005F0C', 900: '#003B00', 950: '#001F00' }, sky: { 50: '#E8FFEE', 100: '#C9FFD8', 200: '#9BFFB6', 300: '#66FF8A', 400: '#33FF63', 500: '#00FF41', 600: '#00CC34', 700: '#008F11', 800: '#005F0C', 900: '#003B00', 950: '#001F00' },
        amber: { 50: '#FFF7E0', 100: '#FFEBB8', 200: '#FFDC85', 300: '#FFD36B', 400: '#FFC233', 500: '#FFB000', 600: '#E09A00', 700: '#B37A00', 800: '#805700', 900: '#4D3400', 950: '#2A1C00' }, orange: { 50: '#FFF7E0', 100: '#FFEBB8', 200: '#FFDC85', 300: '#FFD36B', 400: '#FFC233', 500: '#FFB000', 600: '#E09A00', 700: '#B37A00', 800: '#805700', 900: '#4D3400', 950: '#2A1C00' }, yellow: { 50: '#FFF7E0', 100: '#FFEBB8', 200: '#FFDC85', 300: '#FFD36B', 400: '#FFC233', 500: '#FFB000', 600: '#E09A00', 700: '#B37A00', 800: '#805700', 900: '#4D3400', 950: '#2A1C00' },
        rose: { 50: '#FFF0F1', 100: '#FFDDE0', 200: '#FFB8BF', 300: '#FF8A94', 400: '#FF5C6C', 500: '#FF3347', 600: '#D9202F', 700: '#A8141F', 800: '#730E16', 900: '#4A090E', 950: '#280407' }, red: { 50: '#FFF0F1', 100: '#FFDDE0', 200: '#FFB8BF', 300: '#FF8A94', 400: '#FF5C6C', 500: '#FF3347', 600: '#D9202F', 700: '#A8141F', 800: '#730E16', 900: '#4A090E', 950: '#280407' },
        slate: { 50: '#F0FFF2', 100: '#DFFBE3', 200: '#BFF2C6', 300: '#9BD9A4', 400: '#6FAE79', 500: '#4B8454', 600: '#2F5C37', 700: '#1E4025', 800: '#12281A', 900: '#0A170E', 950: '#050C07' },
      },
      boxShadow: { 'glow-cyan': '0 0 10px 1px rgba(0,255,65,0.2)', 'glow-gold': '0 0 10px 1px rgba(255,176,0,0.2)', 'glow-subtle': '0 1px 0 rgba(255,255,255,0.03) inset' },
      backgroundImage: { 'void-gradient': 'linear-gradient(#000,#000)', 'card-gradient': 'linear-gradient(#040B05,#040B05)', 'orokin-gradient': 'linear-gradient(#FFB000,#FFB000)', 'cyan-gradient': 'linear-gradient(#00FF41,#00FF41)' },
      keyframes: { pulseGlow: { '0%, 100%': { opacity: '0.4' }, '50%': { opacity: '0.8' } }, float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-5px)' } } },
      animation: { 'pulse-glow': 'pulseGlow 4s ease-in-out infinite', float: 'float 3s ease-in-out infinite' },
    },
  },
  plugins: [],
};
