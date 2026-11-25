import { ButtonLink } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";

type Cta = { label: string; href: string };

export type ClosingCtaProps = {
  heading: string;
  primaryCta: Cta;
  secondaryCta: Cta;
};

/**
 * Closing call to action on a dark panel. The headline fills left to right as
 * it scrolls into view: a dim copy sits underneath and a solid copy is
 * revealed over it with clip-path. Screen readers get the heading once.
 */
export function ClosingCta({
  heading,
  primaryCta,
  secondaryCta,
}: ClosingCtaProps) {
  return (
    <section
      aria-labelledby="closing-heading"
      className="px-2 pb-2 sm:px-4 sm:pb-4"
    >
      <div className="relative flex min-h-closing items-end overflow-hidden rounded-panel surface-dark">
        {/* Future: closing photo of a finished kitchen. */}
        <ImageSlot
          name="home-closing"
          brief="A wide shot of a finished kitchen"
          aspect="16/9"
        />

        <div className="flex w-full flex-col gap-9 px-5 pt-16 pb-10 sm:px-8 md:px-12 md:pb-14">
          <h2
            id="closing-heading"
            className="relative font-heading text-display-cta"
          >
            <span className="text-on-dark-dim">{heading}</span>
            <span
              aria-hidden="true"
              className="absolute inset-0 fill-on-scroll"
            >
              {heading}
            </span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="light">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
