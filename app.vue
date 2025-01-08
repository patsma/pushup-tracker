<script setup>
import { useDatabase } from "~/composables/useDatabase";
import { ref, watch } from "vue";
import UserAuth from "~/components/UserAuth.vue";

// State management
const todoList = ref([]);
const username = ref(localStorage.getItem("username") || "");

// Use your database here
const database = await useDatabase();

// Subscribe to database changes
database.todos
  .find({
    sort: [{ state: "desc" }, { lastChange: "desc" }],
  })
  .$.subscribe((todos) => {
    todoList.value = todos;
  });

// Watch for username changes
</script>

<template>
  <UContainer class="py-8">
    <header class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-3xl font-bold">Pushup Tracker</h1>
        <div class="flex items-center gap-4">
          <UColorModeButton />
          <UserAuth />
        </div>
      </div>
    </header>

    <main class="space-y-8">
      <PushupEntry />
      <TodoList :todo-list="todoList" />
      <LeaderBoard />
    </main>
  </UContainer>
</template>

<style>
.app-container {
  max-width: 800px;
  margin: 0 auto;
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

/* Remove old TodoMVC styles that we don't need anymore */
.todoapp {
  background: none;
  box-shadow: none;
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
