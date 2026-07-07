/**
 * GameHub - Slider Component
 * Membuat banner slider dan screenshot slider dengan autoplay dan touch support.
 */

import { escapeHtml, getPlaceholderImage } from '../js/utils.js';

/**
 * Buat banner slider
 * @param {Array} slides - Array slide data
 * @returns {string} HTML string
 */
export const createBannerSlider = (slides) => {
  if (!slides || slides.length === 0) return '';

  const placeholder = getPlaceholderImage(800, 400);
  const slidesHtml = slides
    .map(
      (slide, index) => `
    <div class="banner-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
      <img 
        class="banner-slide__image" 
        src="${placeholder}" 
        data-src="${escapeHtml(slide.banner || '')}" 
        alt="${escapeHtml(slide.title || '')}" 
        loading="${index === 0 ? 'eager' : 'lazy'}"
      >
      <div class="banner-slide__overlay"></div>
      <div class="banner-slide__content">
        <img class="banner-slide__icon" src="${escapeHtml(slide.icon || '')}" alt="${escapeHtml(slide.title || '')}" loading="lazy">
        <div class="banner-slide__info">
          <h2 class="banner-slide__title">${escapeHtml(slide.title || '')}</h2>
          <p class="banner-slide__desc">${escapeHtml(slide.category || '')} &middot; ${escapeHtml(slide.size || '')}</p>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  const dotsHtml = slides
    .map(
      (_, index) => `
    <button class="banner-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Slide ${index + 1}"></button>
  `
    )
    .join('');

  return `
    <div class="banner-slider" role="region" aria-label="Featured games">
      <div class="banner-slider__track">
        ${slidesHtml}
      </div>
      <div class="banner-slider__controls">
        <button class="banner-slider__prev" aria-label="Previous slide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div class="banner-slider__dots">${dotsHtml}</div>
        <button class="banner-slider__next" aria-label="Next slide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      <div class="banner-slider__progress">
        <div class="banner-slider__progress-bar"></div>
      </div>
    </div>
  `;
};

/**
 * Buat screenshot slider
 * @param {Array} screenshots - Array URL screenshot
 * @param {string} gameTitle - Judul game
 * @returns {string} HTML string
 */
export const createScreenshotSlider = (screenshots, gameTitle = 'Game') => {
  if (!screenshots || screenshots.length === 0) return '';

  const placeholder = getPlaceholderImage(300, 500);
  const slidesHtml = screenshots
    .map(
      (url, index) => `
    <div class="screenshot-slide" data-index="${index}">
      <img 
        src="${placeholder}" 
        data-src="${escapeHtml(url)}" 
        alt="${escapeHtml(gameTitle)} screenshot ${index + 1}" 
        loading="lazy"
        class="screenshot-slide__image"
      >
      <div class="screenshot-slide__overlay">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
        </svg>
      </div>
    </div>
  `
    )
    .join('');

  return `
    <div class="screenshot-slider" role="region" aria-label="Game screenshots">
      <div class="screenshot-slider__track">
        ${slidesHtml}
      </div>
    </div>
  `;
};

/**
 * Inisialisasi banner slider
 * @param {HTMLElement} container - Container element
 * @param {object} options - Options
 */
export const initBannerSlider = (container, options = {}) => {
  const { autoplay = true, interval = 5000 } = options;
  const slides = container.querySelectorAll('.banner-slide');
  const dots = container.querySelectorAll('.banner-dot');
  const prevBtn = container.querySelector('.banner-slider__prev');
  const nextBtn = container.querySelector('.banner-slider__next');
  const progressBar = container.querySelector('.banner-slider__progress-bar');

  if (slides.length <= 1) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  let progressTimer = null;

  const goToSlide = (index) => {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides[currentIndex].classList.remove('active');
    dots[currentIndex]?.classList.remove('active');

    slides[index].classList.add('active');
    dots[index]?.classList.add('active');

    currentIndex = index;
    resetProgress();
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  const startProgress = () => {
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      requestAnimationFrame(() => {
        progressBar.style.transition = `width ${interval}ms linear`;
        progressBar.style.width = '100%';
      });
    }
  };

  const resetProgress = () => {
    if (!autoplay) return;
    clearInterval(autoplayTimer);
    clearInterval(progressTimer);
    startProgress();
    autoplayTimer = setInterval(nextSlide, interval);
  };

  const startAutoplay = () => {
    if (!autoplay) return;
    startProgress();
    autoplayTimer = setInterval(nextSlide, interval);
  };

  const stopAutoplay = () => {
    clearInterval(autoplayTimer);
    clearInterval(progressTimer);
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
    }
  };

  // Event listeners
  prevBtn?.addEventListener('click', () => {
    prevSlide();
    resetProgress();
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    resetProgress();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.index));
      resetProgress();
    });
  });

  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);

  // Touch support
  let touchStartX = 0;
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
      resetProgress();
    }
    startAutoplay();
  }, { passive: true });

  startAutoplay();
};

/**
 * Inisialisasi screenshot slider
 * @param {HTMLElement} container - Container element
 */
export const initScreenshotSlider = (container) => {
  const track = container.querySelector('.screenshot-slider__track');
  if (!track) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('active');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('active');
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('active');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });

  // Click untuk fullscreen modal
  const slides = container.querySelectorAll('.screenshot-slide');
  slides.forEach((slide) => {
    slide.addEventListener('click', () => {
      const img = slide.querySelector('img');
      if (img) {
        openScreenshotModal(img.src, img.alt);
      }
    });
  });
};

/**
 * Buka screenshot modal fullscreen
 * @param {string} src - Image source
 * @param {string} alt - Image alt
 */
const openScreenshotModal = (src, alt) => {
  const modal = document.createElement('div');
  modal.className = 'screenshot-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Screenshot fullscreen');

  modal.innerHTML = `
    <div class="screenshot-modal__backdrop"></div>
    <div class="screenshot-modal__content">
      <img src="${src}" alt="${alt}" class="screenshot-modal__image">
      <button class="screenshot-modal__close" aria-label="Close modal">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  // Animation
  requestAnimationFrame(() => {
    modal.classList.add('active');
  });

  const closeModal = () => {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 300);
  };

  modal.querySelector('.screenshot-modal__close').addEventListener('click', closeModal);
  modal.querySelector('.screenshot-modal__backdrop').addEventListener('click', closeModal);
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  modal.focus();
};
