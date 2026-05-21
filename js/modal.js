/* Watch showcase modal functionality */
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
  const modalFeatBars = document.getElementById('modalFeatBars');
  const modalWatchStage = document.getElementById('modalWatchStage');
  const modalWatchGrid = document.getElementById('modalWatchGrid');
  const modalBars = Array.from(document.querySelectorAll('#modalFeatBars .modal__bar[data-view]'));

  let currentWatch = 'skylight-blue';
  let currentView = 'front';

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
    
    // Update the entire modal content background
    // We create a deep, atmospheric version of the watch color
    // Extract RGB if possible or use a solid fallback
    const baseColor = watch.accentColor;
    const modalContent = modal.querySelector('.modal__content');
    
    if (modalContent) {
      // Create a gradient that feels like the entire page is the watch color
      // but keeps it dark enough for white text
      modalContent.style.setProperty('--modal-bg', `radial-gradient(circle at 50% 40%, ${watch.color.replace('0.2', '0.15').replace('0.15', '0.12').replace('0.12', '0.08')}, #000 85%)`);
      modalContent.style.backgroundColor = '#000';
    }
  }

  // Update modal with watch details
  function updateModalWatch(catalogKey) {
    if (!watchCatalog[catalogKey]) return;

    const watch = watchCatalog[catalogKey];
    currentWatch = catalogKey;
    currentView = 'front';

    // Update product line and name
    if (modalProductLine) modalProductLine.textContent = watch.line;
    if (modalProductName) modalProductName.textContent = watch.name;
    if (modalProductPrice) modalProductPrice.textContent = watch.price;
    if (modalDialLabel) modalDialLabel.textContent = watch.name;

    // Update background color
    updateModalBackgroundGradient(watch);

    // Update bars and filter by available views
    modalBars.forEach((bar) => {
      const viewKey = bar.dataset.view;
      if (watch.views[viewKey]) {
        bar.classList.remove('modal__bar--hidden');
        bar.disabled = false;
      } else {
        bar.classList.add('modal__bar--hidden');
        bar.disabled = true;
      }
      bar.classList.toggle('modal__bar--active', viewKey === 'front');
      bar.setAttribute('aria-selected', viewKey === 'front' ? 'true' : 'false');
    });

    // Update main watch image
    if (modalWatchImg && watch.views.front) {
      modalWatchImg.src = watch.views.front;
      modalWatchImg.alt = `${watch.line} ${watch.name}`;
    }

    // Update watch thumbnails
    updateWatchThumbnails(catalogKey);
  }

  // Set view in modal
  function setModalView(view, animate) {
    const watch = watchCatalog[currentWatch];
    if (!watch || !watch.views[view] || !modalWatchImg || view === currentView) return;

    currentView = view;
    modalBars.forEach((bar) => {
      const on = bar.dataset.view === view;
      bar.classList.toggle('modal__bar--active', on);
      bar.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    if (modalWatchImg) {
      modalWatchImg.src = watch.views[view];
      modalWatchImg.alt = `${watch.line} ${watch.name} ${view} view`;
    }
  }

  // Update watch thumbnails in modal
  function updateWatchThumbnails(activeKey) {
    if (!modalWatchGrid) return;

    // Clear existing thumbnails
    modalWatchGrid.innerHTML = '';

    // Create thumbnails for all watches
    Object.keys(watchCatalog).forEach((key) => {
      const watch = watchCatalog[key];
      const thumbDiv = document.createElement('div');
      thumbDiv.className = `modal__watch-thumb ${key === activeKey ? 'modal__watch-thumb--active' : ''}`;
      thumbDiv.dataset.key = key;

      // Get the front view image for the thumbnail
      const frontView = watch.views.front || Object.values(watch.views)[0];

      thumbDiv.innerHTML = `
        <img src="${frontView}" alt="${watch.line} ${watch.name}" />
        <div class="modal__watch-thumb-name">${watch.name}</div>
      `;

      thumbDiv.addEventListener('click', () => {
        updateModalWatch(key);
        // Update active thumbnail
        document.querySelectorAll('.modal__watch-thumb').forEach(thumb => {
          thumb.classList.remove('modal__watch-thumb--active');
        });
        thumbDiv.classList.add('modal__watch-thumb--active');
      });

      modalWatchGrid.appendChild(thumbDiv);
    });
  }

  // Add click listeners to watch cards to open modal
  const watchCards = Array.from(document.querySelectorAll('.watch-card.js-card'));
  watchCards.forEach((card, index) => {
    if (cardToCatalog[index]) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        updateModalWatch(cardToCatalog[index].catalogKey);
        openModal();
      });
    }
  });

  // Featured watch click to open modal
  const featuredWatch = document.getElementById('tapTarget');
  if (featuredWatch) {
    featuredWatch.addEventListener('click', () => {
      updateModalWatch('skylight-blue');
      openModal();
    });
  }

  // Modal view switching buttons
  modalBars.forEach((bar) => {
    bar.addEventListener('click', () => {
      if (!bar.classList.contains('modal__bar--hidden')) {
        setModalView(bar.dataset.view, true);
      }
    });
  });

  // Close modal when close button is clicked
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close modal when overlay is clicked
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  // Close modal when Escape key is pressed
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // 3D tilt effect on mouse move for modal watch
  const modalWatch = document.getElementById('modalWatchTarget');
  if (modalWatch) {
    modalWatch.addEventListener('mousemove', (e) => {
      const rect = modalWatch.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotY = x * 12;
      const rotX = -y * 12;
      const img = modalWatch.querySelector('img');
      if (img) {
        img.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
        img.style.filter = `drop-shadow(0 ${28 + Math.abs(y) * 20}px ${56 + Math.abs(x) * 20}px rgba(52, 152, 219, 0.35)) drop-shadow(0 10px 28px rgba(0, 0, 0, 0.45))`;
      }
    });

    modalWatch.addEventListener('mouseleave', () => {
      const img = modalWatch.querySelector('img');
      if (img) {
        img.style.transform = '';
        img.style.filter = '';
      }
    });
  }

  // Touch swipe for view changes in modal
  const modalStage = document.getElementById('modalWatchStage');
  if (modalStage) {
    let tx = 0;
    modalStage.addEventListener(
      'touchstart',
      (e) => {
        tx = e.touches[0].clientX;
      },
      { passive: true }
    );
    modalStage.addEventListener(
      'touchend',
      (e) => {
        const watch = watchCatalog[currentWatch];
        const viewKeys = Object.keys(watch.views);
        const currentIdx = viewKeys.indexOf(currentView);

        const dx = e.changedTouches[0].clientX - tx;
        if (Math.abs(dx) > 44) {
          if (dx < 0 && currentIdx < viewKeys.length - 1) {
            setModalView(viewKeys[currentIdx + 1], true);
          }
          if (dx > 0 && currentIdx > 0) {
            setModalView(viewKeys[currentIdx - 1], true);
          }
        }
      },
      { passive: true }
    );
  }
})();