/**
 * GameHub - Toast Component
 * Menampilkan notifikasi toast yang muncul dari bawah.
 */

/**
 * Buat dan tampilkan toast
 * @param {object} options - Options untuk toast
 */
export const showToast = (options = {}) => {
  const {
    message = '',
    type = 'info', // info, success, error, warning
    duration = 3000,
    position = 'bottom-center', // top-left, top-right, bottom-left, bottom-center, bottom-right
    icon = null
  } = options;

  // Hapus toast sebelumnya di posisi yang sama
  const existingToasts = document.querySelectorAll(`.toast--${position.replace('-', '_')}`);
  existingToasts.forEach((t) => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast toast--${type} toast--${position.replace('-', '_')}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');

  // Default icons
  const icons = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>`,
    error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`,
    warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
    info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`
  };

  toast.innerHTML = `
    <div class="toast__icon">${icon || icons[type] || icons.info}</div>
    <div class="toast__content">
      <p class="toast__message">${message}</p>
    </div>
    <button class="toast__close" aria-label="Close notification">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
  `;

  document.body.appendChild(toast);

  // Show animation
  requestAnimationFrame(() => {
    toast.classList.add('toast--show');
  });

  // Auto dismiss
  const dismissTimer = setTimeout(() => dismiss(), duration);

  const dismiss = () => {
    clearTimeout(dismissTimer);
    toast.classList.remove('toast--show');
    toast.classList.add('toast--hide');
    setTimeout(() => toast.remove(), 300);
  };

  // Close button
  toast.querySelector('.toast__close').addEventListener('click', dismiss);

  return { dismiss, element: toast };
};

/**
 * Shorthand untuk toast success
 * @param {string} message 
 * @param {object} options 
 */
export const showSuccess = (message, options = {}) => {
  return showToast({ message, type: 'success', ...options });
};

/**
 * Shorthand untuk toast error
 * @param {string} message 
 * @param {object} options 
 */
export const showError = (message, options = {}) => {
  return showToast({ message, type: 'error', ...options });
};

/**
 * Shorthand untuk toast warning
 * @param {string} message 
 * @param {object} options 
 */
export const showWarning = (message, options = {}) => {
  return showToast({ message, type: 'warning', ...options });
};

/**
 * Shorthand untuk toast info
 * @param {string} message 
 * @param {object} options 
 */
export const showInfo = (message, options = {}) => {
  return showToast({ message, type: 'info', ...options });
};
