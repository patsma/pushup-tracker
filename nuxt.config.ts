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
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "canonical", href: "https://pushup-tracker.netlify.app/" },
      ],
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
        { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
        // Pre-connect to improve performance
        { rel: "preconnect", href: "https://pushup-tracker.netlify.app" },
      ],
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

  ogImage: {
    enabled: false,
  },

  robots: {
    allow: "/",
    sitemap: "/sitemap.xml",
  },

  sitemap: {
    enabled: true,
    urls: ["/", "/leaderboard"],
  },

  seo: {
    redirectToCanonical: true,
    keywords: "pushup tracker, workout tracker, fitness app, exercise tracking",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    themeColor: "#111827",
    colorScheme: "dark light",
    author: "TastySites",
    mobileApp: true,
    mobileAppIOS: true,
    facebook: {
      appId: "", // Add your FB app ID if you have one
      pageId: "", // Add your FB page ID if you have one
    },
    twitter: {
      creator: "@tastysites",
      site: "@tastysites",
      card: "summary_large_image",
    },
    openGraph: {
      image: {
        url: "https://pushup-tracker.netlify.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pushup Tracker - Track your workouts",
        type: "image/jpeg",
      },
      siteName: "Pushup Tracker",
      type: "website",
    },
    schemaOrg: {
      enabled: false,
    },
  },

  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: true,
      failOnError: false,
    },
    static: true,
  },

  routeRules: {
    // Pre-render the main page for SEO
    "/": {
      prerender: true,
      static: true,
    },
  },
});
