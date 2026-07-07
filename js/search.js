/**
 * GameHub - Search Page Module
 * Mengelola semua fungsionalitas halaman pencarian.
 */

import api from './api.js';
import storage from './storage.js';
import { debounce, escapeHtml, copyToClipboard } from './utils.js';
import { createGameCard, renderSkeletonCards } from '../components/card.js';
import { showSuccess, showError } from '../components/toast.js';
import { lazyLoadImages } from './utils.js';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const searchStats = document.getElementById('searchStats');
const recentSearches = document.getElementById('recentSearches');
const recentSearchesList = document.getElementById('recentSearchesList');
const searchResults = document.getElementById('searchResults');
const searchResultsGrid = document.getElementById('searchResultsGrid');
const noResults = document.getElementById('noResults');
const noResultsQuery = document.getElementById('noResultsQuery');
const clearRecent = document.getElementById('clearRecent');

// State
let currentQuery = '';

/**
 * Render recent searches
 */
const renderRecentSearches = () => {
  const searches = storage.getRecentSearches();

  if (searches.length === 0) {
    recentSearches.style.display = 'none';
    return;
  }

  recentSearches.style.display = 'block';
  recentSearchesList.innerHTML = searches.map((query) => `
    <div class="recent-search__item" data-query="${escapeHtml(query)}">
      <div class="recent-search__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      </div>
      <span class="recent-search__text">${escapeHtml(query)}</span>
      <button class="recent-search__remove" data-query="${escapeHtml(query)}" aria-label="Hapus ${escapeHtml(query)}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
  `).join('');

  // Add click listeners
  recentSearchesList.querySelectorAll('.recent-search__item').forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.recent-search__remove')) return;
      const query = item.dataset.query;
      searchInput.value = query;
      performSearch(query);
    });
  });

  // Add remove listeners
  recentSearchesList.querySelectorAll('.recent-search__remove').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const query = btn.dataset.query;
      removeRecentSearch(query);
    });
  });
};

/**
 * Remove a recent search
 * @param {string} query 
 */
const removeRecentSearch = (query) => {
  const searches = storage.getRecentSearches().filter((s) => s !== query);
  storage.set('recentSearches', searches);
  renderRecentSearches();
};

/**
 * Clear all recent searches
 */
const clearAllRecentSearches = () => {
  storage.clearRecentSearches();
  renderRecentSearches();
};

/**
 * Perform search
 * @param {string} query 
 */
const performSearch = async (query) => {
  currentQuery = query;

  if (!query || query.trim().length === 0) {
    showInitialState();
    return;
  }

  // Save to recent searches
  storage.addRecentSearch(query);
  renderRecentSearches();

  // Show loading
  searchResults.style.display = 'block';
  searchResultsGrid.innerHTML = renderSkeletonCards(6);
  searchStats.style.display = 'none';
  noResults.style.display = 'none';
  recentSearches.style.display = 'none';

  // Update clear button
  searchClear.classList.add('visible');

  try {
    const results = await api.searchGames(query);

    if (results && results.length > 0) {
      // Highlight search query in results
      const highlightedResults = results.map((game) => ({
        ...game,
        _highlightedTitle: highlightText(game.title || '', query)
      }));

      searchResultsGrid.innerHTML = highlightedResults.map((game) =>
        createSearchResultCard(game, query)
      ).join('');

      // Add click listeners
      searchResultsGrid.querySelectorAll('.game-card').forEach((card) => {
        card.addEventListener('click', () => {
          const id = card.dataset.id;
          if (id) {
            window.location.href = `detail.html?id=${encodeURIComponent(id)}`;
          }
        });
      });

      // Show stats
      searchStats.innerHTML = `Ditemukan <span class="search-stats__highlight">${results.length}</span> hasil untuk "<span class="search-stats__highlight">${escapeHtml(query)}</span>"`;
      searchStats.style.display = 'block';

      lazyLoadImages('#searchResultsGrid img[data-src]');
    } else {
      searchResults.style.display = 'none';
      searchStats.style.display = 'none';
      noResultsQuery.textContent = query;
      noResults.style.display = 'flex';
    }
  } catch (error) {
    console.error('Search error:', error);
    searchResults.style.display = 'none';
    showError('Gagal mencari game. Silakan coba lagi.');
  }
};

/**
 * Create search result card with highlighted text
 * @param {object} game 
 * @param {string} query 
 * @returns {string}
 */
const createSearchResultCard = (game, query) => {
  // Override the title with highlighted version
  const card = createGameCard(game);
  if (game._highlightedTitle) {
    return card.replace(
      `<h3 class="game-card__title">${escapeHtml(game.title || '')}</h3>`,
      `<h3 class="game-card__title">${game._highlightedTitle}</h3>`
    );
  }
  return card;
};

/**
 * Highlight search query in text
 * @param {string} text 
 * @param {string} query 
 * @returns {string}
 */
const highlightText = (text, query) => {
  if (!text || !query) return escapeHtml(text);
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return escapeHtml(text).replace(regex, '<span class="search-highlight">$1</span>');
};

/**
 * Escape regex special characters
 * @param {string} string 
 * @returns {string}
 */
const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Show initial state (recent searches)
 */
const showInitialState = () => {
  searchResults.style.display = 'none';
  searchStats.style.display = 'none';
  noResults.style.display = 'none';
  searchClear.classList.remove('visible');
  renderRecentSearches();
};

/**
 * Initialize search page
 */
const initSearchPage = () => {
  // Render recent searches
  renderRecentSearches();

  // Check URL params for query
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') || params.get('search');
  const filter = params.get('filter');

  if (query) {
    searchInput.value = query;
    performSearch(query);
  } else if (filter) {
    searchInput.value = '';
    performSearch(filter);
  }

  // Search input debounce
  const debouncedSearch = debounce((value) => {
    performSearch(value);
  }, 400);

  searchInput?.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value.length > 0) {
      searchClear.classList.add('visible');
    } else {
      searchClear.classList.remove('visible');
    }
    debouncedSearch(value);
  });

  // Clear button
  searchClear?.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.classList.remove('visible');
    searchInput.focus();
    showInitialState();
  });

  // Clear all recent
  clearRecent?.addEventListener('click', clearAllRecentSearches);

  // Focus input
  searchInput?.focus();
};

// Run init
document.addEventListener('DOMContentLoaded', initSearchPage);
