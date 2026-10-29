---
name: "leadsquared-design-system"
description: "Apply LeadSquared's visual design system — logo usage, typography, color tokens, and industry/product color palettes — to any LeadSquared visual asset: web pages, landing pages, decks, ads, social creatives, emails, or one-pagers. Trigger on mentions of LeadSquared colors, hex codes, brand palette, typography, logo usage, Inter/Poppins fonts, brand chrome, industry palette (Lending, Healthcare, Education, Manufacturing, Technology, Real Estate), product palette (Sales, Marketing, Field Sales, Service), sub-brands (Invorto, Flostack), or ad specs (Facebook/LinkedIn/Google Ads image sizes). This skill covers visual design only — for brand voice, tone, and copywriting rules, use a separate voice/tone skill."
---


# LeadSquared Design System

Source: LeadSquared Corporate Branding Guidelines, 2026. This skill governs the **visual** system only (logo, type, color). It does not cover writing voice or tone.

## 1. Logo

The LeadSquared logo is icon (blue/midnight-blue square mark) + wordmark ("lead" in dark, "squared" in blue). The icon alone is the brand's primary symbol on social and other digital touch-points, and must work at any size it's placed in.

Don'ts:
- Don't make the icon too big relative to its container.
- Don't make it too small (it loses legibility below a minimum size).
- Don't stretch it out of its native aspect ratio.
- Don't strike a line through it or otherwise obscure it.

### Logo colors
- Blue — `#0C9AFC` (RGB 12, 154, 252)
- Midnight Blue — `#0C293D` (RGB 12, 41, 61)

Default logo is Blue + Midnight Blue on a light surface (**Color Positive**). On dark surfaces, use the **Color Reverse** version (white icon + white wordmark) rather than forcing the positive-color logo onto a dark background.

## 2. Typography

| Context | Typeface | Notes |
|---|---|---|
| Website / product UI | **Inter** | Primary typeface. Self-hosted variable font, WOFF2, weight range 400–800, `font-display: swap`. One file covers every weight role — never mix Inter with another sans-serif on the same page. Source: fonts.google.com/specimen/Inter |
| Social media & marketing creatives (ads, social graphics) | **Poppins** | Regular, Medium, Semibold, Bold |
| PowerPoint, Word, MS Outlook templates | **Arial** (Regular, Bold) | System typeface — avoids font-incompatibility when documents are opened by third parties who don't have Inter installed |

### Inter weight roles (website / product)

| Role | Weight | Used for |
|---|---|---|
| Display / H1 | 800 ExtraBold | Hero headlines, page titles |
| H2 | 700 Bold | Section headings |
| H3 / H4 | 600 SemiBold | Subheadings, card titles |
| Button / CTA label | 600 SemiBold | Top-nav CTA, hero CTA |
| Body | 400 Regular | Paragraph copy, list items |
| Body emphasis | 500 Medium | Inline `<strong>` and labels |

### Landing page type scale (Poppins-based pages)

| Tag | Weight | Size |
|---|---|---|
| h1 | 700 | 48px |
| h2 | 700 | 34px |
| h3 | 700 | 24px |
| h4 | 700 | 22px |
| h5 | 700 | 20px |
| h6 | 700 | 18px |
| p | 400 (normal) | 16px |

## 3. Color system

### 3.1 The 3-layer brand architecture

Three layers separate what never changes from what may vary by industry or product:

| Layer | Owns | Rule |
|---|---|---|
| **Layer 1 — Brand Chrome** `#0040DF` | Logo, top-nav CTA, focus rings, links, footer CTA | Pixel-identical on every page — home, lending, healthcare, education, products, sub-brands. Never varies. |
| **Layer 2 — Brand Footer** `#0A0A0A` | Site-wide footer surface, footer text, copyright row | Neutral near-black harmonizes with every industry palette. Headings `#E5E7EB`, body `#9CA3AF`, CTA `#0040DF`. |
| **Layer 3 — Context** (varies) | Hero band, hero CTA, section accents, icon fills | Varies by industry or product (e.g. Lending `#277627`, Healthcare `#193636`, Manufacturing `#0F172A`). |

**Golden rule:** cover the hero. If you can still tell which page/product you're on from the nav, footer, and CTAs alone (with the hero hidden), the page is compliant. Layer 1 + Layer 2 = recognition. Layer 3 = expression.

