import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ES module replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  build: {
    target: 'es2015',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        blog: resolve(__dirname, 'blog.html'),
        news: resolve(__dirname, 'news.html'),

        blogSraRedevelopment: resolve(
          __dirname,
          'blog-sra-redevelopment.html'
        ),

        blogCommunityEngagement: resolve(
          __dirname,
          'blog-community-engagement.html'
        ),

        blogRegulatoryCompliance: resolve(
          __dirname,
          'blog-regulatory-compliance.html'
        ),

        leadershipManojHarlikar: resolve(
          __dirname,
          'leadership-manoj-harlikar.html'
        ),

        leadershipSrinivasanMohan: resolve(
          __dirname,
          'leadership-srinivasan-mohan.html'
        ),

        leadershipMayilvananPandi: resolve(
          __dirname,
          'leadership-mayilvanan-pandi.html'
        ),

        about: resolve(__dirname, 'about.html'),
        vision: resolve(__dirname, 'vision.html'),
        mission: resolve(__dirname, 'mission.html'),
        leadership: resolve(__dirname, 'leadership.html'),
        coreValues: resolve(__dirname, 'core-values.html'),
        goals: resolve(__dirname, 'goals.html'),
        careers: resolve(__dirname, 'careers.html'),

        tenantManagement: resolve(
          __dirname,
          'tenant-management.html'
        ),

        liaisoning: resolve(__dirname, 'liaisoning.html'),

        iecActivities: resolve(
          __dirname,
          'iec-activities.html'
        ),

        facilityManagement: resolve(
          __dirname,
          'facility-management.html'
        ),
      },
    },
  },
});
