# Changelog

All notable changes to this project. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-11-25

Iteration 1: layout, structure and copy, with no photography yet.

### Added

- **Setup:** Next.js (App Router), TypeScript (strict) and Tailwind CSS. Prettier, ESLint, Husky and lint-staged run on commit. CI runs typecheck, lint, format, build and the smoke tests. Vercel preview deployments run per pull request.
- **Design system:** all tokens in `app/globals.css`, fonts via `next/font` (Bricolage Grotesque and Hanken Grotesk), and CSS-only motion that respects reduced motion.
- **Homepage:** hero, brand strip, three-tap price builder, why Dry-Fit, what we fit, what is dry fitting, reviews, areas and closing CTA. Marquees can be paused.
- **Pages:** `/dry-fitting` with FAQs, four service pages, `/kitchens-we-fit`, `/reviews`, `/about`, `/contact`, `/privacy`, `/terms`, `/areas`, the `/kitchen-fitter-harrow` area template, and a custom 404.
- **Quote form:** server action with Zod validation, homepage prefill, UK postcode and service-area check, plan uploads direct to Vercel Blob, emails via Resend, Cloudflare Turnstile and rate limiting. It works locally without keys.
- **SEO:** per-page metadata and canonicals, Open Graph image, sitemap, robots, and JSON-LD (HomeAndConstructionBusiness, Service, FAQPage, BreadcrumbList).
- **Docs:** README, CONTRIBUTING, CONTENT_TODO and this changelog.

[0.1.0]: https://github.com/ksrithevan10/dry-fit-web/releases/tag/v0.1.0
