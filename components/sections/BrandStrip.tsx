import { Marquee } from "@/components/ui/Marquee";

export type BrandStripProps = {
  label: string;
  disclaimer: string;
  brands: readonly string[];
  pauseLabel: string;
  playLabel: string;
};

/** "We fit kitchens from" strip: plain-text brand names in a marquee. */
export function BrandStrip({
  label,
  disclaimer,
  brands,
  pauseLabel,
  playLabel,
}: BrandStripProps) {
  return (
    <section aria-labelledby="brands-label" className="pt-14 pb-6">
      <div className="container-site flex flex-wrap justify-between gap-3 pb-5 type-label text-muted">
        <h2 id="brands-label">{label}</h2>
        <p>{disclaimer}</p>
      </div>
      <Marquee
        label={label}
        pauseLabel={pauseLabel}
        playLabel={playLabel}
        className="[&_.marquee-viewport]:border-y [&_.marquee-viewport]:border-line [&_.marquee-viewport]:py-5.5"
      >
        <ul className="flex">
          {brands.map((brand) => (
            <li
              key={brand}
              className="inline-flex items-center gap-17 px-8.5 font-heading text-marquee whitespace-nowrap"
            >
              {brand}
              <span
                aria-hidden="true"
                className="inline-block size-3 rounded-pill bg-primary"
              />
            </li>
          ))}
        </ul>
      </Marquee>
    </section>
  );
}
