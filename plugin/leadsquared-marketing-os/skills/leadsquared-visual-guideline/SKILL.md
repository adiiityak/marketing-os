---
name: "leadsquared-visual-guideline"
description: "LeadSquared's website color system, typography, and component visual rules (Color & Brand Guide v2.2). Use whenever designing, building, reviewing, or generating any LeadSquared visual asset or page: landing pages, web pages, HTML mockups, hero sections, CTAs, cards, forms, tables, nav, footer, ads, social creatives, email templates, decks, or CSS/design tokens. Also use when asked which color or hex to use, which industry or product palette applies, whether a design is brand-compliant, or for the Invorto and Flostack sub-brand palettes."
---

# LeadSquared Website Color System & Brand Guide (v2.2)

The governed color foundation for every LeadSquared web page, across industries, products, and sub-brands. This governs how a page **looks**. The companion `leadsquared-voice-and-tone` skill governs how it **reads** — load both when producing a page or campaign asset.

**Owner:** Brand Design Council. **Audience:** Design, Marketing, Engineering.

The full original guide (with live visual examples) is saved in the user's MArketingOS folder as `LeadSquared-Color-System-Guide.html`. Open it when someone needs to see the rendered component states.

---

## 1. Color architecture: three layers

The layer determines whether a color may vary.

| Layer | Scope | Color | Variation |
|---|---|---|---|
| **Brand layer — chrome** | Logo, top-nav CTA, focus rings, links | Brand Primary `#0040DF` | **None** |
| **Brand layer — footer** | Site-wide footer surface and text | Surface `#0A0A0A`, headings `#E5E7EB`, body/links `#9CA3AF`, footer CTA `#0040DF` | **None** |
| **Context layer** | Hero, section accents, icon fills, gradients | Industry / product palette | Yes |
| **Neutral layer** | Body text, cards, surfaces, borders, dividers | Neutral tokens | **None** |

**Golden rule.** Cover the hero. If you can still tell which site you are on from the nav, footer, and CTAs alone, the page is compliant. If you cannot, something in the brand layer has been changed in error.

**Footer rule (most-missed).** The footer surface is neutral near-black `#0A0A0A`, **not** brand blue and **not** navy. Brand blue appears only on the footer CTA, even on industry and sub-brand pages. A navy footer would clash with green Lending, teal Healthcare, gold Real Estate, and warm Manufacturing accents; neutral near-black is industry-agnostic.

---

## 2. Global brand tokens

### 2.1 Primary brand colors

| Color | Hex | Token | Use |
|---|---|---|---|
| Brand Primary | `#0040DF` | `--color-brand-primary` | Top-nav CTA, links, focus rings, logo accent |
| Brand Secondary | `#411EED` | `--color-brand-secondary` | Gradients, secondary CTAs, AI accents |
| Brand Deep | `#07021B` | `--color-brand-deep` | Premium dark sections, AI / enterprise hero surfaces |

Brand Deep `#07021B` is the deep navy on premium home-page panels (e.g. "Why leading organizations choose LeadSquared"). It is distinct from the Brand Footer `#0A0A0A`: Brand Deep carries marketing-section weight on light pages; Brand Footer is the site-wide footer surface. On Brand Deep use white `#FFFFFF` headings (18.4:1, AAA) with `#0040DF` or `#5F3FFF` accent fills.

**Gradient usage.** `linear-gradient(135deg, #0040DF 0%, #411EED 100%)` may be used on display text, hero backgrounds, accent shapes, and icon fills. Canonical example: the word "high-impact" in the home hero headline. Never apply it to body copy under 28px, or to UI controls (buttons, inputs, badges).

```css
.hero-accent {
  background: linear-gradient(135deg, #0040DF 0%, #411EED 100%);
  -webkit-background-clip: text;
          background-clip: text;
  color: transparent;
}
```

### 2.2 Supporting brand accents

