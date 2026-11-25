/**
 * /privacy and /terms. These are structural drafts with [placeholders].
 * They must be reviewed by a legal professional before launch.
 */

import { site } from "./site";

export type LegalSection = { heading: string; paragraphs: string[] };

export const privacyPage = {
  meta: {
    title: "Privacy policy",
    description: "How Dry-Fit collects, uses and protects your personal data.",
  },
  heading: "Privacy policy.",
  updated: "Last updated: [date]",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        `${site.name} ([Company legal name], company number ${site.companyNumber}) is the data controller for personal data collected through this website. Our address is ${site.address.street}, ${site.address.locality} ${site.address.postcode}. You can contact us at ${site.email}.`,
      ],
    },
    {
      heading: "What we collect",
      paragraphs: [
        "When you ask for a quote we collect your name, phone number, email address and postcode, details about your kitchen, your preferred timing, any notes you add and any plans or photos you upload.",
      ],
    },
    {
      heading: "How we use it",
      paragraphs: [
        "We use your details to respond to your enquiry, arrange a survey and give you a quote. [Lawful basis: confirm, e.g. steps taken at your request before entering into a contract.]",
      ],
    },
    {
      heading: "Who we share it with",
      paragraphs: [
        "We use trusted providers to run this website and handle enquiries: Vercel (website hosting and file storage), Resend (email delivery) and Cloudflare Turnstile (spam protection). [Confirm the full list of processors and any international transfers.]",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "[Retention period for enquiries, uploaded plans and customer records.]",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "Under UK data protection law you can ask to see, correct or delete the personal data we hold about you, and object to or restrict how we use it. Email us to make a request.",
        "If you're unhappy with how we handle your data, you can complain to the Information Commissioner's Office (ico.org.uk).",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "[Cookies and similar technologies used on this site, if any.]",
      ],
    },
  ] satisfies LegalSection[],
};

export const termsPage = {
  meta: {
    title: "Terms of use",
    description: "Terms for using the Dry-Fit website.",
  },
  heading: "Terms of use.",
  updated: "Last updated: [date]",
  sections: [
    {
      heading: "About these terms",
      paragraphs: [
        `These terms cover your use of this website, run by ${site.name} ([Company legal name], company number ${site.companyNumber}).`,
      ],
    },
    {
      heading: "Quotes",
      paragraphs: [
        "[How quotes work: e.g. a fixed price is confirmed in writing after a free survey; anything on this website is not an offer.]",
      ],
    },
    {
      heading: "Fitting terms",
      paragraphs: [
        "[Terms that apply to fitting work, or where customers can find them.]",
      ],
    },
    {
      heading: "Brand names",
      paragraphs: [site.footer.disclaimer],
    },
    {
      heading: "Liability",
      paragraphs: [
        "[Limitation of liability wording, to be provided by a legal professional.]",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: ["[Governing law and jurisdiction, e.g. England and Wales.]"],
    },
  ] satisfies LegalSection[],
};
