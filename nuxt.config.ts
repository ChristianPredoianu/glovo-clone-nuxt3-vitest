import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  plugins: ['~/plugins/firebase.client.ts'],

  imports: {
    dirs: [
      'composables',
      'composables/firebase/auth',
      'composables/firebase/database',
      'composables/firebase/database/favorite-items',
      'composables/ui',
      'composables/helpers',
    ],
  },

  routeRules: {
    '/dashboard/**': { appMiddleware: 'auth' },
    '/my-account/**': { appMiddleware: 'auth' }, // This will apply auth middleware to all routes under /dashboard
  },

  runtimeConfig: {
    public: {
      apiKeyLocationReverse: process.env.NUXT_PUBLIC_API_KEY_LOCATION_REVERSE,
      edamamAppId: process.env.NUXT_PUBLIC_EDAMAM_APP_ID,
      edamamAppKey: process.env.NUXT_PUBLIC_EDAMAM_APP_KEY,

      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
    },
  },

  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxt/image'],

  googleFonts: {
    families: {
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
    },
  },

  css: ['@fortawesome/fontawesome-svg-core/styles.css', '@/assets/transitions.css'],

  components: [
    { path: '@/components/header', extensions: ['vue'] },
    { path: '@/components/header/links', extensions: ['vue'] },
    { path: '@/components/ui', extensions: ['vue'] },
    { path: '@/components/forms', extensions: ['vue'] },
    { path: '@/components/cards', extensions: ['vue'] },
    { path: '@/components/buttons', extensions: ['vue'] },
    { path: '@/components/filters', extensions: ['vue'] },
    { path: '@/components/modals', extensions: ['vue'] },
    { path: '@/components/counters', extensions: ['vue'] },
    { path: '@/components/lists', extensions: ['vue'] },
    { path: '@/components/menus', extensions: ['vue'] },
    { path: '@/components/inputs', extensions: ['vue'] },
  ],

  compatibilityDate: '2024-11-13',
});
