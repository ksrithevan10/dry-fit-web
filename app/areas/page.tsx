import Link from "next/link";
import {
  Breadcrumbs,
  PageHeader,
  QuoteCta,
  Section,
} from "@/components/blocks";
import { areasPage as page } from "@/content/areas";
import { areaHref, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

const PATH = "/areas";

export const metadata = pageMetadata({ ...page.meta, path: PATH });

export default function AreasPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: page.label, path: PATH }]} />
      <PageHeader
        label={page.label}
        heading={page.heading}
        intro={page.intro}
      />

      <Section id="area-list" heading={page.listHeading}>
        <ul className="grid gap-x-8 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {site.areas.map((area) => (
            <li key={area.slug} className="border-b border-line">
              {area.published ? (
                <Link
                  href={areaHref(area)}
                  className="link-underline flex min-h-touch items-center py-4 font-heading text-heading-m text-primary"
                >
                  {area.name}
                </Link>
              ) : (
                <span className="flex min-h-touch items-center py-4 font-heading text-heading-m">
                  {area.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="postcodes" heading={page.postcodes.heading}>
        <div className="flex max-w-170 flex-col gap-4 text-lead text-muted">
          <p>{page.postcodes.body}</p>
          <p>{page.outsideArea}</p>
        </div>
      </Section>

      <QuoteCta />
    </>
  );
}
