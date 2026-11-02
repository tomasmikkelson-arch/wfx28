# wfx28

Static multi-page site built with Vite.

```bash
npm install
npm run dev     # local preview
npm run build   # production build → dist/
```

- `content/` — page content and settings
- `scripts/generate.mjs` — HTML generator
- `app/src/` — scripts and styles
- `app/public/` — images, fonts, icons
- `tools/contact-form/` — form handler

Pushes to `main` are built and published by `.github/workflows/deploy.yml`.
For a custom domain set the repository variable `SITE_BASE` to `/`.
