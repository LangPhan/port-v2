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
bun run start --port 3010
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
- `app/[lang]/components/Desk/desk.css`: desk materials, camera, book, page turns, and responsive reading layouts.
- `app/[lang]/components/Desk/desk-copy.ts`: desk controls and chapter labels in all four languages.
- `app/[lang]/components/Desk/portfolio-pages.tsx`: the fourteen editorial pages, built from the existing verified content.
- `app/[lang]/opengraph-image.tsx`: social preview, generated as PNG for each locale.

Contact uses a direct `mailto:` link to the address confirmed by the owner. There is no contact form, email API key or simulated submission. Visitors can also select and copy the displayed address.

Three projects each have their own two-page spread; three more remain available in the additional-work chapter with keyboard-operable details. Source and demo links open in a new tab and announce that behavior to assistive technology. KADA's website link is intentionally withheld because its domain did not resolve during verification; its screenshot and project description remain available.

The portfolio is a journal on a 3D desk, inspired by [FeralUI DeskFolio](https://feralui.dev/deskfolio). On arrival, an establishing shot holds for 1.2 seconds before the camera moves toward the closed book (1.8 seconds on desktop, 1.1 seconds on phones). Open the cover, drag horizontally, use the arrow buttons or the keyboard's Left/Right keys to turn pages. Home/End go to the first/last chapter. Contents jumps directly to a chapter, and View the desk zooms back out.

The scene uses CSS perspective, shared transforms, two-sided sheets and code-native desk objects; no WebGL engine or external 3D models are downloaded. There is no idle rendering loop. Desktop shows a spread; phones show each of the fourteen pages individually. Text selection and native image dragging inside the journal are disabled to prioritize page turning. Reading view presents the whole book as a normal scrolling document; disabling JavaScript also exposes all pages. Reduced-motion preferences skip the camera entrance, turn pages immediately, and remove nonessential transitions. Vercel Analytics only renders when `VERCEL=1`.

Vietnamese chapter headings use self-hosted Noto Serif (Latin + Vietnamese WOFF2 subsets, with the bundled SIL OFL license). Page turns use the exact MP3 requested from [Wawa Sensei's Book Slider demo](https://r3f-animated-book-slider-final.vercel.app/); the speaker button controls sound and stores the preference under `portfolio-page-sound`. See `public/sounds/SOURCE.md` for the asset source and checksum.

Day/night mode uses the official [FeralUI PullCord](https://feralui.dev/pullcord) component (`pullcord@0.1.0`). Pull the cord, click its handle, or use Enter/Space. It changes the room, wood and lamp glow while keeping the printed pages readable. Dark is the initial default; `next-themes` stores the selection under `portfolio-theme` and restores it before paint. The cord retains its doubled length, sleeps at rest, skips its entrance animation, and respects reduced motion. Scene colors live in `desk.css`; toggle labels remain translated in every dictionary.

See [theme verification](docs/PULLCORD-THEME.md) for checks covering the two palettes, drag, keyboard input and persistence.

## Verification and deployment

See [the UX plan](docs/UX-AUDIT-PLAN.md) and [verification results](docs/UX-VERIFICATION.md) for before/after evidence and limits.
See [the desk portfolio implementation](docs/DESK-PORTFOLIO.md) for the current experience, requirements and verification. Previous Lighthouse scores describe the earlier scrolling portfolio, not this new desk scene.

Next.js is pinned to `15.5.28` rather than `latest`, following the [official October 2026 patch guidance](https://nextjs.org/blog/nextjs-security-update-october-14-2026). The Bun lockfile is committed for reproducible installs.

The changes are local. Deployment uses the repository's normal hosting workflow; no production publication is part of the local verification.
