# Funky Cow — Smash & Shakes 🍔🥤

Website for **Funky Cow**, a small family-owned American-style diner in Naousa, Greece.
It has a red-and-white 1950s diner theme with checkered stripes, polka dots and a menu board.

A plain static site with no build step: open `index.html` in a browser, or upload the folder
to any static host (GitHub Pages, Netlify, etc.).

```
index.html      page markup (Menu, Our Story, Visit, Jobs)
styles.css      diner theme
script.js       mobile nav, menu tabs, EN / ΕΛ language toggle
assets/logo.png logo
```

## Hosting

The site is hosted for free on GitHub Pages at **https://tomssj2.github.io/1/**.
Every push to `claude/sleepy-gates-2rw66k` redeploys it automatically
(see `.github/workflows/pages.yml`).

One-time setup: in the repo on GitHub, go to **Settings → Pages** and set
**Source** to **GitHub Actions**.

## Before going live, fill in

- **Prices and menu items.** The current ones are examples. Edit them in `index.html`. Greek
  descriptions are in `script.js`.
- **Opening hours.** They are in the "Visit" section.
- **Instagram link.** Two `https://instagram.com/` links point to Instagram's home page. Replace
  them with the shop's profile URL.

## Print files (`print/`)

Built from the same colours, fonts and logo as the website.

| File | What it is |
| --- | --- |
| `menu-a4.pdf` | Menu, A4 portrait, English + Greek |
| `business-card-print-shop.pdf` | Business card for a print shop: 85 × 55 mm with 3 mm bleed (91 × 61 mm pages), page 1 front, page 2 back |
| `business-cards-a4-sheet.pdf` | 10 cards per A4 sheet with cut marks, for printing at home (page 1 fronts, page 2 backs, print double-sided) |

The QR codes point to the website. To change text or prices, edit `print/menu.html` or
`print/business-card.html`, then rebuild the PDFs with `node print/build.mjs` (needs Playwright).
