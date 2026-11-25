# dry-fit-web

Website for **Dry-Fit**, a kitchen dry-fitting business in Harrow, North West
London. Built with Next.js (App Router), TypeScript and Tailwind CSS, and hosted
on Vercel.

## Setup

1. Install Node.js. The version is in `.nvmrc` (run `nvm use` if you use nvm).
2. Install dependencies: `npm install`. This also sets up the Git hooks.
3. Copy `.env.example` to `.env.local`. Every value is optional locally.
4. Start the dev server with `npm run dev`, then open http://localhost:3000.

Without any keys the site works fully. The quote form logs each submission to
the terminal and still shows the thank-you page. Plan files aren't uploaded,
but their names are logged.

## Scripts

| Script                 | What it does                                       |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Local dev server with hot reload                   |
| `npm run build`        | Production build                                   |
| `npm run start`        | Serve the production build                         |
| `npm run typecheck`    | Generate route types and run `tsc`                 |
| `npm run lint`         | ESLint                                             |
| `npm run format`       | Format everything with Prettier                    |
| `npm run format:check` | Check formatting (CI runs this)                    |
| `npm run test:e2e`     | Playwright smoke tests (builds and starts the app) |

For the first Playwright run on a new machine, install the browser with
`npx playwright install chromium`.

## Folder structure

```
app/                    Routes (one folder per URL), root layout, globals.css
  globals.css           ALL design tokens: colours, type scale, radii, spacing, motion
  quote/actions.ts      Quote form server action
  api/plan-upload/      Issues upload tokens for kitchen plans (Vercel Blob)
components/
  ui/                   Small reusable pieces: Button, Chip, Card, Marquee, OptionGroup, ImageSlot, form fields
  layout/               Top bar, header, mobile menu, footer
  sections/             One component per homepage section, content passed as props
  blocks/               Inner-page pieces: PageHeader, Section, FaqList, StepList, QuoteCta…
  templates/            ServicePage and AreaPage templates
  quote/                Quote form, file upload and Turnstile widget
  seo/                  JSON-LD renderer
content/                ALL copy, as typed TypeScript objects
  site.ts               Business details, navigation, areas, footer: used everywhere
  home.ts, faqs.ts, …   One file per page or shared block
lib/                    Helpers: env, metadata, schema (JSON-LD), quote validation and email
tests/e2e/              Playwright smoke tests
design/                 The original design reference (not production code)
```

## Editing copy

All words on the site live in `/content`. Components never hard-code copy.

- **Business details** (phone, email, address, hours, rating, areas) are in `content/site.ts`. Change them once and they update every page, the footer and the structured data.
- **Homepage copy** is in `content/home.ts`, in page order.
- **Other pages** each have their own file: `dry-fitting.ts`, `kitchens-we-fit.ts`, `about.ts`, `contact.ts`, `areas.ts`, `legal.ts`, `quote.ts`, `reviews.ts`.
- **FAQs** are in `content/faqs.ts`. Service and area pages pick theirs by `id`.

Anything in `[square brackets]` is a placeholder. `CONTENT_TODO.md` lists them all.

## Adding images later

Iteration 1 has no photography. Every planned image position has an
`<ImageSlot name="…" brief="…" />` in the code, and it renders nothing for now.
To switch one on:

1. Put the image in `public/images/` (or use a remote source that's allowed in `next.config.ts`).
2. Change `components/ui/ImageSlot.tsx` to render `next/image` (there's an example in its comment), or swap that slot for `<Image>` directly.
3. Add the `src` and `alt` text to the page's content file.

`CONTENT_TODO.md` lists every slot, plus the image-led sections from the design
reference ("Recent fits" panels and the service hover thumbnails) that will come
back with photography.

## Deploying

The site deploys on Vercel (team "sribros' projects", project `dry-fit-web`).

- Every pull request gets a **preview deployment** automatically. The link appears on the PR.
- Merging to `main` deploys to **production**.
- `vercel.json` pins the framework preset to Next.js.

To make the quote form fully live, set these in Vercel → Project → Settings →
Environment Variables (see `.env.example` for what each one does):

- Connect a **Blob store** under Storage. That sets `BLOB_READ_WRITE_TOKEN`.
- `RESEND_API_KEY`, `LEADS_EMAIL` and `EMAIL_FROM` (the sending domain must be verified in Resend).
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` from Cloudflare Turnstile.
- `NEXT_PUBLIC_SITE_URL=https://dry-fit.com` for production.

Then add the `dry-fit.com` domain under Settings → Domains.

## More

- `CONTRIBUTING.md`: for the designer, covering tokens, components, branches and commits.
- `CONTENT_TODO.md`: every placeholder, missing fact and image slot.
- `CHANGELOG.md`: release notes.
