<script setup>
import { computed } from "vue";

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const username = localStorage.getItem("username");
const canDelete = computed(() => props.todo.createdBy === username);

async function deleteTodo() {
  if (canDelete.value) {
    await props.todo.remove();
  }
}

const formattedDate = computed(() => {
  return new Date(props.todo.timestamp).toLocaleString();
});
</script>

<template>
  <li>
    <div class="pushup-entry">
      <span class="pushup-count">{{ todo.pushupCount }} pushups</span>
      <span class="creator-info">by {{ todo.createdBy }}</span>
      <span class="timestamp">{{ formattedDate }}</span>
      <button v-if="canDelete" class="destroy" @click="deleteTodo"></button>
    </div>
  </li>
</template>

<style scoped>
.pushup-entry {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  gap: 1rem;
}

.pushup-count {
  font-weight: bold;
  min-width: 100px;
}

.creator-info {
  color: #777;
}

.timestamp {
  color: #999;
  font-size: 0.8em;
}
</style>