| Color | Hex | Use |
|---|---|---|
| Brand Bright | `#5F3FFF` | Display text gradients, marketing creatives |
| Brand Cyan | `#31A0F6` | Gradient endpoints, data viz |
| Brand Tint | `#ECEBF3` | Enterprise feature backgrounds, chips |

3-stop AI gradient: `linear-gradient(135deg, #411EED 0%, #5F3FFF 50%, #31A0F6 100%)` for AI/automation hero backgrounds and motion sequences.

### 2.3 Neutral surfaces

| Token | Hex | Use |
|---|---|---|
| `--color-surface-primary` | `#FFFFFF` | Cards, default page bg |
| `--color-surface-secondary` | `#F9F9F9` | Alternating sections |
| `--color-surface-tertiary` | `#ECEBF3` | Highlighted feature blocks |
| `--color-surface-inverse` | `#0A0A0A` | Footer band, dark hero (industry-neutral) |
| `--color-surface-inverse-soft` | `#1A1A1A` | Dark cards on dark sections |

### 2.4 Borders & dividers

| Token | Hex | Role |
|---|---|---|
| `--color-border-primary` | `#E2E8F0` | Cards, dividers, input idle |
| `--color-border-secondary` | `#EEEEEE` | Faint dividers, table rows |
| `--color-border-focus` | `#0040DF` | Focus ring (2px) |
| `--color-border-inverse` | `#2F2A51` | Borders on dark surfaces |

### 2.5 Text colors

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--color-text-primary` | `#170F49` | Headings | 15.6:1 on white (AAA) |
| `--color-text-body` | `#374151` | Body copy | 10.4:1 (AAA) |
| `--color-text-muted` | `#4B5165` | Secondary text | 8.0:1 (AAA) |
| `--color-text-tertiary` | `#6A618D` | Metadata, inactive | 5.4:1 (AA) |
| `--color-text-inverse` | `#FFFFFF` | Text on dark hero surfaces | — |
| `--color-text-inverse-strong` | `#E5E7EB` | Footer headings & nav links | 12.6:1 on `#0A0A0A` (AAA) |
| `--color-text-inverse-muted` | `#9CA3AF` | Footer body, secondary links, copyright | 7.4:1 on `#0A0A0A` (AAA) |

### 2.6 Status colors (global, never vary)

| Status | Color | Tint | Use |
|---|---|---|---|
| Success | `#16A34A` | `#ECFDF5` | Positive metrics, success messages |
| Warning | `#D97706` | `#FEF3C7` | Cautions, pending states |
| Error | `#DC2626` | `#FEE2E2` | Errors, destructive |
| Info | `#0040DF` | `#EFF6FF` | Informational banners |

Every status pairs a color with an icon **and** a label, so meaning is never carried by color alone (WCAG 1.4.1).

### 2.7 Typography

One typeface carries the entire system: **Inter**, self-hosted as a variable font over WOFF2 with `font-display: swap`, weight range `400 800`.

```css
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
font-display: swap;
font-weight: 400 800; /* variable axis */
```

| Role | Weight | Used for |
|---|---|---|
| Display / H1 | 800 ExtraBold | Hero headlines, page titles |
| H2 | 700 Bold | Section headings |
| H3 / H4 | 600 Semi Bold | Subheadings, card titles |
| Button / CTA label | 600 Semi Bold | Nav CTA, hero CTA, inline CTAs |
| Body | 400 Regular | Paragraph copy, list items |
| Body emphasis | 500 Medium | Inline `<strong>` and labels |

- **Do** load Inter self-hosted (WOFF2 + `font-display: swap`) to avoid CLS and FOIT.
- **Do** use the variable axis (400–800); one file covers every role.
- **Don't** mix Inter with another sans-serif on the same page.
- **Don't** use Inter Italic for emphasis; use weight 500/600.
- **Never** substitute system fonts for headlines or display text.

---

## 3. Industry color system

