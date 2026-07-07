/**
 * GameHub - Loading Component
 * Skeleton loading, spinner, dan error state.
 */

/**
 * Buat spinner loading
 * @param {string} size - Ukuran spinner (small, medium, large)
 * @param {string} color - Warna spinner
 * @returns {string} HTML string
 */
export const createSpinner = (size = 'medium', color = '#4F8CFF') => {
  const sizes = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };
  const s = sizes[size] || sizes.medium;

  return `
    <div class="spinner" style="width: ${s}; height: ${s};" role="status" aria-label="Loading">
      <svg viewBox="0 0 50 50">
        <circle 
          cx="25" cy="25" r="20" 
          fill="none" 
          stroke="${color}" 
          stroke-width="4"
          stroke-linecap="round"
          stroke-dasharray="80"
          stroke-dashoffset="60"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  `;
};

/**
 * Buat skeleton loading block
 * @param {object} options - Options
 * @returns {string} HTML string
 */
export const createSkeleton = (options = {}) => {
  const {
    type = 'text', // text, image, card, banner, circle
    width = '100%',
    height = null,
    lines = 3,
    count = 1
  } = options;

  if (type === 'text') {
    const lineWidths = ['100%', '85%', '60%', '75%', '90%'];
    const linesHtml = Array.from({ length: lines }, (_, i) => `
      <div class="skeleton skeleton-text" style="width: ${lineWidths[i % lineWidths.length]}"></div>
    `).join('');

    return `<div class="skeleton-block" style="width: ${width}">${linesHtml}</div>`;
  }

  if (type === 'image') {
    const h = height || '200px';
    return `<div class="skeleton skeleton-image" style="width: ${width}; height: ${h}"></div>`;
  }

  if (type === 'circle') {
    const s = height || '48px';
    return `<div class="skeleton skeleton-circle" style="width: ${s}; height: ${s}"></div>`;
  }

  if (type === 'banner') {
    return `<div class="skeleton skeleton-banner" style="width: ${width}; height: ${height || '200px'}"></div>`;
  }

  if (type === 'card') {
    const cardsHtml = Array.from({ length: count }, () => `
      <div class="game-card skeleton-card" aria-hidden="true">
        <div class="game-card__media">
          <div class="skeleton skeleton-banner"></div>
        </div>
        <div class="game-card__content">
          <div class="skeleton skeleton-icon"></div>
          <div class="game-card__info">
            <div class="skeleton skeleton-text" style="width: 80%"></div>
            <div class="skeleton skeleton-text" style="width: 50%"></div>
            <div class="skeleton skeleton-text" style="width: 65%"></div>
          </div>
        </div>
      </div>
    `).join('');
    return `<div class="skeleton-grid">${cardsHtml}</div>`;
  }

  return '';
};

/**
 * Buat error state
 * @param {object} options - Options
 * @returns {string} HTML string
 */
export const createErrorState = (options = {}) => {
  const {
    message = 'Terjadi kesalahan saat memuat data',
    submessage = 'Silakan coba lagi',
    retryCallback = null
  } = options;

  return `
    <div class="error-state" role="alert">
      <svg class="error-state__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
        <path d="M9 9h.01M15 9h.01"/>
      </svg>
      <h3 class="error-state__title">${message}</h3>
      <p class="error-state__submessage">${submessage}</p>
      ${retryCallback ? `
        <button class="btn btn--primary btn--retry" onclick="${retryCallback}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
          Coba Lagi
        </button>
      ` : ''}
    </div>
  `;
};

/**
 * Buat empty state
 * @param {object} options - Options
 * @returns {string} HTML string
 */
export const createEmptyState = (options = {}) => {
  const {
    icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
    title = 'Tidak ada data',
    message = 'Belum ada konten yang tersedia'
  } = options;

  return `
    <div class="empty-state">
      <div class="empty-state__icon">${icon}</div>
      <h3 class="empty-state__title">${title}</h3>
      <p class="empty-state__message">${message}</p>
    </div>
  `;
};

/**
 * Tampilkan loading overlay
 * @param {HTMLElement} container - Container element
 * @param {string} message - Pesan loading
 * @returns {object} Controller
 */
export const showLoading = (container, message = 'Memuat...') => {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.innerHTML = `
    ${createSpinner('medium')}
    <p class="loading-overlay__text">${message}</p>
  `;

  container.style.position = 'relative';
  container.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.add('active');
  });

  return {
    hide: () => {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
    },
    updateMessage: (msg) => {
      const textEl = overlay.querySelector('.loading-overlay__text');
      if (textEl) textEl.textContent = msg;
    }
  };
};

/**
 * Tampilkan shimmer loading pada container
 * @param {HTMLElement} container - Container element
 * @param {string} type - Tipe shimmer
 * @param {number} count - Jumlah item
 */
export const showShimmer = (container, type = 'card', count = 6) => {
  container.innerHTML = createSkeleton({ type, count });
};
