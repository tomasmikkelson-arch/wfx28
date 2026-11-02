// Generates static, SEO-friendly HTML for every page in every language.
// Output goes to app/ (Vite root). Run: node scripts/generate.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import en from '../content/en.js';
import fr from '../content/fr.js';
import site from '../content/site.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'app');
const BASE = (process.env.BASE || '/').replace(/\/?$/, '/');
const dicts = { en, fr };

// Intrinsic sizes of images (prevents layout shift).
const SIZES = {
  portrait: [2258, 2977],
  'training-deck-1': [2354, 2757],
  'training-deck-2': [2354, 2757],
  'mediabaza-chernivtsi': [1336, 1336],
  'mediabaza-chernihiv-sq': [1336, 1336],
  'online-training': [1921, 2520],
  'newsroom-cat': [2160, 1332],
  'hero-golden-gate': [3508, 2480],
};
const size = (n) => SIZES[n] || [1921, 1336];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const asset = (p) => `${BASE}${p}`;
const svg = (name) => asset(`svg/${name}.svg`);

function img(name, alt, { cls = '', sizes = '(min-width: 900px) 50vw, 100vw', eager = false, extra = '' } = {}) {
  const [w, h] = size(name);
  return `<img class="${cls}" src="${asset(`img/${name}-1600.webp`)}" srcset="${asset(`img/${name}-800.webp`)} 800w, ${asset(
    `img/${name}-1600.webp`
  )} 1600w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" ${extra}>`;
}

const pageUrl = (lang, slug = '') => {
  const prefix = site.languages.find((l) => l.code === lang).prefix;
  return `${BASE}${prefix}${slug ? `${slug}/` : ''}`;
};

const arrow = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const icons = {
  facebook: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.9 8.8H3.8V20h3.1V8.8zM5.3 3.9a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.2 13.6c0-3-1.6-5-4.4-5-1.4 0-2.4.8-2.8 1.5V8.8H10V20h3.1v-5.6c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.7 1.8 3V20h3.2v-6.4z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M3.5 6.5h17v11h-17zM3.5 7l8.5 6.5L20.5 7"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
  user: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4.5 20c.8-3.8 3.9-5.8 7.5-5.8s6.7 2 7.5 5.8" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
};

const emailHtml = (cls = '') =>
  `<a class="js-email ${cls}" data-u="${site.email.user}" data-d="${site.email.domain}" href="#contact">${site.email.user}<span aria-hidden="true">&#64;</span>${site.email.domain}</a>`;

const splitChars = (text) =>
  [...text].map((c) => (c === ' ' ? ' ' : `<span class="ch">${esc(c)}</span>`)).join('');

// ---------- shared chrome ----------
function head(t, { title, description, slug = '' }) {
  const alternates = site.languages
    .map((l) => `<link rel="alternate" hreflang="${l.code}" href="${site.url}/${l.prefix}${slug ? `${slug}/` : ''}">`)
    .join('\n    ');
  return `<!doctype html>
<html lang="${t.lang}" class="no-js">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="theme-color" content="#7D71F7">
    <meta name="color-scheme" content="light">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:locale" content="${t.locale}">
    <meta property="og:image" content="${site.url}/img/portrait-1600.webp">
    <meta name="twitter:card" content="summary_large_image">
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${site.url}/${slug ? `${slug}/` : ''}">
    <link rel="icon" type="image/svg+xml" href="${asset('favicon.svg')}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400..900;1,400..700&display=swap">
    <script>document.documentElement.classList.replace('no-js','js')</script>
    <link rel="stylesheet" href="/src/styles/main.css">
    <script type="module" src="/src/main.js"></script>
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Ihor Isychenko',
      jobTitle: t.hero.role,
      url: site.url,
      sameAs: site.socials.map((s) => s.url),
      address: { '@type': 'PostalAddress', addressLocality: 'Sloviansk', addressCountry: 'UA' },
    })}</script>
  </head>`;
}

