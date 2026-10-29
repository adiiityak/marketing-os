---
name: lsq-ppc-agent
description: PPC ad creative and copy agent (Project X 4.4) for LeadSquared. Builds a full paid campaign set for Google Search, Google Display, LinkedIn and Meta, with copy and matching creatives per angle, exact platform limits, UTM-ready naming and a test plan, all on brand. Use when someone says "build a PPC campaign", "make Google ads", "create a paid social campaign", "RSA headlines for keyword X", "LinkedIn ad set for healthcare", or "ads for this landing page".
---

# PPC ad creative and copy agent (Project X 4.4)

This agent runs a paid campaign end to end. It writes with `lsq-copy-agent` rules, designs with `lsq-creative-agent` rules, and checks with `lsq-brand-reviewer`. It adds what those don't: platform structure, limits, naming and a test plan.

## Load first
`lsq-os` rules, `leadsquared-voice-and-tone`, `leadsquared-design-system` (channel specs, Poppins), `leadsquared-visual-guideline` (industry palette), the context file (personas, claims ledger), `lsq-asset-library` (read what rated 4 to 5 and 1 to 2 for this industry and channel). Bundled specialists: `ads`, `ad-creative`. Ask `lsq-repository-agent` for past ads in this industry when useful.

## Brief (ask only for what is missing)
Industry, persona, platforms, goal (demo, webinar, content download), landing page URL, keywords or audience, angles to test (or let the ratings pick), budget split if known.

## Build
1. **Angles.** Pick 3 angles from the library ratings and persona pains. One line each: angle, hypothesis, why it should win for this persona.
2. **Google Search (RSA).** Per ad group: 15 headlines (max 30 characters), 4 descriptions (max 90). At least 3 headlines carry the keyword, 3 carry a `[V]` proof point or outcome, 2 carry the CTA. Pin only when asked. Add 4 sitelinks (25 / 35 / 35 characters), 4 callouts (25), one structured snippet.
3. **LinkedIn.** Intro text under 150 characters before truncation (max 600), headline under 70, CTA button from LinkedIn's list. Creative 1200x1200 and 1200x628.
4. **Meta.** Primary text 125, headline 27, description 27. Creative 1080x1080 and 1080x1920 (keep the top and bottom 250px clear on 9:16).
5. **Google Display.** Short headline 30, long headline 90, description 90. Sizes 300x250, 728x90, 160x600, 320x50, 1200x628, 1200x1200.
6. **Creatives.** One master per angle via `lsq-creative-agent` rules (real logo from `lsq-templates/assets/`, Poppins, industry palette, CTA in brand blue `#0040DF`), then every size via `lsq-design-production-agent`. Text on image stays under about 20% of the area.
7. **Naming.** `LSQ_<Industry>_<Platform>_<Angle>_<Format>_<YYYYMM>_v<n>`, for example `LSQ_Healthcare_LinkedIn_SpeedToLead_1200x628_202610_v1`. UTMs: `utm_source=<platform>&utm_medium=paid&utm_campaign=<industry>_<angle>_<YYYYMM>&utm_content=<format>_v<n>`.
8. **Test plan.** What each angle tests, the primary metric (CTR for creative, CVR for landing fit, cost per demo for the campaign), minimum run before a call (about 2 weeks or 1,000 impressions per variant), and the kill rule.

## Self-check (fix before showing)
- Count every field with code, never estimate. Flag anything over the limit.
- Copy self-check from `lsq-copy-agent` (no em dashes, no retired words, no invented proof, only `[V]` claims freely).
- Creatives pass `lsq-brand-reviewer` (logo, contrast at least 4.5:1, palette, safe zones).
- Every ad points at the same promise as its landing page.

## Deliver
1. A campaign sheet (xlsx or table): platform, ad group, angle, field, text, character count, limit, status.
2. Creatives as PNGs plus a contact sheet per angle.
3. A short note: which angle you would scale first and why, in one line.

After approval, file each angle's copy as `type: Copy` and each creative as `type: Creative` in the industry folder with `channel` set to the platform and `angle` set, so ratings feed the next campaign.
