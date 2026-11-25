/** /contact. All details come from site.ts. */

import { site } from "./site";

export const contactPage = {
  meta: {
    title: "Contact",
    description:
      "Call, WhatsApp or email Dry-Fit, kitchen dry fitters in Harrow and North West London, or send us your kitchen plan for a fixed quote.",
  },
  label: "Contact",
  heading: "Talk to us about your kitchen.",
  intro:
    "For a fixed price, send us your kitchen plan through the quote form. For anything else, call, WhatsApp or email us.",
  methods: [
    {
      label: "Phone",
      value: site.phone.display,
      href: `tel:${site.phone.href}`,
      note: site.hours.full,
    },
    {
      label: "WhatsApp",
      value: "WhatsApp us",
      href: site.whatsappHref,
      note: "",
    },
    {
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      note: "",
    },
  ],
  address: {
    label: "Address",
    lines: [
      site.address.street,
      `${site.address.locality} ${site.address.postcode}`,
    ],
  },
  area: {
    label: "Where we fit",
    value: site.serviceRadius,
  },
  quoteCta: { label: "Get my fixed quote", href: "/quote" },
};
