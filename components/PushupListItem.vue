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
const showDateTime = ref(false);

const formattedDate = computed(() => {
  return new Date(props.pushup.timestamp).toLocaleString();
});

const displayName = computed(() => {
  if (showDateTime.value) {
    return props.pushup.createdBy.slice(0, 3) + "...";
  }
  return props.pushup.createdBy;
});

const { animateNewEntry } = useAppAnimations();
const itemRef = ref(null);
const contentRef = ref(null);

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

function toggleDateTime() {
  const timeline = gsap.timeline({
    defaults: { duration: 0.3, ease: "power2.inOut" },
  });

  timeline
    .to(contentRef.value, {
      opacity: 0,
      scale: 0.95,
      onComplete: () => {
        showDateTime.value = !showDateTime.value;
      },
    })
    .to(contentRef.value, {
      opacity: 1,
      scale: 1,
    });
}

onMounted(() => {
  if (itemRef.value) {
    animateNewEntry(itemRef.value);
  }
});
</script>

<template>
  <li ref="itemRef">
    <div
      class="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors duration-200 cursor-pointer"
      @click="toggleDateTime"
      @keydown.enter="toggleDateTime"
      @keydown.space.prevent="toggleDateTime"
      role="button"
      tabindex="0"
      :aria-label="`${pushup.pushupCount} pushups by ${pushup.createdBy}`"
      :aria-expanded="showDateTime"
    >
      <div ref="contentRef" class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold w-12 text-emerald-400">{{
            pushup.pushupCount
          }}</span>
          <span class="text-gray-400">{{ displayName }}</span>
        </div>
        <div class="flex items-center gap-4">
          <span v-if="showDateTime" class="text-sm text-gray-500">{{
            formattedDate
          }}</span>
          <UButton
            :style="{ visibility: canDelete ? 'visible' : 'hidden' }"
            color="red"
            variant="ghost"
            icon="i-heroicons-x-mark"
            size="sm"
            @click.stop="deletePushup"
            class="text-gray-400 hover:text-white"
            :aria-label="`Delete entry of ${pushup.pushupCount} pushups`"
          />
        </div>
      </div>
    </div>
  </li>
</template>
