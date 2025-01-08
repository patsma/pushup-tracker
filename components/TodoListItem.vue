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
  <UCard class="mb-2">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <span class="text-lg font-bold">{{ todo.pushupCount }} pushups</span>
        <span class="text-gray-500 dark:text-gray-400"
          >by {{ todo.createdBy }}</span
        >
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm text-gray-400">{{ formattedDate }}</span>
        <UButton
          v-if="canDelete"
          color="red"
          variant="ghost"
          icon="i-heroicons-x-mark"
          size="sm"
          @click="deleteTodo"
        />
      </div>
    </div>
  </UCard>
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
