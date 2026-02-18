import type { ApiResponse, GitHubUser } from '@/types/github'

const API_BASE_URL = import.meta.env.VITE_API_URL
const API_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

export const githubService = {
  getUser: async (username: string): Promise<ApiResponse<GitHubUser>> => {
    const response = await fetch(`${API_BASE_URL}/api/users/${username}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    })

    if (!response.ok) {
      const body = await response.json().catch(() => null)
      throw new Error(body?.message ?? `Request failed with status ${response.status}`)
    }

    return response.json() as Promise<ApiResponse<GitHubUser>>
  },
}