Industry pages may shift the **hero, hero CTA, and section accent** to the industry palette. Top-nav CTA, logo, links, focus rings, and footer stay in the brand layer.

| Industry | Primary | Secondary / Accent | Tint |
|---|---|---|---|
| Financial Services / Lending | `#277627` | `#9FE870` + `#306AFF` chrome | `#0D1309` |
| Healthcare | `#193636` | `#3D8181` | `#F4ECD4` |
| Education | `#106DFD` | `#020B1A` | `#E4F0FF` |
| Manufacturing | `#0F172A` dark / `#F1F5F9` light | `#475569` / `#C2410C` | `#FFE38A` |
| Technology / Digital Native | `#3730A3` | `#8B5CF6` | `#D7CAFF` |
| Real Estate | `#0E3B2E` | `#C9A227` | `#F5EDE0` |

### Financial Services / Lending
Pages: `/finance-crm/`, `/lending/`, `/lending/loan-origination-system/`, `/collections-crm-v2/`.
Deep green signals growth, repayment health, and approval; fluorescent green adds optimism, separating LeadSquared from legacy institutional blue. **Two layers stack here:** a Finance-tuned blue `#306AFF` carries the chrome (a Finance-only, slightly brighter variant of `#0040DF` that reads as "fintech" blue), while the greens carry industry context. `#306AFF` is scoped to Finance pages only; every other page uses `#0040DF` for chrome. Section accent bar: `linear-gradient(90deg, #277627, #9FE870)`.
- **Do** use primary green as hero with white display copy. **Don't** use accent green for body text.
- **Don't** recolor nav, logo, or footer.

### Healthcare
Pages: `/healthcare/`, `/us/healthcare/`.
Deep teal communicates clinical calm; muted mid-teal carries it into icons; warm cream tint keeps it humane rather than sterile. Cream `#F4ECD4` as section background, `#193636` headings, `#3D8181` icon fills. Hero CTA takes Healthcare teal; nav CTA stays `#0040DF`.
- **Don't** use red — it signals clinical emergency. **Don't** use loud gradients.

### Education
Pages: `/education/`, `/us/education/`.
Bright open blue conveys clarity and aspiration. Tint `#E4F0FF` as the dominant hero/section background; deep contrast `#020B1A` used sparingly, only below the hero on a single full-bleed band.
- **Do** pair imagery of people with the bright primary. **Don't** borrow Finance green accents. **Don't** use deep contrast as a large surface.

### Manufacturing
Pages: `/manufacturing-crm-software/`.
Deep slate `#0F172A` as full-bleed hero for industrial gravitas; light slate `#F1F5F9` as the calm counter-surface for section backgrounds, spec sheets, and long-form workflow content; steel `#475569` for borders, supporting headings, and chart strokes; burnt orange `#C2410C` for CTAs and metric highlights; warm cream `#FFE38A` for callouts only.
- **Don't** use cream as a hero. **Don't** use playful rounded illustration styles.

### Technology / Digital Native
Pages: `/marketplace-crm/`.
Deep indigo grounds the lavender tint and connects to brand indigo `#411EED`; vibrant violet enables AI-forward motion.
- **Do** use indigo → violet 135° gradients for hero; lavender tint behind technical diagrams. **Don't** use industry blues here, and don't make tech pages identical to the homepage.

### Real Estate
Forest green and warm gold signal premium, grounded trust.
- **Do** use cream tint as the primary section background; gold for price highlights and premium tags. **Don't** use pure black for text, or mix with Healthcare teal / Finance green.

---

## 4. Product color system

Core products share partial brand identity. Invorto and Flostack are governed as separate sub-brands with full color independence.

| Product | Primary | Secondary | Tint |
|---|---|---|---|
| Sales | `#0040DF` | `#22C55E` | `#EFF6FF` |
| Marketing | `#411EED` | `#F472B6` | `#F5F3FF` |
| Field Sales | `#0E7490` | `#F59E0B` | `#ECFEFF` |
| Service | `#7C3AED` | `#06B6D4` | `#F5F3FF` |
| Invorto (sub-brand) | `#FE6D1F` | `#010101` | `#F4F3EC` |
| Flostack (sub-brand) | `#031031` | `#0040DF` | `#F9FAFE` |

