"""Offline alignment: owner-provided SRT + MP3 -> word-timed JSON.

Requires stable-ts==2.19.1, faster-whisper==1.2.1 and av==15.1.0 in a separate Python env.
No Python/model dependencies are needed by the website at runtime.
"""
import json
import re
from pathlib import Path
import stable_whisper
from faster_whisper.audio import decode_audio

root = Path(__file__).resolve().parents[1]
source = (root / "public/music/happy.srt").read_text(encoding="utf-8-sig")
segments = []
for block in re.split(r"\n\s*\n", source):
    match = re.search(r"(\d+):(\d+):(\d+),(\d+)\s*-->\s*(\d+):(\d+):(\d+),(\d+)\n(.+)", block, re.S)
    if not match:
        continue
    values = list(map(int, match.groups()[:8]))
    start = values[0]*3600 + values[1]*60 + values[2] + values[3]/1000
    end = values[4]*3600 + values[5]*60 + values[6] + values[7]/1000
    text = re.sub(r"\([^)]*\)|<[^>]*>|♪", "", match[9]).strip()
    text = re.sub(r"\s+", " ", text)
    if text:
        segments.append(dict(start=start, end=end, text=text))

print(f"Aligning {len(segments)} lyric lines against audio", flush=True)
model = stable_whisper.load_faster_whisper("small.en", device="cpu", compute_type="int8", cpu_threads=6,
                                         download_root=str(root / ".reports/whisper-models"))
audio = decode_audio(str(root / "public/music/happy.mp3"), sampling_rate=16000)
result = model.align_words(audio, segments, "en", regroup=False, suppress_silence=False,
                           normalize_text=False, verbose=False)
raw = result.to_dict()
# Give short/fast phrases more acoustic context when an isolated-line pass
# collapses a word to an instant. Retain the supplied line boundaries.
for i, segment in enumerate(raw["segments"]):
    old_words = segment["words"]
    old_zero = sum(w["end"] <= w["start"] for w in old_words)
    if not old_zero:
        continue
    left, right = max(0, i - 1), min(len(segments), i + 2)
    context = dict(start=segments[left]["start"], end=segments[right-1]["end"],
                   text=" ".join(s["text"] for s in segments[left:right]))
    retry = model.align_words(audio, [context], "en", regroup=False, suppress_silence=False,
                              normalize_text=False, verbose=None).to_dict()["segments"][0]["words"]
    before = sum(len(raw["segments"][j]["words"]) for j in range(left, i))
    repaired = retry[before:before + len(old_words)]
    if len(repaired) != len(old_words) or any(a["word"].strip() != b["word"].strip() for a, b in zip(repaired, old_words)):
        continue
    for word in repaired:
        word["start"] = max(segments[i]["start"], min(segments[i]["end"], word["start"]))
        word["end"] = max(word["start"], min(segments[i]["end"], word["end"]))
    if sum(w["end"] <= w["start"] for w in repaired) < old_zero:
        segment["words"] = repaired
        segment["start"], segment["end"] = repaired[0]["start"], repaired[-1]["end"]
(root / ".reports/happy-alignment-raw.json").write_text(json.dumps(raw, ensure_ascii=False), encoding="utf8")
lines = []
for segment in raw["segments"]:
    words = [dict(text=w["word"].strip(), start=round(w["start"], 3), end=round(w["end"], 3))
             for w in segment["words"] if w["word"].strip()]
    lines.append(dict(start=segment["start"], end=segment["end"], text=segment["text"].strip(), words=words))
output = dict(version=1, method="stable-ts forced alignment / faster-whisper small.en", lines=lines)
(root / "public/music/happy.words.json").write_text(json.dumps(output, ensure_ascii=False, separators=(",", ":")), encoding="utf8")
words = [w for line in lines for w in line["words"]]
print(json.dumps(dict(lines=len(lines), words=len(words), zero_duration=int(sum(w["end"]<=w["start"] for w in words)),
                      longest=float(max(w["end"]-w["start"] for w in words)))), flush=True)
