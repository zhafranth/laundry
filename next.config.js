// next.config.js
const withPWA = require("next-pwa")({
  dest: "public", // lokasi di mana service worker akan di-generate
  register: true, // secara otomatis register service worker
  skipWaiting: true, // langsung mengaktifkan service worker baru tanpa menunggu yang lama berhenti
});

module.exports = withPWA({
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // konfigurasi Next.js lainnya di sini
});
