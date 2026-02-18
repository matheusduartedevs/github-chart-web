<script setup lang="ts">
import { ref } from 'vue'
import HomeView from './views/HomeView.vue'
import LoadingView from './views/LoadingView.vue'
import DashboardView from './views/DashboardView.vue'

type AppView = 'home' | 'loading' | 'dashboard'

const currentView = ref<AppView>('home')
const username = ref('')

function handleSearch(name: string) {
  username.value = name
  currentView.value = 'loading'
  setTimeout(() => {
    currentView.value = 'dashboard'
  }, 2000)
}

function handleBack() {
  currentView.value = 'home'
  username.value = ''
}
</script>

<template>
  <Transition name="fade" mode="out-in">
    <HomeView v-if="currentView === 'home'" @search="handleSearch" />
    <LoadingView v-else-if="currentView === 'loading'" :username="username" />
    <DashboardView v-else-if="currentView === 'dashboard'" :username="username" @back="handleBack" />
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
