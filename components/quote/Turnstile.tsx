"use client";

import Script from "next/script";

declare global {
  interface Window {
    turnstile?: { reset: (widget?: string) => void };
  }
}

/**
 * Cloudflare Turnstile widget. It adds a hidden `cf-turnstile-response` field
 * to the surrounding form. Renders nothing when no site key is set (local
 * development), and the server skips the check in that case too.
 */
export function Turnstile({ siteKey }: { siteKey?: string }) {
  if (!siteKey) return null;
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
      />
      <div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" />
    </>
  );
}

/** Fresh token after a failed submit (each token works once). */
export function resetTurnstile() {
  window.turnstile?.reset();
}
