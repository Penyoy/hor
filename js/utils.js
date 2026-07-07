/**
 * GameHub - Utility Functions
 * Kumpulan fungsi utilitas yang digunakan di seluruh aplikasi.
 */

import { CONFIG } from './config.js';

/**
 * Escape HTML untuk mencegah XSS
 * @param {string} str - String yang akan di-escape
 * @returns {string} String yang sudah di-escape
 */
const escapeHtml = (str) => {
  if (!str || typeof str !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

/**
 * Sanitasi data dari API
 * @param {object} data - Data dari API
 * @returns {object} Data yang sudah di-sanitasi
 */
const sanitizeData = (data) => {
  if (!data || typeof data !== 'object') return {};

  const sanitize = (value) => {
    if (typeof value === 'string') return escapeHtml(value);
    if (Array.isArray(value)) return value.map(sanitize);
    if (value && typeof value === 'object') return sanitizeData(value);
    return value;
  };

  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    sanitized[key] = sanitize(value);
  }
  return sanitized;
};

/**
 * Debounce function
 * @param {Function} func - Fungsi yang akan di-debounce
 * @param {number} wait - Waktu tunggu dalam ms
 * @returns {Function}
 */
const debounce = (func, wait = CONFIG.TIMEOUT.DEBOUNCE) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function
 * @param {Function} func - Fungsi yang akan di-throttle
 * @param {number} limit - Batas waktu dalam ms
 * @returns {Function}
 */
const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Format angka dengan koma
 * @param {number} num - Angka yang akan diformat
 * @returns {string}
 */
const formatNumber = (num) => {
  if (!num && num !== 0) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

/**
 * Format ukuran file
 * @param {string} size - Ukuran file (misal: "285 MB")
 * @returns {string}
 */
const formatSize = (size) => {
  if (!size) return 'N/A';
  return escapeHtml(size);
};

/**
 * Format tanggal
 * @param {string} dateStr - String tanggal (YYYY-MM-DD)
 * @returns {string}
 */
const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateStr;
  }
};

/**
 * Format rating dengan bintang
 * @param {number} rating - Rating (0-5)
 * @returns {string} HTML bintang
 */
const formatRating = (rating) => {
  if (!rating && rating !== 0) return '';
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  let stars = '';
  for (let i = 0; i < fullStars; i++) {
    stars += `<svg class="star star-full" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
  }
  if (hasHalf) {
    stars += `<svg class="star star-half" viewBox="0 0 24 24"><defs><linearGradient id="half"><stop offset="50%" stop-color="#FFD700"/><stop offset="50%" stop-color="#4A4A4A"/></linearGradient></defs><path fill="url(#half)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
  }
  for (let i = 0; i < emptyStars; i++) {
    stars += `<svg class="star star-empty" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
  }
  return stars;
};

/**
 * Generate gradient warna dari string
 * @param {string} str - String untuk menghasilkan warna
 * @returns {string} Linear gradient CSS
 */
const stringToGradient = (str) => {
  if (!str) return 'linear-gradient(135deg, #4F8CFF, #6B5CE7)';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h1 = Math.abs(hash % 360);
  const h2 = (h1 + 30) % 360;
  return `linear-gradient(135deg, hsl(${h1}, 70%, 50%), hsl(${h2}, 70%, 45%))`;
};

/**
 * Get initial dari nama
 * @param {string} name - Nama
 * @returns {string}
 */
const getInitials = (name) => {
  if (!name) return 'G';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Salin teks ke clipboard
 * @param {string} text - Teks yang akan disalin
 * @returns {Promise<boolean>}
 */
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
};

/**
 * Share content
 * @param {object} data - Data untuk share
 * @returns {Promise<boolean>}
 */
const shareContent = async (data) => {
  if (navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch {
      return false;
    }
  }
  return false;
};

/**
 * Intersection Observer helper
 * @param {Element} element - Element yang akan di-observe
 * @param {Function} callback - Callback saat element visible
 * @param {object} options - Options untuk observer
 * @returns {IntersectionObserver}
 */
const observeElement = (element, callback, options = {}) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '50px', ...options }
  );
  observer.observe(element);
  return observer;
};

/**
 * Lazy load images
 * @param {string} selector - Selector untuk images
 */
const lazyLoadImages = (selector = 'img[data-src]') => {
  const images = document.querySelectorAll(selector);
  images.forEach((img) => {
    observeElement(img, (el) => {
      el.src = el.dataset.src;
      el.removeAttribute('data-src');
      el.classList.add('loaded');
    });
  });
};

/**
 * Animate elements saat scroll
 * @param {string} selector - Selector elements
 * @param {string} animationClass - Class animasi
 */
const animateOnScroll = (selector = '.animate-on-scroll', animationClass = 'animate-in') => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    observeElement(el, (target) => {
      target.classList.add(animationClass);
    });
  });
};

/**
 * Generate shimmer placeholder SVG
 * @param {number} width - Lebar
 * @param {number} height - Tinggi
 * @returns {string} Data URI SVG
 */
const getPlaceholderImage = (width = 300, height = 400) => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect width='${width}' height='${height}' fill='%232A2A2A'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23555'%3EGameHub%3C/text%3E%3C/svg%3E`;
};

/**
 * Check online status
 * @returns {boolean}
 */
const isOnline = () => navigator.onLine;

/**
 * Generate unique ID
 * @returns {string}
 */
const generateId = () => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

/**
 * Parse URL params
 * @returns {URLSearchParams}
 */
const getUrlParams = () => {
  return new URLSearchParams(window.location.search);
};

/**
 * Smooth scroll ke element
 * @param {string|Element} target - Target element
 * @param {number} offset - Offset dalam px
 */
const smoothScrollTo = (target, offset = 0) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};

/**
 * Check if element is in viewport
 * @param {Element} element 
 * @returns {boolean}
 */
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Prefers reduced motion
 * @returns {boolean}
 */
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export {
  escapeHtml,
  sanitizeData,
  debounce,
  throttle,
  formatNumber,
  formatSize,
  formatDate,
  formatRating,
  stringToGradient,
  getInitials,
  copyToClipboard,
  shareContent,
  observeElement,
  lazyLoadImages,
  animateOnScroll,
  getPlaceholderImage,
  isOnline,
  generateId,
  getUrlParams,
  smoothScrollTo,
  isInViewport,
  prefersReducedMotion
};
