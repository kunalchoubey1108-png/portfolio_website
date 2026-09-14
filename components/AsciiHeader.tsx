'use client'

const ASCII_ART = `
 _  ___   _ _   _    _    _
| |/ / | | | \\ | |  / \\  | |
| ' /| | | |  \\| | / _ \\ | |
| . \\| |_| | |\\  |/ ___ \\| |___
|_|\\_\\\\___/|_| \\_/_/   \\_\\_____|`

interface AsciiHeaderProps {
  onSocialClick: (type: 'github' | 'linkedin' | 'email') => void
}

export default function AsciiHeader({ onSocialClick }: AsciiHeaderProps) {
  return (
    <div
      className="px-4 py-4 select-none"
      style={{ borderBottom: '1px solid var(--green-dark)' }}
    >
      {/* ASCII art — same size on all screens, no big-font fallback */}
      <pre
        className="text-xs leading-tight mb-3"
        style={{ color: 'var(--green-dim)', fontFamily: 'inherit', opacity: 0.7 }}
      >
        {ASCII_ART}
      </pre>

      {/* Bio lines */}
      <div className="space-y-1 text-xs" style={{ color: 'var(--green-dim)' }}>
        <div>
          <span style={{ color: 'var(--gray)' }}>{'>>>'}</span>{' '}
          <span style={{ color: 'var(--white)' }}>
            Software Engineer &amp; Full-Stack Developer
          </span>{' '}
          <span style={{ color: 'var(--gray)' }}>·</span>{' '}
          <span style={{ color: 'var(--blue)' }}>NIT Raipur</span>
        </div>
        <div>
          <span style={{ color: 'var(--gray)' }}>{'>>>'}</span>{' '}
          <span style={{ color: 'var(--green-dim)' }}>React · TypeScript · Python · FastAPI · Node.js · AI/ML</span>
        </div>
        <div>
          <span style={{ color: 'var(--gray)' }}>{'>>>'}</span>{' '}
          <span style={{ color: 'var(--white-dim)' }}>Building scalable apps, intelligent systems &amp; clean architecture</span>
          <span className="cursor-blink ml-1" style={{ color: 'var(--green-dim)' }}>
            █
          </span>
        </div>
      </div>

      {/* Social links */}
      <div className="mt-3 flex flex-wrap gap-5 text-xs">
        <button
          onClick={() => onSocialClick('github')}
          className="flex items-center gap-1 transition-opacity hover:opacity-80"
          style={{ color: 'var(--white-dim)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          <span style={{ color: 'var(--green)' }}>[g]</span>
          <span>github.com/kunalchoubey1108-png</span>
        </button>
        <button
          onClick={() => onSocialClick('linkedin')}
          className="flex items-center gap-1 transition-opacity hover:opacity-80"
          style={{ color: 'var(--white-dim)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          <span style={{ color: 'var(--blue)' }}>[l]</span>
          <span>linkedin.com/in/kunal-choubey</span>
        </button>
        <button
          onClick={() => onSocialClick('email')}
          className="flex items-center gap-1 transition-opacity hover:opacity-80"
          style={{ color: 'var(--white-dim)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          <span style={{ color: 'var(--red)' }}>[e]</span>
          <span>kunalchoubey1108@gmail.com</span>
        </button>
      </div>
    </div>
  )
}
