import type { ReactNode } from "react";

interface ChapterProps {
  id: string;
  fig: string;
  railTitle: string;
  children: ReactNode;
}

export default function Chapter({ id, fig, railTitle, children }: ChapterProps) {
  return (
    <section className="chapter" id={id} aria-labelledby={`${id}-title`}>
      <div className="shell chapter-inner">
        <div className="chapter-rail">
          <div className="rail-sticky">
            <span className="fig">{fig}</span>
            <p className="rail-title">{railTitle}</p>
          </div>
        </div>
        <div className="chapter-body">{children}</div>
      </div>
    </section>
  );
}
