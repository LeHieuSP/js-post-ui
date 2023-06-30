// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');
export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        postDetail: resolve(__dirname, 'post-detail.html'),
        addEditPost: resolve(__dirname, 'add-edit-post.html'),
      },
    },
  },
});
