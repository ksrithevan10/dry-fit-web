import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { quoteThanks as page } from "@/content/quote";

export const metadata: Metadata = {
  ...page.meta,
  robots: { index: false },
};

export default function QuoteThanksPage() {
  return (
    <div className="container-site flex flex-col gap-6 py-section">
      <SectionLabel>{page.label}</SectionLabel>
      <h1 className="font-heading text-display-l">{page.heading}</h1>
      <p className="max-w-140 text-lg text-muted">{page.body}</p>
      <p className="max-w-140 text-lg text-muted">{page.responseTime}</p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={page.home.href} variant="light">
          {page.home.label}
        </ButtonLink>
        <ButtonLink href={page.whatsapp.href}>{page.whatsapp.label}</ButtonLink>
      </div>
    </div>
  );
}
