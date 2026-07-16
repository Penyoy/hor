# GameHub

Platform distribusi game modern dan premium. Temukan dan download game terbaik dengan antarmuka yang bersih, modern, dan responsif.

![GameHub](assets/images/og-image.jpg)

## Fitur

- **Pencarian Real-time** - Cari game dengan debounce dan highlight keyword
- **Banner Slider** - Slider otomatis dengan autoplay dan kontrol navigasi
- **Kategori Game** - Trending, Terbaru, Editor's Choice, dan Update
- **Detail Game Lengkap** - Informasi lengkap dengan screenshot dan fitur
- **Download & Share** - Tombol download, share, dan salin link
- **Favorit** - Simpan game favorit ke local storage
- **PWA** - Dapat diinstall sebagai aplikasi di perangkat mobile
- **Offline Support** - Service worker untuk caching dan offline page
- **Dark Theme** - Tema gelap modern dengan glassmorphism effect
- **Responsive** - Mendukung berbagai ukuran layar dari 320px hingga 1440px
- **Animasi Smooth** - Fade, scale, slide, ripple effect, dan shimmer loading
- **Aksesibilitas** - ARIA labels, keyboard navigation, dan focus management

## Teknologi

- HTML5
- CSS3 (tanpa framework)
- JavaScript ES6+ Module
- Service Worker
- PWA (Progressive Web App)
- Intersection Observer API
- AbortController API

## Cara Install

### Clone Repository

```bash
git clone https://github.com/username/gamehub.git
cd gamehub
```

### Atau Download ZIP

Download ZIP file dan extract ke folder web server Anda.

## Cara Menjalankan

### Local Development

Gunakan web server lokal seperti Live Server di VS Code, atau:

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8080
```

Buka browser dan akses `http://localhost:8080`

### Production

Deploy ke static hosting seperti Vercel, Netlify, atau GitHub Pages.

## Cara Mengganti URL API

1. Buka file `js/config.js`
2. Ubah nilai `API.BASE_URL` ke URL API Anda:

```javascript
const CONFIG = {
  API: {
    BASE_URL: 'https://api-anda.vercel.app',  // Ganti URL ini
    // ...
  }
};
```

### Format API Response

**GET /api/games**

```json
[
  {
    "id": "minecraft",
    "title": "Minecraft",
    "banner": "https://example.com/banner.jpg",
    "icon": "https://example.com/icon.jpg",
    "rating": 4.8,
    "size": "285 MB",
    "version": "1.21.1",
    "developer": "Mojang",
    "category": "Sandbox",
    "downloads": "100M+",
    "updated": "2026-07-01"
  }
]
```

**GET /api/game?id=minecraft**

```json
{
  "id": "minecraft",
  "title": "Minecraft",
  "banner": "https://example.com/banner.jpg",
  "icon": "https://example.com/icon.jpg",
  "description": "Game sandbox terbaik...",
  "rating": 4.8,
  "version": "1.21.1",
  "size": "285 MB",
  "developer": "Mojang",
  "category": "Sandbox",
  "downloads": "100M+",
  "updated": "2026-07-01",
  "screenshots": [
    "https://example.com/ss1.jpg",
    "https://example.com/ss2.jpg"
  ],
  "download": "https://example.com/download",
  "features": ["Offline Mode", "Multiplayer"],
  "changelog": [
    {
      "version": "1.21.1",
      "date": "2026-07-01",
      "changes": ["Bug fixes", "Performance improvements"]
    }
  ]
}
```

## Cara Deploy ke Vercel

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Login

```bash
vercel login
```

### 3. Deploy

```bash
vercel --prod
```

Atau gunakan Git integration:

1. Push code ke GitHub
2. Connect repository di Vercel dashboard
3. Deploy otomatis

### vercel.json (opsional)

Buat file `vercel.json` di root untuk SPA fallback:

```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

## Struktur Folder

```
gamehub/
├── index.html              # Halaman beranda
├── detail.html             # Halaman detail game
├── search.html             # Halaman pencarian
├── about.html              # Halaman tentang
├── 404.html                # Halaman error 404
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker untuk caching
├── README.md               # Dokumentasi
│
├── assets/
│   ├── images/             # Gambar game dan screenshot
│   │   └── games/          # Banner dan icon game
│   ├── icons/              # Icon PWA dan favicon
│   └── logo/               # Logo aplikasi
│
├── css/
│   ├── style.css           # Global styles, variables, utilities
│   ├── navbar.css          # Header dan bottom navigation
│   ├── home.css            # Home page styles
│   ├── detail.css          # Detail page styles
│   ├── search.css          # Search page styles
│   ├── animation.css       # Animations, modal, toast
│   └── responsive.css      # Media queries
│
├── js/
│   ├── config.js           # Konfigurasi API dan aplikasi
│   ├── utils.js            # Utility functions
│   ├── storage.js          # LocalStorage manager
│   ├── api.js              # API service dengan error handling
│   ├── app.js              # Main application entry
│   ├── home.js             # Home page logic
│   ├── detail.js           # Detail page logic
│   ├── search.js           # Search page logic
│   └── router.js           # Client-side router
│
└── components/
    ├── card.js             # Game card component
    ├── slider.js           # Banner & screenshot slider
    ├── modal.js            # Modal dialog component
    ├── toast.js            # Toast notification
    └── loading.js          # Skeleton loading & spinner
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/games` | GET | Get semua games |
| `/api/games?trending=true` | GET | Get trending games |
| `/api/games?new=true` | GET | Get games terbaru |
| `/api/games?editors=true` | GET | Get editor's choice |
| `/api/games?updates=true` | GET | Get update terbaru |
| `/api/games?search=query` | GET | Search games |
| `/api/game?id={id}` | GET | Get detail game |

## Environment Variables

Tidak diperlukan environment variables. Semua konfigurasi ada di `js/config.js`.

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+
- Opera 67+

## Performance

Target Lighthouse Score:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

## Lisensi

MIT License - lihat [LICENSE](LICENSE) untuk detail.

## Kontribusi

Kontribusi sangat diterima! Silakan buat issue atau pull request.

## Kontak

- Email: penyoy11@gmail.com
- GitHub: [@penyoy](https://github.com/penyoy)
