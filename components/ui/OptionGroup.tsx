import { cx } from "@/lib/cx";

type OptionGroupProps = {
  name: string;
  legend: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

/**
 * Single-choice group shown as pill toggles. Built on native radio inputs, so
 * arrow keys, form submission and screen readers work without extra code.
 */
export function OptionGroup({
  name,
  legend,
  options,
  value,
  onChange,
  className,
}: OptionGroupProps) {
  return (
    <fieldset className={cx("flex flex-col gap-3.5", className)}>
      <legend className="mb-3.5 type-label text-muted">{legend}</legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => (
          <label key={option.value} className="relative">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span className="inline-flex min-h-12 cursor-pointer items-center rounded-pill border-[1.5px] border-option-border bg-card px-5 text-ui font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-on-dark peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-primary hover:border-ink">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
