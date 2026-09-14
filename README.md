# Portfolio Website

A modern, interactive portfolio website built with Next.js and deployed on GitHub Pages. Showcasing projects, skills, and professional experience with a terminal-inspired UI.

**Live Site:** [kunalchoubey.dev](https://kunalchoubey.dev)

## Features

- **Interactive Terminal UI** - Browse portfolio with keyboard shortcuts and terminal-like navigation
- **Project Showcase** - Featuring GitHub-integrated project data and live links
- **Skills Overview** - Comprehensive technical skills and competencies
- **About Section** - Professional background and introduction
- **Contact Integration** - Easy ways to connect and reach out
- **Responsive Design** - Optimized for desktop and mobile devices
- **Dark Mode** - Eye-friendly interface with terminal aesthetics

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) with App Router
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Database/Backend:** [Supabase](https://supabase.com)
- **Analytics:** Vercel Analytics
- **Deployment:** GitHub Pages (static export)
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm/bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file with your Supabase credentials (if using):

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit files.

### Building

Build for production:

```bash
npm run build
```

This generates a static export in the `out/` directory, ready for GitHub Pages deployment.

## Project Structure

```
├── app/              # Next.js App Router pages and layouts
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── components/       # React components
│   ├── TerminalShell.tsx
│   ├── ProjectTable.tsx
│   ├── SkillsView.tsx
│   ├── AboutView.tsx
│   ├── ContactView.tsx
│   ├── SectionTabs.tsx
│   ├── StatusBar.tsx
│   ├── AsciiHeader.tsx
│   └── KeybindBar.tsx
├── lib/              # Utilities and API clients
│   ├── github.ts     # GitHub API integration
│   └── supabase.ts   # Supabase client
└── public/           # Static assets
```

## Keyboard Shortcuts

The portfolio includes keyboard navigation:

- Arrow keys to navigate sections
- Enter to select
- Esc to go back
- Type to search/filter

(Customize shortcuts in `components/KeybindBar.tsx`)

## Deployment

### GitHub Pages

This project is configured for GitHub Pages deployment:

1. **Update repository name** - Ensure your GitHub repository is named `portfolio-website` or update the deployment workflow accordingly

2. **Enable GitHub Pages** - In repository settings, set GitHub Pages source to GitHub Actions

3. **Deploy** - Push to `main` branch to trigger automatic deployment via GitHub Actions

The build output is statically exported and deployed to GitHub Pages via `gh-pages` branch.

### Environment Variables

GitHub Pages deployment doesn't support secrets directly. For Supabase:

- Use `NEXT_PUBLIC_*` environment variables (public-facing safe data only)
- Store sensitive keys in repository secrets if using Actions

## Customization

### Update Personal Information

- **Main content:** Edit `app/page.tsx`
- **Components:** Modify files in `components/`
- **Styling:** Update Tailwind classes or edit `app/globals.css`

### Add New Sections

1. Create a new component in `components/`
2. Import and add to the tab system in `components/SectionTabs.tsx`
3. Update routing/navigation in main shell

### GitHub Integration

The portfolio fetches project data from GitHub. Configure in `lib/github.ts`:

```typescript
const GITHUB_USERNAME = "yourusername";
```

## Performance

- **Static Export:** Pre-rendered as static HTML
- **Image Optimization:** Unoptimized images configured for static hosting
- **Bundle Optimization:** Tree-shaking and code splitting via Next.js

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is a personal portfolio. For improvements or fixes, feel free to fork and customize for your own use.

## License

This project is open source. Feel free to use it as inspiration for your own portfolio.

## Contact

- **Website:** [kunalchoubey.dev](https://kunalchoubey.dev)
- **GitHub:** [@kunalchoubey](https://github.com/kunalchoubey)

---

**Last Updated:** September 2026
