/**
 * Frequently asked questions. Answers are 40–60 words, direct and quotable,
 * and use only confirmed facts plus [placeholders].
 *
 * /dry-fitting shows all of them (with FAQPage schema). Service and area
 * pages pick the relevant ones by id.
 */

export type Faq = { id: string; question: string; answer: string };

export const faqs: Faq[] = [
  {
    id: "what-is",
    question: "What is a kitchen dry fitter?",
    answer:
      "A kitchen dry fitter does the joinery side of a kitchen install. We fit the base, wall and tall units, doors, drawers, handles, worktops, end panels, plinths and cornice, and adjust everything so it sits level, square and true. Your plumber, gas engineer and electrician then connect it.",
  },
  {
    id: "how-long",
    question: "How long does a kitchen dry fit take?",
    answer:
      "Most dry fits take [X–Y] days. The time depends on how many units you have, the worktop and the layout, so a kitchen with up to 8 units is quicker than one with 20 or more. We confirm the timing for your kitchen after a free survey, along with one fixed price.",
  },
  {
    id: "showroom-or-online",
    question: "Can you fit a kitchen I bought from a showroom or online?",
    answer:
      "Yes. We fit kitchens from high-street showrooms, trade suppliers and online or flat-pack retailers. We've sold high-street kitchens for years, so we know the ranges, the carcasses and the fixings before we arrive. Send us the plan from your retailer and we'll quote from it.",
  },
  {
    id: "not-included",
    question: "What isn't included?",
    answer:
      "Dry fitting covers the joinery only. Plumbing and sinks, gas and electrics, tiling and splashbacks, and plastering and decorating are done by your own trades. Stone worktop templating is also done by others, through your stone supplier. We fit laminate and solid wood worktops, and everything else that makes it a kitchen.",
  },
  {
    id: "fixed-price",
    question: "How do I get a fixed price?",
    answer:
      "Send us the plan from your showroom or retailer as a PDF or photo using our quote form. We'll arrange a free survey, then confirm one fixed price for the whole dry fit. There are no day rates and no surprises, so you know the cost before we start.",
  },
];

export function faqsById(ids: readonly string[]): Faq[] {
  return ids
    .map((id) => faqs.find((faq) => faq.id === id))
    .filter((faq): faq is Faq => Boolean(faq));
}
