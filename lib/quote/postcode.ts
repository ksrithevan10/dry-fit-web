/** UK postcode helpers. No dependencies, so the browser can use them too. */

import { quoteForm } from "@/content/quote";

/** UK postcode, with or without the space. */
export const POSTCODE = /^(GIR ?0AA|[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i;

/** "ha11aa" → "HA1 1AA". */
export function normalisePostcode(value: string): string {
  const compact = value.replace(/\s+/g, "").toUpperCase();
  return compact.length > 3
    ? `${compact.slice(0, -3)} ${compact.slice(-3)}`
    : compact;
}

export function isValidPostcode(value: string): boolean {
  return POSTCODE.test(normalisePostcode(value));
}

/** True when the postcode starts with one of the covered prefixes. */
export function isInServiceArea(postcode: string): boolean {
  const outward = normalisePostcode(postcode).split(" ")[0] ?? "";
  const area = outward.match(/^[A-Z]+/)?.[0] ?? "";
  return quoteForm.coveredPostcodePrefixes.some(
    (prefix) => area === prefix || outward === prefix,
  );
}
