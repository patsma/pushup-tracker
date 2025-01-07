<script setup>
import { useDatabase } from "~/composables/useDatabase";

// Use your database here
const database = await useDatabase();

const props = defineProps({
  todoList: {
    type: Array,
    required: true,
  },
});

const filter = ref("all");

const displayedTodoList = computed(() => {
  return props.todoList.filter((todo) => {
    if (filter.value === "all") return true;
    if (filter.value === "active") return todo.state !== "done";
    if (filter.value === "completed") return todo.state === "done";
    return false;
  });
});

const remainingItems = computed(() => {
  return displayedTodoList.value.filter((todo) => todo.state !== "done").length;
});

function clearCompleted() {
  database.todos.find({ selector: { state: "done" } }).remove();
}
</script>

<template>
  <div>
    <input id="toggle-all" class="toggle-all" type="checkbox" />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <TodoListItem
        v-for="todo in displayedTodoList"
        :todo="todo"
        :key="todo.id"
      >
        <template #creator>
          <span class="creator-info">Created by: {{ todo.createdBy }}</span>
        </template>
      </TodoListItem>
    </ul>
    <footer class="footer">
      <span class="todo-count">{{ remainingItems }} items left</span>
      <ul class="filters">
        <li>
          <a @click="filter = 'all'" :class="{ selected: filter === 'all' }"
            >All</a
          >
        </li>
        <li>
          <a
            @click="filter = 'active'"
            :class="{ selected: filter === 'active' }"
            >Active</a
          >
        </li>
        <li>
          <a
            @click="filter = 'completed'"
            :class="{ selected: filter === 'completed' }"
            >Completed</a
          >
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

<style scoped>
.filters a {
  cursor: pointer;
}
.creator-info {
  font-size: 0.8em;
  color: #777;
  margin-left: 10px;
}
</style>
