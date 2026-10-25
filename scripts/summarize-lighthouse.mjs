import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const median = (values) =>
  [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const settings = (report) => ({
  version: report.lighthouseVersion,
  formFactor: report.configSettings.formFactor,
  throttling: report.configSettings.throttling,
  screenEmulation: report.configSettings.screenEmulation,
  categories: report.configSettings.onlyCategories,
});
const load = (prefix) =>
  [1, 2, 3].map((run) => {
    const path = `.reports/${prefix}-${run}.json`;
    const raw = readFileSync(path);
    const report = JSON.parse(raw);
    assert.ok(!report.runtimeError, `${path}: no runtime error`);
    return {
      path,
      sha256: createHash("sha256").update(raw).digest("hex"),
      report,
    };
  });
const before = load("before");
const after = load("after");
for (const { report } of [...before, ...after])
  assert.deepEqual(
    settings(report),
    settings(before[0].report),
    "compare identical audit configurations",
  );

function summarize(runs) {
  const results = runs.map(({ path, sha256, report: r }) => ({
    path,
    sha256,
    fetchTime: r.fetchTime,
    scores: Object.fromEntries(
      Object.entries(r.categories).map(([key, category]) => [
        key,
        Math.round(category.score * 100),
      ]),
    ),
    lcpMs: r.audits["largest-contentful-paint"].numericValue,
    cls: r.audits["cumulative-layout-shift"].numericValue,
    tbtMs: r.audits["total-blocking-time"].numericValue,
    transferBytes: r.audits["resource-summary"].details.items.find(
      (item) => item.resourceType === "total",
    ).transferSize,
    fontBytes: r.audits["resource-summary"].details.items.find(
      (item) => item.resourceType === "font",
    ).transferSize,
  }));
  return {
    runs: results,
    median: {
      scores: Object.fromEntries(
        Object.keys(results[0].scores).map((key) => [
          key,
          median(results.map((item) => item.scores[key])),
        ]),
      ),
      ...Object.fromEntries(
        ["lcpMs", "cls", "tbtMs", "transferBytes", "fontBytes"].map((key) => [
          key,
          median(results.map((item) => item[key])),
        ]),
      ),
    },
  };
}
const summary = {
  date: "2026-10-25",
  target: "http://localhost:3010/vi",
  baselineCommit: "e036f80",
  scope:
    "Local production builds; simulated mobile, not field Core Web Vitals.",
  settings: settings(before[0].report),
  before: summarize(before),
  after: summarize(after),
};
writeFileSync(
  "docs/ux-audit/lighthouse-summary.json",
  JSON.stringify(summary, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    { before: summary.before.median, after: summary.after.median },
    null,
    2,
  ),
);
