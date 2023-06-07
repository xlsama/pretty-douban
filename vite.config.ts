import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import monkey from 'vite-plugin-monkey'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: [
          'https://www.douban.com/people/*',
          'https://book.douban.com/people/*',
          'https://movie.douban.com/people/*',
          'https://book.douban.com/mine*',
          'https://movie.douban.com/mine*',
        ],
        author: 'xlsama',
        homepageURL: 'https://github.com/xlsama/pretty-douban',
        updateURL: 'https://github.com/xlsama/pretty-douban',
        grant: 'GM_xmlhttpRequest',
      },
      build: {
        fileName: 'pretty-douban.js',
      },
    }),
    visualizer({ open: false }),
  ],
  build: {
    minify: true,
  },
})
