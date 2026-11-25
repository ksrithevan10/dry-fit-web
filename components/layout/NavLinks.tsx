"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/content/site";
import { cx } from "@/lib/cx";

type NavLinksProps = {
  links: readonly NavLink[];
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

/** List of nav links that marks the current section with aria-current. */
export function NavLinks({
  links,
  className,
  linkClassName,
  onNavigate,
}: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {links.map((link) => {
        const current =
          pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={current ? "page" : undefined}
              className={cx(
                "inline-flex min-h-touch items-center",
                linkClassName,
              )}
              onClick={onNavigate}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
