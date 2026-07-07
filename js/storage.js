/**
 * GameHub - Storage Manager
 * Mengelola localStorage dan sessionStorage dengan aman.
 */

import { CONFIG } from './config.js';

class StorageManager {
  constructor() {
    this.prefix = CONFIG.APP.NAME.toLowerCase();
  }

  /**
   * Get key dengan prefix
   * @param {string} key 
   * @returns {string}
   */
  _key(key) {
    return `${this.prefix}:${key}`;
  }

  /**
   * Simpan data ke localStorage
   * @param {string} key 
   * @param {any} value 
   */
  set(key, value) {
    try {
      const data = JSON.stringify(value);
      localStorage.setItem(this._key(key), data);
    } catch (e) {
      console.error('Storage set error:', e);
    }
  }

  /**
   * Ambil data dari localStorage
   * @param {string} key 
   * @param {any} defaultValue 
   * @returns {any}
   */
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(this._key(key));
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Storage get error:', e);
      return defaultValue;
    }
  }

  /**
   * Hapus data dari localStorage
   * @param {string} key 
   */
  remove(key) {
    localStorage.removeItem(this._key(key));
  }

  /**
   * Clear semua data dengan prefix
   */
  clear() {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(this.prefix));
    keys.forEach((k) => localStorage.removeItem(k));
  }

  /**
   * Simpan favorite game
   * @param {string} gameId 
   */
  addFavorite(gameId) {
    const favorites = this.get('favorites', []);
    if (!favorites.includes(gameId)) {
      favorites.push(gameId);
      this.set('favorites', favorites);
    }
  }

  /**
   * Hapus favorite game
   * @param {string} gameId 
   */
  removeFavorite(gameId) {
    const favorites = this.get('favorites', []);
    const filtered = favorites.filter((id) => id !== gameId);
    this.set('favorites', filtered);
  }

  /**
   * Check apakah game difavoritkan
   * @param {string} gameId 
   * @returns {boolean}
   */
  isFavorite(gameId) {
    const favorites = this.get('favorites', []);
    return favorites.includes(gameId);
  }

  /**
   * Toggle favorite
   * @param {string} gameId 
   * @returns {boolean} Status favorit sekarang
   */
  toggleFavorite(gameId) {
    if (this.isFavorite(gameId)) {
      this.removeFavorite(gameId);
      return false;
    }
    this.addFavorite(gameId);
    return true;
  }

  /**
   * Get semua favorites
   * @returns {string[]}
   */
  getFavorites() {
    return this.get('favorites', []);
  }

  /**
   * Simpan cache API
   * @param {string} endpoint 
   * @param {any} data 
   */
  setCache(endpoint, data) {
    const cache = {
      data,
      timestamp: Date.now()
    };
    this.set(`cache:${endpoint}`, cache);
  }

  /**
   * Get cache API
   * @param {string} endpoint 
   * @param {number} maxAge - Max age dalam ms
   * @returns {any|null}
   */
  getCache(endpoint, maxAge = CONFIG.CACHE.MAX_AGE) {
    const cache = this.get(`cache:${endpoint}`);
    if (!cache) return null;
    if (Date.now() - cache.timestamp > maxAge) {
      this.remove(`cache:${endpoint}`);
      return null;
    }
    return cache.data;
  }

  /**
   * Clear all cache
   */
  clearCache() {
    const keys = Object.keys(localStorage).filter(
      (k) => k.startsWith(`${this.prefix}:cache:`)
    );
    keys.forEach((k) => localStorage.removeItem(k));
  }

  /**
   * Simpan recent searches
   * @param {string} query 
   */
  addRecentSearch(query) {
    const searches = this.get('recentSearches', []);
    const filtered = searches.filter((s) => s !== query);
    filtered.unshift(query);
    this.set('recentSearches', filtered.slice(0, 10));
  }

  /**
   * Get recent searches
   * @returns {string[]}
   */
  getRecentSearches() {
    return this.get('recentSearches', []);
  }

  /**
   * Clear recent searches
   */
  clearRecentSearches() {
    this.remove('recentSearches');
  }
}

// Export singleton instance
const storage = new StorageManager();
export default storage;
