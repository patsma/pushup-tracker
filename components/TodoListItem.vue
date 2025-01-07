<script setup>
const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

async function deleteTodo() {
  await props.todo.remove();
}

async function updateTodoName(ev) {
  const newName = ev.target.textContent || "";

  if (newName !== props.todo.name) {
    await props.todo.incrementalPatch({ name: newName });
  }
}

function updateTodoState() {
  props.todo.incrementalPatch({
    state: props.todo.state === "done" ? "open" : "done",
  });
}
</script>

<template>
  <li :class="{ completed: todo.state === 'done' }">
    <input
      class="toggle"
      type="checkbox"
      @input="updateTodoState"
      :checked="todo.state === 'done'"
    />
    <!-- TODO: Use input element for proper a11y -->
    <!-- TODO: User can cancel the edit by pressing escape or on blur -->
    <label contenteditable="true" @keyup.enter="updateTodoName">
      {{ todo.name }}
      {{ todo.createdBy }}
    </label>
    <button class="destroy" @click="deleteTodo"></button>
  </li>
</template>
