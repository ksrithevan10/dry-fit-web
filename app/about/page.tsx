import {
  Breadcrumbs,
  PageHeader,
  QuoteCta,
  Section,
} from "@/components/blocks";
import { WhyCards } from "@/components/sections";
import { Card } from "@/components/ui/Card";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { aboutPage as page } from "@/content/about";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/metadata";

const PATH = "/about";

export const metadata = pageMetadata({ ...page.meta, path: PATH });

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: page.label, path: PATH }]} />
      <PageHeader
        label={page.label}
        heading={page.heading}
        intro={page.intro}
      />

      <Section id="story" heading={page.story.heading}>
        <div className="flex max-w-170 flex-col gap-4">
          {page.story.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lead text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <WhyCards {...home.why} />

      <Section id="team" heading={page.foundersHeading}>
        <ul className="flex flex-wrap gap-5">
          {page.founders.map((founder, index) => (
            <Card as="li" key={index} className="grow basis-75 reveal gap-2">
              {/* Future: founder portrait. */}
              <ImageSlot
                name={`about-founder-${index + 1}`}
                brief="Portrait of the founder"
                aspect="4/5"
              />
              <h3 className="font-heading text-heading-m">{founder.name}</h3>
              <p className="type-label text-muted">{founder.role}</p>
              <p className="text-base text-muted">{founder.bio}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <QuoteCta />
    </>
  );
}