function header(t, slug = '') {
  const home = pageUrl(t.lang);
  const link = (hash, label) => `<a href="${home}#${hash}" class="nav__link" data-magnetic>${label}</a>`;
  const langs = site.languages
    .map(
      (l) =>
        `<a href="${pageUrl(l.code, slug)}" hreflang="${l.code}" lang="${l.code}" class="lang__opt${l.code === t.lang ? ' is-active' : ''}" ${
          l.code === t.lang ? 'aria-current="true"' : ''
        } data-lang-link title="${l.name}">${l.label}</a>`
    )
    .join('');
  return `
  <a class="skip" href="#main">${t.nav.skip}</a>
  <div class="progress" aria-hidden="true"><span></span></div>
  <header class="header" data-header>
    <div class="header__inner container">
      <a href="${home}" class="logo" aria-label="Ihor Isychenko — home">
        <img src="${svg('logo-dark')}" alt="ISYCHENKO" width="2512" height="485">
      </a>
      <nav class="nav" aria-label="Main">
        ${link('biography', t.nav.about)}
        ${link('experience', t.nav.experience)}
        ${link('media', t.nav.media)}
        ${link('contact', t.nav.contacts)}
      </nav>
      <div class="header__actions">
        <div class="lang" role="group" aria-label="${t.nav.langLabel}"><span class="lang__pill" aria-hidden="true"></span>${langs}</div>
        <a class="btn btn--sm btn--primary header__cv" href="${site.cv}" target="_blank" rel="noopener">${t.nav.cv}</a>
        <button class="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="${t.nav.menu}" data-burger><span></span><span></span></button>
      </div>
    </div>
  </header>
  <div class="menu" id="menu" data-menu hidden>
    <nav class="menu__nav" aria-label="Mobile">
      <a href="${home}#biography">${t.nav.about}</a>
      <a href="${home}#experience">${t.nav.experience}</a>
      <a href="${home}#media">${t.nav.media}</a>
      <a href="${home}#contact">${t.nav.contacts}</a>
      <a href="${site.cv}" target="_blank" rel="noopener">${t.nav.cv} ${arrow}</a>
    </nav>
    <div class="menu__foot">${site.socials.map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join('')}</div>
  </div>`;
}

