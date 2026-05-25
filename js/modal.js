(function () {
  'use strict';

  const AUTO_SWITCH_MS = 3000;

  const watchCatalog = {
    'halo-green': {
      name: 'Gold and Green Dial',
      line: 'HALO',
      price: '₦ 750,000.00',
      color: 'rgba(46, 204, 113, 0.2)',
      accentColor: '#2ecc71',
      desc: 'The HALO Gold and Green Dial embodies timeless sophistication. A perfect harmony of luxury and nature-inspired design for the modern connoisseur.',
      specs: [
        ['Movement', 'Seiko VH63'],
        ['Case', '316L Stainless Steel (40mm)'],
        ['Glass', 'Mineral Crystal'],
        ['Water Resistance', '3 ATM'],
        ['Strap', 'Stainless Steel (20mm)'],
      ],
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
      desc: 'The HALO Silver and Pink Dial offers a delicate balance of elegance and charm. A refined statement piece for those who appreciate subtle luxury.',
      specs: [
        ['Movement', 'Seiko VH63'],
        ['Case', '316L Stainless Steel (40mm)'],
        ['Glass', 'Mineral Crystal'],
        ['Water Resistance', '3 ATM'],
        ['Strap', 'Stainless Steel (20mm)'],
      ],
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
      desc: 'The HALO Silver and Blue Dial captures oceanic depth in a timepiece. Bold yet refined, it is designed for those who stand out effortlessly.',
      specs: [
        ['Movement', 'Seiko VH63'],
        ['Case', '316L Stainless Steel (40mm)'],
        ['Glass', 'Mineral Crystal'],
        ['Water Resistance', '3 ATM'],
        ['Strap', 'Stainless Steel (20mm)'],
      ],
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
      desc: 'The SKYLIGHT Gold Diamond Bezel radiates opulence. Every detail is crafted to turn heads, from the diamond-set bezel to the sunburst gold dial.',
      specs: [
        ['Movement', 'Seiko VH63'],
        ['Case', '316L Stainless Steel (26mm)'],
        ['Glass', 'Sapphire'],
        ['Water Resistance', '5 ATM'],
        ['Luminous', 'Swiss Super-LumiNova'],
        ['Strap', 'Stainless Steel (20mm)'],
      ],
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
      desc: 'Experience refined elegance with the BAY ICE SKYLIGHT. Crafted with premium materials and timeless design, it is more than a watch — it is a statement of confidence and style.',
      specs: [
        ['Movement', 'Seiko VH63'],
        ['Case', '316L Stainless Steel (26mm)'],
        ['Glass', 'Sapphire'],
        ['Water Resistance', '5 ATM'],
        ['Luminous', 'Swiss Super-LumiNova'],
        ['Strap', 'Stainless Steel (20mm)'],
      ],
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
      desc: 'The SKYLIGHT VVS Bezel Bussdown is the ultimate expression of luxury. Adorned with VVS-grade stones, it redefines what a timepiece can be.',
      specs: [
        ['Movement', 'Seiko VH63'],
        ['Case', '316L Stainless Steel (26mm)'],
        ['Glass', 'Sapphire'],
        ['Water Resistance', '5 ATM'],
        ['Luminous', 'Swiss Super-LumiNova'],
        ['Strap', 'Stainless Steel (20mm)'],
      ],
      views: {
        front: 'assets/watches/opt/skylight-vvs-bussdown.png',
      }
    }
  };

  const cardToCatalog = {
    0: { index: 0, catalogKey: 'halo-green' },
    1: { index: 1, catalogKey: 'halo-purple' },
    2: { index: 2, catalogKey: 'halo-blue' },
    3: { index: 3, catalogKey: 'skylight-gold' },
    4: { index: 4, catalogKey: 'skylight-blue' },
    5: { index: 5, catalogKey: 'skylight-vvs' },
  };

  // Elements
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
  const modalDesc = document.getElementById('modalDesc');
  const modalSpecsList = document.getElementById('modalSpecsList');
  const modalBars = Array.from(document.querySelectorAll('#modalFeatBars .modal__bar[data-view]'));
  const modalQtyNum = document.getElementById('modalQtyNum');
  const modalQtyUp = document.getElementById('modalQtyUp');
  const modalQtyDown = document.getElementById('modalQtyDown');
  const modalCartBtn = document.getElementById('modalCartBtn');

  let currentWatch = 'skylight-blue';
  let currentView = 'front';
  let isInitialized = false;
  let autoTimer = null;

  const imageCache = {};

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

  // Preload all catalog images on init
  function preloadAll() {
    Object.keys(watchCatalog).forEach(preloadWatchImages);
  }

  // Auto-switch
  function startAutoSwitch() {
    stopAutoSwitch();
    autoTimer = setInterval(() => {
      const watch = watchCatalog[currentWatch];
      const viewKeys = Object.keys(watch.views);
      if (viewKeys.length > 1) {
        const curIdx = viewKeys.indexOf(currentView);
        const nextIdx = (curIdx + 1) % viewKeys.length;
        setModalView(viewKeys[nextIdx]);
      }
    }, AUTO_SWITCH_MS);
  }

  function stopAutoSwitch() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function resetAutoSwitch() {
    stopAutoSwitch();
    if (modal && modal.classList.contains('is-open')) {
      startAutoSwitch();
    }
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    startAutoSwitch();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    stopAutoSwitch();
  }

  function updateModalBackgroundGradient(watch) {
    const modalContent = modal.querySelector('.modal__content');
    if (modalContent) {
      const baseColor = watch.color.replace(/[\d.]+\)$/, '0.08)');
      modalContent.style.setProperty('--modal-bg', `radial-gradient(circle at 50% 40%, ${baseColor}, #000 85%)`);
      modalContent.style.backgroundColor = '#000';
    }
  }

  function renderSpecs(watch) {
    if (!modalSpecsList || !watch.specs) return;
    modalSpecsList.innerHTML = '';
    watch.specs.forEach(([label, value]) => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${label}</span><span>${value}</span>`;
      modalSpecsList.appendChild(li);
    });
  }

  function updateModalWatch(catalogKey) {
    const watch = watchCatalog[catalogKey];
    if (!watch) return;

    currentWatch = catalogKey;
    currentView = 'front';

    if (modalProductLine) modalProductLine.textContent = watch.line;
    if (modalProductName) modalProductName.textContent = watch.name;
    if (modalProductPrice) modalProductPrice.textContent = watch.price;
    if (modalDialLabel) modalDialLabel.textContent = watch.name;
    if (modalDesc) modalDesc.textContent = watch.desc;

    renderSpecs(watch);
    preloadWatchImages(catalogKey);
    updateModalBackgroundGradient(watch);

    // Update view bars
    const viewKeys = Object.keys(watch.views);
    modalBars.forEach(bar => {
      const vk = bar.dataset.view;
      const avail = viewKeys.includes(vk);
      bar.classList.toggle('modal__bar--hidden', !avail);
      bar.disabled = !avail;
      const isActive = vk === 'front';
      bar.classList.toggle('modal__bar--active', isActive);
      bar.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update image
    if (modalWatchImg && watch.views.front) {
      modalWatchImg.src = watch.views.front;
      modalWatchImg.alt = `${watch.line} ${watch.name}`;
    }

    // Thumbnail active state
    if (modalWatchGrid) {
      modalWatchGrid.querySelectorAll('.modal__watch-thumb').forEach(th => {
        th.classList.toggle('modal__watch-thumb--active', th.dataset.key === catalogKey);
      });
    }

    resetAutoSwitch();
  }

  function setModalView(view) {
    const watch = watchCatalog[currentWatch];
    if (!watch || !watch.views[view] || !modalWatchImg || view === currentView) return;

    currentView = view;
    modalBars.forEach(bar => {
      const on = bar.dataset.view === view;
      bar.classList.toggle('modal__bar--active', on);
      bar.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    if (typeof gsap !== 'undefined') {
      gsap.to(modalWatchImg, {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.in',
        onComplete() {
          modalWatchImg.src = watch.views[view];
          modalWatchImg.alt = `${watch.line} ${watch.name} ${view} view`;
          gsap.to(modalWatchImg, {
            opacity: 1,
            duration: 0.25,
            ease: 'power2.out'
          });
        }
      });
    } else {
      modalWatchImg.src = watch.views[view];
      modalWatchImg.alt = `${watch.line} ${watch.name} ${view} view`;
    }

    resetAutoSwitch();
  }

  // Qty
  function setQty(n) {
    if (!modalQtyNum) return;
    const qty = Math.max(1, Math.min(n, 99));
    modalQtyNum.textContent = qty;
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(modalQtyNum,
        { scale: 1.35, color: '#3498db' },
        { scale: 1, color: '#fff', duration: 0.22, ease: 'back.out(2)' }
      );
    }
  }

  // Cart feedback
  let cartOriginalHTML = '';
  function handleCartClick() {
    if (!modalCartBtn) return;
    if (!cartOriginalHTML) cartOriginalHTML = modalCartBtn.innerHTML;
    modalCartBtn.textContent = '✓ Added to cart';
    modalCartBtn.classList.add('modal__cart-btn--added');
    setTimeout(() => {
      modalCartBtn.innerHTML = cartOriginalHTML;
      modalCartBtn.classList.remove('modal__cart-btn--added');
    }, 2000);
    resetAutoSwitch();
  }

  // Init thumbnails
  function initWatchThumbnails() {
    if (!modalWatchGrid || isInitialized) return;

    modalWatchGrid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    Object.keys(watchCatalog).forEach(key => {
      const watch = watchCatalog[key];
      const div = document.createElement('div');
      div.className = `modal__watch-thumb ${key === currentWatch ? 'modal__watch-thumb--active' : ''}`;
      div.dataset.key = key;

      const src = watch.views.front || Object.values(watch.views)[0];
      div.innerHTML = `
        <img src="${src}" alt="${watch.line} ${watch.name}" loading="lazy" />
        <div class="modal__watch-thumb-name">${watch.name}</div>
      `;

      div.addEventListener('click', () => {
        updateModalWatch(key);
        resetAutoSwitch();
      });
      fragment.appendChild(div);
    });

    modalWatchGrid.appendChild(fragment);
    isInitialized = true;
  }

  // Event listeners
  function initEventListeners() {
    // Watch cards → open modal
    document.querySelectorAll('.watch-card.js-card').forEach((card, idx) => {
      if (cardToCatalog[idx]) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
          updateModalWatch(cardToCatalog[idx].catalogKey);
          openModal();
        });
      }
    });

    // Featured quick view
    const tapTarget = document.getElementById('tapTarget');
    if (tapTarget) {
      tapTarget.addEventListener('click', () => {
        updateModalWatch('skylight-blue');
        openModal();
      });
    }

    const featuredQuickView = document.getElementById('featuredQuickView');
    if (featuredQuickView) {
      featuredQuickView.addEventListener('click', () => {
        updateModalWatch('skylight-blue');
        openModal();
      });
    }

    const checkoutQuickView = document.getElementById('checkoutQuickView');
    if (checkoutQuickView) {
      checkoutQuickView.addEventListener('click', () => {
        updateModalWatch('skylight-blue');
        openModal();
      });
    }

    // View bar switching
    modalBars.forEach(bar => {
      bar.addEventListener('click', () => {
        if (!bar.classList.contains('modal__bar--hidden')) {
          setModalView(bar.dataset.view);
        }
      });
    });

    // Qty buttons
    if (modalQtyUp) modalQtyUp.addEventListener('click', () => {
      setQty(+(modalQtyNum.textContent || 1) + 1);
      resetAutoSwitch();
    });
    if (modalQtyDown) modalQtyDown.addEventListener('click', () => {
      setQty(+(modalQtyNum.textContent || 1) - 1);
      resetAutoSwitch();
    });

    // Cart
    if (modalCartBtn) modalCartBtn.addEventListener('click', handleCartClick);

    // Buy Now / Shop — reset auto-switch on any action
    document.querySelectorAll('.modal__buy-btn, .modal__shopify-btn').forEach(btn => {
      btn.addEventListener('click', resetAutoSwitch);
    });

    // Close
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
    });

    // 3D tilt
    const modalWatch = document.getElementById('modalWatchTarget');
    if (modalWatch) {
      let rafId = null;
      modalWatch.addEventListener('mousemove', e => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rect = modalWatch.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          const img = modalWatch.querySelector('img');
          if (img) {
            img.style.transform = `rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.04)`;
            img.style.filter = `drop-shadow(0 ${28 + Math.abs(y) * 20}px ${56 + Math.abs(x) * 20}px rgba(52,152,219,0.35)) drop-shadow(0 10px 28px rgba(0,0,0,0.45))`;
          }
        });
      });
      modalWatch.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        const img = modalWatch.querySelector('img');
        if (img) { img.style.transform = ''; img.style.filter = ''; }
      });
    }

    // Touch swipe
    const modalStage = document.getElementById('modalWatchStage');
    if (modalStage) {
      let tx = 0;
      modalStage.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
      modalStage.addEventListener('touchend', e => {
        const watch = watchCatalog[currentWatch];
        const vk = Object.keys(watch.views);
        const ci = vk.indexOf(currentView);
        const dx = e.changedTouches[0].clientX - tx;
        if (Math.abs(dx) > 44) {
          if (dx < 0 && ci < vk.length - 1) setModalView(vk[ci + 1]);
          if (dx > 0 && ci > 0) setModalView(vk[ci - 1]);
        }
        resetAutoSwitch();
      }, { passive: true });
    }
  }

  // Init
  preloadAll();
  initWatchThumbnails();
  initEventListeners();
})();
