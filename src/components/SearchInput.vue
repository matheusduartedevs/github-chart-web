<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  search: [username: string]
}>()

const inputValue = ref('')
const errorMessage = ref('')

function handleSubmit() {
  const trimmed = inputValue.value.trim()

  if (!trimmed) {
    errorMessage.value = 'Digite um nome de usuário do GitHub'
    return
  }

  errorMessage.value = ''
  emit('search', trimmed)
}

function handleInput() {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
}
</script>

<template>
  <div class="search-wrapper">
    <form class="search-form" @submit.prevent="handleSubmit">
      <div class="input-row">
        <div class="input-container" :class="{ error: errorMessage }">
          <svg class="icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
            <path
              d="M10.5 5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Zm.173 5.82a6.5 6.5 0 1 1 .707-.707l3.253 3.254a.5.5 0 0 1-.707.707l-3.253-3.254Z"
            />
          </svg>
          <input
            v-model="inputValue"
            type="text"
            placeholder="Nome de usuário do GitHub..."
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            @input="handleInput"
          />
        </div>
        <button type="submit" class="btn-search">Visualizar contribuições</button>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<style scoped>
.search-wrapper {
  width: 100%;
  max-width: 540px;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-row {
  display: flex;
  gap: 8px;
}

.input-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  background-color: var(--color-canvas-inset);
  border: 1px solid var(--color-border-default);
  border-radius: 6px;
  transition: border-color 0.15s ease;
}

.input-container:focus-within {
  border-color: var(--color-accent-fg);
  box-shadow: 0 0 0 3px var(--color-accent-muted);
}

.input-container.error {
  border-color: var(--color-danger-fg);
}

.input-container.error:focus-within {
  box-shadow: 0 0 0 3px var(--color-danger-muted);
}

.icon {
  color: var(--color-fg-muted);
  flex-shrink: 0;
}

input {
  width: 100%;
  height: 40px;
  background: transparent;
  border: none;
  outline: none;
  color: var(--color-fg-default);
  font-size: 14px;
}

input::placeholder {
  color: var(--color-fg-subtle);
}

.btn-search {
  height: 40px;
  padding: 0 16px;
  background-color: var(--color-success-emphasis);
  color: var(--color-fg-on-emphasis);
  border: 1px solid rgba(240, 246, 252, 0.1);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition:
    background-color 0.15s ease,
    box-shadow 0.15s ease;
}

.btn-search:hover {
  background-color: #2ea043;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1);
}

.btn-search:active {
  background-color: #298e3c;
}

.error-message {
  font-size: 12px;
  color: var(--color-danger-fg);
}
</style>
