// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // TODO: Domain noch nicht bestätigt — IBRo ist noch kein Kunde, nur Entwurf.
  // Vor Livegang auf die echte Domain setzen (site + Sitemap hängen daran).
  site: 'https://www.ibro.de',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  server: { host: true, port: 4321 },
});