- **Sales** leads with brand blue to reinforce conversion confidence; growth green is reserved for win-rate, pipeline, and revenue metrics on the `#EFF6FF` tint.
- **Marketing** uses brand indigo for the AI/automation narrative; pink is accent only (icon strokes, decorative orbs, highlight underlines). A `linear-gradient(135deg, #411EED, #F472B6)` hero/display gradient is optional, not required — most pages use no hero gradient.
- **Field Sales**: deep teal and amber communicate motion, on-ground operation, route efficiency.
- **Service**: violet conveys empathy; cyan supports clarity in support metrics and ticket states.
- **Invorto** (invorto.ai): dark-first hero `#010101` with white display copy and orange `#FE6D1F` on the brand name and CTA. No LeadSquared blue on this surface. **Don't** use orange for body text or introduce purple/indigo. Warm beige `#F4F3EC` for documentation pages.
- **Flostack** (flostack.io): full-bleed deep navy `#031031` hero with white display copy; CTA accent `#0040DF` deliberately aligns with LeadSquared blue to signal product family while the navy keeps a distinct surface identity. **Don't** introduce warm colors or LeadSquared purple/indigo. Use white as a major design element.

---

## 5. Component usage rules

### 5.1 CTA buttons

| State | Primary CTA | Secondary CTA |
|---|---|---|
| Default | `#0040DF` fill, white text | White fill, `#0040DF` 1.5px border, `#0040DF` text |
| Hover | `#0033B0` fill | `#EFF6FF` fill |
| Focus | 2px `#0040DF` ring, 2px offset | Same |
| Disabled | `#C7D2FE` fill, white text | `#E5E7EB` border, `#9CA3AF` text |
| Destructive | `#DC2626` fill, white text | — |

Radius `8px`. Padding `10px 20px` default, `14px 28px` hero.

**Hero CTA fill adopts the page primary**, not a single global blue: Home `#0040DF`, Lending `#277627`, Healthcare `#193636`, Education `#106DFD`, Manufacturing `#C2410C`, Real Estate `#0E3B2E`, Invorto `#FE6D1F`, Flostack `#0040DF`. Shape, radius, padding, and white label stay identical; only the fill changes. Hover darkens the fill ~20%; focus ring matches the fill, 2px wide, 2px offset. **Never use industry/product primaries for the global top-nav CTA.**

**Gradient CTA variant (dark sections only).** On dark heroes, mid-page dark bands, and footer-adjacent CTA strips, the primary action may become a dark pill with a glowing gradient **ring** (not fill): Home ring `#5F3EFF → #411EED → #0040DF`; Invorto ring `#FFB347 → #FF6B2C → #E83A00`. Inner surface stays dark so the label keeps ≥ 4.5:1. Pill radius `9999px`. Switch back to the solid-fill CTA the moment the section returns to light. Never use the gradient CTA in chrome, repeated cards, or forms.

### 5.2 Hover states

| Element | Idle | Hover |
|---|---|---|
| Link | `#0040DF`, no underline | `#0033B0`, underline |
| Nav link | `#170F49` | `#0040DF`, 2px underline |
| Card | 1px `#E2E8F0` border | 1px `#0040DF` border, elevated shadow |
| Icon button | transparent | bg `#EFF6FF`, icon `#0040DF` |

### 5.3 Gradients

| Use | Stops | Direction |
|---|---|---|
| Brand hero | `#0040DF → #411EED` | 135° |
| AI / motion | `#411EED → #5F3FFF → #31A0F6` | 135° |
| Industry hero | Industry primary → primary darkened 20% | 135° |
| Dark overlay | `rgba(6,11,29,.9) → rgba(6,11,29,1)` | Radial |

