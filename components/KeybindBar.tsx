'use client'

interface KeybindBarProps {
  section: string
  searchActive: boolean
}

export default function KeybindBar({ section, searchActive }: KeybindBarProps) {
  if (searchActive) {
    return (
      <div
        className="flex items-center gap-3 px-3 py-1 text-xs select-none"
        style={{
          background: 'var(--green-dark)',
          borderTop: '1px solid var(--green-dim)',
          color: 'var(--green)',
        }}
      >
        <span><span style={{ color: 'var(--yellow)' }}>[Esc]</span> Cancel search</span>
        <span><span style={{ color: 'var(--yellow)' }}>[Enter]</span> Apply filter</span>
      </div>
    )
  }

  return (
    <div
      className="flex items-center flex-wrap gap-x-4 gap-y-0 px-3 py-1 text-xs select-none overflow-hidden"
      style={{
        background: 'var(--green-dark)',
        borderTop: '1px solid var(--green-dim)',
        color: 'var(--green)',
      }}
    >
      <span><span style={{ color: 'var(--yellow)' }}>[q]</span>Quit</span>
      <span><span style={{ color: 'var(--yellow)' }}>[Tab]</span>Switch</span>
      {section === 'projects' && (
        <>
          <span><span style={{ color: 'var(--yellow)' }}>[j/k]</span>Navigate</span>
          <span><span style={{ color: 'var(--yellow)' }}>[Enter]</span>Open</span>
          <span><span style={{ color: 'var(--yellow)' }}>[/]</span>Search</span>
        </>
      )}
      <span><span style={{ color: 'var(--yellow)' }}>[g]</span>GitHub</span>
      <span><span style={{ color: 'var(--yellow)' }}>[l]</span>LinkedIn</span>
      <span><span style={{ color: 'var(--yellow)' }}>[e]</span>Email</span>
      <span><span style={{ color: 'var(--yellow)' }}>[1-4]</span>Sections</span>
    </div>
  )
}
