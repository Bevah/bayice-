/* Featured slider + checkout interactions */
(function () {
  'use strict';

  const slides = Array.from(document.querySelectorAll('.slide'));
  const bars = Array.from(document.querySelectorAll('.feat__bar'));
  const tapTarget = document.getElementById('tapTarget');
  const qtyUp = document.getElementById('qtyUp');
  const qtyDown = document.getElementById('qtyDown');
  const qtyNum = document.getElementById('qtyNum');
  const cartBtn = document.getElementById('cartBtn');
  const checkout = document.getElementById('checkout');

  if (!slides.length) return;

  let current = 0;
  let busy = false;
  let qty = 1;

  function setBarsActive(idx) {
    bars.forEach((b, i) => {
      const on = i === idx;
      b.classList.toggle('feat__bar--active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  function goTo(idx, instant) {
    if (idx < 0 || idx >= slides.length || idx === current) return;

    if (instant) {
      slides.forEach((s, i) => {
        s.classList.toggle('slide--on', i === idx);
        s.classList.remove('slide--out');
      });
      current = idx;
      setBarsActive(current);
      return;
    }

    if (busy) return;
    busy = true;
    const prev = current;
    current = idx;

    slides[prev].classList.remove('slide--on');
    slides[prev].classList.add('slide--out');
    slides[current].classList.add('slide--on');
    setBarsActive(current);

    setTimeout(() => {
      slides[prev].classList.remove('slide--out');
      busy = false;
    }, 520);
  }

  bars.forEach((bar) => {
    bar.addEventListener('click', () => goTo(+bar.dataset.to, false));
  });

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const featured = document.getElementById('featured');
    if (featured) {
      ScrollTrigger.create({
        trigger: featured,
        start: 'top top',
        end: '+=180%',
        pin: true,
        scrub: 1,
        onUpdate(self) {
          const target = Math.min(
            slides.length - 1,
            Math.floor(self.progress * slides.length)
          );
          if (target !== current) goTo(target, true);
        },
      });
    }
  }

  const stage = document.getElementById('featured');
  if (stage) {
    let tx = 0;
    let ty = 0;
    stage.addEventListener(
      'touchstart',
      (e) => {
        tx = e.touches[0].clientX;
        ty = e.touches[0].clientY;
      },
      { passive: true }
    );
    stage.addEventListener(
      'touchend',
      (e) => {
        const dx = e.changedTouches[0].clientX - tx;
        const dy = Math.abs(e.changedTouches[0].clientY - ty);
        if (Math.abs(dx) > 44 && dy < 70) {
          if (dx < 0 && current < slides.length - 1) goTo(current + 1);
          if (dx > 0 && current > 0) goTo(current - 1);
        }
      },
      { passive: true }
    );
  }

  function scrollToCheckout() {
    if (!checkout) return;
    checkout.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (tapTarget) {
    tapTarget.addEventListener('click', scrollToCheckout);
    tapTarget.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToCheckout();
      }
    });
  }

  function setQty(n) {
    qty = Math.max(1, Math.min(n, 99));
    if (qtyNum) qtyNum.textContent = qty;
    if (typeof gsap !== 'undefined' && qtyNum) {
      gsap.fromTo(
        qtyNum,
        { scale: 1.35, color: '#3498db' },
        { scale: 1, color: '#111', duration: 0.22, ease: 'back.out(2)' }
      );
    }
  }

  if (qtyUp) qtyUp.addEventListener('click', () => setQty(qty + 1));
  if (qtyDown) qtyDown.addEventListener('click', () => setQty(qty - 1));

  if (cartBtn) {
    const cartHTML = cartBtn.innerHTML;
    cartBtn.addEventListener('click', () => {
      cartBtn.textContent = '✓ Added to cart';
      cartBtn.style.borderColor = '#3498db';
      cartBtn.style.color = '#3498db';
      setTimeout(() => {
        cartBtn.innerHTML = cartHTML;
        cartBtn.style.borderColor = '';
        cartBtn.style.color = '';
      }, 2200);
    });
  }
})();
