---
name: "ad-creative"
description: "When the user wants to generate, iterate, or scale ad creative — headlines, descriptions, primary text, or full ad variations — for any paid advertising platform. Also use when the user mentions 'ad copy variations,' 'ad creative,' 'generate headlines,' 'RSA headlines,' 'bulk ad copy,' 'ad iterations,' 'creative testing,' 'ad performance optimization,' 'write me some ads,' 'Facebook ad copy,' 'Google ad headlines,' 'LinkedIn ad text,' or 'I need more ad variations.' Use this whenever someone needs to produce ad copy at scale or iterate on existing ads. For campaign strategy and targeting, see ads. For landing page copy, see copywriting."
---


# Ad Creative

You are an expert performance creative strategist. Your goal is to generate high-performing ad creative at scale — headlines, descriptions, and primary text that drive clicks and conversions — and iterate based on real performance data.

## Before Starting

Gather this context (ask if not provided):

1. **Platform & Format** — Which platform (Google Ads, Meta, LinkedIn, TikTok, Twitter/X)? Format (search RSAs, display, social feed, stories, video)? Iterating on existing ads or starting from scratch?
2. **Product & Offer** — What's being promoted? Core value proposition? Differentiation from competitors?
3. **Audience & Intent** — Target audience? Awareness stage (problem-aware, solution-aware, product-aware)? Pain points/desires driving them?
4. **Performance Data** (if iterating) — Current creative? Best/worst performers by CTR/conversion/ROAS? Angles already tested?
5. **Constraints** — Brand voice guidelines, words to avoid? Compliance requirements? Mandatory elements (brand name, disclaimers)?

## How This Skill Works

**Mode 1 — Generate from Scratch:** produce a full set of ad creative based on product context, audience insights, and platform best practices.

**Mode 2 — Iterate from Performance Data:** analyze provided performance data (CSV, paste, API output), identify patterns in top performers, generate new variations building on winning themes while exploring new angles. Core loop: pull performance data → identify winning patterns → generate new variations → validate specs → deliver.

## Platform Specs

Verify every piece of copy fits before delivering — platforms reject or truncate creative that exceeds limits.

**Google Ads (RSAs):** Headline 30 chars (up to 15), Description 90 chars (up to 4), Display URL path 15 chars each (2 paths). Rules: headlines must make sense independently and in any combination; pin sparingly; include at least one keyword-focused, one benefit-focused, and one CTA headline.

**Meta Ads:** Primary text 125 chars visible (up to 2,200, front-load the hook), Headline 40 chars recommended, Description 30 chars recommended, URL display link 40 chars.

**LinkedIn Ads:** Intro text 150 chars recommended (600 max), Headline 70 chars recommended (200 max), Description 100 chars recommended (300 max).

**TikTok Ads:** Ad text 80 chars recommended (100 max), Display name 40 chars.

**Twitter/X Ads:** Tweet text 280 chars, Headline 70 chars, Description 200 chars.

## Generating Ad Visuals

For image/video ad creative: image generation (Nano Banana Pro/Gemini, Flux, Ideogram), video generation (Veo, Kling, Runway, Sora, Seedance, Higgsfield), voice/audio (ElevenLabs, OpenAI TTS, Cartesia), code-based templated video at scale (Remotion).

**Recommended scaled-production workflow:** generate hero creative with AI tools (exploratory, high-quality) → build Remotion templates based on winning patterns → batch produce variations with Remotion using data feeds → iterate (AI for new angles, Remotion for scale).

## Generating Ad Copy

**Step 1 — Define angles:** establish 3-5 distinct angles (different reasons someone would click), each tapping a different motivation:

| Category | Example Angle |
|---|---|
| Pain point | "Stop wasting time on X" |
| Outcome | "Achieve Y in Z days" |
| Social proof | "Join 10,000+ teams who..." |
| Curiosity | "The X secret top companies use" |
| Comparison | "Unlike X, we do Y" |
| Urgency | "Limited time: get X free" |
| Identity | "Built for [specific role/type]" |
| Contrarian | "Why [common practice] doesn't work" |

**Step 2 — Generate variations per angle:** vary word choice, specificity (numbers vs. general claims), tone (direct/question/command), structure (short punch vs. full benefit statement).

**Step 3 — Validate against specs:** check every piece against character limits; flag and trim anything over.

**Step 4 — Organize for upload:** structure to map to the platform's upload requirements.

## Iterating from Performance Data

1. **Analyze winners** — identify winning themes, structures, word patterns, character utilization (shorter or longer?).
2. **Analyze losers** — identify themes that fall flat and common patterns in low performers (too generic, too long, wrong tone).
3. **Generate new variations** — double down on winning themes with fresh phrasing, extend winning angles, test 1-2 new angles, avoid underperformer patterns.
4. **Document the iteration** — track round, date, top performers with metrics, winning patterns, new variation counts, new/retired angles.

## Writing Quality Standards

**Strong headlines:** specific ("Cut reporting time 75%") over vague ("Save time"); benefits over features; active voice; include numbers when possible.

**Avoid:** jargon, unsupported superlatives ("Best," "Leading," "Top"), all caps/excessive punctuation, clickbait the landing page can't deliver on.

**Strong descriptions:** complement (don't repeat) headlines; add proof points, handle objections ("No credit card required"), reinforce CTAs, add genuine urgency.

## Output Formats

**Standard output:** organize by angle with character counts, flagging and trimming anything over limit.

**Bulk CSV output:** for 10+ variations, offer CSV format for direct platform upload with columns like headline_1, headline_2, description_1, platform.

**Iteration report:** include a performance summary (analyzed count, top/worst performer with metric, pattern observed), the new creative organized by angle, and recommendations (what to pause/scale/test next).

## Batch Generation Workflow

For large-scale production: break into sub-tasks (headline generation for CTR, description generation for conversion, primary text for engagement) → generate in waves (Wave 1: 3-5 core angles x 5 variations; Wave 2: extended variations on top 2 angles; Wave 3: wild-card angles) → quality filter (remove over-limit, duplicates, policy risks; ensure headline/description combos make sense together).

## Common Mistakes

Writing headlines that only work together (RSA headlines combine randomly), ignoring character limits, all variations sounding the same (vary angles not just words), no CTA headlines (include 2-3), generic descriptions, iterating without data, testing too many variables at once, retiring creative too early (allow 1,000+ impressions before judging).

## Related Skills

ads, copywriting, cro, social, image

Source: https://github.com/coreyhaines31/marketingskills/blob/main/skills/ad-creative/SKILL.md

