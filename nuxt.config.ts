import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  app: {
    head: {
      title: 'GlovoApp - Your Favorite Delivery Service',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'GlovoApp is your go-to delivery service for food, groceries, and more. Order now and get your favorite items delivered fast!',
        },
      ],
    },
  },

  plugins: ['~/plugins/firebase.client.ts'],

  imports: {
    dirs: [
      'composables',
      'composables/firebase/auth',
      'composables/firebase',
      'composables/firebase/auth/composables',
      'composables/firebase/database',
      'composables/ui',
      'composables/helpers',
    ],
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
