import Image from "next/image";
import { ArrowUpRight, Code2, Layers3, Sparkles } from "lucide-react";
import type { Dictionary } from "../../../../get-dictionary";
import { contactHref, site } from "../../../../site-config";
import portrait from "../../../../public/main.png";
import { projects, type PortfolioProject } from "../Project/projects";
import type { DeskCopy } from "./desk-copy";
import type { BookChapter } from "./portfolio-desk";

function Folio({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <div className="paper-content">
      <div className="paper-running">
        <span>ĐẠT / JOURNAL</span>
        <span>VOL. 01</span>
      </div>
      {children}
      <div className="paper-folio">
        <span>PHAN VĂN ĐẠT</span>
        <span>{String(number).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

function ProjectLinks({
  project,
  dictionary,
}: {
  project: PortfolioProject;
  dictionary: Dictionary["projects"];
}) {
  return (
    <div className="paper-project-links">
      {[
        [project.website, dictionary.visit],
        [project.repository, dictionary.repository],
        [project.video, dictionary.video],
      ].map(
        ([href, label]) =>
          href && (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer">
              {label}
              <ArrowUpRight size={17} aria-hidden="true" />
              <span className="sr-only"> ({dictionary.external})</span>
            </a>
          ),
      )}
    </div>
  );
}

export function makePortfolioPages(
  dictionary: Dictionary,
  copy: DeskCopy,
): BookChapter[] {
  const d = dictionary;
  const chapters: BookChapter[] = [
    {
      id: "profile",
      label: copy.about,
      left: (
        <Folio number={1}>
          <div className="portrait-paper">
            <span className="paper-tape" />
            <Image
              src={portrait}
              alt={site.name}
              priority
              sizes="(max-width: 700px) 300px, 400px"
              quality={75}
            />
            <p>
              hello, world. <span>↗</span>
            </p>
          </div>
          <p className="handwritten portrait-note">A face behind the pixels.</p>
        </Folio>
      ),
      right: (
        <Folio number={2}>
          <section id="profile" aria-labelledby="folio-about">
            <p className="paper-kicker">01 / {copy.about}</p>
            <h2 id="folio-about">{d.profile.title}</h2>
            <p className="paper-intro">{d.profile.intro}</p>
            <div className="paper-divider" />
            <p>{d.hero.description}</p>
            <div className="signature">
              Đạt <span>✳</span>
            </div>
            <a className="paper-link" href="#skills">
              {copy.skills} <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </section>
        </Folio>
      ),
    },
    {
      id: "skills",
      label: copy.skills,
      left: (
        <Folio number={3}>
          <section id="skills">
            <p className="paper-kicker">02 / {copy.skills}</p>
            <h2>
              {copy.skills}
              <span className="orange-period">.</span>
            </h2>
            <p className="paper-intro">{d.hero.eyebrow}</p>
            <div className="tool-stamp">
              <Code2 size={58} strokeWidth={1} aria-hidden="true" />
              <span>
                React / Next.js
                <br />
                TypeScript / CSS
              </span>
            </div>
            <p className="handwritten">
              Thoughtfully built,
              <br />
              one detail at a time.
            </p>
          </section>
        </Folio>
      ),
      right: (
        <Folio number={4}>
          <div className="paper-skills">
            {d.profile.skills.map((skill, index) => (
              <div key={skill.title}>
                <span className="paper-kicker">0{index + 1}</span>
                <h3>{skill.title}</h3>
                <p>{skill.tools}</p>
                <a className="paper-link" href={`#${skill.project}`}>
                  {skill.evidence}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </Folio>
      ),
    },
  ];
  projects.slice(0, 3).forEach((project, index) => {
    const item = d.projects.items[project.id];
    chapters.push({
      id: index === 0 ? "projects" : `project-${project.id}`,
      label: project.title,
      left: (
        <Folio number={5 + index * 2}>
          <section id={index === 0 ? "projects" : undefined}>
            <p className="paper-kicker">
              0{index + 3} / {copy.work}
            </p>
            <h2 className="project-editorial-title">
              {project.title}
              <span className="orange-period">.</span>
            </h2>
            <figure className={`project-print print-${project.id}`}>
              <Image
                src={project.image}
                alt={`${d.projects.preview}: ${project.title}`}
                sizes="(max-width: 700px) 320px, 430px"
                quality={75}
              />
              <figcaption>{item.category}</figcaption>
            </figure>
          </section>
        </Folio>
      ),
      right: (
        <Folio number={6 + index * 2}>
          <article
            id={`project-${project.id}`}
            aria-labelledby={`folio-${project.id}`}
          >
            <p className="paper-kicker">{item.role}</p>
            <h3 id={`folio-${project.id}`}>{project.title}</h3>
            <p className="paper-project-summary">{item.summary}</p>
            <dl className="paper-case">
              <dt>{d.projects.problem}</dt>
              <dd>{item.problem}</dd>
              <dt>{d.projects.contribution}</dt>
              <dd>{item.contribution}</dd>
            </dl>
            <ul className="paper-tech" aria-label={d.projects.tech}>
              {project.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <ProjectLinks project={project} dictionary={d.projects} />
          </article>
        </Folio>
      ),
    });
  });
  chapters.push(
    {
      id: "more-work",
      label: copy.more,
      left: (
        <Folio number={11}>
          <section id="more-work">
            <p className="paper-kicker">06 / {copy.more}</p>
            <h2>
              {copy.more}
              <span className="orange-period">.</span>
            </h2>
            <p className="paper-intro">{d.projects.intro}</p>
            <div className="exploration-art" aria-hidden="true">
              <Layers3 size={110} strokeWidth={0.8} />
              <Sparkles size={35} strokeWidth={1} />
              <span>
                keep
                <br />
                making.
              </span>
            </div>
          </section>
        </Folio>
      ),
      right: (
        <Folio number={12}>
          <div className="paper-more">
            {projects.slice(3).map((project, index) => (
              <article key={project.id} id={`project-${project.id}`}>
                <span className="paper-kicker">
                  0{index + 4} / {d.projects.items[project.id].category}
                </span>
                <h3>{project.title}</h3>
                <p>{d.projects.items[project.id].summary}</p>
                <details>
                  <summary>
                    {d.projects.details} <span aria-hidden="true">↗</span>
                  </summary>
                  <Image
                    src={project.image}
                    alt={`${d.projects.preview}: ${project.title}`}
                    sizes="300px"
                  />
                  <p>{d.projects.items[project.id].scope}</p>
                  <p>{project.technologies.join(" · ")}</p>
                </details>
              </article>
            ))}
          </div>
        </Folio>
      ),
    },
    {
      id: "contact",
      label: copy.contact,
      left: (
        <Folio number={13}>
          <p className="paper-kicker">07 / {copy.contact}</p>
          <h2 className="contact-editorial">{copy.thanks}</h2>
          <span className="contact-asterisk" aria-hidden="true">
            ✳
          </span>
          <p className="handwritten">{copy.end}</p>
        </Folio>
      ),
      right: (
        <Folio number={14}>
          <section id="contact" aria-labelledby="folio-contact">
            <p className="paper-kicker">{d.contact.eyebrow}</p>
            <h3 id="folio-contact">{d.contact.title}</h3>
            <p className="paper-intro">{d.contact.description}</p>
            <a className="paper-email" href={contactHref}>
              {site.email}
              <ArrowUpRight size={22} aria-hidden="true" />
            </a>
            <p className="paper-small">{d.contact.hint}</p>
            <a
              className="paper-link"
              href="https://github.com/LangPhan"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub / LangPhan
              <ArrowUpRight size={18} aria-hidden="true" />
              <span className="sr-only"> ({d.projects.external})</span>
            </a>
            <div className="closing-mark">
              Đ.<span>DESIGN. CODE. REPEAT.</span>
            </div>
          </section>
        </Folio>
      ),
    },
  );
  return chapters;
}
