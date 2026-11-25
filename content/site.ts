/**
 * Business details, navigation and shared copy.
 *
 * This is the only place business facts live: name, phone, email, address,
 * hours and areas. Every page, component and JSON-LD block reads from here.
 *
 * Anything in [square brackets] is a placeholder that still needs a real value.
 * Each one is listed in CONTENT_TODO.md.
 */

export type NavLink = { label: string; href: string };

export type Area = {
  name: string;
  slug: string;
  /**
   * Only areas with genuinely local content are published. Unpublished areas
   * link to /areas until their page is written (see CONTENT_TODO.md).
   */
  published: boolean;
};

const phone = {
  /** As shown on the page. */
  display: "[phone]",
  /** For tel: links, in international format, e.g. +442012345678. */
  href: "[phone]",
};

const hours = {
  /** Short form used in the top bar. */
  short: "Mon–Sat",
  /** Full opening hours, e.g. "Monday to Saturday, 8am–6pm". */
  full: "[Opening hours]",
};

const address = {
  street: "[Street address]",
  locality: "Harrow",
  postcode: "HA[X] [XXX]",
  country: "GB",
};

const email = "[Email]@dry-fit.com";
const whatsappHref = "https://wa.me/[number]";
const companyNumber = "[Company no.]";

export const site = {
  name: "Dry-Fit",
  /** Wordmark shown in the header and footer. */
  logoText: "Dry—Fit",
  phone,
  hours,
  address,
  email,
  companyNumber,
  whatsappHref,
  googleRating: "[4.9]",
  googleReviewCount: "[X]",
  serviceRadius: "Harrow + [X] miles",

  areas: [
    { name: "Harrow", slug: "harrow", published: true },
    { name: "Pinner", slug: "pinner", published: false },
    { name: "Stanmore", slug: "stanmore", published: false },
    { name: "Wembley", slug: "wembley", published: false },
    { name: "Edgware", slug: "edgware", published: false },
    { name: "Kenton", slug: "kenton", published: false },
    { name: "Hatch End", slug: "hatch-end", published: false },
    { name: "Rayners Lane", slug: "rayners-lane", published: false },
    { name: "Northwood", slug: "northwood", published: false },
    { name: "Ruislip", slug: "ruislip", published: false },
  ] satisfies Area[],

  topBar: {
    message:
      "Fixed-price kitchen dry fitting across Harrow & North West London",
    call: `Call ${phone.display} · ${hours.short}`,
  },

  nav: {
    primary: [
      { label: "What's included", href: "/dry-fitting" },
      { label: "Kitchens we fit", href: "/kitchens-we-fit" },
      { label: "Reviews", href: "/reviews" },
      { label: "Areas", href: "/areas" },
    ] satisfies NavLink[],
    cta: { label: "Free quote", href: "/quote" } satisfies NavLink,
    footer: [
      { label: "What's included", href: "/dry-fitting" },
      { label: "Kitchens we fit", href: "/kitchens-we-fit" },
      { label: "Reviews", href: "/reviews" },
      { label: "Areas", href: "/areas" },
      { label: "Contact", href: "/contact" },
    ] satisfies NavLink[],
    legal: [
      { label: "About", href: "/about" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ] satisfies NavLink[],
  },

  footer: {
    disclaimer:
      "Dry-Fit is an independent kitchen dry fitter and is not affiliated with, or endorsed by, any kitchen retailer. Brand names are shown only to describe the kitchens we fit; all trademarks belong to their owners.",
    details: `${companyNumber} · ${address.street}, ${address.locality} ${address.postcode} · ${email}`,
  },

  /** Quote call to action shown at the end of inner pages. */
  quoteCta: {
    heading: "Your kitchen, dry fitted properly.",
    body: "Send us the plan from your showroom and we'll confirm one fixed price after a free survey.",
    primary: { label: "Get my fixed quote", href: "/quote" },
    secondary: { label: "WhatsApp us", href: whatsappHref },
  },

  notFound: {
    title: "Page not found",
    label: "404",
    heading: "This page isn't here.",
    body: "The link may be old or mistyped. Try the homepage, or get a fixed quote for your kitchen.",
    home: { label: "Back to the homepage", href: "/" },
    quote: { label: "Get my fixed quote", href: "/quote" },
  },

  /** Interface labels used by the layout. */
  ui: {
    skipLink: "Skip to content",
    homeLink: "Dry-Fit home",
    menuOpen: "Menu",
    menuClose: "Close menu",
    primaryNav: "Primary",
    footerNav: "Footer",
    legalNav: "Legal",
    breadcrumb: "Breadcrumb",
    home: "Home",
  },

  seo: {
    defaultTitle: "Kitchen dry fitting in Harrow & North West London | Dry-Fit",
    titleTemplate: "%s | Dry-Fit",
    defaultDescription:
      "Specialist kitchen dry fitters. Units, doors, panels and worktops fitted level, square and true, for one fixed price. Your plumber and electrician do the rest.",
    locale: "en_GB",
  },
} as const;

/** Where an area name should link: its own page if published, else /areas. */
export function areaHref(area: Area): string {
  return area.published ? `/kitchen-fitter-${area.slug}` : "/areas";
}
