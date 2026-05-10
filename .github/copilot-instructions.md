# Copilot Instructions — Robleto.com

This file mirrors the Design Context defined in `.impeccable.md`. Any AI tool working on this project should read this section before producing UI, copy, or design work.

## Design Context

### Users

- **Primary user**: Greg himself. This site is a personal canon / atelier — a place to think out loud, collect, and document over time. It is *not* a pitch.
- **Secondary user**: peers in product, design, and technology who find their way here. They should leave with a reinforced positive impression of the work and the person.
- **Out of scope (for now)**: hiring managers and recruiters. A future `gregrobleto.com` may serve that audience explicitly. This site shouldn't try to do that job.
- **Ambition**: award-tier craft. The site should be good enough to elevate Greg's standing with peers — Awwwards / SOTD-quality intentionality, not just "nice portfolio."

### Brand Personality

Three words: **Crafted. Eclectic. Distinctive.**

- **Crafted** — every choice is authored, not defaulted. Spacing, type, motion, copy all show evidence of human judgment.
- **Eclectic** — unusual references, unexpected pairings, collections that reveal taste (lists, bookmarks, library, art). The site rewards curiosity.
- **Distinctive** — someone seeing this should not be able to guess the framework, the AI tool, or the template. The fingerprint is Greg's, not Vercel's or Tailwind's.

Tone: confident but not loud. Warm but not casual. Considered but not precious.

### Aesthetic Direction

**Current baseline (lived state):**
- Color: mostly neutral / grayscale. The Tailwind config defines ~30 named colors (ferra, oracle, sapling, plumwine, rosewater, etc.) but the actual UI today is restrained gray. The named palette is *available* but not yet activated. Treat the current near-monochrome as the honest baseline; don't critique against an aspirational palette that isn't shipped.
- Typography: Oswald (display), Bodoni (serif), Nunito Sans (body). The trio is intentionally unusual — display geometric, serif classical, sans humanist — and should feel like a deliberate editorial pairing, not three random fonts.
- Theme: light and dark mode are **both first-class**. Each must be designed, not just inverted. Neither is the afterthought.

**Anti-references — what this must explicitly NOT look like:**
- Dev-portfolio template: dark background + neon accents + monospace headings + hacker vibes. Avoid completely.
- Generic SaaS landing: hero metric layouts, gradient buttons, glass cards, identical card grids, "trusted by" logo strips.
- Linktree / link-aggregator: centered card stack with avatar on top.
- Notion-public-page export: big emoji header, default Notion type, untouched block styling.

### Design Principles

1. **Quietly available, not pitching.** The site accrues over time. It doesn't have to convince anyone in 5 seconds. Editorial pacing is allowed; depth is rewarded.
2. **Authored over defaulted.** If a design choice could be guessed by anyone using the same stack, change it. Distinctiveness is the goal, not novelty for its own sake.
3. **Light and dark are siblings, not parent and child.** Both modes must be tuned individually — palettes, contrasts, and accent treatments are designed for each, not derived.
4. **Long-form readability is sacred.** Post pages are the most-used surface. Measure, leading, type size, and rhythm must be tuned for sustained reading; nothing decorative should compromise it.
5. **Mobile is its own design, not a shrinkage.** Layout, navigation, and emphasis adapt; functionality is never amputated.
6. **WCAG AA is the floor, not the ceiling.** Every token pairing in both themes must pass; reduced-motion has fallbacks for every animation.

### Technical Constraints

- Next.js 15 (App Router), React 19, TypeScript, Tailwind 3.
- Notion as CMS. Hybrid content fetcher pattern; inline images are downloaded locally at build time (`lib/notionInlineImages.json`) to avoid Notion signed-URL expiry.
- Deployed on Netlify.
- Tokens live in `tailwind.config.ts`; no separate design-system docs yet.
