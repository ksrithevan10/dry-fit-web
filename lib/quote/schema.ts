import { z } from "zod";
import { quoteForm } from "@/content/quote";
import { isBlobUrl, MAX_FILES } from "./files";
import { isValidPostcode, normalisePostcode } from "./postcode";

const { errors, groups, timingOptions } = quoteForm;

const values = (options: ReadonlyArray<{ value: string }>) =>
  options.map((option) => option.value) as [string, ...string[]];

/** UK phone: 0 or +44 followed by 9–10 more digits. */
const PHONE = /^(?:\+44|0)\d{9,10}$/;

export const quoteSchema = z.object({
  name: z.string().trim().min(1, errors.name).max(100, errors.name),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/[\s()-]/g, ""))
    .refine((value) => PHONE.test(value), errors.phone),
  email: z.string().trim().max(200, errors.email).pipe(z.email(errors.email)),
  postcode: z
    .string()
    .trim()
    .refine(isValidPostcode, errors.postcode)
    .transform(normalisePostcode),
  source: z.enum(values(groups.source.options), errors.option),
  units: z.enum(values(groups.units.options), errors.option),
  worktop: z.enum(values(groups.worktop.options), errors.option),
  timing: z.enum(values(timingOptions), errors.timing),
  notes: z.string().trim().max(2000).optional().default(""),
  planUrls: z
    .array(z.string().refine(isBlobUrl))
    .max(MAX_FILES, errors.fileCount),
  planNames: z.array(z.string().max(200)).max(MAX_FILES, errors.fileCount),
  consent: z.literal("on", errors.consent),
});

export type QuoteInput = z.output<typeof quoteSchema>;
export type QuoteField = keyof z.input<typeof quoteSchema>;

/** Reads the form into the shape the schema expects. */
export function readQuoteForm(formData: FormData) {
  const text = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };
  const list = (key: string) =>
    formData
      .getAll(key)
      .filter(
        (value): value is string => typeof value === "string" && value !== "",
      );

  return {
    name: text("name"),
    phone: text("phone"),
    email: text("email"),
    postcode: text("postcode"),
    source: text("source"),
    units: text("units"),
    worktop: text("worktop"),
    timing: text("timing"),
    notes: text("notes"),
    planUrls: list("planUrl"),
    planNames: list("planName"),
    consent: text("consent"),
  };
}
