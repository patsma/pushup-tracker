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
      <UButton
        color="primary"
        :class="{ selected: filter === 'all' }"
        @click="filter = 'all'"
      >
        All Entries
      </UButton>
      <UButton
        color="primary"
        @click="filter = 'me'"
        :class="{ selected: filter === 'me' }"
      >
        My Entries
      </UButton>
    </div>

    <ul class="entries-list list-none">
      <TodoListItem
        v-for="todo in displayedTodoList"
        :todo="todo"
        :key="todo.id"
      />
    </ul>
  </div>
</template>

<style scoped>
.pushups-container {
  margin: 1rem 0;
}

.filters {
  display: flex;
  gap: 1rem;
  padding-bottom: 2rem;
}

.filters button.selected {
  background: #b83f45;
  color: white;
}

.entries-list {
  max-height: 40vh;
  overflow-y: auto;
  list-style: none;
  padding: 0;
}

.entries-list li::marker {
  display: none;
  content: "";
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
  /* border-radius: 4px; */
}
</style>
