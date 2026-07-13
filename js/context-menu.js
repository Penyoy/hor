/**
 * GameHub - Context Menu (Menu Titik Tiga)
 * Komponen dropdown yang dapat dipakai ulang untuk item unduhan & favorit.
 */

let activeMenu = null;
let backdropEl = null;

function ensureBackdrop() {
  if (backdropEl) return backdropEl;
  backdropEl = document.createElement('div');
  backdropEl.className = 'context-menu__backdrop';
  document.body.appendChild(backdropEl);
  backdropEl.addEventListener('click', closeContextMenu);
  return backdropEl;
}

function closeContextMenu() {
  if (!activeMenu) return;
  activeMenu.classList.remove('active');
  if (backdropEl) backdropEl.classList.remove('active');
  const menuToRemove = activeMenu;
  activeMenu = null;
  setTimeout(() => menuToRemove.remove(), 120);
}

/**
 * Membuka menu titik tiga di dekat tombol yang diklik.
 * @param {MouseEvent} event - event klik dari tombol titik tiga
 * @param {Array<{label:string, icon:string, danger?:boolean, onClick:Function}>} items
 */
function openContextMenu(event, items) {
  event.stopPropagation();
  closeContextMenu();

  const menu = document.createElement('div');
  menu.className = 'context-menu';
  menu.setAttribute('role', 'menu');

  items.forEach((item) => {
    const btn = document.createElement('button');
    btn.className = 'context-menu__item' + (item.danger ? ' context-menu__item--danger' : '');
    btn.type = 'button';
    btn.setAttribute('role', 'menuitem');
    btn.innerHTML = `${item.icon || ''}<span>${item.label}</span>`;
    btn.addEventListener('click', () => {
      closeContextMenu();
      item.onClick();
    });
    menu.appendChild(btn);
  });

  document.body.appendChild(menu);
  ensureBackdrop().classList.add('active');

  const btnRect = event.currentTarget.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  let top = btnRect.bottom + 6;
  let left = btnRect.right - menuRect.width;

  if (top + menuRect.height > window.innerHeight - 12) {
    top = btnRect.top - menuRect.height - 6;
  }
  if (left < 12) left = 12;

  menu.style.top = `${top}px`;
  menu.style.left = `${left}px`;

  requestAnimationFrame(() => menu.classList.add('active'));
  activeMenu = menu;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeContextMenu();
});

window.GameHubContextMenu = { open: openContextMenu, close: closeContextMenu };

// ===== Shared SVG icons for menu items =====
window.GameHubIcons = {
  open: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  heartOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
};
