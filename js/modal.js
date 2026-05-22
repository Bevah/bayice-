/* Watch showcase modal functionality — Performance Optimized */
(function () {
  'use strict';

  // Watch catalog with all their views and color themes
  const watchCatalog = {
    'halo-green': {
      name: 'Gold and Green Dial',
      line: 'HALO',
      price: '₦ 750,000.00',
      color: 'rgba(46, 204, 113, 0.2)',
      accentColor: '#2ecc71',
      views: {
        front: 'assets/watches/opt/halo-golden-green.png',
        angle: 'assets/watches/opt/halo-gold-green-angle.png',
      }
    },
    'halo-purple': {
      name: 'Silver and Pink Dial',
      line: 'HALO',
      price: '₦ 750,000.00',
      color: 'rgba(155, 89, 182, 0.2)',
      accentColor: '#9b59b6',
      views: {
        front: 'assets/watches/opt/halo-silver-pink.png',
      }
    },
    'halo-blue': {
      name: 'Silver and Blue Dial',
      line: 'HALO',
      price: '₦ 750,000.00',
      color: 'rgba(52, 152, 219, 0.2)',
      accentColor: '#3498db',
      views: {
        front: 'assets/watches/opt/halo-silver-blue.png',
      }
    },
    'skylight-gold': {
      name: 'Gold Diamond Bezel',
      line: 'SKYLIGHT',
      price: '₦ 1,250,000.00',
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
      price: '₦ 980,000.00',
      color: 'rgba(52, 152, 219, 0.2)',
      accentColor: '#3498db',
      views: {
        front: 'assets/watches/opt/skylight-silver-blue-front.png',
        side: 'assets/watches/opt/skylight-silver-blue-side.png',
      }
    },
    'skylight-vvs': {
      name: 'VVS Bezel Bussdown',
      line: 'SKYLIGHT',
      price: '₦ 1,550,000.00',
      color: 'rgba(255, 255, 255, 0.12)',
      accentColor: '#ffffff',
      views: {
        front: 'assets/watches/opt/skylight-vvs-bussdown.png',
      }
    }
  };

  // Map cards to catalog keys
  const cardToCatalog = {
    0: { index: 0, catalogKey: 'halo-green' },
    1: { index: 1, catalogKey: 'halo-purple' },
    2: { index: 2, catalogKey: 'halo-blue' },
    3: { index: 3, catalogKey: 'skylight-gold' },
    4: { index: 4, catalogKey: 'skylight-blue' },
    5: { index: 5, catalogKey: 'skylight-vvs' },
  };

  // Modal elements
  const modal = document.getElementById('watchModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalWatchImg = document.getElementById('modalWatchImg');
  const modalDialLabel = document.getElementById('modalDialLabel');
  const modalProductLine = document.getElementById('modalProductLine');
  const modalProductName = document.getElementById('modalProductName');
  const modalProductPrice = document.getElementById('modalProductPrice');
  const modalWatchStage = document.getElementById('modalWatchStage');
  const modalWatchGrid = document.getElementById('modalWatchGrid');
  const modalBars = Array.from(document.querySelectorAll('#modalFeatBars .modal__bar[data-view]'));

  let currentWatch = 'skylight-blue';
  let currentView = 'front';
  let isInitialized = false;

  // Image cache to prevent flickering
  const imageCache = {};

  // Preload images for a specific watch
  function preloadWatchImages(catalogKey) {
    const watch = watchCatalog[catalogKey];
    if (!watch) return;
    
    Object.values(watch.views).forEach(src => {
      if (!imageCache[src]) {
        const img = new Image();
        img.src = src;
        imageCache[src] = img;
      }
    });
  }

  // Function to open the modal
  function openModal() {
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  // Function to close the modal
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Update modal background color
  function updateModalBackgroundGradient(watch) {
    if (!modal) return;
    const modalContent = modal.querySelector('.modal__content');
    if (modalContent) {
      const baseColor = watch.color.replace(/[\d.]+\)$/, '0.08)');
      modalContent.style.setProperty('--modal-bg', `radial-gradient(circle at 50% 40%, ${baseColor}, #000 85%)`);
      modalContent.style.backgroundColor = '#000';
    }
  }

  // Update modal with watch details
  function updateModalWatch(catalogKey) {
    if (!watchCatalog[catalogKey]) return;

    const watch = watchCatalog[catalogKey];
    currentWatch = catalogKey;
    currentView = 'front';

    // Update product info (DOM optimized)
    if (modalProductLine) modalProductLine.textContent = watch.line;
    if (modalProductName) modalProductName.textContent = watch.name;
    if (modalProductPrice) modalProductPrice.textContent = watch.price;
    if (modalDialLabel) modalDialLabel.textContent = watch.name;

    // Preload views for this watch
    preloadWatchImages(catalogKey);

    // Update background
    updateModalBackgroundGradient(watch);

    // Filter view bars
    modalBars.forEach((bar) => {
      const viewKey = bar.dataset.view;
      const isAvailable = !!watch.views[viewKey];
      bar.classList.toggle('modal__bar--hidden', !isAvailable);
      bar.disabled = !isAvailable;
      const isActive = viewKey === 'front';
      bar.classList.toggle('modal__bar--active', isActive);
      bar.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update main watch image
    if (modalWatchImg && watch.views.front) {
      modalWatchImg.src = watch.views.front;
      modalWatchImg.alt = `${watch.line} ${watch.name}`;
    }

    // Update active state in collection grid
    if (modalWatchGrid) {
      const thumbs = modalWatchGrid.querySelectorAll('.modal__watch-thumb');
      thumbs.forEach(thumb => {
        thumb.classList.toggle('modal__watch-thumb--active', thumb.dataset.key === catalogKey);
      });
    }
  }

  // Set view in modal
  function setModalView(view) {
    const watch = watchCatalog[currentWatch];
    if (!watch || !watch.views[view] || !modalWatchImg || view === currentView) return;

    currentView = view;
    modalBars.forEach((bar) => {
      const on = bar.dataset.view === view;
      bar.classList.toggle('modal__bar--active', on);
      bar.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    modalWatchImg.src = watch.views[view];
    modalWatchImg.alt = `${watch.line} ${watch.name} ${view} view`;
  }

  // Initialize watch collection thumbnails (called once)
  function initWatchThumbnails() {
    if (!modalWatchGrid || isInitialized) return;

    modalWatchGrid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    Object.keys(watchCatalog).forEach((key) => {
      const watch = watchCatalog[key];
      const thumbDiv = document.createElement('div');
      thumbDiv.className = `modal__watch-thumb ${key === currentWatch ? 'modal__watch-thumb--active' : ''}`;
      thumbDiv.dataset.key = key;

      const frontView = watch.views.front || Object.values(watch.views)[0];
      thumbDiv.innerHTML = `
        <img src="${frontView}" alt="${watch.line} ${watch.name}" loading="lazy" />
        <div class="modal__watch-thumb-name">${watch.name}</div>
      `;

      thumbDiv.addEventListener('click', () => updateModalWatch(key));
      fragment.appendChild(thumbDiv);
    });

    modalWatchGrid.appendChild(fragment);
    isInitialized = true;
  }

  // Event Listeners
  function initEventListeners() {
    // Watch cards
    document.querySelectorAll('.watch-card.js-card').forEach((card, index) => {
      if (cardToCatalog[index]) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
          updateModalWatch(cardToCatalog[index].catalogKey);
          openModal();
        });
      }
    });

    // Featured watch
    const featuredWatch = document.getElementById('tapTarget');
    if (featuredWatch) {
      featuredWatch.addEventListener('click', () => {
        updateModalWatch('skylight-blue');
        openModal();
      });
    }

    // Modal view switching
    modalBars.forEach((bar) => {
      bar.addEventListener('click', () => {
        if (!bar.classList.contains('modal__bar--hidden')) {
          setModalView(bar.dataset.view);
        }
      });
    });

    // Close controls
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
    });

    // 3D tilt effect (optimized with requestAnimationFrame)
    const modalWatch = document.getElementById('modalWatchTarget');
    if (modalWatch) {
      let rafId = null;
      modalWatch.addEventListener('mousemove', (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rect = modalWatch.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          const img = modalWatch.querySelector('img');
          if (img) {
            img.style.transform = `rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.04)`;
            img.style.filter = `drop-shadow(0 ${28 + Math.abs(y) * 20}px ${56 + Math.abs(x) * 20}px rgba(52, 152, 219, 0.35)) drop-shadow(0 10px 28px rgba(0, 0, 0, 0.45))`;
          }
        });
      });

      modalWatch.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        const img = modalWatch.querySelector('img');
        if (img) {
          img.style.transform = '';
          img.style.filter = '';
        }
      });
    }

    // Touch swipe (passive listeners)
    const modalStage = document.getElementById('modalWatchStage');
    if (modalStage) {
      let tx = 0;
      modalStage.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
      modalStage.addEventListener('touchend', (e) => {
        const watch = watchCatalog[currentWatch];
        const viewKeys = Object.keys(watch.views);
        const currentIdx = viewKeys.indexOf(currentView);
        const dx = e.changedTouches[0].clientX - tx;
        if (Math.abs(dx) > 44) {
          if (dx < 0 && currentIdx < viewKeys.length - 1) setModalView(viewKeys[currentIdx + 1]);
          if (dx > 0 && currentIdx > 0) setModalView(viewKeys[currentIdx - 1]);
        }
      }, { passive: true });
    }
  }

  // Initialize
  initWatchThumbnails();
  initEventListeners();
})();