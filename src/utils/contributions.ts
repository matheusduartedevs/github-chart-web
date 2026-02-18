import type { DailyContribution, ContributionLevel, ContributionWeek } from '../types/github'

function localDateString(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year!, month! - 1, day!)
}

function getLevel(count: number, max: number): ContributionLevel {
  if (count === 0 || max === 0) return 0
  const ratio = count / max
  if (ratio <= 0.25) return 1
  if (ratio <= 0.5) return 2
  if (ratio <= 0.75) return 3
  return 4
}

export interface CalendarData {
  weeks: ContributionWeek[]
  startDate: Date
}

export function dailyToCalendarWeeks(daily: DailyContribution[]): CalendarData {
  if (daily.length === 0) {
    const fallback = new Date()
    fallback.setDate(fallback.getDate() - 52 * 7)
    fallback.setDate(fallback.getDate() - fallback.getDay())
    return { weeks: [], startDate: fallback }
  }

  const sorted = [...daily].sort((a, b) => a.date.localeCompare(b.date))
  const firstDate = parseLocalDate(sorted[0]!.date)
  const lastDate = parseLocalDate(sorted[sorted.length - 1]!.date)

  const startDate = new Date(firstDate)
  startDate.setDate(startDate.getDate() - firstDate.getDay())

  const endDate = new Date(lastDate)
  endDate.setDate(endDate.getDate() + (6 - lastDate.getDay()))

  const max = Math.max(...daily.map((d) => d.contributionCount))
  const countByDate = new Map<string, number>()
  for (const d of daily) {
    countByDate.set(d.date, d.contributionCount)
  }

  const weeks: ContributionWeek[] = []
  const current = new Date(startDate)

  while (current <= endDate) {
    const days: ContributionLevel[] = []
    for (let d = 0; d < 7; d++) {
      const count = countByDate.get(localDateString(current)) ?? 0
      days.push(getLevel(count, max))
      current.setDate(current.getDate() + 1)
    }
    weeks.push({ days })
  }

  return { weeks, startDate }
}

export function computeCurrentStreak(daily: DailyContribution[]): number {
  const sorted = [...daily].sort((a, b) => b.date.localeCompare(a.date))
  const today = localDateString(new Date())

  let streak = 0
  const ref = new Date()

  const todayEntry = sorted.find((d) => d.date === today)
  if (!todayEntry || todayEntry.contributionCount === 0) {
    ref.setDate(ref.getDate() - 1)
  }

  for (const entry of sorted) {
    if (entry.date === localDateString(ref)) {
      if (entry.contributionCount > 0) {
        streak++
        ref.setDate(ref.getDate() - 1)
      } else {
        break
      }
    } else if (entry.date < localDateString(ref)) {
      break
    }
  }

  return streak
}

export function computeLongestStreak(daily: DailyContribution[]): number {
  const sorted = [...daily].sort((a, b) => a.date.localeCompare(b.date))

  let longest = 0
  let current = 0
  let prevDate: Date | null = null

  for (const entry of sorted) {
    const entryDate = parseLocalDate(entry.date)
    if (entry.contributionCount > 0) {
      if (prevDate) {
        const diff = Math.round((entryDate.getTime() - prevDate.getTime()) / 86_400_000)
        current = diff === 1 ? current + 1 : 1
      } else {
        current = 1
      }
      prevDate = entryDate
      if (current > longest) longest = current
    } else {
      prevDate = null
      current = 0
    }
  }

  return longest
}
