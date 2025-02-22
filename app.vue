<script setup>
import { useDatabase } from '~/composables/useDatabase';
import { useAppAnimations } from '~/composables/useAppAnimations';
import UserAuth from '~/components/UserAuth.vue';
import AppLoader from '~/components/AppLoader.vue';
import AppLogo from '~/components/AppLogo.vue';

// State management
const pushupList = ref([]);
const username = ref(localStorage.getItem('username') || '');
const { initializePageAnimation } = useAppAnimations();

// Use your database here
const database = await useDatabase();

// Subscribe to database changes
database.pushups
  .find({
    sort: [{ state: 'desc' }, { lastChange: 'desc' }],
  })
  .$.subscribe((pushups) => {
    pushupList.value = pushups;
  });

onMounted(() => {
  // Initialize animations after everything is loaded
  initializePageAnimation();
});
</script>

<template>
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-lg z-50"
  >
    Skip to main content
  </a>
  <AppLoader />
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <header class="max-w-2xl mx-auto">
      <div class="flex items-start justify-between mb-12">
        <div
          class="grid logo-group justify-start gap-4 grid-flow-col content-start"
        >
          <AppLogo class="h-8 w-14" width="50" />
          <h1
            class="text-3xl hidden lg:block font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Pushups
          </h1>
        </div>
        <div class="flex items-end self-end gap-4 user-controls">
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
/* Prevent double-tap zoom */
* {
  touch-action: manipulation;
}
</style>
