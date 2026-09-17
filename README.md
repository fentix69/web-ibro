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
npm run build
```

## Vorschau

```bash
npm run preview
```

## Deployment

Vorgesehen: Cloudflare Workers, sobald ein Auftrag vorliegt. Vorher auf
der `workers.dev`-Testadresse prüfen, danach DNS umstellen (siehe
`CLAUDE.md`).

## Umgebungsvariablen

Keine.

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
  pages/index.astro
  styles/global.css
public/
  robots.txt
  favicon.svg
```

## Hinweise für zukünftige Entwickler

Siehe `CLAUDE.md` für Designvorgaben, SEO-Status und offene Punkte
(Domain, OG-Bild, Formularlogik).