### 3.2 Global brand tokens (Layer 1 — never varies)

**Primary brand colors** (royal blue + indigo — the brand identity):

| Token | Hex | Used for |
|---|---|---|
| Brand Primary | `#0040DF` | Top-nav CTA, links, focus, logo |
| Brand Secondary | `#411EED` | Gradients, secondary CTAs, AI accents |
| Brand Deep | `#14103D` | Default deep navy, AI/enterprise hero |
| Brand Deep Strong | `#07021B` | Editorial max-depth, home hero |

**Supporting brand accents** (gradients, AI accents, tints):

| Token | Hex | Used for |
|---|---|---|
| Brand Bright | `#5F3FFF` | Display gradients, creatives |
| Brand Cyan | `#31A0F6` | Gradient endpoints, data viz |
| Brand Tint | `#ECEBF3` | Enterprise blocks, chips |

**Neutral surfaces** (page surfaces — light and inverse):

| Token | Hex | Used for |
|---|---|---|
| Surface Primary | `#FFFFFF` | Cards, default page background |
| Surface Secondary | `#F9F9F9` | Alternating sections |
| Surface Tertiary | `#ECEBF3` | Highlighted feature blocks |
| Surface Inverse | `#0A0A0A` | Footer, dark hero |
| Surface Inverse Soft | `#1A1A1A` | Dark cards on dark sections |

**Borders & dividers** (hairlines, focus rings, separators):

| Token | Hex | Used for |
|---|---|---|
| Border Primary | `#E2E8F0` | Cards, dividers, idle inputs |
| Border Secondary | `#EEEEEE` | Faint dividers, table rows |
| Border Focus | `#0040DF` | 2px focus ring |
| Border Inverse | `#2F2A51` | Borders on dark surfaces |

**Text colors** (WCAG-validated; AAA preferred):

| Token | Hex | Used for | Contrast |
|---|---|---|---|
| Text Primary | `#170F49` | Headings | 15.6:1 AAA |
| Text Body | `#374151` | Body copy | 10.4:1 AAA |
| Text Muted | `#4B5165` | Secondary text | 8.0:1 AAA |
| Text Tertiary | `#6A618D` | Metadata | 5.4:1 AA |
| Text Inverse | `#FFFFFF` | On dark hero | — |
| Text Inv. Strong | `#E5E7EB` | Footer heading | 12.6:1 AAA |
| Text Inv. Muted | `#9CA3AF` | Footer body | 7.4:1 AAA |

**Semantic / status colors** (brand constants used everywhere): Success `#22C55E` · Warning `#F59E0B` · Error `#EF4444` · Info `#3B82F6`.

### 3.3 Industry & product palette index (Layer 3 — context)

Every context palette pairs a Primary with a Secondary and a Tint. Each row is Primary / Secondary / Tint / Extra (if any) — pair Primary on white, Secondary for emphasis, Tint for surfaces.

| Type | Context | Primary | Secondary | Tint | Extra | Note |
|---|---|---|---|---|---|---|
| Industry | Lending (Financial) | `#277627` | `#9FE870` | `#0D1309` | `#306AFF` | Finance-only chrome blue — reserved for Lending/Financial Services pages, never apply to corporate or non-Lending products |
| Industry | Healthcare | `#193636` | `#3D8181` | `#F4ECD4` | — | Care · clinical · calm |
| Industry | Education | `#106DFD` | `#020B1A` | `#E4F0FF` | — | Trust · knowledge |
| Industry | Manufacturing | `#0F172A` | `#475569` | `#FFE38A` | `#C2410C` | Light Primary `#F1F5F9`; Accent `#C2410C` used sparingly for CTAs/callouts |
| Industry | Technology | `#3730A3` | `#8B5CF6` | `#D7CAFF` | — | Innovation · velocity |
| Industry | Real Estate | `#0E3B2E` | `#C9A227` | `#F5EDE0` | — | Heritage · prestige |
| Product | Sales | `#0040DF` | `#22C55E` | `#EFF6FF` | — | Reliable · enterprise |
| Product | Marketing | `#411EED` | `#F472B6` | `#F5F3FF` | — | Creative · vibrant |
| Product | Field Sales | `#0E7490` | `#F59E0B` | `#ECFEFF` | — | Movement · field ops |
| Product | Service | `#7C3AED` | `#06B6D4` | `#F5F3FF` | — | Care · responsive |
| Sub-brand | Invorto | `#FE6D1F` | `#010101` | `#F4F3EC` (warm tint) | — | Bold · craft · independent |
| Sub-brand | Flostack | `#031031` | `#0040DF` | `#F9FAFE` | — | Restrained · trust |

