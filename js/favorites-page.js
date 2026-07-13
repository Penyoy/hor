/**
 * GameHub - Logika Halaman Favorit
 * Merender daftar favorit dari localStorage dan menangani menu titik tiga.
 */

(function () {
  const listEl = document.getElementById('favoritesList');
  const emptyEl = document.getElementById('favoritesEmpty');
  const subtitleEl = document.getElementById('favoritesSubtitle');

  function render() {
    const favorites = GameHubStorage.getFavorites();
    subtitleEl.textContent = favorites.length
      ? `${favorites.length} game favorit`
      : 'Belum ada game favorit';

    listEl.innerHTML = '';
    emptyEl.style.display = favorites.length ? 'none' : 'flex';

    favorites.forEach((game) => {
      const item = document.createElement('div');
      item.className = 'list-item';
      item.innerHTML = `
        <div class="list-item__icon" style="transparent"><img src="${game.icon}" style="border-radius: 14px"></div>
        <div class="list-item__info">
          <div class="list-item__title">${game.title}</div>
          <div class="list-item__meta">
            <span>${game.category || ''}</span>
            <span>&middot;</span>
            <span>★ ${game.rating ?? '-'}</span>
          </div>
        </div>
        <button class="list-item__more" aria-label="Menu lainnya" type="button">
          <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg>
        </button>
      `;

      item.querySelector('.list-item__more').addEventListener('click', (e) => {
        GameHubContextMenu.open(e, [
          { label: 'Buka Game', icon: GameHubIcons.open, onClick: () => { window.location.href = `detail.html?id=${game.id}`; } },
          { label: 'Bagikan', icon: GameHubIcons.share, onClick: () => shareGame(game) },
          { label: 'Hapus dari Favorit', icon: GameHubIcons.heartOff, danger: true, onClick: () => {
              GameHubStorage.removeFavorite(game.id);
              render();
            } }
        ]);
      });

      listEl.appendChild(item);
    });
  }

  async function shareGame(game) {
    const url = `${window.location.origin}${window.location.pathname.replace('favorites.html', '')}detail.html?id=${game.id}`;
    if (navigator.share) {
      try { await navigator.share({ title: game.title, url }); } catch (e) {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
      } catch (e) {}
    }
  }

  render();
  document.addEventListener('gamehub:favorites-changed', render);
})();
