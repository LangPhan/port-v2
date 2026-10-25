import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Dictionary } from "../../../../get-dictionary";
import type { PortfolioProject } from "./projects";

type Props = {
  project: PortfolioProject;
  dictionary: Dictionary["projects"];
  featured?: boolean;
  index: number;
};
export default function Content({
  project,
  dictionary,
  featured = false,
  index,
}: Props) {
  const copy = dictionary.items[project.id];
  return (
    <article
      id={`project-${project.id}`}
      tabIndex={-1}
      className={`project-card${featured ? " project-card-lead" : ""}`}
      aria-labelledby={`title-${project.id}`}
    >
      <div className="project-image">
        <Image
          src={project.image}
          alt={`${dictionary.preview} — ${project.title}`}
          sizes={
            featured
              ? "(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 55vw, 660px"
              : "(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 45vw, 570px"
          }
          placeholder="blur"
        />
        <span className="project-number" aria-hidden="true">
          0{index + 1}
        </span>
      </div>
      <div className="project-copy">
        <p className="eyebrow">{copy.category}</p>
        <h3 id={`title-${project.id}`}>{project.title}</h3>
        {copy.role && <p className="project-role">{copy.role}</p>}
        <p className="project-summary">{copy.summary}</p>
        <ul className="tech-tags" aria-label={dictionary.tech}>
          {project.technologies.slice(0, 3).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <details className="project-details">
          <summary>
            {dictionary.details}
            <span className="sr-only"> — {project.title}</span>
            <Plus size={17} aria-hidden="true" />
          </summary>
          <dl>
            <div>
              <dt>{dictionary.problem}</dt>
              <dd>{copy.problem}</dd>
            </div>
            <div>
              <dt>{dictionary.scope}</dt>
              <dd>{copy.scope}</dd>
            </div>
            {copy.contribution && (
              <div>
                <dt>{dictionary.contribution}</dt>
                <dd>{copy.contribution}</dd>
              </div>
            )}
            <div>
              <dt>{dictionary.tech}</dt>
              <dd>{project.technologies.join(" · ")}</dd>
            </div>
          </dl>
        </details>
        <div className="project-links">
          {[
            { href: project.website, label: dictionary.visit },
            { href: project.repository, label: dictionary.repository },
            { href: project.video, label: dictionary.video },
          ].map(
            ({ href, label }) =>
              href && (
                <a
                  key={href}
                  className="text-link project-visit"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only">
                    {" "}
                    — {project.title}, {dictionary.external}
                  </span>
                </a>
              ),
          )}
        </div>
      </div>
    </article>
  );
}
