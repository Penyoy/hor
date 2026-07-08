const { GAMES_DATA } = require('./games-data.js');

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { trending, new: isNew, editors, updates, search } = req.query;
  let result = [...GAMES_DATA];

  // Filter berdasarkan query parameter
  if (trending === 'true') {
    result = result.filter(g => g.isTrending);
  } else if (isNew === 'true') {
    result = result.filter(g => g.isNew);
  } else if (editors === 'true') {
    result = result.filter(g => g.isEditorsChoice);
  } else if (updates === 'true') {
    result = result.filter(g => g.hasUpdate);
  } else if (search) {
    const q = search.toLowerCase();
    result = result.filter(g => 
      g.title.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.developer.toLowerCase().includes(q)
    );
  }

  // Hapus field internal sebelum kirim
  const clean = result.map(({ isTrending, isNew, isEditorsChoice, hasUpdate, ...rest }) => rest);

  res.status(200).json(clean);
};
