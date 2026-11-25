import {
  Breadcrumbs,
  PageHeader,
  QuoteCta,
  Section,
  StepList,
} from "@/components/blocks";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { kitchensWeFitPage as page } from "@/content/kitchens-we-fit";
import { pageMetadata } from "@/lib/metadata";

const PATH = "/kitchens-we-fit";

export const metadata = pageMetadata({ ...page.meta, path: PATH });

export default function KitchensWeFitPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: page.label, path: PATH }]} />
      <PageHeader
        label={page.label}
        heading={page.heading}
        intro={page.intro}
      />

      <section
        aria-labelledby="brands-heading"
        className="container-site pb-section"
      >
        <div className="flex flex-wrap justify-between gap-3 border-b border-line pb-5">
          <SectionLabel as="h2" id="brands-heading" tone="muted">
            {page.brands.label}
          </SectionLabel>
          <SectionLabel tone="muted">{page.brands.note}</SectionLabel>
        </div>
        <ul className="flex flex-wrap gap-x-10 gap-y-2 pt-6">
          {page.brands.items.map((brand) => (
            <li key={brand} className="font-heading text-marquee">
              {brand}
            </li>
          ))}
        </ul>
      </section>

      <Section
        id="how-we-quote"
        label={page.quote.label}
        heading={page.quote.heading}
      >
        <StepList steps={page.quote.steps} />
      </Section>

      <div className="container-site pb-section">
        <p className="max-w-245 text-xs text-muted">{page.disclaimer}</p>
      </div>

      <QuoteCta />
    </>
  );
}
