import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: '/<my-pokemon-translator>/', // Chemin relatif à GitHub Pages
});