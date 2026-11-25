import { Chip } from "@/components/ui/Chip";
import { Marquee } from "@/components/ui/Marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stars } from "@/components/ui/Stars";
import { ratingLabel, type Review } from "@/content/reviews";

export type ReviewsMarqueeProps = {
  label: string;
  heading: string;
  chip: string;
  items: readonly Review[];
  pauseLabel: string;
  playLabel: string;
};

/** "(04) Reviews": a slow marquee of review cards. */
export function ReviewsMarquee({
  label,
  heading,
  chip,
  items,
  pauseLabel,
  playLabel,
}: ReviewsMarqueeProps) {
  return (
    <section
      aria-labelledby="reviews-heading"
      className="flex flex-col gap-9 pb-section"
    >
      <div className="container-site flex reveal flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-4.5">
          <SectionLabel>{label}</SectionLabel>
          <h2 id="reviews-heading" className="font-heading text-display-l">
            {heading}
          </h2>
        </div>
        <Chip star>{chip}</Chip>
      </div>

      <Marquee
        label={heading}
        duration={60}
        pauseLabel={pauseLabel}
        playLabel={playLabel}
      >
        <ul className="flex">
          {items.map((review, index) => (
            <li key={index} className="mr-5 w-80 shrink-0 sm:w-90">
              <figure className="flex h-full flex-col gap-4 rounded-review bg-card p-7">
                <Stars
                  rating={review.rating}
                  label={ratingLabel(review.rating)}
                />
                <blockquote className="text-lead">{review.quote}</blockquote>
                <figcaption className="type-label text-muted">
                  {review.name} · {review.area}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Marquee>
    </section>
  );
}
