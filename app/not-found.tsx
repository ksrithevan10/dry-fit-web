import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.notFound.title,
  robots: { index: false },
};

export default function NotFound() {
  const copy = site.notFound;
  return (
    <div className="container-site flex flex-col gap-6 py-section">
      <SectionLabel>{copy.label}</SectionLabel>
      <h1 className="font-heading text-display-l">{copy.heading}</h1>
      <p className="max-w-140 text-lg text-muted">{copy.body}</p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={copy.home.href} variant="light">
          {copy.home.label}
        </ButtonLink>
        <ButtonLink href={copy.quote.href}>{copy.quote.label}</ButtonLink>
      </div>
    </div>
  );
}
