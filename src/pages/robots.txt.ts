import type { APIRoute } from 'astro';

// Ersetzt die frühere statische public/robots.txt: der Entwurf auf der
// workers.dev-Adresse soll nicht indexiert werden (IBRo ist noch keine
// Kundin — eine zweite indexierte Fassung der Firmenseite waere schaedlich).
// Der Produktions-Build (ohne PUBLIC_DRAFT) gibt weiter frei wie zuvor.
const isDraft = import.meta.env.PUBLIC_DRAFT === '1';

export const GET: APIRoute = ({ site }) => {
  const body = isDraft
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
