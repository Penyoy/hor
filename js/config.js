/**
 * GameHub - Configuration File
 * Semua pengaturan API dan aplikasi dapat diubah di sini.
 */

const CONFIG = {
  // API Endpoints - Ubah URL API di sini
  API: {
    BASE_URL: '',
    GAMES: '/api/games',
    GAME: '/api/game',
    TRENDING: '/api/games?trending=true',
    NEW: '/api/games?new=true',
    EDITORS_CHOICE: '/api/games?editors=true',
    UPDATES: '/api/games?updates=true',
    SEARCH: '/api/games?search='
  },

  // App Settings
  APP: {
    NAME: 'Pgames',
    VERSION: '1.0.0',
    DESCRIPTION: 'Platform distribusi game modern dan premium',
    AUTHOR: 'GameHub Team',
    THEME_COLOR: '#0D0D0D',
    PRIMARY_COLOR: '#4F8CFF',
    LANG: 'id'
  },

  // Pagination
  PAGINATION: {
    LIMIT: 20,
    OFFSET: 0
  },

  // Animation
  ANIMATION: {
    DURATION: 300,
    EASING: 'cubic-bezier(0.4, 0, 0.2, 1)',
    STAGGER: 50
  },

  // Timeout
  TIMEOUT: {
    API: 15000,
    DEBOUNCE: 300
  },

  // Cache
  CACHE: {
    NAME: 'gamehub-cache-v1',
    MAX_AGE: 24 * 60 * 60 * 1000 // 24 jam
  }
};

// Helper untuk mendapatkan full URL API
const getApiUrl = (endpoint, params = '') => {
  const base = CONFIG.API.BASE_URL;
  const path = endpoint + (params ? params : '');
  return `${base}${path}`;
};

export { CONFIG, getApiUrl };
