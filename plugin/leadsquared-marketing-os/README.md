# LeadSquared Marketing OS

One plugin that makes Claude work the LeadSquared way: brand rules, task agents, on-brand templates, and the Asset Library + Content Repository as the system of record.

## What's inside (30 skills)

**Start here**
- `lsq-os` — routes any LeadSquared marketing request to the right agent and holds the rules every agent follows.

**Task agents**
- `lsq-web-design-agent` — landing, industry and product pages, sections, HTML mockups.
- `lsq-creative-agent` — static ads and social graphics (LinkedIn, Meta, Display) as exact-size PNGs.
- `lsq-copy-agent` — ad, web, email and social copy in the LeadSquared voice.
- `lsq-brand-reviewer` — checks a draft against voice, visual and logo rules before it ships.
- `lsq-repository-agent` — finds material in the Content Repository and runs the weekly index sync.

**Project X agents**
- `lsq-design-production-agent` (4.1) — one master design into every size and copy variant.
- `lsq-demo-intelligence-agent` (4.2) — demo, discovery and webinar transcripts into pains, objections and angles.
- `lsq-seo-brief-agent` (4.3) — writer-ready SEO content briefs.
- `lsq-ppc-agent` (4.4) — full paid campaigns: Google Search RSA, Display, LinkedIn and Meta copy + creatives, naming, UTMs, test plan.
- `lsq-sales-deck-agent` (4.5) — the master deck tailored to one prospect.

**Design system and library**
- `lsq-templates` — landing page, one-pager, case study, email, 1200x1200 and 1200x628 ads, 10-slide sales deck, real logo files.
- `lsq-asset-library` — read ratings before a brief, file finished work after.
- `leadsquared-voice-and-tone`, `leadsquared-visual-guideline`, `leadsquared-design-system` — the brand rules.
- 14 marketing specialists: `ad-creative`, `ads`, `cold-email`, `content-strategy`, `copy-editing`, `copywriting`, `cro`, `emails`, `image`, `lead-magnets`, `marketing-ideas`, `onboarding`, `product-marketing`, `social`.

## Install

**For the whole organization (Owner):** Organization settings → Plugins & skills → Add → Upload a plugin → choose this file. Set availability to *Installed by default* so everyone gets it.

**For yourself:** Customize → Plugins → Upload, then choose this file.

Code execution must be on (Settings → Capabilities).

## Connectors the agents use

| Connector | Used for | Needed? |
|---|---|---|
| Microsoft 365 | Content Repository (Shivanshi Dash's OneDrive), weekly index sync | Yes |
| Higgsfield | Imagery and short video for creatives | For creative work |
| Figma | Reading masters and building designs | Optional |

## How work flows

1. Brief Claude in the **LSQ OS** project ("make a LinkedIn campaign for healthcare").
2. `lsq-os` picks the agent. The agent reads the brand skills, the claims ledger and what rated well in the Asset Library.
3. You review options, pick, and edit.
4. The agent files the result in the Asset Library under your name. Ratings there steer the next brief.

## Rules that never change

- Real logo files only: colored on light, white on dark. Never redrawn or generated.
- Only `[V]` claims from the claims ledger. No invented stats, quotes or customers.
- Humans approve. Agents never publish, send or upload externally on their own.
