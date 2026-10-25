import assert from "node:assert/strict";
import test from "node:test";

const base = process.env.PORTFOLIO_URL ?? "http://localhost:3010";
const locales = { vi: "vi", en: "en", jp: "ja", kr: "ko" };

for (const [route, tag] of Object.entries(locales)) {
  test(`${route}: accessible content, real contact, localized metadata`, async () => {
    const response = await fetch(`${base}/${route}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`<html[^>]*lang="${tag}"`));
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, "one primary heading");
    assert.match(html, /<main[^>]*id="main-content"/);
    for (const id of ["projects", "profile", "contact"]) {
      assert.match(html, new RegExp(`<section[^>]*id="${id}"`));
      assert.match(html, new RegExp(`href="#${id}"`));
    }
    assert.match(html, /href="mailto:phanvandat\.it@gmail\.com"/);
    assert.doesNotMatch(html, /<form\b|Coming soon Feature|<canvas\b/);
    assert.match(
      html,
      new RegExp(`rel="canonical" href="https://phanvandat.id.vn/${route}"`),
    );
    for (const language of Object.values(locales))
      assert.ok(
        html.includes(`hrefLang="${language}"`),
        `alternate ${language}`,
      );
    const socialImage = new URL(
      html.match(/property="og:image" content="([^"]+)"/)[1],
    );
    assert.equal(socialImage.origin, "https://phanvandat.id.vn");
    assert.equal(socialImage.pathname, `/${route}/opengraph-image`);
    assert.equal(
      (await fetch(`${base}${socialImage.pathname}${socialImage.search}`))
        .status,
      200,
    );
    for (const url of [
      "https://github.com/LangPhan/shoestoreFE",
      "https://github.com/LangPhan/tdtufind",
      "https://youtu.be/-g7RMQeTOeA",
    ])
      assert.ok(html.includes(`href="${url}"`), url);
    assert.equal(
      (html.match(/<article\b/g) ?? []).length,
      6,
      "all six projects remain available",
    );
    assert.equal(
      (html.match(/<details\b/g) ?? []).length,
      7,
      "project details and the additional work section",
    );
  });
}

test("language negotiation and query strings survive redirects", async () => {
  for (const [language, route] of [
    ["vi-VN", "vi"],
    ["ja-JP", "jp"],
    ["ko-KR", "kr"],
    ["de-DE", "en"],
    ["*", "en"],
  ]) {
    const response = await fetch(`${base}/?ref=portfolio`, {
      headers: { "accept-language": language },
      redirect: "manual",
    });
    assert.equal(response.status, 307);
    const target = new URL(response.headers.get("location"), base);
    assert.equal(target.pathname, `/${route}`);
    assert.equal(target.search, "?ref=portfolio");
  }
});

test("SEO assets bypass locale redirects", async () => {
  for (const path of ["/robots.txt", "/sitemap.xml", "/icon.svg"]) {
    const response = await fetch(`${base}${path}`, { redirect: "manual" });
    assert.equal(response.status, 200, path);
  }
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const route of Object.keys(locales))
    assert.ok(sitemap.includes(`https://phanvandat.id.vn/${route}`));
  const image = await fetch(`${base}/vi/opengraph-image`, {
    redirect: "manual",
  });
  assert.equal(image.status, 200);
  assert.match(image.headers.get("content-type"), /image\/png/);
  const bytes = Buffer.from(await image.arrayBuffer());
  assert.equal(bytes.subarray(1, 4).toString(), "PNG");
});

test("unknown paths return 404", async () => {
  assert.equal((await fetch(`${base}/vi/does-not-exist`)).status, 404);
});
