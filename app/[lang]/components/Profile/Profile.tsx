import type { Dictionary } from "../../../../get-dictionary";
export default function Profile({
  dictionary,
}: {
  dictionary: Dictionary["profile"];
}) {
  return (
    <section
      id="profile"
      tabIndex={-1}
      className="section about-section"
      aria-labelledby="about-title"
    >
      <div className="shell about-grid">
        <div>
          <p className="eyebrow">{dictionary.eyebrow}</p>
          <h2 id="about-title">{dictionary.title}</h2>
          <p className="section-description">{dictionary.intro}</p>
          <a className="text-link" href="#projects">
            {dictionary.evidence}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="skill-list">
          {dictionary.skills.map((skill, index) => (
            <div className="skill-row" key={skill.title}>
              <span className="skill-index" aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <h3>{skill.title}</h3>
                <p>{skill.tools}</p>
                <a href={`#${skill.project}`}>
                  {skill.evidence}
                  <span aria-hidden="true"> ↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
