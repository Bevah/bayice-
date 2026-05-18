/* Scroll reveals + parallax */
(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.js-reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });

  document.querySelectorAll('.col-title').forEach((el) => {
    gsap.from(el, {
      x: -20,
      opacity: 0,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });

    const line = document.createElement('div');
    line.style.cssText =
      'height:2px;background:linear-gradient(90deg,rgba(255,255,255,0.5),transparent);width:0;margin-top:8px;border-radius:1px;';
    el.insertAdjacentElement('afterend', line);

    gsap.to(line, {
      width: 56,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  document.querySelectorAll('.watch-grid').forEach((grid) => {
    const cards = grid.querySelectorAll('.watch-card');
    gsap.from(cards, {
      opacity: 0,
      y: 48,
      scale: 0.94,
      rotateX: 8,
      transformOrigin: '50% 100%',
      duration: 0.75,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: grid, start: 'top 86%' },
    });
    cards.forEach((card) => {
      const img = card.querySelector('.watch-card__img-box img');
      if (!img) return;
      gsap.from(img, {
        scale: 0.88,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 88%' },
      });
    });
  });

  const meta = document.querySelector('.featured__meta');
  if (meta) {
    gsap.from(Array.from(meta.children), {
      opacity: 0,
      x: -20,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: meta, start: 'top 82%' },
    });
  }

  const stage = document.getElementById('featuredStage');
  if (stage) {
    gsap.from(stage, {
      opacity: 0,
      scale: 0.96,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: stage, start: 'top 82%' },
    });
  }

  const checkout = document.querySelector('.checkout__inner');
  if (checkout) {
    gsap.from(checkout.children, {
      opacity: 0,
      y: 16,
      duration: 0.55,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: { trigger: checkout, start: 'top 90%' },
    });
  }

  const footer = document.querySelector('.footer');
  if (footer) {
    gsap.from('.footer__brand', {
      opacity: 0,
      y: 14,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: { trigger: footer, start: 'top 92%' },
    });
    gsap.from('.footer__tagline, .footer__links, .footer__copy', {
      opacity: 0,
      y: 10,
      stagger: 0.07,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: footer, start: 'top 90%' },
    });
  }

  document.querySelectorAll('.watch-card__img-box img').forEach((img) => {
    gsap.to(img, {
      y: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: img.closest('.watch-card'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
