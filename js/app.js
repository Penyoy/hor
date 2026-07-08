/**
 * GameHub - Main Application Module
 * Entry point untuk aplikasi GameHub.
 */
// TARUH INI PALING ATAS SEBELUM SEMUA IMPORT LAIN
import { setupMockFetch } from './games.js';
setupMockFetch(); // Intercept semua fetch ke /api/

import { initHomePage } from './home.js';
import { lazyLoadImages, animateOnScroll } from './utils.js';

/**
 * Initialize ripple effect untuk semua interactive elements
 */
const initRippleEffect = () => {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.btn, .bottom-nav__item, .game-card');
    if (!target) return;

    const container = target.querySelector('.ripple-container') || target;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    container.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
};

/**
 * Initialize bottom navigation active state
 */
const initBottomNav = () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.bottom-nav__item');

  navItems.forEach((item) => {
    const href = item.getAttribute('href');
    if (href && href.includes(currentPage)) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

/**
 * Initialize offline detection
 */
const initOfflineDetection = () => {
  const showOfflineToast = () => {
    import('./components/toast.js').then(({ showWarning }) => {
      showWarning('Kamu sedang offline. Beberapa fitur mungkin tidak tersedia.', {
        duration: 5000
      });
    });
  };

  const showOnlineToast = () => {
    import('./components/toast.js').then(({ showSuccess }) => {
      showSuccess('Kembali online!', { duration: 3000 });
    });
  };

  window.addEventListener('offline', showOfflineToast);
  window.addEventListener('online', showOnlineToast);
};

/**
 * Initialize PWA install prompt
 */
const initPWAInstall = () => {
  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });

  // Expose for potential manual trigger
  window.gamehubInstallPrompt = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
      });
    }
  };
};

/**
 * Initialize header scroll effect for all pages
 */
const initHeaderScroll = () => {
  const header = document.getElementById('header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 10) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
};

/**
 * Initialize app
 */
const initApp = () => {
  initRippleEffect();
  initBottomNav();
  initOfflineDetection();
  initPWAInstall();

  // Initialize page-specific modules
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  if (currentPage === 'index.html' || currentPage === '' || currentPage === '/') {
    initHomePage();
  }

  // Header scroll effect (for pages with header)
  if (document.getElementById('header')) {
    initHeaderScroll();
  }

  // Lazy load images
  lazyLoadImages();

  // Animate on scroll
  animateOnScroll();
};

// Run init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
