import { Breadcrumbs, PageHeader, QuoteCta } from "@/components/blocks";
import { Chip } from "@/components/ui/Chip";
import { Stars } from "@/components/ui/Stars";
import { home } from "@/content/home";
import { ratingLabel, reviews, reviewsPage as page } from "@/content/reviews";
import { pageMetadata } from "@/lib/metadata";

const PATH = "/reviews";

export const metadata = pageMetadata({ ...page.meta, path: PATH });

export default function ReviewsPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: page.label, path: PATH }]} />
      <PageHeader label={page.label} heading={page.heading}>
        <div className="flex flex-wrap items-center gap-4">
          <Chip star>{home.reviews.chip}</Chip>
          <a
            href={page.googleLink.href}
            className="link-underline inline-flex min-h-touch items-center text-ui font-semibold"
          >
            {page.googleLink.label}
          </a>
        </div>
      </PageHeader>

      <ul className="container-site grid gap-5 pb-section sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <li key={index}>
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

      <QuoteCta />
    </>
  );
}
