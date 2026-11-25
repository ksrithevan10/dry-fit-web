import { Breadcrumbs, PageHeader } from "@/components/blocks";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { contactPage as page } from "@/content/contact";
import { pageMetadata } from "@/lib/metadata";

const PATH = "/contact";

export const metadata = pageMetadata({ ...page.meta, path: PATH });

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: page.label, path: PATH }]} />
      <PageHeader label={page.label} heading={page.heading} intro={page.intro}>
        <div>
          <ButtonLink href={page.quoteCta.href}>
            {page.quoteCta.label}
          </ButtonLink>
        </div>
      </PageHeader>

      <div className="container-site grid gap-5 pb-section sm:grid-cols-2 lg:grid-cols-3">
        {page.methods.map((method) => (
          <Card key={method.label} className="gap-3">
            <SectionLabel as="h2" tone="muted">
              {method.label}
            </SectionLabel>
            <a
              href={method.href}
              className="link-underline inline-flex min-h-touch items-center font-heading text-heading-m break-all"
            >
              {method.value}
            </a>
            {method.note && (
              <p className="text-base text-muted">{method.note}</p>
            )}
          </Card>
        ))}
        <Card className="gap-3">
          <SectionLabel as="h2" tone="muted">
            {page.address.label}
          </SectionLabel>
          <address className="text-lead not-italic">
            {page.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </Card>
        <Card className="gap-3">
          <SectionLabel as="h2" tone="muted">
            {page.area.label}
          </SectionLabel>
          <p className="font-heading text-heading-m">{page.area.value}</p>
        </Card>
      </div>
    </>
  );
}
