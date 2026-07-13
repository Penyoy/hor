/**
 * GameHub - Konfigurasi Firebase
 *
 * PENTING: Ganti nilai di bawah ini dengan konfigurasi project Firebase-mu sendiri.
 * Cara mendapatkannya:
 *   1. Buka https://console.firebase.google.com dan buat/pilih project.
 *   2. Buka Project settings -> General -> "Your apps" -> tambah Web App.
 *   3. Salin object firebaseConfig yang muncul ke sini.
 *   4. Di menu Authentication -> Sign-in method, aktifkan provider
 *      "Email/Password" dan "Google".
 *
 * File ini aman untuk berada di sisi client (bukan rahasia), tapi tetap
 * jangan sampai keys production tercampur dengan project demo/testing.
 */

const firebaseConfig = {
  apiKey: "AIzaSyDv8eCg1KVP1i8n1xsA6xko1KhYKYuI_Ys",
  authDomain: "anime-pull.firebaseapp.com",
  databaseURL: "https://anime-pull-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "anime-pull",
  storageBucket: "anime-pull.firebasestorage.app",
  messagingSenderId: "207802708188",
  appId: "1:207802708188:web:fedaf62ea041376c408419",
  measurementId: "G-D79KM7NBHW"
};

window.GAMEHUB_FIREBASE_CONFIGURED = firebaseConfig.apiKey !== 'GANTI_DENGAN_API_KEY';

if (window.firebase && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
