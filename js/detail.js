/**
 * GameHub - Detail Page Module
 * Mengelola semua fungsionalitas halaman detail game.
 */

import api from './api.js';
import storage from './storage.js';
import { getUrlParams, escapeHtml, formatDate, formatRating, copyToClipboard, shareContent } from './utils.js';
import { createGameCard } from '../components/card.js';
import { createScreenshotSlider, initScreenshotSlider } from '../components/slider.js';
import { showSuccess, showError } from '../components/toast.js';
import { lazyLoadImages } from './utils.js';

// Get game ID from URL
const gameId = getUrlParams().get('id');

/**
 * Load dan render detail game
 */
const loadGameDetail = async () => {
  if (!gameId) {
    showError('ID game tidak ditemukan');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
    return;
  }

  try {
    const game = await api.getGame(gameId);
    if (!game) {
      showError('Game tidak ditemukan');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
      return;
    }

    renderBanner(game);
    renderHeader(game);
    renderMeta(game);
    renderActions(game);
    renderDescription(game);
    renderScreenshots(game);
    renderFeatures(game);
    renderChangelog(game);
    loadRelatedGames(game.category, game.id);

    // Update favorite button state
    updateFavoriteButton();
  } catch (error) {
    console.error('Failed to load game detail:', error);
    showError('Gagal memuat detail game');
  }
};

/**
 * Render banner
 * @param {object} game 
 */
const renderBanner = (game) => {
  const banner = document.getElementById('detailBanner');
  if (!banner) return;

  const img = banner.querySelector('.skeleton');
  if (img) {
    img.outerHTML = `<img class="detail-banner__image" src="${escapeHtml(game.banner || '')}" alt="${escapeHtml(game.title || '')}" loading="eager">`;
  }
};

/**
 * Render header
 * @param {object} game 
 */
const renderHeader = (game) => {
  const header = document.getElementById('detailHeader');
  if (!header) return;

  header.innerHTML = `
    <div class="detail-header__inner">
      <img class="detail-header__icon" src="${escapeHtml(game.icon || '')}" alt="${escapeHtml(game.title || '')}" loading="eager">
      <div class="detail-header__info">
        <h1 class="detail-header__title">${escapeHtml(game.title || '')}</h1>
        <p class="detail-header__developer">${escapeHtml(game.developer || 'Unknown Developer')}</p>
        <div class="detail-header__rating">
          <div class="detail-header__stars">${formatRating(game.rating)}</div>
          <span class="detail-header__rating-text">${game.rating || 0} / 5</span>
        </div>
      </div>
    </div>
  `;
};

/**
 * Render meta info
 * @param {object} game 
 */
const renderMeta = (game) => {
  const meta = document.getElementById('detailMeta');
  if (!meta) return;

  meta.innerHTML = `
    <div class="detail-meta__item">
      <svg class="detail-meta__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
      <div class="detail-meta__value">${escapeHtml(game.version || 'N/A')}</div>
      <div class="detail-meta__label">Versi</div>
    </div>
    <div class="detail-meta__item">
      <svg class="detail-meta__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      <div class="detail-meta__value">${escapeHtml(game.size || 'N/A')}</div>
      <div class="detail-meta__label">Ukuran</div>
    </div>
    <div class="detail-meta__item">
      <svg class="detail-meta__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      <div class="detail-meta__value">${escapeHtml(game.downloads || '0')}</div>
      <div class="detail-meta__label">Download</div>
    </div>
    <div class="detail-meta__item">
      <svg class="detail-meta__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      <div class="detail-meta__value">${formatDate(game.updated)}</div>
      <div class="detail-meta__label">Update</div>
    </div>
    <div class="detail-meta__item">
      <svg class="detail-meta__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
      <div class="detail-meta__value">${escapeHtml(game.category || 'N/A')}</div>
      <div class="detail-meta__label">Kategori</div>
    </div>
    <div class="detail-meta__item">
      <svg class="detail-meta__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      <div class="detail-meta__value">${game.rating || 0}</div>
      <div class="detail-meta__label">Rating</div>
    </div>
  `;
};

/**
 * Render action buttons
 * @param {object} game 
 */
const renderActions = (game) => {
  const actions = document.getElementById('detailActions');
  if (!actions) return;

  actions.style.display = 'flex';

  // Setup download button
  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn && game.download) {
    downloadBtn.href = game.download;
    downloadBtn.target = '_blank';
    downloadBtn.rel = 'noopener noreferrer';
    downloadBtn.addEventListener('click', () => {
      storage.addDownload({
        id: game.id,
        title: game.title,
        developer: game.developer,
        size: game.size,
        color: game.color,
        icon: game.icon
      });
    });
  }

  // Setup share button
  const shareBtn = document.getElementById('shareBtn');
  shareBtn?.addEventListener('click', async () => {
    const shareData = {
      title: game.title || 'Game',
      text: `Cek game ${game.title} di GameHub!`,
      url: window.location.href
    };

    const shared = await shareContent(shareData);
    if (!shared) {
      // Fallback: copy link
      const copied = await copyToClipboard(window.location.href);
      if (copied) {
        showSuccess('Link disalin ke clipboard!');
      }
    }
  });

  // Setup copy link button
  const copyBtn = document.getElementById('copyLinkBtn');
  copyBtn?.addEventListener('click', async () => {
    const copied = await copyToClipboard(window.location.href);
    if (copied) {
      showSuccess('Link berhasil disalin!');
    } else {
      showError('Gagal menyalin link');
    }
  });

  // Setup favorite button
  const favoriteBtn = document.getElementById('favoriteBtn');
  favoriteBtn?.addEventListener('click', () => {
    const isFav = storage.toggleFavorite({
      id: game.id,
      title: game.title,
      developer: game.developer,
      category: game.category,
      rating: game.rating,
      color: game.color,
      icon: game.icon
    });
    updateFavoriteButton();
    if (isFav) {
      showSuccess('Ditambahkan ke favorit!');
    } else {
      showInfo('Dihapus dari favorit');
    }
  });
};

