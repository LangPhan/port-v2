/** @param {string} source */
export function parseSrt(source) {
  const seconds = (h, m, s, ms) => Number(h) * 3600 + Number(m) * 60 + Number(s) + Number(ms) / 1000;
  return source.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").split(/\n\s*\n/).flatMap(block => {
    const lines = block.trim().split("\n");
    const index = lines.findIndex(line => line.includes("-->"));
    const match = lines[index]?.match(/(\d+):(\d{2}):(\d{2})[,.](\d{3})\s*-->\s*(\d+):(\d{2}):(\d{2})[,.](\d{3})/);
    if (!match) return [];
    const start = seconds(...match.slice(1, 5));
    const end = seconds(...match.slice(5, 9));
    const text = lines.slice(index + 1).join(" ").replace(/<[^>]*>/g, "").trim();
    return text && end > start ? [{ start, end, text }] : [];
  }).sort((a, b) => a.start - b.start);
}

/** @param {{start:number,end:number}[]} cues @param {number} time */
export function activeCue(cues, time) {
  return cues.findIndex(cue => time >= cue.start && time < cue.end);
}

/** @param {{start:number,end:number}} word @param {number} time */
export function wordProgress(word, time) {
  if (word.end <= word.start) return time >= word.end ? 100 : 0;
  return Math.max(0, Math.min(100, (time - word.start) / (word.end - word.start) * 100));
}
