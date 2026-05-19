/* Featured watch views + checkout (WebP only) */
(function () {
  'use strict';

  const views = {
    front: 'assets/watches/opt/skylight-silver-blue-front.png',
    side: 'assets/watches/opt/skylight-silver-blue-side.png',
  };

  const img = document.getElementById('featuredWatchImg');
  const bars = Array.from(document.querySelectorAll('#featBars .feat__bar[data-view]'));
  const tapTarget = document.getElementById('tapTarget');
  const qtyUp = document.getElementById('qtyUp');
  const qtyDown = document.getElementById('qtyDown');
  const qtyNum = document.getElementById('qtyNum');
  const cartBtn = document.getElementById('cartBtn');
  const checkout = document.getElementById('checkout');

  let currentView = 'front';

  function setBarActive(view) {
    bars.forEach((bar) => {
      const on = bar.dataset.view === view;
      bar.classList.toggle('feat__bar--active', on);
      bar.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  function setView(view, animate) {
    if (!views[view] || !img || view === currentView) return;
    currentView = view;
    setBarActive(view);

    const apply = () => {
      img.src = views[view];
      img.alt =
        view === 'side'
          ? 'Bay Ice Skylight silver-blue dial side view'
          : 'Bay Ice Skylight silver-blue dial 26mm';
    };

    if (!animate || typeof gsap === 'undefined') {
      apply();
      return;
    }

    gsap.to(img, {
      opacity: 0,
      scale: 0.96,
      duration: 0.22,
      ease: 'power2.in',
      onComplete() {
        apply();
        gsap.to(img, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
      },
    });
  }

  bars.forEach((bar) => {
    bar.addEventListener('click', () => setView(bar.dataset.view, true));
  });

  const stage = document.getElementById('featuredStage');
  if (stage) {
    let tx = 0;
    stage.addEventListener(
      'touchstart',
      (e) => {
        tx = e.touches[0].clientX;
      },
      { passive: true }
    );
    stage.addEventListener(
      'touchend',
      (e) => {
        const dx = e.changedTouches[0].clientX - tx;
        if (Math.abs(dx) > 44) {
          if (dx < 0 && currentView === 'front') setView('side', true);
          if (dx > 0 && currentView === 'side') setView('front', true);
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
    const qty = Math.max(1, Math.min(n, 99));
    if (qtyNum) qtyNum.textContent = qty;
    if (typeof gsap !== 'undefined' && qtyNum) {
      gsap.fromTo(
        qtyNum,
        { scale: 1.35, color: '#3498db' },
        { scale: 1, color: '#111', duration: 0.22, ease: 'back.out(2)' }
      );
    }
  }

  if (qtyUp) qtyUp.addEventListener('click', () => setQty(+qtyNum.textContent + 1));
  if (qtyDown) qtyDown.addEventListener('click', () => setQty(+qtyNum.textContent - 1));

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
