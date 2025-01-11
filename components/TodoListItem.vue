<script setup>
import { computed, ref, onMounted } from "vue";
import { useAppAnimations } from "~/composables/useAppAnimations";
import gsap from "gsap";

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
    await gsap.to(itemRef.value, {
      height: 0,
      opacity: 0,
      marginBottom: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
    await props.todo.remove();
  }
}

const formattedDate = computed(() => {
  return new Date(props.todo.timestamp).toLocaleString();
});

const { animateNewEntry } = useAppAnimations();
const itemRef = ref(null);

onMounted(() => {
  if (itemRef.value) {
    animateNewEntry(itemRef.value);
  }
});
</script>

<template>
  <li ref="itemRef">
    <div
      class="bg-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-gray-750 transition-colors duration-200"
    >
      <div class="flex items-center gap-3">
        <span class="text-2xl font-bold text-emerald-400">{{
          todo.pushupCount
        }}</span>
        <span class="text-gray-400">by {{ todo.createdBy }}</span>
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm text-gray-500">{{ formattedDate }}</span>
        <UButton
          v-if="canDelete"
          color="red"
          variant="ghost"
          icon="i-heroicons-x-mark"
          size="sm"
          @click="deleteTodo"
          class="text-gray-400 hover:text-white"
        />
      </div>
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
