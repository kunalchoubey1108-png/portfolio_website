'use client'

interface Skill {
  name: string
  category: string
  pct: number
}

const SKILLS: Skill[] = [
  // Languages
  { name: 'Python',        category: 'Languages',     pct: 90 },
  { name: 'TypeScript',    category: 'Languages',     pct: 85 },
  { name: 'JavaScript',    category: 'Languages',     pct: 80 },
  // Frontend
  { name: 'React',         category: 'Frontend',      pct: 82 },
  // Backend
  { name: 'FastAPI',       category: 'Backend',       pct: 80 },
  { name: 'Node.js',       category: 'Backend',       pct: 75 },
  // Databases
  { name: 'SQL/PostgreSQL',category: 'Databases',     pct: 75 },
  // AI/ML
  { name: 'PyTorch',       category: 'AI / ML',       pct: 70 },
  { name: 'XGBoost',       category: 'AI / ML',       pct: 65 },
  // DevOps
  { name: 'Docker',        category: 'DevOps',        pct: 65 },
  { name: 'Git',           category: 'DevOps',        pct: 90 },
  // Architecture
  { name: 'System Design', category: 'Architecture',  pct: 72 },
]

const CATEGORIES = Array.from(new Set(SKILLS.map((s) => s.category)))

function Bar({ pct }: { pct: number }) {
  const filled = Math.round((pct / 100) * 20)
  const empty = 20 - filled
  return (
    <span>
      <span style={{ color: 'var(--green)' }}>{'█'.repeat(filled)}</span>
      <span style={{ color: 'var(--green-dark)' }}>{'░'.repeat(empty)}</span>
    </span>
  )
}

export default function SkillsView() {
  return (
    <div className="p-5 overflow-y-auto h-full text-xs space-y-6">
      {CATEGORIES.map((cat) => (
        <div key={cat}>
          {/* Category header */}
          <div
            className="mb-1 font-bold uppercase tracking-widest text-xs"
            style={{ color: 'var(--yellow)' }}
          >
            ── {cat} ──
          </div>

          {/* Skills in this category */}
          <div className="space-y-1">
            {SKILLS.filter((s) => s.category === cat).map((skill) => (
              <div key={skill.name} className="flex items-center gap-3">
                <span
                  className="w-24 text-right"
                  style={{ color: 'var(--green)', minWidth: '10rem' }}
                >
                  {skill.name}
                </span>
                <Bar pct={skill.pct} />
                <span style={{ color: 'var(--gray)' }}>{skill.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="pt-4" style={{ color: 'var(--gray)', borderTop: '1px solid var(--green-dark)' }}>
        {'>>>'} Skills inferred from GitHub repos and self-assessed proficiency.
      </div>
    </div>
  )
}
