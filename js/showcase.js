/* Watch showcase interaction - click to view featured, 3D rotation */
(function () {
  'use strict';

  // Watch catalog with all their views and color themes
  const watchCatalog = {
    'halo-green': {
      name: 'Gold and Green Dial',
      line: 'HALO',
      color: 'rgba(46, 204, 113, 0.2)',
      accentColor: '#2ecc71',
      views: {
        front: 'assets/watches/opt/halo-golden-green.png',
      }
    },
    'halo-purple': {
      name: 'Silver and Pink Dial',
      line: 'HALO',
      color: 'rgba(155, 89, 182, 0.2)',
      accentColor: '#9b59b6',
      views: {
        front: 'assets/watches/opt/halo-silver-pink.png',
      }
    },
    'halo-blue': {
      name: 'Silver and Blue Dial',
      line: 'HALO',
      color: 'rgba(52, 152, 219, 0.2)',
      accentColor: '#3498db',
      views: {
        front: 'assets/watches/opt/halo-silver-blue.png',
      }
    },
    'skylight-gold': {
      name: 'Gold Diamond Bezel',
      line: 'SKYLIGHT',
      color: 'rgba(241, 196, 15, 0.2)',
      accentColor: '#f1c40f',
      views: {
        front: 'assets/watches/opt/skylight-gold-front.png',
        angle: 'assets/watches/opt/skylight-gold-angle.png',
        back: 'assets/watches/opt/skylight-gold-back.png',
      }
    },
    'skylight-blue': {
      name: 'Silver and Blue Dial',
      line: 'SKYLIGHT',
      color: 'rgba(52, 152, 219, 0.2)',
      accentColor: '#3498db',
      views: {
        front: 'assets/watches/opt/skylight-silver-blue-front.png',
        side: 'assets/watches/opt/skylight-silver-blue-side.png',
      }
    },
    'skylight-silver': {
      name: 'VVS Bezel Bussdown',
      line: 'SKYLIGHT',
      color: 'rgba(189, 195, 199, 0.2)',
      accentColor: '#bdc3c7',
      views: {
        front: 'assets/watches/opt/halo-gold-green-angle.png',
      }
    }
  };

  // Map cards to catalog keys
  const cardToCatalog = {
    0: { index: 0, catalogKey: 'halo-green' },  // HALO green
    1: { index: 1, catalogKey: 'halo-purple' }, // HALO purple
    2: { index: 2, catalogKey: 'halo-blue' },   // HALO blue
    3: { index: 3, catalogKey: 'skylight-gold' }, // SKYLIGHT gold
    4: { index: 4, catalogKey: 'skylight-blue' }, // SKYLIGHT blue (spotlight)
    5: { index: 5, catalogKey: 'skylight-silver' } // SKYLIGHT silver
  };

  const img = document.getElementById('featuredWatchImg');
  const bars = Array.from(document.querySelectorAll('#featBars .feat__bar[data-view]'));
  const featuredName = document.querySelector('.featured__name');
  const featuredSize = document.querySelector('.featured__size');
  const featuredLabel = document.querySelector('.feat__dial-label');
  const tapTarget = document.getElementById('tapTarget');
  const featured = document.getElementById('featured');
  const featuredStage = document.getElementById('featuredStage');

  let currentWatch = 'skylight-blue';
  let currentView = 'front';

  function updateBackgroundGradient(watch) {
    if (!featured) return;

    gsap.to(featured, {
      background: `radial-gradient(ellipse 100% 60% at 50% 50%, ${watch.color}, transparent 100%)`,
      duration: 0.8,
      ease: 'power2.inOut'
    });
  }

  function updateFeaturedWatch(catalogKey) {
    if (!watchCatalog[catalogKey]) return;

    const watch = watchCatalog[catalogKey];
    currentWatch = catalogKey;
    currentView = 'front';

    // Update product line and size
    if (featuredName) featuredName.textContent = watch.line;
    if (featuredSize) featuredSize.textContent = '26mm';
    if (featuredLabel) featuredLabel.textContent = watch.name;

    // Update background color with smooth transition
    updateBackgroundGradient(watch);

    // Update bars and filter by available views
    bars.forEach((bar) => {
      const viewKey = bar.dataset.view;
      if (watch.views[viewKey]) {
        bar.classList.remove('feat__bar--hidden');
        bar.disabled = false;
      } else {
        bar.classList.add('feat__bar--hidden');
        bar.disabled = true;
      }
      bar.classList.toggle('feat__bar--active', viewKey === 'front');
      bar.setAttribute('aria-selected', viewKey === 'front' ? 'true' : 'false');
    });

    // Animate image change with scale and rotation
    if (img && watch.views.front) {
      gsap.to(img, {
        opacity: 0,
        scale: 0.8,
        rotationY: -15,
        rotationX: 5,
        duration: 0.4,
        ease: 'power2.in',
        onComplete() {
          img.src = watch.views.front;
          img.alt = `${watch.line} ${watch.name}`;
          gsap.to(img, {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 0.6,
            ease: 'back.out(1.5)'
          });
        }
      });
    }

    // Scroll to featured section with smooth animation
    if (featured) {
      gsap.to(window, {
        scrollTo: {
          y: featured,
          autoKill: false,
          offsetY: window.innerHeight * 0.2
        },
        duration: 0.8,
        ease: 'power2.inOut'
      });
    }
  }

  function setView(view, animate) {
    const watch = watchCatalog[currentWatch];
    if (!watch || !watch.views[view] || !img || view === currentView) return;

    currentView = view;
    bars.forEach((bar) => {
      const on = bar.dataset.view === view;
      bar.classList.toggle('feat__bar--active', on);
      bar.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    const apply = () => {
      img.src = watch.views[view];
      img.alt = `${watch.line} ${watch.name} ${view} view`;
    };

    if (!animate || typeof gsap === 'undefined') {
      apply();
      return;
    }

    gsap.to(img, {
      opacity: 0,
      scale: 0.85,
      rotationY: -20,
      rotationX: 5,
      duration: 0.35,
      ease: 'power2.in',
      onComplete() {
        apply();
        gsap.to(img, {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: 'back.out(1.3)'
        });
      },
    });
  }

  // 3D rotation on hover with advanced effects
  function add3DRotation() {
    if (!tapTarget || typeof gsap === 'undefined') return;

    let isRotating = false;
    let mouseX = 0;
    let mouseY = 0;

    tapTarget.addEventListener('mouseenter', () => {
      isRotating = true;
      gsap.to(img, {
        rotationY: 8,
        rotationX: -3,
        duration: 0.6,
        ease: 'power2.out'
      });
    });

    tapTarget.addEventListener('mousemove', (e) => {
      if (!isRotating) return;
      
      const rect = tapTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const rotY = ((x / rect.width) * 25) - 12.5;
      const rotX = ((y / rect.height) * -20) + 10;
      
      gsap.to(img, {
        rotationY: rotY,
        rotationX: rotX,
        duration: 0.15,
        ease: 'power1.out'
      });

      // Subtle scale pulse on mouse move
      gsap.to(img, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });

    tapTarget.addEventListener('mouseleave', () => {
      isRotating = false;
      gsap.to(img, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.inOut'
      });
    });
  }

  // Add click listeners to watch cards
  const watchCards = Array.from(document.querySelectorAll('.watch-card.js-card'));
  watchCards.forEach((card, index) => {
    if (cardToCatalog[index]) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        updateFeaturedWatch(cardToCatalog[index].catalogKey);
      });
    }
  });

  // View switching buttons
  bars.forEach((bar) => {
    bar.addEventListener('click', () => {
      if (!bar.classList.contains('feat__bar--hidden')) {
        setView(bar.dataset.view, true);
      }
    });
  });

  // Touch swipe for view changes
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
        const watch = watchCatalog[currentWatch];
        const viewKeys = Object.keys(watch.views);
        const currentIdx = viewKeys.indexOf(currentView);

        const dx = e.changedTouches[0].clientX - tx;
        if (Math.abs(dx) > 44) {
          if (dx < 0 && currentIdx < viewKeys.length - 1) {
            setView(viewKeys[currentIdx + 1], true);
          }
          if (dx > 0 && currentIdx > 0) {
            setView(viewKeys[currentIdx - 1], true);
          }
        }
      },
      { passive: true }
    );
  }

  // Initialize 3D rotation
  add3DRotation();
})();
