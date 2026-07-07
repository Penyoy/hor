export default function handler(req, res) {
  const games = [
    {
      "id": "minecraft",
      "title": "Minecraft",
      "shortTitle": "Minecraft",
      "banner": "https://example.com/images/minecraft/banner.jpg",
      "icon": "https://example.com/images/minecraft/icon.png",

      "trending": true,
      "new": false,
      "editorsChoice": true,
      "updated": true,
      "verified": true,

      "description": "Minecraft adalah game sandbox yang memungkinkan pemain membangun, bertahan hidup, menjelajah, dan berkreasi di dunia yang dibuat secara prosedural.",

      "developer": "Mojang Studios",
      "publisher": "Xbox Game Studios",

      "category": [
        "Sandbox",
        "Adventure"
      ],

      "tags": [
        "Offline",
        "Online",
        "Multiplayer",
        "Creative",
        "Survival",
        "Open World"
      ],

      "version": "1.21.1",
      "size": "285 MB",

      "package": "com.mojang.minecraftpe",

      "android": "8.0+",

      "language": [
        "Indonesia",
        "English"
      ],

      "license": "Berbayar",

      "mod": false,

      "rating": 4.8,

      "downloads": "100M+",

      "views": 5293481,

      "releaseDate": "2026-06-15",

      "updatedDate": "2026-07-01",

      "download": {
        "apk": "https://example.com/download/minecraft.apk",
        "mirror": "https://mirror.example.com/minecraft.apk"
      },

      "screenshots": [
        "https://example.com/images/minecraft/1.jpg",
        "https://example.com/images/minecraft/2.jpg",
        "https://example.com/images/minecraft/3.jpg",
        "https://example.com/images/minecraft/4.jpg"
      ],

      "features": [
        "Creative Mode",
        "Survival Mode",
        "Cross Platform Multiplayer",
        "Marketplace",
        "Achievements",
        "Realms Support"
      ],

      "changelog": [
        {
          "version": "1.21.1",
          "date": "2026-07-01",
          "changes": [
            "Bug fixes",
            "Performance improvements",
            "Added new blocks",
            "Improved multiplayer stability"
          ]
        },
        {
          "version": "1.21.0",
          "date": "2026-06-10",
          "changes": [
            "New mobs",
            "New structures"
          ]
        }
      ]
    },

    {
      "id": "doki-doki-literature-club",
      "title": "Doki Doki Literature Club!",
      "shortTitle": "DDLC",
      "banner": "https://example.com/images/ddlc/banner.jpg",
      "icon": "https://example.com/images/ddlc/icon.png",

      "trending": false,
      "new": false,
      "editorsChoice": true,
      "updated": false,
      "verified": true,

      "description": "Doki Doki Literature Club! adalah visual novel yang awalnya tampak seperti game simulasi kencan, tetapi memiliki elemen psikologis yang kuat dan alur cerita yang tidak terduga.",

      "developer": "Team Salvato",
      "publisher": "Team Salvato",

      "category": [
        "Visual Novel",
        "Psychological Horror"
      ],

      "tags": [
        "Story",
        "Anime",
        "Single Player",
        "Visual Novel"
      ],

      "version": "1.1.1",

      "size": "220 MB",

      "package": "org.teamsalvato.ddlc",

      "android": "7.0+",

      "language": [
        "English",
        "Indonesia"
      ],

      "license": "Gratis",

      "mod": false,

      "rating": 4.9,

      "downloads": "10M+",

      "views": 1392831,

      "releaseDate": "2026-05-11",

      "updatedDate": "2026-05-11",

      "download": {
        "apk": "https://example.com/download/ddlc.apk",
        "mirror": "https://mirror.example.com/ddlc.apk"
      },

      "screenshots": [
        "https://example.com/images/ddlc/1.jpg",
        "https://example.com/images/ddlc/2.jpg",
        "https://example.com/images/ddlc/3.jpg"
      ],

      "features": [
        "Story Rich",
        "Multiple Endings",
        "Original Soundtrack",
        "Visual Novel",
        "Psychological Horror"
      ],

      "changelog": [
        {
          "version": "1.1.1",
          "date": "2026-05-11",
          "changes": [
            "Improved compatibility",
            "Minor bug fixes"
          ]
        }
      ]
    }
  ];

  res.status(200).json({
    status: true,
    data: games
  });
    }
