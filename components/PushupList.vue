<script setup>
import { useAppAnimations } from '~/composables/useAppAnimations';

const { leaveFilterAnimation } = useAppAnimations();

const props = defineProps({
  pushupList: {
    type: Array,
    required: true,
  },
});

const filter = ref('all');
const username = localStorage.getItem('username');
const displayedPushupList = computed(() => {
  if (filter.value === 'me') {
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

    <div class="list-container">
      <transition-group
        name="pushup"
        tag="ul"
        class="entries-list custom-scrollbar"
        :css="false"
        @leave="leaveFilterAnimation"
      >
        <PushupListItem
          v-for="pushup in displayedPushupList"
          :key="pushup.id"
          :pushup="pushup"
          class="mb-3 last:mb-0"
        />
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.list-container {
  position: relative;
  height: calc(35vh);
  min-height: 300px;
  max-height: 600px;
  overflow: hidden;
  width: 100%;
}

.entries-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  list-style: none;
  padding-right: 6px;
  width: 100%;
  scrollbar-gutter: stable;
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
