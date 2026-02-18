<script setup lang="ts">
import SearchInput from '../components/SearchInput.vue'

defineProps<{
  errorMessage?: string | null
}>()

const emit = defineEmits<{
  search: [username: string]
}>()
</script>

<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <div class="logo">
          <svg viewBox="0 0 98 96" width="48" height="48" fill="currentColor">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
            />
          </svg>
        </div>

        <h1 class="title">GitHub Contribuições</h1>
        <p class="subtitle">
          Visualize as contribuições do seu perfil do Github em um calendário de contribuições!
        </p>

        <SearchInput @search="(u) => emit('search', u)" />

        <div v-if="errorMessage" class="error-banner">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" class="error-icon">
            <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
          </svg>
          {{ errorMessage }}
        </div>

        <ul class="features">
          <li class="feature-item">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" class="feature-icon">
              <path
                d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
              />
              <path
                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"
              />
            </svg>
            Calendário de Contribuições
          </li>
          <li class="feature-item">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" class="feature-icon">
              <path
                d="M1.5 1.75V13.5h13.75a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75V1.75a.75.75 0 0 1 1.5 0Zm14.28 2.53-5.25 5.25a.75.75 0 0 1-1.06 0L7 7.06 4.28 9.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.25-3.25a.75.75 0 0 1 1.06 0L9 7.94l4.72-4.72a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z"
              />
            </svg>
            Gráficos e atividades
          </li>
          <li class="feature-item">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" class="feature-icon">
              <path
                d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"
              />
            </svg>
            Sequências Atual e Mais Longa
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}

.hero {
  width: 100%;
  max-width: 600px;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
}

.logo {
  color: var(--color-fg-default);
  opacity: 0.9;
}

.title {
  font-size: 40px;
  font-weight: 600;
  letter-spacing: -0.5px;
  color: var(--color-fg-default);
  line-height: 1.2;
}

.subtitle {
  font-size: 16px;
  color: var(--color-fg-muted);
  max-width: 460px;
  line-height: 1.6;
}

.features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 340px;
  margin-top: 8px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--color-fg-muted);
}

.feature-icon {
  color: var(--color-success-fg);
  flex-shrink: 0;
}

.error-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background-color: var(--color-danger-subtle);
  border: 1px solid var(--color-danger-muted);
  border-radius: 6px;
  font-size: 13px;
  color: var(--color-danger-fg);
  width: 100%;
  max-width: 540px;
}

.error-icon {
  flex-shrink: 0;
}
</style>
