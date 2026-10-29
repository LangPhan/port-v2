"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { PAGE_TURN_MS, PAPER_HEIGHT, PAPER_WIDTH, PAPER_DEPTH_SCALE, paperPose, paperShade, paperShadowPath } from "./page-turn-math.mjs";

type Props = {
  direction: "forward" | "backward";
  mobile: boolean;
  front: ReactNode;
  back: ReactNode;
  frontLeaf: number;
  backLeaf: number;
  onComplete: () => void;
};

export default function CurvedPageTurn({ direction, mobile, front, back, frontLeaf, backLeaf, onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;
  const count = mobile ? 20 : 30;
  const segmentWidth = PAPER_WIDTH / count;
  const anchor = mobile ? 0 : PAPER_WIDTH;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.setAttribute("inert", "");
    // These are transient visual copies, not additional document headings/links.
    root.querySelectorAll("[id], [aria-labelledby]").forEach(node => {
      node.removeAttribute("id"); node.removeAttribute("aria-labelledby");
    });
    const book = root.closest(".folio-book");
    const syncPaper = (copy: Element, leaf: number) => {
      const source = book?.querySelector<HTMLElement>(`[data-chapter="${Math.floor(leaf / 2)}"][data-leaf="${leaf % 2}"]`);
      const content = copy.querySelector<HTMLElement>(".paper-content");
      const details = source?.querySelectorAll("details");
      copy.querySelectorAll("details").forEach((item, index) => { item.open = details?.[index]?.open ?? false; });
      if (content) content.scrollTop = source?.querySelector(".paper-content")?.scrollTop ?? 0;
    };
    for (const [face, leaf] of [["front", frontLeaf], ["back", backLeaf]] as const) {
      root.querySelectorAll(`.curve-${face} .curve-content`).forEach(copy => syncPaper(copy, leaf));
    }
    book?.querySelectorAll(".flip-underlay > .book-paper").forEach((copy, side) => {
      syncPaper(copy, mobile ? backLeaf : side === 0 ? frontLeaf - 1 : backLeaf + 1);
    });
    const spine = root.querySelector<HTMLElement>(".paper-spine")!;
    const bones = Array.from(root.querySelectorAll<HTMLElement>(".paper-bone"));
    const frontTones = Array.from(root.querySelectorAll<HTMLElement>(".curve-front .paper-tone"));
    const backTones = Array.from(root.querySelectorAll<HTMLElement>(".curve-back .paper-tone"));
    const shadow = root.querySelector<SVGPathElement>(".turn-shadow-shape")!;
    const contact = root.querySelector<HTMLElement>(".turn-contact-shadow")!;
    const paint = (progress: number) => {
      const pose = paperPose(progress, direction, count);
      root.dataset.progress = pose.progress.toFixed(3);
      spine.style.transform = `scaleZ(${PAPER_DEPTH_SCALE}) rotateY(${pose.root}rad)`;
      bones.forEach((bone, index) => {
        const node = pose.nodes[index];
        const next = pose.nodes[index + 1];
        bone.style.transform = `rotateY(${node.rotationY}rad)`;
        for (const [tone, backFace] of [[frontTones[index], false], [backTones[index], true]] as const) {
          const a = paperShade(node.yaw, backFace);
          const b = paperShade(next.yaw, backFace);
          tone.style.background = `linear-gradient(90deg,rgba(24,31,19,${backFace ? b : a}),rgba(24,31,19,${backFace ? a : b}))`;
        }
      });
      shadow.setAttribute("d", paperShadowPath(pose, anchor));
      shadow.style.opacity = String(pose.shadowOpacity);
      shadow.style.filter = `blur(${pose.shadowBlur}px)`;
      contact.style.opacity = String(pose.contactOpacity);
    };
    paint(0);
    const started = performance.now();
    let frame = 0;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frame);
      paint(1);
      completeRef.current();
    };
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / PAGE_TURN_MS);
      paint(progress);
      if (progress >= 1) finish();
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    // Background tabs may suspend animation frames; never leave navigation locked.
    const fallback = window.setTimeout(finish, PAGE_TURN_MS + 120);
    return () => { finished = true; cancelAnimationFrame(frame); clearTimeout(fallback); };
  }, [anchor, backLeaf, count, direction, frontLeaf, mobile]);

  let chain: ReactNode = null;
  for (let index = count - 1; index >= 0; index--) {
    chain = <div className="paper-bone" data-bone={index} key={index} style={{ left: index === 0 ? 0 : segmentWidth, width: segmentWidth } as CSSProperties}>
      <div className="paper-strip curve-front"><div className="curve-content book-paper paper-right" style={{ left: -index * segmentWidth }}>{front}</div><div className="paper-tone" /></div>
      <div className="paper-strip curve-back"><div className="curve-content book-paper paper-left" style={{ left: -(count - 1 - index) * segmentWidth }}>{back}</div><div className="paper-tone" /></div>
      {chain}
    </div>;
  }
  return <div className={`curved-turn turn-${direction}${mobile ? " turn-mobile" : ""}`} ref={rootRef} aria-hidden="true" style={{ "--segment-width": `${segmentWidth}px`, "--turn-anchor": `${anchor}px` } as CSSProperties} data-testid="curved-page-turn">
    <svg className="turn-shadow-plane" viewBox={`0 0 ${mobile ? PAPER_WIDTH : PAPER_WIDTH * 2} ${PAPER_HEIGHT}`} preserveAspectRatio="none" aria-hidden="true"><path className="turn-shadow-shape" /></svg>
    <div className="turn-contact-shadow" />
    <div className="paper-spine">{chain}</div>
  </div>;
}
