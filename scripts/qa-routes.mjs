import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://127.0.0.1:3000";
const out = "/opt/cursor/artifacts";
mkdirSync(out, { recursive: true });

const phone = [
  ["qa-matches-phone-pw", "/matches"],
  ["qa-matches-yesterday-pw", "/matches?day=yesterday"],
  ["qa-matches-search-pw", "/matches?search=1"],
  ["qa-news-phone-pw", "/news"],
  ["qa-news-world-pw", "/news?tab=world"],
  ["qa-news-article-pw", "/news/49800789"],
  ["qa-leagues-phone-pw", "/leagues"],
  ["qa-leagues-search-pw", "/leagues?q=premier"],
  ["qa-league-eng1-now-pw", "/league/eng.1"],
  ["qa-league-eng1-table-pw", "/league/eng.1?tab=table"],
  ["qa-league-ucl-pw", "/league/uefa.champions"],
  ["qa-match-phone-pw", "/match/401882867?league=esp.1"],
  ["qa-team-phone-pw", "/team/eng.1/349"],
  ["qa-following-phone-pw", "/following"],
  ["qa-more-phone-pw", "/more"],
];

const desktop = [
  ["qa-matches-desktop-pw", "/matches"],
  ["qa-league-eng1-desktop-pw", "/league/eng.1?tab=table"],
  ["qa-leagues-desktop-pw", "/leagues"],
];

async function shoot(browser, name, path, size) {
  const context = await browser.newContext({
    viewport: size,
    deviceScaleFactor: 2,
    recordVideo: { dir: `${out}/video-${name}`, size },
  });
  const page = await context.newPage();
  await page.goto(`${BASE}${path}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: false });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/${name}-end.png`, fullPage: false });
  await context.close();
  console.log("saved", name);
}

const browser = await chromium.launch({ headless: true });
for (const [name, path] of phone) {
  await shoot(browser, name, path, { width: 390, height: 844 });
}
for (const [name, path] of desktop) {
  await shoot(browser, name, path, { width: 1280, height: 800 });
}
await browser.close();
console.log("done");
