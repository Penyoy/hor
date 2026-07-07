/**
 * GameHub - API Service
 * Mengelola semua request ke API dengan error handling dan caching.
 */

import { CONFIG, getApiUrl } from './config.js';
import { sanitizeData } from './utils.js';
import storage from './storage.js';

class ApiService {
  constructor() {
    this.abortControllers = new Map();
  }

  /**
   * Membuat AbortController untuk request
   * @param {string} key - Unique key untuk request
   * @returns {AbortSignal}
   */
  getSignal(key) {
    // Cancel request sebelumnya dengan key yang sama
    if (this.abortControllers.has(key)) {
      this.abortControllers.get(key).abort();
    }
    const controller = new AbortController();
    this.abortControllers.set(key, controller);
    return controller.signal;
  }

  /**
   * Request ke API dengan timeout dan error handling
   * @param {string} url - Full URL
   * @param {object} options - Fetch options
   * @param {string} abortKey - Key untuk abort controller
   * @returns {Promise<any>}
   */
  async request(url, options = {}, abortKey = 'default') {
    const signal = this.getSignal(abortKey);

    const timeoutId = setTimeout(() => {
      if (this.abortControllers.has(abortKey)) {
        this.abortControllers.get(abortKey).abort();
      }
    }, CONFIG.TIMEOUT.API);

    try {
      const response = await fetch(url, {
        ...options,
        signal,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...options.headers
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status
        );
      }

      const data = await response.json();
      return Array.isArray(data) ? data.map(sanitizeData) : sanitizeData(data);
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new ApiError('Request dibatalkan atau timeout', 408);
      }
      throw error;
    } finally {
      this.abortControllers.delete(abortKey);
    }
  }

  /**
   * Get semua games
   * @param {string} filter - Filter query (trending, new, dll)
   * @returns {Promise<Array>}
   */
  async getGames(filter = '') {
    const cacheKey = `games_${filter || 'all'}`;
    const cached = storage.getCache(cacheKey);
    if (cached) return cached;

    const params = filter ? `?${filter}` : '';
    const url = getApiUrl(CONFIG.API.GAMES, params);
    const data = await this.request(url);
    storage.setCache(cacheKey, data);
    return data;
  }

  /**
   * Get trending games
   * @returns {Promise<Array>}
   */
  async getTrending() {
    const cached = storage.getCache('trending');
    if (cached) return cached;

    const url = getApiUrl(CONFIG.API.TRENDING);
    const data = await this.request(url, {}, 'trending');
    storage.setCache('trending', data);
    return data;
  }

  /**
   * Get new games
   * @returns {Promise<Array>}
   */
  async getNewGames() {
    const cached = storage.getCache('new_games');
    if (cached) return cached;

    const url = getApiUrl(CONFIG.API.NEW);
    const data = await this.request(url, {}, 'new_games');
    storage.setCache('new_games', data);
    return data;
  }

  /**
   * Get editor's choice
   * @returns {Promise<Array>}
   */
  async getEditorsChoice() {
    const cached = storage.getCache('editors_choice');
    if (cached) return cached;

    const url = getApiUrl(CONFIG.API.EDITORS_CHOICE);
    const data = await this.request(url, {}, 'editors_choice');
    storage.setCache('editors_choice', data);
    return data;
  }

  /**
   * Get updates
   * @returns {Promise<Array>}
   */
  async getUpdates() {
    const cached = storage.getCache('updates');
    if (cached) return cached;

    const url = getApiUrl(CONFIG.API.UPDATES);
    const data = await this.request(url, {}, 'updates');
    storage.setCache('updates', data);
    return data;
  }

  /**
   * Get detail game
   * @param {string} id - Game ID
   * @returns {Promise<object>}
   */
  async getGame(id) {
    if (!id) throw new ApiError('ID game diperlukan', 400);

    const cacheKey = `game_${id}`;
    const cached = storage.getCache(cacheKey);
    if (cached) return cached;

    const url = getApiUrl(CONFIG.API.GAME, `?id=${encodeURIComponent(id)}`);
    const data = await this.request(url, {}, `game_${id}`);
    storage.setCache(cacheKey, data);
    return data;
  }

  /**
   * Search games
   * @param {string} query - Search query
   * @returns {Promise<Array>}
   */
  async searchGames(query) {
    if (!query || query.trim().length === 0) return [];

    const url = getApiUrl(CONFIG.API.SEARCH, encodeURIComponent(query.trim()));
    const data = await this.request(url, {}, `search_${query}`);
    return data;
  }

  /**
   * Get favorites dari storage
   * @returns {Promise<Array>}
   */
  async getFavorites() {
    const favoriteIds = storage.getFavorites();
    if (favoriteIds.length === 0) return [];

    const allGames = await this.getGames();
    return allGames.filter((game) => favoriteIds.includes(game.id));
  }
}

/**
 * Custom API Error class
 */
class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Export singleton instance
const api = new ApiService();
export default api;
export { ApiError };
