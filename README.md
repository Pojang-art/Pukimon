# Pukimon — Chess Fantasy

Aplikasi statis (HTML/CSS/JS murni) yang sebelumnya berjalan di Express +
EJS, kini siap di-deploy ke **Cloudflare Pages** atau static host
manapun (Vercel static, Netlify, GitHub Pages, dsb.).

## Struktur

```
.
├── index.html       (alias lobby — dibuat via _redirects)
├── lobby.html       Halaman utama (lobby + chat + login)
├── Chess.html       Arena gameplay
├── Fix.html         Workshop
├── Pf.html          Profile
├── config.js        Konfigurasi Supabase (URL + anon key, publik)
├── _redirects       Routing Cloudflare Pages (alias /, /chess, dsb.)
└── README.md
```

## Konfigurasi Supabase

Edit `config.js`:

```js
window.SB_URL = 'https://xxxx.supabase.co';
window.SB_KEY = 'eyJhbGciOi...'; // anon public key
```

Anon key Supabase memang publik (Row Level Security yang melindungi
data), jadi aman di-commit.

Bila placeholder dibiarkan, aplikasi otomatis berjalan dalam **DEMO MODE**
(login asli & multiplayer dimatikan).

## Menjalankan Lokal

Cukup serve folder ini lewat static server apa pun:

```bash
# Python
python3 -m http.server 8000

# Node (tanpa install)
npx --yes serve -l 8000 .
```

Lalu buka <http://localhost:8000/>.

## Deploy ke Cloudflare Pages

### Opsi 1 — Git Integration (rekomendasi)

1. Buka <https://dash.cloudflare.com> → **Workers & Pages** → **Create**
   → **Pages** → **Connect to Git**.
2. Pilih repo `Pojang-art/Pukimon`.
3. **Build settings**:
   - Framework preset: **None**
   - Build command: *(kosongkan)*
   - Build output directory: `/`
4. Save & Deploy. Cloudflare akan auto-deploy setiap push ke `main`.

### Opsi 2 — Wrangler CLI

```bash
npm install -g wrangler
wrangler pages deploy . --project-name=pukimon
```

(Memerlukan `CLOUDFLARE_API_TOKEN` & account ID di environment.)

## OAuth Login

Login Google / GitHub sekarang dilakukan langsung dari browser via
`supabase.auth.signInWithOAuth(...)`. Pastikan di Supabase Dashboard:

- **Authentication → URL Configuration → Site URL**: domain Cloudflare
  Pages Anda (mis. `https://pukimon.pages.dev`).
- **Redirect URLs** menambahkan domain produksi & preview yang sama.
