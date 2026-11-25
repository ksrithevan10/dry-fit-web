"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { NavLinks } from "./NavLinks";

type MobileMenuProps = {
  links: readonly NavLink[];
  cta: NavLink;
  call: { label: string; href: string };
  openLabel: string;
  closeLabel: string;
  navLabel: string;
};

/**
 * Disclosure menu for small screens. The button toggles a panel of real page
 * links; Escape closes it and returns focus to the button.
 */
export function MobileMenu({
  links,
  cta,
  call,
  openLabel,
  closeLabel,
  navLabel,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-touch min-w-touch items-center justify-center gap-2 rounded-pill border border-line px-4 text-ui font-semibold"
      >
        <span>{open ? closeLabel : openLabel}</span>
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          {open ? (
            <path
              d="M4 4l10 10M14 4L4 14"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M2 5h14M2 9h14M2 13h14"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-50 border-t border-line bg-bg pb-8 shadow-menu"
      >
        <nav aria-label={navLabel} className="container-site">
          <NavLinks
            links={links}
            onNavigate={() => setOpen(false)}
            className="flex flex-col divide-y divide-line"
            linkClassName="w-full py-3 font-heading text-heading-m"
          />
          <div className="mt-6 flex flex-col gap-3">
            <ButtonLink href={cta.href} block>
              {cta.label}
            </ButtonLink>
            <a
              href={call.href}
              className="inline-flex min-h-touch items-center justify-center text-ui font-semibold"
            >
              {call.label}
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
