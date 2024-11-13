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

/**
 * @link https://codepo8.github.io/css-fork-on-github-ribbon/
 */
#forkongithub a {
  background: #000;
  color: #fff;
  text-decoration: none;
  font-family: arial, sans-serif;
  text-align: center;
  font-weight: bold;
  padding: 5px 40px;
  font-size: 1rem;
  line-height: 2rem;
  position: relative;
  transition: 0.5s;
}

#forkongithub a:hover {
  background: #b83f45;
  color: #fff;
}

#forkongithub a::before,
#forkongithub a::after {
  content: '';
  width: 100%;
  display: block;
  position: absolute;
  top: 1px;
  left: 0;
  height: 1px;
  background: #fff;
}

#forkongithub a::after {
  bottom: 1px;
  top: auto;
}

@media screen and (min-width: 800px) {
  #forkongithub {
    position: fixed;
    display: block;
    top: 0;
    right: 0;
    width: 200px;
    overflow: hidden;
    height: 200px;
    z-index: 9999;
  }

  #forkongithub a {
    width: 200px;
    position: absolute;
    top: 60px;
    right: -60px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.8);
  }
}
</style>
