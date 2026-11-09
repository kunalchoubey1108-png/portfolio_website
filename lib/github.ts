export interface Repo {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  pushed_at: string
  html_url: string
  homepage: string | null
  topics: string[]
}

const GITHUB_USERNAME = 'kunalchoubey1108-png'

export async function fetchRepos(): Promise<Repo[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  }

  // Optional: a token lifts the rate limit from 60 to 5,000 requests/hour.
  // Intentionally not NEXT_PUBLIC_* so it stays server-side (build time) only.
  const token = process.env.GITHUB_TOKEN
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    {
      headers,
      next: { revalidate: 3600 },
    }
  )

  if (!res.ok) {
    console.error('Failed to fetch GitHub repos:', res.status)
    return []
  }

  const data: Repo[] = await res.json()
  // Filter out forks, sort by pushed_at descending
  return data
    .filter((r) => !r.name.includes('.github'))
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
}

// Prefer the deployed site (e.g. Vercel) set as the repo's homepage; fall back to GitHub.
export function projectUrl(repo: Repo): string {
  const home = repo.homepage?.trim()
  if (!home) return repo.html_url
  return /^https?:\/\//i.test(home) ? home : `https://${home}`
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })
}
