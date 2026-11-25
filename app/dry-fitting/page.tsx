import {
  Breadcrumbs,
  FaqList,
  PageHeader,
  QuoteCta,
  Section,
  ServiceLinks,
  StepList,
} from "@/components/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { CheckList } from "@/components/ui/CheckList";
import { dryFittingPage as page } from "@/content/dry-fitting";
import { faqs } from "@/content/faqs";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { faqSchema, serviceSchema } from "@/lib/schema";

const PATH = "/dry-fitting";

export const metadata = pageMetadata({ ...page.meta, path: PATH });

export default function DryFittingPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: page.label, path: PATH }]} />
      <PageHeader
        label={page.label}
        heading={page.heading}
        intro={page.intro}
      />

      <div className="container-site flex flex-wrap gap-5 pb-section">
        <Card className="grow basis-80 gap-4.5">
          <h2 className="font-heading text-heading-s">{page.weFit.title}</h2>
          <CheckList items={page.weFit.items} />
        </Card>
        <Card tone="alt" className="grow basis-80 gap-4.5">
          <h2 className="font-heading text-heading-s">
            {page.yourTrades.title}
          </h2>
          <CheckList items={page.yourTrades.items} variant="dash" />
        </Card>
      </div>

      <Section
        id="process"
        label={page.process.label}
        heading={page.process.heading}
      >
        <StepList steps={page.process.steps} />
      </Section>

      <Section
        id="services"
        label={page.services.label}
        heading={page.services.heading}
      >
        <ServiceLinks services={services} />
      </Section>

      <Section id="faq" label={page.faq.label} heading={page.faq.heading}>
        <FaqList faqs={faqs} />
      </Section>

      <QuoteCta />

      <JsonLd
        data={[
          serviceSchema({
            name: page.meta.title,
            description: page.meta.description,
            path: PATH,
          }),
          faqSchema(faqs),
        ]}
      />
    </>
  );
}
