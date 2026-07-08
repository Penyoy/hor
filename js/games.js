/**
 * GameHub - Mock API Data & Service
 * File ini menyediakan data game dan fungsi API untuk development/testing.
 * Bisa digunakan sebagai pengganti API eksternal.
 * 
 * Import dan gunakan di api.js atau langsung di aplikasi:
 * import { mockApi } from './games.js';
 */

import storage from './storage.js';

// ============================================
// DATA GAME
// ============================================

const GAMES_DATA = [
  {
    id: "minecraft",
    title: "Minecraft",
    banner: "https://image.api.playstation.com/vulcan/img/cfn/11307uYG0CXzRuA9ary0THIhwJ_kgZtZ2PWKV6N2qJFQD6xO7_qYp0P2wU5V9X0e.png",
    icon: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
    description: "Jelajahi dunia tak terbatas dan bangun apa pun dari rumah sederhana hingga istana megah. Bermainlah dalam mode Kreatif dengan sumber daya tak terbatas, atau gali hingga ke bumi dalam mode Bertahan Hidup, membuat senjata dan baju zirah untuk menangkis mob berbahaya.",
    rating: 4.8,
    version: "1.21.1",
    size: "285 MB",
    developer: "Mojang Studios",
    category: "Sandbox",
    downloads: "100M+",
    updated: "2026-07-01",
    screenshots: [
      "https://www.minecraft.net/content/dam/games/minecraft/screenshots/RayTracing_4K_Creative.png",
      "https://www.minecraft.net/content/dam/games/minecraft/screenshots/RTX_PonPon_4K.png",
      "https://www.minecraft.net/content/dam/games/minecraft/screenshots/RTX_Crystal_Palace_4K.png"
    ],
    download: "https://www.minecraft.net/id-id/download",
    features: [
      "Offline Mode",
      "Multiplayer Online",
      "Cross-Platform",
      "Mod Support",
      "Realms Server",
      "Marketplace Konten"
    ],
    changelog: [
      {
        version: "1.21.1",
        date: "2026-07-01",
        changes: [
          "Perbaikan bug pada sistem redstone",
          "Peningkatan performa rendering",
          "Penambahan blok baru: Pale Oak",
          "Perbaikan stabilitas multiplayer"
        ]
      },
      {
        version: "1.21.0",
        date: "2026-06-15",
        changes: [
          "Trial Chambers update",
          "Mace weapon baru",
          "Breeze dan Bogged mob",
          "Auto-crafting crafter"
        ]
      }
    ],
    isTrending: true,
    isNew: false,
    isEditorsChoice: true,
    hasUpdate: true
  },
  {
    id: "genshin-impact",
    title: "Genshin Impact",
    banner: "https://upload.wikimedia.org/wikipedia/en/5/5d/Genshin_Impact.jpg",
    icon: "https://upload.wikimedia.org/wikipedia/en/5/5d/Genshin_Impact.jpg",
    description: "Genshin Impact adalah game RPG aksi open-world yang membawamu ke Teyvat, sebuah benua yang penuh dengan kehidupan dan energi elemental. Kamu dan saudaramu datang ke sini dari dunia lain. Dipisahkan oleh Dewa yang tidak dikenal, kekuatanmu telah disita, dan kamu terlempar ke dalam tidur yang dalam.",
    rating: 4.6,
    version: "5.7.0",
    size: "32 GB",
    developer: "HoYoverse",
    category: "RPG",
    downloads: "80M+",
    updated: "2026-06-28",
    screenshots: [
      "https://upload.wikimedia.org/wikipedia/en/5/5d/Genshin_Impact.jpg",
      "https://webstatic.hoyoverse.com/upload/content/2021/09/14/8e6e7e8e7e7e7e7e7e7e7e7e7e7e7e7e.jpg",
      "https://webstatic.hoyoverse.com/upload/content/2021/09/14/9f8e7d6c5b4a3210.jpg"
    ],
    download: "https://genshin.hoyoverse.com/en/",
    features: [
      "Open World",
      "Elemental Combat System",
      "Co-op Multiplayer",
      "Cross-Platform",
      "Regular Events",
      "Gacha System"
    ],
    changelog: [
      {
        version: "5.7.0",
        date: "2026-06-28",
        changes: [
          "Region baru: Natlan Part 2",
          "Karakter baru: 5-star Pyro",
          "Weapon baru dan artifact",
          "Event summer terbaru"
        ]
      }
    ],
    isTrending: true,
    isNew: false,
    isEditorsChoice: true,
    hasUpdate: true
  },
  {
    id: "mobile-legends",
    title: "Mobile Legends: Bang Bang",
    banner: "https://play-lh.googleusercontent.com/OU3J5wR2iMVqXJ_v0D9v8x0J4u9v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5w",
    icon: "https://play-lh.googleusercontent.com/OU3J5wR2iMVqXJ_v0D9v8x0J4u9v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5w",
    description: "Mobile Legends: Bang Bang adalah game MOBA 5v5 terpopuler di dunia. Bertarung bersama temanmu, pilih hero favoritmu, dan bangun tim sempurna untuk menghancurkan base musuh dalam pertarungan 10 menit yang seru.",
    rating: 4.4,
    version: "1.9.5",
    size: "195 MB",
    developer: "Moonton",
    category: "MOBA",
    downloads: "500M+",
    updated: "2026-07-05",
    screenshots: [
      "https://play-lh.googleusercontent.com/screenshot1.jpg",
      "https://play-lh.googleusercontent.com/screenshot2.jpg",
      "https://play-lh.googleusercontent.com/screenshot3.jpg"
    ],
    download: "https://m.mobilelegends.com/",
    features: [
      "5v5 Real-time Battle",
      "100+ Heroes",
      "Ranked Mode",
      "Esports Tournament",
      "Voice Chat",
      "Custom Mode"
    ],
    changelog: [
      {
        version: "1.9.5",
        date: "2026-07-05",
        changes: [
          "Hero baru: Aurora Revamp",
          "Balance patch 15 hero",
          "Season 35 dimulai",
          "Skin Collector baru"
        ]
      }
    ],
    isTrending: true,
    isNew: false,
    isEditorsChoice: false,
    hasUpdate: true
  },
  {
    id: "stardew-valley",
    title: "Stardew Valley",
    banner: "https://upload.wikimedia.org/wikipedia/en/4/46/Stardew_Valley_logo.png",
    icon: "https://upload.wikimedia.org/wikipedia/en/4/46/Stardew_Valley_logo.png",
    description: "Stardew Valley adalah game simulasi pertanian RPG yang membawamu meninggalkan kehidupan kota yang monoton dan memulai hidup baru di desa kecil Pelican Town. Warisi kebun kakekmu yang terbengkalai dan ubah menjadi surga yang subur.",
    rating: 4.9,
    version: "1.6.9",
    size: "350 MB",
    developer: "ConcernedApe",
    category: "Simulation",
    downloads: "20M+",
    updated: "2026-06-20",
    screenshots: [
      "https://stardewvalley.net/wp-content/uploads/2017/12/screenshot1.png",
      "https://stardewvalley.net/wp-content/uploads/2017/12/screenshot2.png",
      "https://stardewvalley.net/wp-content/uploads/2017/12/screenshot3.png"
    ],
    download: "https://www.stardewvalley.net/",
    features: [
      "Offline Mode",
      "Co-op Multiplayer (4 pemain)",
      "Fishing & Mining",
      "Relationship System",
      "Mod Support",
      "Seasonal Events"
    ],
    changelog: [
      {
        version: "1.6.9",
        date: "2026-06-20",
        changes: [
          "New late-game content",
          "Quality of life improvements",
          "Bug fixes pada festival",
          "Performance optimization"
        ]
      }
    ],
    isTrending: false,
    isNew: false,
    isEditorsChoice: true,
    hasUpdate: false
  },
  {
    id: "honkai-star-rail",
    title: "Honkai: Star Rail",
    banner: "https://upload.wikimedia.org/wikipedia/en/0/0e/Honkai_Star_Rail_cover.png",
    icon: "https://upload.wikimedia.org/wikipedia/en/0/0e/Honkai_Star_Rail_cover.png",
    description: "Honkai: Star Rail adalah game RPG strategi ruang angkasa yang dikembangkan oleh HoYoverse. Naikilah Astral Express dan jelajahi galaksi yang penuh dengan keajaiban, mitos, dan bahaya. Temui rekan baru dari berbagai dunia dan hadapi Stellaron Crisis bersama.",
    rating: 4.7,
    version: "3.2.0",
    size: "18 GB",
    developer: "HoYoverse",
    category: "RPG",
    downloads: "50M+",
    updated: "2026-07-03",
    screenshots: [
      "https://hsr.hoyoverse.com/upload/content/2023/04/12/screenshot1.jpg",
      "https://hsr.hoyoverse.com/upload/content/2023/04/12/screenshot2.jpg",
      "https://hsr.hoyoverse.com/upload/content/2023/04/12/screenshot3.jpg"
    ],
    download: "https://hsr.hoyoverse.com/",
    features: [
      "Turn-based Combat",
      "Gacha System",
      "Immersive Story",
      "Character Building",
      "Simulated Universe",
      "Regular Updates"
    ],
    changelog: [
      {
        version: "3.2.0",
        date: "2026-07-03",
        changes: [
          "Penacony story conclusion",
          "Karakter baru: 5-star Limited",
          "Light Cone baru",
          "Event anniversary"
        ]
      }
    ],
    isTrending: true,
    isNew: false,
    isEditorsChoice: true,
    hasUpdate: true
  },
  {
    id: "clash-of-clans",
    title: "Clash of Clans",
    banner: "https://play-lh.googleusercontent.com/8cl7qwXqOaH0CqD3P9q8v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5w",
    icon: "https://play-lh.googleusercontent.com/8cl7qwXqOaH0CqD3P9q8v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5w",
    description: "Clash of Clans adalah game strategi epik di mana kamu membangun desa, melatih pasukan, dan bertarung melawan jutaan pemain online di seluruh dunia. Bergabunglah dengan clan dan ikuti Clan Wars yang epik!",
    rating: 4.5,
    version: "16.5.2",
    size: "280 MB",
    developer: "Supercell",
    category: "Strategy",
    downloads: "500M+",
    updated: "2026-06-25",
    screenshots: [
      "https://play-lh.googleusercontent.com/screenshot_coc1.jpg",
      "https://play-lh.googleusercontent.com/screenshot_coc2.jpg",
      "https://play-lh.googleusercontent.com/screenshot_coc3.jpg"
    ],
    download: "https://supercell.com/en/games/clashofclans/",
    features: [
      "Build & Defend Village",
      "Clan Wars",
      "Clan Games",
      "Builder Base",
      "Hero Equipment",
      "Clan Capital"
    ],
    changelog: [
      {
        version: "16.5.2",
        date: "2026-06-25",
        changes: [
          "Town Hall 17 sneak peek",
          "New defense levels",
          "Troop balance changes",
          "Quality of life updates"
        ]
      }
    ],
    isTrending: false,
    isNew: false,
    isEditorsChoice: false,
    hasUpdate: true
  },
  {
    id: "zenless-zone-zero",
    title: "Zenless Zone Zero",
    banner: "https://upload.wikimedia.org/wikipedia/en/3/3c/Zenless_Zone_Zero_cover.png",
    icon: "https://upload.wikimedia.org/wikipedia/en/3/3c/Zenless_Zone_Zero_cover.png",
    description: "Zenless Zone Zero adalah game action RPG dari HoYoverse yang berlatar di kota futuristik New Eridu. Jadilah Proxy dan pimpin squad Hollow Raiders untuk mengeksplorasi Hollows — dimensi anomali yang penuh dengan monster dan harta karun.",
    rating: 4.3,
    version: "1.8.0",
    size: "15 GB",
    developer: "HoYoverse",
    category: "Action",
    downloads: "30M+",
    updated: "2026-07-06",
    screenshots: [
      "https://zzz.hoyoverse.com/upload/content/2024/07/01/screenshot1.jpg",
      "https://zzz.hoyoverse.com/upload/content/2024/07/01/screenshot2.jpg",
      "https://zzz.hoyoverse.com/upload/content/2024/07/01/screenshot3.jpg"
    ],
    download: "https://zzz.hoyoverse.com/",
    features: [
      "Hack-and-Slash Combat",
      "Roguelike Elements",
      "Character Collection",
      "Urban Fantasy Setting",
      "Combo System",
      "Cross-Platform"
    ],
    changelog: [
      {
        version: "1.8.0",
        date: "2026-07-06",
        changes: [
          "Agent baru: S-rank Limited",
          "Story chapter baru",
          "Hollow exploration update",
          "Bangboo baru"
        ]
      }
    ],
    isTrending: true,
    isNew: false,
    isEditorsChoice: false,
    hasUpdate: true
  },
  {
    id: "brawl-stars",
    title: "Brawl Stars",
    banner: "https://play-lh.googleusercontent.com/brawl_stars_banner.jpg",
    icon: "https://play-lh.googleusercontent.com/brawl_stars_icon.jpg",
    description: "Brawl Stars adalah game multiplayer 3v3 dan battle royale cepat dari Supercell. Mainkan berbagai mode game dengan Brawlers unik, tingkatkan kekuatan mereka, dan raih peringkat tertinggi!",
    rating: 4.2,
    version: "58.279",
    size: "320 MB",
    developer: "Supercell",
    category: "Action",
    downloads: "200M+",
    updated: "2026-07-02",
    screenshots: [
      "https://play-lh.googleusercontent.com/bs_screenshot1.jpg",
      "https://play-lh.googleusercontent.com/bs_screenshot2.jpg",
      "https://play-lh.googleusercontent.com/bs_screenshot3.jpg"
    ],
    download: "https://supercell.com/en/games/brawlstars/",
    features: [
      "3v3 Team Battles",
      "Battle Royale",
      "Brawl Pass",
      "Club System",
      "Esports Ready",
      "Quick Matches"
    ],
    changelog: [
      {
        version: "58.279",
        date: "2026-07-02",
        changes: [
          "Brawler baru: Mythic",
          "Hypercharge baru",
          "Map rotation update",
          "Balance changes"
        ]
      }
    ],
    isTrending: false,
    isNew: false,
    isEditorsChoice: false,
    hasUpdate: true
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers",
    banner: "https://play-lh.googleusercontent.com/subway_surfers_banner.jpg",
    icon: "https://play-lh.googleusercontent.com/subway_surfers_icon.jpg",
    description: "Subway Surfers adalah game endless runner klasik. Bantu Jake, Tricky, dan Fresh melarikan diri dari Inspector yang galak dan anjingnya. Lompat, geser, dan hindari kereta yang datang dengan kecepatan tinggi!",
    rating: 4.1,
    version: "3.36.0",
    size: "180 MB",
    developer: "SYBO Games",
    category: "Arcade",
    downloads: "1B+",
    updated: "2026-07-07",
    screenshots: [
      "https://play-lh.googleusercontent.com/ss_screenshot1.jpg",
      "https://play-lh.googleusercontent.com/ss_screenshot2.jpg",
      "https://play-lh.googleusercontent.com/ss_screenshot3.jpg"
    ],
    download: "https://subwaysurfers.com/",
    features: [
      "Endless Runner",
      "World Tour Locations",
      "Character Collection",
      "Hoverboard",
      "Daily Challenges",
      "Offline Play"
    ],
    changelog: [
      {
        version: "3.36.0",
        date: "2026-07-07",
        changes: [
          "World Tour: Bali",
          "Surfer baru",
          "Board baru",
          "Season Hunt baru"
        ]
      }
    ],
    isTrending: true,
    isNew: false,
    isEditorsChoice: false,
    hasUpdate: true
  },
  {
    id: "pokemon-go",
    title: "Pokémon GO",
    banner: "https://play-lh.googleusercontent.com/pokemon_go_banner.jpg",
    icon: "https://play-lh.googleusercontent.com/pokemon_go_icon.jpg",
    description: "Pokémon GO adalah game augmented reality yang mengajakmu menjelajahi dunia nyata untuk menangkap Pokémon. Temukan Pokémon di sekitarmu, lawan di Gym, dan ikuti Raid Battles bersama teman!",
    rating: 3.9,
    version: "0.345.0",
    size: "220 MB",
    developer: "Niantic",
    category: "AR",
    downloads: "100M+",
    updated: "2026-06-30",
    screenshots: [
      "https://play-lh.googleusercontent.com/pogo_screenshot1.jpg",
      "https://play-lh.googleusercontent.com/pogo_screenshot2.jpg",
      "https://play-lh.googleusercontent.com/pogo_screenshot3.jpg"
    ],
    download: "https://pokemongolive.com/",
    features: [
      "Augmented Reality",
      "Real-world Exploration",
      "Raid Battles",
      "Trading System",
      "Pokédex Collection",
      "Community Day"
    ],
    changelog: [
      {
        version: "0.345.0",
        date: "2026-06-30",
        changes: [
          "GO Fest 2026 preparation",
          "New Mega Evolutions",
          "Route feature update",
          "Bug fixes"
        ]
      }
    ],
    isTrending: false,
    isNew: false,
    isEditorsChoice: false,
    hasUpdate: true
  },
  {
    id: "among-us",
    title: "Among Us",
    banner: "https://upload.wikimedia.org/wikipedia/en/9/9a/Among_Us_cover_art.jpg",
    icon: "https://upload.wikimedia.org/wikipedia/en/9/9a/Among_Us_cover_art.jpg",
    description: "Among Us adalah game multipemain party yang berlatar di pesawat ruang angkasa. Bekerja sama untuk menyelesaikan tugas, tapi hati-hati — ada Impostor di antara kalian yang ingin menghabisi semua orang!",
    rating: 4.0,
    version: "2026.6.18",
    size: "150 MB",
    developer: "Innersloth",
    category: "Party",
    downloads: "100M+",
    updated: "2026-06-18",
    screenshots: [
      "https://innersloth.com/screenshot1.jpg",
      "https://innersloth.com/screenshot2.jpg",
      "https://innersloth.com/screenshot3.jpg"
    ],
    download: "https://innersloth.com/gameAmongUs.php",
    features: [
      "4-15 Players",
      "Local & Online",
      "Cross-Platform",
      "Customizable Roles",
      "Map Variations",
      "Free Chat"
    ],
    changelog: [
      {
        version: "2026.6.18",
        date: "2026-06-18",
        changes: [
          "New map: Airship 2.0",
          "Role update",
          "Cosmetic baru",
          "Anti-cheat improvement"
        ]
      }
    ],
    isTrending: false,
    isNew: false,
    isEditorsChoice: false,
    hasUpdate: false
  },
  {
    id: "roblox",
    title: "Roblox",
    banner: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Roblox_logo_2022.svg",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Roblox_logo_2022.svg",
    description: "Roblox adalah platform game ultimate yang memungkinkanmu memainkan jutaan game yang dibuat oleh komunitas global. Dari petualangan epik hingga simulasi santai, ada sesuatu untuk semua orang di Roblox.",
    rating: 4.3,
    version: "2.645.665",
    size: "180 MB",
    developer: "Roblox Corporation",
    category: "Platform",
    downloads: "500M+",
    updated: "2026-07-04",
    screenshots: [
      "https://www.roblox.com/screenshot1.jpg",
      "https://www.roblox.com/screenshot2.jpg",
      "https://www.roblox.com/screenshot3.jpg"
    ],
    download: "https://www.roblox.com/",
    features: [
      "Millions of Games",
      "Avatar Customization",
      "Game Creation Tools",
      "Cross-Platform",
      "Social Features",
      "Virtual Economy"
    ],
    changelog: [
      {
        version: "2.645.665",
        date: "2026-07-04",
        changes: [
          "Performance improvements",
          "Avatar editor update",
          "New animation system",
          "Bug fixes"
        ]
      }
    ],
    isTrending: true,
    isNew: false,
    isEditorsChoice: false,
    hasUpdate: true
  },
  {
    id: "e-football-2026",
    title: "eFootball 2026",
    banner: "https://upload.wikimedia.org/wikipedia/en/8/8e/EFootball_2026_cover.png",
    icon: "https://upload.wikimedia.org/wikipedia/en/8/8e/EFootball_2026_cover.png",
    description: "eFootball 2026 adalah game sepak bola generasi berikutnya dari Konami. Rasakan sepak bola yang lebih realistis dengan grafis mutakhir, AI canggih, dan lisensi klub resmi dari seluruh dunia.",
    rating: 4.0,
    version: "4.0.0",
    size: "4.5 GB",
    developer: "Konami",
    category: "Sports",
    downloads: "50M+",
    updated: "2026-07-08",
    screenshots: [
      "https://www.konami.com/efootball/screenshot1.jpg",
      "https://www.konami.com/efootball/screenshot2.jpg",
      "https://www.konami.com/efootball/screenshot3.jpg"
    ],
    download: "https://www.konami.com/efootball/",
    features: [
      "Real-time Online PvP",
      "Master League",
      "Dream Team",
      "Licensed Stadiums",
      "Motion Matching",
      "Cross-Platform"
    ],
    changelog: [
      {
        version: "4.0.0",
        date: "2026-07-08",
        changes: [
          "Season 2026/2027 update",
          "New player faces",
          "Gameplay overhaul",
          "Stadium baru"
        ]
      }
    ],
    isTrending: false,
    isNew: true,
    isEditorsChoice: true,
    hasUpdate: true
  },
  {
    id: "call-of-duty-mobile",
    title: "Call of Duty: Mobile",
    banner: "https://upload.wikimedia.org/wikipedia/en/5/5c/Call_of_Duty_Mobile.jpg",
    icon: "https://upload.wikimedia.org/wikipedia/en/5/5c/Call_of_Duty_Mobile.jpg",
    description: "Call of Duty: Mobile menghadirkan pengalaman FPS konsol ke perangkat mobile. Mainkan mode Battle Royale, Multiplayer klasik, dan Zombie dengan grafis AAA dan kontrol yang disesuaikan untuk touch screen.",
    rating: 4.4,
    version: "1.0.48",
    size: "2.8 GB",
    developer: "Activision",
    category: "FPS",
    downloads: "300M+",
    updated: "2026-06-29",
    screenshots: [
      "https://www.callofduty.com/mobile/screenshot1.jpg",
      "https://www.callofduty.com/mobile/screenshot2.jpg",
      "https://www.callofduty.com/mobile/screenshot3.jpg"
    ],
    download: "https://www.callofduty.com/mobile",
    features: [
      "Battle Royale",
      "Multiplayer 5v5",
      "Zombie Mode",
      "Battle Pass",
      "Ranked Matches",
      "Controller Support"
    ],
    changelog: [
      {
        version: "1.0.48",
        date: "2026-06-29",
        changes: [
          "Season 12: Future Warfare",
          "Weapon baru",
          "Map baru",
          "Operator skill baru"
        ]
      }
    ],
    isTrending: true,
    isNew: false,
    isEditorsChoice: true,
    hasUpdate: true
  },
  {
    id: "asphalt-9",
    title: "Asphalt 9: Legends",
    banner: "https://upload.wikimedia.org/wikipedia/en/9/9f/Asphalt_9_cover.png",
    icon: "https://upload.wikimedia.org/wikipedia/en/9/9f/Asphalt_9_cover.png",
    description: "Asphalt 9: Legends adalah game balap arcade terbaik dengan koleksi mobil supercar dari Ferrari, Porsche, Lamborghini, dan lainnya. Rasakan kecepatan gila dengan nitro dan drift di lintasan ikonik dunia!",
    rating: 4.3,
    version: "4.9.1b",
    size: "3.2 GB",
    developer: "Gameloft",
    category: "Racing",
    downloads: "100M+",
    updated: "2026-06-22",
    screenshots: [
      "https://www.gameloft.com/asphalt9/screenshot1.jpg",
      "https://www.gameloft.com/asphalt9/screenshot2.jpg",
      "https://www.gameloft.com/asphalt9/screenshot3.jpg"
    ],
    download: "https://www.gameloft.com/asphalt-9-legends/",
    features: [
      "200+ Hypercars",
      "TouchDrive Controls",
      "Career Mode",
      "Multiplayer (8 players)",
      "Club Race",
      "Nitro Shockwave"
    ],
    changelog: [
      {
        version: "4.9.1b",
        date: "2026-06-22",
        changes: [
          "Car baru: Bugatti Chiron SS",
          "Season baru",
          "Special Event",
          "UI improvements"
        ]
      }
    ],
    isTrending: false,
    isNew: false,
    isEditorsChoice: false,
    hasUpdate: false
  },
  {
    id: "plants-vs-zombies-3",
    title: "Plants vs. Zombies 3",
    banner: "https://play-lh.googleusercontent.com/pvz3_banner.jpg",
    icon: "https://play-lh.googleusercontent.com/pvz3_icon.jpg",
    description: "Plants vs. Zombies 3 adalah sekuel terbaru dari franchise tower defense populer. Dr. Zomboss telah kembali dengan rencana jahat yang lebih besar! Susun strategi tanaman terbaikmu untuk melindungi Neighborville.",
    rating: 3.8,
    version: "24.0.1",
    size: "450 MB",
    developer: "EA Mobile",
    category: "Tower Defense",
    downloads: "10M+",
    updated: "2026-07-01",
    screenshots: [
      "https://play-lh.googleusercontent.com/pvz3_ss1.jpg",
      "https://play-lh.googleusercontent.com/pvz3_ss2.jpg",
      "https://play-lh.googleusercontent.com/pvz3_ss3.jpg"
    ],
    download: "https://www.ea.com/games/plants-vs-zombies",
    features: [
      "Tower Defense",
      "New Plant Types",
      "Boss Battles",
      "Social Features",
      "Daily Challenges",
      "Offline Mode"
    ],
    changelog: [
      {
        version: "24.0.1",
        date: "2026-07-01",
        changes: [
          "World baru: Space Station",
          "Plant baru",
          "Zombie baru",
          "Difficulty rebalance"
        ]
      }
    ],
    isTrending: false,
    isNew: true,
    isEditorsChoice: false,
    hasUpdate: true
  },
  {
    id: "free-fire",
    title: "Free Fire",
    banner: "https://play-lh.googleusercontent.com/free_fire_banner.jpg",
    icon: "https://play-lh.googleusercontent.com/free_fire_icon.jpg",
    description: "Free Fire adalah game battle royale mobile terpopuler di dunia. 50 pemain mendarat di pulau terpencil dan bertarung untuk menjadi yang terakhir bertahan hidup. Pertandingan hanya 10 menit!",
    rating: 4.1,
    version: "1.108.1",
    size: "600 MB",
    developer: "Garena",
    category: "Battle Royale",
    downloads: "1B+",
    updated: "2026-07-05",
    screenshots: [
      "https://play-lh.googleusercontent.com/ff_ss1.jpg",
      "https://play-lh.googleusercontent.com/ff_ss2.jpg",
      "https://play-lh.googleusercontent.com/ff_ss3.jpg"
    ],
    download: "https://ff.garena.com/",
    features: [
      "50 Players BR",
      "10-Minute Matches",
      "Character System",
      "Pet Companions",
      "Ranked Mode",
      "Clash Squad"
    ],
    changelog: [
      {
        version: "1.108.1",
        date: "2026-07-05",
        changes: [
          "OB48 update",
          "Karakter baru",
          "Weapon balance",
          "Map update Bermuda"
        ]
      }
    ],
    isTrending: true,
    isNew: false,
    isEditorsChoice: false,
    hasUpdate: true
  },
  {
    id: "candy-crush-saga",
    title: "Candy Crush Saga",
    banner: "https://play-lh.googleusercontent.com/candy_crush_banner.jpg",
    icon: "https://play-lh.googleusercontent.com/candy_crush_icon.jpg",
    description: "Candy Crush Saga adalah game puzzle match-3 paling populer di dunia. Tukar dan cocokkan permen untuk melewati level yang menantang dan manis. Mainkan sendiri atau tantang teman!",
    rating: 4.2,
    version: "1.288.1",
    size: "120 MB",
    developer: "King",
    category: "Puzzle",
    downloads: "1B+",
    updated: "2026-06-15",
    screenshots: [
      "https://play-lh.googleusercontent.com/cc_ss1.jpg",
      "https://play-lh.googleusercontent.com/cc_ss2.jpg",
      "https://play-lh.googleusercontent.com/cc_ss3.jpg"
    ],
    download: "https://king.com/game/candycrush",
    features: [
      "10000+ Levels",
      "Daily Rewards",
      "Events & Challenges",
      "Leaderboards",
      "Offline Play",
      "Sync Across Devices"
    ],
    changelog: [
      {
        version: "1.288.1",
        date: "2026-06-15",
        changes: [
          "Level baru: 15000+",
          "Episode baru",
          "Bug fixes",
          "Performance improvements"
        ]
      }
    ],
    isTrending: false,
    isNew: false,
    isEditorsChoice: false,
    hasUpdate: false
  },
  {
    id: "hill-climb-racing-2",
    title: "Hill Climb Racing 2",
    banner: "https://play-lh.googleusercontent.com/hcr2_banner.jpg",
    icon: "https://play-lh.googleusercontent.com/hcr2_icon.jpg",
    description: "Hill Climb Racing 2 adalah game balap fisika yang adiktif. Naik berbagai kendaraan, upgrade mesin, dan taklukkan berbagai medan ekstrem dari bukit hingga bulan!",
    rating: 4.3,
    version: "1.62.3",
    size: "200 MB",
    developer: "Fingersoft",
    category: "Racing",
    downloads: "100M+",
    updated: "2026-06-10",
    screenshots: [
      "https://play-lh.googleusercontent.com/hcr2_ss1.jpg",
      "https://play-lh.googleusercontent.com/hcr2_ss2.jpg",
      "https://play-lh.googleusercontent.com/hcr2_ss3.jpg"
    ],
    download: "https://www.fingersoft.com/games/hill-climb-racing-2/",
    features: [
      "Physics-based Racing",
      "30+ Vehicles",
      "Customization",
      "Team Events",
      "Adventure Mode",
      "Weekly Challenges"
    ],
    changelog: [
      {
        version: "1.62.3",
        date: "2026-06-10",
        changes: [
          "Vehicle baru: Amphibian",
          "Track baru",
          "Bug fixes",
          "UI improvements"
        ]
      }
    ],
    isTrending: false,
    isNew: false,
    isEditorsChoice: false,
    hasUpdate: false
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Simulasi network delay
 */
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Filter fields untuk list view (tanpa detail lengkap)
 */
const toListItem = (game) => ({
  id: game.id,
  title: game.title,
  banner: game.banner,
  icon: game.icon,
  rating: game.rating,
  size: game.size,
  version: game.version,
  developer: game.developer,
  category: game.category,
  downloads: game.downloads,
  updated: game.updated
});

/**
 * Filter fields untuk detail view
 */
const toDetailItem = (game) => ({ ...game });

// ============================================
// MOCK API SERVICE
// ============================================

class MockApiService {
  constructor() {
    this.data = GAMES_DATA;
  }

  /**
   * Get semua games (list view)
   */
  async getGames(filter = '') {
    await delay();

    let result = this.data.map(toListItem);

    if (filter) {
      const params = new URLSearchParams(filter);

      if (params.get('trending') === 'true') {
        result = this.data.filter(g => g.isTrending).map(toListItem);
      } else if (params.get('new') === 'true') {
        result = this.data.filter(g => g.isNew).map(toListItem);
      } else if (params.get('editors') === 'true') {
        result = this.data.filter(g => g.isEditorsChoice).map(toListItem);
      } else if (params.get('updates') === 'true') {
        result = this.data.filter(g => g.hasUpdate).map(toListItem);
      } else if (params.get('search')) {
        const query = params.get('search').toLowerCase();
        result = this.data.filter(g => 
          g.title.toLowerCase().includes(query) ||
          g.category.toLowerCase().includes(query) ||
          g.developer.toLowerCase().includes(query)
        ).map(toListItem);
      }
    }

    return result;
  }

  /**
   * Get trending games
   */
  async getTrending() {
    await delay();
    return this.data.filter(g => g.isTrending).map(toListItem);
  }

  /**
   * Get new games
   */
  async getNewGames() {
    await delay();
    return this.data.filter(g => g.isNew).map(toListItem);
  }

  /**
   * Get editor's choice
   */
  async getEditorsChoice() {
    await delay();
    return this.data.filter(g => g.isEditorsChoice).map(toListItem);
  }

  /**
   * Get updates
   */
  async getUpdates() {
    await delay();
    return this.data.filter(g => g.hasUpdate).map(toListItem);
  }

  /**
   * Get detail game by ID
   */
  async getGame(id) {
    await delay(400);
    const game = this.data.find(g => g.id === id);
    if (!game) {
      throw new Error(`Game dengan ID "${id}" tidak ditemukan`);
    }
    return toDetailItem(game);
  }

  /**
   * Search games
   */
  async searchGames(query) {
    if (!query || query.trim().length === 0) return [];
    await delay(200);

    const q = query.toLowerCase().trim();
    return this.data.filter(g => 
      g.title.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.developer.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q)
    ).map(toListItem);
  }

  /**
   * Get favorites dari storage
   */
  async getFavorites() {
    await delay(200);
    const favoriteIds = storage.getFavorites ? storage.getFavorites() : [];
    if (favoriteIds.length === 0) return [];

    return this.data
      .filter(g => favoriteIds.includes(g.id))
      .map(toListItem);
  }

  /**
   * Get game by category
   */
  async getByCategory(category) {
    await delay();
    return this.data
      .filter(g => g.category.toLowerCase() === category.toLowerCase())
      .map(toListItem);
  }

  /**
   * Get all categories
   */
  async getCategories() {
    await delay();
    const categories = [...new Set(this.data.map(g => g.category))];
    return categories.map(cat => ({
      name: cat,
      count: this.data.filter(g => g.category === cat).length,
      games: this.data.filter(g => g.category === cat).slice(0, 3).map(toListItem)
    }));
  }

  /**
   * Get related games (same category, exclude current)
   */
  async getRelated(id, limit = 4) {
    await delay();
    const game = this.data.find(g => g.id === id);
    if (!game) return [];

    return this.data
      .filter(g => g.id !== id && g.category === game.category)
      .slice(0, limit)
      .map(toListItem);
  }
}

// ============================================
// MOCK FETCH API (untuk intercept fetch calls)
// ============================================

/**
 * Setup mock fetch interceptor
 * Gunakan ini untuk mengganti fetch() global agar api.js bisa menggunakan data mock
 * 
 * Cara pakai:
 * import { setupMockFetch } from './games.js';
 * setupMockFetch(); // Panggil sebelum api.js di-import
 */
export function setupMockFetch() {
  const mockApi = new MockApiService();

  const originalFetch = window.fetch;

  window.fetch = async function(url, options = {}) {
    // Hanya intercept URL yang mengandung /api/
    if (typeof url === 'string' && url.includes('/api/')) {
      try {
        const urlObj = new URL(url, window.location.origin);
        const path = urlObj.pathname;
        const params = urlObj.searchParams;

        let data;

        if (path === '/api/games') {
          if (params.has('trending')) {
            data = await mockApi.getTrending();
          } else if (params.has('new')) {
            data = await mockApi.getNewGames();
          } else if (params.has('editors')) {
            data = await mockApi.getEditorsChoice();
          } else if (params.has('updates')) {
            data = await mockApi.getUpdates();
          } else if (params.has('search')) {
            data = await mockApi.searchGames(params.get('search'));
          } else {
            data = await mockApi.getGames();
          }
        } else if (path === '/api/game') {
          const id = params.get('id');
          data = await mockApi.getGame(id);
        } else {
          // Fallback ke fetch asli untuk endpoint lain
          return originalFetch(url, options);
        }

        // Return mock Response object
        return new Response(JSON.stringify(data), {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' }
        });

      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 404,
          statusText: 'Not Found',
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Untuk URL lain, gunakan fetch asli
    return originalFetch(url, options);
  };
}

// ============================================
// EXPORTS
// ============================================

const mockApi = new MockApiService();

export { mockApi, MockApiService, GAMES_DATA };
export default mockApi;
