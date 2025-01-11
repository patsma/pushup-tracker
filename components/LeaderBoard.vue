<script setup>
import { ref, computed, watch } from "vue";
import { useDatabase } from "~/composables/useDatabase";
import { useAppAnimations } from "~/composables/useAppAnimations";

const database = await useDatabase();
const entries = ref([]);
const { animateNumber } = useAppAnimations();

// Subscribe to database changes
database.todos.find().$.subscribe((todos) => {
  entries.value = todos;
});

const leaderboard = computed(() => {
  // Group pushups by user and calculate totals
  const userTotals = entries.value.reduce((acc, entry) => {
    const user = entry.createdBy;
    acc[user] = (acc[user] || 0) + entry.pushupCount;
    return acc;
  }, {});

  // Convert to array and sort by total pushups
  return Object.entries(userTotals)
    .map(([username, total]) => ({ username, total }))
    .sort((a, b) => b.total - a.total)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
});

// Watch for changes in total pushups
watch(
  () => leaderboard.value,
  (newVal, oldVal) => {
    if (oldVal) {
      newVal.forEach((entry, index) => {
        const oldEntry = oldVal[index];
        if (oldEntry && entry.total !== oldEntry.total) {
          const el = document.querySelector(`[data-user="${entry.username}"]`);
          if (el) {
            animateNumber(el, oldEntry.total, entry.total);
          }
        }
      });
    }
  },
  { deep: true }
);
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-semibold">Leaderboard</h2>
    </template>

    <div class="space-y-2">
      <div
        v-for="entry in leaderboard"
        :key="entry.username"
        class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <div class="flex items-center gap-4">
          <span class="text-primary-500 font-bold">#{{ entry.rank }}</span>
          <span>{{ entry.username }}</span>
        </div>
        <span :data-user="entry.username" class="total"
          >{{ entry.total }} pushups</span
        >
      </div>
    </div>
  </UCard>
</template>

<style scoped>
.leaderboard {
  margin: 2rem auto;
  max-width: 600px;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #b83f45;
  margin-bottom: 1rem;
}

.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.leaderboard-entry {
  display: grid;
  grid-template-columns: 50px 1fr auto;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border-radius: 4px;
}

.rank {
  font-weight: bold;
  color: #b83f45;
}

.username {
  color: #333;
}

.total {
  font-weight: bold;
  color: #666;
}
</style>
