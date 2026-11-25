import { StarIcon } from "./StarIcon";

type StarsProps = {
  rating: number;
  /** Accessible text, e.g. "Rated 5 out of 5". */
  label: string;
};

/** Row of stars for a rating, read out as a single label. */
export function Stars({ rating, label }: StarsProps) {
  return (
    <div role="img" aria-label={label} className="flex gap-0.5">
      {Array.from({ length: rating }, (_, index) => (
        <StarIcon key={index} />
      ))}
    </div>
  );
}
