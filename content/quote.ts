/**
 * /quote, /quote/thanks and the quote emails.
 * The kitchen options reuse the homepage "Get a price" groups so the URL
 * parameters from the homepage prefill this form.
 */

import { home } from "./home";
import { site } from "./site";

const [sourceGroup, unitsGroup, worktopGroup] = home.priceBuilder.groups;

export const quoteForm = {
  meta: {
    title: "Get a fixed quote",
    description:
      "Send us your kitchen plan and a few details. We'll arrange a free survey and confirm one fixed price for your kitchen dry fit.",
  },
  label: "Free quote",
  heading: "Get my fixed quote.",
  intro:
    "Send us the plan from your showroom and we'll confirm one fixed price after a free survey.",

  sections: {
    you: "Your details",
    kitchen: "Your kitchen",
    plan: "Your kitchen plan",
  },

  fields: {
    name: { label: "Name", autoComplete: "name" },
    phone: { label: "Phone", autoComplete: "tel" },
    email: { label: "Email", autoComplete: "email" },
    postcode: { label: "Postcode", autoComplete: "postal-code" },
    timing: { label: "Preferred timing", placeholder: "Choose one" },
    notes: {
      label: "Notes",
      hint: "Anything we should know, such as access, parking or when you're getting the kitchen delivered.",
    },
    plan: {
      label: "Upload your retailer plan (PDF or photo)",
      hint: "PDF, JPG, PNG or HEIC. Up to 5 files, 20MB each.",
      remove: "Remove",
      uploading: "Uploading…",
    },
    consent: {
      before:
        "I agree to Dry-Fit using these details to reply to my enquiry, as set out in the ",
      link: { label: "privacy policy", href: "/privacy" },
      after: ".",
    },
  },

  /** Option groups shared with the homepage. */
  groups: {
    source: sourceGroup,
    units: unitsGroup,
    worktop: worktopGroup,
  },

  timingOptions: [
    { value: "asap", label: "As soon as possible" },
    { value: "1-month", label: "Within a month" },
    { value: "1-3-months", label: "In 1–3 months" },
    { value: "3-plus-months", label: "In more than 3 months" },
    { value: "not-sure", label: "Not sure yet" },
  ],

  /**
   * Postcode areas we cover, as outward-code prefixes. "HA" is derived from
   * the ten areas in site.ts, which are all HA postcodes.
   * [Confirm and extend, e.g. specific NW or UB districts.]
   */
  coveredPostcodePrefixes: ["HA"],
  outsideArea:
    "We mainly cover Harrow and nearby areas — send your details anyway and we'll let you know.",

  submit: "Send my quote request",
  submitting: "Sending…",

  errors: {
    summary: "Please check the highlighted fields.",
    name: "Enter your name.",
    phone: "Enter a UK phone number.",
    email: "Enter an email address, like name@example.com.",
    postcode: "Enter a UK postcode, like HA1 1AA.",
    option: "Choose an option.",
    timing: "Choose when you'd like the fit.",
    consent: "Tick the box so we can reply to you.",
    fileType: "Upload a PDF, JPG, PNG or HEIC file.",
    fileSize: "Each file must be 20MB or smaller.",
    fileCount: "You can upload up to 5 files.",
    upload: "That file didn't upload. Try again, or send it later by email.",
    spam: "We couldn't confirm you're not a robot. Please try again.",
    rateLimit: "Too many requests. Please wait a few minutes and try again.",
    server: `Something went wrong sending your request. Please try again, or call us on ${site.phone.display}.`,
  },
};

export const quoteThanks = {
  meta: {
    title: "Thanks for your quote request",
    description: "We've got your kitchen details and will be in touch.",
  },
  label: "Quote request sent",
  heading: "Thanks, we've got your details.",
  body: "We'll look at your kitchen plan and be in touch to arrange a free survey. We've sent a confirmation to your email.",
  responseTime: "We usually reply within [response time].",
  home: { label: "Back to the homepage", href: "/" },
  whatsapp: { label: "WhatsApp us", href: site.whatsappHref },
};

/** Emails sent on submit. {name} is replaced with the customer's name. */
export const quoteEmails = {
  lead: {
    subject: "New quote request from {name}",
  },
  confirmation: {
    subject: "We've got your kitchen details",
    body: [
      "Hi {name},",
      "Thanks for asking Dry-Fit for a quote. We've got your details and kitchen plan, and we'll be in touch to arrange a free survey.",
      `If you need us sooner, call ${site.phone.display} (${site.hours.short}).`,
      "Dry-Fit",
    ],
  },
};
