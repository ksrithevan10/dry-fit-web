type TopBarProps = {
  message: string;
  call: string;
  phoneHref: string;
};

/** Green strip above the header with the service line and click-to-call. */
export function TopBar({ message, call, phoneHref }: TopBarProps) {
  return (
    <div className="surface-primary">
      <div className="container-site flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2.5 text-xs font-semibold">
        <p>{message}</p>
        <a
          href={`tel:${phoneHref}`}
          className="inline-flex min-h-touch items-center underline-offset-4 hover:underline md:min-h-0"
        >
          {call}
        </a>
      </div>
    </div>
  );
}
