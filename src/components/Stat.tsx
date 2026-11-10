import { useInView, useCountUp } from "../lib/hooks";

interface StatProps {
  label: string;
  value: number;
  format: (n: number) => string;
  note?: string;
  accent?: boolean;
  size?: "lg" | "md";
}

export default function Stat({ label, value, format, note, accent, size = "md" }: StatProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const animated = useCountUp(value, inView);
  return (
    <div className={`stat ${accent ? "stat--accent" : ""} ${size === "lg" ? "stat--lg" : ""}`} ref={ref}>
      <span className="stat-label">{label}</span>
      <span className="stat-value mono">{format(animated)}</span>
      {note ? <span className="stat-note">{note}</span> : null}
    </div>
  );
}
