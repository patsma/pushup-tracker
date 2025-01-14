<script setup>
import { useDatabase } from "~/composables/useDatabase";
import { ref, onMounted } from "vue";
import { useAppAnimations } from "~/composables/useAppAnimations";
import UserAuth from "~/components/UserAuth.vue";
import AppLoader from "~/components/AppLoader.vue";
import AppLogo from "~/components/AppLogo.vue";

// State management
const pushupList = ref([]);
const username = ref(localStorage.getItem("username") || "");
const { initializePageAnimation } = useAppAnimations();

// Use your database here
const database = await useDatabase();

// Subscribe to database changes
database.pushups
  .find({
    sort: [{ state: "desc" }, { lastChange: "desc" }],
  })
  .$.subscribe((pushups) => {
    pushupList.value = pushups;
  });

onMounted(() => {
  // Initialize animations after everything is loaded
  initializePageAnimation();
});

useHead({
  title: "Pushup Tracker - Real-time Workout Tracking",
  meta: [
    {
      name: "description",
      content:
        "Track your daily pushups and compete with friends in real-time. A simple, effective way to stay motivated and achieve your fitness goals.",
    },
    {
      name: "keywords",
      content:
        "pushup tracker, workout tracker, fitness app, exercise tracking",
    },

    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    {
      property: "og:title",
      content: "Pushup Tracker - Real-time Workout Tracking",
    },
    {
      property: "og:description",
      content: "Track your daily pushups and compete with friends in real-time",
    },
    { property: "og:image", content: "/favicon.svg" },
    { property: "og:image:width", content: "903" },
    { property: "og:image:height", content: "903" },
    { property: "og:image:type", content: "image/svg+xml" },

    // Twitter
    { name: "twitter:card", content: "summary" },
    {
      name: "twitter:title",
      content: "Pushup Tracker - Real-time Workout Tracking",
    },
    {
      name: "twitter:description",
      content: "Track your daily pushups and compete with friends in real-time",
    },
    { name: "twitter:image", content: "/favicon.svg" },
    { name: "twitter:image:alt", content: "Pushup Tracker Logo" },
  ],
  link: [
    { rel: "canonical", href: "https://pushup-tracker.netlify.app/" },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
  ],
});
</script>

<template>
  <AppLoader />
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <header class="max-w-2xl mx-auto">
      <div class="flex items-center justify-between mb-12">
        <h1
          class="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Pushups
        </h1>
        <!-- <AppLogo width="50" /> -->
        <div class="flex items-center gap-4 user-controls">
          <UColorModeButton />
          <UserAuth />
        </div>
      </div>

      <main class="space-y-8">
        <div class="pushup-buttons">
          <PushupEntry />
        </div>
        <div class="pushups-container">
          <PushupList :pushup-list="pushupList" />
        </div>
        <div class="leaderboard">
          <LeaderBoard />
        </div>
      </main>
    </header>
    <TheFooter />
  </div>
</template>

<style>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  height: 100%;
  padding: 1rem;
}

.main-header {
  text-align: center;
  margin-bottom: 2rem;
}

.main-header h1 {
  color: #b83f45;
  margin-bottom: 0.5rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.main-header h1 {
  margin: 0;
}
</style>
