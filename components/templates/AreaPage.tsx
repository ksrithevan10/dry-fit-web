import Link from "next/link";
import {
  Breadcrumbs,
  FaqList,
  PageHeader,
  QuoteCta,
  Section,
  ServiceLinks,
} from "@/components/blocks";
import { WhyCards } from "@/components/sections";
import { JsonLd } from "@/components/seo/JsonLd";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { areaPageLabels, areasPage, type AreaContent } from "@/content/areas";
import { faqsById } from "@/content/faqs";
import { home } from "@/content/home";
import { services } from "@/content/services";
import { areaHref, site } from "@/content/site";
import { faqSchema, serviceSchema } from "@/lib/schema";

/**
 * Template for /kitchen-fitter-<area>. Every area page needs its own genuinely
 * local content in content/areas.ts; see the notes at the top of that file.
 */
export function AreaPage({ area }: { area: AreaContent }) {
  const path = `/kitchen-fitter-${area.slug}`;
  const related = faqsById(area.faqIds);
  const nearby = site.areas.filter((item) => item.slug !== area.slug);

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: areasPage.label, path: "/areas" },
          { name: area.name, path },
        ]}
      />
      <PageHeader
        label={areaPageLabels.label}
        heading={area.heading}
        intro={area.intro}
      />

      <Section id="local" heading={area.local.heading}>
        {/* Future: photo of a kitchen fitted in this area. */}
        <ImageSlot
          name={`area-${area.slug}`}
          brief={`A kitchen we fitted in ${area.name}`}
          aspect="16/9"
        />
        <div className="flex max-w-170 flex-col gap-4">
          {area.local.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lead text-muted">
              {paragraph}
            </p>
          ))}
          <p className="text-lead text-muted">
            <span className="font-semibold text-ink">
              {areaPageLabels.postcodes}:{" "}
            </span>
            {area.postcodes}
          </p>
        </div>
      </Section>

      <Section id="services" heading={areaPageLabels.whatWeFit}>
        <ServiceLinks services={services} />
      </Section>

      <WhyCards {...home.why} />

      <Section id="faq" heading={areaPageLabels.faqHeading}>
        <FaqList faqs={related} />
      </Section>

      <Section id="nearby" heading={areaPageLabels.nearby}>
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {nearby.map((item) => (
            <li key={item.slug}>
              <Link
                href={areaHref(item)}
                className="link-underline inline-flex min-h-touch items-center text-lead font-semibold"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <QuoteCta />

      <JsonLd
        data={[
          serviceSchema({
            name: area.meta.title,
            description: area.meta.description,
            path,
          }),
          faqSchema(related),
        ]}
      />
    </>
  );
}
