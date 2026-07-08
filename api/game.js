const { GAMES_DATA, DETAIL_DATA } = require('./games-data.js');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'ID game diperlukan' });
    return;
  }

  const game = GAMES_DATA.find(g => g.id === id);
  if (!game) {
    res.status(404).json({ error: 'Game tidak ditemukan' });
    return;
  }

  const detail = DETAIL_DATA[id] || {};

  // Hapus field internal
  const { isTrending, isNew, isEditorsChoice, hasUpdate, ...base } = game;

  res.status(200).json({
    ...base,
    description: detail.description || '',
    screenshots: detail.screenshots || [],
    download: detail.download || '',
    features: detail.features || [],
    changelog: detail.changelog || []
  });
};
