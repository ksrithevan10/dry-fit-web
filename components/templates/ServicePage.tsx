import {
  Breadcrumbs,
  FaqList,
  PageHeader,
  QuoteCta,
  Section,
  ServiceLinks,
} from "@/components/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { CheckList } from "@/components/ui/CheckList";
import {
  dryFittingPage,
  servicePageLabels,
  type ServicePageContent,
} from "@/content/dry-fitting";
import { faqsById } from "@/content/faqs";
import { services } from "@/content/services";
import { faqSchema, serviceSchema } from "@/lib/schema";

/** Template for /dry-fitting/<service>. Content lives in content/dry-fitting.ts. */
export function ServicePage({ content }: { content: ServicePageContent }) {
  const { service, meta, intro, included, notIncluded, faqIds } = content;
  const related = faqsById(faqIds);
  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: dryFittingPage.label, path: "/dry-fitting" },
          { name: service.title, path: service.href },
        ]}
      />
      <PageHeader
        label={servicePageLabels.label}
        heading={service.title}
        intro={intro}
      />

      <div className="container-site flex flex-wrap gap-5 pb-section">
        <Card className="grow basis-80 reveal gap-4.5">
          <h2 className="font-heading text-heading-s">{included.title}</h2>
          <CheckList items={included.items} />
        </Card>
        {notIncluded && (
          <Card tone="alt" className="grow basis-80 reveal gap-4.5">
            <h2 className="font-heading text-heading-s">{notIncluded.title}</h2>
            <CheckList items={notIncluded.items} variant="dash" />
          </Card>
        )}
      </div>

      <Section id="faq" heading={servicePageLabels.faqHeading}>
        <FaqList faqs={related} />
      </Section>

      <Section id="other-services" heading={servicePageLabels.otherServices}>
        <ServiceLinks services={others} />
      </Section>

      <QuoteCta />

      <JsonLd
        data={[
          serviceSchema({
            name: meta.title,
            description: meta.description,
            path: service.href,
          }),
          faqSchema(related),
        ]}
      />
    </>
  );
}

export function servicePageContent(
  slug: string,
  pages: readonly ServicePageContent[],
) {
  const found = pages.find((page) => page.service.slug === slug);
  if (!found) throw new Error(`No service page content for: ${slug}`);
  return found;
}
