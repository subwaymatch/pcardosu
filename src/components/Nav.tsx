import { useEffect, useState } from "react";
import { chapters } from "../data/dataset";
import { site } from "../site";
import { useActiveSection, useScrollProgress } from "../lib/hooks";

const LINKS = [
  { id: "overview", label: "Overview" },
  { id: "rhythm", label: "Rhythm" },
  { id: "categories", label: "Categories" },
  { id: "cardholders", label: "Cardholders" },
  { id: "vendors", label: "Vendors" },
  { id: "method", label: "Method" },
];

export default function Nav() {
  const progress = useScrollProgress();
  const active = useActiveSection(chapters.map((c) => c.id));
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <header className={`nav ${solid ? "nav--solid" : ""}`}>
        <div className="shell nav-inner">
          <a className="brand" href="#top" aria-label="PCard 2014, back to top">
            <span className="brand-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="brand-text">
              <b>PCARD</b>
              <span>2014</span>
            </span>
            <span className="brand-div" aria-hidden="true" />
            <span className="brand-sub">{site.institution}</span>
          </a>

          <nav className="nav-links" aria-label="Chapters">
            {LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} className={active === l.id ? "is-active" : ""}>
                {l.label}
              </a>
            ))}
          </nav>

          <a className="nav-cta mono" href="#method">
            Appendix
            <span aria-hidden="true">↘</span>
          </a>
        </div>
      </header>

      <ol className="index-rail" aria-label="Section index">
        {chapters.map((c) => (
          <li key={c.id}>
            <a href={`#${c.id}`} className={active === c.id ? "is-active" : ""} aria-label={c.title}>
              <span className="dot" />
              <span className="index-label">{c.fig.startsWith("Fig.") ? c.fig.slice(4) : "Apx"}</span>
            </a>
          </li>
        ))}
      </ol>
    </>
  );
}
