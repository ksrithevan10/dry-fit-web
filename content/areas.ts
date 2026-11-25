/**
 * /areas and the /kitchen-fitter-[area] pages.
 *
 * Only publish an area page with genuinely local content. Do not copy one
 * area's page and swap the name: thin find-and-replace pages hurt search
 * rankings. The nine areas still to write are listed in CONTENT_TODO.md.
 *
 * To publish a new area:
 * 1. Add its content below.
 * 2. Set `published: true` for it in content/site.ts.
 * 3. Copy app/kitchen-fitter-harrow/page.tsx to app/kitchen-fitter-<slug>/
 *    and change the slug.
 */

import { site } from "./site";

export const areasPage = {
  meta: {
    title: "Areas we cover",
    description:
      "Kitchen dry fitting across Harrow and North West London, including Pinner, Stanmore, Wembley, Edgware, Kenton, Hatch End, Rayners Lane, Northwood and Ruislip.",
  },
  label: "Areas",
  heading: "Kitchen dry fitting across Harrow & North West London.",
  intro: `We're based in Harrow and fit kitchens within ${site.serviceRadius.replace("Harrow + ", "")} of it.`,
  listHeading: "Where we fit",
  postcodes: {
    heading: "Postcodes we cover",
    body: "[Postcode districts we cover, e.g. HA1–HA9]",
  },
  outsideArea:
    "We mainly cover Harrow and nearby areas — send your details anyway and we'll let you know.",
};

export type AreaContent = {
  slug: string;
  name: string;
  meta: { title: string; description: string };
  heading: string;
  intro: string;
  /** Genuinely local paragraphs: housing, typical kitchens, local knowledge. */
  local: { heading: string; paragraphs: string[] };
  postcodes: string;
  /** Ids from content/faqs.ts. */
  faqIds: string[];
};

export const areaPages: AreaContent[] = [
  {
    slug: "harrow",
    name: "Harrow",
    meta: {
      title: "Kitchen dry fitter in Harrow",
      description:
        "Harrow-based kitchen dry fitters. Units, doors, panels and worktops fitted level, square and true, for one fixed price agreed after a free survey.",
    },
    heading: "Kitchen dry fitter in Harrow.",
    intro:
      "Dry-Fit is based in Harrow. We dry fit kitchens from high-street showrooms, trade suppliers and online retailers, for one fixed price agreed after a free survey.",
    local: {
      heading: "Fitting kitchens in Harrow.",
      paragraphs: [
        "[Local content: the kinds of homes and kitchens you fit in Harrow, written from real jobs.]",
        "[Local content: a recent Harrow fit, with the area, number of units and how long it took.]",
      ],
    },
    postcodes: "[Harrow postcode districts we cover]",
    faqIds: ["what-is", "how-long", "fixed-price"],
  },
];

export const areaPageLabels = {
  label: "Areas",
  whatWeFit: "What we fit",
  postcodes: "Postcodes",
  nearby: "Nearby areas",
  faqHeading: "Common questions.",
};

export function areaContent(slug: string): AreaContent {
  const found = areaPages.find((area) => area.slug === slug);
  if (!found) throw new Error(`No content for area: ${slug}`);
  return found;
}
