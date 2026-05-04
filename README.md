# Pukimon — Chess Fantasy

Aplikasi statis (HTML/CSS/JS murni) yang sebelumnya berjalan di
Express + EJS, kini siap di-deploy ke **Cloudflare Pages** atau static
host manapun. Konfigurasi Supabase diambil dari environment variables
Cloudflare Pages saat build.

## Struktur

```
.
├── index.html       Redirect ke /lobby.html (untuk path "/")
├── lobby.html       Halaman utama (lobby + chat + login)
├── Chess.html       Arena gameplay
├── Fix.html         Workshop
├── Pf.html          Profile
├── config.js        Auto-generated dari env (Supabase URL + anon key)
├── build.cjs        Generate config.js dari env Cloudflare Pages
├── _redirects       Routing Cloudflare Pages (alias /, /chess, dsb.)
├── package.json     Script npm (build / start / deploy)
└── README.md
```

## Cara Kerja Konfigurasi Supabase

`config.js` di-commit dengan **placeholder** (mode DEMO).
Saat build di Cloudflare Pages, script `build.cjs` membaca:

| Env var              | Sumber Supabase Dashboard                 |
| -------------------- | ----------------------------------------- |
| `SUPABASE_URL`       | Settings → API → **Project URL**          |
| `SUPABASE_ANON_KEY`  | Settings → API → **anon public key**      |

…lalu menulis ulang `config.js` jadi:

```js
window.SB_URL = "https://xxx.supabase.co";
window.SB_KEY = "eyJhbGciOi...";
```

> Anon key Supabase memang publik (Row Level Security yang melindungi
> data), jadi aman terkirim ke browser.

Bila salah satu env var kosong, `build.cjs` tetap menulis placeholder
sehingga aplikasi otomatis berjalan dalam **DEMO MODE** (login Supabase
& multiplayer dimatikan) — tidak akan crash di produksi.

## Deploy ke Cloudflare Pages

### Lewat Git Integration (rekomendasi)

1. Buka <https://dash.cloudflare.com> → **Workers & Pages** → **Create**
   → **Pages** → **Connect to Git** → pilih repo `Pojang-art/Pukimon`.
2. **Build settings**:
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `/`
3. **Environment variables** (Production *dan* Preview):
   - `SUPABASE_URL` = `https://xxxx.supabase.co`
   - `SUPABASE_ANON_KEY` = `eyJhbGciOi…` (anon public)
4. **Save and Deploy**.

Setiap push ke `main` akan auto-rebuild & redeploy.

### Lewat Wrangler (CLI lokal)

```bash
SUPABASE_URL=... SUPABASE_ANON_KEY=... npm run deploy
```

Memerlukan `CLOUDFLARE_API_TOKEN` di environment.

## Konfigurasi Supabase Dashboard

Authentication → URL Configuration:

- **Site URL**: domain Cloudflare Pages produksi
  (mis. `https://pukimon.pages.dev`).
- **Redirect URLs**: tambahkan domain produksi & semua preview
  (`https://*.pukimon.pages.dev`) supaya OAuth Google/GitHub callback
  tidak ditolak.

## Menjalankan Lokal

```bash
# Mode DEMO (cepat, tanpa Supabase)
npm start

# Dengan Supabase asli
SUPABASE_URL=https://xxxx.supabase.co \
SUPABASE_ANON_KEY=eyJhbGciOi... \
npm start
```

Buka <http://localhost:8000/>.
