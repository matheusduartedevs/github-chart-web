<script setup lang="ts">
import { computed } from 'vue'
import UserProfileCard from '../components/UserProfileCard.vue'
import StatCard from '../components/StatCard.vue'
import ContributionCalendar from '../components/ContributionCalendar.vue'
import { dailyToCalendarWeeks, computeCurrentStreak, computeLongestStreak } from '../utils/contributions'
import type { GitHubUser } from '../types/github'

const props = defineProps<{
  user: GitHubUser
}>()

const emit = defineEmits<{
  back: []
}>()

const calendarData = computed(() => dailyToCalendarWeeks(props.user.contributions.daily))
const currentStreak = computed(() => computeCurrentStreak(props.user.contributions.daily))
const longestStreak = computed(() => computeLongestStreak(props.user.contributions.daily))
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="header-inner">
        <button class="btn-back" @click="emit('back')">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
            <path
              d="M7.78 12.53a.75.75 0 0 1-1.06 0L2.47 8.28a.75.75 0 0 1 0-1.06l4.25-4.25a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L4.81 7h7.44a.75.75 0 0 1 0 1.5H4.81l2.97 2.97a.75.75 0 0 1 0 1.06Z"
            />
          </svg>
          Voltar
        </button>
        <div class="header-brand">
          <svg viewBox="0 0 98 96" width="20" height="20" fill="currentColor">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
            />
          </svg>
          Contribuições
        </div>
      </div>
    </header>

    <main class="dashboard-main">
      <div class="dashboard-inner">
        <UserProfileCard :user="props.user" />

        <div class="stats-grid">
          <StatCard
            label="Total de Contribuições"
            :value="props.user.stats.contributionsLastYear.toLocaleString()"
            description="no último ano"
            variant="success"
          />
          <StatCard
            label="Sequência Atual"
            :value="currentStreak"
            description="dias seguidos"
            variant="accent"
          />
          <StatCard
            label="Sequência Mais Longa"
            :value="longestStreak"
            description="dias recorde"
          />
          <StatCard
            label="Média Diária"
            :value="props.user.stats.averagePerDay"
            description="contribuições / dia"
          />
        </div>

        <ContributionCalendar
          :weeks="calendarData.weeks"
          :total="props.user.stats.contributionsLastYear"
          :start-date="calendarData.startDate"
        />

        <div class="chart-placeholder">
          <p class="placeholder-label">Chart.js graph coming soon</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.dashboard-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--color-canvas-subtle);
  border-bottom: 1px solid var(--color-border-default);
  backdrop-filter: blur(8px);
}

.header-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid var(--color-border-default);
  border-radius: 6px;
  color: var(--color-fg-muted);
  font-size: 13px;
  transition:
    border-color 0.15s ease,
    color 0.15s ease;
}

.btn-back:hover {
  border-color: var(--color-fg-muted);
  color: var(--color-fg-default);
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-fg-default);
}

.dashboard-main {
  flex: 1;
  padding: 32px 24px;
}

.dashboard-inner {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.chart-placeholder {
  padding: 40px 24px;
  background-color: var(--color-canvas-subtle);
  border: 1px dashed var(--color-border-default);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-label {
  font-size: 14px;
  color: var(--color-fg-subtle);
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 400px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
