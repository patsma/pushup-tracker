export default defineNuxtPlugin(() => {
  window.process = {
    ...window.process,
    nextTick: (fn, ...args) => setTimeout(() => fn(...args))
  }
})
