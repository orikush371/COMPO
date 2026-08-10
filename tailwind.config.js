/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--c-surface-2) / <alpha-value>)',
        border: 'rgb(var(--c-border) / <alpha-value>)',
        'border-hi': 'rgb(var(--c-border-hi) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        'ink-dim': 'rgb(var(--c-ink-dim) / <alpha-value>)',
        'ink-faint': 'rgb(var(--c-ink-faint) / <alpha-value>)',
        amber: '#f0a83c',
        'amber-2': '#ffcf7a',
        lime: '#c9f24e',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(240,168,60,0.4), 0 8px 30px -8px rgba(240,168,60,0.35)',
      },
      backgroundImage: {
        dots: 'radial-gradient(circle at 1px 1px, #232320 1px, transparent 0)',
      },
    },
  },
  plugins: [],
}