Per-industry composition notes worth holding onto:
- **Lending:** hero CTAs and primary surfaces use `#277627`; use `#9FE870` for highlights/badges/accents; `#306AFF` is reserved for Lending/Finance chrome only — never combine the green primary with the finance chrome blue as a foreground pair; never pair `#9FE870` directly on `#277627` without a contrast layer; never apply the Lending palette to corporate chrome.
- **Manufacturing:** use `#0F172A` for headers/dark structural surfaces, `#F1F5F9` for page backgrounds/cards, `#475569` for body/secondary UI, `#C2410C` sparingly as a precise accent (CTAs, callouts), `#FFE38A` for warm tint surfaces only — never as a primary fill, never put the orange accent on dark headers as a primary surface, never replace the secondary grey with brighter greys.
- **Flostack:** `#031031` for hero surfaces/headers, `#0040DF` for primary CTAs/accents/highlights, `#F9FAFE` for light backgrounds/cards. Keep typography on white or `#F9FAFE`; reserve `#0040DF` for high-emphasis actions.

### 3.4 Universal color don'ts ("Color Watchout")

Repeated across every channel spec in the source deck — treat as a hard rule:
- Don't use too many colors on one asset.
- Don't use secondary-colored backgrounds (stick to neutral surfaces + one accent).

## 4. Channel specs

### Facebook Ads
- File type: JPG or PNG. Ratio: 1.91:1. Resolution: at least 1080 x 1080px. Max file size 30MB. Min width 600px, min height 600px. Aspect ratio tolerance 3%.
- Primary text: 125 characters. Headline: 27 characters. Description: 27 characters.
- Typeface: Poppins (Regular / Medium / Semibold / Bold).

### LinkedIn Ads
- File type: JPG, PNG, or GIF. File size: 5MB.
- Horizontal/landscape 1.91:1 — min 640x360, max 7680x4320, recommended 1200x628.
- Square 1:1 — min 360x360, max 4320x4320, recommended 1200x1200.
- Vertical 1.91:1 (mobile only) — min 360x640, max 1254x2400, recommended 1191x628 / 628x1200 / 800x900 / 720x900.
- Typeface: Poppins (Regular / Medium / Semibold / Bold).

### Google Ads
- File size limit 150KB for all image ads.
- Common image-ad sizes include 300x100, 300x250, 728x90, 250x250, 200x200, 468x60, 234x60, 125x125, 120x600, 160x600, 300x600, 320x100, 970x90, 970x250, 320x50, and more (the deck lists a long standard-size grid).
- Responsive display ad (image): 1.91:1 minimum 600x314, or 1:1 minimum 300x300.
- Typeface: Poppins (Regular / Medium / Semibold / Bold).

### Landing pages
- Use the Poppins type scale in section 2.
- Follow the same "don't use too many colors / no secondary-colored backgrounds" rule.

### Testimonials
Four acceptable layout styles: (1) quote + name/title in plain text with a rule accent, (2) logo + centered quote with avatar, (3) quote on a brand-color card with avatar + logo, (4) side-by-side avatar and quote block. Use brand primary/deep tones for card backgrounds when a colored card style is used.

### Blog feature images / social & webinar creatives
Same color-restraint rule applies. Webinar social creatives typically use a two-panel layout: light panel with logo + headline + CTA button on one side, brand-color panel with speaker photos/names/titles on the other.

## How to apply this

1. Identify the context: is this a corporate/home asset (Layer 1+2 only), or does it belong to a specific industry, product, or sub-brand (Layer 3)? Pick the matching palette from section 3.3.
2. Use Brand Chrome `#0040DF` for nav, links, focus states, and the logo regardless of context — this never changes.
3. Pick typography per section 2 based on the deliverable type (web/product = Inter, social/ad creative = Poppins, Office doc = Arial).
4. Check every asset against the color watchout rule before finishing: no more than a primary + secondary + tint + one accent, and no secondary-colored backgrounds.
5. If the asset is a paid ad, pull the exact dimensions/file specs from section 4 for that platform.

