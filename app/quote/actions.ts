"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { quoteForm } from "@/content/quote";
import { sendQuoteEmails } from "@/lib/quote/email";
import { rateLimit } from "@/lib/quote/rate-limit";
import { isInServiceArea } from "@/lib/quote/postcode";
import {
  quoteSchema,
  readQuoteForm,
  type QuoteField,
} from "@/lib/quote/schema";
import { verifyTurnstile } from "@/lib/quote/turnstile";

export type QuoteState = {
  /** Message shown above the form. */
  message?: string;
  fieldErrors?: Partial<Record<QuoteField, string>>;
  /** What the visitor typed, so the form keeps it after an error. */
  values?: Record<string, string>;
};

/**
 * Handles the quote form: rate limit, spam check, validation, emails, then
 * redirect to /quote/thanks. Secrets stay on the server.
 */
export async function submitQuote(
  _previous: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  const { errors } = quoteForm;
  const raw = readQuoteForm(formData);
  const { planUrls, planNames, ...rest } = raw;
  void planUrls;
  void planNames;
  const values = rest as Record<string, string>;

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (!rateLimit(ip).ok) {
    return { message: errors.rateLimit, values };
  }

  const token = formData.get("cf-turnstile-response");
  if (!(await verifyTurnstile(typeof token === "string" ? token : "", ip))) {
    return { message: errors.spam, values };
  }

  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: QuoteState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as QuoteField | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { message: errors.summary, fieldErrors, values };
  }

  try {
    await sendQuoteEmails(parsed.data, isInServiceArea(parsed.data.postcode));
  } catch (error) {
    console.error("[quote] Sending failed:", error);
    return { message: errors.server, values };
  }

  redirect("/quote/thanks");
}
