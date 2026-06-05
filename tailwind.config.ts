import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0F4C81',
        'brand-secondary': '#1E6BA8',
        accent: '#F59E0B',
        ink: '#1F2937',
        canvas: '#F8FAFC'
      },
      boxShadow: {
        institution: '0 12px 30px rgba(15, 76, 129, 0.10)'
      }
    }
  },
  plugins: []
};
export default config;
