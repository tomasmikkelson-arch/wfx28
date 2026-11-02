import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------------- smooth scroll ---------------- */
let lenis = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
const scrollTo = (target) => {
  const el = typeof target === 'string' ? $(target) : target;
  if (!el && target !== 0) return;
  if (lenis) lenis.scrollTo(el ?? 0, { offset: -70, duration: 1.3 });
  else (el ? el.scrollIntoView({ behavior: 'smooth' }) : window.scrollTo({ top: 0, behavior: 'smooth' }));
};

// In-page anchors
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href]');
  if (!a) return;
  const url = new URL(a.href, location.href);
  if (url.pathname === location.pathname && url.hash && !a.hasAttribute('data-lang-link')) {
    const el = url.hash === '#top' ? 0 : $(url.hash);
    if (el === null) return;
    e.preventDefault();
    closeMenu();
    scrollTo(el);
    history.replaceState(null, '', url.hash === '#top' ? location.pathname : url.hash);
  }
});
// Arriving with a hash (e.g. from a subpage)
if (location.hash && $(location.hash)) {
  window.addEventListener('load', () => setTimeout(() => scrollTo(location.hash), 150));
}

/* ---------------- language switch keeps your place ---------------- */
$$('[data-lang-link]').forEach((a) =>
  a.addEventListener('click', () => {
    try {
      localStorage.setItem('lang', a.hreflang);
      sessionStorage.setItem('restoreY', String(window.scrollY));
    } catch {}
  })
);
try {
  const y = sessionStorage.getItem('restoreY');
  if (y !== null) {
    sessionStorage.removeItem('restoreY');
    window.addEventListener('load', () => (lenis ? lenis.scrollTo(+y, { immediate: true }) : window.scrollTo(0, +y)));
  }
} catch {}

/* ---------------- header, progress, menu ---------------- */
const header = $('[data-header]');
const progress = $('.progress span');
let lastY = 0;
const onScroll = () => {
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 20);
  header.classList.toggle('is-hidden', y > 400 && y > lastY && !document.body.classList.contains('menu-open'));
  lastY = y;
  const h = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const burger = $('[data-burger]');
const menu = $('[data-menu]');
function closeMenu() {
  if (!document.body.classList.contains('menu-open')) return;
  document.body.classList.remove('menu-open');
  burger.setAttribute('aria-expanded', 'false');
  lenis?.start();
  setTimeout(() => (menu.hidden = true), 400);
}
burger?.addEventListener('click', () => {
  if (document.body.classList.contains('menu-open')) return closeMenu();
  menu.hidden = false;
  requestAnimationFrame(() => document.body.classList.add('menu-open'));
  burger.setAttribute('aria-expanded', 'true');
  lenis?.stop();
  if (!reduce) gsap.from('.menu__nav a', { y: 60, opacity: 0, stagger: 0.06, duration: 0.7, ease: 'power3.out', delay: 0.15 });
});
document.addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());

/* ---------------- obfuscated email ---------------- */
$$('.js-email').forEach((a) => {
  const mail = `${a.dataset.u}@${a.dataset.d}`;
  a.href = `mailto:${mail}`;
  a.textContent = mail;
});

/* ---------------- text splitting helpers ---------------- */
function splitWords(el) {
  if (el.dataset.split) return $$('.w', el);
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.append(part);
          else {
            const outer = document.createElement('span');
            outer.className = 'wo';
            const inner = document.createElement('span');
            inner.className = 'w';
            inner.textContent = part;
            outer.append(inner);
            frag.append(outer);
          }
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
  };
  walk(el);
  el.dataset.split = '1';
  return $$('.w', el);
}

