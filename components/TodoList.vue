<script setup lang="ts">
import { useDatabase } from '~/composables/useDatabase'
import type { RxTodoDocument } from '~/types'

// Use your database here
const database = await useDatabase()

const props = defineProps<{
  todoList: RxTodoDocument[]
}>()

const remainingItems = computed(() => {
  return props.todoList.filter(todo => todo.state !== 'done').length
})

function clearCompleted() {
  database.todos.find({ selector: { state: 'done' } }).remove()
}
</script>

<template>
  <div>
    <input id="toggle-all" class="toggle-all" type="checkbox" />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <TodoListItem v-for="todo in todoList" :todo="todo" :key="todo.id" />
    </ul>
    <footer class="footer">
      <span class="todo-count">{{ remainingItems }} items left</span>
      <ul class="filters">
        <li>
          <a class="selected">All</a>
        </li>
        <li>
          <a>Completed</a>
        </li>
      </ul>
      <button
        @click="clearCompleted"
        class="clear-completed"
        id="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  </div>
</template>
