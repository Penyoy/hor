/**
 * GameHub - Storage Manager (Firebase Edition)
 * Mengelola data di Firebase Realtime Database + localStorage cache.
 *
 * Fitur:
 *   - Auto-login anonymous agar user nggak perlu login manual.
 *   - Semua data (favorites, downloads, searches, cache) tersimpan di cloud.
 *   - localStorage tetap digunakan sebagai cache lokal untuk read synchronous.
 *   - Real-time listener: jika data berubah di device lain, UI auto-update.
 */

import { CONFIG } from './config.js';

class StorageManager {
  constructor() {
    this.prefix = CONFIG.APP.NAME.toLowerCase();
    this.db = null;
    this.auth = null;
    this.user = null;
    this.initialized = false;
    this._listeners = [];
    this._init();
  }

  /* ================================================================
     INIT & AUTH
     ================================================================ */

  async _init() {
    // Tunggu firebase tersedia (dipastikan firebase-config.js dimuat duluan)
    let attempts = 0;
    while ((!window.firebase || !firebase.apps.length) && attempts < 50) {
      await new Promise((r) => setTimeout(r, 100));
      attempts++;
    }

    if (!window.firebase || !firebase.apps.length) {
      console.warn('[GameHub Storage] Firebase tidak tersedia, menggunakan localStorage only.');
      this.initialized = true;
      return;
    }

    this.db = firebase.database();
    this.auth = firebase.auth();

    // Pantau perubahan auth state
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.user = user;
        this.initialized = true;
        this._attachListeners();
        await this._hydrateFromCloud();
      } else {
        // Coba anonymous sign-in supaya setiap user punya UID unik
        try {
          await this.auth.signInAnonymously();
        } catch (err) {
          console.warn('[GameHub Storage] Anonymous auth gagal:', err.message);
          this.initialized = true;
        }
      }
    });
  }

  _userRef(path) {
    if (!this.user || !this.db) return null;
    return this.db.ref(`users/${this.user.uid}/${path}`);
  }

  /* ================================================================
     LOCAL CACHE HELPERS (tetap pakai localStorage sebagai cache)
     ================================================================ */

  _key(key) {
    return `${this.prefix}:${key}`;
  }

  _localSet(key, value) {
    try {
      localStorage.setItem(this._key(key), JSON.stringify(value));
    } catch (e) {
      console.error('localStorage set error:', e);
    }
  }

  _localGet(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(this._key(key));
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('localStorage get error:', e);
      return defaultValue;
    }
  }

  _localRemove(key) {
    localStorage.removeItem(this._key(key));
  }

  /* ================================================================
     FIREBASE SYNC
     ================================================================ */

  /** Ambil semua data dari cloud lalu timpa ke localStorage (one-time) */
  async _hydrateFromCloud() {
    const snap = await this._userRef('').once('value');
    const data = snap.val() || {};

    if (data.favorites) {
      this._localSet('favorites', Object.values(data.favorites));
    }
    if (data.downloads) {
      this._localSet('downloads', Object.values(data.downloads));
    }
    if (data.recentSearches) {
      this._localSet('recentSearches', data.recentSearches);
    }
    if (data.cache) {
      Object.entries(data.cache).forEach(([endpoint, cacheData]) => {
        this._localSet(`cache:${endpoint}`, cacheData);
      });
    }
  }

  /** Pasang real-time listener supaya perubahan di device lain langsung terasa */
  _attachListeners() {
    // Favorites
    const favRef = this._userRef('favorites');
    if (favRef) {
      const cb = favRef.on('value', (snap) => {
        const val = snap.val() || {};
        this._localSet('favorites', Object.values(val));
        document.dispatchEvent(new CustomEvent('gamehub:favorites-changed'));
      });
      this._listeners.push(() => favRef.off('value', cb));
    }

    // Downloads
    const dlRef = this._userRef('downloads');
    if (dlRef) {
      const cb = dlRef.on('value', (snap) => {
        const val = snap.val() || {};
        this._localSet('downloads', Object.values(val));
        document.dispatchEvent(new CustomEvent('gamehub:downloads-changed'));
      });
      this._listeners.push(() => dlRef.off('value', cb));
    }

    // Recent searches
    const rsRef = this._userRef('recentSearches');
    if (rsRef) {
      const cb = rsRef.on('value', (snap) => {
        const val = snap.val() || [];
        this._localSet('recentSearches', val);
      });
      this._listeners.push(() => rsRef.off('value', cb));
    }
  }

  /** Write object ke path Firebase (best-effort, tidak blocking) */
  _syncToFirebase(path, value) {
    if (!this.initialized || !this.user || !this.db) return;
    this._userRef(path)
      .set(value)
      .catch((err) => console.warn(`[GameHub Storage] Sync gagal (${path}):`, err.message));
  }

  /** Update partial object (untuk favorites/downloads per item) */
  _syncUpdateFirebase(path, value) {
    if (!this.initialized || !this.user || !this.db) return;
    this._userRef(path)
      .update(value)
      .catch((err) => console.warn(`[GameHub Storage] Update gagal (${path}):`, err.message));
  }

  /** Hapus child di Firebase */
  _syncRemoveFirebase(path, childKey) {
    if (!this.initialized || !this.user || !this.db) return;
    this._userRef(`${path}/${childKey}`)
      .remove()
      .catch((err) => console.warn(`[GameHub Storage] Remove gagal (${path}/${childKey}):`, err.message));
  }

  /* ================================================================
     PUBLIC API (kompatibel 100% dengan versi lokal sebelumnya)
     ================================================================ */

  set(key, value) {
    this._localSet(key, value);
    // Jika bukan cache, sync juga (opsional, bisa diperluas jika perlu)
  }

  get(key, defaultValue = null) {
    return this._localGet(key, defaultValue);
  }

  remove(key) {
    this._localRemove(key);
  }

  clear() {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(this.prefix));
    keys.forEach((k) => localStorage.removeItem(k));

    // Hapus semua data user di Firebase juga
    if (this.user && this.db) {
      this._userRef('').remove().catch(() => {});
    }
  }

  /* ---------- Favorites ---------- */

  addFavorite(game) {
    const favorites = this.get('favorites', []);
    if (!favorites.some((g) => g.id === game.id)) {
      favorites.push(game);
      this._localSet('favorites', favorites);
      this._syncUpdateFirebase('favorites', { [game.id]: game });
      document.dispatchEvent(new CustomEvent('gamehub:favorites-changed'));
    }
  }

  removeFavorite(gameId) {
    const favorites = this.get('favorites', []);
    const filtered = favorites.filter((g) => g.id !== gameId);
    this._localSet('favorites', filtered);
    this._syncRemoveFirebase('favorites', gameId);
    document.dispatchEvent(new CustomEvent('gamehub:favorites-changed'));
  }

  isFavorite(gameId) {
    const favorites = this.get('favorites', []);
    return favorites.some((g) => g.id === gameId);
  }

  toggleFavorite(game) {
    if (this.isFavorite(game.id)) {
      this.removeFavorite(game.id);
      return false;
    }
    this.addFavorite(game);
    return true;
  }

  getFavorites() {
    return this.get('favorites', []);
  }

  /* ---------- Downloads ---------- */

  addDownload(game) {
    const downloads = this.get('downloads', []);
    const filtered = downloads.filter((g) => g.id !== game.id);
    const entry = { ...game, downloadedAt: Date.now() };
    filtered.unshift(entry);
    this._localSet('downloads', filtered);
    this._syncUpdateFirebase('downloads', { [game.id]: entry });
    document.dispatchEvent(new CustomEvent('gamehub:downloads-changed'));
  }

  removeDownload(gameId) {
    const downloads = this.get('downloads', []);
    const filtered = downloads.filter((g) => g.id !== gameId);
    this._localSet('downloads', filtered);
    this._syncRemoveFirebase('downloads', gameId);
    document.dispatchEvent(new CustomEvent('gamehub:downloads-changed'));
  }

  isDownloaded(gameId) {
    const downloads = this.get('downloads', []);
    return downloads.some((g) => g.id === gameId);
  }

  getDownloads() {
    return this.get('downloads', []);
  }

  /* ---------- API Cache ---------- */

  setCache(endpoint, data) {
    const cache = { data, timestamp: Date.now() };
    this._localSet(`cache:${endpoint}`, cache);
    // Encode endpoint agar aman jadi key Firebase
    const safeKey = endpoint.replace(/[.#$[\]]/g, '_');
    this._syncUpdateFirebase('cache', { [safeKey]: cache });
  }

  getCache(endpoint, maxAge = CONFIG.CACHE?.MAX_AGE || 3600000) {
    const cache = this._localGet(`cache:${endpoint}`);
    if (!cache) return null;
    if (Date.now() - cache.timestamp > maxAge) {
      this.removeCache(endpoint);
      return null;
    }
    return cache.data;
  }

  removeCache(endpoint) {
    this._localRemove(`cache:${endpoint}`);
    const safeKey = endpoint.replace(/[.#$[\]]/g, '_');
    this._syncRemoveFirebase('cache', safeKey);
  }

  clearCache() {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(`${this.prefix}:cache:`));
    keys.forEach((k) => localStorage.removeItem(k));
    this._syncToFirebase('cache', null);
  }

  /* ---------- Recent Searches ---------- */

  addRecentSearch(query) {
    const searches = this.get('recentSearches', []);
    const filtered = searches.filter((s) => s !== query);
    filtered.unshift(query);
    const trimmed = filtered.slice(0, 10);
    this._localSet('recentSearches', trimmed);
    this._syncToFirebase('recentSearches', trimmed);
  }

  getRecentSearches() {
    return this.get('recentSearches', []);
  }

  clearRecentSearches() {
    this._localRemove('recentSearches');
    this._syncToFirebase('recentSearches', null);
  }
}

// Export singleton instance
const storage = new StorageManager();

// Expose sebagai global juga untuk backward compatibility
window.GameHubStorage = storage;

export default storage;
