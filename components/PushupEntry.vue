<script setup>
import { randomCouchString } from "rxdb/plugins/core";
import { useDatabase } from "~/composables/useDatabase";

const database = await useDatabase();

async function addPushups(count) {
  const username = localStorage.getItem("username") || "Anonymous";
  await database.todos.insert({
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
  <div class="pushup-buttons">
    <button @click="addPushups(5)" class="pushup-btn">5 Pushups</button>
    <button @click="addPushups(10)" class="pushup-btn">10 Pushups</button>
    <button @click="addPushups(20)" class="pushup-btn">20 Pushups</button>
  </div>
</template>

<style scoped>
.pushup-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1rem;
}

.pushup-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #b83f45;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}

.pushup-btn:hover {
  background-color: #a03339;
}
</style>
