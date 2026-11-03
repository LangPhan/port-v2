# Happy soundtrack

The owner supplied `happy.mp3` and `happy.srt` from their local Downloads folder
for this portfolio on 2026-10-30. The files were copied without modification.
Track: Happy — Pharrell Williams.

The owner subsequently supplied `Pharrell Williams - Happy (Official Video) (1).srt`.
This replaces the earlier grouped SRT: 75 cues, including one instrumental cue.

`happy.words.json` is derived offline from those 74 lyric lines and the MP3 with
[stable-ts](https://github.com/jianfch/stable-ts), Faster-Whisper small.en, and
contextual retries for collapsed words. It contains 476 word timings. These are
automatic acoustic alignment estimates, not manually certified karaoke timings.
Three zero-duration predictions remain and are rendered as instant highlights.
Text coverage and timestamp ordering/bounds are checked by `test:lyrics`.

Reproduce with `scripts/align-lyrics.py` in a separate Python environment using
stable-ts 2.19.1, faster-whisper 1.2.1 and av 15.1.0. Model files and tooling live
under ignored `.reports/`; the website only downloads the resulting JSON.
