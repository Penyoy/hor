/**
 * GameHub - Auth Manager
 * Login, daftar, login Google, dan logout menggunakan Firebase Authentication.
 * Juga menyinkronkan avatar di bottom navigation di semua halaman.
 */

const GameHubAuth = {
  ready: false,
  current: null,
  listeners: [],

  init() {
    if (!window.GAMEHUB_FIREBASE_CONFIGURED || !window.firebase) {
      // Firebase belum dikonfigurasi - tetap render UI tamu tanpa error.
      this.ready = true;
      this._notify(null);
      return;
    }
    firebase.auth().onAuthStateChanged((user) => {
      this.current = user;
      this.ready = true;
      this._notify(user);
    });
  },

  onChange(callback) {
    this.listeners.push(callback);
    if (this.ready) callback(this.current);
  },

  _notify(user) {
    this.listeners.forEach((cb) => cb(user));
    this._syncNavAvatar(user);
  },

  _syncNavAvatar(user) {
    document.querySelectorAll('[data-nav-avatar]').forEach((el) => {
      el.innerHTML = this._avatarMarkup(user, 20);
    });
  },

  _avatarMarkup(user, size) {
    if (user && user.photoURL) {
      return `<img src="${user.photoURL}" alt="${this._displayName(user)}">`;
    }
    if (user) {
      return this._initialsSvgFallback(user);
    }
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="${size}" height="${size}"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  },

  _initialsSvgFallback(user) {
    const name = this._displayName(user);
    const letter = name.charAt(0).toUpperCase();
    return `<span>${letter}</span>`;
  },

  _displayName(user) {
    return (user && (user.displayName || user.email)) || 'Pengguna';
  },

  isConfigured() {
    return !!window.GAMEHUB_FIREBASE_CONFIGURED;
  },

  async register(name, email, password) {
    const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
    if (name) await cred.user.updateProfile({ displayName: name });
    return cred.user;
  },

  async login(email, password) {
    const cred = await firebase.auth().signInWithEmailAndPassword(email, password);
    return cred.user;
  },

  async loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const cred = await firebase.auth().signInWithPopup(provider);
    return cred.user;
  },

  async logout() {
    await firebase.auth().signOut();
  },

  friendlyError(err) {
    const map = {
      'auth/email-already-in-use': 'Email ini sudah terdaftar. Coba masuk saja.',
      'auth/invalid-email': 'Format email tidak valid.',
      'auth/weak-password': 'Password minimal 6 karakter.',
      'auth/user-not-found': 'Akun dengan email ini tidak ditemukan.',
      'auth/wrong-password': 'Password salah. Coba lagi.',
      'auth/invalid-credential': 'Email atau password salah.',
      'auth/too-many-requests': 'Terlalu banyak percobaan. Coba lagi nanti.',
      'auth/popup-closed-by-user': 'Login dibatalkan.'
    };
    return map[err.code] || 'Terjadi kesalahan. Coba lagi.';
  }
};

window.GameHubAuth = GameHubAuth;
GameHubAuth.init();
