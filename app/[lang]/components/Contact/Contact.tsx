import { ArrowUpRight, Mail } from "lucide-react";
import type { Dictionary } from "../../../../get-dictionary";
import { contactHref, site } from "../../../../site-config";
export function Contact({ dictionary }: { dictionary: Dictionary["contact"] }) {
  return (
    <section
      id="contact"
      tabIndex={-1}
      className="section contact-section"
      aria-labelledby="contact-title"
    >
      <div className="shell">
        <div className="contact-panel">
          <div>
            <p className="eyebrow">{dictionary.eyebrow}</p>
            <h2 id="contact-title">{dictionary.title}</h2>
            <p className="section-description">{dictionary.description}</p>
          </div>
          <div className="contact-actions">
            <a href={contactHref} className="email-link">
              <Mail size={22} aria-hidden="true" />
              <span>{site.email}</span>
              <ArrowUpRight size={22} aria-hidden="true" />
            </a>
            <p>{dictionary.hint}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
