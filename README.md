# Leer Speel-Speel / Play-to-Learn Educational Centre

A responsive marketing and enrolment website for **Leer Speel-Speel / Play-to-Learn Educational Centre**, a daycare and pre-primary school serving Ongwediva and Okatana, Namibia. The site introduces the centre, showcases daily life through a photo gallery, provides downloadable forms, and lets parents send an enrolment enquiry directly from the page.

Built as a single-page static site with plain HTML, CSS, and JavaScript — no build step or framework required.

## Features

- **Responsive single-page layout** covering Hero, At a Glance stats, About, Meet Our Founder, What We Offer, Our 10 Special Learning Experiences, Gallery, Downloads, Our Locations, and Contact/Enrolment sections
- **Accessible mobile navigation** with an animated hamburger toggle and drop-down panel, `aria-expanded` state, outside-click and `Escape`-key dismissal
- **Photo gallery in albums** — a highlights mosaic, swipeable on phones, plus illustrated Premises / Educational Activities / Petting Zoo / Fun Days album cards that open each album in a pop-up; photos open in a full-size lightbox (arrow keys, swipe, `Escape`, focus trap, and focus restoration). The school's photos have the children's faces illustrated for privacy; the Premises album still holds stand-in illustrations until photos of the buildings arrive
- **Meet Our Founder** — the founder's own letter, a "Since 2003" badge and a marked slot for her photo; the number of years open is worked out from the current year
- **Rainbow colour system and crayon doodles** — every section tinted in red → violet order with wavy or scalloped dividers, and floating crayon drawings (prompts logged in `assets/images/fal-prompts.md`)
- **WhatsApp first** — a "WhatsApp Us" button ahead of every email option, a sticky WhatsApp/Call bar on phones and a floating button on wider screens; the number lives in one constant at the top of `script.js`
- **Gentle motion** — scroll reveals, count-up stats and tap feedback, all switched off for visitors who prefer reduced motion
- **Downloadable resources** section linking to the school’s parent guides (Ongwediva & Okatana) and forms (registration, transport, uniform order), opening in a new tab
- **Enrolment enquiry form** that builds an email (parent/child name and message) and opens it as a pre-filled Gmail compose window — nothing is sent automatically
- **Campus cards** for Ongwediva and Okatana, each with an embedded map, click-to-call phone link and a Google Maps "Get Directions" button
- **Social links** to Facebook and Instagram, plus a footer with quick links, contact details, locations, and how to request banking details
- **Accessibility touches** throughout: skip-to-content link, `aria-label`/`aria-live` attributes, screen-reader-only text, and reduced-motion support for smooth scrolling
- **Auto-updating copyright year** in the footer
- Custom fonts (Baloo 2 and Nunito via Google Fonts), plus a favicon, touch icon and link-preview card made from the centre's logo

## Tech Stack

- **HTML5** (`index.html`) — semantic markup and page structure
- **CSS3** (`style.css`) — styling, responsive layout, and dark-mode/reduced-motion media queries
- **Vanilla JavaScript** (`script.js`) — no frameworks or external JS libraries
- **Node.js tooling** (optional, dev-only) — `package.json` scripts for local preview, live-reload, and linting

## Project Structure

```
Leer Speel-Speel/
├── index.html              Main page markup
├── style.css                Site-wide styles
├── script.js                 WhatsApp links, navigation, album pop-up, gallery lightbox, motion, and enquiry form logic
├── assets/
│   ├── images/               Logo, favicons, link-preview card and the two Premises illustrations
│   │   └── gallery/          The school's photos as WebP: <name>.webp (tile) and <name>-large.webp (lightbox)
│   ├── doodles/              Crayon doodles (SVG and WebP) and section dividers
│   └── documents/            Parent guides and forms (PDF)
├── package.json               Project metadata and npm scripts
└── README.md
```

## Installation & Running Locally

This is a static website, so no build step is strictly required — you can open `index.html` directly in a browser. For a proper local server (recommended, since some browser features behave better over `http://` than `file://`), use the included npm scripts.

### Prerequisites

- [Node.js](https://nodejs.org/) (includes npm) — only needed for the optional local dev server

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Adnuk04/my-first-website.git
   cd "Leer Speel-Speel"
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
- The enquiry form currently opens a Gmail compose window as a temporary demo measure (see the comment in [script.js](script.js)). Before go-live, this should be switched to a plain `mailto:` link addressed to the school's inbox so it works regardless of the visitor's email provider.
