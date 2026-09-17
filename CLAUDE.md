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

Apple-Ästhetik im hellen DzB-Hausstil, aufgebaut wie `web-fondaco`
(gleiches Tokenschema, gleiche Materialien, gleiche Typo-Klassen), aber
mit eigener Akzentfarbe für dieses Projekt.

- Flächen neutral nach Apple-Art: Weiß `#FFFFFF` / `#F5F5F7` im Wechsel
  zwischen den Abschnitten. Das frühere warme Papierweiß ist entfallen
- **Firmenblau der IBRo-Gruppe** `#1F4287` (aus der Vorlage des Kunden
  abgelesen, nicht aus einer Datei ausgelesen — bei Gelegenheit gegen den
  exakten Wert aus dem Logo prüfen). Als Text 9,60:1 auf Weiß
- Dunkle Fläche ist das **vertiefte** Firmenblau `#16305F`, nicht das reine:
  auf `#1F4287` käme das helle Amber nur auf 3,89:1, auf `#16305F` auf
  5,25:1 — daran hängt die Lesbarkeit der Knopfbeschriftung
- **Aufgabenteilung der beiden Akzente**, damit sie sich nicht streiten:
  Blau trägt Identität und Struktur (dunkle Fläche, Atmosphäre,
  Eyebrow-Striche, Nummerierung, Eckdaten, Wortmarke, Hover, Fokus).
  Amber ist allein die Handlungsfarbe (Knöpfe, Haken in den Listen) und
  wirkt dadurch stärker, weil es selten vorkommt
- Tinte `#1D1D1F`, gedämpft `#56565A`, zurückgenommen `#6E6E73`,
  Haarlinie `#D9D9DE`
- Akzent Messing-Amber, **zwei Werte mit klarer Aufgabenteilung**:
  `--color-brand` `#8F6212` für Text (5,35:1 auf Weiß, 4,92:1 auf
  `#F5F5F7`), `--color-brand-bright` `#D69A2D` nur für Flächen, Linien und
  Haken. Der helle Ton kommt als Text auf Weiß nur auf 2,4:1 und ist dort
  unzulässig; auf Navy trägt er (6,68:1)
- Display: Space Grotesk (600) — Fließtext: Public Sans (400/500/600).
  Größen über `.t-display`, `.t-h2`, `.t-h3`, `.t-lead`, `.t-body`,
  `.t-eyebrow`, `.t-numeral`; Tracking und Leading sind größenabhängig
- Materialien: `.glass` (hell), `.glass-thick` (große Flächen lesen sich
  dicker), `.glass-dark` (auf Navy), jeweils mit heller Oberkante und
  `@supports`-Rückfall ohne Blur
- Kein Knoten-Diagramm mehr. Der Hero trägt stattdessen eine Glaskarte mit
  den vier Gesellschaften als nummerierte Zeilen. Die kleinen
  Strichgrafiken je Sparte bleiben, jetzt in einer Glaskachel
- Bewegung nach `/apple-design`: Sofort-Feedback beim Antippen
  (`[data-press]`), Einblenden je Abschnitt gestaffelt über
  `[data-reveal-item]` und `IntersectionObserver`. Keine Bewegungs-
  bibliothek — nichts auf dieser Seite ist gestisch, deshalb genügen
  CSS-Kurven
- Drei Bedienhilfen-Signale getrennt behandelt: `prefers-reduced-motion`,
  `prefers-reduced-transparency`, `prefers-contrast`

## Seitenstruktur

Einseitige Landingpage (`src/pages/index.astro`), Anker-Navigation zu den
vier Firmenabschnitten (`#holding`, `#funk`, `#service`, `#versand`) plus
`#standort`. Keine separaten Unterseiten geplant — bei Bedarf (z. B.
eigene Referenzen-/Karriere-Seite) später ergänzen.

## Komponentenstruktur

- `src/layouts/BaseLayout.astro` — Head, Meta, JSON-LD
  (`ProfessionalService`), setzt die Klasse `js` am `<html>`
- `src/components/Container.astro` — einheitliche Seitenbreite und Ränder
- `src/components/SectionHeading.astro` — Eyebrow + `h2` + Lead, auch für
  dunklen Grund (`onDark`)
- `src/components/Nav.astro` — schwebende Pill-Navigation, weiche
  Scroll-Kante statt Trennlinie, Mobilmenü
- `src/components/Hero.astro` — Einstieg mit Glaskarte „Der Verbund"
- `src/components/FactStrip.astro` — Eckdaten als **eine** durchgehende
  Glasfläche mit Trennlinien
- `src/components/Verbund.astro` — Abschnittskopf + Eckdaten
- `src/components/Division.astro` — wiederverwendbar für alle vier Firmen
  (Props: `id`, `bg` (`surface` | `muted`), `index`, `kicker`, `name`,
  `lead`, `extra`, `groups`; Slots: `icon`, `sparte`). Die Leistungen
  stehen in Glaskarten, eine je Gruppe
- `src/components/Kontakt.astro` — Standortfoto, Adresse, Telefon, Footer
- `src/pages/robots.txt.ts` — erzeugt die `robots.txt`; im Entwurfs-Build
  Sperre, im Produktions-Build Freigabe plus Sitemap-Verweis

## Bildmaterial

- `src/assets/standort-roggentin.jpg` — Firmengebäude am Kastanienweg,
  813 × 425 px. Liegt bewusst in `src/assets/` und nicht in `public/`:
  nur von dort optimiert Astro automatisch nach WebP und erzeugt die
  Größenvarianten (155 kB → 63 kB bzw. 17 kB)
- Astro skaliert **nicht** über die Quellbreite hinaus. Das Foto steht
  deshalb in einer Spalte und nicht über die volle Breite — sonst würde es
  auf großen Schirmen weichgezogen. Eine höher aufgelöste Fassung wäre der
  nächste Schritt
- Weitere Bilder ebenfalls nach `src/assets/` legen, mit sprechendem
  Dateinamen, und über `<Image>` aus `astro:assets` einbinden

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
- **Nie eine Deckkraft zwischen 0 und 1 auf einen Vorfahren einer
  Glasfläche legen.** Das macht eine eigene Composite-Ebene auf, und
  `backdrop-filter` filtert dann nur noch innerhalb dieser Ebene — die
  Karte sieht flach aus, in Chromium teils dauerhaft. Deshalb hängt das
  Einblenden an den einzelnen Elementen (`[data-reveal-item]`), nie am
  Abschnitt, und die Glaskarten in Hero und Kontakt blenden gar nicht ein
- Nie zwei helle Glasflächen übereinander — die Lesbarkeit bricht
  zusammen. Deshalb ist der Eckdaten-Streifen eine Fläche mit
  Trennlinien und nicht drei Karten
- In Astro-Komponenten-Styles Selektoren auf `.js` (steht am `<html>`)
  immer als `:global(.js)` schreiben. Ohne das hängt Astro die
  Scope-Kennung auch an diesen Teil und die Regel greift nie
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
