// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      mode: process.env.NODE_ENV,
      signalingServer: process.env.NUXT_PUBLIC_SIGNALING_SERVER_URL,
    },
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },

  vite: {
    server: {
      hmr: {
        clientPort: 3000,
      },
    },
  },

  modules: ['@nuxt/ui', '@nuxtjs/color-mode'],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },

  ui: {
    global: true,
  },

  app: {
    head: {
      title: 'Pushup Tracker - Real-time Workout Tracking',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1',
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#111827' },
        {
          name: 'description',
          content:
            'Track your daily pushups and compete with friends in real-time. A simple, effective way to stay motivated and achieve your fitness goals.',
        },

        // Apple specific
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
        { name: 'apple-mobile-web-app-title', content: 'Pushup Tracker' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://pushup-tracker.netlify.app/' },
        {
          property: 'og:title',
          content: 'Pushup Tracker - Real-time Workout Tracking',
        },
        {
          property: 'og:description',
          content:
            'Track your daily pushups and compete with friends in real-time. A simple, effective way to stay motivated and achieve your fitness goals.',
        },
        { property: 'og:site_name', content: 'Pushup Tracker' },
        {
          property: 'og:image',
          content: 'https://pushup-tracker.netlify.app/og-image.jpg',
        },
        {
          property: 'og:image:secure_url',
          content: 'https://pushup-tracker.netlify.app/og-image.jpg',
        },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        {
          property: 'og:image:alt',
          content: 'Pushup Tracker - Track your workouts',
        },
        { property: 'og:locale', content: 'en_US' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://pushup-tracker.netlify.app/' },
        {
          name: 'twitter:title',
          content: 'Pushup Tracker - Real-time Workout Tracking',
        },
        {
          name: 'twitter:description',
          content:
            'Track your daily pushups and compete with friends in real-time. A simple, effective way to stay motivated and achieve your fitness goals.',
        },
        {
          name: 'twitter:image',
          content: 'https://pushup-tracker.netlify.app/og-image.jpg',
        },
        {
          name: 'twitter:image:alt',
          content: 'Pushup Tracker - Track your workouts',
        },
        { name: 'mobile-web-app-capable', content: 'yes' },
      ],
      link: [
        // Favicons
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
});
