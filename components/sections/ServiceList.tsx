import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

export type ServiceListProps = {
  label: string;
  allLink: { label: string; href: string };
  items: ReadonlyArray<{ number: string; title: string; href: string }>;
};

/** "(02) What we fit": large hover list linking to each service page. */
export function ServiceList({ label, allLink, items }: ServiceListProps) {
  return (
    <section
      aria-labelledby="services-heading"
      className="container-site pb-section"
    >
      <div className="flex reveal flex-wrap items-end justify-between gap-4 pb-7">
        <SectionLabel as="h2" id="services-heading">
          {label}
        </SectionLabel>
        <Link
          href={allLink.href}
          className="link-underline inline-flex min-h-touch items-center type-label"
        >
          {allLink.label}
        </Link>
      </div>
      <ul className="border-b border-line">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-center gap-4 border-t border-line py-6.5 text-faint hover:text-ink focus-visible:text-ink md:gap-7"
            >
              <span className="w-12 shrink-0 type-label text-muted">
                {item.number}
              </span>
              <span className="inline-block font-heading text-display-m transition-transform duration-600 ease-out-expo group-hover:translate-x-4 group-focus-visible:translate-x-4">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
