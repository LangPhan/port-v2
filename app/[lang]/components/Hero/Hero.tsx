import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { Dictionary } from "../../../../get-dictionary";
import { site } from "../../../../site-config";
import portrait from "../../../../public/main.png";

export default function Hero({
  dictionary,
}: {
  dictionary: Dictionary["hero"];
}) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-stars" aria-hidden="true" />
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="blue-dot" />
            {dictionary.eyebrow}
          </p>
          <h1 id="hero-title">
            {site.name}
            <span>{site.role}</span>
          </h1>
          <p className="hero-description">{dictionary.description}</p>
          <div className="actions">
            <a className="action action-primary" href="#projects">
              {dictionary.projects}
              <ArrowDownRight size={18} aria-hidden="true" />
            </a>
            <a className="action action-secondary" href="#contact">
              {dictionary.contact}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <p className="hero-note">
            React <span aria-hidden="true">/</span> Next.js{" "}
            <span aria-hidden="true">/</span> TypeScript
          </p>
        </div>
        <div className="portrait-frame">
          <span className="portrait-orbit" aria-hidden="true" />
          <div className="portrait-crop">
            <Image
              src={portrait}
              alt={site.name}
              priority
              fetchPriority="high"
              quality={70}
              sizes="(max-width: 767px) 375px, 570px"
            />
          </div>
          <div className="portrait-caption">
            <span className="blue-dot" />
            <span>{dictionary.portrait}</span>
            <span aria-hidden="true">↗</span>
          </div>
        </div>
      </div>
      <div className="shell hero-bottom">
        <span>PORTFOLIO</span>
        <a href="#projects">
          {dictionary.explore}
          <ArrowDownRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
