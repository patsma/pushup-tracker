<script setup>
import { useDatabase } from "~/composables/useDatabase";
import { ref, watch } from "vue";

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

// Ask for username if not set
if (!username.value) {
  const input = prompt("Enter your nickname:");
  if (input) {
    username.value = input.trim() || "Anonymous";
    localStorage.setItem("username", username.value);
  }
}

// Watch for username changes
watch(username, (newName) => {
  localStorage.setItem("username", newName);
});
</script>

<template>
  <section class="todoapp">
    <header>
      <h1>Pushup Tracker</h1>
      <p>Logged in as: {{ username }}</p>
    </header>
    <header class="header">
      <NewTodoItem />
    </header>
    <section class="main">
      <TodoList :todo-list="todoList" />
    </section>
  </section>
</template>

<style>
@import "todomvc-app-css/index.css";

.todoapp h1 {
  top: -80px;
  font-size: 40px;
}

.description {
  padding: 15px;
  margin-bottom: 10px;
}

code {
  display: block;
  padding: 15px;

  /**
     * https://css-tricks.com/better-line-breaks-for-long-urls/
     */
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}

a {
  color: #b83f45;
  font-weight: bold;
  text-decoration: none;
}

a:visited {
  color: #b83f45;
}
</style>
