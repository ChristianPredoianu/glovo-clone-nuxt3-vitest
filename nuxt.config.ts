import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  plugins: [
    '~/plugins/firebase.client.ts', // Correct usage for plugins in Nuxt 3
  ],

  imports: {
    dirs: ['composables', 'composables/auth', 'composables/ui'],
  },
  /*  runtimeConfig: {
    apiEdamamAppKey: '4b4dc5f4bc65e69c3e05af0392a55b18%09',
    public: {
      apiSecretLocationReverse: 'pk.a75cdfe1cc307b34218d8021f4122dc6',
      apiEdamamAppId: 'e5a7e476',
      apiEdamamAppKey: '4b4dc5f4bc65e69c3e05af0392a55b18%09',
    },
  }, */

  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],

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
  ],

  devtools: { enabled: true },
});
