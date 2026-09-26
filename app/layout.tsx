import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'Kunal Choubey — Portfolio',
  description: 'Software Engineer & Full-Stack Developer. Building scalable apps, intelligent systems & clean architecture.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⌨️</text></svg>',
  },
}

import CustomCursor from '@/components/CustomCursor'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <CustomCursor
          spinDuration={2}
          hideDefaultCursor
          parallaxOn
          hoverDuration={0.2}
          cursorColor="#4CAF50"
          cursorColorOnTarget="#81C784"
        />
      </body>
    </html>
  )
}
