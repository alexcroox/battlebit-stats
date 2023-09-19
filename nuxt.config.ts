import { fileURLToPath } from 'url'

console.log(fileURLToPath(new URL('./src', import.meta.url)))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',

  devtools: { enabled: true },

  typescript: {
    shim: false,
  },

  components: [{ path: '~/components', pathPrefix: false }],

  modules: ['@nuxtjs/i18n', 'nuxt-icon'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  i18n: {
    strategy: 'no_prefix',
    lazy: true,
    langDir: 'locales/',
    locales: [
      {
        code: 'en',
        file: 'en.json',
      },
    ],
    defaultLocale: 'en',
  },
})
