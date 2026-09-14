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

export async function fetchRepos(): Promise<Repo[]> {
  const res = await fetch(
    'https://api.github.com/users/kunalchoubey1108-png/repos?per_page=100&sort=updated',
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
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

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })
}
