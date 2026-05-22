/* Hero: autoplay background video + entrance (mockup layout) */
(function () {
  'use strict';

  const bgVideo = document.getElementById('heroBgVideo');
  const nav = document.getElementById('mainNav');
  const burger = document.getElementById('navBurger');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('nav--open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav--open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!nav) return;
      nav.classList.toggle('nav--scrolled', window.scrollY > 48);
    },
    { passive: true }
  );

  function playHeroVideo() {
    if (!bgVideo) return;
    bgVideo.muted = true;
    const playAttempt = bgVideo.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {
        document.addEventListener(
          'touchstart',
          () => bgVideo.play(),
          { once: true, passive: true }
        );
      });
    }
  }

  if (bgVideo) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      bgVideo.pause();
      bgVideo.removeAttribute('autoplay');
    } else {
      if (bgVideo.readyState >= 2) playHeroVideo();
      else bgVideo.addEventListener('canplay', playHeroVideo, { once: true });
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && bgVideo.paused) playHeroVideo();
      });
    }
  }

  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline({ delay: 0.15 });
  tl.from('.hero__h1', { y: 40, opacity: 0, duration: 0.75, ease: 'power3.out' });
  tl.from('.hero__sub', { y: 14, opacity: 0, duration: 0.45, ease: 'power2.out' }, '-=0.35');
  tl.from(
    '#hero .hero__cta',
    { y: 16, opacity: 0, scale: 0.95, duration: 0.45, ease: 'power2.out' },
    '-=0.3'
  );
  tl.from('.hero__badge', { y: 16, opacity: 0, duration: 0.45, ease: 'power2.out' }, '-=0.2');
  tl.from(
    '.hero__badge-thumb img',
    { scale: 0.9, opacity: 0, duration: 0.5, ease: 'power2.out' },
    '-=0.3'
  );
})();
