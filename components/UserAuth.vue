<script setup>
import { ref } from "vue";

const username = ref(localStorage.getItem("username") || "");
const showLoginModal = ref(!username.value);

function login() {
  if (username.value.trim()) {
    localStorage.setItem("username", username.value.trim());
    showLoginModal.value = false;
  }
}

function logout() {
  localStorage.removeItem("username");
  username.value = "";
  showLoginModal.value = true;
}

// Prevent closing modal if no username
function closeModal() {
  if (username.value.trim()) {
    showLoginModal.value = false;
  }
}
</script>

<template>
  <UModal
    v-if="showLoginModal"
    v-model="showLoginModal"
    :ui="{
      wrapper:
        'fixed inset-0 flex align-start sm:items-center justify-center pt-16 sm:pt-0',
      container: 'relative w-full sm:w-auto items-start  ',
      width: 'w-11/12 sm:w-full max-w-md ',
      base: 'overflow-visible',
    }"
    :prevent-close="true"
  >
    <UCard>
      <template #header>
        <h3 class="text-xl font-semibold">Welcome to Pushup Tracker!</h3>
      </template>

      <div class="space-y-4">
        <p class="text-gray-500 dark:text-gray-400">
          Please enter your nickname to start tracking pushups
        </p>
        <UInput
          v-model="username"
          placeholder="Enter your nickname"
          @keyup.enter="login"
          autofocus
        />
      </div>

      <template #footer>
        <UButton
          color="primary"
          @click="login"
          :disabled="!username.trim()"
          class="w-full sm:w-auto"
        >
          Start Training
        </UButton>
      </template>
    </UCard>
  </UModal>

  <div v-else class="flex items-center gap-4">
    <span class="text-gray-700 dark:text-gray-300">{{ username }}</span>
    <UButton
      color="gray"
      variant="ghost"
      icon="i-heroicons-arrow-right-on-rectangle"
      @click="logout"
    >
      Logout
    </UButton>
  </div>
</template>
