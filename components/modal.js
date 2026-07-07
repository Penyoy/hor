/**
 * GameHub - Modal Component
 * Membuat modal dialog yang dapat digunakan kembali.
 */

/**
 * Buat dan tampilkan modal
 * @param {object} options - Options untuk modal
 * @returns {object} Controller modal
 */
export const createModal = (options = {}) => {
  const {
    title = '',
    content = '',
    size = 'medium', // small, medium, large, fullscreen
    closable = true,
    backdrop = true,
    onClose = null
  } = options;

  const modal = document.createElement('div');
  modal.className = `modal modal--${size}`;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'modal-title');
  modal.setAttribute('tabindex', '-1');

  modal.innerHTML = `
    ${backdrop ? '<div class="modal__backdrop"></div>' : ''}
    <div class="modal__container">
      <div class="modal__header">
        <h3 id="modal-title" class="modal__title">${title}</h3>
        ${closable ? `
          <button class="modal__close" aria-label="Close modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        ` : ''}
      </div>
      <div class="modal__body">
        ${content}
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Focus trap
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleKeydown = (e) => {
    if (e.key === 'Escape' && closable) {
      close();
    }
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  };

  const close = () => {
    modal.classList.remove('active');
    document.removeEventListener('keydown', handleKeydown);
    setTimeout(() => {
      modal.remove();
      if (onClose) onClose();
    }, 300);
  };

  // Event listeners
  if (closable) {
    modal.querySelector('.modal__close')?.addEventListener('click', close);
    if (backdrop) {
      modal.querySelector('.modal__backdrop')?.addEventListener('click', close);
    }
  }

  document.addEventListener('keydown', handleKeydown);

  // Show animation
  requestAnimationFrame(() => {
    modal.classList.add('active');
    firstFocusable?.focus();
  });

  return { close, element: modal };
};

/**
 * Buat confirm dialog
 * @param {object} options
 * @returns {Promise<boolean>}
 */
export const confirmDialog = (options = {}) => {
  const {
    title = 'Konfirmasi',
    message = 'Apakah Anda yakin?',
    confirmText = 'Ya',
    cancelText = 'Tidak'
  } = options;

  return new Promise((resolve) => {
    const content = `
      <p class="modal__message">${message}</p>
      <div class="modal__actions">
        <button class="btn btn--secondary modal__btn-cancel">${cancelText}</button>
        <button class="btn btn--primary modal__btn-confirm">${confirmText}</button>
      </div>
    `;

    const modal = createModal({ title, content, size: 'small' });

    modal.element.querySelector('.modal__btn-cancel').addEventListener('click', () => {
      modal.close();
      resolve(false);
    });

    modal.element.querySelector('.modal__btn-confirm').addEventListener('click', () => {
      modal.close();
      resolve(true);
    });
  });
};
