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

// Add SEO metadata for static generation
useSeoMeta({
  title: "Pushup Tracker - Real-time Workout Tracking",
  description:
    "Track your daily pushups and compete with friends in real-time. A simple, effective way to stay motivated and achieve your fitness goals.",
  ogTitle: "Pushup Tracker - Real-time Workout Tracking",
  ogDescription:
    "Track your daily pushups and compete with friends in real-time. A simple, effective way to stay motivated and achieve your fitness goals.",
  ogImage: "https://pushup-tracker.netlify.app/og-image.jpg",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <AppLoader />

  <div class="min-h-screen bg-gray-900 text-white p-6">
    <header class="max-w-2xl mx-auto">
      <div class="flex items-start justify-between mb-12">
        <div class="grid logo-group gap-4 grid-flow-col content-start">
          <AppLogo class="h-8" width="50" />
          <h1
            class="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Pushups
          </h1>
        </div>
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
