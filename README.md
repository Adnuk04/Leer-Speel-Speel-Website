# Leer Speel-Speel / Play-to-Learn Educational Centre

A responsive marketing and enrolment website for **Leer Speel-Speel / Play-to-Learn Educational Centre**, a daycare and pre-primary school serving Ongwediva and Okatana, Namibia. The site introduces the centre, showcases daily life through a photo gallery, provides downloadable forms, and lets parents send an enrolment enquiry by WhatsApp (or Gmail on a computer).

Built as a single-page static site with plain HTML, CSS, and JavaScript — no build step or framework required.

## Features

- **Responsive single-page layout** covering Hero, At a Glance stats, About, Meet Our Founder, What We Offer, Our 10 Special Learning Experiences, Gallery, Downloads, Our Locations, and Contact/Enrolment sections
- **Accessible mobile navigation** with an animated hamburger toggle and drop-down panel, `aria-expanded` state, outside-click and `Escape`-key dismissal
- **Photo gallery in albums**: a highlights mosaic (swipeable on phones) plus illustrated album cards for the Ongwediva Campus, Okatana Campus, Educational Activities, Petting Zoo and Fun Days. Each album (9 photos, a 3 × 3 grid, or two photos per swipe on phones) opens in a pop-up, and photos open in a full-size lightbox (arrow keys, swipe, `Escape`, focus trap, and focus restoration). Campus photos stay in their own campus album, and the children's faces in the school's photos are illustrated for privacy
- **Meet Our Founder**: the founder's own letter beside her framed portrait and a "Since 2003" badge; the number of years open is worked out from the current year
- **Rainbow colour system and crayon doodles** — every section tinted in red → violet order with wavy or scalloped dividers, and floating crayon drawings (prompts logged in `assets/images/fal-prompts.md`)
- **WhatsApp first** — a "WhatsApp Us" button ahead of every email option, a sticky WhatsApp/Call bar on phones and a floating button on wider screens; the number lives in one constant at the top of `script.js`
- **Gentle motion** — scroll reveals, count-up stats and tap feedback, all switched off for visitors who prefer reduced motion
- **Downloadable resources** section linking to the school’s parent guides (Ongwediva & Okatana) and forms (registration, transport, uniform order), opening in a new tab
- **Enrolment enquiry form** that writes the parent's message into a WhatsApp chat, or (on computers) a pre-filled Gmail compose page; nothing is sent automatically
- **Email without the mail-app trap**: Mrs. Potgieter's address is shown with a Copy button everywhere (built by `script.js`, so it never appears whole in the HTML), plus "Open in Gmail" on computers only
- **Campus cards** for Ongwediva and Okatana, each with an entrance photo, an embedded map of the campus's Google listing, click-to-call phone link and a Google Maps "Get Directions" button
- **Social links** to Facebook and Instagram, plus a footer with quick links, contact details, locations, and how to request banking details
- **Accessibility touches** throughout: skip-to-content link, `aria-label`/`aria-live` attributes, screen-reader-only text, and reduced-motion support for smooth scrolling
- **Auto-updating copyright year** in the footer
- Self-hosted fonts (Baloo 2 and Nunito, SIL Open Font License), plus a favicon set, web manifest and link-preview card made from the centre's logo
- **Search-ready**: page title and description for local searches, Open Graph/Twitter tags, JSON-LD structured data for both campuses, `robots.txt`, `sitemap.xml` and a friendly `404.html`
- **Light photo protection**: no right-click, drag or long-press saving on pictures (text and links work as normal), and only web-sized copies are published

## Tech Stack

- **HTML5** (`index.html`) — semantic markup and page structure
- **CSS3** (`style.css`) — styling, responsive layout, and reduced-motion media queries
- **Vanilla JavaScript** (`script.js`) — no frameworks or external JS libraries
- **Node.js tooling** (optional, dev-only) — `package.json` scripts for local preview, live-reload, and linting

## Project Structure

```
Leer Speel-Speel/
├── index.html               Main page markup (plus SEO tags and JSON-LD structured data)
├── 404.html                 "Page not found" page, served by Cloudflare for unknown addresses
├── style.css                Site-wide styles (fonts, design tokens, components)
├── script.js                WhatsApp and email, navigation, album pop-up, lightbox, photo protection, motion and enquiry form
├── robots.txt, sitemap.xml  For search engines (point at https://leerspeelspeel.com)
├── favicon.ico, site.webmanifest
├── wrangler.jsonc           Cloudflare deploy settings (static assets, 404 page)
├── assets/
│   ├── images/              Logo, favicons, link-preview card, founder, campus entrance and learning-card pictures
│   │   └── gallery/         The school's photos as WebP: <name>.webp (tile) and <name>-large.webp (lightbox)
│   ├── fonts/               Baloo 2 and Nunito (WOFF2, Latin)
│   ├── doodles/             Crayon doodles (SVG and WebP) and section dividers
│   └── documents/           Parent guides and forms (PDF)
├── package.json             Project metadata and npm scripts
└── README.md
```

## Installation & Running Locally

This is a static website, so no build step is strictly required — you can open `index.html` directly in a browser. For a proper local server (recommended, since some browser features behave better over `http://` than `file://`), use the included npm scripts.

### Prerequisites

- [Node.js](https://nodejs.org/) (includes npm) — only needed for the optional local dev server

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Adnuk04/Leer-Speel-Speel-Website.git
   cd Leer-Speel-Speel-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the site locally**

   Simple static server:
   ```bash
   npm start
   ```

   Or, with live-reload on file changes:
   ```bash
   npm run dev
   ```

   Then open the URL printed in the terminal (typically `http://localhost:3000`).

4. **Lint the JavaScript** (optional)
   ```bash
   npm run lint
   ```

## Notes

- The school's full-size originals are kept out of the repository (in a git-ignored `_originals/` folder); only the optimised web copies in `assets/images/gallery/` are committed and deployed.
- The site is deployed to Cloudflare Workers from a clean copy of the public files only, never from this folder.
