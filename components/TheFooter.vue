<template>
  <!-- Fixed toggle button that always stays visible -->
  <button
    @click="toggleFooter"
    class="fixed footer-toggle-btn bottom-4 right-4 p-2 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors z-50"
    aria-label="Toggle footer"
  >
    <div class="footer-toggle-arrow transform flex">
      <Icon name="ri:arrow-down-s-line" class="w-5 h-5 text-gray-400" />
    </div>
  </button>

  <!-- Footer content -->
  <footer
    class="fixed the-footer bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-40"
  >
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="grid gap-4">
        <!-- TastySites Credit -->
        <div class="flex justify-center items-center gap-2 text-gray-400">
          <span class="text-emerald-400">Made with ♥️ by</span>
          <a
            href="https://tastysites.pl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white hover:text-emerald-400 transition-colors duration-200"
          >
            TastySites
          </a>
        </div>

        <!-- Original Credits -->
        <div class="grid gap-2 text-sm text-gray-400 text-center">
          <p class="flex items-center justify-center gap-2">
            <Icon name="ri:github-fill" class="w-4 h-4" />
            <span>Source Code:</span>
            <a
              href="https://github.com/patsma/local-first-nuxt-todomvc"
              target="_blank"
              rel="noopener noreferrer"
              class="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              patsma/local-first-nuxt-todomvc
            </a>
          </p>

          <p class="flex items-center justify-center gap-2 flex-wrap">
            <Icon name="ri:flashlight-fill" class="w-4 h-4" />
            <span>Powered by</span>
            <a
              href="https://nuxt.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-emerald-400 hover:text-emerald-300 transition-colors"
              >Nuxt 3</a
            >,
            <a
              href="https://rxdb.info"
              target="_blank"
              rel="noopener noreferrer"
              class="text-emerald-400 hover:text-emerald-300 transition-colors"
              >RxDB</a
            >,
            <a
              href="https://dexie.org"
              target="_blank"
              rel="noopener noreferrer"
              class="text-emerald-400 hover:text-emerald-300 transition-colors"
              >Dexie.js</a
            >,
            <span>and</span>
            <a
              href="https://webrtc.org"
              target="_blank"
              rel="noopener noreferrer"
              class="text-emerald-400 hover:text-emerald-300 transition-colors"
              >WebRTC</a
            >
          </p>

          <p class="flex items-center justify-center gap-2">
            <Icon name="ri:netify-fill" class="w-4 h-4" />
            <span>Deployed on</span>
            <a
              href="https://www.netlify.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Netlify
            </a>
          </p>

          <p class="flex items-center justify-center gap-2">
            <Icon name="ri:magic-fill" class="w-4 h-4" />
            <span>Inspired by</span>
            <a
              href="https://github.com/pubkey/rxdb-quickstart/tree/master"
              target="_blank"
              rel="noopener noreferrer"
              class="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              pubkey/rxdb-quickstart
            </a>
          </p>

          <p class="flex items-center justify-center gap-2">
            <Icon name="ri:youtube-fill" class="w-4 h-4" />
            <span>Based on</span>
            <a
              href="https://youtu.be/qRKWD1T5CD4"
              target="_blank"
              rel="noopener noreferrer"
              class="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Ben Hong's ToDo
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAppAnimations } from "~/composables/useAppAnimations";

const { animateFooter } = useAppAnimations();
const isHidden = ref(localStorage.getItem("footerHidden") === "true");

function toggleFooter() {
  isHidden.value = !isHidden.value;
  localStorage.setItem("footerHidden", isHidden.value);

  const footerEl = document.querySelector(".the-footer");
  const arrowEl = document.querySelector(".footer-toggle-arrow");

  if (footerEl && arrowEl) {
    animateFooter(footerEl, arrowEl, isHidden.value);
  }
}
</script>
