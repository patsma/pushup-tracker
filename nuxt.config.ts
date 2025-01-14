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

  modules: ["nuxt-auth-utils", "@nuxt/ui", "@nuxtjs/color-mode", "@nuxtjs/seo"],

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
      title: "Pushup Tracker - Real-time Workout Tracking",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
        {
          name: "description",
          content:
            "Track your daily pushups and compete with friends in real-time. A simple, effective way to stay motivated and achieve your fitness goals.",
        },

        // Open Graph / Facebook
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://pushup-tracker.netlify.app/" },
        {
          property: "og:title",
          content: "Pushup Tracker - Real-time Workout Tracking",
        },
        {
          property: "og:description",
          content:
            "Track your daily pushups and compete with friends in real-time. A simple, effective way to stay motivated and achieve your fitness goals.",
        },
        {
          property: "og:image",
          content: "https://pushup-tracker.netlify.app/og-image.jpg",
        },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:url", content: "https://pushup-tracker.netlify.app/" },
        {
          name: "twitter:title",
          content: "Pushup Tracker - Real-time Workout Tracking",
        },
        {
          name: "twitter:description",
          content:
            "Track your daily pushups and compete with friends in real-time. A simple, effective way to stay motivated and achieve your fitness goals.",
        },
        {
          name: "twitter:image",
          content: "https://pushup-tracker.netlify.app/og-image.jpg",
        },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  appTemplate: "./app.html",

  site: {
    url: "https://pushup-tracker.netlify.app",
    name: "Pushup Tracker",
    description:
      "Track your daily pushups and compete with friends in real-time. A simple, effective way to stay motivated and achieve your fitness goals.",
    defaultLocale: "en",
  },

  robots: {
    allow: "/",
    sitemap: "/sitemap.xml",
  },

  sitemap: {
    enabled: true,
    urls: ["/", "/leaderboard"],
  },

  // seo: {
  //   redirectToCanonical: true,
  //   keywords: "pushup tracker, workout tracker, fitness app, exercise tracking",
  //   viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  //   themeColor: "#111827",
  //   colorScheme: "dark light",
  //   author: "TastySites",
  //   mobileApp: true,
  //   mobileAppIOS: true,
  //   facebook: {
  //     appId: "",
  //     pageId: "",
  //   },
  //   twitter: {
  //     creator: "@tastysites",
  //     site: "@tastysites",
  //     card: "summary_large_image",
  //   },
  //   openGraph: {
  //     image: {
  //       url: "https://pushup-tracker.netlify.app/og-image.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "Pushup Tracker - Track your workouts",
  //       type: "image/jpeg",
  //       secureUrl: "https://pushup-tracker.netlify.app/og-image.jpg",
  //     },
  //     siteName: "Pushup Tracker",
  //     type: "website",
  //     title: "Pushup Tracker - Real-time Workout Tracking",
  //     description:
  //       "Track your daily pushups and compete with friends in real-time. A simple, effective way to stay motivated and achieve your fitness goals.",
  //   },
  // },
});
