import assert from "node:assert/strict";
import { createHash } from "node:crypto";
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
    for (const id of [
      "projects",
      "profile",
      "skills",
      "more-work",
      "contact",
    ]) {
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
      3,
      "all additional project details are available",
    );
    assert.equal(
      (html.match(/data-spread="/g) ?? []).length,
      7,
      "seven complete chapters",
    );
    assert.equal(
      (html.match(/data-paper="/g) ?? []).length,
      14,
      "fourteen readable HTML pages",
    );
    assert.match(html, /data-camera="intro"/);
    assert.match(html, /id="book-contents"/);
    assert.match(html, /<noscript>/, "reading fallback without JavaScript");
    assert.doesNotMatch(
      html,
      /skip-intro|Bỏ qua giới thiệu|Skip the introduction/,
    );
    assert.match(html, /src="\/sounds\/page-flip-01a\.mp3"/);
  });
}

test("self-hosted Vietnamese font and page-turn audio are valid public assets", async () => {
  for (const subset of ["latin", "vietnamese"]) {
    const response = await fetch(`${base}/fonts/noto-serif-${subset}.woff2`, {
      redirect: "manual",
    });
    assert.equal(response.status, 200);
    const font = Buffer.from(await response.arrayBuffer());
    assert.equal(font.subarray(0, 4).toString(), "wOF2");
  }
  const response = await fetch(`${base}/sounds/page-flip-01a.mp3`, {
    redirect: "manual",
  });
  assert.equal(response.status, 200);
  const mp3 = Buffer.from(await response.arrayBuffer());
  const blob = createHash("sha1")
    .update(`blob ${mp3.length}\0`)
    .update(mp3)
    .digest("hex");
  assert.equal(
    blob,
    "5fe309186d80ea3dfbeddf594207c7ffd8f3c3c0",
    "exact sound from the requested Book Slider demo",
  );
});

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
