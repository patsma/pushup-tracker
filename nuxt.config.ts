// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      mode: process.env.NODE_ENV
    }
  },

  vite: {
    server: {
      hmr: {
        clientPort: 3000
      }
    }
  },

  modules: ['nuxt-auth-utils'],
})