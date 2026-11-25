/**
 * Homepage copy, in page order. Each block is passed to its section component
 * in components/sections. Business details come from site.ts.
 *
 * Anything in [square brackets] is a placeholder listed in CONTENT_TODO.md.
 */

import { reviews } from "./reviews";
import { weFit, yourTrades } from "./scope";
import { services } from "./services";
import { site } from "./site";

export type Option = {
  /** Value sent to /quote as a URL parameter. */
  value: string;
  label: string;
  /** Words used for this option in the live summary sentence. */
  summary: string;
};

export type OptionGroup = {
  /** URL parameter name for /quote. */
  name: string;
  legend: string;
  options: Option[];
  /** Value selected when the page loads. */
  defaultValue: string;
};

const sourceGroup: OptionGroup = {
  name: "source",
  legend: "Where is your kitchen from?",
  defaultValue: "showroom",
  options: [
    {
      value: "showroom",
      label: "High-street showroom",
      summary: "from a high-street showroom",
    },
    {
      value: "trade",
      label: "Trade supplier",
      summary: "from a trade supplier",
    },
    { value: "online", label: "Online / flat-pack", summary: "bought online" },
    { value: "unsure", label: "Not sure yet", summary: "" },
  ],
};

const unitsGroup: OptionGroup = {
  name: "units",
  legend: "Roughly how many units?",
  defaultValue: "9-14",
  options: [
    { value: "up-to-8", label: "Up to 8", summary: "up to 8" },
    { value: "9-14", label: "9–14", summary: "9–14" },
    { value: "15-20", label: "15–20", summary: "15–20" },
    { value: "20-plus", label: "20+", summary: "20+" },
  ],
};

const worktopGroup: OptionGroup = {
  name: "worktop",
  legend: "Worktop",
  defaultValue: "laminate",
  options: [
    { value: "laminate", label: "Laminate", summary: "laminate" },
    { value: "solid-wood", label: "Solid wood", summary: "solid wood" },
    { value: "stone", label: "Stone (by supplier)", summary: "stone" },
  ],
};

export const home = {
  hero: {
    label: "Kitchen dry fitting · Harrow",
    headingLines: ["Bought your kitchen?", "We'll dry fit it."],
    body: "Specialist kitchen dry fitters. Units, doors, panels and worktops fitted level, square and true, for one fixed price. Your plumber and electrician do the rest.",
    primaryCta: { label: "Get my fixed quote", href: "/quote" },
    secondaryCta: { label: "Upload my kitchen plan", href: "/quote#plan" },
    chips: [
      { label: `${site.googleRating} on Google`, star: true },
      { label: "Fully insured [confirm]", star: false },
      { label: "[X]-year workmanship guarantee", star: false },
    ],
  },

  brandStrip: {
    label: "We fit kitchens from",
    disclaimer: "Independent installers — not affiliated with any retailer",
    brands: [
      "Wickes",
      "B&Q",
      "Wren Kitchens",
      "Howdens",
      "IKEA",
      "Magnet",
      "And more",
    ],
  },

  priceBuilder: {
    label: "(01) Get a price",
    heading: "Your fit, priced in three taps.",
    groups: [sourceGroup, unitsGroup, worktopGroup],
    summaryLabel: "Your kitchen",
    /**
     * Live summary sentence. {source}, {units} and {worktop} are replaced with
     * each selected option's `summary` words, e.g. "A kitchen from a
     * high-street showroom, 9–14 units, laminate worktop."
     */
    summaryTemplate: "A kitchen {source}, {units} units, {worktop} worktop.",
    typicalFitLabel: "Typical fit",
    /** Typical fit duration for each units option. */
    typicalFit: {
      "up-to-8": "[X–Y] days",
      "9-14": "[X–Y] days",
      "15-20": "[X–Y] days",
      "20-plus": "[X–Y] days",
    } as Record<string, string>,
    body: "Send us the plan from your showroom and we'll confirm one fixed price after a free survey.",
    uploadLabel: "Upload your retailer plan (PDF or photo)",
    uploadHref: "/quote",
    uploadAnchor: "plan",
    submit: { label: "Get my fixed quote", href: "/quote" },
  },

  why: {
    heading: "Why Dry-Fit",
    cards: [
      {
        number: "01",
        title: "Dry fitting only",
        body: "We don't juggle plumbing, tiling and building work. We do one job: fitting your kitchen, properly.",
      },
      {
        number: "02",
        title: "We know these kitchens",
        body: "We've sold high-street kitchens for years. We know the ranges, the carcasses and the fixings before we arrive.",
      },
      {
        number: "03",
        title: "One fixed price",
        body: "Agreed after a free survey, from your showroom plan. No day rates and no surprises.",
      },
    ],
  },

  services: {
    label: "(02) What we fit",
    allLink: { label: "All services →", href: "/dry-fitting" },
    items: services,
  },

  whatIs: {
    label: "(03) What is dry fitting?",
    heading: "Everything that makes it a kitchen.",
    body: "Dry fitting is the joinery side of a kitchen install. We fit it all, then your plumber, gas engineer and electrician connect it.",
    weFit,
    yourTrades,
  },

  reviews: {
    label: "(04) Reviews",
    heading: "What our customers say.",
    chip: `${site.googleRating} from ${site.googleReviewCount} Google reviews`,
    items: reviews,
  },

  areas: {
    label: "(05) Where we fit",
    radius: site.serviceRadius,
    items: site.areas,
  },

  closing: {
    heading: "Your kitchen, dry fitted properly.",
    primaryCta: { label: "Get my fixed quote", href: "/quote" },
    secondaryCta: { label: "WhatsApp us", href: site.whatsappHref },
  },

  /** Labels for marquee pause buttons (screen readers and tooltips). */
  marquee: {
    pause: "Pause scrolling",
    play: "Play scrolling",
  },
} as const;
