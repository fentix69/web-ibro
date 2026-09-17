# web-ibro

Redesign-Entwurf für die Webseite der **IBRo Firmengruppe** (ibro.de) —
initiativ erstellt von DzB Consulting, noch kein aktives Kundenprojekt.

## Ziel

Die vier Gesellschaften der Firmengruppe — IBRo Funk und Marketing GmbH,
IBRo Funk GmbH, IBRo Service GmbH und IBRo Versandservice GmbH — als
einen zusammenhängenden Firmenverbund auf einer Seite zeigen, statt als
vier lose verlinkte Unterbereiche.

## Tech-Stack

- [Astro](https://astro.build) 5, TypeScript (strict)
- [Tailwind CSS](https://tailwindcss.com) v4
- Schriften selbst gehostet über `@fontsource` (Space Grotesk, Public Sans)

## Wichtigste Funktionen

- Eine Seite, vier Firmenabschnitte, echte Inhalte der bestehenden Seite
- Anker-Navigation über eine schwebende Pill-Nav
- Knoten-Diagramm im Hero als Leitmotiv des Firmenverbunds
- Scroll-Reveal respektiert `prefers-reduced-motion`

## Seitenübersicht

Einseitige Landingpage mit den Abschnitten:

1. Hero
2. Firmenverbund (Fakten + Schnellnavigation)
3. IBRo Funk und Marketing GmbH (`#holding`)
4. IBRo Funk GmbH (`#funk`)
5. IBRo Service GmbH (`#service`)
6. IBRo Versandservice GmbH (`#versand`)
7. Standort & Kontakt (`#standort`)

## Lokale Installation

```bash
npm install
```

## Entwicklungsserver

```bash
npm run dev
```

Läuft unter `http://localhost:4321`.

## Build

```bash
npm run build         # Produktions-Build (echte Domain, indexierbar)
npm run build:draft   # Entwurfs-Build (Testadresse, noindex)
```

## Vorschau

```bash
npm run preview       # Astro-Vorschau
npm run cf:preview    # Entwurfs-Build im echten Worker-Runtime ansehen
```

## Deployment

Cloudflare Workers, als reiner Static-Assets-Worker (`wrangler.jsonc`) —
die Seite ist vollständig statisch, es läuft kein Worker-Skript.

```bash
npx wrangler login
npm run deploy:draft
```

Das veröffentlicht den Entwurf unter
`https://web-ibro-entwurf.<subdomain>.workers.dev`. Weicht die Adresse ab,
den Build einmal mit der echten Adresse bauen, damit Canonical und Sitemap
stimmen:

```bash
SITE_URL=https://web-ibro-entwurf.<subdomain>.workers.dev npm run deploy:draft
```

Der Entwurf ist bewusst auf `noindex` gesetzt und die `robots.txt` sperrt
ihn — solange IBRo keine Kundin ist, darf keine zweite Fassung der
Firmenseite im Index landen. Erst zum Livegang (nach Auftrag): Worker-Namen
und Domain in `wrangler.jsonc` setzen und mit `npm run build` deployen.

## Umgebungsvariablen

Keine für den normalen Betrieb. Zwei Schalter nur für den Entwurfs-Deploy:

| Variable | Wirkung |
| --- | --- |
| `PUBLIC_DRAFT=1` | setzt `noindex` und sperrt die `robots.txt`; setzt `npm run build:draft` selbst |
| `SITE_URL` | überschreibt die Basis-URL für Canonical und Sitemap |

## Formular-Hinweise

Aktuell kein Formular eingebunden — Kontakt nur per Telefon. Details
und offene Fragen dazu in `CLAUDE.md` unter „Formularlogik".

## Projektstruktur

```
src/
  layouts/BaseLayout.astro
  components/
    Nav.astro
    Hero.astro
    Verbund.astro
    Division.astro
    Kontakt.astro
  pages/
    index.astro
    robots.txt.ts   # draft-abhaengig: Freigabe oder Sperre
  styles/global.css
public/
  favicon.svg
wrangler.jsonc      # Cloudflare-Workers-Deploy (Static Assets)
```

## Hinweise für zukünftige Entwickler

Siehe `CLAUDE.md` für Designvorgaben, SEO-Status und offene Punkte
(Domain, OG-Bild, Formularlogik).
