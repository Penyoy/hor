/**
 * GameHub - Logika Halaman Unduhan
 * Merender daftar unduhan dari localStorage dan menangani menu titik tiga.
 */

(function () {
  const listEl = document.getElementById('downloadsList');
  const emptyEl = document.getElementById('downloadsEmpty');
  const subtitleEl = document.getElementById('downloadsSubtitle');

  function formatDate(ts) {
    return new Date(ts).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function render() {
    const downloads = GameHubStorage.getDownloads();
    subtitleEl.textContent = downloads.length
      ? `${downloads.length} game terunduh`
      : 'Belum ada game yang diunduh';

    listEl.innerHTML = '';
    emptyEl.style.display = downloads.length ? 'none' : 'flex';

    downloads.forEach((game) => {
      const item = document.createElement('div');
      item.className = 'list-item';
      item.innerHTML = `
        <div class="list-item__icon" style="background:${game.color || '#4F8CFF'}">${(game.title || '?').charAt(0).toUpperCase()}</div>
        <div class="list-item__info">
          <div class="list-item__title">${game.title}</div>
          <div class="list-item__meta">
            <span class="list-item__status">Terunduh</span>
            <span>&middot;</span>
            <span>${game.size || ''}</span>
            <span>&middot;</span>
            <span>${formatDate(game.downloadedAt)}</span>
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
          { label: 'Hapus dari Unduhan', icon: GameHubIcons.trash, danger: true, onClick: () => {
              GameHubStorage.removeDownload(game.id);
              render();
            } }
        ]);
      });

      listEl.appendChild(item);
    });
  }

  async function shareGame(game) {
    const url = `${window.location.origin}${window.location.pathname.replace('downloads.html', '')}detail.html?id=${game.id}`;
    if (navigator.share) {
      try { await navigator.share({ title: game.title, url }); } catch (e) {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
      } catch (e) {}
    }
  }

  render();
  document.addEventListener('gamehub:downloads-changed', render);
})();
