/**
 * Quote emails via Resend. Without RESEND_API_KEY, LEADS_EMAIL or EMAIL_FROM
 * (local development) the submission is logged to the terminal instead.
 */

import { Resend } from "resend";
import { quoteEmails, quoteForm } from "@/content/quote";
import type { QuoteInput } from "./schema";

const labelFor = (
  options: ReadonlyArray<{ value: string; label: string }>,
  value: string,
) => options.find((option) => option.value === value)?.label ?? value;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function leadRows(quote: QuoteInput, inArea: boolean): Array<[string, string]> {
  const { fields, groups, timingOptions } = quoteForm;
  return [
    [fields.name.label, quote.name],
    [fields.phone.label, quote.phone],
    [fields.email.label, quote.email],
    [
      fields.postcode.label,
      `${quote.postcode}${inArea ? "" : " (outside main area)"}`,
    ],
    [groups.source.legend, labelFor(groups.source.options, quote.source)],
    [groups.units.legend, labelFor(groups.units.options, quote.units)],
    [groups.worktop.legend, labelFor(groups.worktop.options, quote.worktop)],
    [fields.timing.label, labelFor(timingOptions, quote.timing)],
    [fields.notes.label, quote.notes || "–"],
  ];
}

function leadEmail(quote: QuoteInput, inArea: boolean) {
  const rows = leadRows(quote, inArea);
  // Names always arrive; links only when Vercel Blob is configured.
  const files = quote.planNames.map((name, index) => ({
    name,
    url: quote.planUrls[index],
  }));

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    files.length ? "Plans:" : "Plans: none uploaded",
    ...files.map(
      (file) =>
        `- ${file.name}${file.url ? `: ${file.url}` : " (not uploaded: storage not configured)"}`,
    ),
  ].join("\n");

  const html = `
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><th align="left" valign="top">${escapeHtml(label)}</th><td>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
        )
        .join("")}
      <tr><th align="left" valign="top">Plans</th><td>${
        files.length
          ? files
              .map((file) =>
                file.url
                  ? `<a href="${escapeHtml(file.url)}">${escapeHtml(file.name)}</a>`
                  : escapeHtml(file.name),
              )
              .join("<br>")
          : "None uploaded"
      }</td></tr>
    </table>`;

  return { text, html };
}

export async function sendQuoteEmails(
  quote: QuoteInput,
  inArea: boolean,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const leadsEmail = process.env.LEADS_EMAIL;
  const from = process.env.EMAIL_FROM;
  const lead = leadEmail(quote, inArea);

  if (!apiKey || !leadsEmail || !from) {
    console.info(
      "[quote] Email is not configured, so the submission is logged instead:\n" +
        lead.text,
    );
    return;
  }

  const resend = new Resend(apiKey);
  const withName = (value: string) => value.replace("{name}", quote.name);

  const leadResult = await resend.emails.send({
    from,
    to: leadsEmail,
    replyTo: quote.email,
    subject: withName(quoteEmails.lead.subject),
    text: lead.text,
    html: lead.html,
  });
  if (leadResult.error)
    throw new Error(`Lead email failed: ${leadResult.error.message}`);

  const confirmation = quoteEmails.confirmation.body.map(withName);
  const confirmationResult = await resend.emails.send({
    from,
    to: quote.email,
    subject: withName(quoteEmails.confirmation.subject),
    text: confirmation.join("\n\n"),
    html: confirmation.map((line) => `<p>${escapeHtml(line)}</p>`).join(""),
  });
  // The lead is already with us, so a failed confirmation is logged, not shown.
  if (confirmationResult.error) {
    console.error(
      "[quote] Confirmation email failed:",
      confirmationResult.error.message,
    );
  }
}
