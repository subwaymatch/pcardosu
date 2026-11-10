import type { ReactNode } from "react";

interface Props {
  left: number; // percentage of chart width
  children: ReactNode;
}

export default function Tooltip({ left, children }: Props) {
  const clamped = Math.min(Math.max(left, 9), 91);
  return (
    <div className="chart-tip" style={{ left: `${clamped}%` }} role="status">
      {children}
    </div>
  );
}
