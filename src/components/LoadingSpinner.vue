<script setup lang="ts">
defineProps<{
  size?: number
}>()
</script>

<template>
  <svg
    class="spinner"
    :width="size ?? 32"
    :height="size ?? 32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle class="track" cx="12" cy="12" r="10" stroke-width="2" />
    <circle class="head" cx="12" cy="12" r="10" stroke-width="2" stroke-linecap="round" />
  </svg>
</template>

<style scoped>
.spinner {
  animation: spin 0.75s linear infinite;
}

.track {
  stroke: var(--color-border-default);
}

.head {
  stroke: var(--color-success-fg);
  stroke-dasharray: 60;
  stroke-dashoffset: 45;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
