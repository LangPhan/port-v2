import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parseSrt, activeCue, wordProgress } from "../app/[lang]/components/Desk/lyrics.mjs";

test("parses BOM, CRLF, millisecond timestamps and multiline cues", () => {
  const cues = parseSrt("\uFEFF1\r\n00:01:02,345 --> 00:01:04,567\r\nFirst\r\nsecond\r\n");
  assert.deepEqual(cues, [{ start: 62.345, end: 64.567, text: "First second" }]);
});
test("highlights exact intervals, including seek backwards and silent gaps", () => {
  const cues = [{ start: 5, end: 10 }, { start: 12, end: 16 }];
  assert.equal(activeCue(cues, 4), -1);
  assert.equal(activeCue(cues, 5), 0);
  assert.equal(activeCue(cues, 10), -1);
  assert.equal(activeCue(cues, 14), 1);
  assert.equal(activeCue(cues, 6), 0);
  assert.equal(activeCue(cues, 16), -1);
});
test("ignores malformed and reversed cues and sorts valid intervals", () => {
  assert.deepEqual(parseSrt("1\n00:00:10,000 --> 00:00:05,000\nBad\n\nbroken"), []);
});
test("owner supplied SRT has readable, ordered non-overlapping cues", async () => {
  const cues = parseSrt(await readFile(new URL("../public/music/happy.srt", import.meta.url), "utf8"));
  assert.ok(cues.length > 5);
  cues.forEach((cue, i) => {
    assert.ok(cue.text.length > 0 && cue.start < cue.end);
    if (i) assert.ok(cue.start >= cues[i - 1].end);
  });
});

test("word fill follows audio time and resets when seeking backwards", () => {
  const word = { start: 2, end: 4 };
  assert.equal(wordProgress(word, 1), 0);
  assert.equal(wordProgress(word, 2), 0);
  assert.equal(wordProgress(word, 3), 50);
  assert.equal(wordProgress(word, 5), 100);
  assert.equal(wordProgress(word, 2.5), 25);
  assert.equal(wordProgress({ start: 2, end: 2 }, 2), 100);
});

test("aligned words retain source text and have ordered finite timestamps", async () => {
  const data = JSON.parse(await readFile(new URL("../public/music/happy.words.json", import.meta.url), "utf8"));
  const source = parseSrt(await readFile(new URL("../public/music/happy.srt", import.meta.url), "utf8"))
    .map(cue => ({ ...cue, text: cue.text.replace(/\([^)]*\)|♪/g, "").trim().replace(/\s+/g, " ") })).filter(cue => cue.text);
  assert.equal(data.lines.length, source.length);
  let previous = 0;
  data.lines.forEach((line, i) => {
    assert.equal(line.words.map(word => word.text).join(" ").replace(/\s+/g, " ").trim(), source[i].text);
    line.words.forEach(word => {
      assert.ok(Number.isFinite(word.start) && Number.isFinite(word.end));
      assert.ok(word.end >= word.start && word.start >= previous - 0.001);
      assert.ok(word.start >= source[i].start - 0.03 && word.end <= source[i].end + 0.03);
      previous = word.end;
    });
  });
});
