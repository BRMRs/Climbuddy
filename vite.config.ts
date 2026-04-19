import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/CPT208_C2-3/Climbuddy/',
  build: {
    outDir: 'dist/Climbuddy',
    sourcemap: false,
  },
});
