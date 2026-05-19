/* Display carousel - auto-rotating accessories */
(function () {
  'use strict';

  const displayAssets = [
    'assets/display/IMG-20260519-WA0033.jpg',
    'assets/display/IMG-20260519-WA0035.jpg',
    'assets/display/IMG-20260519-WA0038.jpg',
    'assets/display/IMG-20260519-WA0039.jpg'
  ];

  const carouselImg = document.getElementById('carouselImg');
  const displayCarousel = document.getElementById('displayCarousel');

  if (!carouselImg || displayAssets.length === 0) return;

  let currentIndex = 0;
  let autoPlayInterval;

  function updateImage(index) {
    if (!carouselImg) return;
    currentIndex = index % displayAssets.length;
    
    if (typeof gsap !== 'undefined') {
      gsap.to(carouselImg, {
        opacity: 0,
        scale: 0.95,
        duration: 0.25,
        ease: 'power2.in',
        onComplete() {
          carouselImg.src = displayAssets[currentIndex];
          gsap.to(carouselImg, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: 'power2.out'
          });
        }
      });
    } else {
      carouselImg.src = displayAssets[currentIndex];
    }
  }

  function nextImage() {
    updateImage(currentIndex + 1);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextImage, 3500);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Start auto-rotation
  startAutoPlay();

  // Pause on hover, resume on leave
  if (displayCarousel) {
    displayCarousel.addEventListener('mouseenter', stopAutoPlay);
    displayCarousel.addEventListener('mouseleave', startAutoPlay);
    displayCarousel.addEventListener('touchstart', stopAutoPlay, { passive: true });
    displayCarousel.addEventListener('touchend', startAutoPlay, { passive: true });
  }

  // Click to manually advance
  if (displayCarousel) {
    displayCarousel.addEventListener('click', () => {
      nextImage();
      stopAutoPlay();
      startAutoPlay();
    });
  }
})();
