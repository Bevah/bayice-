/* Scroll reveals + parallax */
(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.js-reveal:not(.stack-panel--cover)').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.75,
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
      width: 80,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  document.querySelectorAll('.watch-grid').forEach((grid) => {
    const cards = grid.querySelectorAll('.watch-card');
    gsap.from(cards, {
      opacity: 0,
      y: 32,
      scale: 0.96,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: grid, start: 'top 88%' },
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

  const checkoutInner = document.querySelector('.checkout__inner');
  if (checkoutInner) {
    gsap.from(checkoutInner.children, {
      opacity: 0,
      y: 16,
      duration: 0.55,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: { trigger: checkoutInner, start: 'top 90%' },
    });
  }

  const featured = document.getElementById('featured');
  const featuredCover = document.querySelector('.featured__cover');

  if (featured && featuredCover) {
    gsap.from(featuredCover, {
      yPercent: 14,
      opacity: 0.7,
      ease: 'none',
      scrollTrigger: {
        trigger: featured,
        start: 'top bottom',
        end: 'top top',
        scrub: 0.6,
      },
    });
  }

  const featuredImg = document.getElementById('featuredWatchImg');
  if (featuredImg) {
    gsap.from(featuredImg, {
      scale: 0.92,
      opacity: 0,
      y: 24,
      duration: 0.75,
      ease: 'power2.out',
      scrollTrigger: { trigger: featuredImg, start: 'top 80%' },
    });
  }

  const checkoutSection = document.getElementById('checkout');
  if (checkoutSection && checkoutInner) {
    gsap.from(checkoutInner, {
      yPercent: 10,
      opacity: 0.9,
      ease: 'none',
      scrollTrigger: {
        trigger: checkoutSection,
        start: 'top bottom',
        end: 'top top',
        scrub: 0.5,
      },
    });
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
