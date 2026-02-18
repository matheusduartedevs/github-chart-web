<script setup lang="ts">
import LoadingSpinner from '../components/LoadingSpinner.vue'

defineProps<{
  username: string
}>()
</script>

<template>
  <div class="loading-view">
    <div class="loading-content">
      <LoadingSpinner :size="40" />
      <p class="loading-text">Buscando contribuições para</p>
      <p class="username">@{{ username }}</p>
    </div>
  </div>
</template>

<style scoped>
.loading-view {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

.loading-text {
  font-size: 15px;
  color: var(--color-fg-muted);
  margin-top: 8px;
}

.username {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-fg-default);
}
</style>
