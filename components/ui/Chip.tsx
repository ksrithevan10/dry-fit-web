import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { StarIcon } from "./StarIcon";

type ChipProps = {
  children: ReactNode;
  star?: boolean;
  tone?: "light" | "on-dark";
  className?: string;
};

const tones = {
  light: "bg-card text-ink",
  "on-dark": "bg-on-dark-chip text-on-dark",
};

/** Small pill for trust signals, e.g. "[4.9] on Google". */
export function Chip({ children, star, tone = "light", className }: ChipProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-pill px-3.5 py-2 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {star && <StarIcon />}
      {children}
    </span>
  );
}
