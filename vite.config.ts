import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        finmechanics: resolve(__dirname, 'experience/finmechanics.html'),
        rispri: resolve(__dirname, 'experience/rispri.html'),
        yorbit: resolve(__dirname, 'experience/yorbit.html'),
        markets: resolve(__dirname, 'experience/markets.html'),
        iitb: resolve(__dirname, 'experience/iitb.html'),
        early: resolve(__dirname, 'experience/early.html'),
        projects: resolve(__dirname, 'experience/projects.html')
      }
    }
  }
});
