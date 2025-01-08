<script setup>
import { ref, computed, watch } from "vue";
import { useDatabase } from "~/composables/useDatabase";

const database = await useDatabase();
const entries = ref([]);

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
</script>

<template>
  <div class="leaderboard">
    <h2>Leaderboard</h2>
    <div class="leaderboard-list">
      <div
        v-for="entry in leaderboard"
        :key="entry.username"
        class="leaderboard-entry"
      >
        <span class="rank">#{{ entry.rank }}</span>
        <span class="username">{{ entry.username }}</span>
        <span class="total">{{ entry.total }} pushups</span>
      </div>
    </div>
  </div>
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
