# GitHub Pages Deployment Guide

This document explains how to deploy your portfolio website to GitHub Pages.

## Prerequisites

- GitHub account with repository created
- Repository should be named `portfolio-website` (or you can use a custom domain)
- Node.js 18+ installed locally

## Setup Instructions

### 1. Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name the repository `portfolio-website` (or your preferred name)
3. Make it **public** (required for free GitHub Pages)
4. Clone to your local machine:

```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

### 2. Configure GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select **GitHub Actions**
   - This allows the CI/CD workflow to deploy automatically

### 3. Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) handles everything:

**What it does:**

- Triggers on every push to the `main` branch
- Installs dependencies with npm
- Builds the Next.js project with `npm run build`
- Generates static files in the `out/` directory
- Deploys to GitHub Pages

**How to deploy:**

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

### 4. Verify Deployment

1. Go to **Settings** → **Pages** on your repository
2. Look for "Your site is live at: `https://yourusername.github.io/portfolio-website`"
3. Wait 1-2 minutes for the workflow to complete
4. Visit your live portfolio!

## Custom Domain (Optional)

To use a custom domain like `kunalchoubey.dev`:

1. Go to **Settings** → **Pages**
2. Add your custom domain in "Custom domain" field
3. Configure DNS records at your domain registrar:
   - Add a `CNAME` record pointing to `yourusername.github.io`
   - Or use `A` records (see GitHub docs for details)
4. Wait for DNS propagation (up to 24 hours)
5. Enable "Enforce HTTPS" once available

## Environment Variables

For public data (GitHub API):

- Variables starting with `NEXT_PUBLIC_` are safe to use
- They're embedded in the static site

For sensitive data (Supabase keys):

- Use only `NEXT_PUBLIC_*` keys in production
- Private keys should not be exposed to the frontend

## Troubleshooting

**Site not deploying:**

- Check **Actions** tab for workflow errors
- Ensure `main` branch is configured as deployment source
- Verify repository is public (required for free GitHub Pages)

**Styles or assets not loading:**

- GitHub Pages serves from repository root or `/portfolio-website/`
- The Next.js config is set up for this (check `next.config.js`)
- Ensure trailing slash is enabled in config

**Build fails:**

- Check workflow logs in **Actions** tab
- Run `npm run build` locally to debug
- Ensure all dependencies are in `package.json`

## Local Testing Before Deploy

To test the production build locally:

```bash
npm run build
npm run start
```

Then open `http://localhost:3000` to preview your live site.

## Continuous Updates

Simply push changes to `main` branch:

```bash
git add .
git commit -m "Your message"
git push origin main
```

The workflow automatically rebuilds and deploys!

## Documentation

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Actions](https://docs.github.com/en/actions)
