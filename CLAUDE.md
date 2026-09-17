# CLAUDE.md — web-ibro

## Projektstatus

**Entwurf, kein aktives Kundenprojekt.** IBRo ist noch keine Kundin von
DzB Consulting. Diese Seite wurde initiativ als Redesign-Vorschlag für die
bestehende Seite ibro.de gebaut, um sie an die Firmengruppe zu senden.
Solange kein Auftrag vorliegt, gelten die Betriebsregeln für
Kundenprojekte (Domain, Hosting, AV-Vertrag) noch nicht verbindlich —
aber die technische Umsetzung ist bereits so gebaut, als würden sie
gelten, damit bei Zusage nichts umgebaut werden muss.

## Projektname & Ziel

IBRo Firmengruppe — eine gemeinsame Landingpage für die vier
Gesellschaften der Firmengruppe (Sitz Roggentin bei Rostock, seit 1990):

- **IBRo Funk und Marketing GmbH** — Verwaltungsgesellschaft
- **IBRo Funk GmbH** — Kommunikationstechnik (stationär & mobil, Auerswald-Partner)
- **IBRo Service GmbH** — Communication-Center (Inbound/Outbound)
- **IBRo Versandservice GmbH** — Logistik & Fulfillment

Ziel des Entwurfs: die bestehende Joomla-Seite (vier lose verlinkte
Unterbereiche) durch eine Seite ersetzen, die den Firmenverbund als
zusammenhängende Geschichte erzählt — eine Seite, vier klar geführte
Abschnitte, echte Inhalte der Originalseite.

## Zielgruppe

B2B: Unternehmen und öffentliche Auftraggeber, die Kommunikationstechnik,
Call-Center-Leistungen oder Logistik/Fulfillment auslagern wollen. Zweitrangig:
Bewerber (Karriere).

## Technologiestack

- Astro 5, TypeScript strict
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Schriften selbst gehostet über `@fontsource` (Space Grotesk, Public Sans) — kein CDN
- Hosting: Cloudflare Workers als reiner Static-Assets-Worker
  (`wrangler.jsonc`, kein Worker-Skript, kein SSR-Adapter — die Seite ist
  vollständig statisch). Entwurf läuft auf `workers.dev`; echte Domain
  erst nach Auftrag.
- Formulare: noch keine — Kontakt aktuell nur per Telefon (`tel:`-Link).
  Sobald ein Formular gewünscht ist: Formsubmit, anonymisierte Kennung,
  Empfänger die Adresse der jeweils zuständigen Gesellschaft.

## Design

Apple-Ästhetik nach DzB-Hausstil, aber mit eigener Akzentfarbe für dieses
Projekt (nicht das übliche Petrol), weil die Zielgruppe (Funktechnik +
Logistik) ein eigenes Vokabular verdient:

- Papierweiß `#F6F4EF` / getönt `#EFEADD` als Flächenwechsel zwischen den
  vier Firmenabschnitten
- Tinte `#1B2430`, gedämpft `#5B6570`, Haarlinie `#D9D2C0`
- Dunkles Navy `#16202B` für Hero und Kontakt (Rahmen der Seite)
- Signalfarbe (Messing-Amber) `#D69A2D`, Hover-Ton `#B67F1E`
- Display: Space Grotesk (600/700) — Fließtext: Public Sans (400/500/600)
- Leitmotiv: ein Knoten-Diagramm (Verwaltungsgesellschaft + drei
  Tochtergesellschaften) im Hero, kleine Strichgrafiken je Sparte statt
  generischer Icon-Kacheln
- Bewegung nach `/apple-design`: Sofort-Feedback beim Antippen (`.press`),
  ein einziger orchestrierter Scroll-Reveal je Sektion (`.reveal`, per
  `IntersectionObserver`), `prefers-reduced-motion` respektiert

## Seitenstruktur

Einseitige Landingpage (`src/pages/index.astro`), Anker-Navigation zu den
vier Firmenabschnitten (`#holding`, `#funk`, `#service`, `#versand`) plus
`#standort`. Keine separaten Unterseiten geplant — bei Bedarf (z. B.
eigene Referenzen-/Karriere-Seite) später ergänzen.

