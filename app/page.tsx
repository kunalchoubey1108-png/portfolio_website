import { fetchRepos } from '@/lib/github'
import TerminalShell from '@/components/TerminalShell'

export const revalidate = 3600 // revalidate every hour (ignored in static export, but good practice)

export default async function Home() {
  const repos = await fetchRepos()

  return <TerminalShell repos={repos} />
}
