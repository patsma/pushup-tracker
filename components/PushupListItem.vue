<script setup>
import { computed, ref, onMounted } from "vue";
import { useAppAnimations } from "~/composables/useAppAnimations";
import gsap from "gsap";

const props = defineProps({
  pushup: {
    type: Object,
    required: true,
  },
});

const username = localStorage.getItem("username");
const canDelete = computed(() => props.pushup.createdBy === username);

async function deletePushup() {
  if (canDelete.value) {
    await gsap.to(itemRef.value, {
      height: 0,
      opacity: 0,
      marginBottom: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
    await props.pushup.remove();
  }
}

const formattedDate = computed(() => {
  return new Date(props.pushup.timestamp).toLocaleString();
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
        <span class="text-2xl font-bold w-12 text-emerald-400">{{
          pushup.pushupCount
        }}</span>
        <span class="text-gray-400"> &nbsp;{{ pushup.createdBy }}</span>
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm text-gray-500">{{ formattedDate }}</span>
        <UButton
          :style="{ visibility: canDelete ? 'visible' : 'hidden' }"
          color="red"
          variant="ghost"
          icon="i-heroicons-x-mark"
          size="sm"
          @click="deletePushup"
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
