/** /kitchens-we-fit. Brand names appear only in the "We fit kitchens from" list. */

import { home } from "./home";
import { site } from "./site";

export const kitchensWeFitPage = {
  meta: {
    title: "Kitchens we fit",
    description:
      "We dry fit kitchens from high-street showrooms, trade suppliers and online or flat-pack retailers, and quote one fixed price from your showroom plan.",
  },
  label: "Kitchens we fit",
  heading: "Bought your kitchen? We'll dry fit it.",
  intro:
    "We fit kitchens from high-street showrooms, trade suppliers and online or flat-pack retailers. We've sold high-street kitchens for years, so we know the ranges, the carcasses and the fixings before we arrive.",
  brands: {
    label: home.brandStrip.label,
    note: home.brandStrip.disclaimer,
    items: home.brandStrip.brands,
  },
  quote: {
    label: "How we quote",
    heading: "One fixed price, from your showroom plan.",
    steps: [
      {
        title: "Send your plan",
        body: "Upload the plan from your showroom or retailer as a PDF or photo.",
      },
      {
        title: "Free survey",
        body: "We visit for a free survey and check the plan against your room.",
      },
      {
        title: "One fixed price",
        body: "We confirm one fixed price for the whole dry fit. No day rates and no surprises.",
      },
    ],
  },
  disclaimer: site.footer.disclaimer,
};
