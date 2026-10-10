'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Repo } from '@/lib/github'
import StatusBar from './StatusBar'
import AsciiHeader from './AsciiHeader'
import SectionTabs, { type Section } from './SectionTabs'
import KeybindBar from './KeybindBar'
import ProjectTable from './ProjectTable'
import SkillsView from './SkillsView'
import AboutView from './AboutView'
import ContactView from './ContactView'

interface TerminalShellProps {
  repos: Repo[]
}

export default function TerminalShell({ repos }: TerminalShellProps) {
  const [section, setSection] = useState<Section>('projects')
  const [searchActive, setSearchActive] = useState(false)

  const changeSection = useCallback((next: Section) => {
    setSection(next)
    setSearchActive(false)
  }, [])

  const openSocial = useCallback((type: 'github' | 'linkedin' | 'email') => {
    const urls = {
      github: 'https://github.com/kunalchoubey1108-png',
      linkedin: 'https://www.linkedin.com/in/kunal-choubey-4446a4367/',
      email: 'mailto:kunalchoubey1108@gmail.com',
    }
    window.open(urls[type], '_blank')
  }, [])

  // Global keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      // Don't intercept while typing in inputs
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      switch (e.key) {
        case '1': changeSection('projects'); break
        case '2': changeSection('skills'); break
        case '3': changeSection('about'); break
        case '4': changeSection('contact'); break
        case 'Tab': {
          e.preventDefault()
          const order: Section[] = ['projects', 'skills', 'about', 'contact']
          changeSection(order[(order.indexOf(section) + 1) % order.length])
          break
        }
        case 'g': openSocial('github'); break
        case 'l': openSocial('linkedin'); break
        case 'e': openSocial('email'); break
        case 'q':
          // No-op in browser (can't close tab programmatically)
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openSocial, changeSection, section])

  return (
    <div
      className="flex flex-col"
      style={{
        height: '100dvh',
        background: 'var(--bg)',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        overflow: 'hidden',
      }}
    >
      {/* Window chrome — macOS style dots */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 select-none"
        style={{ background: '#1a1a1a', borderBottom: '1px solid #2a2a2a' }}
      >
        <span className="w-3 h-3 rounded-full inline-block" style={{ background: '#ff5f57' }} />
        <span className="w-3 h-3 rounded-full inline-block" style={{ background: '#ffbd2e' }} />
        <span className="w-3 h-3 rounded-full inline-block" style={{ background: '#28ca41' }} />
        <span
          className="mx-auto text-xs"
          style={{ color: '#555', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
        >
          2. kunal-portfolio
        </span>
      </div>

      {/* Status bar */}
      <StatusBar activeSection={section} repoCount={repos.length} />

      {/* ASCII header */}
      <AsciiHeader onSocialClick={openSocial} />

      {/* Section tabs */}
      <SectionTabs active={section} onChange={changeSection} />

      {/* Main content area */}
      <div key={section} className="fade-in flex-1 overflow-hidden">
        {section === 'projects' && (
          <ProjectTable repos={repos} onSearchActiveChange={setSearchActive} />
        )}
        {section === 'skills' && <SkillsView />}
        {section === 'about'   && <AboutView />}
        {section === 'contact' && <ContactView />}
      </div>

      {/* Keybind bar */}
      <KeybindBar section={section} searchActive={searchActive} />
    </div>
  )
}
