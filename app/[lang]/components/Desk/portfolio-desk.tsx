"use client";

import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Copy,
  Expand,
  List,
  Mail,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { Dictionary } from "../../../../get-dictionary";
import type { Locale } from "../../../../i18n-config";
import { site } from "../../../../site-config";
import LocaleSwitcher from "../locale-switcher";
import ThemePullcord from "../theme-pullcord";
import type { DeskCopy } from "./desk-copy";
import DeskObjects from "./desk-objects";

export type BookChapter = {
  id: string;
  label: string;
  left: ReactNode;
  right: ReactNode;
};
type Flip = { from: number; to: number; direction: "forward" | "backward" };
type Camera = "intro" | "focus" | "overview";

export default function PortfolioDesk({
  chapters,
  dictionary,
  copy,
  lang,
}: {
  chapters: BookChapter[];
  dictionary: Dictionary["navbar"];
  copy: DeskCopy;
  lang: Locale;
}) {
  const [camera, setCamera] = useState<Camera>("intro");
  const [skipEntrance, setSkipEntrance] = useState(false);
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(0);
  const [flip, setFlip] = useState<Flip | null>(null);
  const [menu, setMenu] = useState(false);
  const [reading, setReading] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [scale, setScale] = useState({ overview: 0.65, focus: 1 });
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { resolvedTheme } = useTheme();
  const sceneRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const pageAudioRef = useRef<HTMLAudioElement>(null);
  const introTimer = useRef<ReturnType<typeof setTimeout>>();
  const flipTimer = useRef<ReturnType<typeof setTimeout>>();
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  const syncedHash = useRef<string | null>(null);
  const gesture = useRef<{ x: number; y: number; pointer: number } | null>(
    null,
  );
  const busy = useRef(false);
  const chapter = Math.floor(page / 2);
  const lastPage = chapters.length * 2 - 1;
  const focused = camera === "focus";

  const focusBook = useCallback(() => {
    clearTimeout(introTimer.current);
    setCamera("focus");
  }, []);

  const jump = useCallback(
    (index: number, hash?: string) => {
      clearTimeout(flipTimer.current);
      busy.current = false;
      setFlip(null);
      focusBook();
      setOpened(true);
      setPage(Math.max(0, Math.min(lastPage, index)));
      setMenu(false);
      if (hash) {
        window.history.replaceState(null, "", `#${hash}`);
        syncedHash.current = `#${hash}`;
      }
      requestAnimationFrame(() =>
        bookRef.current?.focus({ preventScroll: true }),
      );
    },
    [focusBook, lastPage],
  );

  useEffect(() => {
    setMounted(true);
    try {
      setSoundEnabled(localStorage.getItem("portfolio-page-sound") !== "off");
    } catch {}
    const audio = pageAudioRef.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotion = () => {
      setReduced(preference.matches);
      if (preference.matches) {
        focusBook();
      }
    };
    applyMotion();
    preference.addEventListener("change", applyMotion);
    // Hold the establishing shot, then move the camera. No repeated idle animation.
    if (!preference.matches) introTimer.current = setTimeout(focusBook, 1200);
    return () => {
      preference.removeEventListener("change", applyMotion);
      clearTimeout(introTimer.current);
      clearTimeout(flipTimer.current);
      clearTimeout(copyTimer.current);
      audio?.pause();
    };
  }, [focusBook]);

  useEffect(() => {
    const node = sceneRef.current;
    if (!node || reading) return;
    const resize = () => {
      const { width, height } = node.getBoundingClientRect();
      const narrow = width < 700;
      setMobile(narrow);
      setScale({
        overview: Math.min((width - 28) / 2200, (height - 60) / 1300, 0.9),
        focus: Math.min(
          (width - (narrow ? 32 : 100)) / (narrow ? 430 : 920),
          (height - 50) / 590,
          1.12,
        ),
      });
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(node);
    return () => observer.disconnect();
  }, [reading]);

  useEffect(() => {
    const syncHash = () => {
      syncedHash.current = window.location.hash;
      const hash = window.location.hash.slice(1);
      if (!hash || hash === "top") return;
      let index = chapters.findIndex((item) => item.id === hash);
      let side = 0;
      if (hash === "project-kada") {
        index = 2;
        side = 1;
      }
      if (hash === "project-ai-shoe") {
        index = 3;
        side = 1;
      }
      if (hash === "project-tdtu-find") {
        index = 4;
        side = 1;
      }
      if (
        [
          "project-richard",
          "project-drink-shop",
          "project-app-marketplace",
        ].includes(hash)
      ) {
        index = 5;
        side = 1;
      }
      if (index >= 0) jump(index * 2 + side);
    };
    if (syncedHash.current !== window.location.hash) syncHash();
    window.addEventListener("hashchange", syncHash);
    // Capture chapter links before the browser scrolls the transformed scene.
    const followChapter = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (
        !link ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const hash = link.hash.slice(1);
      if (hash === "main-content") {
        event.preventDefault();
        focusBook();
        bookRef.current?.focus();
        return;
      }
      if (
        chapters.some((item) => item.id === hash) ||
        hash.startsWith("project-")
      ) {
        if (reading) return;
        event.preventDefault();
        window.history.replaceState(null, "", `#${hash}`);
        syncHash();
      }
    };
    document.addEventListener("click", followChapter);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      document.removeEventListener("click", followChapter);
    };
  }, [chapters, focusBook, jump, reading]);

  const playPageTurn = useCallback(() => {
    const audio = pageAudioRef.current;
    if (!soundEnabled || !audio) return;
    audio.volume = 1;
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  }, [soundEnabled]);

  const turn = useCallback(
    (direction: -1 | 1) => {
      if (busy.current || !opened || !focused) return;
      const current = mobile ? page : Math.floor(page / 2) * 2;
      const target = current + direction * (mobile ? 1 : 2);
      if (target < 0 || target > lastPage) return;
      playPageTurn();
      busy.current = true;
      if (reduced) {
        setPage(target);
        busy.current = false;
        return;
      }
      setFlip({
        from: page,
        to: target,
        direction: direction > 0 ? "forward" : "backward",
      });
      flipTimer.current = setTimeout(() => {
        setPage(target);
        setFlip(null);
        busy.current = false;
      }, 760);
    },
    [focused, lastPage, mobile, opened, page, playPageTurn, reduced],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu) {
        setMenu(false);
        document.querySelector<HTMLButtonElement>(".contents-button")?.focus();
        return;
      }
      if (
        reading ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      )
        return;
      const target = event.target as HTMLElement;
      if (
        target.closest(
          'input, textarea, select, [role="menu"], [contenteditable="true"]',
        )
      )
        return;
      if (event.key === "Escape") {
        setMenu(false);
        return;
      }
      if (menu) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        turn(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        turn(-1);
      }
      if (event.key === "Home" && opened) {
        event.preventDefault();
        jump(0, "profile");
      }
      if (event.key === "End" && opened) {
        event.preventDefault();
        jump(lastPage - 1, "contact");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jump, lastPage, menu, opened, reading, turn]);

  useEffect(() => {
    if (!menu) return;
    const dismiss = (event: PointerEvent) => {
      if (!(event.target as Element).closest(".chapter-picker")) setMenu(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [menu]);

  // Inactive pages stay in the server HTML for search and no-JS reading, but
  // their controls cannot receive keyboard focus inside the 3D experience.
  useEffect(() => {
    bookRef.current
      ?.querySelectorAll<HTMLElement>("[data-paper]")
      .forEach((node) => {
        const active =
          reading ||
          (opened &&
            focused &&
            Number(node.dataset.chapter) === chapter &&
            (!mobile || Number(node.dataset.leaf) === page % 2));
        node.toggleAttribute("inert", !active);
      });
  }, [chapter, focused, mobile, opened, page, reading]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  function showOverview() {
    clearTimeout(introTimer.current);
    clearTimeout(flipTimer.current);
    busy.current = false;
    setFlip(null);
    setSkipEntrance(false);
    setCamera("overview");
    setMenu(false);
  }

  const activeScale = focused ? scale.focus : scale.overview;
  const style = {
    "--scene-scale": mounted ? activeScale : undefined,
  } as CSSProperties;
  const pageNodes = (index: number) => [
    chapters[index].left,
    chapters[index].right,
  ];
  const flipFrom = flip ? Math.floor(flip.from / 2) : chapter;
  const flipTo = flip ? Math.floor(flip.to / 2) : chapter;

  return (
    <div
      className={`desk-experience${reading ? " is-reading" : ""}${mounted ? " is-mounted" : ""}`}
      data-camera={camera}
      data-open={opened}
      data-mobile={mobile}
      data-reduced-motion={reduced}
      data-intro-skipped={skipEntrance}
    >
      <audio
        ref={pageAudioRef}
        src="/sounds/page-flip-01a.mp3"
        preload="auto"
        hidden
        aria-hidden="true"
        data-testid="page-turn-audio"
      />
      <header className="desk-header">
        <a
          className="desk-brand"
          href={`/${lang}`}
          aria-label={dictionary.home}
        >
          <span className="brand-mark">đ.</span>
          <span>
            PHAN VĂN ĐẠT<small>FRONT-END DEVELOPER</small>
          </span>
        </a>
        <div className="desk-header-note">
          <span />
          {mounted && resolvedTheme === "light" ? copy.day : copy.night}
        </div>
        <div className="desk-header-actions">
          <button
            className="desk-icon-button reading-toggle"
            onClick={() => {
              if (reading) {
                setSkipEntrance(true);
                focusBook();
              }
              setReading(!reading);
              setMenu(false);
            }}
            aria-pressed={reading}
            aria-label={reading ? copy.scene : copy.reading}
          >
            <BookOpen size={17} aria-hidden="true" />
            <span>{reading ? copy.scene : copy.reading}</span>
          </button>
          <button
            className="desk-icon-button sound-toggle"
            aria-label={soundEnabled ? copy.soundOff : copy.soundOn}
            title={soundEnabled ? copy.soundOff : copy.soundOn}
            aria-pressed={soundEnabled}
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (!next) pageAudioRef.current?.pause();
              try {
                localStorage.setItem(
                  "portfolio-page-sound",
                  next ? "on" : "off",
                );
              } catch {}
            }}
          >
            {soundEnabled ? (
              <Volume2 size={17} aria-hidden="true" />
            ) : (
              <VolumeX size={17} aria-hidden="true" />
            )}
          </button>
          <LocaleSwitcher lang={lang} label={dictionary.language} />
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <h1 className="sr-only">
          {site.name} — {site.role}
        </h1>
        {reading && (
          <div className="reading-intro">
            <p className="paper-kicker">ĐẠT / JOURNAL</p>
            <h2>{copy.reading}</h2>
            <p>{copy.readNote}</p>
          </div>
        )}
        <div className="desk-scene" ref={sceneRef} style={style}>
          <div className="scene-vignette" aria-hidden="true" />
          <div className="scene-heading" aria-hidden={focused || reading}>
            <p className="scene-eyebrow">WELCOME TO MY WORKSPACE</p>
            <p>{copy.welcome}</p>
            <span>{copy.deskCaption}</span>
          </div>
          <div className="camera-world">
            <div className="wood-table">
              <div className="table-edge" />
            </div>
            <DeskObjects />
            <div className="book-position">
              <div
                className={`folio-book${opened ? " is-open" : ""}`}
                ref={bookRef}
                tabIndex={-1}
                aria-label={copy.edition}
                data-testid="portfolio-book"
                onPointerDown={(event) => {
                  if (
                    (event.target as Element).closest(
                      "a, button, summary, details",
                    ) ||
                    !opened ||
                    !focused ||
                    reading ||
                    !event.isPrimary ||
                    event.button !== 0
                  )
                    return;
                  gesture.current = {
                    x: event.clientX,
                    y: event.clientY,
                    pointer: event.pointerId,
                  };
                  if (
                    event.pointerType !== "touch" ||
                    (event.target as Element).closest(".book-grip")
                  ) {
                    event.preventDefault();
                  }
                  window.getSelection()?.removeAllRanges();
                  event.currentTarget.setPointerCapture(event.pointerId);
                }}
                onPointerUp={(event) => {
                  const start = gesture.current;
                  gesture.current = null;
                  if (!start || start.pointer !== event.pointerId) return;
                  const dx = event.clientX - start.x,
                    dy = event.clientY - start.y;
                  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4)
                    turn(dx < 0 ? 1 : -1);
                }}
                onPointerCancel={() => {
                  gesture.current = null;
                }}
                onDragStart={(event) => event.preventDefault()}
              >
                <div className="book-back" aria-hidden="true" />
                <div className="page-block" aria-hidden="true" />
                <div className="book-spreads">
                  {chapters.map((item, index) => (
                    <div
                      key={item.id}
                      className={`book-spread${index === chapter ? " active-spread" : ""}`}
                      data-spread={index}
                    >
                      {[item.left, item.right].map((content, side) => (
                        <div
                          key={side}
                          className={`book-paper paper-${side === 0 ? "left" : "right"}${side === page % 2 ? " active-leaf" : ""}`}
                          data-paper
                          data-chapter={index}
                          data-leaf={side}
                          aria-hidden={
                            mounted &&
                            !reading &&
                            (!opened ||
                              !focused ||
                              index !== chapter ||
                              (mobile && side !== page % 2))
                          }
                        >
                          {content}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                {flip && (
                  <div
                    className={`flip-underlay flip-${flip.direction}`}
                    ref={(node) => node?.setAttribute("inert", "")}
                    aria-hidden="true"
                  >
                    {mobile ? (
                      <div className="book-paper">
                        {flip.direction === "forward"
                          ? pageNodes(flipTo)[flip.to % 2]
                          : pageNodes(flipFrom)[flip.from % 2]}
                      </div>
                    ) : (
                      pageNodes(flipTo).map((content, side) => (
                        <div
                          key={side}
                          className={`book-paper paper-${side === 0 ? "left" : "right"}`}
                        >
                          {(
                            flip.direction === "forward"
                              ? side === 1
                              : side === 0
                          )
                            ? content
                            : pageNodes(flipFrom)[side]}
                        </div>
                      ))
                    )}
                  </div>
                )}
                {flip && (
                  <div
                    className={`turning-paper turn-${flip.direction}${mobile ? " turn-mobile" : ""}`}
                    ref={(node) => node?.setAttribute("inert", "")}
                    aria-hidden="true"
                  >
                    <div className="turn-front book-paper">
                      {
                        pageNodes(flipFrom)[
                          mobile
                            ? flip.from % 2
                            : flip.direction === "forward"
                              ? 1
                              : 0
                        ]
                      }
                    </div>
                    <div className="turn-back book-paper">
                      {
                        pageNodes(flipTo)[
                          mobile
                            ? flip.to % 2
                            : flip.direction === "forward"
                              ? 0
                              : 1
                        ]
                      }
                    </div>
                  </div>
                )}
                <div className="book-gutter" aria-hidden="true" />
                {opened && focused && !flip && (
                  <>
                    <div className="book-grip grip-left" aria-hidden="true" />
                    <div className="book-grip grip-right" aria-hidden="true" />
                  </>
                )}
                <div
                  className="book-cover"
                  onClick={() => {
                    if (!opened) {
                      focusBook();
                      setOpened(true);
                    }
                  }}
                >
                  <div className="cover-front" aria-hidden={opened}>
                    <div className="cover-topline">
                      <span>PHAN VĂN ĐẠT</span>
                      <span>VOL. 01 / PORTFOLIO</span>
                    </div>
                    <span className="cover-flower" aria-hidden="true">
                      ✳
                    </span>
                    <div className="cover-label">
                      <p>{copy.edition}</p>
                      <h2>
                        {copy.coverTitle.split("\n").map((line, i) => (
                          <span key={i}>{line}</span>
                        ))}
                      </h2>
                      <p>{copy.coverSubtitle}</p>
                      <div className="cover-label-rule" />
                      <span className="cover-role">{site.role}</span>
                    </div>
                    <span className="cover-bottom">
                      DESIGN &nbsp; / &nbsp; CODE &nbsp; / &nbsp; CURIOSITY
                    </span>
                    <button
                      className="open-book-button"
                      onClick={() => {
                        focusBook();
                        setOpened(true);
                      }}
                      disabled={!focused || opened}
                      tabIndex={focused && !opened ? 0 : -1}
                      aria-hidden={opened}
                      aria-label={copy.open}
                    >
                      <span>{copy.open}</span>
                      <ArrowDownRight size={23} aria-hidden="true" />
                    </button>
                    <div className="cover-spine" aria-hidden="true" />
                  </div>
                  <div className="cover-inside" aria-hidden="true">
                    <span>Đ.</span>
                    <p>{copy.coverNote}</p>
                  </div>
                </div>
                <div className="book-ribbon" aria-hidden="true" />
              </div>
              {!focused && (
                <button
                  className="desk-book-target"
                  onClick={focusBook}
                  aria-label={copy.focus}
                />
              )}
            </div>
          </div>
          <div className="desk-lamp-control">
            <span className="lamp-control-label">
              {copy.lamp}
              <i>↘</i>
            </span>
            <ThemePullcord dictionary={dictionary.theme} />
          </div>
          {!reading && camera === "overview" && (
            <button className="overview-enter desk-pill" onClick={focusBook}>
              {copy.focus}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          )}
          {!reading && focused && !opened && (
            <p className="book-invitation handwritten">
              {copy.coverNote}
              <span aria-hidden="true">⤴</span>
            </p>
          )}
        </div>

        <nav className="book-toolbar" aria-label={dictionary.navigation}>
          {!reading && (
            <button
              className="desk-icon-button desk-view-button"
              onClick={showOverview}
            >
              <Expand size={16} aria-hidden="true" />
              <span>{copy.back}</span>
            </button>
          )}
          <div className="chapter-picker">
            <button
              className="desk-pill contents-button"
              aria-expanded={menu}
              aria-controls="book-contents"
              onClick={() => setMenu(!menu)}
            >
              <List size={17} aria-hidden="true" />
              <span>{copy.contents}</span>
              <ChevronDown size={14} aria-hidden="true" />
            </button>
            <div className="chapter-menu" id="book-contents" hidden={!menu}>
              <div className="chapter-menu-heading">
                <span>{copy.contents}</span>
                <button
                  className="desk-icon-button"
                  onClick={() => setMenu(false)}
                  aria-label={`${copy.close}: ${copy.contents}`}
                >
                  <X size={16} />
                </button>
              </div>
              {chapters.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={
                    opened && index === chapter ? "page" : undefined
                  }
                  onClick={(event) => {
                    if (!reading) {
                      event.preventDefault();
                      jump(index * 2, item.id);
                    } else setMenu(false);
                  }}
                >
                  <span>0{index + 1}</span>
                  {item.label}
                  <ArrowDownRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          {!reading && (
            <div className="page-controls">
              <button
                className="desk-icon-button"
                onClick={() => turn(-1)}
                disabled={
                  !opened ||
                  !focused ||
                  Boolean(flip) ||
                  (mobile ? page === 0 : chapter === 0)
                }
                aria-label={copy.previous}
              >
                <ArrowLeft size={19} />
              </button>
              <span
                className="page-counter"
                aria-live="polite"
                aria-atomic="true"
              >
                {!opened
                  ? "VOL. 01"
                  : `${copy.pages} ${mobile ? String(page + 1).padStart(2, "0") : `${String(chapter * 2 + 1).padStart(2, "0")} — ${String(chapter * 2 + 2).padStart(2, "0")}`} / ${lastPage + 1}`}
              </span>
              <button
                className="desk-icon-button"
                onClick={() => (opened ? turn(1) : jump(0))}
                disabled={
                  !focused ||
                  Boolean(flip) ||
                  (opened &&
                    (mobile
                      ? page === lastPage
                      : chapter === chapters.length - 1))
                }
                aria-label={opened ? copy.next : copy.first}
              >
                <ArrowRight size={19} />
              </button>
            </div>
          )}
          {!reading && opened && (
            <button
              className="desk-icon-button close-book-button"
              aria-label={copy.close}
              onClick={() => {
                clearTimeout(flipTimer.current);
                busy.current = false;
                setFlip(null);
                setOpened(false);
                setMenu(false);
                syncedHash.current = "";
                window.history.replaceState(
                  null,
                  "",
                  window.location.pathname + window.location.search,
                );
              }}
            >
              <RotateCcw size={16} aria-hidden="true" />
              <span>{copy.close}</span>
            </button>
          )}
        </nav>
        <p className="book-help">
          {reading ? copy.readNote : opened ? copy.help : copy.coverNote}
        </p>
        <div className="desk-contact-shortcut">
          <a href={`mailto:${site.email}`} aria-label={copy.email}>
            <Mail size={15} aria-hidden="true" />
            <span>{site.email}</span>
          </a>
          <button
            onClick={copyEmail}
            aria-label={copied ? copy.copied : copy.copy}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
          <span className="sr-only" role="status">
            {copied ? copy.copied : ""}
          </span>
        </div>
      </main>
      <footer className="desk-footer">
        <span>© {new Date().getFullYear()} PHAN VĂN ĐẠT</span>
        <span>
          BUILT WITH INTENTION <i aria-hidden="true">✳</i>
        </span>
      </footer>
      <noscript>
        <style>{`.desk-experience .desk-scene{perspective:none!important;height:auto!important;overflow:visible!important}.desk-experience .camera-world{opacity:1!important;position:static!important;transform:none!important;width:auto!important;height:auto!important}.desk-experience .book-position,.desk-experience .folio-book{position:static!important;transform:none!important;width:auto!important;height:auto!important}.desk-experience .book-spreads{position:static!important;visibility:visible!important;transform:none!important}.desk-experience .book-spread{display:grid!important;position:static!important;margin:20px}.desk-experience .book-paper{display:block!important;visibility:visible!important;position:relative!important;transform:none!important;width:auto!important;height:auto!important;min-height:570px}.scene-vignette,.desk-book-target,.wood-table,.desk-props,.book-cover,.book-gutter,.page-block,.book-back,.book-ribbon,.scene-heading,.book-toolbar,.book-invitation,.desk-lamp-control,.desk-header-actions{display:none!important}@media(max-width:699px){.desk-experience .book-spread{grid-template-columns:1fr!important}}`}</style>
      </noscript>
    </div>
  );
}
