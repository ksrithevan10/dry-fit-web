"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitQuote, type QuoteState } from "@/app/quote/actions";
import { Button } from "@/components/ui/Button";
import {
  describedBy,
  Field,
  FieldError,
  inputClass,
} from "@/components/ui/form";
import { OptionGroup } from "@/components/ui/OptionGroup";
import { quoteForm } from "@/content/quote";
import { isInServiceArea, isValidPostcode } from "@/lib/quote/postcode";
import { FileUpload } from "./FileUpload";
import { resetTurnstile, Turnstile } from "./Turnstile";

type QuoteFormProps = {
  uploadsEnabled: boolean;
  turnstileSiteKey?: string;
};

const GROUPS = ["source", "units", "worktop"] as const;

/**
 * The quote form. Kitchen choices are prefilled from the homepage URL
 * parameters (?source=…&units=…&worktop=…). Submits to the `submitQuote`
 * server action, which redirects to /quote/thanks.
 */
export function QuoteForm({
  uploadsEnabled,
  turnstileSiteKey,
}: QuoteFormProps) {
  const { fields, groups, timingOptions, sections } = quoteForm;
  const [state, action, pending] = useActionState<QuoteState, FormData>(
    submitQuote,
    {},
  );
  const [uploading, setUploading] = useState(false);
  const [outsideArea, setOutsideArea] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const [choices, setChoices] = useState<Record<string, string>>({});

  // Prefill the kitchen choices from the URL once the page has loaded. Reading
  // them after hydration lets the whole form be prerendered (no layout shift).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = Object.fromEntries(
      GROUPS.flatMap((name) => {
        const value = params.get(name) ?? "";
        const valid = groups[name].options.some(
          (option) => option.value === value,
        );
        return valid ? [[name, value]] : [];
      }),
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off sync from the URL
    setChoices((current) => ({ ...fromUrl, ...current }));
  }, [groups]);

  // After a failed submit: move focus to the error summary and get a fresh
  // spam-check token.
  useEffect(() => {
    if (state.message) {
      summaryRef.current?.focus();
      resetTurnstile();
    }
  }, [state]);

  const errors = state.fieldErrors ?? {};
  const value = (name: string) => state.values?.[name] ?? "";

  function checkPostcode(input: string) {
    setOutsideArea(isValidPostcode(input) && !isInServiceArea(input));
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-12">
      {state.message && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="flex flex-col gap-2 rounded-card border-[1.5px] border-error bg-card p-6"
        >
          <p className="font-semibold text-error">{state.message}</p>
          {Object.keys(errors).length > 0 && (
            <ul className="list-disc pl-5 text-sm">
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>
                  <a
                    href={`#${field === "planUrls" || field === "planNames" ? "plan" : field}`}
                    className="underline"
                  >
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* `key` remounts the inputs after each submit so they show the values the
          server sent back (React resets uncontrolled forms after an action). */}
      <div
        key={JSON.stringify(state.values ?? {})}
        className="flex flex-col gap-12"
      >
        <fieldset className="flex flex-col gap-5">
          <legend className="mb-5 font-heading text-heading-m">
            {sections.you}
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label={fields.name.label} error={errors.name}>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete={fields.name.autoComplete}
                defaultValue={value("name")}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={describedBy("name", { error: errors.name })}
                className={inputClass}
              />
            </Field>
            <Field id="phone" label={fields.phone.label} error={errors.phone}>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete={fields.phone.autoComplete}
                defaultValue={value("phone")}
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={describedBy("phone", { error: errors.phone })}
                className={inputClass}
              />
            </Field>
            <Field id="email" label={fields.email.label} error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete={fields.email.autoComplete}
                defaultValue={value("email")}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={describedBy("email", { error: errors.email })}
                className={inputClass}
              />
            </Field>
            <Field
              id="postcode"
              label={fields.postcode.label}
              error={errors.postcode}
            >
              <input
                id="postcode"
                name="postcode"
                type="text"
                required
                autoComplete={fields.postcode.autoComplete}
                autoCapitalize="characters"
                defaultValue={value("postcode")}
                onBlur={(event) => checkPostcode(event.target.value)}
                aria-invalid={errors.postcode ? true : undefined}
                aria-describedby={[
                  describedBy("postcode", { error: errors.postcode }),
                  "postcode-area",
                ]
                  .filter(Boolean)
                  .join(" ")}
                className={inputClass}
              />
              <p
                id="postcode-area"
                aria-live="polite"
                className="text-sm text-muted"
              >
                {outsideArea ? quoteForm.outsideArea : ""}
              </p>
            </Field>
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-8">
          <legend className="mb-5 font-heading text-heading-m">
            {sections.kitchen}
          </legend>
          {GROUPS.map((name) => (
            <div key={name} id={name} tabIndex={-1}>
              <OptionGroup
                name={name}
                legend={groups[name].legend}
                options={groups[name].options}
                value={choices[name] ?? value(name)}
                onChange={(next) =>
                  setChoices((current) => ({ ...current, [name]: next }))
                }
                error={errors[name]}
                required
              />
            </div>
          ))}
          <Field id="timing" label={fields.timing.label} error={errors.timing}>
            <select
              id="timing"
              name="timing"
              required
              defaultValue={value("timing")}
              aria-invalid={errors.timing ? true : undefined}
              aria-describedby={describedBy("timing", { error: errors.timing })}
              className={inputClass}
            >
              <option value="" disabled>
                {fields.timing.placeholder}
              </option>
              {timingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </fieldset>

        <fieldset className="flex flex-col gap-5">
          <legend className="mb-5 font-heading text-heading-m">
            {sections.plan}
          </legend>
          <div id="plan" tabIndex={-1} className="scroll-mt-24">
            <FileUpload
              id="plan-files"
              uploadsEnabled={uploadsEnabled}
              onBusyChange={setUploading}
              error={errors.planUrls ?? errors.planNames}
            />
          </div>
          <Field id="notes" label={fields.notes.label} hint={fields.notes.hint}>
            <textarea
              id="notes"
              name="notes"
              rows={5}
              defaultValue={value("notes")}
              aria-describedby={describedBy("notes", {
                hint: fields.notes.hint,
              })}
              className={inputClass}
            />
          </Field>
        </fieldset>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="consent"
            className="flex cursor-pointer items-start gap-3 text-base"
          >
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              defaultChecked={value("consent") === "on"}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-0.5 size-6 shrink-0 accent-primary"
            />
            <span>
              {fields.consent.before}
              <Link
                href={fields.consent.link.href}
                className="font-semibold underline underline-offset-4"
              >
                {fields.consent.link.label}
              </Link>
              {fields.consent.after}
            </span>
          </label>
          {errors.consent && (
            <FieldError id="consent-error">{errors.consent}</FieldError>
          )}
        </div>
      </div>

      <Turnstile siteKey={turnstileSiteKey} />

      <div>
        <Button
          type="submit"
          disabled={pending || uploading}
          aria-disabled={pending || uploading}
        >
          {pending ? quoteForm.submitting : quoteForm.submit}
        </Button>
      </div>
    </form>
  );
}
