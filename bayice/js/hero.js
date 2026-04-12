/* Hero entrance + parallax + mobile nav */
(function () {
  'use strict';

  const watchZone = document.getElementById('heroWatchZone');
  const heroImg = document.getElementById('heroWatchImg');
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
      if (window.scrollY > 48) nav.classList.add('nav--scrolled');
      else nav.classList.remove('nav--scrolled');
    },
    { passive: true }
  );

  if (typeof gsap === 'undefined') return;

  if (heroImg) {
    gsap.set(heroImg, { opacity: 0, scale: 0.92, rotate: -6, y: 24 });
    gsap.to(heroImg, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      duration: 1.35,
      ease: 'power3.out',
      delay: 0.15,
    });
    gsap.to(heroImg, {
      y: -8,
      duration: 3.2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1.5,
    });
  }

  const tl = gsap.timeline({ delay: 0.2 });
  tl.from('.hero__h1', {
    y: 48,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
  });
  tl.from(
    '.hero__sub',
    { y: 16, opacity: 0, duration: 0.55, ease: 'power2.out' },
    '-=0.45'
  );
  tl.from(
    '.btn--shop',
    { y: 14, opacity: 0, duration: 0.5, ease: 'power2.out' },
    '-=0.35'
  );
  tl.from(
    '.hero__badge',
    { y: 20, opacity: 0, duration: 0.55, ease: 'power2.out' },
    '-=0.3'
  );

  let mx = 0;
  let my = 0;
  let px = 0;
  let py = 0;

  document.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  document.addEventListener(
    'touchmove',
    (e) => {
      const t = e.touches[0];
      mx = (t.clientX / window.innerWidth - 0.5) * 2;
      my = (t.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  function parallaxTick() {
    requestAnimationFrame(parallaxTick);
    if (!watchZone) return;
    px += (mx * 12 - px) * 0.06;
    py += (my * 8 - py) * 0.06;
    watchZone.style.transform = `translate(${px}px, ${py}px)`;
  }
  parallaxTick();
})();
