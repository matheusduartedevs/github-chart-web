export interface DailyContribution {
  date: string
  contributionCount: number
}

export interface WeeklyContribution {
  week: string
  total: number
}

export interface MonthlyContribution {
  month: string
  total: number
}

export interface UserContributions {
  daily: DailyContribution[]
  weekly: WeeklyContribution[]
  monthly: MonthlyContribution[]
}

export interface UserStats {
  followers: number
  following: number
  repositories: number
  contributionsLastYear: number
  averagePerDay: number
}

export interface GitHubUser {
  username: string
  name: string
  bio: string | null
  avatar: string
  location: string | null
  company: string | null
  htmlUrl: string
  stats: UserStats
  contributions: UserContributions
}

export interface ApiResponse<T> {
  data: T
  meta: {
    generatedAt: string
  }
  errors: string[] | null
}

export type ContributionLevel = 0 | 1 | 2 | 3 | 4

export interface ContributionWeek {
  days: ContributionLevel[]
}
