/**
 * GameHub - Logika Halaman Profil
 * Menghubungkan form login/daftar/Google/logout ke GameHubAuth,
 * dan menampilkan statistik favorit/unduhan dari GameHubStorage.
 */

(function () {
  const configNotice = document.getElementById('configNotice');
  const guestSection = document.getElementById('guestSection');
  const userSection = document.getElementById('userSection');
  const authError = document.getElementById('authError');

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginSubmit = document.getElementById('loginSubmit');
  const registerSubmit = document.getElementById('registerSubmit');
  const googleLoginBtn = document.getElementById('googleLoginBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  const authTabs = document.querySelectorAll('.auth-tabs__btn');
  const switchToRegister = document.getElementById('switchToRegister');
  const authNote = document.getElementById('authNote');

  const profileAvatar = document.getElementById('profileAvatar');
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const statDownloads = document.getElementById('statDownloads');
  const statFavorites = document.getElementById('statFavorites');

  function showError(message) {
    if (!authError) return;
    authError.textContent = message;
    authError.style.display = message ? 'block' : 'none';
  }

  function setTab(tab) {
    authTabs.forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === tab));
    loginForm.style.display = tab === 'login' ? 'block' : 'none';
    registerForm.style.display = tab === 'register' ? 'block' : 'none';
    if (authNote) {
      authNote.innerHTML = tab === 'login'
        ? 'Belum punya akun? <a href="#" id="switchToRegister">Daftar di sini</a>'
        : 'Sudah punya akun? <a href="#" id="switchToLogin">Masuk di sini</a>';
      // Re-bind link yang baru dibuat lewat innerHTML
      const link = authNote.querySelector('a');
      link?.addEventListener('click', (e) => {
        e.preventDefault();
        setTab(tab === 'login' ? 'register' : 'login');
      });
    }
    showError('');
  }

  authTabs.forEach((btn) => {
    btn.addEventListener('click', () => setTab(btn.dataset.tab));
  });
  switchToRegister?.addEventListener('click', (e) => {
    e.preventDefault();
    setTab('register');
  });

  function setLoading(button, isLoading, label) {
    if (!button) return;
    button.disabled = isLoading;
    button.textContent = isLoading ? 'Memproses…' : label;
  }

  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    showError('');
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    setLoading(loginSubmit, true, 'Masuk');
    try {
      await GameHubAuth.login(email, password);
    } catch (err) {
      showError(GameHubAuth.friendlyError(err));
    } finally {
      setLoading(loginSubmit, false, 'Masuk');
    }
  });

  registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    showError('');
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;

    setLoading(registerSubmit, true, 'Buat Akun');
    try {
      await GameHubAuth.register(name, email, password);
    } catch (err) {
      showError(GameHubAuth.friendlyError(err));
    } finally {
      setLoading(registerSubmit, false, 'Buat Akun');
    }
  });

  googleLoginBtn?.addEventListener('click', async () => {
    showError('');
    try {
      await GameHubAuth.loginWithGoogle();
    } catch (err) {
      showError(GameHubAuth.friendlyError(err));
    }
  });

  logoutBtn?.addEventListener('click', async () => {
    try {
      await GameHubAuth.logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  });

  function renderStats() {
    if (!window.GameHubStorage) return;
    statDownloads.textContent = GameHubStorage.getDownloads().length;
    statFavorites.textContent = GameHubStorage.getFavorites().length;
  }

  function renderUser(user) {
    if (!window.GAMEHUB_FIREBASE_CONFIGURED) {
      if (configNotice) configNotice.style.display = 'block';
    }

    if (user) {
      guestSection.style.display = 'none';
      userSection.style.display = 'block';

      const name = user.displayName || 'Pengguna';
      profileName.textContent = name;
      profileEmail.textContent = user.email || '';
      profileAvatar.innerHTML = user.photoURL
        ? `<img src="${user.photoURL}" alt="${name}">`
        : `<span>${name.charAt(0).toUpperCase()}</span>`;

      renderStats();
    } else {
      guestSection.style.display = 'block';
      userSection.style.display = 'none';
      setTab('login');
    }
  }

  // Tunggu GameHubAuth siap (dimuat oleh js/auth.js sebelum file ini)
  if (window.GameHubAuth) {
    GameHubAuth.onChange(renderUser);
  } else {
    console.error('GameHubAuth belum dimuat. Pastikan js/auth.js dimuat sebelum js/profile-page.js.');
  }

  document.addEventListener('gamehub:favorites-changed', renderStats);
  document.addEventListener('gamehub:downloads-changed', renderStats);
})();
