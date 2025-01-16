<script setup>
import { onMounted } from 'vue';
import { useLogoAnimation } from '~/composables/useLogoAnimation';

defineProps({
  width: {
    type: [Number, String],
    default: 460,
  },
  height: {
    type: [Number, String],
    default: 241,
  },
});

const { animatePushup } = useLogoAnimation();

onMounted(() => {
  animatePushup();
});
</script>
<template>
  <div class="grid">
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1367.28 710.39"
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="68.82"
          y1="107.71"
          x2="1291.78"
          y2="719.12"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#34d396" />
          <stop offset="1" stop-color="#22d3ee" />
        </linearGradient>
      </defs>
      <g id="logoPushups">
        <g id="logoGroup">
          <g>
            <circle
              id="head"
              cx="680.67"
              cy="154.56"
              r="154.56"
              fill="url(#linear-gradient)"
            />
            <g id="bodyDown">
              <path
                id="leftHand"
                d="M0,541.33v100.69c0,37.76,30.61,68.36,68.36,68.36h0c37.76,0,68.36-30.61,68.36-68.36v-100.69H0Z"
                fill="url(#linear-gradient)"
              />
              <path
                id="rightHand"
                d="M1230.55,541.33v100.65c0,37.78,30.62,68.4,68.4,68.4h0c37.74,0,68.33-30.59,68.33-68.33v-100.73h-136.73Z"
                fill="url(#linear-gradient)"
              />
            </g>
            <path
              id="bodyUp"
              d="M136.73,547.53V234.82h164.31c37.83,171.08,191.76,299.15,375.95,299.15s338.12-128.07,375.95-299.15h177.61v312.71h136.73V213.63c0-60.53-49.07-109.59-109.59-109.59h-289.27c-20.17,0-36.29,16.84-35.29,36.98,2.98,60.08-15.71,125.81-65.39,190.39-3.78,4.92-8.29,9.25-13.38,12.79-204.31,142.42-424.16,1.17-424.16-190.88,0-4.16.1-8.29.31-12.39,1.01-20.1-15.17-36.89-35.3-36.89H19.68c-10.87,0-19.68,8.81-19.68,19.68v423.81h136.73Z"
              fill="url(#linear-gradient)"
            />
            <rect
              id="floor"
              x="234.82"
              y="659.57"
              width="888.73"
              height="50.82"
              rx="14.39"
              ry="14.39"
              fill="url(#linear-gradient)"
            />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>
