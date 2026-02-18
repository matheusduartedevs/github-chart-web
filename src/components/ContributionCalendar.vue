<script setup lang="ts">
import { computed } from 'vue'
import type { ContributionWeek } from '../types/github'

const props = defineProps<{
  weeks: ContributionWeek[]
  total: number
  startDate: Date
}>()

const monthLabels = computed(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const labels: { label: string; col: number }[] = []

  let lastMonth = -1
  for (let w = 0; w < props.weeks.length; w++) {
    const weekDate = new Date(props.startDate)
    weekDate.setDate(weekDate.getDate() + w * 7)
    const month = weekDate.getMonth()
    if (month !== lastMonth && months[month]) {
      labels.push({ label: months[month] as string, col: w + 1 })
      lastMonth = month
    }
  }

  return labels
})
</script>

<template>
  <div class="calendar-wrapper">
    <div class="calendar-header">
      <h3 class="section-title">Atividade de Contribuições</h3>
      <span class="total-label">{{ total.toLocaleString() }} contribuições no último ano</span>
    </div>

    <div class="calendar-scroll">
      <div class="calendar">
        <div class="month-labels">
          <span
            v-for="item in monthLabels"
            :key="item.col"
            class="month-label"
            :style="{ gridColumn: item.col }"
          >
            {{ item.label }}
          </span>
        </div>

        <div class="weeks-row">
          <div class="day-labels">
            <span class="day-label">Seg</span>
            <span class="day-label">Qua</span>
            <span class="day-label">Sex</span>
          </div>

          <div class="weeks">
            <div v-for="(week, wi) in weeks" :key="wi" class="week">
              <div
                v-for="(level, di) in week.days"
                :key="di"
                class="day"
                :class="`level-${level}`"
                :title="`Nível ${level}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="legend">
      <span class="legend-label">Menos</span>
      <div class="legend-squares">
        <div v-for="l in [0, 1, 2, 3, 4]" :key="l" class="day" :class="`level-${l}`" />
      </div>
      <span class="legend-label">Mais</span>
    </div>
  </div>
</template>

<style scoped>
.calendar-wrapper {
  padding: 20px 24px;
  background-color: var(--color-canvas-subtle);
  border: 1px solid var(--color-border-default);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.calendar-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-fg-default);
}

.total-label {
  font-size: 13px;
  color: var(--color-fg-muted);
}

.calendar-scroll {
  overflow-x: auto;
  padding-bottom: 4px;
}

.calendar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: max-content;
}

.month-labels {
  display: grid;
  grid-template-columns: repeat(53, 14px);
  gap: 3px;
  padding-left: 28px;
}

.month-label {
  font-size: 11px;
  color: var(--color-fg-muted);
}

.weeks-row {
  display: flex;
  gap: 4px;
}

.day-labels {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-top: 2px;
  width: 24px;
}

.day-label {
  font-size: 10px;
  color: var(--color-fg-subtle);
  line-height: 14px;
  height: 14px;
}

.weeks {
  display: flex;
  gap: 3px;
}

.week {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.day {
  width: 11px;
  height: 11px;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.level-0 {
  background-color: var(--contribution-level-0);
}
.level-1 {
  background-color: var(--contribution-level-1);
}
.level-2 {
  background-color: var(--contribution-level-2);
}
.level-3 {
  background-color: var(--contribution-level-3);
}
.level-4 {
  background-color: var(--contribution-level-4);
}

.legend {
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: flex-end;
}

.legend-label {
  font-size: 11px;
  color: var(--color-fg-muted);
}

.legend-squares {
  display: flex;
  gap: 3px;
}
</style>
