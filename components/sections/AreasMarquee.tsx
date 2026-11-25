import Link from "next/link";
import { Marquee } from "@/components/ui/Marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { areaHref, type Area } from "@/content/site";

export type AreasMarqueeProps = {
  label: string;
  radius: string;
  items: readonly Area[];
  pauseLabel: string;
  playLabel: string;
};

/** "(05) Where we fit": reverse marquee of outlined area names. */
export function AreasMarquee({
  label,
  radius,
  items,
  pauseLabel,
  playLabel,
}: AreasMarqueeProps) {
  return (
    <section
      aria-labelledby="areas-heading"
      className="flex flex-col gap-7 pb-section"
    >
      <div className="container-site flex reveal flex-wrap justify-between gap-4">
        <SectionLabel as="h2" id="areas-heading">
          {label}
        </SectionLabel>
        <SectionLabel tone="muted">{radius}</SectionLabel>
      </div>

      <Marquee
        label={label}
        reverse
        duration={56}
        pauseLabel={pauseLabel}
        playLabel={playLabel}
      >
        <ul className="flex">
          {items.map((area) => (
            <li key={area.slug}>
              <Link
                href={areaHref(area)}
                className="inline-block px-8.5 font-heading text-display-area whitespace-nowrap text-outline"
              >
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
      </Marquee>
    </section>
  );
}
