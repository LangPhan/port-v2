# Desk portfolio

Implemented in the existing Next.js repository, following the owner's selected [FeralUI DeskFolio](https://feralui.dev/deskfolio) direction and the approved camera sequence. The scene and page-turn implementation are custom CSS/React; the official `pullcord@0.1.0` control remains installed.

## Experience

1. An establishing shot shows the whole wooden desk, green desk mat, closed journal, keyboard, coffee, lamp, plant, phone and stationery.
2. After a 1.2-second hold, a shared CSS 3D transform moves the camera from an angled overview toward the journal. The movement takes 1.8 seconds on desktop and 1.1 seconds below 700px. The establishing shot is sized before it becomes visible, avoiding an initial zoom-out on phones. The intro skip control has been removed at the owner's request.
3. Click the cover or its labelled button to open the book. The cover shows Phan Văn Đạt, Front-end Developer and a localized personal-issue title.
4. Seven chapters contain fourteen HTML pages: introduction, toolkit, KADA, AI E-shoes Shop, TDTU FIND, additional work, and contact. The six original projects and owner-confirmed contributions, repositories, video and contact details remain available.
5. Drag the paper horizontally, use Previous/Next, or use Left/Right. The whole page captures horizontal drags; text selection and native image dragging are disabled, while links and expandable details remain clickable. Vertical touch scrolling remains available inside longer pages. Home/End jump to the first/last chapter. Contents provides direct chapter navigation and retains public section/project hashes.
6. View the desk zooms back out; click the book or Explore to return. Close folds the cover back over the book. Rapid page-turn input is locked until the current turn completes; chapter jumps, closing and overview cancel pending turns.
7. The Pullcord changes room, wood and lamp lighting between day and night. Its doubled length, keyboard operation, saved `portfolio-theme` preference and before-paint restoration are preserved.

## Responsive and accessible behavior

### Interaction revision (2026-10-29)

At the owner's request, text selection and native image dragging are disabled throughout the book, and dragging the content itself turns the page. Interactive links/details and vertical touch scrolling still work. The intro skip button has been removed in every language.

Vietnamese chapter headings now use self-hosted Noto Serif with explicit Latin and Vietnamese subsets and normal letter spacing. Its SIL OFL license is bundled in `public/fonts/`.

Page turns play the exact `page-flip-01a.mp3` requested from [Wawa Sensei's Book Slider demo](https://r3f-animated-book-slider-final.vercel.app/). The served file is checked against the public source blob SHA; no pitch/time changes are applied. See `public/sounds/SOURCE.md`. Sound starts only on a successful user page turn, and a localized speaker control mutes/unmutes it and persists the preference.

The earlier 21 browser observations below cover the original desk implementation. Their text-selection/intro-skip behavior is superseded by this revision.

- Desktop shows two pages per spread. Below 700px, the same book shows one leaf at a time and navigation progresses through all fourteen pages. Secondary desk objects (glasses, paperclip and desk card) are hidden, and the camera entrance is shorter.
- Reading view presents every page in normal document flow, with no scaled text or 3D transform. All chapters remain available in the contents picker.
- Pages contain actual HTML text, headings, links and images, rather than rasterized text. Longer content can scroll within its paper. Additional project details use native `details` elements.
- Inactive sheets and temporary animation copies are inert. Pages are also hidden from assistive technology while the camera is in overview. The page counter is announced politely; icon-only mobile controls have labels.
- Reduced-motion preferences immediately bypass the entrance and use immediate page changes. There is no continuous scene rendering or idle animation loop.
- Without JavaScript, a `noscript` stylesheet exposes all fourteen pages as a scrolling document and removes the scene controls and decorative overlays.
- All four routes (`/vi`, `/en`, `/jp`, `/kr`) retain localized metadata and HTML language tags. New scene controls have translations in `desk-copy.ts`.

## Source map

- `app/[lang]/components/Desk/portfolio-desk.tsx`: camera, book state, gestures, keyboard, hash navigation, contents, reading view and contact shortcut.
- `app/[lang]/components/Desk/portfolio-pages.tsx`: server-composed chapter content using the original dictionaries and project data.
- `app/[lang]/components/Desk/desk-objects.tsx`: code-native desk objects.
- `app/[lang]/components/Desk/desk.css`: materials, perspective, lighting, paper, cover, page turns and responsive layouts.
- `public/desk-grain.svg`: small generated SVG wood grain; no external 3D model downloads.

## Verification

Run `bun run build`, start the resulting production server on port 3010, then run `bun run typecheck` and `bun run test:smoke`.

Smoke checks cover all four locales, seven chapters, fourteen paper faces, six project articles, three expandable additional projects, section links including `skills` and `more-work`, canonical/hreflang metadata, real contact/project links, social images, locale negotiation, robots, sitemap and 404 behavior.

Verified on the production build on 2026-10-29:

| Check | Evidence |
| --- | --- |
| Production compilation and TypeScript | `bun run build` and `bun run typecheck` pass; all four locale pages are prerendered. |
| HTTP/content/SEO/assets regression checks | `bun run test:smoke`: 8/8 pass, including local Vietnamese font files and the requested MP3's exact blob checksum. |
| Page-turn sound | Browser playback confirmed `/sounds/page-flip-01a.mp3` playing (`paused: false`, duration 0.865125 seconds). |
| Entrance and cover | Fresh arrival moves from intro to focus with the book still closed. Clicking the cover opens the first spread. The skip control was removed in the subsequent interaction revision. |
| Complete book navigation | All fourteen individual leaves were visited in order at 390×844, followed by a backward turn. The first/last navigation boundaries, desktop page turns and Home/End were checked. |
| Pointer interaction | An actual mouse drag on a folded lower corner turns the page. |
| Contents and overview | Contents opens the selected project and its verified source link. Overview makes paper controls inert; clicking the book returns to the same spread. Closing folds the cover. |
| Reading view | All fourteen pages and six projects become available without transforms. Native additional-project details open, the additional-work anchor scrolls into view, and returning preserves the current spread without an offscreen camera transition. |
| Responsive layout | 320×568, 390×844, 768×1024 and 1280px desktop layouts were checked for horizontal overflow, visible-leaf count and book bounds. The final overview was also measured to keep all four table edges inside the scene. |
| Lighting and language | Pullcord Enter/Space toggles day/night. The choice survives reload. Changing VI→EN preserves light mode, query string and hash while translating the scene controls. |
| Runtime | No production console warnings/errors during the navigation and reading checks. |

The 21 browser observations are saved locally in the ignored `.reports/desk-browser-qa.json`. Screenshots: [cover](ux-audit/desk/cover-light.png), [overview](ux-audit/desk/overview-light.png), [open spread](ux-audit/desk/spread-light.png).

First-load JavaScript reported by Next.js is 191 kB. Earlier Lighthouse figures in `UX-VERIFICATION.md` describe the previous scrolling design and must not be presented as measurements of this scene. Reduced motion and the no-JavaScript fallback were inspected in source; the browser tooling did not expose an emulation switch for these preferences. Physical-phone verification remains scheduled after deployment, as requested by the owner.

Deployment continues through this repository's existing hosting workflow. This change does not create a separate hosted Site or replace its domain configuration.
