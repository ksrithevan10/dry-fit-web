/**
 * JSON-LD builders. All business facts come from content/site.ts.
 * Placeholder values (in [square brackets]) are left out of the structured
 * data so search engines never see them.
 */

import { site } from "@/content/site";
import { siteUrl } from "@/lib/env";

type Json = Record<string, unknown>;

const isPlaceholder = (value: string) => /\[[^\]]*\]/.test(value);

/** Returns the value, or undefined while it is still a placeholder. */
function real(value: string): string | undefined {
  return isPlaceholder(value) ? undefined : value;
}

const absolute = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

export const businessId = `${siteUrl}/#business`;

export function businessSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": businessId,
    name: site.name,
    url: siteUrl,
    description: site.seo.defaultDescription,
    telephone: real(site.phone.href),
    email: real(site.email),
    address: {
      "@type": "PostalAddress",
      streetAddress: real(site.address.street),
      addressLocality: site.address.locality,
      postalCode: real(site.address.postcode),
      addressCountry: site.address.country,
    },
    openingHours: real(site.hours.full),
    areaServed: site.areas.map((area) => ({
      "@type": "Place",
      name: area.name,
    })),
    // aggregateRating is added once the Google rating is real (see CONTENT_TODO.md).
  };
}

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absolute(path),
    serviceType: "Kitchen dry fitting",
    provider: { "@id": businessId },
    areaServed: site.areas.map((area) => ({
      "@type": "Place",
      name: area.name,
    })),
  };
}

export function faqSchema(
  faqs: ReadonlyArray<{ question: string; answer: string }>,
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: readonly Crumb[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}
