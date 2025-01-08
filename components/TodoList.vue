<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  todoList: {
    type: Array,
    required: true,
  },
});

const filter = ref("all"); // 'all' or 'me'
const username = localStorage.getItem("username");

const displayedTodoList = computed(() => {
  if (filter.value === "me") {
    return props.todoList.filter((todo) => todo.createdBy === username);
  }
  return props.todoList;
});
</script>

<template>
  <div class="pushups-container">
    <div class="filters">
      <button @click="filter = 'all'" :class="{ selected: filter === 'all' }">
        All Entries
      </button>
      <button @click="filter = 'me'" :class="{ selected: filter === 'me' }">
        My Entries
      </button>
    </div>

    <div class="entries-list">
      <TodoListItem
        v-for="todo in displayedTodoList"
        :todo="todo"
        :key="todo.id"
      />
    </div>
  </div>
</template>

<style scoped>
.pushups-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
}

.filters {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.filters button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
  color: #666;
}

.filters button.selected {
  background: #b83f45;
  color: white;
}

.entries-list {
  max-height: 60vh;
  overflow-y: auto;
  padding: 1rem;
}

/* Custom scrollbar */
.entries-list::-webkit-scrollbar {
  width: 8px;
}

.entries-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.entries-list::-webkit-scrollbar-thumb {
  background: #b83f45;
  border-radius: 4px;
}
</style>
