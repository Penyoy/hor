/**
 * GameHub - Home Page Module
 * Mengelola semua fungsionalitas halaman beranda.
 */

import api from './api.js';
import storage from './storage.js';
import { createGameCard, renderSkeletonCards } from '../components/card.js';
import { createBannerSlider, initBannerSlider } from '../components/slider.js';
import { lazyLoadImages, animateOnScroll } from './utils.js';

/**
 * Render skeleton loading untuk semua section
 */
const renderSkeletonLoadings = () => {
  const trendingGrid = document.getElementById('trendingGrid');
  const newGamesGrid = document.getElementById('newGamesGrid');
  const editorsChoiceGrid = document.getElementById('editorsChoiceGrid');
  const updatesGrid = document.getElementById('updatesGrid');

  if (trendingGrid) trendingGrid.innerHTML = renderSkeletonCards(5, 'compact');
  if (newGamesGrid) newGamesGrid.innerHTML = renderSkeletonCards(6);
  if (editorsChoiceGrid) editorsChoiceGrid.innerHTML = renderSkeletonCards(6);
  if (updatesGrid) updatesGrid.innerHTML = renderSkeletonCards(6);
};

/**
 * Load dan render banner slider
 */
const loadBanner = async () => {
  const container = document.getElementById('bannerContainer');
  if (!container) return;

  try {
    const games = await api.getGames('limit=5');
    if (games && games.length > 0) {
      container.innerHTML = createBannerSlider(games);
      const slider = container.querySelector('.banner-slider');
      if (slider) {
        initBannerSlider(slider, { autoplay: true, interval: 5000 });
        lazyLoadImages('.banner-slide img[data-src]');
      }
    }
  } catch (error) {
    console.error('Failed to load banner:', error);
    container.style.display = 'none';
  }
};

/**
 * Load dan render trending games
 */
const loadTrending = async () => {
  const grid = document.getElementById('trendingGrid');
  if (!grid) return;

  try {
    const games = await api.getTrending();
    if (games && games.length > 0) {
      grid.innerHTML = games.map((game) => createGameCard(game, 'compact')).join('');
      addCardListeners(grid);
      lazyLoadImages('#trendingGrid img[data-src]');
    } else {
      grid.innerHTML = '<p class="empty-state">Tidak ada game trending</p>';
    }
  } catch (error) {
    console.error('Failed to load trending:', error);
    grid.innerHTML = renderSkeletonCards(5, 'compact');
  }
};

/**
 * Load dan render new games
 */
const loadNewGames = async () => {
  const grid = document.getElementById('newGamesGrid');
  if (!grid) return;

  try {
    const games = await api.getNewGames();
    if (games && games.length > 0) {
      grid.innerHTML = games.map((game) => createGameCard(game)).join('');
      addCardListeners(grid);
      lazyLoadImages('#newGamesGrid img[data-src]');
    } else {
      grid.innerHTML = '<p class="empty-state">Tidak ada game baru</p>';
    }
  } catch (error) {
    console.error('Failed to load new games:', error);
  }
};

/**
 * Load dan render editor's choice
 */
const loadEditorsChoice = async () => {
  const grid = document.getElementById('editorsChoiceGrid');
  if (!grid) return;

  try {
    const games = await api.getEditorsChoice();
    if (games && games.length > 0) {
      // First item as featured, rest as default
      const featured = games[0];
      const rest = games.slice(1, 7);
      let html = createGameCard(featured, 'featured');
      html += rest.map((game) => createGameCard(game)).join('');
      grid.innerHTML = html;
      addCardListeners(grid);
      lazyLoadImages('#editorsChoiceGrid img[data-src]');
    } else {
      grid.innerHTML = '<p class="empty-state">Belum ada Editor\'s Choice</p>';
    }
  } catch (error) {
    console.error('Failed to load editors choice:', error);
  }
};

/**
 * Load dan render updates
 */
const loadUpdates = async () => {
  const grid = document.getElementById('updatesGrid');
  if (!grid) return;

  try {
    const games = await api.getUpdates();
    if (games && games.length > 0) {
      grid.innerHTML = games.map((game) => createGameCard(game)).join('');
      addCardListeners(grid);
      lazyLoadImages('#updatesGrid img[data-src]');
    } else {
      grid.innerHTML = '<p class="empty-state">Tidak ada update terbaru</p>';
    }
  } catch (error) {
    console.error('Failed to load updates:', error);
  }
};

/**
 * Add click listeners ke game cards
 * @param {HTMLElement} container 
 */
const addCardListeners = (container) => {
  const cards = container.querySelectorAll('.game-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const gameId = card.dataset.id;
      if (gameId) {
        window.location.href = `detail.html?id=${encodeURIComponent(gameId)}`;
      }
    });

    // Keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const gameId = card.dataset.id;
        if (gameId) {
          window.location.href = `detail.html?id=${encodeURIComponent(gameId)}`;
        }
      }
    });

    // Ripple effect
    card.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      card.querySelector('.ripple-container')?.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
};

/**
 * Initialize header search
 */
const initHeaderSearch = () => {
  const input = document.getElementById('headerSearchInput');
  const clear = document.getElementById('headerSearchClear');

  if (!input) return;

  input.addEventListener('focus', () => {
    window.location.href = 'search.html';
  });

  // Show/hide clear button
  input.addEventListener('input', () => {
    if (input.value.length > 0) {
      clear?.classList.add('visible');
    } else {
      clear?.classList.remove('visible');
    }
  });

  clear?.addEventListener('click', () => {
    input.value = '';
    clear.classList.remove('visible');
    input.focus();
  });
};

/**
 * Initialize header scroll effect
 */
const initHeaderScroll = () => {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  });
};

/**
 * Initialize home page
 */
export const initHomePage = () => {
  renderSkeletonLoadings();
  initHeaderSearch();
  initHeaderScroll();

  // Load data
  loadBanner();
  loadTrending();
  loadNewGames();
  loadEditorsChoice();
  loadUpdates();

  // Animate on scroll
  setTimeout(() => {
    animateOnScroll();
  }, 100);
};
