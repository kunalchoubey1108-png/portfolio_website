'use client'

import { useState, useRef, useEffect } from 'react'
import { sendMessage } from '@/lib/supabase'

type Field = 'name' | 'email' | 'message'

const FIELDS: { key: Field; label: string; type?: string }[] = [
  { key: 'name',    label: 'Your name',    type: 'text' },
  { key: 'email',   label: 'Your email',   type: 'email' },
  { key: 'message', label: 'Your message', type: 'text' },
]

export default function ContactView() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [active, setActive] = useState<Field>('name')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const inputRefs = useRef<Record<Field, HTMLInputElement | null>>({ name: null, email: null, message: null })

  useEffect(() => {
    inputRefs.current[active]?.focus()
  }, [active])

  const handleSubmit = async () => {
    if (!values.name || !values.email || !values.message) {
      setStatus('error')
      setErrorMsg('All fields are required.')
      return
    }
    setStatus('sending')
    const { error } = await sendMessage(values)
    if (error) {
      setStatus('error')
      setErrorMsg(error)
    } else {
      setStatus('success')
      setValues({ name: '', email: '', message: '' })
      setActive('name')
    }
  }

  const handleKey = (e: React.KeyboardEvent, field: Field) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const idx = FIELDS.findIndex((f) => f.key === field)
      if (idx < FIELDS.length - 1) {
        setActive(FIELDS[idx + 1].key)
      } else {
        handleSubmit()
      }
    }
    if (e.key === 'Escape') {
      setValues({ name: '', email: '', message: '' })
      setActive('name')
      setStatus('idle')
    }
  }

  return (
    <div className="p-5 overflow-y-auto h-full text-xs space-y-5">
      <div style={{ color: 'var(--yellow)' }} className="font-bold uppercase tracking-widest mb-3">
        ── Contact ──
      </div>

      {status === 'success' ? (
        <div className="space-y-2">
          <div style={{ color: 'var(--green)' }}>
            {'>>>'} Message sent successfully! I&apos;ll get back to you soon.
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="mt-2"
            style={{ color: 'var(--yellow)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}
          >
            [Send another]
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {FIELDS.map((field, idx) => {
            const isActive = active === field.key
            const isFilled = !!values[field.key]
            return (
              <div key={field.key} className="flex items-center gap-2">
                <span
                  style={{
                    color: isActive ? 'var(--green)' : isFilled ? 'var(--green-dim)' : 'var(--gray)',
                    minWidth: '2rem',
                  }}
                >
                  {idx + 1}.
                </span>
                <span
                  className="w-28"
                  style={{ color: isActive ? 'var(--yellow)' : 'var(--gray)' }}
                >
                  {field.label}:
                </span>
                <span style={{ color: 'var(--green)' }}>{'>'}</span>
                <input
                  ref={(el) => { inputRefs.current[field.key] = el }}
                  type={field.type || 'text'}
                  value={values[field.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  onFocus={() => setActive(field.key)}
                  onKeyDown={(e) => handleKey(e, field.key)}
                  className="flex-1 bg-transparent outline-none"
                  style={{
                    color: 'var(--green)',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    borderBottom: isActive ? '1px solid var(--green-dim)' : '1px solid transparent',
                    caretColor: 'var(--green)',
                  }}
                  placeholder={isActive ? '█' : ''}
                  autoComplete="off"
                />
              </div>
            )
          })}

          {status === 'error' && (
            <div style={{ color: 'var(--red)' }}>
              {'>>>'} Error: {errorMsg}
            </div>
          )}

          <div className="flex gap-4 pt-2">
            <button
              onClick={handleSubmit}
              disabled={status === 'sending'}
              className="hover:brightness-125 transition-all"
              style={{
                color: status === 'sending' ? 'var(--gray)' : 'var(--green)',
                background: 'none',
                border: '1px solid var(--green-dark)',
                padding: '2px 12px',
                cursor: status === 'sending' ? 'wait' : 'pointer',
                fontFamily: 'inherit',
                fontSize: 'inherit',
              }}
            >
              {status === 'sending' ? '[ Sending... ]' : '[ Enter ] Send'}
            </button>
            <button
              onClick={() => {
                setValues({ name: '', email: '', message: '' })
                setActive('name')
                setStatus('idle')
              }}
              style={{
                color: 'var(--gray)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 'inherit',
              }}
            >
              [ Esc ] Cancel
            </button>
          </div>

          <div className="pt-2" style={{ color: 'var(--gray)' }}>
            {'>>>'} Or email directly:{' '}
            <a
              href="mailto:kunalchoubey1108@gmail.com"
              style={{ color: 'var(--green)' }}
            >
              kunalchoubey1108@gmail.com
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
