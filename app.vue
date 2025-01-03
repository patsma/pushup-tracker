<script setup lang="ts">
import { useDatabase } from '~/composables/useDatabase'
import type { RxTodoDocument } from '~/types'

// Use your database here
const database = await useDatabase()

// State management
const todoList = ref<RxTodoDocument[]>([])


database.todos
  .find({
    sort: [{ state: 'desc' }, { lastChange: 'desc' }]
  })
  .$.subscribe((todos: RxTodoDocument[]) => {
    todoList.value = todos
  })

const { loggedIn, user, session, fetch, clear } = useUserSession()
import { ref, watch } from 'vue'

// Reactive variable to store the username
const username = ref(localStorage.getItem('username') || '')

// Ask for username if not set
if (!username.value) {
  const input = prompt('Enter your nickname:')
  if (input) {
    username.value = input.trim() || 'Anonymous'
    localStorage.setItem('username', username.value) // Store in localStorage
  }
}

// Watch for username changes
watch(username, newName => {
  localStorage.setItem('username', newName)
})
</script>

<template>
  <section class="todoapp">
    <header>
      <h1>Minimal ToDo App</h1>
      <p>Logged in as: {{ username }}</p>
    </header>
    <header class="header">
      <NewTodoItem />
    </header>
    <section class="main">
      <TodoList :todo-list="todoList" />
    </section>
    <section class="main">
      <ul class="todo-list">
        <li v-for="todo in todoList" :key="todo.id">
          {{ todo.name }} - {{ todo.state }} (by {{ todo.createdBy }})
        </li>
      </ul>
    </section>

  </section>

</template>

<style>
@import 'todomvc-app-css/index.css';

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
