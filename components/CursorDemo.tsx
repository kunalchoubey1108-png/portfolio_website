import React from 'react';
import CustomCursor from './CustomCursor';

export default function CursorDemo() {
  return (
    <div>
      <CustomCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
        cursorColor="#4CAF50"
        cursorColorOnTarget="#81C784"
      />

      <div style={{ padding: '2rem', textAlign: 'center', minHeight: '100vh' }}>
        <h1 style={{ color: 'var(--white)', marginBottom: '2rem' }}>
          Custom Cursor Demo
        </h1>
        <p style={{ color: 'var(--green-dim)', marginBottom: '3rem' }}>
          Hover over the elements below to see the cursor change
        </p>

        <button
          className="cursor-target"
          onClick={() => alert('Button clicked!')}
          style={{
            padding: '1rem 2rem',
            background: 'var(--green-dark)',
            border: '1px solid var(--green)',
            color: 'var(--white)',
            fontFamily: 'inherit',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Click Me!
        </button>

        <div
          className="cursor-target"
          style={{
            padding: '2rem',
            margin: '2rem',
            background: 'var(--bg-row-alt)',
            border: '1px solid var(--green-dark)',
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          Hover Target
        </div>
      </div>
    </div>
  );
}