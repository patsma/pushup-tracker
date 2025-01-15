<script setup>
import { randomCouchString } from "rxdb/plugins/core";
import { useDatabase } from "~/composables/useDatabase";

const database = await useDatabase();

async function addPushups(count) {
  const username = localStorage.getItem("username") || "Anonymous";
  await database.pushups.insert({
    id: randomCouchString(10),
    pushupCount: count,
    state: "done",
    lastChange: Date.now(),
    createdBy: username,
    timestamp: Date.now(),
  });
}
</script>

<template>
  <div
    class="grid grid-cols-5 gap-3"
    role="group"
    aria-label="Quick pushup entry buttons"
  >
    <UButton
      v-for="count in [5, 10, 20, 50, 100]"
      :key="count"
      color="primary"
      @click="addPushups(count)"
      class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
      :aria-label="`Add ${count} pushups`"
    >
      {{ count }}
    </UButton>
  </div>
</template>
