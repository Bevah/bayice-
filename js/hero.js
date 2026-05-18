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

  gsap.set('#hero .hero__cta', { opacity: 1, visibility: 'visible' });

  const tl = gsap.timeline({ delay: 0.2 });
  tl.from('.hero__h1', { y: 48, opacity: 0, duration: 0.9, ease: 'power3.out' });
  tl.from('.hero__sub', { y: 16, opacity: 0, duration: 0.55, ease: 'power2.out' }, '-=0.45');
  tl.from(
    '#hero .hero__cta',
    { y: 18, opacity: 0, scale: 0.92, duration: 0.55, ease: 'back.out(1.6)' },
    '-=0.35'
  );
  tl.from('.hero__badge', { y: 20, opacity: 0, duration: 0.55, ease: 'power2.out' }, '-=0.25');
  tl.from(
    '.hero__badge-thumb img',
    { scale: 0.85, opacity: 0, duration: 0.6, ease: 'power2.out' },
    '-=0.4'
  );
})();