One gradient per visible viewport. Never gradient body text outside the 28–60px range.

### 5.4 Cards
Background `#FFFFFF` (or context tint on accent cards). Border `1px solid #E2E8F0`. Radius `12px`. Shadow default `0 2px 8px rgba(0,0,0,0.06)`, hover `0 6px 16px rgba(0,0,0,0.08)`. Padding `24px` default, `16px` compact, `32px` spacious.

### 5.5 Sections
Alternate odd `#FFFFFF` / even `#F9F9F9`; never two tinted sections adjacent. Vertical padding `96px` desktop, `64px` tablet, `48px` mobile. Max one full-bleed industry accent band per page, height `4px`.

### 5.6 Forms
Input bg `#FFFFFF`. Border idle `1px solid #D1D5DB`, focus `2px solid #0040DF`, error `2px solid #DC2626` with `#DC2626` helper text. Label `#374151`, 14px, weight 500. Placeholder `#9CA3AF`. Radius `8px`.

### 5.7 Tables
Header bg `#F9F9F9`; header text `#374151`, 12px, uppercase, weight 600. Row divider `1px solid #EEEEEE`. Row hover `#F9FAFE`. Cell padding `12px 16px`.

### 5.8 Navigation
Background `#FFFFFF` with scroll-triggered shadow `0 2px 8px rgba(0,0,0,0.06)`. Logo never recolored to match the hero. Top-nav CTA `#0040DF` fill, white text. Link hover `#0040DF` with 2px underline; active link `#0040DF` with 2px bottom border.

### 5.9 Footer
Background `#0A0A0A` (neutral near-black, **not** brand blue, **not** navy). Headings & nav links `#E5E7EB` (12.6:1, AAA). Body & secondary links `#9CA3AF` (7.4:1, AAA). Divider `#262626`. Link hover `#FFFFFF`. Footer CTA `#0040DF`, even on industry and sub-brand pages.

---

## 6. Accessibility

| Content | WCAG | Min ratio |
|---|---|---|
| Body text (≤18px regular / ≤14px bold) | AA | 4.5:1 |
| Large text (>18px regular / >14px bold) | AA | 3.0:1 |
| Interactive UI elements & icons | AA | 3.0:1 |
| Focus indicators | AA | 3.0:1 vs adjacent color |

Verified pairs: `#170F49` on white 15.6:1 (AAA) · `#374151` on white 10.4:1 (AAA) · `#4B5165` on white 8.0:1 (AAA) · white on `#0040DF` 8.6:1 (AAA) · white on `#DC2626` 4.8:1 (AA) · `#0040DF` on `#EFF6FF` 8.1:1 (AAA).

Rules:
- Color must never be the sole channel for meaning; pair status colors with icons or text.
- Focus rings must be visible on every surface. On dark surfaces switch to white with 2px offset (e.g. `#FFFFFF` ring on the `#020B1A` Education band).
- Disabled controls must still meet 3.0:1.

---

## 7. Do / Don't

**Universal**
- **Do** keep top-nav CTA, logo, focus rings, and links in brand chrome on every page. **Don't** recolor logo, nav, or footer to match a hero.
- **Do** limit hero gradients to two brand-family stops. **Don't** stack three or more unrelated colors.
- **Do** use industry tints as section backgrounds, not heroes. **Don't** use saturated industry primaries for body or card text.
- **Do** pair status colors with icons and labels. **Don't** use color alone for state.

**Industry**
- **Do** use the industry primary for the hero only; max 2 accent colors per page. **Don't** repeat the industry primary across more than 2 large surfaces, or borrow another industry's accents.

**Product**
- **Do** keep Invorto and Flostack visually distinct. **Don't** apply LeadSquared purple/indigo to either, or carry Sales green / Marketing pink into industry pages.

**Known failures**

