/**
 * Simple in-memory rate limit: a fixed number of submissions per IP in a
 * sliding window. It resets when a server instance restarts and is not
 * shared between instances, which is fine alongside Turnstile for a small
 * site. For a durable limit, swap this for a shared store (e.g. Upstash).
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function rateLimit(key: string, now = Date.now()): { ok: boolean } {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return { ok: false };
  }
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound.
  if (hits.size > 5000) {
    for (const [ip, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(ip);
    }
  }
  return { ok: true };
}
