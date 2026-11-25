import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

/** Site header: wordmark, primary nav, quote button and mobile menu. */
export function Header() {
  const { nav, ui } = site;

  return (
    <header className="relative">
      <div className="container-site flex items-center justify-between gap-5 py-4 lg:py-5">
        <Logo text={site.logoText} />

        <nav aria-label={ui.primaryNav} className="hidden lg:block">
          <NavLinks
            links={nav.primary}
            className="flex gap-7 text-ui font-semibold"
            linkClassName="link-underline"
          />
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href={nav.cta.href} size="sm" className="max-sm:hidden">
            {nav.cta.label}
          </ButtonLink>
          <MobileMenu
            links={nav.primary}
            cta={nav.cta}
            call={{ label: site.topBar.call, href: `tel:${site.phone.href}` }}
            openLabel={ui.menuOpen}
            closeLabel={ui.menuClose}
            navLabel={ui.primaryNav}
          />
        </div>
      </div>
    </header>
  );
}
