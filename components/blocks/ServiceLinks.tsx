import Link from "next/link";
import { ArrowChip } from "@/components/ui/ArrowChip";
import type { Service } from "@/content/services";

/** Grid of links to the service pages. */
export function ServiceLinks({ services }: { services: readonly Service[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {services.map((service) => (
        <li key={service.slug}>
          <Link
            href={service.href}
            className="group flex h-full items-center justify-between gap-6 rounded-card bg-card p-7 md:p-9"
          >
            <span className="flex flex-col gap-2">
              <span className="type-label text-muted">{service.number}</span>
              <span className="font-heading text-heading-m">
                {service.title}
              </span>
            </span>
            <ArrowChip className="bg-primary text-on-dark" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
