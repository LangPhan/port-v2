import type { Dictionary } from "../../../get-dictionary";
import { site } from "../../../site-config";
export default function Footer({
  dictionary,
}: {
  dictionary: Dictionary["footer"];
}) {
  return (
    <footer className="site-footer shell">
      <p>
        © {new Date().getFullYear()} {site.name}
        <span> / {site.role}</span>
      </p>
      <a href="#top">
        {dictionary.top}
        <span aria-hidden="true"> ↑</span>
      </a>
    </footer>
  );
}
