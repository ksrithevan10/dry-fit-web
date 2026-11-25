import type { ReactNode } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cx } from "@/lib/cx";

type SectionProps = {
  id: string;
  label?: string;
  heading: string;
  children: ReactNode;
  className?: string;
};

/** Standard inner-page section: optional label, h2 and content. */
export function Section({
  id,
  label,
  heading,
  children,
  className,
}: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      aria-labelledby={headingId}
      className={cx("container-site pb-section", className)}
    >
      <div className="flex reveal flex-col gap-4.5 pb-9">
        {label && <SectionLabel>{label}</SectionLabel>}
        <h2 id={headingId} className="font-heading text-display-l">
          {heading}
        </h2>
      </div>
      {children}
    </section>
  );
}
