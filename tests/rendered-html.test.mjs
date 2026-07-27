import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("native Next.js build emits Vercel-compatible output", async () => {
  const requiredArtifacts = [
    ".next/BUILD_ID",
    ".next/routes-manifest.json",
    ".next/prerender-manifest.json",
    ".next/server/app/index.html",
  ];

  await Promise.all(
    requiredArtifacts.map((file) => access(new URL(`../${file}`, import.meta.url))),
  );

  const html = await readFile(
    new URL("../.next/server/app/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /<title>Kelvin Ankamah Adjei — Designer &amp; Developer<\/title>/i);
  assert.match(html, /Independent creative developer building expressive/i);
  assert.match(html, /property="og:image"/i);
  assert.match(html, /name="twitter:card" content="summary_large_image"/i);
  assert.match(html, /class="loader-mark"/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("ships every portfolio image referenced by the page", async () => {
  const assets = [
    "portfolio.JPG",
    "project-sika-link.png",
    "project-flashd.png",
    "project-crafts-by-tee.png",
    "project-best-buy.png",
    "og.png",
  ];

  await Promise.all(
    assets.map((asset) => access(new URL(`../public/${asset}`, import.meta.url))),
  );

  const [page, config] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
  ]);

  for (const asset of assets.slice(0, 5)) {
    assert.match(page, new RegExp(asset.replace(".", "\\.")));
  }
  assert.match(page, /unoptimized/);
  assert.match(config, /unoptimized:\s*true/);
});

test("uses native Next.js deployment scripts", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.equal(packageJson.scripts.dev, "next dev");
  assert.equal(packageJson.scripts.build, "next build");
  assert.equal(packageJson.scripts.start, "next start");
});
