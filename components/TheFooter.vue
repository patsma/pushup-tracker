<script setup>
import { useAppAnimations } from '~/composables/useAppAnimations';
import { gsap } from 'gsap';
const { animateFooter } = useAppAnimations();
const isHidden = ref(localStorage.getItem('footerHidden') === 'true');
const heartTimeline = ref(null);

function toggleFooter() {
  isHidden.value = !isHidden.value;
  localStorage.setItem('footerHidden', isHidden.value);

  const footerEl = document.querySelector('.the-footer');
  const arrowEl = document.querySelector('.footer-toggle-arrow');

  if (footerEl && arrowEl) {
    animateFooter(footerEl, arrowEl, isHidden.value);
  }
}

function startHeartbeat() {
  heartTimeline.value = gsap
    .timeline({ repeat: -1, timeScale: 0.015 })
    .to('.heart-icon', {
      scale: 1.3,
      duration: 0.2,
      ease: 'power2.out',
    })
    .to('.heart-icon', {
      scale: 1,
      duration: 0.15,
      ease: 'power2.in',
    })
    .to('.heart-icon', {
      scale: 1.2,
      duration: 0.15,
      ease: 'power2.out',
    })
    .to('.heart-icon', {
      scale: 1,
      duration: 0.1,
      ease: 'power2.in',
    })
    .timeScale(0.5);
}

function stopHeartbeat() {
  if (heartTimeline.value) {
    heartTimeline.value.kill();
    gsap.to('.heart-icon', {
      scale: 1,
      duration: 0.1,
    });
  }
}
</script>

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
        <a
          href="https://tastysites.pl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex justify-center items-center gap-2 text-white hover:text-rose-400 transition-colors duration-200"
          @mouseenter="startHeartbeat"
          @mouseleave="stopHeartbeat"
        >
          <span class="text-emerald-400 flex items-center gap-1">
            Made with
            <Icon
              name="ri:heart-fill"
              class="heart-icon w-4 h-4 text-rose-400"
            />
            by
          </span>
          TastySites
        </a>

        <!-- Original Credits -->
        <div class="grid gap-2 text-sm text-gray-400 text-center">
          <p class="flex items-center justify-center gap-2">
            <Icon name="ri:github-fill" class="w-4 h-4" />
            <span>Source Code:</span>
            <a
              href="https://github.com/patsma/pushup-tracker"
              target="_blank"
              rel="noopener noreferrer"
              class="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              patsma/pushup-tracker
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
              href="https://ui.nuxt.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-emerald-400 hover:text-emerald-300 transition-colors"
              >Nuxt UI</a
            >,
            <a
              href="https://nuxt.com/modules/icon"
              target="_blank"
              rel="noopener noreferrer"
              class="text-emerald-400 hover:text-emerald-300 transition-colors"
              >Nuxt Icon</a
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
            <a
              href="https://webrtc.org"
              target="_blank"
              rel="noopener noreferrer"
              class="text-emerald-400 hover:text-emerald-300 transition-colors"
              >WebRTC</a
            >,
            <a
              href="https://greensock.com/gsap/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-emerald-400 hover:text-emerald-300 transition-colors"
              >GSAP</a
            >
          </p>

          <p class="flex items-center justify-center gap-2">
            <Icon name="ri:server-fill" class="w-4 h-4" />
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
