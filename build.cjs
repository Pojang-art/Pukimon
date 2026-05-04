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
 * Bila salah satu env var tidak diset, file akan tetap dibuat
 * dengan placeholder sehingga aplikasi otomatis berjalan dalam
 * DEMO MODE (multiplayer & login Supabase dimatikan).
 */

const fs = require('fs');
const path = require('path');

const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_ANON_KEY || '';

const sbUrl = url || 'YOUR_SUPABASE_URL';
const sbKey = key || 'YOUR_SUPABASE_ANON_KEY';

const banner = `// AUTO-GENERATED oleh build.cjs (jangan diedit manual; nilai diambil dari env Cloudflare Pages).\n`;
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
    '[build] PERINGATAN: SUPABASE_URL / SUPABASE_ANON_KEY belum diset. ' +
      'App akan berjalan dalam DEMO MODE. Set env vars di Cloudflare Pages → ' +
      'Settings → Environment Variables, lalu re-deploy.'
  );
}
