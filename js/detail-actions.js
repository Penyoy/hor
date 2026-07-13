/**
 * GameHub - Detail Page Actions
 * Merender info dasar game (dari data contoh) dan menghubungkan tombol
 * Favorit & Download ke localStorage (js/storage.js).
 *
 * Catatan: file ini menggantikan sementara js/detail.js yang belum ada di
 * project ini. Saat API asli terhubung, render data bisa diganti dengan
 * hasil fetch dari js/api.js tanpa mengubah logika favorit/unduhan di bawah.
 */

(function () {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get('id') || GameHubDemo.games[0].id;
  const game = GameHubDemo.getGame(gameId);

  function renderHeader() {
    const inner = document.querySelector('.detail-header__inner');
    inner.innerHTML = `
      <div class="detail-header__icon" style="background:${game.color};display:flex;align-items:center;justify-content:center;color:#fff;font-family:var(--font-display);font-weight:700;font-size:1.75rem;">
        ${GameHubDemo.initials(game.title)}
      </div>
      <div class="detail-header__info">
        <h1 class="detail-header__title">${game.title}</h1>
        <p class="detail-header__developer">${game.developer}</p>
        <div class="detail-header__rating">
          <span class="detail-header__rating-text">★ ${game.rating} &middot; ${game.downloads} unduhan</span>
        </div>
      </div>
    `;

    document.querySelector('.detail-banner').style.background = game.color;
    document.title = `${game.title} - GameHub`;
  }

  function renderMeta() {
    const meta = document.getElementById('detailMeta');
    meta.innerHTML = `
      <div class="detail-meta__item">
        <div class="detail-meta__value">${game.size}</div>
        <div class="detail-meta__label">Ukuran</div>
      </div>
      <div class="detail-meta__item">
        <div class="detail-meta__value">${game.version}</div>
        <div class="detail-meta__label">Versi</div>
      </div>
      <div class="detail-meta__item">
        <div class="detail-meta__value">${game.category}</div>
        <div class="detail-meta__label">Kategori</div>
      </div>
    `;
  }

  function updateFavoriteBtn() {
    const btn = document.getElementById('favoriteBtn');
    const isFav = GameHubStorage.isFavorite(game.id);
    btn.classList.toggle('active', isFav);
    btn.style.color = isFav ? 'var(--danger)' : '';
    const svgPath = btn.querySelector('svg path');
    if (svgPath) svgPath.setAttribute('fill', isFav ? 'currentColor' : 'none');
  }

  function updateDownloadBtn() {
    const btn = document.getElementById('downloadBtn');
    const isDownloaded = GameHubStorage.isDownloaded(game.id);
    btn.innerHTML = isDownloaded
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Terunduh'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download';
  }

  function wireActions() {
    document.getElementById('detailActions').style.display = 'flex';

    document.getElementById('favoriteBtn').addEventListener('click', () => {
      GameHubStorage.toggleFavorite({
        id: game.id, title: game.title, developer: game.developer,
        category: game.category, rating: game.rating, color: game.color
      });
      updateFavoriteBtn();
    });

    document.getElementById('downloadBtn').addEventListener('click', (e) => {
      e.preventDefault();
      GameHubStorage.addDownload({
        id: game.id, title: game.title, developer: game.developer,
        size: game.size, color: game.color
      });
      updateDownloadBtn();
    });

    document.getElementById('backBtn').addEventListener('click', () => {
      if (window.history.length > 1) window.history.back();
      else window.location.href = 'index.html';
    });

    document.getElementById('shareBtn').addEventListener('click', async () => {
      const url = window.location.href;
      if (navigator.share) {
        try { await navigator.share({ title: game.title, url }); } catch (e) {}
      } else {
        try { await navigator.clipboard.writeText(url); } catch (e) {}
      }
    });

    document.getElementById('copyLinkBtn').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(window.location.href); } catch (e) {}
    });
  }

  renderHeader();
  renderMeta();
  updateFavoriteBtn();
  updateDownloadBtn();
  wireActions();
})();
