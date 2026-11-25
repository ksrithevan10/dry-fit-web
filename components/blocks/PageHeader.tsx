import type { ReactNode } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

type PageHeaderProps = {
  label: string;
  heading: string;
  intro?: string;
  children?: ReactNode;
};

/** Top of an inner page: label, the page's single h1 and an intro. */
export function PageHeader({
  label,
  heading,
  intro,
  children,
}: PageHeaderProps) {
  return (
    <header className="container-site flex flex-col gap-6 pt-10 pb-16 md:pt-16 md:pb-20">
      <SectionLabel className="animate-fade-in">{label}</SectionLabel>
      <h1 className="max-w-275 font-heading text-display-l">
        <span className="mask-line">
          <span>{heading}</span>
        </span>
      </h1>
      {intro && (
        <p
          className="max-w-170 animate-fade-in text-lg text-muted"
          style={{ "--delay": "0.4s" } as React.CSSProperties}
        >
          {intro}
        </p>
      )}
      {children}
    </header>
  );
}
