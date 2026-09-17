// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Entwurfs-Build (npm run build:draft) setzt PUBLIC_DRAFT=1. Dann zeigen
// Canonical, Sitemap und robots.txt auf die workers.dev-Testadresse statt
// auf die echte Kundendomain — und die Seite wird auf noindex gesetzt.
const isDraft = process.env.PUBLIC_DRAFT === '1';

// TODO: Domain noch nicht bestätigt — IBRo ist noch kein Kunde, nur Entwurf.
// Vor Livegang auf die echte Domain setzen (site + Sitemap hängen daran).
// Die workers.dev-Adresse haengt am Cloudflare-Account, deshalb per
// SITE_URL ueberschreibbar: SITE_URL=https://… npm run deploy:draft
const site =
  process.env.SITE_URL ??
  (isDraft ? 'https://web-ibro-entwurf.workers.dev' : 'https://www.ibro.de');

export default defineConfig({
  site,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  server: { host: true, port: 4321 },
});
