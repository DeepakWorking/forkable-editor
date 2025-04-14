/** @type {import('tailwindcss').Config} */
import preset from './src/components/Theme/preset.ts';
export default {
  presets: [preset],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
};
