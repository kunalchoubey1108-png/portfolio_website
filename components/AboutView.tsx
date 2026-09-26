'use client'

const TIMELINE = [
  {
    year: '2026',
    role: 'Active Developer',
    org: 'Personal Projects',
    desc: 'Building AI tools, productivity apps & full-stack systems',
  },
  {
    year: '2025',
    role: 'Full-Stack Developer',
    org: 'Open Source & Freelance',
    desc: 'React, FastAPI, PostgreSQL, Docker, AI/ML integrations',
  },
  {
    year: 'ongoing',
    role: 'B.Tech Student',
    org: 'NIT Raipur',
    desc: 'Computer Science & Engineering',
  },
]

export default function AboutView() {
  return (
    <div className="p-5 overflow-y-auto h-full text-xs space-y-7">
      {/* Bio */}
      <div className="space-y-1">
        <div style={{ color: 'var(--yellow)' }} className="font-bold uppercase tracking-widest mb-2">
          ── About ──
        </div>
        <p style={{ color: 'var(--white)' }}>
          I&apos;m a <span style={{ color: 'var(--green)' }}>Software Engineer and Full-Stack Developer</span> from{' '}
          <span style={{ color: 'var(--green)' }}>NIT Raipur</span>, focused on building scalable
          applications and intelligent systems.
        </p>
        <p className="mt-2" style={{ color: 'var(--green-dim)' }}>
          I work across React, TypeScript, Python, FastAPI, Node.js, SQL, and AI/ML — building
          products from frontend to backend, data pipelines, and deployment.
        </p>
        <p className="mt-2" style={{ color: 'var(--green-dim)' }}>
          I enjoy solving complex problems through clean architecture, automation, AI, and
          performance-focused engineering — turning ideas into reliable software that people can
          actually use.
        </p>
      </div>

      {/* Timeline */}
      <div>
        <div style={{ color: 'var(--yellow)' }} className="font-bold uppercase tracking-widest mb-2">
          ── Timeline ──
        </div>

        {/* Table header */}
        <div
          className="grid font-bold mb-1"
          style={{
            gridTemplateColumns: '8ch 18ch 20ch 1fr',
            color: 'var(--yellow)',
            borderBottom: '1px solid var(--green-dark)',
            paddingBottom: '2px',
          }}
        >
          <span>Year</span>
          <span>Role</span>
          <span>Organisation</span>
          <span>Details</span>
        </div>

        {/* Rows */}
        {TIMELINE.map((item, idx) => (
          <div
            key={idx}
            className="grid py-0.5"
            style={{
              gridTemplateColumns: '8ch 18ch 20ch 1fr',
              color: idx === 0 ? 'var(--green)' : 'var(--green-dim)',
              borderBottom: '1px solid var(--green-dark)',
            }}
          >
            <span style={{ color: 'var(--yellow)' }}>{item.year}</span>
            <span>{item.role}</span>
            <span style={{ color: 'var(--cyan)' }}>{item.org}</span>
            <span style={{ color: 'var(--gray)' }}>{item.desc}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ color: 'var(--gray)', borderTop: '1px solid var(--green-dark)' }} className="pt-3">
        {'>>>'} Open to interesting projects and collaborations.{' '}
        <span style={{ color: 'var(--green)' }}>kunalchoubey1108@gmail.com</span>
      </div>
    </div>
  )
}
