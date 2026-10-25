import { Plus } from "lucide-react";
import type { Dictionary } from "../../../../get-dictionary";
import Content from "./Content";
import { projects } from "./projects";

export default function Project({
  dictionary,
}: {
  dictionary: Dictionary["projects"];
}) {
  return (
    <section
      id="projects"
      tabIndex={-1}
      className="section projects-section"
      aria-labelledby="projects-title"
    >
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dictionary.eyebrow}</p>
            <h2 id="projects-title">{dictionary.title}</h2>
          </div>
          <p className="section-description">{dictionary.intro}</p>
        </div>
        <div className="projects-grid" aria-label={dictionary.featured}>
          {projects.slice(0, 3).map((project, index) => (
            <Content
              key={project.id}
              project={project}
              dictionary={dictionary}
              featured={index === 0}
              index={index}
            />
          ))}
        </div>
        <details className="more-projects">
          <summary>
            {dictionary.more}
            <Plus size={18} aria-hidden="true" />
          </summary>
          <div className="projects-grid secondary-projects">
            {projects.slice(3).map((project, index) => (
              <Content
                key={project.id}
                project={project}
                dictionary={dictionary}
                index={index + 3}
              />
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
