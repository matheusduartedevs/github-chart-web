<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  description?: string
  variant?: 'default' | 'success' | 'accent'
}>()
</script>

<template>
  <div class="stat-card" :class="variant ?? 'default'">
    <span class="label">{{ label }}</span>
    <span class="value">{{ value }}</span>
    <span v-if="description" class="description">{{ description }}</span>
  </div>
</template>

<style scoped>
.stat-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 20px;
  background-color: var(--color-canvas-subtle);
  border: 1px solid var(--color-border-default);
  border-radius: 6px;
  flex: 1;
  min-width: 0;
}

.label {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-fg-muted);
}

.value {
  font-size: 28px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-fg-default);
}

.description {
  font-size: 12px;
  color: var(--color-fg-subtle);
}

.success .value {
  color: var(--color-success-fg);
}

.accent .value {
  color: var(--color-accent-fg);
}
</style>
