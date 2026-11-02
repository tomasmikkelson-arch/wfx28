# isychenko.com — personal website of Ihor Isychenko

Modern rebuild of [isychenko.com](https://isychenko.com/): static, fast, animated, bilingual (EN / FR).

**Live:** https://tomasmikkelson-arch.github.io/wfx28/

## Stack
- [Vite](https://vitejs.dev/) — build & dev server (multi-page, static HTML per language for SEO)
- [GSAP + ScrollTrigger](https://gsap.com/) — scroll & intro animations
- [Lenis](https://lenis.darkroom.engineering/) — smooth scrolling
- Montserrat (Google Fonts), brand colors `#7D71F7`, `#B2AAFF`, `#1C1A1A`
- Respects `prefers-reduced-motion`, fully responsive, keyboard accessible popups (`<dialog>`)

## Editing text
All copy lives in two files:
- `content/en.js` — English
- `content/fr.js` — French

Links, email, CV and gallery images: `content/site.js`. Images: `app/public/img/` (WebP, 800 & 1600 px).

## Develop
```bash
npm install
npm run dev
```

## Deploy
Every push to `main` builds the site and publishes `dist/` to the `gh-pages` branch
(`.github/workflows/deploy.yml`). GitHub Pages serves the `gh-pages` branch.

### Custom domain (isychenko.com)
1. Settings → Pages → Custom domain → `isychenko.com`.
2. Settings → Secrets and variables → Actions → Variables → add `SITE_BASE` = `/`.
3. At your DNS provider point the domain to GitHub Pages (A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `www` CNAME → `tomasmikkelson-arch.github.io`).

### Contact form
Messages are delivered by [FormSubmit](https://formsubmit.co) to the email in `content/site.js`.
The first message triggers a one-time activation email — click the link in it.
