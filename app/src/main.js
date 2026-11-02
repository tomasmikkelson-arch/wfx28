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
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
const scrollTo = (target) => {
  if (lenis) lenis.scrollTo(target, { offset: -70, duration: 1.3 });
  else if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' });
  else target.scrollIntoView({ behavior: 'smooth' });
};

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href]');
  if (!a || a.hasAttribute('data-popup-open') || a.hasAttribute('data-lang-link')) return;
  const url = new URL(a.href, location.href);
  if (url.pathname === location.pathname && url.hash) {
    const el = url.hash === '#top' ? 0 : $(url.hash);
    if (el === null) return;
    e.preventDefault();
    closeMenu();
    scrollTo(el);
    history.replaceState(null, '', url.hash === '#top' ? location.pathname : url.hash);
  }
});
if (location.hash && $(location.hash)) window.addEventListener('load', () => setTimeout(() => scrollTo($(location.hash)), 200));

/* language switch keeps your place */
$$('[data-lang-link]').forEach((a) =>
  a.addEventListener('click', () => {
    try {
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

/* ---------------- header, progress, to-top, menu ---------------- */
const header = $('[data-header]');
const progress = $('.progress span');
const toTop = $('[data-top]');
const onScroll = () => {
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 20);
  toTop?.classList.toggle('is-visible', y > 600);
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
  setTimeout(() => (menu.hidden = true), 500);
}
burger?.addEventListener('click', () => {
  if (document.body.classList.contains('menu-open')) return closeMenu();
  menu.hidden = false;
  requestAnimationFrame(() => document.body.classList.add('menu-open'));
  burger.setAttribute('aria-expanded', 'true');
  lenis?.stop();
  if (!reduce) gsap.from('.menu__nav a', { y: 50, opacity: 0, stagger: 0.07, duration: 0.7, ease: 'power3.out', delay: 0.2 });
});
document.addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());

/* obfuscated email */
$$('.js-email').forEach((a) => {
  const mail = `${a.dataset.u}@${a.dataset.d}`;
  a.href = `mailto:${mail}`;
  a.textContent = mail;
});

/* ---------------- helpers ---------------- */
function splitWords(el) {
  if (el.dataset.split) return $$('.w', el);
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.append(part);
          const o = document.createElement('span');
          o.className = 'wo';
          const i = document.createElement('span');
          i.className = 'w';
          i.textContent = part;
          o.append(i);
          frag.append(o);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
  };
  walk(el);
  el.dataset.split = '1';
  return $$('.w', el);
}
function splitChars(el) {
  const text = el.textContent;
  el.textContent = '';
  [...text].forEach((c) => {
    const s = document.createElement('span');
    s.className = 'ch';
    s.textContent = c === ' ' ? ' ' : c;
    el.append(s);
  });
  return $$('.ch', el);
}

/* ---------------- animations ---------------- */
if (reduce) {
  document.documentElement.classList.add('reduced');
} else {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.from('.header', { y: -100, duration: 0.9 }, 0);

  if ($('.hero__title')) {
    const chars = [...splitChars($('.hero__first')), ...splitChars($('.hero__last'))];
    tl.from('[data-hero-photo]', { y: 80, scale: 0.85, opacity: 0, duration: 1.4, ease: 'expo.out' }, 0.1)
      .from('.hero__bg', { opacity: 0, scale: 1.1, duration: 1.6, ease: 'power2.out' }, 0)
      .from(chars, { yPercent: 110, duration: 1.1, stagger: 0.04 }, 0.45)
      .from('.hero__role', { y: 20, opacity: 0, duration: 0.8 }, 0.9)
      .from('.hero__write', { scale: 0, opacity: 0, duration: 0.9, ease: 'back.out(2)' }, 1)
      .from('.hero__ring', { scale: 0, rotate: -120, opacity: 0, duration: 1, ease: 'back.out(1.7)' }, 0.8)
      .from('.hero__line', { scaleY: 0, duration: 1 }, 0.6)
      .from('.hero__follow a, .hero__follow-text', { x: -20, opacity: 0, stagger: 0.1, duration: 0.7 }, 0.9)
      .from('.hero__frame', { scaleX: 0.6, opacity: 0, duration: 1.2, ease: 'expo.out' }, 1);

    // Photo gently shrinks/lifts while you scroll away
    gsap.to('.hero__stage', { y: -60, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero__name', { yPercent: -30, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  } else {
    tl.from('[data-hero-fade]', { y: 30, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.5);
  }

  // Parallax backgrounds
  $$('[data-parallax]').forEach((el) => {
    const k = +el.dataset.parallax;
    gsap.fromTo(el, { yPercent: -k * 30 }, { yPercent: k * 30, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // Headings word by word
  $$('.reveal-lines').forEach((el) => {
    const w = splitWords(el);
    gsap.from(w, {
      yPercent: 110,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.05,
      delay: el.hasAttribute('data-instant') ? 0.3 : 0,
      scrollTrigger: el.hasAttribute('data-instant') ? undefined : { trigger: el, start: 'top 88%' },
    });
  });

  // Dashed dividers draw in
  $$('.dashed').forEach((el) => gsap.from(el, { scaleX: 0, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));

  // Fade-up text
  ScrollTrigger.batch('.reveal', {
    start: 'top 92%',
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.07, overwrite: true }),
    onLeave: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.3, overwrite: true }),
  });

  // Images open up like a mask
  $$('.reveal-img').forEach((el) => {
    const im = $('img', el);
    const t = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%' } });
    t.to(el, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.3, ease: 'expo.out' }).to(im, { scale: 1, duration: 1.6, ease: 'expo.out' }, 0);
  });

  // Stats: count up + rule draws
  $$('[data-count]').forEach((el) => {
    const end = +el.dataset.count;
    const o = { v: 0 };
    el.textContent = '0';
    gsap.to(o, { v: end, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%' }, onUpdate: () => (el.textContent = Math.round(o.v)) });
  });
  $$('.stat__rule').forEach((el) => gsap.from(el, { scaleX: 0, duration: 1.2, ease: 'power3.out', delay: 0.3, scrollTrigger: { trigger: el, start: 'top 90%' } }));

  // Purple band marquee reacts to scroll speed
  const track = $('.band__track');
  if (track) {
    const loop = gsap.to(track, { xPercent: -50, ease: 'none', duration: 40, repeat: -1 });
    ScrollTrigger.create({
      onUpdate: (self) => {
        const v = gsap.utils.clamp(1, 6, Math.abs(self.getVelocity() / 250));
        gsap.to(loop, { timeScale: (self.direction || 1) * v, duration: 0.3, overwrite: true });
        gsap.to(loop, { timeScale: self.direction || 1, duration: 1.4, delay: 0.3 });
      },
    });
  }

  // Timeline: progress line fills and dots light up
  const tlEl = $('[data-timeline]');
  if (tlEl) {
    gsap.to('.tl__progress', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tlEl, start: 'top 60%', end: 'bottom 60%', scrub: true } });
    $$('.tl__item').forEach((item) =>
      ScrollTrigger.create({ trigger: item, start: 'top 62%', onEnter: () => item.classList.add('is-active'), onLeaveBack: () => item.classList.remove('is-active') })
    );
  }

  // Dinosaur walks in
  if ($('.dino')) {
    gsap.fromTo('.dino__img', { xPercent: -16 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.dino', start: 'top bottom', end: 'center center', scrub: 1 } });
    gsap.from('.dino__pill', { scale: 0, rotate: -12, duration: 1, ease: 'back.out(2)', scrollTrigger: { trigger: '.dino', start: 'top 55%' } });
    gsap.from('.dino__badge', { scale: 0, duration: 1, ease: 'back.out(2)', scrollTrigger: { trigger: '.dino', start: 'top 55%' } });
    gsap.from('.dino .round-btn', { x: 40, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.dino', start: 'top 60%' } });
  }

  if (finePointer) {
    $$('[data-magnetic]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.2, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4 });
      });
      el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' }));
    });
    $$('[data-tilt]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { rotateY: ((e.clientX - r.left) / r.width - 0.5) * 10, rotateX: -((e.clientY - r.top) / r.height - 0.5) * 10, transformPerspective: 800, duration: 0.5 });
      });
      el.addEventListener('pointerleave', () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power3.out' }));
    });
    // Hero photo follows the mouse a little
    const photo = $('.hero__pic img');
    if (photo) {
      window.addEventListener('pointermove', (e) => {
        gsap.to(photo, { x: (e.clientX / innerWidth - 0.5) * 18, y: (e.clientY / innerHeight - 0.5) * 12, duration: 1.2, ease: 'power3.out' });
      });
    }
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
}

/* ---------------- popups ---------------- */
function openDialog(d) {
  if (d.open) return;
  $$('dialog[open]').forEach((o) => o !== d && !o.matches('[data-status-modal]') && o.close());
  d.showModal();
  lenis?.stop();
  document.documentElement.classList.add('modal-open');
  if (!reduce) {
    gsap.fromTo(d, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    const frame = $('.popup__frame', d) || $('.popup__card', d);
    gsap.fromTo(frame, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' });
    const card = $('.popup__card', frame);
    if (card && card !== frame) gsap.fromTo(card, { y: 60, scale: 0.96 }, { y: 0, scale: 1, duration: 0.9, delay: 0.1, ease: 'expo.out' });
  }
  d.scrollTop = 0;
}
function closeDialog(d) {
  const done = () => {
    d.close();
    if (!$('dialog[open]')) {
      lenis?.start();
      document.documentElement.classList.remove('modal-open');
    }
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
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-popup-open]');
  if (!t) return;
  const d = document.getElementById(`popup-${t.dataset.popupOpen}`);
  if (!d) return;
  e.preventDefault();
  closeMenu();
  openDialog(d);
});

/* ---------------- forms ---------------- */
const statusModal = $('[data-status-modal]');
function showStatus(ok) {
  const title = $('[data-status-title]', statusModal);
  const text = $('[data-status-text]', statusModal);
  title.textContent = ok ? title.dataset.ok : title.dataset.err;
  text.textContent = ok ? text.dataset.ok : text.dataset.err;
  $('[data-status-icon]', statusModal).className = `status__icon ${ok ? 'is-ok' : 'is-err'}`;
  $$('dialog[open]').forEach((d) => d !== statusModal && d.close());
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

/* ---------------- YouTube: load the player only on click ---------------- */
$$('[data-video]').forEach((btn) =>
  btn.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.video}?autoplay=1&rel=0`;
    f.title = btn.getAttribute('aria-label') || 'YouTube video';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    f.allowFullscreen = true;
    btn.replaceWith(f);
  })
);
