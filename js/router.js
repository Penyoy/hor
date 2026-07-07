/**
 * GameHub - Client-side Router
 * Menangani navigasi antar halaman.
 */

import { CONFIG } from './config.js';

/**
 * Navigasi ke halaman baru
 * @param {string} path - Path tujuan
 * @param {boolean} pushState - Apakah push state ke history
 */
export const navigateTo = (path, pushState = true) => {
  if (pushState) {
    window.history.pushState({ path }, '', path);
  }
  window.location.href = path;
};

/**
 * Get current route info
 * @returns {object}
 */
export const getCurrentRoute = () => {
  const path = window.location.pathname;
  const search = window.location.search;
  const hash = window.location.hash;

  return {
    path,
    search,
    hash,
    params: new URLSearchParams(search),
    isHome: path === '/' || path === '/index.html',
    isDetail: path.includes('/detail'),
    isSearch: path.includes('/search'),
    isAbout: path.includes('/about')
  };
};

/**
 * Get query parameter dari URL
 * @param {string} key 
 * @returns {string|null}
 */
export const getQueryParam = (key) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
};

/**
 * Build URL dengan query parameters
 * @param {string} basePath 
 * @param {object} params 
 * @returns {string}
 */
export const buildUrl = (basePath, params = {}) => {
  const url = new URL(basePath, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });
  return url.pathname + url.search;
};

/**
 * Handle popstate events (back/forward button)
 * @param {Function} callback 
 */
export const onRouteChange = (callback) => {
  window.addEventListener('popstate', () => {
    callback(getCurrentRoute());
  });
};

/**
 * Parse route parameters dari path
 * @param {string} pattern - Pattern seperti '/game/:id'
 * @param {string} path - Actual path
 * @returns {object|null}
 */
export const parseRouteParams = (pattern, path) => {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);

  if (patternParts.length !== pathParts.length) {
    return null;
  }

  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      const key = patternParts[i].slice(1);
      params[key] = decodeURIComponent(pathParts[i]);
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
};

/**
 * Scroll ke element dengan ID (hash navigation)
 * @param {string} hash 
 */
export const scrollToHash = (hash) => {
  if (!hash) return;
  const element = document.querySelector(hash);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Initialize router
 */
export const initRouter = () => {
  // Handle initial hash
  if (window.location.hash) {
    scrollToHash(window.location.hash);
  }

  // Handle hash changes
  window.addEventListener('hashchange', () => {
    scrollToHash(window.location.hash);
  });
};
