"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { OptionGroup } from "@/components/ui/OptionGroup";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { OptionGroup as OptionGroupContent } from "@/content/home";

export type PriceBuilderProps = {
  label: string;
  heading: string;
  /** Option groups. The "units" group also picks the typical fit. */
  groups: readonly OptionGroupContent[];
  summaryLabel: string;
  /** Sentence with {name} slots for each group, see content/home.ts. */
  summaryTemplate: string;
  typicalFitLabel: string;
  typicalFit: Record<string, string>;
  body: string;
  uploadLabel: string;
  uploadHref: string;
  uploadAnchor: string;
  submit: { label: string; href: string };
};

/**
 * "(01) Get a price": three quick choices, a live summary and a link to the
 * quote form with the choices as URL parameters.
 *
 * It is a plain GET form, so without JavaScript the submit button still opens
 * /quote with the selections.
 */
export function PriceBuilder({
  label,
  heading,
  groups,
  summaryLabel,
  summaryTemplate,
  typicalFitLabel,
  typicalFit,
  body,
  uploadLabel,
  uploadHref,
  uploadAnchor,
  submit,
}: PriceBuilderProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(groups.map((group) => [group.name, group.defaultValue])),
  );

  const sentence = groups
    .reduce((text, group) => {
      const selected = group.options.find(
        (option) => option.value === values[group.name],
      );
      return text.replace(`{${group.name}}`, selected?.summary ?? "");
    }, summaryTemplate)
    // Tidy the gap left by an empty slot, e.g. "A kitchen , 9–14 units".
    .replace(/\s+,/g, ",")
    .replace(/\s{2,}/g, " ");

  const unitsValue = values["units"] ?? "";
  const fit = typicalFit[unitsValue] ?? "";
  const params = new URLSearchParams(values).toString();

  return (
    <section
      aria-labelledby="price-heading"
      className="container-site py-section"
    >
      <form action={submit.href} method="get" className="flex flex-wrap gap-12">
        <div className="flex grow-[1.4] basis-130 flex-col gap-9">
          <SectionLabel className="reveal">{label}</SectionLabel>
          <h2 id="price-heading" className="reveal font-heading text-display-l">
            {heading}
          </h2>
          {groups.map((group) => (
            <OptionGroup
              key={group.name}
              name={group.name}
              legend={group.legend}
              options={group.options}
              value={values[group.name] ?? group.defaultValue}
              onChange={(value) =>
                setValues((current) => ({ ...current, [group.name]: value }))
              }
            />
          ))}
        </div>

        <div className="flex grow basis-90 reveal flex-col gap-5.5 self-start rounded-panel surface-dark p-7 md:p-10">
          <SectionLabel tone="on-dark">{summaryLabel}</SectionLabel>
          <p aria-live="polite" className="font-heading text-summary">
            {sentence}
          </p>
          <div className="flex items-baseline justify-between gap-4 border-t border-on-dark-line pt-5">
            <span className="text-ui text-on-dark-muted">
              {typicalFitLabel}
            </span>
            <span className="font-heading text-heading-s">{fit}</span>
          </div>
          <p className="text-ui text-on-dark-muted">{body}</p>
          <a
            href={`${uploadHref}?${params}#${uploadAnchor}`}
            className="flex min-h-touch items-center gap-3 rounded-input border-[1.5px] border-dashed border-muted p-4 text-sm font-semibold hover:border-on-dark-muted"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                d="M10 13V3M6 7l4-4 4 4M3 13v3a1 1 0 001 1h12a1 1 0 001-1v-3"
                fill="none"
                className="stroke-current"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {uploadLabel}
          </a>
          <Button type="submit" block>
            {submit.label}
          </Button>
        </div>
      </form>
    </section>
  );
}
