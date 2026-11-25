/**
 * /dry-fitting and the four service pages under it.
 * Facts come from the brief only; [placeholders] are listed in CONTENT_TODO.md.
 */

import { weFit, yourTrades } from "./scope";
import { services, type Service } from "./services";

export const dryFittingPage = {
  meta: {
    title: "What's included in a kitchen dry fit",
    description:
      "What our kitchen dry fit includes, what your own trades do, how a fit runs from free survey to handover, and answers to common questions.",
  },
  label: "What's included",
  heading: "What's included in a kitchen dry fit.",
  intro:
    "Dry fitting is the joinery side of a kitchen install. We fit it all, then your plumber, gas engineer and electrician connect it.",
  weFit,
  yourTrades,
  process: {
    label: "How a fit runs",
    heading: "From survey to handover.",
    steps: [
      {
        title: "Survey",
        body: "Send us the plan from your showroom, then we visit for a free survey and go through it with you.",
      },
      {
        title: "Fixed price",
        body: "We confirm one fixed price for the whole dry fit. No day rates and no surprises.",
      },
      {
        title: "Fit",
        body: "We fit your units, doors, drawers, panels and worktops level, square and true. A typical fit takes [X–Y] days.",
      },
      {
        title: "Handover",
        body: "We finish with final adjustment and alignment, ready for your plumber, gas engineer and electrician to connect it.",
      },
    ],
  },
  services: {
    label: "What we fit",
    heading: "Our dry-fitting services.",
  },
  faq: {
    label: "Questions",
    heading: "Kitchen dry fitting, answered.",
  },
};

export type ServicePageContent = {
  service: Service;
  meta: { title: string; description: string };
  intro: string;
  included: { title: string; items: string[] };
  notIncluded?: { title: string; items: string[] };
  /** Ids from content/faqs.ts. */
  faqIds: string[];
};

function service(slug: string): Service {
  const found = services.find((item) => item.slug === slug);
  if (!found) throw new Error(`Unknown service: ${slug}`);
  return found;
}

export const servicePages: ServicePageContent[] = [
  {
    service: service("units"),
    meta: {
      title: "Kitchen unit and carcass fitting",
      description:
        "Base, wall and tall kitchen units fitted level, square and true by specialist dry fitters in Harrow and North West London, for one fixed price.",
    },
    intro:
      "Base, wall and tall units are the frame of your kitchen. We fit them level, square and true, so the doors line up, the worktops sit flat and your trades can connect everything afterwards.",
    included: {
      title: "Included",
      items: [
        "Base, wall and tall units",
        "Integrated appliance housings [confirm]",
        "Final adjustment and alignment",
      ],
    },
    faqIds: ["what-is", "how-long", "fixed-price"],
  },
  {
    service: service("doors-drawers"),
    meta: {
      title: "Kitchen door, drawer and handle fitting",
      description:
        "Kitchen doors, drawers and handles fitted and adjusted by specialist dry fitters in Harrow and North West London, for one fixed price.",
    },
    intro:
      "Doors, drawers and handles are the parts of your kitchen you use every day. We fit and adjust them so they line up and work as they should.",
    included: {
      title: "Included",
      items: ["Doors, drawers and handles", "Final adjustment and alignment"],
    },
    faqIds: ["what-is", "showroom-or-online", "fixed-price"],
  },
  {
    service: service("worktops"),
    meta: {
      title: "Laminate and solid wood worktop fitting",
      description:
        "Laminate and solid wood kitchen worktops fitted by specialist dry fitters in Harrow and North West London, for one fixed price.",
    },
    intro:
      "We fit laminate and solid wood worktops as part of your dry fit. Stone worktops are templated through your stone supplier.",
    included: {
      title: "Included",
      items: ["Laminate worktops", "Solid wood worktops"],
    },
    notIncluded: {
      title: "Done by others",
      items: ["Stone worktop templating"],
    },
    faqIds: ["not-included", "how-long", "fixed-price"],
  },
  {
    service: service("panels-plinths"),
    meta: {
      title: "Kitchen panel, plinth and cornice fitting",
      description:
        "End panels, plinths and cornice fitted by specialist kitchen dry fitters in Harrow and North West London, for one fixed price.",
    },
    intro:
      "End panels, plinths and cornice are the finishing pieces that make it look like a kitchen. We fit them as part of your dry fit, with final adjustment and alignment.",
    included: {
      title: "Included",
      items: [
        "End panels, plinths and cornice",
        "Final adjustment and alignment",
      ],
    },
    faqIds: ["what-is", "not-included", "fixed-price"],
  },
];

export const servicePageLabels = {
  label: "What we fit",
  faqHeading: "Common questions.",
  otherServices: "Other services",
};
