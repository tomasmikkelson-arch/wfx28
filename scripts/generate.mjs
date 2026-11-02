// Generates static, SEO-friendly HTML for every page in every language.
// Layout mirrors the original isychenko.com; output goes to app/ (Vite root).
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import en from '../content/en.js';
import fr from '../content/fr.js';
import site from '../content/site.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'app');
const BASE = (process.env.BASE || '/').replace(/\/?$/, '/');
const dicts = { en, fr };

// [intrinsic width, height, available widths]
const IMG = {
  hero: [1921, 1336, [900, 1700]],
  'bio-portrait': [2258, 2978, [600, 1100]],
  'bio-atwork': [1921, 1337, [700, 1200]],
  'bio-laptop': [1922, 1336, [700, 1200]],
  dino: [4622, 2431, [1000, 2000]],
  'dino-badge': [2481, 2481, [300]],
  jurassic: [2481, 487, [700]],
  'news-1': [1337, 1337, [600]],
  'news-2': [1337, 1337, [600]],
  'pop-school': [1921, 1337, [700, 1300]],
  'pop-cefeya': [1922, 1337, [700, 1300]],
  'pop-6262': [1922, 1337, [700, 1300]],
  'pop-0372': [1922, 1337, [700, 1300]],
  'pop-mm': [1922, 1337, [700, 1300]],
  'eff-hero': [1922, 1337, [700, 1300]],
  'eff-deck': [2354, 2757, [700, 1300]],
  'work-hero': [1922, 2521, [700, 1300]],
  'work-deck': [2354, 2757, [700, 1300]],
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const asset = (p) => `${BASE}${p}`;
const svg = (name) => asset(`svg/${name}.svg`);
const bg = (name, w) => asset(`img/${name}-${w}.webp`);

function img(name, alt, { cls = '', sizes = '100vw', eager = false, extra = '' } = {}) {
  const [w, h, ws] = IMG[name];
  const largest = ws[ws.length - 1];
  const srcset = ws.map((x) => `${asset(`img/${name}-${x}.webp`)} ${Math.min(x, w)}w`).join(', ');
  return `<img class="${cls}" src="${asset(`img/${name}-${largest}.webp`)}" srcset="${srcset}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(
    alt
  )}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" ${extra}>`;
}

const pageUrl = (lang, slug = '') => {
  const prefix = site.languages.find((l) => l.code === lang).prefix;
  return `${BASE}${prefix}${slug ? `${slug}/` : ''}`;
};

const arrow = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="square"/></svg>`;
const icons = {
  facebook: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.9 8.8H3.8V20h3.1V8.8zM5.3 3.9a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.2 13.6c0-3-1.6-5-4.4-5-1.4 0-2.4.8-2.8 1.5V8.8H10V20h3.1v-5.6c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.7 1.8 3V20h3.2v-6.4z"/></svg>`,
  facebookOutline: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="currentColor" d="M13.4 20.5v-6.2h2.1l.3-2.5h-2.4v-1.6c0-.7.2-1.2 1.2-1.2h1.3V6.8c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.1-3.2 3.3v1.8H8.7v2.5h2.1v6.2z"/></svg>`,
  send: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M4 9v10h14M14 4l6 2-2 6M20 6l-9 7"/></svg>`,
  close: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 15 7-7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

const emailHtml = () =>
  `<a class="js-email" data-u="${site.email.user}" data-d="${site.email.domain}" href="#contact">${site.email.user}<span aria-hidden="true">&#64;</span>${site.email.domain}</a>`;

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
    <meta name="keywords" content="Ihor Isychenko, Marketing, Marketing Director, Graphic Designer, SMM, Social Media Marketing, Marketer, Content Creator, Media expert">
    <meta name="theme-color" content="#7D71F7">
    <meta name="color-scheme" content="light">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:locale" content="${t.locale}">
    <meta property="og:image" content="${site.url}/img/hero-1700.webp">
    <meta name="twitter:card" content="summary_large_image">
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${site.url}/${slug ? `${slug}/` : ''}">
    <link rel="icon" type="image/svg+xml" href="${asset('favicon.svg')}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300..800;1,300..500&display=swap">
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
  const langs = site.languages
    .map(
      (l) =>
        `<a href="${pageUrl(l.code, slug)}" hreflang="${l.code}" lang="${l.code}" class="lang__opt${l.code === t.lang ? ' is-active' : ''}"${
          l.code === t.lang ? ' aria-current="true"' : ''
        } data-lang-link title="${l.name}">${l.label}</a>`
    )
    .join('');
  return `
  <a class="skip" href="#main">${t.nav.skip}</a>
  <div class="progress" aria-hidden="true"><span></span></div>
  <header class="header" data-header>
    <div class="container header__inner">
      <a href="${home}" class="logo" aria-label="Ihor Isychenko — home"><img src="${svg('logo-purple')}" alt="Isychenko" width="160" height="31"></a>
      <nav class="nav" aria-label="Main">
        <a href="${home}#biography" class="nav__link">${t.nav.about}</a>
        <a href="${home}#experience" class="nav__link">${t.nav.experience}</a>
        <a href="${home}#contact" class="nav__link">${t.nav.contacts}</a>
      </nav>
      <div class="header__end">
        <a class="header__cv" href="${site.cv}" target="_blank" rel="noopener">${t.nav.cv} ${arrow}</a>
        <div class="lang" role="group" aria-label="${t.nav.langLabel}">${langs}</div>
        <button class="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="${t.nav.menu}" data-burger><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>
  <div class="menu" id="menu" data-menu hidden>
    <nav class="menu__nav" aria-label="Mobile">
      <a href="${home}#biography">${t.nav.about}</a>
      <a href="${home}#experience">${t.nav.experience}</a>
      <a href="${home}#contact">${t.nav.contacts}</a>
      <a href="${site.cv}" target="_blank" rel="noopener">${t.nav.cv} ${arrow}</a>
    </nav>
    <div class="menu__foot">${site.socials.map((s) => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}">${icons[s.id]}</a>`).join('')}</div>
  </div>`;
}

function footer(t) {
  const home = pageUrl(t.lang);
  return `
  <footer class="footer" id="contact">
    <div class="footer__main">
      <div class="container footer__grid">
        <div class="footer__brand">
          <img class="footer__logo" src="${svg('logo-dark')}" alt="Isychenko" width="350" height="68" loading="lazy">
          <p class="footer__tagline">${t.footer.tagline}</p>
          <p class="footer__role">${t.hero.role}</p>
          <div class="footer__socials">${site.socials
            .map((s) => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}" data-magnetic>${icons[s.id]}</a>`)
            .join('')}</div>
        </div>
        <div class="footer__col">
          <h3 class="footer__title">${t.footer.quick}</h3>
          <ul class="footer__links">
            <li><a href="${home}#biography">${t.nav.about}</a></li>
            <li><a href="${home}#experience">${t.nav.experience}</a></li>
            <li><a href="${home}#contact" data-popup-open="contact">${t.nav.contacts}</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h3 class="footer__title">${t.footer.contact}</h3>
          <p class="footer__info"><b>${t.bio.labels.name}:</b> Ihor Isychenko<br><b>${t.bio.labels.email}:</b> ${emailHtml()}<br><b>${
    t.bio.labels.city
  }:</b> ${t.bio.city}<br>${t.bio.region}</p>
          <a class="footer__cv" href="${site.cv}" target="_blank" rel="noopener">${t.nav.cv} ${arrow}</a>
        </div>
      </div>
    </div>
    <div class="footer__bottom"><p>Copyright © 2024 - ${Math.max(new Date().getFullYear(), site.copyrightUntil)} Ihor Isychenko. ${t.footer.rights}</p></div>
  </footer>
  <a href="#top" class="to-top" aria-label="${t.nav.top}" data-top>${icons.chevron}</a>`;
}

function formFields(t, withPhone) {
  return `
        <input type="hidden" name="_subject" value="New message from isychenko.com">
        <input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <label class="field"><span>${t.form.name}</span><input name="name" type="text" required autocomplete="name" placeholder="${t.form.name}"></label>
        ${withPhone ? `<label class="field"><span>${t.form.phone}</span><input name="phone" type="tel" autocomplete="tel" placeholder="${t.form.phone}"></label>` : ''}
        <label class="field"><span>${t.form.email}</span><input name="email" type="email" required autocomplete="email" placeholder="${t.form.email}"></label>
        <label class="field"><span>${t.form.message}</span><textarea name="message" rows="5" required placeholder="${t.form.message}"></textarea></label>
        <button class="btn btn--dark btn--block" type="submit" data-sending="${t.form.sending}">${icons.send}<span>${t.form.send}</span></button>`;
}

function popups(t, withExp) {
  const expPopups = withExp
    ? t.experience.items
        .filter((e) => e.popup)
        .map(
          (e) => `
  <dialog class="popup popup--exp" id="popup-${e.id}" aria-labelledby="popup-${e.id}-title" data-lenis-prevent>
    <div class="popup__frame">
      <button class="popup__close" type="button" data-close aria-label="${t.nav.close}">${icons.close}</button>
      <article class="popup__card">
        <header class="popup__head">
          <span class="popup__chip">${e.popup.org} · ${t.experience.workExp}</span>
          <h2 class="popup__title" id="popup-${e.id}-title">${e.role}</h2>
          <ul class="popup__meta"><li>${icons.calendar}${e.period}</li><li>${icons.pin}${e.place}</li></ul>
        </header>
        <div class="popup__img">${img(e.popup.image, e.company, { sizes: '(min-width: 800px) 680px, 92vw' })}</div>
        <div class="popup__body">
          ${e.popup.blocks
            .map((b) => (b.h ? `<h3>${b.h}</h3>` : b.p ? `<p>${b.p}</p>` : `<ul>${b.li.map((x) => `<li>${x}</li>`).join('')}</ul>`))
            .join('\n          ')}
        </div>
        <footer class="popup__foot">
          <p>${t.form.popupText}</p>
          <button type="button" class="btn btn--dark" data-popup-open="contact">${t.dino.connect} ${arrow}</button>
        </footer>
      </article>
    </div>
  </dialog>`
        )
        .join('')
    : '';
  return `${expPopups}
  <dialog class="popup popup--contact" id="popup-contact" aria-labelledby="popup-contact-title" data-lenis-prevent>
    <div class="popup__frame">
      <button class="popup__close" type="button" data-close aria-label="${t.nav.close}">${icons.close}</button>
      <form class="popup__card form" data-form data-endpoint="${site.formEndpoint}" novalidate>
        <header class="popup__head">
          <span class="popup__chip">${t.nav.contacts}</span>
          <h2 class="popup__title" id="popup-contact-title">${t.form.popupTitle}</h2>
          <p class="popup__sub">${t.form.popupText}</p>
          <div class="popup__direct">${emailHtml()}${site.socials
            .map((x) => `<a href="${x.url}" target="_blank" rel="noopener" aria-label="${x.label}">${icons[x.id]}</a>`)
            .join('')}</div>
        </header>
        ${formFields(t, false)}
      </form>
    </div>
  </dialog>
  <dialog class="popup popup--status" data-lenis-prevent data-status-modal aria-labelledby="status-title">
    <div class="popup__card popup__card--sm">
      <div class="status__icon" data-status-icon></div>
      <h2 class="popup__title" id="status-title" data-status-title data-ok="${esc(t.form.okTitle)}" data-err="${esc(t.form.errTitle)}"></h2>
      <p class="popup__sub" data-status-text data-ok="${esc(t.form.okText)}" data-err="${esc(t.form.errText)}"></p>
      <button class="btn btn--dark" type="button" data-close>${t.form.ok}</button>
    </div>
  </dialog>`;
}

const roundBtn = (label, attrs, cls = '') =>
  `<button type="button" class="round-btn ${cls}" ${attrs} data-magnetic><span class="round-btn__circle">${arrow}</span><span class="round-btn__label">${label}</span></button>`;

// ---------- home ----------
function home(t) {
  const ringText = (t.hero.ring + t.hero.ring).trim();
  const exp = t.experience.items
    .map(
      (e) => `
        <li class="tl__item">
          <div class="tl__meta reveal">
            <p class="tl__company">${e.company}</p>
            <p class="tl__date">${e.period}<br>${e.place}</p>
          </div>
          <div class="tl__dot" aria-hidden="true"><span></span></div>
          <div class="tl__content">
            <h3 class="tl__role reveal">${e.role}</h3>
            ${e.body.map((p) => `<p class="reveal">${p}</p>`).join('')}
            ${
              e.popup
                ? `<button type="button" class="tl__details reveal" data-popup-open="${e.id}" aria-haspopup="dialog">${t.experience.details}</button>`
                : `<span class="tl__details tl__details--muted reveal">${t.experience.details}</span>`
            }
          </div>
        </li>`
    )
    .join('');
  const colors = ['purple', 'dark', 'yellow', 'red'];

  return `
  <main id="main">
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="hero__bg" data-parallax="0.25" style="background-image:url(${bg('bg-hero', 2400)})"></div>
      <div class="container hero__stage">
        <div class="hero__photo" data-hero-photo>
        <aside class="hero__follow" aria-label="${t.hero.follow}">
          <span class="hero__line" aria-hidden="true"></span>
          ${site.socials
            .map(
              (s) =>
                `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}" data-magnetic>${s.id === 'facebook' ? icons.facebookOutline : icons.linkedin}</a>`
            )
            .join('')}
          <span class="hero__follow-text">${t.hero.follow}</span>
        </aside>
          <div class="hero__pic">${img('hero', 'Ihor Isychenko', { sizes: '(min-width: 1100px) 846px, 92vw', eager: true })}</div>
        <button type="button" class="hero__ring" data-popup-open="contact" aria-label="${esc(t.hero.ring)}" data-magnetic>
          <svg viewBox="0 0 200 200" aria-hidden="true"><defs><path id="ringPath" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"/></defs>
            <text><textPath href="#ringPath">${esc(ringText)}</textPath></text></svg>
          <span class="hero__ring-circle"><span class="hero__ring-icon"></span></span>
        </button>
        </div>
      </div>
      <div class="container hero__name">
        <h1 class="hero__title" id="hero-title"><span class="hero__first">${t.hero.first}</span> <span class="hero__last">${t.hero.last}</span></h1>
        ${roundBtn(t.hero.write, 'data-popup-open="contact" aria-haspopup="dialog"', 'hero__write')}
      </div>
      <p class="hero__role container" data-hero-fade>${t.hero.role}</p>
      <div class="container hero__frame-wrap"><div class="hero__frame" aria-hidden="true"></div></div>
    </section>

    <section class="bio" id="biography" aria-labelledby="bio-title">
      <span class="bio__arc" aria-hidden="true"></span>
      <div class="container bio__grid">
        <div class="bio__side">
          <div class="bio__block reveal">
            <h3 class="bio__label"><img src="${svg('card')}" alt="" width="24" height="22">${t.bio.personalTitle}</h3>
            <p class="bio__info"><b>${t.bio.labels.name}:</b> ${t.bio.name}<br><b>${t.bio.labels.email}:</b> ${emailHtml()}<br><b>${t.bio.labels.city}:</b> ${
    t.bio.city
  }<br>${t.bio.region}</p>
          </div>
          <div class="bio__block reveal">
            <h3 class="bio__label"><img src="${svg('click')}" alt="" width="22" height="22">${t.bio.skillsTitle}</h3>
            <ul class="bio__list">${t.bio.skills.map((s) => `<li>${s}</li>`).join('')}</ul>
            <ul class="bio__list">${t.bio.tools.map((s) => `<li>${s}</li>`).join('')}</ul>
          </div>
        </div>
        <div class="bio__main">
          <h2 class="section-title section-title--light reveal-lines" id="bio-title">${t.bio.title}</h2>
          <hr class="dashed dashed--light">
          <p class="bio__text reveal"><b>${t.bio.lead}</b>${t.bio.leadRest}</p>
          ${t.bio.paragraphs.map((p) => `<p class="bio__text reveal">${p}</p>`).join('')}
          <div class="bio__photos">
            <div class="bio__photo bio__photo--tall reveal-img">${img('bio-portrait', 'Ihor Isychenko', { sizes: '(min-width: 900px) 373px, 50vw' })}</div>
            <div class="bio__photo reveal-img">${img('bio-atwork', 'Ihor Isychenko', { sizes: '(min-width: 900px) 331px, 50vw' })}</div>
            <div class="bio__photo reveal-img">${img('bio-laptop', 'Ihor Isychenko', { sizes: '(min-width: 900px) 331px, 50vw' })}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="numbers" aria-labelledby="numbers-title">
      <div class="container numbers__grid">
        <div class="numbers__head">
          <h2 class="numbers__title reveal-lines" id="numbers-title"><b>${t.numbers.titleBold}</b> ${t.numbers.titleRest}</h2>
          <p class="numbers__text reveal">${t.numbers.text}</p>
        </div>
        <ul class="numbers__cards">
          ${t.numbers.items
            .map(
              (n, i) => `<li class="stat stat--${colors[i]} reveal" data-tilt>
              <div class="stat__top"><span class="stat__value"><span data-count="${n.value}">${n.value}</span>${n.suffix}</span>${
                n.head ? `<span class="stat__head">${n.head}</span>` : ''
              }</div>
              <span class="stat__rule"></span>
              <span class="stat__label">${n.label}</span></li>`
            )
            .join('')}
        </ul>
      </div>
    </section>

    <section class="band" aria-label="${t.band.label}">
      <p class="band__label">${t.band.label}</p>
      <div class="band__viewport"><ul class="band__track">${[...site.partners, ...site.partners]
        .map((x, i) => `<li${i >= site.partners.length ? ' aria-hidden="true"' : ''}><span>${x}</span><img src="${svg('sparkle')}" alt="" width="18" height="22"></li>`)
        .join('')}</ul></div>
    </section>

    <section class="exp" id="experience" aria-labelledby="exp-title">
      <div class="container">
        <div class="exp__head">
          <h2 class="section-title reveal-lines" id="exp-title">${t.experience.title}</h2>
          <hr class="dashed">
        </div>
        <ol class="tl" data-timeline><span class="tl__progress" aria-hidden="true"></span>${exp}</ol>
      </div>
    </section>

    <section class="dino" aria-labelledby="dino-title">
      <div class="dino__bg" data-parallax="0.2" style="background-image:url(${bg('bg-dino', 2400)})"></div>
      <div class="dino__grid container">
        <div class="dino__art">
          ${img('dino', 'Graphic Dinosaur', { cls: 'dino__img', sizes: '(min-width: 900px) 1160px, 120vw' })}
          ${img('dino-badge', 'Graphic Dinosaur', { cls: 'dino__badge', sizes: '84px' })}
          ${img('jurassic', t.dino.pill, { cls: 'dino__pill', sizes: '300px' })}
        </div>
        <div class="dino__text">
          ${roundBtn(t.dino.connect, 'data-popup-open="contact" aria-haspopup="dialog"', 'round-btn--outline')}
          <h2 class="dino__title reveal" id="dino-title">${t.dino.title}</h2>
          <p class="dino__lead reveal">${t.dino.text}</p>
        </div>
      </div>
    </section>

    <section class="news" id="media" aria-labelledby="news-title">
      <div class="news__bg" style="background-image:url(${bg('bg-news', 2400)})"></div>
      <div class="container">
        <div class="news__head">
          <h2 class="section-title reveal-lines" id="news-title">${t.media.title[0]} <span class="amp">${t.media.title[1]}</span> ${t.media.title[2]}</h2>
          <hr class="dashed">
        </div>
        <div class="news__grid">
          <div class="news__side">
            <h3 class="news__kicker reveal"><img src="${svg('chat')}" alt="" width="24" height="24">${t.media.kicker}</h3>
            <ol class="news__links">
              ${t.media.items
                .map((m, i) => `<li class="reveal"><span>0${i + 1}.</span><a href="${m.url}" target="_blank" rel="noopener">${m.title}</a></li>`)
                .join('')}
            </ol>
            <a class="news__more reveal" href="${t.media.items[0].url}" target="_blank" rel="noopener" aria-label="${t.media.kicker}" data-magnetic>${arrow}</a>
          </div>
          <div class="news__list">
            ${t.trainings.items
              .map(
                (tr) => `<article class="training">
                <a class="training__img reveal-img" href="${pageUrl(t.lang, tr.slug)}" tabindex="-1" aria-hidden="true">${img(tr.image, tr.alt, {
                  sizes: '(min-width: 900px) 249px, 90vw',
                })}</a>
                <div class="training__body">
                  <h3 class="training__title reveal">${tr.title}</h3>
                  <p class="training__text reveal">${tr.text}</p>
                  <a class="btn btn--dark reveal" href="${pageUrl(t.lang, tr.slug)}" data-magnetic>${t.trainings.seeDetails}</a>
                </div>
              </article>`
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>
  </main>`;
}

// ---------- training page ----------
function training(t, slug) {
  const p = t.pages[slug];
  const heroImg = `<div class="phero__img reveal-img">${img(p.heroImage, p.title, { sizes: '(min-width: 900px) 555px, 92vw', eager: true })}</div>`;
  const heroText = `<div class="phero__text"><h1 class="phero__title reveal-lines" data-instant>${p.title}</h1>${
    p.kicker ? `<p class="phero__kicker" data-hero-fade>${p.kicker}</p>` : ''
  }</div>`;
  const deck = `<div class="article__deck reveal-img">${img(p.deck, 'Media Training Ihor Isychenko', { sizes: '(min-width: 900px) 570px, 92vw' })}</div>`;
  const text = `<div class="article__text">
        ${p.body.map((b) => `<p class="reveal">${b}</p>`).join('')}
        <p class="article__date reveal">${p.dateline}</p>
        <div class="article__cta reveal">
          <a class="btn btn--dark" href="${p.press}" target="_blank" rel="noopener" data-magnetic>${t.page.press}</a>
          <a class="btn btn--outline" href="${p.presentation}" target="_blank" rel="noopener" data-magnetic>${t.page.presentation}</a>
        </div>
      </div>`;
  return `
  <main id="main" class="page page--${p.theme}">
    <section class="phero" id="top">
      <div class="phero__bg" data-parallax="0.2" style="background-image:url(${bg(p.theme === 'purple' ? 'bg-purple' : 'bg-yellow', 2600)})"></div>
      <div class="container phero__grid${p.heroImageLeft ? '' : ' phero__grid--rev'}">${p.heroImageLeft ? heroImg + heroText : heroText + heroImg}</div>
    </section>
    <section class="article container">
      <div class="article__intro">
        <h2 class="article__subtitle reveal-lines">${p.subtitle}</h2>
        ${p.lead.map((l) => `<p class="reveal">${l}</p>`).join('')}
      </div>
      <div class="article__grid${p.deckLeft ? ' article__grid--rev' : ''}">${p.deckLeft ? deck + text : text + deck}</div>
    </section>
    <section class="collab" id="contact-form">
      <div class="collab__bg" style="background-image:url(${bg('bg-dino', 2400)})"></div>
      <div class="container collab__grid">
        <form class="collab__form form reveal" data-form data-endpoint="${site.formEndpoint}" novalidate>
          <h2 class="collab__form-title">${t.form.pageTitle}</h2>
          ${formFields(t, true)}
        </form>
        <div class="collab__text">
          <p class="collab__title reveal">${t.collab.title}</p>
          <p class="reveal">${t.collab.text}</p>
          <p class="collab__adv-title reveal">${t.collab.advTitle}</p>
          <ol class="adv">
            ${t.collab.advantages
              .map((a, i) => `<li class="adv__item reveal"><span class="adv__num">0${i + 1}</span><div><h3>${a.title}</h3><p>${a.text}</p></div></li>`)
              .join('')}
          </ol>
        </div>
      </div>
    </section>
  </main>`;
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
<body data-page="home">${header(t)}${home(t)}${footer(t)}${popups(t, true)}
</body></html>`
    )
  );
  for (const slug of Object.keys(t.pages)) {
    const p = t.pages[slug];
    inputs.push(
      write(
        `${prefix}${slug}/index.html`,
        `${head(t, { title: p.metaTitle, description: p.lead.join(' '), slug })}
<body data-page="training">${header(t, slug)}${training(t, slug)}${footer(t)}${popups(t, false)}
</body></html>`
      )
    );
  }
}
write(
  'public/404.html',
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Page not found — Ihor Isychenko</title><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="3;url=${BASE}"><style>body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:Montserrat,system-ui,sans-serif;background:#7D71F7;color:#fff;text-align:center}a{color:#fff}</style></head><body><div><h1 style="font-size:clamp(4rem,15vw,10rem);margin:0">404</h1><p><a href="${BASE}">isychenko.com →</a></p></div></body></html>`
);
const urls = inputs.map((p) => `${site.url}/${p.replace(/index\.html$/, '')}`);
write('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
write('public/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
writeFileSync(join(root, '..', '.pages.json'), JSON.stringify(inputs, null, 2));
console.log(`Generated ${inputs.length} pages (base ${BASE})`);
