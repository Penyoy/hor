/**
 * GameHub - API Service (Mock Mode)
 * API asli diganti dengan data lokal karena server down.
 */

import { mockApi } from './games.js';

// Export mockApi sebagai pengganti ApiService
export default mockApi;
export { mockApi as api };

