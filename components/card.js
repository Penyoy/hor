/**
 * GameHub - Card Component
 * Membuat card game dengan berbagai tipe dan animasi.
 */

import { escapeHtml, formatRating, stringToGradient, getPlaceholderImage } from '../js/utils.js';

/**
 * Buat card game
 * @param {object} game - Data game
 * @param {string} type - Tipe card (default, compact, featured)
 * @returns {string} HTML string
 */
export const createGameCard = (game, type = 'default') => {
  if (!game) return '';

  const { id, title, banner, icon, rating, size, version, developer, category } = game;
  const safeTitle = escapeHtml(title);
  const safeDev = escapeHtml(developer || 'Unknown');
  const safeVer = escapeHtml(version || '');
  const safeSize = escapeHtml(size || '');
  const safeCat = escapeHtml(category || '');
  const placeholder = getPlaceholderImage();

  if (type === 'compact') {
    return `
      <article class="game-card game-card--compact" data-id="${escapeHtml(id)}" role="button" tabindex="0" aria-label="${safeTitle}">
        <div class="game-card__media">
          <img 
            class="game-card__banner" 
            src="${placeholder}" 
            data-src="${escapeHtml(banner || '')}" 
            alt="${safeTitle}" 
            loading="lazy"
          >
          <div class="game-card__overlay"></div>
        </div>
        <div class="game-card__content">
          <img class="game-card__icon" src="${escapeHtml(icon || '')}" alt="${safeTitle} icon" loading="lazy">
          <div class="game-card__info">
            <h3 class="game-card__title">${safeTitle}</h3>
            <p class="game-card__meta">${safeDev}</p>
            <div class="game-card__rating">${formatRating(rating)} <span>${rating || 0}</span></div>
          </div>
        </div>
        <div class="ripple-container"></div>
      </article>
    `;
  }

  if (type === 'featured') {
    return `
      <article class="game-card game-card--featured" data-id="${escapeHtml(id)}" role="button" tabindex="0" aria-label="${safeTitle}">
        <div class="game-card__media">
          <img 
            class="game-card__banner" 
            src="${placeholder}" 
            data-src="${escapeHtml(banner || '')}" 
            alt="${safeTitle}" 
            loading="lazy"
          >
          <div class="game-card__gradient" style="background: ${stringToGradient(safeTitle)}"></div>
          <div class="game-card__overlay"></div>
          <div class="game-card__badge">Editor's Choice</div>
        </div>
        <div class="game-card__content">
          <img class="game-card__icon game-card__icon--large" src="${escapeHtml(icon || '')}" alt="${safeTitle} icon" loading="lazy">
          <div class="game-card__info">
            <h3 class="game-card__title">${safeTitle}</h3>
            <p class="game-card__category">${safeCat}</p>
            <div class="game-card__rating">${formatRating(rating)} <span>${rating || 0}</span></div>
          </div>
        </div>
        <div class="ripple-container"></div>
      </article>
    `;
  }

  // Default card
  return `
    <article class="game-card" data-id="${escapeHtml(id)}" role="button" tabindex="0" aria-label="${safeTitle}">
      <div class="game-card__media">
        <img 
          class="game-card__banner" 
          src="${placeholder}" 
          data-src="${escapeHtml(banner || '')}" 
          alt="${safeTitle}" 
          loading="lazy"
        >
        <div class="game-card__overlay"></div>
        <div class="game-card__rating-badge">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <span>${rating || 0}</span>
        </div>
      </div>
      <div class="game-card__content">
        <img class="game-card__icon" src="${escapeHtml(icon || '')}" alt="${safeTitle} icon" loading="lazy">
        <div class="game-card__info">
          <h3 class="game-card__title">${safeTitle}</h3>
          <div class="game-card__details">
            <span class="game-card__version">${safeVer}</span>
            <span class="game-card__size">${safeSize}</span>
          </div>
          <p class="game-card__developer">${safeDev}</p>
        </div>
      </div>
      <div class="ripple-container"></div>
    </article>
  `;
};

/**
 * Buat skeleton card
 * @param {string} type - Tipe skeleton
 * @returns {string} HTML string
 */
export const createSkeletonCard = (type = 'default') => {
  if (type === 'compact') {
    return `
      <div class="game-card game-card--compact skeleton-card" aria-hidden="true">
        <div class="game-card__media">
          <div class="skeleton skeleton-banner"></div>
        </div>
        <div class="game-card__content">
          <div class="skeleton skeleton-icon"></div>
          <div class="game-card__info">
            <div class="skeleton skeleton-text" style="width: 70%"></div>
            <div class="skeleton skeleton-text" style="width: 50%"></div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="game-card skeleton-card" aria-hidden="true">
      <div class="game-card__media">
        <div class="skeleton skeleton-banner"></div>
      </div>
      <div class="game-card__content">
        <div class="skeleton skeleton-icon"></div>
        <div class="game-card__info">
          <div class="skeleton skeleton-text" style="width: 80%"></div>
          <div class="skeleton skeleton-text" style="width: 40%"></div>
          <div class="skeleton skeleton-text" style="width: 60%"></div>
        </div>
      </div>
    </div>
  `;
};

/**
 * Render list card games
 * @param {Array} games - Array data games
 * @param {string} type - Tipe card
 * @returns {string} HTML string
 */
export const renderGameCards = (games, type = 'default') => {
  if (!games || games.length === 0) {
    return `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        <p>Tidak ada game ditemukan</p>
      </div>
    `;
  }

  return games.map((game) => createGameCard(game, type)).join('');
};

/**
 * Render skeleton loading cards
 * @param {number} count - Jumlah skeleton
 * @param {string} type - Tipe card
 * @returns {string} HTML string
 */
export const renderSkeletonCards = (count = 6, type = 'default') => {
  return Array.from({ length: count }, () => createSkeletonCard(type)).join('');
};