/* ---------------- animations ---------------- */
if (reduce) {
  document.documentElement.classList.add('reduced');
} else {
  // Hero intro
  const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
  if ($('.hero__title')) {
    intro
      .from('.hero__title .ch', { yPercent: 115, rotate: 8, duration: 1.1, stagger: 0.035 })
      .from('[data-hero-fade]', { y: 30, opacity: 0, duration: 0.9, stagger: 0.1 }, '-=0.8')
      .from('.hero__frame', { clipPath: 'inset(100% 0% 0% 0% round 48px)', duration: 1.3, ease: 'expo.out' }, 0.1)
      .from('.hero__photo', { scale: 1.3, duration: 1.6, ease: 'expo.out' }, 0.1)
      .from('.hero__visual .float, .hero__chip', { scale: 0, opacity: 0, duration: 0.9, stagger: 0.07, ease: 'back.out(2)' }, 0.6)
      .from('.hero__badge', { scale: 0, rotate: -180, duration: 1.2, ease: 'back.out(1.6)' }, 0.7)
      .from('.header', { y: -100, duration: 0.9 }, 0.2);
  } else {
    intro.from('[data-hero-fade]', { y: 30, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.3).from('.header', { y: -100, duration: 0.9 }, 0);
  }

  // Badge spins with scroll
  if ($('.hero__badge')) {
    gsap.to('.hero__badge', { rotate: 360, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
    gsap.to('.hero__visual', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }

  // Line-by-line headings
  $$('.reveal-lines').forEach((el) => {
    const words = splitWords(el);
    gsap.from(words, {
      yPercent: 110,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.04,
      delay: el.hasAttribute('data-instant') ? 0.2 : 0,
      scrollTrigger: el.hasAttribute('data-instant') ? undefined : { trigger: el, start: 'top 88%' },
    });
  });

  // Generic reveal
  ScrollTrigger.batch('.reveal', {
    start: 'top 90%',
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.08, overwrite: true }),
  });

  // Scrubbed word highlight
  $$('.scrub-words').forEach((el) => {
    const words = splitWords(el);
    gsap.fromTo(
      words,
      { opacity: 0.15 },
      { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } }
    );
  });

  // Parallax images
  $$('.parallax img').forEach((img) =>
    gsap.fromTo(img, { yPercent: -8, scale: 1.15 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, scrub: true } })
  );

  // Marquee speed follows scroll velocity
  const track = $('.marquee__track');
  if (track) {
    const loop = gsap.to(track, { xPercent: -50, ease: 'none', duration: 30, repeat: -1 });
    ScrollTrigger.create({
      onUpdate: (self) => {
        const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 300);
        gsap.to(loop, { timeScale: (self.direction || 1) * Math.max(1, Math.abs(v)), duration: 0.3, overwrite: true });
        gsap.to(loop, { timeScale: self.direction || 1, duration: 1.2, delay: 0.3 });
      },
    });
  }

  // Count-up numbers
  $$('[data-count]').forEach((el) => {
    const end = +el.dataset.count;
    const obj = { v: 0 };
    el.textContent = '0';
    gsap.to(obj, {
      v: end,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: () => (el.textContent = Math.round(obj.v)),
    });
  });

  // Horizontal gallery (desktop), native swipe on mobile
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    const pin = $('.gallery__pin');
    const g = $('.gallery__track');
    if (!pin || !g) return;
    const dist = () => g.scrollWidth - innerWidth + 48;
    gsap.to(g, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: { trigger: pin, start: 'center center', end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true },
    });
  });

  // Mouse parallax for floating decor
  if (finePointer) {
    const floats = $$('[data-depth]');
    window.addEventListener('pointermove', (e) => {
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      floats.forEach((f) => gsap.to(f, { x: x * 60 * f.dataset.depth, y: y * 60 * f.dataset.depth, duration: 1.2, ease: 'power3.out' }));
    });

    // Magnetic buttons
    $$('[data-magnetic]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4 });
      });
      el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' }));
    });

    // Tilt cards
    $$('[data-tilt]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          rotateY: ((e.clientX - r.left) / r.width - 0.5) * 8,
          rotateX: -((e.clientY - r.top) / r.height - 0.5) * 8,
          transformPerspective: 900,
          duration: 0.5,
        });
      });
      el.addEventListener('pointerleave', () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power3.out' }));
    });

    // Experience hover preview follows the cursor
    const preview = $('.exp__preview');
    if (preview) {
      const pimg = $('img', preview);
      const xTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' });
      const yTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' });
      $$('.exp__item').forEach((item) => {
        item.addEventListener('pointerenter', () => {
          pimg.src = item.dataset.preview;
          preview.classList.add('is-visible');
        });
        item.addEventListener('pointerleave', () => preview.classList.remove('is-visible'));
      });
      window.addEventListener('pointermove', (e) => {
        xTo(e.clientX + 24);
        yTo(e.clientY - 120);
      });
    }
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
}

/* ---------------- dialogs (popups) ---------------- */
function openDialog(d) {
  d.showModal();
  lenis?.stop();
  document.documentElement.classList.add('modal-open');
  if (!reduce) {
    gsap.fromTo(d, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    const box = $('.modal__box', d) || $('img', d);
    gsap.fromTo(box, { y: 60, scale: 0.94, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'expo.out' });
    const kids = $$('.modal__content > *', d);
    if (kids.length) gsap.from(kids, { y: 20, opacity: 0, stagger: 0.05, duration: 0.6, delay: 0.15, ease: 'power3.out' });
  }
}
function closeDialog(d) {
  const done = () => {
    d.close();
    lenis?.start();
    document.documentElement.classList.remove('modal-open');
  };
  if (reduce) return done();
  gsap.to(d, { opacity: 0, duration: 0.25, onComplete: done });
}
$$('dialog').forEach((d) => {
  d.addEventListener('click', (e) => {
    if (e.target === d || e.target.closest('[data-close]')) closeDialog(d);
  });
  d.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeDialog(d);
  });
});

const expModal = $('[data-exp-modal]');
$$('[data-modal-open]').forEach((btn) =>
  btn.addEventListener('click', () => {
    const tpl = document.getElementById(btn.dataset.modalOpen);
    const body = $('[data-exp-body]', expModal);
    body.replaceChildren(tpl.content.cloneNode(true));
    openDialog(expModal);
  })
);

const lightbox = $('[data-lightbox]');
$$('[data-lightbox-open]').forEach((btn) =>
  btn.addEventListener('click', () => {
    const img = $('[data-lightbox-img]', lightbox);
    img.src = btn.dataset.lightboxOpen;
    img.alt = $('img', btn)?.alt || '';
    openDialog(lightbox);
  })
);

/* ---------------- contact form ---------------- */
const statusModal = $('[data-status-modal]');
function showStatus(ok) {
  const title = $('[data-status-title]', statusModal);
  const text = $('[data-status-text]', statusModal);
  title.textContent = ok ? title.dataset.ok : title.dataset.err;
  text.textContent = ok ? text.dataset.ok : text.dataset.err;
  $('[data-status-icon]', statusModal).className = `status__icon ${ok ? 'is-ok' : 'is-err'}`;
  openDialog(statusModal);
}
$$('[data-form]').forEach((form) =>
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      form.querySelector(':invalid')?.focus();
      return;
    }
    const btn = $('button[type=submit]', form);
    const label = $('span', btn);
    const original = label.textContent;
    label.textContent = btn.dataset.sending;
    btn.disabled = true;
    try {
      const data = Object.fromEntries(new FormData(form));
      if (data._honey) throw new Error('spam');
      const res = await fetch(form.dataset.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _template: 'table', _captcha: 'false', page: location.href }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      form.classList.remove('was-validated');
      showStatus(true);
    } catch {
      showStatus(false);
    } finally {
      label.textContent = original;
      btn.disabled = false;
    }
  })
);
