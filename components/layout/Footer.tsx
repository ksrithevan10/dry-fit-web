import { site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { NavLinks } from "./NavLinks";

/** Site footer: wordmark, nav, legal links, disclaimer and company details. */
export function Footer() {
  const { nav, ui, footer } = site;

  return (
    <footer className="container-site flex flex-col gap-7 py-12 text-muted">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <Logo text={site.logoText} className="text-ink" />
        <nav aria-label={ui.footerNav}>
          <NavLinks
            links={nav.footer}
            className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold text-ink"
            linkClassName="link-underline"
          />
        </nav>
      </div>

      <div className="flex flex-col gap-2 text-xs">
        <p className="max-w-245">{footer.disclaimer}</p>
        <p>{footer.details}</p>
      </div>

      <nav aria-label={ui.legalNav}>
        <NavLinks
          links={nav.legal}
          className="flex flex-wrap gap-x-6 text-xs font-semibold"
          linkClassName="link-underline"
        />
      </nav>
    </footer>
  );
}
