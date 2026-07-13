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
   * Simpan favorite game (objek game lengkap: id, title, category, rating, dll)
   * @param {object} game
   */
  addFavorite(game) {
    const favorites = this.get('favorites', []);
    if (!favorites.some((g) => g.id === game.id)) {
      favorites.push(game);
      this.set('favorites', favorites);
      document.dispatchEvent(new CustomEvent('gamehub:favorites-changed'));
    }
  }

  /**
   * Hapus favorite game
   * @param {string} gameId 
   */
  removeFavorite(gameId) {
    const favorites = this.get('favorites', []);
    const filtered = favorites.filter((g) => g.id !== gameId);
    this.set('favorites', filtered);
    document.dispatchEvent(new CustomEvent('gamehub:favorites-changed'));
  }

  /**
   * Check apakah game difavoritkan
   * @param {string} gameId 
   * @returns {boolean}
   */
  isFavorite(gameId) {
    const favorites = this.get('favorites', []);
    return favorites.some((g) => g.id === gameId);
  }

  /**
   * Toggle favorite
   * @param {object} game - objek game lengkap (harus punya properti id)
   * @returns {boolean} Status favorit sekarang
   */
  toggleFavorite(game) {
    if (this.isFavorite(game.id)) {
      this.removeFavorite(game.id);
      return false;
    }
    this.addFavorite(game);
    return true;
  }

  /**
   * Get semua favorites
   * @returns {object[]}
   */
  getFavorites() {
    return this.get('favorites', []);
  }

  /**
   * Simpan riwayat download (objek game lengkap: id, title, size, dll)
   * @param {object} game
   */
  addDownload(game) {
    const downloads = this.get('downloads', []);
    const filtered = downloads.filter((g) => g.id !== game.id);
    filtered.unshift({ ...game, downloadedAt: Date.now() });
    this.set('downloads', filtered);
    document.dispatchEvent(new CustomEvent('gamehub:downloads-changed'));
  }

  /**
   * Hapus dari riwayat download
   * @param {string} gameId
   */
  removeDownload(gameId) {
    const downloads = this.get('downloads', []);
    const filtered = downloads.filter((g) => g.id !== gameId);
    this.set('downloads', filtered);
    document.dispatchEvent(new CustomEvent('gamehub:downloads-changed'));
  }

  /**
   * Check apakah game sudah pernah diunduh
   * @param {string} gameId
   * @returns {boolean}
   */
  isDownloaded(gameId) {
    const downloads = this.get('downloads', []);
    return downloads.some((g) => g.id === gameId);
  }

  /**
   * Get semua riwayat download
   * @returns {object[]}
   */
  getDownloads() {
    return this.get('downloads', []);
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

// Expose sebagai global juga, karena beberapa halaman (favorites-page.js,
// downloads-page.js, detail-actions.js) memuat storage.js sebagai dependency
// dan memanggilnya lewat variabel global `GameHubStorage`, bukan lewat import.
window.GameHubStorage = storage;

export default storage;
