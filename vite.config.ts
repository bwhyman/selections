import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import externalGlobals from 'rollup-plugin-external-globals'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteCompression()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api/': {
        target: 'http://114.116.203.165:8855/',
        changeOrigin: true,
      },
    },
  },
  base: './',
  build: {
    sourcemap: false,
    rollupOptions: {
      external: ['vue', 'element-plus', 'xlsx', 'vue-demi'],
      plugins: [
        externalGlobals({
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          xlsx: 'XLSX',
          'vue-demi': 'VueDemi',
        }),
      ],
    },
  },
})
