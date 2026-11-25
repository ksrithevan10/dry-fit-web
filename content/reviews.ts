/**
 * Customer reviews. Replace each placeholder with a real Google review
 * (with the customer's permission) before launch. See CONTENT_TODO.md.
 */

export type Review = {
  /** Star rating out of 5. */
  rating: number;
  quote: string;
  name: string;
  area: string;
};

const placeholder: Review = {
  rating: 5,
  quote: "[Customer review from Google]",
  name: "[Name]",
  area: "[Area]",
};

export const reviews: Review[] = Array.from({ length: 6 }, () => ({
  ...placeholder,
}));

/** Accessible label for a star rating, e.g. "Rated 5 out of 5". */
export function ratingLabel(rating: number): string {
  return `Rated ${rating} out of 5`;
}

export const reviewsPage = {
  meta: {
    title: "Reviews",
    description:
      "What customers say about Dry-Fit, kitchen dry fitters in Harrow and North West London.",
  },
  label: "Reviews",
  heading: "What our customers say.",
  googleLink: {
    label: "Read all our Google reviews",
    href: "[Google reviews URL]",
  },
};
