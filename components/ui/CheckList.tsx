import { cx } from "@/lib/cx";

type CheckListProps = {
  items: readonly string[];
  /** "check" for what's included, "dash" for what isn't. */
  variant?: "check" | "dash";
  className?: string;
};

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mt-1 shrink-0"
    >
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        fill="none"
        className="stroke-primary"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mt-1 shrink-0"
    >
      <path
        d="M6 12h12"
        fill="none"
        className="stroke-faint"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** List with a tick or dash icon before each item. */
export function CheckList({
  items,
  variant = "check",
  className,
}: CheckListProps) {
  return (
    <ul
      className={cx(
        "flex flex-col gap-3 text-base",
        variant === "dash" && "text-muted",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          {variant === "check" ? <CheckIcon /> : <DashIcon />}
          {item}
        </li>
      ))}
    </ul>
  );
}
