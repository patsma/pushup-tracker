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
    :ui="{ width: 'sm' }"
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
        <UButton color="primary" @click="login" :disabled="!username.trim()">
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

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.modal-content h2 {
  color: #b83f45;
  margin-bottom: 1rem;
}

.modal-content p {
  color: #666;
  margin-bottom: 1.5rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.input-group input {
  flex: 1;
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.input-group input:focus {
  border-color: #b83f45;
  outline: none;
}

.input-group button {
  padding: 0.5rem 1rem;
  background: #b83f45;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.input-group button:disabled {
  background: #ddd;
  cursor: not-allowed;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  font-weight: 500;
  color: #666;
}

.logout-btn {
  padding: 0.3rem 0.8rem;
  background: transparent;
  border: 1px solid #b83f45;
  color: #b83f45;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: #b83f45;
  color: white;
}
</style>
