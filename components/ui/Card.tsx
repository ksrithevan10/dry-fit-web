import type { ElementType, ReactNode } from "react";
import { cx } from "@/lib/cx";

type CardProps = {
  children: ReactNode;
  tone?: "white" | "alt" | "dark";
  /** "card" = 24px radius, "panel" = 28px radius for large panels. */
  radius?: "card" | "panel";
  as?: ElementType;
  className?: string;
};

const tones = {
  white: "bg-card text-ink",
  alt: "bg-card-alt text-ink",
  dark: "surface-dark",
};

/** Rounded surface for grouped content. */
export function Card({
  children,
  tone = "white",
  radius = "card",
  as: Tag = "div",
  className,
}: CardProps) {
  return (
    <Tag
      className={cx(
        "flex flex-col gap-4 p-7 md:p-9",
        radius === "card" ? "rounded-card" : "rounded-panel",
        tones[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