| Mistake | Why it fails |
|---|---|
| Manufacturing hero in `#411EED` | Removes industrial gravitas; reads as a tech product |
| Healthcare CTA in `#DC2626` | Triggers emergency association in clinical contexts |
| Finance card background in `#FFE38A` | Cross-industry color leak; breaks recognition |
| Invorto CTA in `#0040DF` | Erases sub-brand distinctiveness |
| Footer CTA recolored to industry primary | Breaks brand chrome consistency |
| Body text gradient | Drops legibility below AA |
| Recoloring the top-nav CTA per industry | User can no longer identify LeadSquared from the nav |

---

## 8. Cross-page consistency

**Never changes:** logo color; nav background `#FFFFFF` + scroll shadow; top-nav CTA `#0040DF`; focus ring 2px `#0040DF` at 2px offset; footer background `#0A0A0A`; footer CTA `#0040DF`; body typography (family, size scale, line-height); card style (radius 12px, border `#E2E8F0`); form input style (radius 8px, border `#D1D5DB`, focus `#0040DF`); section alternation (odd `#FFFFFF`, even `#F9F9F9`).

**May vary by context:** hero background (industry/product primary or gradient); hero CTA fill; section accent; icon fill in feature grids; hero text color (white on dark, `--color-text-primary` on light); decorative illustration palette (context tokens only).

---

## 9. Developer implementation

**Naming:** `--color-{layer}-{role}-{variant?}` where layer ∈ {brand, industry, product, surface, border, text, status}; role ∈ {primary, secondary, accent, tint, deep, inverse, body, muted, tertiary, success, warning, error, info}; variant is optional (hover, focus, disabled, industry name, product name).

**Hierarchy:** primitive → semantic → component. Components reference semantic tokens only.

```css
:root {
  /* Brand */
  --color-brand-primary:   #0040DF;
  --color-brand-secondary: #411EED;
  --color-brand-deep:      #07021B;
  --color-brand-bright:    #5F3FFF;
  --color-brand-cyan:      #31A0F6;
  --color-brand-tint:      #ECEBF3;
  /* Surface */
  --color-surface-primary:       #FFFFFF;
  --color-surface-secondary:     #F9F9F9;
  --color-surface-tertiary:      #ECEBF3;
  --color-surface-inverse:       #0A0A0A;
  --color-surface-inverse-soft:  #1A1A1A;
  /* Border */
  --color-border-primary:   #E2E8F0;
  --color-border-secondary: #EEEEEE;
  --color-border-focus:     #0040DF;
  --color-border-inverse:   #2F2A51;
  /* Text */
  --color-text-primary:         #170F49;
  --color-text-body:            #374151;
  --color-text-muted:           #4B5165;
  --color-text-tertiary:        #6A618D;
  --color-text-inverse:         #FFFFFF;
  --color-text-inverse-strong:  #E5E7EB;  /* footer headings & nav links on #0A0A0A */
  --color-text-inverse-muted:   #9CA3AF;  /* footer body & secondary links on #0A0A0A */
  /* Status */
  --color-status-success: #16A34A;
  --color-status-warning: #D97706;
  --color-status-error:   #DC2626;
  --color-status-info:    #0040DF;
  /* Industries */
  --color-industry-finance-primary:    #277627;
  --color-industry-finance-accent:     #9FE870;
  --color-industry-finance-deep:       #0D1309;
  --color-industry-health-primary:     #193636;
  --color-industry-health-accent:      #3D8181;
  --color-industry-health-tint:        #F4ECD4;
  --color-industry-edu-primary:        #106DFD;
  --color-industry-edu-deep:           #020B1A;
  --color-industry-edu-tint:           #E4F0FF;
  --color-industry-mfg-primary:        #0F172A;
  --color-industry-mfg-primary-light:  #F1F5F9;
  --color-industry-mfg-secondary:      #475569;
  --color-industry-mfg-accent:         #C2410C;
  --color-industry-mfg-tint:           #FFE38A;
  --color-industry-tech-primary:       #3730A3;
  --color-industry-tech-accent:        #8B5CF6;
  --color-industry-tech-tint:          #D7CAFF;
  --color-industry-realestate-primary: #0E3B2E;
  --color-industry-realestate-accent:  #C9A227;
  --color-industry-realestate-tint:    #F5EDE0;
  /* Products */
  --color-product-sales-primary:       #0040DF;
  --color-product-sales-accent:        #22C55E;
  --color-product-sales-tint:          #EFF6FF;
  --color-product-marketing-primary:   #411EED;
  --color-product-marketing-accent:    #F472B6;
  --color-product-marketing-tint:      #F5F3FF;
  --color-product-fieldsales-primary:  #0E7490;
  --color-product-fieldsales-accent:   #F59E0B;
  --color-product-fieldsales-tint:     #ECFEFF;
  --color-product-service-primary:     #7C3AED;
  --color-product-service-accent:      #06B6D4;
  --color-product-service-tint:        #F5F3FF;
  --color-product-invorto-primary:     #FE6D1F;
  --color-product-invorto-inverse:     #010101;
  --color-product-invorto-tint:        #F4F3EC;
  --color-product-flostack-primary:    #031031;
  --color-product-flostack-accent:     #0040DF;
  --color-product-flostack-tint:       #F9FAFE;
}
```

