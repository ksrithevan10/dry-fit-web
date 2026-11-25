import type { ElementType, ReactNode } from "react";
import { cx } from "@/lib/cx";

type SectionLabelProps = {
  children: ReactNode;
  /** Render as a heading when the label is the section's only title. */
  as?: ElementType;
  id?: string;
  tone?: "primary" | "muted" | "on-dark";
  className?: string;
};

const tones = {
  primary: "text-primary",
  muted: "text-muted",
  "on-dark": "text-on-dark-muted",
};

/** Small uppercase label, e.g. "(01) Get a price". */
export function SectionLabel({
  children,
  as: Tag = "p",
  id,
  tone = "primary",
  className,
}: SectionLabelProps) {
  return (
    <Tag id={id} className={cx("type-label", tones[tone], className)}>
      {children}
    </Tag>
  );
}
