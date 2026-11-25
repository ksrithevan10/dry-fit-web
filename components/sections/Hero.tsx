import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Cta = { label: string; href: string };

export type HeroProps = {
  label: string;
  headingLines: readonly string[];
  body: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  chips: ReadonlyArray<{ label: string; star: boolean }>;
};

/** Delay between headline lines, then when the fades start. */
const LINE_START = 0.3;
const LINE_STAGGER = 0.18;

function delay(seconds: number): CSSProperties {
  return { "--delay": `${seconds}s` } as CSSProperties;
}

/** Text-led hero on a dark rounded panel. */
export function Hero({
  label,
  headingLines,
  body,
  primaryCta,
  secondaryCta,
  chips,
}: HeroProps) {
  const fadeStart = LINE_START + headingLines.length * LINE_STAGGER + 0.25;

  return (
    <section aria-labelledby="hero-heading" className="px-2 sm:px-4">
      <div className="relative flex min-h-hero flex-col justify-end overflow-hidden rounded-panel surface-dark">
        {/* Future: full-bleed hero photo of a finished kitchen. */}
        <ImageSlot
          name="home-hero"
          brief="A finished high-street kitchen we have fitted"
          aspect="16/9"
        />

        <div className="flex flex-col gap-7 px-5 pt-16 pb-10 sm:px-8 md:px-12 md:pb-13">
          <SectionLabel tone="on-dark" className="animate-fade-in">
            {label}
          </SectionLabel>

          <h1
            id="hero-heading"
            className="max-w-275 font-heading text-display-xl"
          >
            {headingLines.map((line, index) => (
              <span
                key={line}
                className="mask-line"
                style={delay(LINE_START + index * LINE_STAGGER)}
              >
                <span>{line}</span>
              </span>
            ))}
          </h1>

          <p
            className="max-w-140 animate-fade-in text-lg text-on-dark-muted"
            style={delay(fadeStart)}
          >
            {body}
          </p>

          <div
            className="flex animate-fade-in flex-wrap gap-3"
            style={delay(fadeStart + 0.2)}
          >
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="light" arrow="up">
              {secondaryCta.label}
            </ButtonLink>
          </div>

          <ul
            className="flex animate-fade-in flex-wrap gap-2.5"
            style={delay(fadeStart + 0.4)}
          >
            {chips.map((chip) => (
              <li key={chip.label}>
                <Chip tone="on-dark" star={chip.star}>
                  {chip.label}
                </Chip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
