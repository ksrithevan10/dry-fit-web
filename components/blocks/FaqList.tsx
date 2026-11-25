import type { Faq } from "@/content/faqs";

/**
 * Questions and answers as native <details> disclosures: keyboard and screen
 * reader friendly with no JavaScript. Add FAQPage JSON-LD on the page that
 * owns the questions (see lib/schema.ts).
 */
export function FaqList({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <div className="border-b border-line">
      {faqs.map((faq) => (
        <details key={faq.id} className="group border-t border-line">
          <summary className="flex min-h-touch cursor-pointer list-none items-center justify-between gap-6 py-6 font-heading text-heading-m [&::-webkit-details-marker]:hidden">
            <span>{faq.question}</span>
            <span
              aria-hidden="true"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-pill bg-card transition-transform duration-500 ease-out-expo group-open:rotate-45"
            >
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path
                  d="M7 1v12M1 7h12"
                  className="stroke-current"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>
          <p className="max-w-170 pb-7 text-lead text-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
