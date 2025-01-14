<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 460 241"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="logo-gradient"
        x1="23.15"
        y1="36.24"
        x2="434.6"
        y2="241.94"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#34d396" />
        <stop offset="1" stop-color="#22d3ee" />
      </linearGradient>
    </defs>
    <g id="logoPushups">
      <g id="logoGroup">
        <circle id="head" cx="229" cy="52" r="52" fill="url(#logo-gradient)" />
        <path
          id="body"
          d="M356.17,35h-30.36c-6.78,0-12.21,5.66-11.87,12.44,1,20.21-5.29,42.33-22,64.05-1.27,1.65-2.79,3.11-4.5,4.3-68.74,47.92-142.7.39-142.7-64.22,0-1.4.04-2.79.1-4.17.34-6.76-5.1-12.41-11.88-12.41h-31.98s-94.35,0-94.35,0C2.97,35,0,37.97,0,41.62v37.47s0,136.91,0,136.91c0,12.7,10.3,23,23,23h0c12.7,0,23-10.3,23-23V79s55.28,0,55.28,0c12.73,57.56,64.52,100.64,126.48,100.64s113.76-43.09,126.48-100.64h59.75v136.99c0,12.71,10.3,23.01,23.01,23.01h0c12.7,0,22.99-10.29,22.99-22.99V79.09s0-7.22,0-7.22c0-20.36-16.51-36.87-36.87-36.87h-66.96Z"
          fill="url(#logo-gradient)"
        />
        <rect
          id="floor"
          x="79"
          y="212"
          width="299"
          height="29"
          rx="14.39"
          ry="14.39"
          fill="url(#logo-gradient)"
        />
      </g>
    </g>
  </svg>
</template>

<script setup>
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
</script>