function footer(t) {
  const home = pageUrl(t.lang);
  return `
  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__brand">
        <img src="${svg('logo-purple')}" alt="ISYCHENKO" width="2512" height="485" loading="lazy">
        <p>${t.footer.tagline}</p>
        <div class="socials">${site.socials
          .map((s) => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}" data-magnetic>${icons[s.id]}</a>`)
          .join('')}</div>
      </div>
      <div>
        <h3 class="footer__title">${t.footer.quick}</h3>
        <ul class="footer__links">
          <li><a href="${home}#biography">${t.nav.about}</a></li>
          <li><a href="${home}#experience">${t.nav.experience}</a></li>
          <li><a href="${home}#contact">${t.nav.contacts}</a></li>
        </ul>
      </div>
      <div>
        <h3 class="footer__title">${t.footer.contact}</h3>
        <ul class="footer__info">
          <li>${icons.user}<span>${t.bio.labels.name}: Ihor Isychenko</span></li>
          <li>${icons.mail}<span>${t.bio.labels.email}: ${emailHtml()}</span></li>
          <li>${icons.pin}<span>${t.bio.labels.city}: ${t.bio.city} ${t.bio.region}</span></li>
        </ul>
        <a class="btn btn--sm btn--light" href="${site.cv}" target="_blank" rel="noopener">${t.nav.cv} ${arrow}</a>
      </div>
    </div>
    <div class="container footer__bottom">
      <p>Copyright © 2024 - ${new Date().getFullYear()} Ihor Isychenko. ${t.footer.rights}</p>
      <a href="#top" class="footer__top" data-top>${t.footer.top} ↑</a>
    </div>
    <div class="footer__giant" aria-hidden="true">ISYCHENKO</div>
  </footer>`;
}

function contactBlock(t) {
  return `
  <section class="contact section" id="contact" aria-labelledby="contact-title">
    <div class="container contact__grid">
      <div class="contact__intro">
        <h2 class="h2 reveal-lines" id="contact-title">${t.collab.title}</h2>
        <p class="lead reveal">${t.collab.text}</p>
        <h3 class="contact__adv-title reveal">${t.collab.advTitle}</h3>
        <ol class="adv">
          ${t.collab.advantages
            .map(
              (a, i) => `<li class="adv__item reveal"><span class="adv__num">0${i + 1}</span><div><h4>${a.title}</h4><p>${a.text}</p></div></li>`
            )
            .join('')}
        </ol>
      </div>
      <form class="form reveal" data-form data-endpoint="${site.formEndpoint}" novalidate>
        <h3 class="form__title">${t.form.title}</h3>
        <input type="hidden" name="_subject" value="New message from isychenko.com">
        <input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <label class="field"><input name="name" type="text" required autocomplete="name" placeholder=" "><span>${t.form.name}</span></label>
        <label class="field"><input name="email" type="email" required autocomplete="email" placeholder=" "><span>${t.form.email}</span></label>
        <label class="field"><textarea name="message" rows="4" required placeholder=" "></textarea><span>${t.form.message}</span></label>
        <button class="btn btn--primary btn--block" type="submit" data-sending="${t.form.sending}"><span>${t.form.send}</span> ${arrow}</button>
        <div class="form__direct">${icons.mail} ${emailHtml()}</div>
      </form>
    </div>
  </section>
  <dialog class="modal modal--status" data-status-modal aria-labelledby="status-title">
    <div class="modal__box modal__box--sm">
      <div class="status__icon" data-status-icon></div>
      <h3 id="status-title" data-status-title data-ok="${esc(t.form.okTitle)}" data-err="${esc(t.form.errTitle)}"></h3>
      <p data-status-text data-ok="${esc(t.form.okText)}" data-err="${esc(t.form.errText)}"></p>
      <button class="btn btn--primary" type="button" data-close>${t.form.ok}</button>
    </div>
  </dialog>`;
}

const lightbox = (t) => `
  <dialog class="modal modal--lightbox" data-lightbox aria-label="Image">
    <button class="modal__close" type="button" data-close aria-label="${t.nav.close}">✕</button>
    <img data-lightbox-img alt="">
  </dialog>`;

// ---------- home ----------
function home(t) {
  const decor = (name, cls, depth) =>
    `<img src="${svg(name)}" class="float ${cls}" data-depth="${depth}" alt="" aria-hidden="true" width="120" height="120">`;
  const marqueeItems = t.marquee
    .map((m) => `<span>${m}</span><img src="${svg('sparkle')}" alt="" aria-hidden="true" width="40" height="48">`)
    .join('');

  const exp = t.experience.items
    .map(
      (e, i) => `
        <li class="exp__item reveal" data-preview="${asset(`img/${e.image}-800.webp`)}">
          <button class="exp__row" type="button" data-modal-open="exp-${e.id}" aria-haspopup="dialog">
            <span class="exp__idx">${String(i + 1).padStart(2, '0')}</span>
            <span class="exp__main">
              <span class="exp__role">${e.role}</span>
              <span class="exp__company">${e.company}</span>
            </span>
            <span class="exp__meta"><span>${e.period}</span><span>${e.place}</span></span>
            <span class="exp__more">${t.experience.details} ${arrow}</span>
          </button>
          <template id="exp-${e.id}">
            <div class="modal__media">${img(e.image, e.company, { sizes: '(min-width: 900px) 45vw, 100vw' })}</div>
            <div class="modal__content">
              <p class="kicker">${e.period} · ${e.place}</p>
              <h3 class="modal__title">${e.role}</h3>
              <p class="modal__company">${e.company}</p>
              ${e.body.map((p) => `<p>${p}</p>`).join('')}
            </div>
          </template>
        </li>`
    )
    .join('');

  return `
  <main id="main">
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="hero__bg" aria-hidden="true">
        <span class="blob blob--1"></span><span class="blob blob--2"></span>
        <span class="ring ring--1" data-depth="0.2"></span><span class="ring ring--2" data-depth="0.4"></span>
        <span class="dot dot--yellow" data-depth="0.6"></span>
      </div>
      <div class="container hero__grid">
        <div class="hero__text">
          <p class="hero__hello" data-hero-fade>${t.hero.hello}</p>
          <h1 class="hero__title" id="hero-title">
            <span class="line">${splitChars('Ihor')}</span>
            <span class="line line--accent">${splitChars('Isychenko')}</span>
          </h1>
          <p class="hero__role" data-hero-fade>${t.hero.role.split('|').map((s) => `<span>${s.trim()}</span>`).join('<i>/</i>')}</p>
          <p class="hero__tagline" data-hero-fade>${t.hero.tagline}</p>
          <div class="hero__cta" data-hero-fade>
            <a class="btn btn--primary btn--lg" href="#contact" data-magnetic>${t.hero.cta} ${arrow}</a>
            <a class="btn btn--ghost btn--lg" href="${site.cv}" target="_blank" rel="noopener" data-magnetic>${t.hero.cta2}</a>
          </div>
        </div>
        <div class="hero__visual" data-hero-visual>
          <div class="hero__frame">
            ${img('portrait', 'Ihor Isychenko', { cls: 'hero__photo', sizes: '(min-width: 900px) 40vw, 90vw', eager: true })}
          </div>
          <img src="${svg('dino-badge')}" class="hero__badge" alt="Graphic Dinosaur" width="200" height="200">
          ${decor('like', 'float--like', 1.2)}
          ${decor('heart', 'float--heart', 0.8)}
          ${decor('care', 'float--care', 1)}
          ${decor('chat', 'float--chat', 0.6)}
          ${decor('click', 'float--click', 1.4)}
          <img src="${svg('sparkle')}" class="float float--sparkle" data-depth="0.5" alt="" aria-hidden="true" width="80" height="97">
          <div class="hero__chip" data-depth="0.3">${icons.pin}<span>${t.hero.location}</span></div>
        </div>
      </div>
      <a href="#biography" class="hero__scroll" aria-label="${t.hero.scroll}"><span></span>${t.hero.scroll}</a>
    </section>

    <div class="marquee" aria-hidden="true"><div class="marquee__track">${marqueeItems}${marqueeItems}</div></div>

    <section class="bio section" id="biography" aria-labelledby="bio-title">
      <div class="container bio__grid">
        <div class="bio__media">
          <div class="bio__img parallax">${img('golden-gate', 'Ihor Isychenko in San Francisco', { sizes: '(min-width: 900px) 45vw, 100vw' })}</div>
          <img src="${svg('card')}" class="bio__sticker" alt="" aria-hidden="true" width="120" height="108">
        </div>
        <div class="bio__text">
          <p class="kicker reveal">${t.bio.kicker}</p>
          <h2 class="h2 reveal-lines" id="bio-title">${t.bio.title}</h2>
          <p class="bio__lead scrub-words">${t.bio.lead}</p>
          ${t.bio.paragraphs.map((p) => `<p class="reveal">${p}</p>`).join('')}
        </div>
      </div>
      <div class="container info">
        <article class="info__card info__card--personal reveal">
          <h3>${t.bio.personalTitle}</h3>
          <dl>
            <div><dt>${t.bio.labels.name}</dt><dd>${t.bio.name}</dd></div>
            <div><dt>${t.bio.labels.email}</dt><dd>${emailHtml()}</dd></div>
            <div><dt>${t.bio.labels.city}</dt><dd>${t.bio.city}<br><small>${t.bio.region}</small></dd></div>
          </dl>
        </article>
        <article class="info__card info__card--skills reveal">
          <h3>${t.bio.skillsTitle}</h3>
          <ul class="chips">${t.bio.skills.map((s) => `<li>${s}</li>`).join('')}</ul>
        </article>
        <article class="info__card info__card--tools reveal">
          <h3>${t.bio.toolsTitle}</h3>
          <ul class="chips chips--dark">${t.bio.tools.map((s) => `<li>${s}</li>`).join('')}</ul>
        </article>
      </div>
    </section>

    <section class="numbers section" aria-labelledby="numbers-title">
      <div class="container numbers__grid">
        <div class="numbers__head">
          <h2 class="h2 reveal-lines" id="numbers-title">${t.numbers.title[0]} <em>${t.numbers.title[1]}</em></h2>
          <p class="reveal">${t.numbers.text}</p>
        </div>
        <ul class="numbers__list">
          ${t.numbers.items
            .map(
              (n) =>
                `<li class="stat reveal"><span class="stat__value"><span data-count="${n.value}">${n.value}</span>${n.suffix}</span><span class="stat__label">${n.label}</span></li>`
            )
            .join('')}
        </ul>
      </div>
    </section>

    <section class="exp section" id="experience" aria-labelledby="exp-title">
      <div class="container">
        <div class="section__head">
          <p class="kicker reveal">${t.experience.kicker}</p>
          <h2 class="h2 reveal-lines" id="exp-title">${t.experience.title}</h2>
        </div>
        <ol class="exp__list">${exp}</ol>
      </div>
      <div class="exp__preview" aria-hidden="true"><img alt=""></div>
    </section>

    <section class="connect" aria-labelledby="connect-title">
      <div class="container">
        <div class="connect__card reveal">
          <img src="${svg('sparkle')}" class="connect__spark" alt="" aria-hidden="true" width="80" height="97">
          <h2 class="connect__title" id="connect-title">${t.connect.title}</h2>
          <p>${t.connect.text}</p>
          <a class="btn btn--light btn--lg" href="#contact" data-magnetic>${t.connect.cta} ${arrow}</a>
        </div>
      </div>
    </section>

    <section class="gallery" aria-labelledby="gallery-title">
      <div class="container section__head">
        <p class="kicker reveal">${t.gallery.kicker}</p>
        <h2 class="h2 reveal-lines" id="gallery-title">${t.gallery.title}</h2>
      </div>
      <div class="gallery__pin">
        <ul class="gallery__track">
          ${site.gallery
            .map(
              (g) =>
                `<li class="gallery__item"><button type="button" data-lightbox-open="${asset(`img/${g}-1600.webp`)}" aria-label="Open image">${img(g, '', {
                  sizes: '(min-width: 900px) 40vw, 80vw',
                })}</button></li>`
            )
            .join('')}
        </ul>
      </div>
    </section>

    <section class="media section" id="media" aria-labelledby="media-title">
      <div class="container media__grid">
        <div class="media__head">
          <h2 class="media__title reveal-lines" id="media-title">${t.media.title[0]} <span>${t.media.title[1]}</span> ${t.media.title[2]}</h2>
          <p class="kicker reveal">${t.media.kicker}</p>
        </div>
        <ul class="articles">
          ${t.media.items
            .map(
              (m, i) => `<li class="reveal"><a class="article" href="${m.url}" target="_blank" rel="noopener">
                <span class="article__num">0${i + 1}.</span>
                <span class="article__title">${m.title}</span>
                <span class="article__src">${m.source}</span>
                <span class="article__arrow">${arrow}</span></a></li>`
            )
            .join('')}
        </ul>
      </div>
      <div class="container trainings">
        <div class="section__head">
          <p class="kicker reveal">${t.trainings.kicker}</p>
          <h2 class="h2 reveal-lines">${t.trainings.title}</h2>
        </div>
        <div class="trainings__grid">
          ${t.trainings.items
            .map(
              (tr) => `<a class="training reveal" href="${pageUrl(t.lang, tr.slug)}" data-tilt>
              <span class="training__img">${img(tr.image, tr.title, { sizes: '(min-width: 900px) 40vw, 100vw' })}</span>
              <span class="training__body">
                <span class="training__num">${tr.num}</span>
                <span class="training__title">${tr.title}</span>
                <span class="training__text">${tr.text}</span>
                <span class="btn btn--sm btn--primary">${t.trainings.seeDetails} ${arrow}</span>
              </span></a>`
            )
            .join('')}
        </div>
      </div>
    </section>

    ${contactBlock(t)}
  </main>
  <dialog class="modal modal--exp" data-exp-modal aria-label="${t.experience.details}">
    <div class="modal__box">
      <button class="modal__close" type="button" data-close aria-label="${t.nav.close}">✕</button>
      <div class="modal__body" data-exp-body></div>
    </div>
  </dialog>
  ${lightbox(t)}`;
}

// ---------- training page ----------
function training(t, slug) {
  const p = t.pages[slug];
  const other = t.trainings.items.find((x) => x.slug !== slug);
  return `
  <main id="main" class="page">
    <section class="page__hero">
      <div class="hero__bg" aria-hidden="true"><span class="blob blob--1"></span><span class="ring ring--1" data-depth="0.3"></span><span class="dot dot--yellow" data-depth="0.6"></span></div>
      <div class="container">
        <a class="back" href="${pageUrl(t.lang)}#media">← ${t.page.back}</a>
        <p class="kicker" data-hero-fade>${p.kicker}</p>
        <h1 class="page__title reveal-lines" data-instant>${p.title}</h1>
        <div class="page__lead" data-hero-fade>${p.lead.map((l, i) => `<p${i === 0 ? ' class="lead"' : ''}>${l}</p>`).join('')}</div>
      </div>
    </section>
    <section class="collage container">
      ${p.images
        .map(
          (im, i) =>
            `<button type="button" class="collage__item collage__item--${i + 1} reveal" data-lightbox-open="${asset(`img/${im}-1600.webp`)}" aria-label="Open image">${img(
              im,
              p.title,
              { sizes: '(min-width: 900px) 33vw, 100vw' }
            )}</button>`
        )
        .join('')}
    </section>
    <article class="article-body container">
      <div class="article-body__text">
        ${p.body.map((b) => `<p class="reveal">${b}</p>`).join('')}
        <p class="dateline reveal">${icons.pin} ${p.dateline}</p>
        <div class="article-body__cta reveal">
          <a class="btn btn--primary" href="${p.press}" target="_blank" rel="noopener" data-magnetic>${t.page.press} ${arrow}</a>
          <a class="btn btn--ghost" href="${p.presentation}" target="_blank" rel="noopener" data-magnetic>${t.page.presentation} ${arrow}</a>
        </div>
      </div>
      <aside class="article-body__aside reveal">
        <p class="kicker">${t.page.more}</p>
        <a class="training training--mini" href="${pageUrl(t.lang, other.slug)}" data-tilt>
          <span class="training__img">${img(other.image, other.title, { sizes: '(min-width: 900px) 25vw, 100vw' })}</span>
          <span class="training__body"><span class="training__num">${other.num}</span><span class="training__title">${other.title}</span>
          <span class="btn btn--sm btn--primary">${t.trainings.seeDetails} ${arrow}</span></span>
        </a>
      </aside>
    </article>
    ${contactBlock(t)}
  </main>
  ${lightbox(t)}`;
}

// ---------- write ----------
function write(rel, html) {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  return rel;
}

const inputs = [];
for (const lang of Object.keys(dicts)) {
  const t = dicts[lang];
  const prefix = site.languages.find((l) => l.code === lang).prefix;
  inputs.push(
    write(
      `${prefix}index.html`,
      `${head(t, { title: t.meta.title, description: t.meta.description })}
<body data-page="home">${header(t)}${home(t)}${footer(t)}
</body></html>`
    )
  );
  for (const slug of Object.keys(t.pages)) {
    const p = t.pages[slug];
    inputs.push(
      write(
        `${prefix}${slug}/index.html`,
        `${head(t, { title: p.metaTitle, description: p.lead.join(' '), slug })}
<body data-page="training">${header(t, slug)}${training(t, slug)}${footer(t)}
</body></html>`
      )
    );
  }
}
// 404 page for GitHub Pages: redirect unknown paths home.
write(
  'public/404.html',
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Page not found — Ihor Isychenko</title><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="3;url=${BASE}"><style>body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:Montserrat,system-ui,sans-serif;background:#7D71F7;color:#fff;text-align:center}a{color:#fff}</style></head><body><div><h1 style="font-size:clamp(4rem,15vw,10rem);margin:0">404</h1><p><a href="${BASE}">isychenko.com →</a></p></div></body></html>`
);
writeFileSync(join(root, '..', '.pages.json'), JSON.stringify(inputs, null, 2));
console.log(`Generated ${inputs.length} pages (base ${BASE})`);
