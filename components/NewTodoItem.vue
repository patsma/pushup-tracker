<script setup>
import { randomCouchString } from "rxdb/plugins/core";
import { useDatabase } from "~/composables/useDatabase";

const database = await useDatabase();
const newTodoName = ref("");

async function addTodo() {
  if (newTodoName.value.length < 1) {
    return;
  }
  const username = localStorage.getItem("username") || "Anonymous";
  await database.todos.insert({
    id: randomCouchString(10),
    name: newTodoName.value,
    state: "open",
    lastChange: Date.now(),
    createdBy: username,
  });
  newTodoName.value = "";
}
</script>

<template>
  <input
    v-model="newTodoName"
    @keyup.enter="addTodo"
    id="insert-todo"
    class="new-todo"
    placeholder="What needs to be done? (Enter to submit)"
    autofocus
  />
</template>
