<script setup>
import { useDatabase } from "~/composables/useDatabase";
import { ref, onMounted } from "vue";
import { useAppAnimations } from "~/composables/useAppAnimations";
import UserAuth from "~/components/UserAuth.vue";
import AppLoader from "~/components/AppLoader.vue";

// State management
const todoList = ref([]);
const username = ref(localStorage.getItem("username") || "");
const { initializePageAnimation } = useAppAnimations();

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

onMounted(() => {
  // Initialize animations after everything is loaded
  initializePageAnimation();
});
</script>

<template>
  <AppLoader />
  <UContainer class="py-8 flex flex-col items-center gap-4">
    <h1 class="text-3xl font-bold">Pushup Tracker</h1>
    <header class="mb-8 user-controls">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">
          <UColorModeButton />
          <UserAuth />
        </div>
      </div>
    </header>

    <main class="space-y-8 w-full lg:max-w-3xl">
      <div class="pushup-buttons">
        <PushupEntry />
      </div>
      <div class="pushups-container">
        <TodoList :todo-list="todoList" />
      </div>
      <div class="leaderboard">
        <LeaderBoard />
      </div>
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
