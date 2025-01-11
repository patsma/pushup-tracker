// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  ssr: false,
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      mode: process.env.NODE_ENV,
    },
  },

  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },

  vite: {
    server: {
      hmr: {
        clientPort: 3000,
      },
    },
  },

  modules: ["nuxt-auth-utils", "@nuxt/ui", "@nuxtjs/color-mode"],

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },

  ui: {
    global: true,
    icons: ["heroicons"],
  },

  app: {
    head: {
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      meta: [
        { name: "format-detection", content: "telephone=no" },
        { name: "theme-color", content: "#b83f45" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  appTemplate: "./app.html",
});
