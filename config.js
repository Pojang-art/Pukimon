// ══════════════════════════════════════════════════════════
//   CONFIG SUPABASE — GANTI VALUE DI BAWAH DENGAN PROYEK ANDA
// ══════════════════════════════════════════════════════════
//
// Anon key Supabase memang dirancang untuk dipakai di sisi klien
// (publik). Cukup salin "Project URL" dan "anon public" key dari
// Supabase Dashboard → Settings → API, lalu paste di sini.
//
// Jika nilai dibiarkan placeholder, aplikasi otomatis berjalan
// dalam mode DEMO (tanpa multiplayer / login asli).
//
// Untuk Cloudflare Pages Git deployment, file ini di-commit apa
// adanya. Bila ingin men-generate dari env saat build, ganti
// nilai di bawah lewat build command (mis. `envsubst < config.tpl.js > config.js`).

window.SB_URL = 'YOUR_SUPABASE_URL';
window.SB_KEY = 'YOUR_SUPABASE_ANON_KEY';
