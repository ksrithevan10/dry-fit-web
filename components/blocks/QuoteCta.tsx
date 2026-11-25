import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";

/** Closing quote prompt for inner pages, on a dark panel. */
export function QuoteCta() {
  const { heading, body, primary, secondary } = site.quoteCta;

  return (
    <section
      aria-labelledby="quote-cta-heading"
      className="px-2 pb-2 sm:px-4 sm:pb-4"
    >
      <div className="flex flex-col gap-7 rounded-panel surface-dark px-5 py-14 sm:px-8 md:px-12 md:py-20">
        <h2
          id="quote-cta-heading"
          className="max-w-225 font-heading text-display-l"
        >
          {heading}
        </h2>
        <p className="max-w-140 text-lg text-on-dark-muted">{body}</p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
          <ButtonLink href={secondary.href} variant="light">
            {secondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