## Komponentenstruktur

- `src/layouts/BaseLayout.astro` — Head, Meta, JSON-LD (`ProfessionalService`)
- `src/components/Nav.astro` — schwebende Pill-Navigation mit Liquid-Glass-Effekt
- `src/components/Hero.astro` — Einstieg mit Knoten-Diagramm
- `src/components/Verbund.astro` — Fakten-Leiste + Schnellnavigation
- `src/components/Division.astro` — wiederverwendbar für alle vier Firmen
  (Props: `id`, `bg`, `reverse`, `kicker`, `name`, `lead`, `extra`, `groups`)
- `src/components/Kontakt.astro` — Adresse, Telefon, Footer
- `src/pages/robots.txt.ts` — erzeugt die `robots.txt`; im Entwurfs-Build
  Sperre, im Produktions-Build Freigabe plus Sitemap-Verweis

## SEO-Vorgaben

- `site` in `astro.config.mjs` ist ein **Platzhalter** (`ibro.de`) — echte
  Domain gehört dem Kunden und muss vor Livegang bestätigt werden
- Der Entwurfs-Build (`PUBLIC_DRAFT=1`) setzt `noindex` und sperrt die
  `robots.txt`, damit die Testadresse nicht neben der echten Seite
  indexiert wird. Beim Livegang fällt das über `npm run build` weg
- JSON-LD `ProfessionalService` mit Adresse aus dem Kontakt-Seiteninhalt
  der bestehenden Seite
- OG-Bild fehlt noch (Platzhalter-Kommentar in `BaseLayout.astro`)
- Ein `<h1>` in `Hero.astro`, saubere Hierarchie darunter über `<h2>`/`<h3>`

## Formularlogik

Aktuell keine Formulare — nur `tel:`-Link im Kontaktbereich. Vor Formsubmit-
Einbindung: mit dem Kunden klären, an welche der vier Gesellschaften eine
Anfrage jeweils gehen soll (das Formular müsste vermutlich pro Sparte einen
anderen Empfänger haben).

## Verfügbare Scripts

```bash
npm install
npm run dev          # Dev-Server, http://localhost:4321
npm run build        # Produktions-Build nach dist/ (echte Domain, indexierbar)
npm run build:draft  # Entwurfs-Build (Testadresse, noindex)
npm run preview      # Build lokal ansehen
npm run cf:preview   # Entwurfs-Build im Worker-Runtime ansehen (wrangler dev)
npm run deploy:draft # Entwurf auf workers.dev veröffentlichen
```

## Wichtige Regeln für zukünftige Änderungen

- Bestehende Dateien zuerst prüfen, nie ohne Hinweis überschreiben
- Neue Inhalte für die vier Firmenabschnitte immer über `Division.astro`
  als Props einpflegen, nicht als eigene Ad-hoc-Markup-Blöcke
- Schriften bleiben selbst gehostet (`@fontsource`) — kein Google-Fonts-CDN
- `server`-Zeile in `astro.config.mjs` muss **innerhalb** von
  `defineConfig({...})` stehen, sonst bricht der Build
- Solange die Seite statisch bleibt, **keinen** `@astrojs/cloudflare`-Adapter
  einbauen — der wird erst gebraucht, wenn es SSR-Routen gibt (z. B. ein
  serverseitig verarbeitetes Formular). Falls doch einmal noetig: Version
  **12.x** nehmen (14.x verlangt Astro 7, das Projekt laeuft auf Astro 5)
- Bei Workers Builds muessen Build- und Deploy-Kommando im Dashboard
  ausdruecklich gesetzt sein (`npm run build:draft` / `npx wrangler deploy`),
  sonst fuehrt Cloudflare beim Build ungefragt `astro add cloudflare` aus und
  zieht den Adapter nach
- `public/.assetsignore` nicht loeschen — ohne die Datei bricht die
  Astro-Einrichtung von Cloudflare ab
- Der `name` in `wrangler.jsonc` muss dem Worker im Dashboard entsprechen
- Kein eigenständiges `git commit` oder `git push` ohne ausdrückliche
  Freigabe
