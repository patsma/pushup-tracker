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
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <header class="max-w-2xl mx-auto">
      <div class="flex items-center justify-between mb-12">
        <h1
          class="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Pushups
        </h1>
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
          <TodoList :todo-list="todoList" />
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
