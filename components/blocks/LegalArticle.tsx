import type { LegalSection } from "@/content/legal";

/** Long-form legal text: h2 per section, readable line length. */
export function LegalArticle({
  updated,
  sections,
}: {
  updated: string;
  sections: readonly LegalSection[];
}) {
  return (
    <article className="container-site flex max-w-site flex-col gap-10 pb-section">
      <p className="text-sm text-muted">{updated}</p>
      {sections.map((section) => (
        <section
          key={section.heading}
          className="flex max-w-170 flex-col gap-3"
        >
          <h2 className="font-heading text-heading-m">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base text-muted">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}
