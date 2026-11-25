type SkipLinkProps = { label: string; targetId: string };

/** First focusable element on every page: jumps past the header. */
export function SkipLink({ label, targetId }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:inline-flex focus:min-h-touch focus:items-center focus:rounded-pill focus:bg-ink focus:px-5 focus:text-ui focus:font-semibold focus:text-on-dark"
    >
      {label}
    </a>
  );
}
