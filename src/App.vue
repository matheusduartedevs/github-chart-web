<script setup lang="ts">
import { ref } from 'vue'
import HomeView from './views/HomeView.vue'
import LoadingView from './views/LoadingView.vue'
import DashboardView from './views/DashboardView.vue'
import { githubService } from './services/github'
import type { GitHubUser } from './types/github'

type AppView = 'home' | 'loading' | 'dashboard'

const currentView = ref<AppView>('home')
const username = ref('')
const userData = ref<GitHubUser | null>(null)
const searchError = ref<string | null>(null)

async function handleSearch(name: string) {
  username.value = name
  searchError.value = null
  currentView.value = 'loading'

  try {
    const response = await githubService.getUser(name)
    userData.value = response.data
    currentView.value = 'dashboard'
  } catch (err) {
    searchError.value = err instanceof Error ? err.message : 'Something went wrong'
    currentView.value = 'home'
  }
}

function handleBack() {
  currentView.value = 'home'
  username.value = ''
  userData.value = null
}
</script>

<template>
  <Transition name="fade" mode="out-in">
    <HomeView
      v-if="currentView === 'home'"
      :error-message="searchError"
      @search="handleSearch"
    />
    <LoadingView v-else-if="currentView === 'loading'" :username="username" />
    <DashboardView
      v-else-if="currentView === 'dashboard' && userData"
      :user="userData"
      @back="handleBack"
    />
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
