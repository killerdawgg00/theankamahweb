import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

const context = {
  waitUntil() {},
  passThroughOnException() {},
};

test("server-renders the portfolio shell and production metadata", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {},
    context,
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Kelvin Ankamah Adjei — Designer &amp; Developer<\/title>/i);
  assert.match(html, /Independent creative developer building expressive/i);
  assert.match(html, /property="og:image" content="\/og\.png"/i);
  assert.match(html, /name="twitter:card" content="summary_large_image"/i);
  assert.match(html, /class="loader-mark"/i);
  assert.match(html, />K<\/span><span[^>]*>E<\/span><span[^>]*>L<\/span>/i);
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
  assert.match(config, /unoptimized:\s*true/);
});

test("image endpoint fails safely without Cloudflare bindings", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/_vinext/image?url=%2Fportfolio.JPG&w=640&q=75"),
    {},
    context,
  );

  assert.equal(response.status, 404);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(await response.text(), "Image optimization is unavailable");
});
