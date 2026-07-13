/**
 * GameHub - Mock API Data & Service
 * File ini menyediakan data game dan fungsi API untuk development/testing.
 * Semua gambar pakai placeholder agar selalu ke-load.
 */

import storage from './storage.js';

// ============================================
// DATA GAME
// ============================================

const GAMES_DATA = [
  {
    id: "Tes",
    title: "Tes",
    banner: "https://cdn.phototourl.com/free/2026-07-13-3b29d532-c071-49f5-8649-e84f7459060e.jpg",
    icon: "https://cdn.phototourl.com/free/2026-07-13-3b29d532-c071-49f5-8649-e84f7459060e.jpg",
    description: "Tes image",
    rating: 5,
    version: "1.21.1",
    size: "285 MB",
    developer: "penyoy",
    category: "Sandbox",
    downloads: "100M+",
    updated: "2026-07-01",
    screenshots: [
      "https://placehold.co/800x450/1a1a2e/4ade80?text=Screenshot+1&font=roboto",
      "https://placehold.co/800x450/1a1a2e/4ade80?text=Screenshot+2&font=roboto",
      "https://placehold.co/800x450/1a1a2e/4ade80?text=Screenshot+3&font=roboto"
    ],
    download: "https://www.minecraft.net/id-id/download",
    features: [
      "Offline Mode",
      "Multiplayer Online",
      "Cross-Platform",
      "Mod Support",
      "Realms Server",
      "Marketplace Konten"
    ],
    changelog: [
      {
        version: "1.21.1",
        date: "2026-07-01",
        changes: [
          "Perbaikan bug pada sistem redstone",
          "Peningkatan performa rendering",
          "Penambahan blok baru: Pale Oak",
          "Perbaikan stabilitas multiplayer"
        ]
      },
      {
        version: "1.21.0",
        date: "2026-06-15",
        changes: [
          "Trial Chambers update",
          "Mace weapon baru",
          "Breeze dan Bogged mob",
          "Auto-crafting crafter"
        ]
      }
    ],
    isTrending: true,
    isNew: true,
    isEditorsChoice: true,
    hasUpdate: true
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

const toListItem = (game) => ({
  id: game.id,
  title: game.title,
  banner: game.banner,
  icon: game.icon,
  rating: game.rating,
  size: game.size,
  version: game.version,
  developer: game.developer,
  category: game.category,
  downloads: game.downloads,
  updated: game.updated
});

const toDetailItem = (game) => ({ ...game });

// ============================================
// MOCK API SERVICE
// ============================================

class MockApiService {
  constructor() {
    this.data = GAMES_DATA;
  }

  async getGames(filter = '') {
    await delay();
    let result = this.data.map(toListItem);

    if (filter) {
      const params = new URLSearchParams(filter);
      if (params.get('trending') === 'true') {
        result = this.data.filter(g => g.isTrending).map(toListItem);
      } else if (params.get('new') === 'true') {
        result = this.data.filter(g => g.isNew).map(toListItem);
      } else if (params.get('editors') === 'true') {
        result = this.data.filter(g => g.isEditorsChoice).map(toListItem);
      } else if (params.get('updates') === 'true') {
        result = this.data.filter(g => g.hasUpdate).map(toListItem);
      } else if (params.get('search')) {
        const query = params.get('search').toLowerCase();
        result = this.data.filter(g => 
          g.title.toLowerCase().includes(query) ||
          g.category.toLowerCase().includes(query) ||
          g.developer.toLowerCase().includes(query)
        ).map(toListItem);
      }
    }
    return result;
  }

  async getTrending() {
    await delay();
    return this.data.filter(g => g.isTrending).map(toListItem);
  }

  async getNewGames() {
    await delay();
    return this.data.filter(g => g.isNew).map(toListItem);
  }

  async getEditorsChoice() {
    await delay();
    return this.data.filter(g => g.isEditorsChoice).map(toListItem);
  }

  async getUpdates() {
    await delay();
    return this.data.filter(g => g.hasUpdate).map(toListItem);
  }

  async getGame(id) {
    await delay(400);
    const game = this.data.find(g => g.id === id);
    if (!game) {
      throw new Error(`Game dengan ID "${id}" tidak ditemukan`);
    }
    return toDetailItem(game);
  }

  async searchGames(query) {
    if (!query || query.trim().length === 0) return [];
    await delay(200);
    const q = query.toLowerCase().trim();
    return this.data.filter(g => 
      g.title.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.developer.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q)
    ).map(toListItem);
  }

  async getFavorites() {
    await delay(200);
    const favorites = storage.getFavorites ? storage.getFavorites() : [];
    if (favorites.length === 0) return [];
    const favoriteIds = favorites.map(f => f.id);
    return this.data.filter(g => favoriteIds.includes(g.id)).map(toListItem);
  }

  async getByCategory(category) {
    await delay();
    return this.data.filter(g => g.category.toLowerCase() === category.toLowerCase()).map(toListItem);
  }

  async getCategories() {
    await delay();
    const categories = [...new Set(this.data.map(g => g.category))];
    return categories.map(cat => ({
      name: cat,
      count: this.data.filter(g => g.category === cat).length,
      games: this.data.filter(g => g.category === cat).slice(0, 3).map(toListItem)
    }));
  }

  async getRelated(id, limit = 4) {
    await delay();
    const game = this.data.find(g => g.id === id);
    if (!game) return [];
    return this.data.filter(g => g.id !== id && g.category === game.category).slice(0, limit).map(toListItem);
  }
}

// ============================================
// MOCK FETCH API INTERCEPTOR
// ============================================

export function setupMockFetch() {
  const mockApi = new MockApiService();
  const originalFetch = window.fetch;

  window.fetch = async function(url, options = {}) {
    if (typeof url === 'string' && url.includes('/api/')) {
      try {
        const urlObj = new URL(url, window.location.origin);
        const path = urlObj.pathname;
        const params = urlObj.searchParams;

        let data;
        if (path === '/api/games') {
          if (params.has('trending')) {
            data = await mockApi.getTrending();
          } else if (params.has('new')) {
            data = await mockApi.getNewGames();
          } else if (params.has('editors')) {
            data = await mockApi.getEditorsChoice();
          } else if (params.has('updates')) {
            data = await mockApi.getUpdates();
          } else if (params.has('search')) {
            data = await mockApi.searchGames(params.get('search'));
          } else {
            data = await mockApi.getGames();
          }
        } else if (path === '/api/game') {
          const id = params.get('id');
          data = await mockApi.getGame(id);
        } else {
          return originalFetch(url, options);
        }

        return new Response(JSON.stringify(data), {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 404,
          statusText: 'Not Found',
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    return originalFetch(url, options);
  };
}

const mockApi = new MockApiService();
export { mockApi, MockApiService, GAMES_DATA };
export default mockApi;
