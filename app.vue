<script setup lang="ts">
import { randomCouchString } from 'rxdb/plugins/core'
import { useDatabase } from './composables/useDatabase'
import type { RxTodoDocument } from '~/types'

// Use your database here
const database = await useDatabase()

// State management
const newTodoName = ref('')
const todoList = ref<RxTodoDocument[]>([])

database.todos
  .find({
    sort: [{ state: 'desc' }, { lastChange: 'desc' }]
  })
  .$.subscribe((todos: RxTodoDocument[]) => {
    todoList.value = todos
  })

async function addTodo() {
  if (newTodoName.value.length < 1) {
    return
  }
  await database.todos.insert({
    id: randomCouchString(10),
    name: newTodoName.value,
    state: 'open',
    lastChange: Date.now()
  })
  newTodoName.value = ''
}
</script>

<template>
  <GitHubBanner />
  <section class="todoapp">
    <header class="header">
      <h1>TodoMVC with RxDB & P2P</h1>
      <AppDescription />
      <hr />
      <input
        v-model="newTodoName"
        @keyup.enter="addTodo"
        id="insert-todo"
        class="new-todo"
        placeholder="What needs to be done? (Enter to submit)"
        autofocus
      />
    </header>
    <section class="main">
      <TodoList :todo-list="todoList" />
    </section>
  </section>
  <TheFooter />
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
