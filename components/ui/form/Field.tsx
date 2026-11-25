import type { ReactNode } from "react";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
};

/** Label, optional hint and error message around one form control. */
export function Field({ id, label, hint, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

export function FieldError({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <p
      id={id}
      className="flex items-center gap-2 text-sm font-semibold text-error"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="8" cy="8" r="7" className="fill-current" />
        <path
          d="M8 4.5v4M8 11v.5"
          className="stroke-white"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      {children}
    </p>
  );
}

/** aria-describedby for a control with an optional hint and error. */
export function describedBy(
  id: string,
  { hint, error }: { hint?: string; error?: string },
) {
  return (
    [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") ||
    undefined
  );
}

/** Shared input styling. */
export const inputClass =
  "min-h-touch w-full rounded-input border-[1.5px] border-option-border bg-card px-4 py-3 text-base text-ink aria-[invalid=true]:border-error";
