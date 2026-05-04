#!/usr/bin/env node
/**
 * Generate config.js dari environment variables.
 *
 * Dipakai sebagai "Build command" di Cloudflare Pages
 * (`npm run build`). Variabel yang dibaca:
 *
 *   SUPABASE_URL        — Project URL Supabase
 *   SUPABASE_ANON_KEY   — anon public key Supabase
 *
 * Anon key Supabase memang publik (RLS yang melindungi data),
 * jadi aman di-embed pada bundle statis yang dilayani CDN.
 *
 * Bila kedua env var KOSONG, script ini TIDAK menyentuh config.js
 * sehingga nilai yang sudah di-commit tetap dipakai. Ini berguna
 * supaya repo bisa di-deploy tanpa setting env vars di dashboard.
 */

const fs = require('fs');
const path = require('path');

const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_ANON_KEY || '';

if (!url && !key) {
  console.log(
    '[build] SUPABASE_URL & SUPABASE_ANON_KEY tidak diset di env; ' +
      'mempertahankan nilai yang sudah di-commit pada config.js.'
  );
  process.exit(0);
}

const sbUrl = url || 'YOUR_SUPABASE_URL';
const sbKey = key || 'YOUR_SUPABASE_ANON_KEY';

const banner =
  `// AUTO-GENERATED oleh build.cjs (jangan diedit manual; nilai diambil dari env Cloudflare Pages).\n`;
const body =
  `window.SB_URL = ${JSON.stringify(sbUrl)};\n` +
  `window.SB_KEY = ${JSON.stringify(sbKey)};\n`;

const outPath = path.join(__dirname, 'config.js');
fs.writeFileSync(outPath, banner + body);

const masked = sbKey === 'YOUR_SUPABASE_ANON_KEY'
  ? sbKey
  : sbKey.slice(0, 6) + '…' + sbKey.slice(-4);

console.log(
  `[build] config.js ditulis. SUPABASE_URL=${sbUrl} SUPABASE_ANON_KEY=${masked}`
);

if (sbUrl === 'YOUR_SUPABASE_URL' || sbKey === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn(
    '[build] PERINGATAN: salah satu env var kosong. ' +
      'Periksa Cloudflare Pages → Settings → Environment Variables.'
  );
}
