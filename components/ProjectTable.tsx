'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { Repo } from '@/lib/github'
import { formatDate } from '@/lib/github'

interface ProjectTableProps {
  repos: Repo[]
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572a5',
  Dart: '#00b4ab',
  Rust: '#dea584',
  Go: '#00add8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Ruby: '#701516',
  Swift: '#fa7343',
  Kotlin: '#a97bff',
}

function LangBadge({ lang }: { lang: string | null }) {
  if (!lang) return <span style={{ color: 'var(--gray)' }}>—</span>
  const color = LANG_COLORS[lang] || 'var(--green-dim)'
  return (
    <span style={{ color }} className="font-medium">
      {lang}
    </span>
  )
}

export default function ProjectTable({ repos }: ProjectTableProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [query, setQuery] = useState('')
  const [searchActive, setSearchActive] = useState(false)
  const [sortKey, setSortKey] = useState<keyof Repo | null>(null)
  const [sortAsc, setSortAsc] = useState(false)

  const searchRef = useRef<HTMLInputElement>(null)
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([])
  const tableRef = useRef<HTMLDivElement>(null)

  // Filter
  const filtered = repos.filter((r) => {
    if (!query) return true
    const q = query.toLowerCase()
    return (
      r.name.toLowerCase().includes(q) ||
      (r.description || '').toLowerCase().includes(q) ||
      (r.language || '').toLowerCase().includes(q)
    )
  })

  // Sort
  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const av = a[sortKey]
        const bv = b[sortKey]
        if (av == null && bv == null) return 0
        if (av == null) return sortAsc ? 1 : -1
        if (bv == null) return sortAsc ? -1 : 1
        if (typeof av === 'number' && typeof bv === 'number') {
          return sortAsc ? av - bv : bv - av
        }
        return sortAsc
          ? String(av).localeCompare(String(bv))
          : String(bv).localeCompare(String(av))
      })
    : filtered

  const clamp = (n: number) => Math.max(0, Math.min(n, sorted.length - 1))

  const handleSort = useCallback((key: keyof Repo) => {
    setSortKey((prev) => {
      if (prev === key) {
        setSortAsc((a) => !a)
        return key
      }
      setSortAsc(false)
      return key
    })
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (searchActive) {
        if (e.key === 'Escape') {
          setSearchActive(false)
          setQuery('')
        }
        return
      }

      switch (e.key) {
        case 'j':
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIdx((i) => clamp(i + 1))
          break
        case 'k':
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIdx((i) => clamp(i - 1))
          break
        case 'Enter':
          if (sorted[selectedIdx]) {
            window.open(sorted[selectedIdx].html_url, '_blank')
          }
          break
        case '/':
          e.preventDefault()
          setSearchActive(true)
          setTimeout(() => searchRef.current?.focus(), 50)
          break
        case 's':
          handleSort('stargazers_count')
          break
        case 'n':
          handleSort('name')
          break
        case 'u':
          handleSort('pushed_at')
          break
        case 'f':
          handleSort('forks_count')
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchActive, selectedIdx, sorted])

  // Scroll selected row into view
  useEffect(() => {
    rowRefs.current[selectedIdx]?.scrollIntoView({ block: 'nearest' })
  }, [selectedIdx])

  // Reset selection when filter changes
  useEffect(() => {
    setSelectedIdx(0)
  }, [query])

  const SortIndicator = ({ col }: { col: keyof Repo }) =>
    sortKey === col ? (
      <span style={{ color: 'var(--yellow)' }}>{sortAsc ? '▲' : '▼'}</span>
    ) : null

  return (
    <div ref={tableRef} className="flex flex-col h-full overflow-hidden">
      {/* Search bar */}
      {searchActive && (
        <div
          className="flex items-center gap-2 px-3 py-1 text-xs"
          style={{ borderBottom: '1px solid var(--green-dark)', background: '#0d150d' }}
        >
          <span style={{ color: 'var(--yellow)' }}>/</span>
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setSearchActive(false)
                setQuery('')
              }
              if (e.key === 'Enter') setSearchActive(false)
            }}
            className="flex-1 bg-transparent outline-none"
            style={{ color: 'var(--green)', fontFamily: 'inherit', fontSize: 'inherit' }}
            placeholder="search repos..."
            autoComplete="off"
          />
          {query && (
            <span style={{ color: 'var(--gray)' }}>{sorted.length} results</span>
          )}
        </div>
      )}

      {/* Table header */}
      <div
        className="grid text-xs px-2 py-1 font-bold select-none"
        style={{
          gridTemplateColumns: '3ch 1fr 2fr 10ch 6ch 6ch 10ch',
          color: 'var(--yellow)',
          background: '#0d150d',
          borderBottom: '1px solid var(--green-dark)',
        }}
      >
        <span>[r]ank</span>
        <button onClick={() => handleSort('name')} className="text-left" style={{ background: 'none', border: 'none', color: 'var(--yellow)', fontFamily: 'inherit', fontSize: 'inherit', cursor: 'pointer', fontWeight: 'bold' }}>
          [n]ame <SortIndicator col="name" />
        </button>
        <span>[d]escription</span>
        <span>[l]ang</span>
        <button onClick={() => handleSort('stargazers_count')} className="text-left" style={{ background: 'none', border: 'none', color: 'var(--yellow)', fontFamily: 'inherit', fontSize: 'inherit', cursor: 'pointer', fontWeight: 'bold' }}>
          [s]tars <SortIndicator col="stargazers_count" />
        </button>
        <button onClick={() => handleSort('forks_count')} className="text-left" style={{ background: 'none', border: 'none', color: 'var(--yellow)', fontFamily: 'inherit', fontSize: 'inherit', cursor: 'pointer', fontWeight: 'bold' }}>
          [f]orks <SortIndicator col="forks_count" />
        </button>
        <button onClick={() => handleSort('pushed_at')} className="text-left" style={{ background: 'none', border: 'none', color: 'var(--yellow)', fontFamily: 'inherit', fontSize: 'inherit', cursor: 'pointer', fontWeight: 'bold' }}>
          [u]pdated <SortIndicator col="pushed_at" />
        </button>
      </div>

      {/* Table rows */}
      <div className="flex-1 overflow-y-auto">
        {sorted.length === 0 ? (
          <div className="px-4 py-4 text-xs" style={{ color: 'var(--gray)' }}>
            No repos match &quot;{query}&quot;
          </div>
        ) : (
          sorted.map((repo, idx) => {
            const isSelected = idx === selectedIdx
            return (
              <div
                key={repo.id}
                ref={(el) => { rowRefs.current[idx] = el as HTMLTableRowElement | null }}
                className="grid text-xs px-2 py-1 cursor-pointer table-row-hover"
                style={{
                  gridTemplateColumns: '3ch 1fr 2fr 10ch 6ch 6ch 10ch',
                  background: isSelected
                    ? 'var(--bg-selected)'
                    : idx % 2 === 0 ? 'transparent' : 'var(--bg-row-alt)',
                  color: isSelected ? 'var(--white)' : 'var(--green)',
                  borderLeft: isSelected ? '2px solid var(--blue)' : '2px solid transparent',
                }}
                onClick={() => {
                  setSelectedIdx(idx)
                  window.open(repo.html_url, '_blank')
                }}
                onMouseEnter={() => setSelectedIdx(idx)}
              >
                {/* Rank / arrow */}
                <span style={{ color: isSelected ? 'var(--red)' : 'var(--gray)' }}>
                  {isSelected ? '▶' : String(idx + 1).padStart(2, ' ')}
                </span>
                {/* Repo name — always white so it stands out */}
                <span className="truncate pr-2 font-medium" style={{ color: 'var(--white)' }}>
                  {repo.name}
                </span>
                {/* Description — dimmed */}
                <span className="truncate pr-2" style={{ color: isSelected ? 'var(--white-dim)' : 'var(--gray)' }}>
                  {repo.description || <span style={{ color: 'var(--gray)', fontStyle: 'italic' }}>no description</span>}
                </span>
                {/* Language badge */}
                <LangBadge lang={repo.language} />
                {/* Stars — yellow accent */}
                <span style={{ color: 'var(--yellow)' }}>
                  ★ {repo.stargazers_count}
                </span>
                {/* Forks */}
                <span style={{ color: isSelected ? 'var(--blue)' : 'var(--gray)' }}>
                  {repo.forks_count}
                </span>
                {/* Updated date */}
                <span style={{ color: isSelected ? 'var(--white-dim)' : 'var(--gray)' }}>
                  {formatDate(repo.pushed_at)}
                </span>
              </div>
            )
          })
        )}
      </div>

      {/* Row count footer */}
      <div
        className="px-3 py-0.5 text-xs"
        style={{ color: 'var(--gray)', borderTop: '1px solid var(--green-dark)', background: '#0a0a0a' }}
      >
        {sorted.length} / {repos.length} repos
        {query && <span> · filtered by &quot;{query}&quot;</span>}
        {!searchActive && (
          <span className="ml-4" style={{ color: 'var(--green-dark)' }}>
            Press <span style={{ color: 'var(--yellow)' }}>/</span> to search
          </span>
        )}
      </div>
    </div>
  )
}
