# Phan Văn Đạt — Portfolio

Portfolio with Next.js 15, React, TypeScript and Tailwind CSS. Public routes remain `/vi`, `/en`, `/jp` and `/kr`; the Japanese and Korean pages use the standard HTML language tags `ja` and `ko`.

## Run locally

Use Node.js 22+ and Bun 1.3+.

```powershell
bun install --frozen-lockfile
bun run dev
```

Open [the Vietnamese page](http://localhost:3000/vi). For a production preview:

```powershell
bun run typecheck
bun run build
bun run start -- --port 3010
```

In another terminal, while the production server is running:

```powershell
bun run test:smoke
```

Override `PORTFOLIO_URL` if the preview runs at a different address. Smoke checks cover all locales, section navigation contracts, public project links, the contact address, localized metadata, language redirects, SEO assets and 404 responses.

## Edit content

- `site-config.ts`: verified public name, role, email and canonical site URL.
- `dictionaries/{vi,en,jp,kr}.json`: all interface copy, project summaries, contributions and skill descriptions. Keep the same keys in every locale; TypeScript checks their shared shape.
- `app/[lang]/components/Project/projects.ts`: project images, technology lists and verified optional website/repository/video links.
- `app/[lang]/global.css`: responsive layout and visual tokens.
- `app/[lang]/opengraph-image.tsx`: social preview, generated as PNG for each locale.

Contact uses a direct `mailto:` link to the address confirmed by the owner. There is no contact form, email API key or simulated submission. Visitors can also select and copy the displayed address.

Three projects are featured; three more remain available in an expandable section. Each project has keyboard-operable details. Source and demo links open in a new tab and announce that behavior to assistive technology. KADA's website link is intentionally withheld because its domain did not resolve during verification; its screenshot and project description remain available.

The main page uses static CSS decoration instead of continuous canvas/3D animations. Reduced-motion preferences also disable smooth scrolling and nonessential transitions. Vercel Analytics only renders when `VERCEL=1`, avoiding a missing analytics script on other hosts.

Light/dark mode uses the official [FeralUI PullCord](https://feralui.dev/pullcord) component (`pullcord@0.1.0`). Pull the cord, click its handle, or use Enter/Space. Dark is the initial default; `next-themes` stores the selected mode under `portfolio-theme` and restores it before paint. The cord sleeps at rest, skips its entrance animation, and respects reduced motion. Its visible length is doubled, with a separate mobile gutter to keep the handle away from navigation links. Theme colors are shared CSS tokens in `global.css`; labels are translated in every dictionary.

See [theme verification](docs/PULLCORD-THEME.md) for checks covering the two palettes, drag, keyboard input and persistence.

## Verification and deployment

See [the UX plan](docs/UX-AUDIT-PLAN.md) and [verification results](docs/UX-VERIFICATION.md) for before/after evidence and limits.

Next.js is pinned to `15.5.28` rather than `latest`, following the [official October 2026 patch guidance](https://nextjs.org/blog/nextjs-security-update-october-14-2026). The Bun lockfile is committed for reproducible installs.

The changes are local. Deployment uses the repository's normal hosting workflow; no production publication is part of the local verification.
