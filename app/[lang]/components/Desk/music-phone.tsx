"use client";

import { Music2, Play, Pause, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { activeCue, parseSrt, wordProgress } from "./lyrics.mjs";

const labels = {
  vi: { play: "Phát Happy", pause: "Tạm dừng", close: "Dừng nhạc và thu điện thoại", seek: "Tua nhạc", lyrics: "Lời bài hát", error: "Không tải được nhạc hoặc lời. Bấm Play để thử lại." },
  en: { play: "Play Happy", pause: "Pause", close: "Stop music and collapse phone", seek: "Seek", lyrics: "Lyrics", error: "Could not load music or lyrics. Press Play to retry." },
  jp: { play: "Happyを再生", pause: "一時停止", close: "停止して電話を戻す", seek: "再生位置", lyrics: "歌詞", error: "読み込めません。再生で再試行してください。" },
  kr: { play: "Happy 재생", pause: "일시 정지", close: "음악 정지 및 접기", seek: "재생 위치", lyrics: "가사", error: "불러올 수 없습니다. 재생을 눌러 다시 시도하세요." },
};
const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
type Word = { start: number; end: number; text: string };
type Cue = { start: number; end: number; text: string; words?: Word[] };

export default function MusicPhone() {
  const locale = usePathname().split("/")[1];
  const copy = labels[locale as keyof typeof labels] ?? labels.en;
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [cues, setCues] = useState<Cue[]>([]);
  const [error, setError] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const active = activeCue(cues, time);

  useEffect(() => {
    setMounted(true);
    const query = window.matchMedia("(max-width: 699px)");
    const resize = () => setMobile(query.matches);
    resize();
    query.addEventListener("change", resize);
    return () => query.removeEventListener("change", resize);
  }, []);
  useEffect(() => {
    if (!open || cues.length) return;
    const controller = new AbortController();
    const load = async () => {
      const response = await fetch("/music/happy.words.json", { signal: controller.signal });
      if (response.ok) {
        const data = await response.json();
        if (!Array.isArray(data.lines) || !data.lines.length) throw new Error("lyrics");
        setCues(data.lines);
        return;
      }
      const fallback = await fetch("/music/happy.srt", { signal: controller.signal });
      if (!fallback.ok) throw new Error("lyrics");
      const parsed = parseSrt(await fallback.text());
      if (!parsed.length) throw new Error("lyrics");
      setCues(parsed);
    };
    load()
      .catch(reason => { if (reason.name !== "AbortError") setError(true); });
    return () => controller.abort();
  }, [open, cues.length]);
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let previous = 0;
    const tick = (now: number) => {
      if (now - previous >= 32) { setTime(audio.current?.currentTime ?? 0); previous = now; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);
  useEffect(() => {
    const container = viewport.current;
    const line = container?.querySelector<HTMLElement>(`[data-cue="${active}"]`);
    if (!container || !line) return;
    container.scrollTo({ top: line.offsetTop - container.offsetTop - 18, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [active, open, mobile]);
  async function play() {
    setOpen(true);
    setError(false);
    try { await audio.current?.play(); } catch { setError(true); }
  }
  function stop() {
    audio.current?.pause();
    if (audio.current) audio.current.currentTime = 0;
    setTime(0);
    setOpen(false);
  }
  function seek(value: number) {
    if (audio.current) audio.current.currentTime = value;
    setTime(value);
  }
  const phone = <div className={`desk-phone music-phone${open ? " music-phone-playing" : ""}${mobile && open ? " music-phone-mobile" : ""}`} onKeyDown={event => event.stopPropagation()}>
    <div className="phone-screen">
      <span>DAILY SOUNDTRACK</span>
      {open ? <button type="button" className="phone-stop" aria-label={copy.close} onClick={stop}><X size={18} /></button> : <i aria-hidden="true"><Music2 size={36} /></i>}
      <b>Happy<small>Pharrell Williams</small></b>
      {open && <>
        <div className="phone-lyrics" ref={viewport} role="region" aria-label={copy.lyrics} tabIndex={0}>
          {cues.map((cue, index) => <button type="button" key={`${cue.start}-${index}`} data-cue={index} className={index === active ? "lyric-active" : index < active ? "lyric-past" : ""} aria-current={index === active ? "true" : undefined} onClick={() => seek(cue.start)}>
            {cue.words ? <span>{cue.words.map((word, i) => <span key={i} className="lyric-word" data-word-active={time >= word.start && time < word.end ? "true" : undefined} style={{ "--word-progress": `${wordProgress(word, time)}%` } as CSSProperties}>{word.text}{" "}</span>)}</span> : cue.text.split("♪").map((line, i) => line.trim() && <span key={i}>{line.trim()}</span>)}
          </button>)}
        </div>
        <input className="phone-seek" type="range" aria-label={copy.seek} aria-valuetext={`${clock(time)} / ${clock(duration)}`} min={0} max={duration || 1} step={0.1} value={time} onChange={event => seek(Number(event.target.value))} />
        <div className="phone-time"><span>{clock(time)}</span><span>{clock(duration)}</span></div>
      </>}
      <button type="button" className="phone-play" aria-label={playing ? copy.pause : copy.play} title={playing ? copy.pause : copy.play} onClick={() => playing ? audio.current?.pause() : void play()}>
        {playing ? <Pause size={18} fill="currentColor" aria-hidden="true" /> : <Play size={18} fill="currentColor" aria-hidden="true" />}
      </button>
      {error && <span className="phone-error" role="alert">{copy.error}</span>}
    </div>
  </div>;
  return <>
    <audio ref={audio} src="/music/happy.mp3" preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onTimeUpdate={event => setTime(event.currentTarget.currentTime)} onLoadedMetadata={event => setDuration(event.currentTarget.duration)} onError={() => setError(true)} hidden />
    {!(mobile && open) && phone}
    {mounted && createPortal(<>
      <button type="button" className="music-shortcut" onClick={() => open ? stop() : void play()} aria-label={open ? copy.close : copy.play}><Music2 size={20} /><span>Happy</span>{open ? <X size={14} /> : <Play size={14} />}</button>
      {mobile && open && phone}
    </>, document.body)}
  </>;
}
