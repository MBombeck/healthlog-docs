# HealthLog Documentation

Documentation site for [HealthLog](https://github.com/MBombeck/HealthLog), built with [Starlight](https://starlight.astro.build/) (Astro).

Live site: [docs.healthlog.dev](https://docs.healthlog.dev)

## Development

```bash
# Install dependencies
npm install

# Start local dev server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## Tech

- [Starlight](https://starlight.astro.build/) -- Astro's documentation framework
- [Astro](https://astro.build/) -- Static site generator

## Secret scanning

Commits are checked for secrets with [gitleaks](https://github.com/gitleaks/gitleaks): locally via the pre-commit hook
(enable once per clone: `git config core.hooksPath .githooks`) and in CI (`.github/workflows/gitleaks.yml`, new commits only).
