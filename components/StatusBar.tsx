'use client'

interface StatusBarProps {
  activeSection: string
  repoCount: number
}

const sections: Record<string, string> = {
  projects: 'Projects',
  skills: 'Skills',
  about: 'About',
  contact: 'Contact',
}

export default function StatusBar({ activeSection, repoCount }: StatusBarProps) {
  const now = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div
      className="flex items-center justify-between px-3 py-1 text-xs select-none"
      style={{
        background: 'var(--green-dark)',
        color: 'var(--green)',
        borderBottom: '1px solid var(--green-dim)',
      }}
    >
      <div className="flex items-center gap-4">
        <span className="font-bold" style={{ color: 'var(--white)' }}>
          {'>>>'}kunal
        </span>
        <span style={{ color: 'var(--gray)' }}>|</span>
        <span>
          {'[ '}
          <span className="font-bold" style={{ color: 'var(--blue)' }}>
            {sections[activeSection] ?? 'Projects'}
          </span>
          {' ]'}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span>
          GitHub:{' '}
          <span style={{ color: 'var(--yellow)' }}>{repoCount}</span> repos
        </span>
        <span style={{ color: 'var(--gray)' }}>•</span>
        <span style={{ color: 'var(--gray)' }}>Last updated: {now}</span>
      </div>
    </div>
  )
}
