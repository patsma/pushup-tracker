<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  pushupList: {
    type: Array,
    required: true,
  },
});

const filter = ref("all"); // 'all' or 'me'
const username = localStorage.getItem("username");

const displayedPushupList = computed(() => {
  if (filter.value === "me") {
    return props.pushupList.filter((pushup) => pushup.createdBy === username);
  }
  return props.pushupList;
});
</script>

<template>
  <div class="pushups-container">
    <div class="flex gap-3 mb-8">
      <UButton
        color="gray"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all duration-200',
          filter === 'all'
            ? 'bg-gray-700 text-white scale-105 shadow-lg'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700',
        ]"
        @click="filter = 'all'"
      >
        All Entries
      </UButton>
      <UButton
        color="primary"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all duration-200',
          filter === 'me'
            ? 'bg-emerald-600 text-white scale-105 shadow-lg'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700',
        ]"
        @click="filter = 'me'"
      >
        My Entries
      </UButton>
    </div>

    <ul
      class="space-y-3 list-none max-h-[30vh] overflow-y-auto custom-scrollbar"
    >
      <PushupListItem
        v-for="pushup in displayedPushupList"
        :pushup="pushup"
        :key="pushup.id"
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

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #475569 #1f2937;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>