**Scalability:** all hex values live in `tokens.css`, no hardcoded hex in components. Components consume `--color-brand-primary`, never `--color-blue-600`. Add tokens for new industries; never re-point existing tokens. Bump minor for new tokens, major for semantic remaps.

---

## 10. Quick reference

**Brand chrome constants (never vary):** chrome `#0040DF` · brand secondary `#411EED` · brand deep `#07021B` · footer surface `#0A0A0A` · footer heading/nav text `#E5E7EB` · footer body text `#9CA3AF` · footer divider `#262626` · footer CTA `#0040DF`.

**Context palettes (primary / secondary / tint):**
Global brand `#0040DF` / `#411EED` / `#ECEBF3` · Finance `#277627` / `#9FE870` (+`#306AFF` chrome) / `#0D1309` · Healthcare `#193636` / `#3D8181` / `#F4ECD4` · Education `#106DFD` / `#020B1A` / `#E4F0FF` · Manufacturing `#0F172A`+`#F1F5F9` / `#475569`+`#C2410C` / `#FFE38A` · Tech `#3730A3` / `#8B5CF6` / `#D7CAFF` · Real Estate `#0E3B2E` / `#C9A227` / `#F5EDE0` · Sales `#0040DF` / `#22C55E` / `#EFF6FF` · Marketing `#411EED` / `#F472B6` / `#F5F3FF` · Field Sales `#0E7490` / `#F59E0B` / `#ECFEFF` · Service `#7C3AED` / `#06B6D4` / `#F5F3FF` · Invorto `#FE6D1F` / `#010101` / `#F4F3EC` · Flostack `#031031` / `#0040DF` / `#F9FAFE` · Status S/W/E/I `#16A34A` / `#D97706` / `#DC2626` / `#0040DF`.

---

## 11. Governance

Any change to the brand layer, an industry primary, or a product sub-brand requires sign-off from the Head of Design, the Head of Brand / Marketing, and the Engineering Design Systems lead. Adding a new industry or sub-brand requires the same three-party approval plus documented rationale and updated CSS tokens.

Marketing campaigns may extend the palette for time-bound creative use (max 90 days). Campaign colors must be documented as appendix tokens and may not enter the product surface.

Version history: 1.0 (2025) purple `#6B21D6` era · 2.0 (2026) realigned to `#0040DF`/`#411EED`, added Real Estate, differentiated product palettes, added status + accessibility · 2.1 (2026-06) footer harmonized from navy `#060B1D` to neutral `#0A0A0A`, added footer text tokens, Surface Inverse Soft `#0A1644 → #1A1A1A` · 2.2 (2026-06) added Brand Deep `#07021B`.