/**
 * Update favorite button appearance
 */
const updateFavoriteButton = () => {
  const favoriteBtn = document.getElementById('favoriteBtn');
  if (!favoriteBtn) return;

  const isFav = storage.isFavorite(gameId);
  if (isFav) {
    favoriteBtn.style.color = '#FF4B55';
    favoriteBtn.querySelector('svg').setAttribute('fill', 'currentColor');
  } else {
    favoriteBtn.style.color = '';
    favoriteBtn.querySelector('svg').setAttribute('fill', 'none');
  }
};

/**
 * Render description
 * @param {object} game 
 */
const renderDescription = (game) => {
  const section = document.getElementById('descriptionSection');
  const content = document.getElementById('gameDescription');
  if (!section || !content) return;

  if (game.description) {
    content.innerHTML = `<p>${escapeHtml(game.description)}</p>`;
    section.style.display = 'block';
  }
};

/**
 * Render screenshots
 * @param {object} game 
 */
const renderScreenshots = (game) => {
  const section = document.getElementById('screenshotsSection');
  const container = document.getElementById('screenshotsContainer');
  if (!section || !container) return;

  if (game.screenshots && game.screenshots.length > 0) {
    container.innerHTML = createScreenshotSlider(game.screenshots, game.title);
    const slider = container.querySelector('.screenshot-slider');
    if (slider) {
      initScreenshotSlider(slider);
      lazyLoadImages('.screenshot-slide img[data-src]');
    }
    section.style.display = 'block';
  }
};

/**
 * Render features
 * @param {object} game 
 */
const renderFeatures = (game) => {
  const section = document.getElementById('featuresSection');
  const list = document.getElementById('featureList');
  if (!section || !list) return;

  const defaultFeatures = [
    'Offline Mode',
    'Multiplayer',
    'Cloud Save',
    'Controller Support',
    'Achievements',
    'Leaderboard'
  ];

  const features = game.features || defaultFeatures;

  list.innerHTML = features.map((feature) => `
    <div class="feature-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      ${escapeHtml(feature)}
    </div>
  `).join('');

  section.style.display = 'block';
};

/**
 * Render changelog
 * @param {object} game 
 */
const renderChangelog = (game) => {
  const section = document.getElementById('changelogSection');
  const content = document.getElementById('changelogContent');
  if (!section || !content) return;

  if (game.changelog && game.changelog.length > 0) {
    content.innerHTML = game.changelog.map((log) => `
      <div class="changelog__version">${escapeHtml(log.version || '')}</div>
      <div class="changelog__date">${formatDate(log.date)}</div>
      <ul class="changelog__list">
        ${(log.changes || []).map((change) => `
          <li class="changelog__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            ${escapeHtml(change)}
          </li>
        `).join('')}
      </ul>
    `).join('');
    section.style.display = 'block';
  } else if (game.version) {
    content.innerHTML = `
      <div class="changelog__version">${escapeHtml(game.version)}</div>
      <div class="changelog__date">${formatDate(game.updated)}</div>
      <ul class="changelog__list">
        <li class="changelog__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Versi terbaru
        </li>
      </ul>
    `;
    section.style.display = 'block';
  }
};

/**
 * Load related games
 * @param {string} category 
 * @param {string} currentId 
 */
const loadRelatedGames = async (category, currentId) => {
  const section = document.getElementById('relatedGamesSection');
  const grid = document.getElementById('relatedGamesGrid');
  if (!section || !grid) return;

  try {
    const games = await api.getGames();
    if (games && games.length > 0) {
      const related = games
        .filter((g) => g.id !== currentId && g.category === category)
        .slice(0, 8);

      if (related.length === 0) {
        const random = games.filter((g) => g.id !== currentId).slice(0, 8);
        grid.innerHTML = random.map((g) => createGameCard(g, 'compact')).join('');
      } else {
        grid.innerHTML = related.map((g) => createGameCard(g, 'compact')).join('');
      }

      // Add click listeners
      grid.querySelectorAll('.game-card').forEach((card) => {
        card.addEventListener('click', () => {
          const id = card.dataset.id;
          if (id) {
            window.location.href = `detail.html?id=${encodeURIComponent(id)}`;
          }
        });
      });

      lazyLoadImages('#relatedGamesGrid img[data-src]');
      section.style.display = 'block';
    }
  } catch (error) {
    console.error('Failed to load related games:', error);
  }
};

/**
 * Initialize detail page
 */
const initDetailPage = () => {
  // Back button
  document.getElementById('backBtn')?.addEventListener('click', () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  });

  // Load game data
  loadGameDetail();
};

// Run init
document.addEventListener('DOMContentLoaded', initDetailPage);
