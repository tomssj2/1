// Renders the print pieces to PDF (and PNG previews) with Playwright's Chromium.
// Usage: node print/build.mjs   (needs the `playwright` package)
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const url = (f, q = "") => pathToFileURL(path.join(dir, f)).href + q;

const jobs = [
  { src: "menu.html", out: "menu-a4.pdf", w: "210mm", h: "297mm" },
  { src: "business-card.html", out: "business-card-print-shop.pdf", w: "91mm", h: "61mm" },
  { src: "business-card.html", q: "?sheet", out: "business-cards-a4-sheet.pdf", w: "210mm", h: "297mm" },
];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const j of jobs) {
  await page.goto(url(j.src, j.q));
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.join(dir, j.out), width: j.w, height: j.h, printBackground: true, preferCSSPageSize: true });
  console.log("wrote", j.out);
}

// PNG previews
const shot = await browser.newPage({ deviceScaleFactor: 2 });
await shot.setViewportSize({ width: 794, height: 1123 });
await shot.goto(url("menu.html"));
await shot.evaluate(() => document.fonts.ready);
await shot.screenshot({ path: path.join(dir, "preview-menu.png") });

await shot.setViewportSize({ width: 344, height: 461 });
await shot.goto(url("business-card.html"));
await shot.evaluate(() => document.fonts.ready);
await shot.screenshot({ path: path.join(dir, "preview-business-card.png"), fullPage: true });
await browser.close();
