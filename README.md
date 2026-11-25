# dry-fit-web

Website for Dry-Fit, a kitchen dry-fitting business in Harrow, North West London.
Built with Next.js (App Router), TypeScript and Tailwind CSS, hosted on Vercel.

## Setup

1. Install Node.js. The version is in `.nvmrc` (run `nvm use` if you use nvm).
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local`. Every value is optional locally.
4. Start the dev server: `npm run dev`, then open http://localhost:3000

## Scripts

| Script                 | What it does                       |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Local dev server with hot reload   |
| `npm run build`        | Production build                   |
| `npm run start`        | Serve the production build         |
| `npm run typecheck`    | Generate route types and run `tsc` |
| `npm run lint`         | ESLint                             |
| `npm run format`       | Format everything with Prettier    |
| `npm run format:check` | Check formatting (CI runs this)    |

## Folder structure

```
app/                 Routes, root layout and globals.css (all design tokens)
components/ui/       Small reusable pieces: buttons, chips, labels, marquee
components/layout/   Top bar, header, mobile menu, footer
components/sections/ One component per homepage section, content passed as props
content/             All copy as typed TypeScript objects (site.ts holds business details)
lib/                 Helpers: environment, class names, schema, email
design/              The design reference (not production code)
```

More detail on editing copy, adding images and deploying arrives with the
handover phase. See `CONTRIBUTING.md` for branch and commit rules.
